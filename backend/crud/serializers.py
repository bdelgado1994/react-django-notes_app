from rest_framework.serializers import ModelSerializer
from crud.models import Task


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = (
            "created_at",
            "updated_at",
        )
