from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Activity, Leaderboard, Team, Workout

User = get_user_model()


class DjongoObjectIdSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        if getattr(obj, 'id', None) is not None:
            return obj.id
        if getattr(obj, 'pk', None) is not None:
            return str(obj.pk)
        return None


class ActivitySerializer(DjongoObjectIdSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class TeamSerializer(DjongoObjectIdSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class LeaderboardSerializer(DjongoObjectIdSerializer):
    class Meta:
        model = Leaderboard
        fields = '__all__'


class WorkoutSerializer(DjongoObjectIdSerializer):
    class Meta:
        model = Workout
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
