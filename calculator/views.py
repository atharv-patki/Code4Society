import json
import urllib.request
import urllib.error
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import OperationalError, connection

from .forms import FootprintForm
from .models import FootprintCalculation
from .constants import (
    calculate_footprint, get_grade,
    DIET_DESCRIPTIONS, DIET_EMOJIS, TRANSPORT_EMOJIS,
    TRANSPORT_COEFFICIENTS, DIET_COEFFICIENTS
)


def ensure_tables():
    """Auto-run migrations if tables don't exist yet."""
    try:
        from django.core.management import call_command
        existing = connection.introspection.table_names()
        if 'calculator_footprintcalculation' not in existing:
            call_command('migrate', '--run-syncdb', verbosity=0)
    except Exception:
        pass


def get_ai_advice(footprint_data, inputs):
    """Call Anthropic API for personalized advice."""
    api_key = getattr(settings, 'ANTHROPIC_API_KEY', '')
    if not api_key:
        return {
            "assessment": "Add your ANTHROPIC_API_KEY in settings.py to get AI-powered personalized advice.",
            "tips": [
                "Consider switching to Metro/Train for your commute — it emits 5x less CO2 than a car.",
                "Reduce electricity usage by switching to LED bulbs and 5-star rated appliances.",
                "Choose locally grown, seasonal Indian produce to reduce your food carbon footprint."
            ],
            "trees": max(1, round(footprint_data['total'] * 12 / 21))
        }

    prompt = (
        f"A user from India has a monthly carbon footprint of {footprint_data['total']} kg CO2.\n"
        f"Breakdown:\n"
        f"- Commute: {footprint_data['commute']} kg ({inputs['transport_type']}, {inputs['daily_km']} km/day)\n"
        f"- Diet: {footprint_data['diet']} kg ({inputs['diet_type']})\n"
        f"- Home Energy: {footprint_data['energy']} kg ({inputs['electricity_kwh']} kWh)\n"
        f"- Flights: {footprint_data['flight']} kg\n\n"
        f"India average ~150 kg/month. Paris target ~83 kg/month.\n"
        f"Respond ONLY with valid JSON (no markdown):\n"
        f'{"{"}"assessment": "2 sentence assessment", "tips": ["tip1","tip2","tip3"], "trees": <int>{"}"}'
    )

    payload = json.dumps({
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 1000,
        "messages": [{"role": "user", "content": prompt}]
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.anthropic.com/v1/messages',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01'
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = json.loads(response.read())
            text = data['content'][0]['text'].strip()
            text = text.replace('```json', '').replace('```', '').strip()
            return json.loads(text)
    except Exception:
        return {
            "assessment": f"Your monthly footprint of {footprint_data['total']} kg CO2 has been calculated. See tips below to reduce it.",
            "tips": [
                "Switch to Metro/Train — 5x lower emissions than a car.",
                "Install rooftop solar panels with government subsidy support.",
                "Choose seasonal local produce like dal, sabzi, and millets."
            ],
            "trees": max(1, round(footprint_data['total'] * 12 / 21))
        }


def index(request):
    ensure_tables()
    form = FootprintForm()
    diet_info_dict = {}
    for diet in DIET_COEFFICIENTS.keys():
        diet_info_dict[diet] = {
            'description': DIET_DESCRIPTIONS.get(diet, ''),
            'emoji': DIET_EMOJIS.get(diet, ''),
            'monthly_kg': round(DIET_COEFFICIENTS[diet] * 30, 1)
        }
    context = {
        'form': form,
        'diet_data_json': json.dumps(diet_info_dict),
    }
    return render(request, 'calculator/index.html', context)


@csrf_exempt
def calculate(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'POST required'})

    ensure_tables()

    form = FootprintForm(request.POST)
    if not form.is_valid():
        return JsonResponse({'success': False, 'errors': str(form.errors)})

    data = form.cleaned_data
    flight_km = data.get('flight_km') or 0

    footprint = calculate_footprint(
        transport=data['transport_type'],
        daily_km=data['daily_km'],
        working_days=data['working_days'],
        diet=data['diet_type'],
        electricity=data['electricity_kwh'],
        gas=data['gas_m3'],
        flight_km=flight_km
    )

    grade, label, color, description = get_grade(footprint['total'])
    ai_advice = get_ai_advice(footprint, data)

    calc_id = None
    try:
        calc = FootprintCalculation.objects.create(
            transport_type=data['transport_type'],
            daily_km=data['daily_km'],
            working_days=data['working_days'],
            diet_type=data['diet_type'],
            electricity_kwh=data['electricity_kwh'],
            gas_m3=data['gas_m3'],
            flight_km=flight_km,
            total_emissions=footprint['total'],
            commute_emissions=footprint['commute'],
            diet_emissions=footprint['diet'],
            energy_emissions=footprint['energy'],
            flight_emissions=footprint['flight'],
            carbon_grade=grade,
            carbon_label=label,
            ai_advice=json.dumps(ai_advice)
        )
        calc_id = calc.id
    except OperationalError:
        pass

    return JsonResponse({
        'success': True,
        'id': calc_id,
        'footprint': footprint,
        'grade': grade,
        'label': label,
        'color': color,
        'description': description,
        'ai_advice': ai_advice,
        'inputs': {
            'transport': data['transport_type'],
            'diet': data['diet_type'],
            'daily_km': data['daily_km'],
            'working_days': data['working_days'],
            'electricity': data['electricity_kwh'],
            'gas': data['gas_m3'],
            'flight_km': flight_km,
        }
    })


def history(request):
    ensure_tables()
    try:
        calculations = FootprintCalculation.objects.all()[:20]
        records = []
        for c in calculations:
            records.append({
                'id': c.id,
                'date': c.created_at.strftime('%d %b %Y, %I:%M %p'),
                'transport': c.transport_type,
                'diet': c.diet_type,
                'total': c.total_emissions,
                'commute': c.commute_emissions,
                'diet_emit': c.diet_emissions,
                'energy': c.energy_emissions,
                'flight': c.flight_emissions,
                'grade': c.carbon_grade,
                'label': c.carbon_label,
                'electricity': c.electricity_kwh,
                'gas': c.gas_m3,
                'flight_km': c.flight_km,
                'daily_km': c.daily_km,
            })
        return JsonResponse({'calculations': records})
    except OperationalError:
        return JsonResponse({'calculations': []})


def diet_info(request):
    info = {}
    for diet in DIET_COEFFICIENTS.keys():
        info[diet] = {
            'description': DIET_DESCRIPTIONS.get(diet, ''),
            'emoji': DIET_EMOJIS.get(diet, ''),
            'monthly_kg': round(DIET_COEFFICIENTS[diet] * 30, 1)
        }
    return JsonResponse(info)
