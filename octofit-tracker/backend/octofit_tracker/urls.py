import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from rest_framework import routers

from .views import ActivityViewSet, LeaderboardViewSet, TeamViewSet, UserViewSet, WorkoutViewSet

router = routers.DefaultRouter()
router.register('activities', ActivityViewSet, basename='activity')
router.register('leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register('teams', TeamViewSet, basename='team')
router.register('users', UserViewSet, basename='user')
router.register('workouts', WorkoutViewSet, basename='workout')


def api_root(request):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f'https://{codespace_name}-8000.app.github.dev'
    else:
        base_url = 'http://localhost:8000'

    return JsonResponse({
        'message': 'Octofit Tracker API',
        'routes': {
            'activities': f'{base_url}/api/activities/',
            'leaderboard': f'{base_url}/api/leaderboard/',
            'teams': f'{base_url}/api/teams/',
            'users': f'{base_url}/api/users/',
            'workouts': f'{base_url}/api/workouts/',
        },
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('api/info/', api_root),
    path('', api_root),
]
