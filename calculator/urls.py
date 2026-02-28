from django.urls import path
from . import views

app_name = 'calculator'

urlpatterns = [
    path('', views.index, name='index'),
    path('calculate/', views.calculate, name='calculate'),
    path('history/', views.history, name='history'),
    path('diet-info/', views.diet_info, name='diet_info'),
]
