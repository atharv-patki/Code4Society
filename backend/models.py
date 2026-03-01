from pydantic import BaseModel
from typing import Optional


class TransportData(BaseModel):
    mode: str  # "car", "bus", "bike"
    distance_per_day: float


class DietData(BaseModel):
    type: str  # "veg", "nonveg", "vegan"


class EnergyData(BaseModel):
    monthly_units: float  # kWh per month


class CarbonCalculationRequest(BaseModel):
    transport: TransportData
    diet: DietData
    energy: EnergyData


class CarbonBreakdown(BaseModel):
    transport: float
    diet: float
    energy: float


class CarbonCalculationResponse(BaseModel):
    total_co2: float
    carbon_score: str  # "Low", "Moderate", "High"
    trees_required: int
    breakdown: CarbonBreakdown
    recommendations: list[str]


class SimulationAdjustments(BaseModel):
    transport_reduction_percent: Optional[float] = 0


class SimulationRequest(BaseModel):
    base_data: CarbonCalculationResponse
    adjustments: SimulationAdjustments


class SimulationResponse(BaseModel):
    new_total_co2: float
    reduction_percent: float
    trees_saved: int
