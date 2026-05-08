from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'age', 'fitness_level', 'created_at', 'updated_at']

class TeamSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_by', 'members', 'created_at', 'updated_at']

class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration', 'distance', 'calories_burned', 'description', 'date', 'created_at', 'updated_at']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty', 'duration', 'exercises', 'target_group', 'created_at', 'updated_at']

class LeaderboardSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'week_of', 'rankings', 'total_activities', 'total_duration', 'total_distance', 'updated_at']
