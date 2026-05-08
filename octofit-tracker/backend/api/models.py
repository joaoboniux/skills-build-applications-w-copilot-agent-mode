from django.db import models
from datetime import datetime

class User(models.Model):
    """Model for fitness app users"""
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField(null=True, blank=True)
    fitness_level = models.CharField(
        max_length=50,
        choices=[
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced'),
        ],
        default='beginner'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.name


class Team(models.Model):
    """Model for user teams"""
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_teams')
    members = models.ManyToManyField(User, related_name='teams', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    """Model for logged activities"""
    ACTIVITY_TYPES = [
        ('running', 'Running'),
        ('walking', 'Walking'),
        ('strength', 'Strength Training'),
        ('cycling', 'Cycling'),
        ('swimming', 'Swimming'),
        ('yoga', 'Yoga'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)
    duration = models.IntegerField()  # in minutes
    distance = models.FloatField(null=True, blank=True)  # in km
    calories_burned = models.FloatField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.user.name} - {self.activity_type} on {self.date}"


class Workout(models.Model):
    """Model for workout plans/suggestions"""
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(
        max_length=50,
        choices=[
            ('easy', 'Easy'),
            ('medium', 'Medium'),
            ('hard', 'Hard'),
        ]
    )
    duration = models.IntegerField()  # in minutes
    exercises = models.TextField()  # JSON or text description of exercises
    target_group = models.CharField(
        max_length=50,
        choices=[
            ('cardio', 'Cardio'),
            ('strength', 'Strength'),
            ('flexibility', 'Flexibility'),
            ('mixed', 'Mixed'),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.name


class Leaderboard(models.Model):
    """Model for competitive leaderboard"""
    team = models.OneToOneField(Team, on_delete=models.CASCADE, related_name='leaderboard', null=True, blank=True)
    week_of = models.DateField()
    rankings = models.TextField()  # JSON format with user rankings and points
    total_activities = models.IntegerField(default=0)
    total_duration = models.IntegerField(default=0)  # in minutes
    total_distance = models.FloatField(default=0)  # in km
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"Leaderboard for {self.team.name if self.team else 'Global'} - Week of {self.week_of}"
