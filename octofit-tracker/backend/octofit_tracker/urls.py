from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
import os

def api_root(request):
    codespace_name = os.environ.get('CODESPACE_NAME', 'localhost')
    api_url = f"https://{codespace_name}-8000.app.github.dev/api/" if codespace_name != 'localhost' else "http://localhost:8000/api/"
    return JsonResponse({"api_url": api_url})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root),
]
