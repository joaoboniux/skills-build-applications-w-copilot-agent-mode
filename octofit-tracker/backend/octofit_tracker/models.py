from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    objects = models.DjongoManager()

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    objects = models.DjongoManager()

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return f"{self.user} - {self.type} ({self.duration} min)"


class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    objects = models.DjongoManager()

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return f"{self.team}: {self.points} pts"


class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.CharField(max_length=100)
    objects = models.DjongoManager()

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.name
