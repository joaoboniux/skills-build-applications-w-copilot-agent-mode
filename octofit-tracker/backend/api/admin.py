from django.contrib import admin
from .models import User, Team, Activity, Workout, Leaderboard

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'fitness_level', 'created_at']
    search_fields = ['name', 'email']
    list_filter = ['fitness_level', 'created_at']

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_by', 'created_at']
    search_fields = ['name']
    filter_horizontal = ['members']

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'activity_type', 'date', 'duration', 'created_at']
    search_fields = ['user__name']
    list_filter = ['activity_type', 'date']

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'difficulty', 'target_group', 'duration']
    search_fields = ['name']
    list_filter = ['difficulty', 'target_group']

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['team', 'week_of', 'total_activities', 'total_duration']
    search_fields = ['team__name']
    list_filter = ['week_of']
