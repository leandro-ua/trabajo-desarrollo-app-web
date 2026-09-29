from django.db import models

from django.db import models

class Puntuacion(models.Model):
    """Registro de puntuaciones de los jugadores.
    Se hara una tabla de puntuaciones y tiempo (tipo leaderboard)
    """
    alias_jugador = models.CharField(max_length=50) # texto corto
    puntaje = models.IntegerField() # número entero
    tiempo_jugado_minutos = models.DecimalField(max_digits=5, decimal_places=2) # número con decimales
    partida_completada = models.BooleanField(default=True) # booleano
    fecha_partida = models.DateTimeField(auto_now_add=True) # fecha y hora automática

    class Meta:
        ordering = ["-puntaje", "tiempo_jugado_minutos"] # el signo menos (-) ordena de mayor a menor puntaje
        verbose_name_plural = "puntuaciones" # cómo se lee en el panel de administración

    def __str__(self):
        return self.alias_jugador