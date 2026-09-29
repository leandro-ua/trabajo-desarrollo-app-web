from django.shortcuts import render

from django.http import JsonResponse
from .models import Puntuacion

def puntuacion_list(request):
    """Devuelve en JSON las puntuaciones de partidas completadas."""
    # .values() entrega cada fila como diccionario.
    # Elegimos los campos a exponer (id, alias_jugador, puntaje, tiempo_jugado_minutos)
    puntuaciones = list(
        Puntuacion.objects.filter(partida_completada=True).values(
            "id", "alias_jugador", "puntaje", "tiempo_jugado_minutos"
        )
    ) # list() fuerza la ejecución de la consulta (QuerySet perezoso)
    
    # Se envuelve la lista en un objeto para poder agregar metadatos después
    return JsonResponse({"count": len(puntuaciones), "results": puntuaciones})
