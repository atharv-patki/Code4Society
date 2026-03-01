"""Carbon footprint calculation logic"""


def calculate_carbon(transport_mode, transport_distance, diet_type, energy_kwh):
    """
    Calculate annual carbon footprint based on user inputs.
    
    Args:
        transport_mode: Mode of transport (car, bus, bike)
        transport_distance: Distance traveled per day in km
        diet_type: Type of diet (veg, vegan, nonveg)
        energy_kwh: Monthly energy usage in kWh
        
    Returns:
        Dictionary with total emissions and breakdown
    """
    # Transport emissions (kg CO2/year)
    transport_km_per_year = (transport_distance or 0) * 365
    transport_mode_factors = {
        "car": 0.21,
        "bus": 0.089,
        "bike": 0.05,
    }
    transport_factor = transport_mode_factors.get(transport_mode, 0.05)
    transport_emissions = transport_km_per_year * transport_factor

    # Diet emissions (kg CO2/year)
    diet_factors = {
        "veg": 1500,
        "vegan": 1200,
        "nonveg": 2500,
    }
    diet_emissions = diet_factors.get(diet_type, 2000)

    # Energy emissions (kg CO2/year)
    # 0.233 kg CO2 per kWh (typical grid mix)
    energy_emissions = (energy_kwh or 0) * 12 * 0.233

    # Total emissions
    total_co2 = transport_emissions + diet_emissions + energy_emissions

    # Determine carbon score
    if total_co2 < 2000:
        carbon_score = "Low"
    elif total_co2 < 4000:
        carbon_score = "Moderate"
    else:
        carbon_score = "High"

    # Calculate trees needed to offset (21kg CO2 per tree per year)
    trees_required = int((total_co2 / 21) + 0.5)  # round to nearest int

    # Generate recommendations
    recommendations = []
    if transport_distance and transport_distance > 0:
        recommendations.append("Reduce vehicle usage or switch to public transport")
    if diet_type == "nonveg":
        recommendations.append("Incorporate more plant-based meals into your diet")
    recommendations.append("Consider renewable energy for electricity")

    return {
        "total_co2": round(total_co2, 2),
        "carbon_score": carbon_score,
        "trees_required": trees_required,
        "breakdown": {
            "transport": round(transport_emissions, 2),
            "diet": round(diet_emissions, 2),
            "energy": round(energy_emissions, 2),
        },
        "recommendations": recommendations,
    }


def simulate_carbon(current_transport, current_distance, current_diet, current_energy,
                    new_transport, new_distance, new_diet, new_energy):
    """
    Simulate carbon emissions with adjustments.
    
    Args:
        current_transport: Current transport mode
        current_distance: Current distance per day
        current_diet: Current diet type
        current_energy: Current monthly energy
        new_transport: New transport mode
        new_distance: New distance per day
        new_diet: New diet type
        new_energy: New monthly energy
        
    Returns:
        Dictionary with simulation results
    """
    # Calculate current emissions
    current_result = calculate_carbon(current_transport, current_distance, 
                                      current_diet, current_energy)
    current_total = current_result["total_co2"]
    
    # Calculate new emissions
    new_result = calculate_carbon(new_transport, new_distance,
                                  new_diet, new_energy)
    new_total = new_result["total_co2"]

    # Calculate reduction
    reduction_amount = current_total - new_total
    
    if current_total > 0:
        reduction_percent = (reduction_amount / current_total) * 100
    else:
        reduction_percent = 0

    # Calculate trees saved
    trees_saved = max(0, int((reduction_amount / 21) + 0.5))

    return {
        "current_total_co2": round(current_total, 2),
        "new_total_co2": round(new_total, 2),
        "reduction_amount": round(reduction_amount, 2),
        "reduction_percent": round(reduction_percent, 2),
        "trees_saved": trees_saved,
        "current_breakdown": current_result["breakdown"],
        "new_breakdown": new_result["breakdown"],
    }

