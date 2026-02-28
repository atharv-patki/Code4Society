# Emission coefficients (kg CO2 per unit)

TRANSPORT_COEFFICIENTS = {
    'Car': 0.21,
    'Motorcycle': 0.11,
    'Auto Rickshaw': 0.10,
    'Bus': 0.089,
    'Metro/Train': 0.041,
    'Electric Vehicle': 0.053,
    'Bicycle': 0.0,
    'Walking': 0.0,
}

TRANSPORT_EMOJIS = {
    'Car': '🚗',
    'Motorcycle': '🏍️',
    'Auto Rickshaw': '🛺',
    'Bus': '🚌',
    'Metro/Train': '🚆',
    'Electric Vehicle': '⚡',
    'Bicycle': '🚲',
    'Walking': '🚶',
}

# Diet: monthly kg CO2 emissions
DIET_COEFFICIENTS = {
    # International
    'Vegan': 1.5,
    'Vegetarian': 1.7,
    'Average (Mixed)': 2.5,
    'Meat Heavy': 3.3,

    # Indian Diet Categories
    'Pure Vegetarian (Sattvic)': 1.6,          # No onion/garlic, dairy-based
    'South Indian Vegetarian': 1.65,            # Rice, sambar, idli, dosa
    'North Indian Vegetarian': 1.75,            # Roti, dal, paneer, dairy heavy
    'Jain Vegetarian': 1.5,                     # No root vegetables
    'Eggetarian (Indian)': 2.0,                 # Veg + eggs
    'Indian Non-Veg (Chicken/Fish)': 2.6,       # Chicken curry, fish, etc.
    'Bengali (Fish Heavy)': 2.4,                # Fish-dominant non-veg
    'Mughlai (Red Meat)': 3.1,                  # Biryani, kebabs, mutton
    'Street Food Heavy': 2.8,                   # Fried, processed street food
}

DIET_EMOJIS = {
    'Vegan': '🌱',
    'Vegetarian': '🥗',
    'Average (Mixed)': '🍽️',
    'Meat Heavy': '🥩',
    'Pure Vegetarian (Sattvic)': '🪔',
    'South Indian Vegetarian': '🥘',
    'North Indian Vegetarian': '🫓',
    'Jain Vegetarian': '🌾',
    'Eggetarian (Indian)': '🥚',
    'Indian Non-Veg (Chicken/Fish)': '🍗',
    'Bengali (Fish Heavy)': '🐟',
    'Mughlai (Red Meat)': '🍖',
    'Street Food Heavy': '🌮',
}

DIET_DESCRIPTIONS = {
    'Vegan': 'No animal products',
    'Vegetarian': 'No meat, includes dairy/eggs',
    'Average (Mixed)': 'Balanced mixed diet',
    'Meat Heavy': 'Daily meat consumption',
    'Pure Vegetarian (Sattvic)': 'No onion/garlic, dairy-based, temple food',
    'South Indian Vegetarian': 'Rice, sambar, idli, dosa, coconut dishes',
    'North Indian Vegetarian': 'Roti, dal makhani, paneer, heavy dairy',
    'Jain Vegetarian': 'No root vegetables, no meat/egg',
    'Eggetarian (Indian)': 'Indian vegetarian + eggs',
    'Indian Non-Veg (Chicken/Fish)': 'Chicken curry, fish curry, occasional red meat',
    'Bengali (Fish Heavy)': 'Rice, fish, mustard-based cooking',
    'Mughlai (Red Meat)': 'Biryani, kebabs, mutton, rich gravies',
    'Street Food Heavy': 'Pav bhaji, chaat, fried snacks, processed food',
}

# Electricity: kg CO2 per kWh (India average)
ELECTRICITY_COEFFICIENT = 0.82  # India's grid emission factor (higher than global avg)

# Natural gas: kg CO2 per m3
GAS_COEFFICIENT = 2.04

# LPG cylinder (Indian context): kg CO2 per cylinder (14.2 kg)
LPG_COEFFICIENT = 2.98  # per kg of LPG

# Aviation: kg CO2 per km (economy)
FLIGHT_COEFFICIENT = 0.255

GRADE_CONFIG = {
    'A+': {'max': 100, 'label': 'Excellent', 'color': '#00ff87', 'description': 'Outstanding! You\'re well below average.'},
    'A':  {'max': 200, 'label': 'Good', 'color': '#7fff00', 'description': 'Good job! You\'re below the global average.'},
    'B':  {'max': 350, 'label': 'Average', 'color': '#ffd700', 'description': 'Around average. Room for improvement.'},
    'C':  {'max': 500, 'label': 'High', 'color': '#ff8c00', 'description': 'Above average. Consider reducing emissions.'},
    'D':  {'max': float('inf'), 'label': 'Critical', 'color': '#ff3333', 'description': 'Significantly above average. Action needed.'},
}


def get_grade(total):
    for grade, config in GRADE_CONFIG.items():
        if total < config['max']:
            return grade, config['label'], config['color'], config['description']
    return 'D', 'Critical', '#ff3333', 'Significantly above average.'


def calculate_footprint(transport, daily_km, working_days, diet, electricity, gas, flight_km):
    transport_coeff = TRANSPORT_COEFFICIENTS.get(transport, 0.21)
    commute = transport_coeff * daily_km * working_days * 2  # both ways

    diet_monthly = DIET_COEFFICIENTS.get(diet, 2.5)
    diet_emit = diet_monthly * 30

    elec_emit = electricity * ELECTRICITY_COEFFICIENT
    gas_emit = gas * GAS_COEFFICIENT
    energy_emit = elec_emit + gas_emit

    flight_emit = flight_km * FLIGHT_COEFFICIENT

    total = commute + diet_emit + energy_emit + flight_emit

    return {
        'total': round(total, 2),
        'commute': round(commute, 2),
        'diet': round(diet_emit, 2),
        'energy': round(energy_emit, 2),
        'flight': round(flight_emit, 2),
    }
