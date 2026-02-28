// simple estimation helpers used when backend isn't available

export function estimateCarbon(form) {
    // very rough per‑year calculations
    const transportKmPerYear = (form.transport.distance_per_day || 0) * 365;
    const transportEmissions =
        transportKmPerYear * (form.transport.mode === "car" ? 0.21 : form.transport.mode === "bus" ? 0.089 : 0.05);

    const dietEmissions =
        form.diet.type === "veg" ? 1500 : form.diet.type === "nonveg" ? 2500 : 2000; // kg/year

    const energyEmissions =
        (form.energy.monthly_units || 0) * 12 * 0.233; // kg CO2 per kWh

    const total = transportEmissions + dietEmissions + energyEmissions;

    const trees_required = Math.ceil(total / 21); // assume 21kg absorb per tree per year

    const breakdown = {
        transport: parseFloat(transportEmissions.toFixed(2)),
        diet: parseFloat(dietEmissions.toFixed(2)),
        energy: parseFloat(energyEmissions.toFixed(2)),
    };

    const recommendations = [];
    if (form.transport.distance_per_day > 0) {
        recommendations.push("Reduce vehicle usage or switch to public transport");
    }
    recommendations.push("Incorporate more plant‑based meals into your diet");
    recommendations.push("Consider renewable energy for electricity");

    return {
        total_co2: parseFloat(total.toFixed(2)),
        carbon_score: total < 2000 ? "Low" : total < 4000 ? "Moderate" : "High",
        trees_required,
        breakdown,
        recommendations,
    };
}

export function simulateCarbon(baseData, adjustments) {
    // copy base breakdown and apply transport reduction
    const { transport = 0, diet = 0, energy = 0 } = baseData.breakdown || {};
    const reductionFactor = 1 - (adjustments.transport_reduction_percent || 0) / 100;
    const newTransport = transport * reductionFactor;
    const newTotal = newTransport + diet + energy;

    const originalTotal = transport + diet + energy;
    const reductionPercent = originalTotal ?
        parseFloat(((originalTotal - newTotal) / originalTotal * 100).toFixed(2)) :
        0;
    const trees_saved = Math.max(0, Math.floor((originalTotal - newTotal) / 21));

    return {
        new_total_co2: parseFloat(newTotal.toFixed(2)),
        reduction_percent: reductionPercent,
        trees_saved,
    };
}