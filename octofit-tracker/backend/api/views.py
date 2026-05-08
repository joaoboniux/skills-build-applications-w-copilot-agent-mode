from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import User, Team, Activity, Workout, Leaderboard
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, WorkoutSerializer, LeaderboardSerializer

@api_view(['GET'])
def api_root(request):
    """API Root endpoint"""
    return Response({
        'users': reverse('user-list', request=request),
        'teams': reverse('team-list', request=request),
        'activities': reverse('activity-list', request=request),
        'workouts': reverse('workout-list', request=request),
        'leaderboard': reverse('leaderboard-list', request=request),
    })

class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model"""
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    """ViewSet for Team model"""
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    """ViewSet for Activity model"""
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    """ViewSet for Workout model"""
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    """ViewSet for Leaderboard model"""
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
