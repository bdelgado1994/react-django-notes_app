from rest_framework import routers
from crud.views import TaskViewSet

router = routers.DefaultRouter()
router.register(r"tasks", TaskViewSet)

urlpatterns = router.urls
