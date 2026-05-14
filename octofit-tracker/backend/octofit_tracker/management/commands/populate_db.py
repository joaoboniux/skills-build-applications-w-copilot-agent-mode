from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from octofit_tracker.models import Activity, Leaderboard, Team, Workout

User = get_user_model()


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Limpar dados existentes
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Criar times
        Team.objects.create(name='Marvel')
        Team.objects.create(name='DC')

        # Criar usuários
        User.objects.create_user(username='superman', email='superman@dc.com', password='1234')
        User.objects.create_user(username='batman', email='batman@dc.com', password='1234')
        User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='1234')
        User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='1234')
        User.objects.create_user(username='ironman', email='ironman@marvel.com', password='1234')
        User.objects.create_user(username='captainmarvel', email='captainmarvel@marvel.com', password='1234')

        # Atividades
        Activity.objects.create(user='superman', team='DC', type='Corrida', duration=30)
        Activity.objects.create(user='batman', team='DC', type='Bicicleta', duration=45)
        Activity.objects.create(user='spiderman', team='Marvel', type='Natação', duration=25)
        Activity.objects.create(user='ironman', team='Marvel', type='Corrida', duration=40)

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=120)
        Leaderboard.objects.create(team='DC', points=110)

        # Workouts
        Workout.objects.create(name='Treino de Força', description='Treino para força máxima', suggested_for='DC')
        Workout.objects.create(name='Treino de Agilidade', description='Treino para agilidade', suggested_for='Marvel')

        self.stdout.write(self.style.SUCCESS('Banco octofit_db populado com dados de teste!'))
