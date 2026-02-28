from django.db import models
import json


class FootprintCalculation(models.Model):
    # Commute
    transport_type = models.CharField(max_length=50)
    daily_km = models.FloatField()
    working_days = models.IntegerField()

    # Diet
    diet_type = models.CharField(max_length=100)

    # Energy
    electricity_kwh = models.FloatField(default=0)
    gas_m3 = models.FloatField(default=0)

    # Flights
    flight_km = models.FloatField(default=0)

    # Results
    total_emissions = models.FloatField()
    commute_emissions = models.FloatField()
    diet_emissions = models.FloatField()
    energy_emissions = models.FloatField()
    flight_emissions = models.FloatField()
    carbon_grade = models.CharField(max_length=5)
    carbon_label = models.CharField(max_length=50)

    # AI advice stored as JSON
    ai_advice = models.TextField(blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        db_table = 'calculator_footprintcalculation'

    def get_ai_advice(self):
        try:
            return json.loads(self.ai_advice)
        except:
            return {}

    def __str__(self):
        return f"{self.diet_type} | {self.transport_type} | {self.total_emissions} kg CO2 | {self.created_at.strftime('%d %b %Y')}"
