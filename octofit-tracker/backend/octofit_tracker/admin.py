from django.contrib import admin

from .models import Activity, Leaderboard, Team, Workout

admin.site.register(Activity)
admin.site.register(Leaderboard)
admin.site.register(Team)
admin.site.register(Workout)
