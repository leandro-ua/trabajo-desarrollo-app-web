from django.urls import path
from . import views

urlpatterns = [
    path("puntuaciones/", views.puntuacion_list, name="puntuacion-list"),
]