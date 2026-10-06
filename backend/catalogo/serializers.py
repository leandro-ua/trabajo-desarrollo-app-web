from rest_framework import serializers
from .models import Puntuacion

class PuntuacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puntuacion
        fields = ["id", "alias_jugador", "puntaje", "tiempo_jugado_minutos", "partida_completada", "fecha_partida"]
        read_only_fields = ["id", "fecha_partida"] # los genera el servidor, no el cliente

    # Validación a medida: se ejecuta automáticamente para el campo "puntaje"
    def validate_puntaje(self, value):
        if value < 0:
            raise serializers.ValidationError("El puntaje no puede ser negativo.")
        return value