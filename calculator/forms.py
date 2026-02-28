from django import forms
from .constants import TRANSPORT_COEFFICIENTS, DIET_COEFFICIENTS, DIET_DESCRIPTIONS, DIET_EMOJIS, TRANSPORT_EMOJIS


class FootprintForm(forms.Form):
    transport_type = forms.ChoiceField(
        choices=[(k, f"{TRANSPORT_EMOJIS.get(k, '')} {k}") for k in TRANSPORT_COEFFICIENTS.keys()],
        label='Transport Type',
        initial='Car',
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    daily_km = forms.FloatField(
        label='Daily Distance (km)',
        initial=10,
        min_value=0,
        widget=forms.NumberInput(attrs={'class': 'form-control', 'step': '0.1'})
    )
    working_days = forms.IntegerField(
        label='Working Days/Month',
        initial=22,
        min_value=0,
        max_value=31,
        widget=forms.NumberInput(attrs={'class': 'form-control'})
    )
    diet_type = forms.ChoiceField(
        choices=[(k, f"{DIET_EMOJIS.get(k, '')} {k}") for k in DIET_COEFFICIENTS.keys()],
        label='Diet Type',
        initial='Average (Mixed)',
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    electricity_kwh = forms.FloatField(
        label='Electricity (kWh/month)',
        initial=150,
        min_value=0,
        widget=forms.NumberInput(attrs={'class': 'form-control', 'step': '1'})
    )
    gas_m3 = forms.FloatField(
        label='Gas (m³/month)',
        initial=0,
        min_value=0,
        widget=forms.NumberInput(attrs={'class': 'form-control', 'step': '0.1'})
    )
    flight_km = forms.FloatField(
        label='Monthly Flight Distance (km)',
        initial=0,
        min_value=0,
        required=False,
        widget=forms.NumberInput(attrs={'class': 'form-control', 'step': '1'})
    )
