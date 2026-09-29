from django.contrib import admin
from .models import Puntuacion

@admin.register(Puntuacion)
class PuntuacionAdmin(admin.ModelAdmin):
    # Columnas que se verán en el listado del panel
    list_display = ("alias_jugador", "puntaje", "tiempo_jugado_minutos", "partida_completada", "fecha_partida") 
    # Filtro lateral
    list_filter = ("partida_completada",) 
    # Barra de búsqueda
    search_fields = ("alias_jugador",)