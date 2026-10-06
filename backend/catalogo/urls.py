from rest_framework.routers import DefaultRouter
from .views import PuntuacionViewSet

router = DefaultRouter()
router.register("puntuaciones", PuntuacionViewSet, basename="puntuacion")

# El router genera /puntuaciones/ y /puntuaciones/<id>/ con sus métodos HTTP
urlpatterns = router.urls