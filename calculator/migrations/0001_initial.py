from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='FootprintCalculation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transport_type', models.CharField(max_length=50)),
                ('daily_km', models.FloatField()),
                ('working_days', models.IntegerField()),
                ('diet_type', models.CharField(max_length=100)),
                ('electricity_kwh', models.FloatField(default=0)),
                ('gas_m3', models.FloatField(default=0)),
                ('flight_km', models.FloatField(default=0)),
                ('total_emissions', models.FloatField()),
                ('commute_emissions', models.FloatField()),
                ('diet_emissions', models.FloatField()),
                ('energy_emissions', models.FloatField()),
                ('flight_emissions', models.FloatField()),
                ('carbon_grade', models.CharField(max_length=5)),
                ('carbon_label', models.CharField(max_length=50)),
                ('ai_advice', models.TextField(blank=True, default='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created_at'],
                'db_table': 'calculator_footprintcalculation',
            },
        ),
    ]
