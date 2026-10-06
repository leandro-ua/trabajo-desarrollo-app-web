from rest_framework import viewsets
from .models import Puntuacion
from .serializers import PuntuacionSerializer

class PuntuacionViewSet(viewsets.ModelViewSet):
    """CRUD completo de Puntuacion: listar, crear, ver, editar y eliminar."""
    queryset = Puntuacion.objects.all()
    serializer_class = PuntuacionSerializer