"""
Script para popular o banco de dados com dados de teste do OctoFit Tracker.
Execute com: python manage.py shell < populate_db.py
"""

from api.models import User, Team, Activity, Workout, Leaderboard
from datetime import date, timedelta
import json

# Limpar dados existentes
User.objects.all().delete()
Team.objects.all().delete()
Activity.objects.all().delete()
Workout.objects.all().delete()
Leaderboard.objects.all().delete()

print("Criando usuários...")
users = []
user_data = [
    {'name': 'João Silva', 'email': 'joao@example.com', 'age': 28, 'fitness_level': 'intermediate'},
    {'name': 'Maria Santos', 'email': 'maria@example.com', 'age': 32, 'fitness_level': 'advanced'},
    {'name': 'Carlos Oliveira', 'email': 'carlos@example.com', 'age': 25, 'fitness_level': 'beginner'},
    {'name': 'Ana Costa', 'email': 'ana@example.com', 'age': 30, 'fitness_level': 'intermediate'},
    {'name': 'Pedro Ferreira', 'email': 'pedro@example.com', 'age': 35, 'fitness_level': 'advanced'},
]

for data in user_data:
    user = User.objects.create(**data)
    users.append(user)
    print(f"  - {user.name}")

print("\nCriando times...")
team1 = Team.objects.create(
    name='Alpha Team',
    description='Time de treinos matinais',
    created_by=users[0]
)
team1.members.add(users[0], users[1])

team2 = Team.objects.create(
    name='Beta Squad',
    description='Time de corridas',
    created_by=users[2]
)
team2.members.add(users[2], users[3])

print(f"  - {team1.name}")
print(f"  - {team2.name}")

print("\nCriando atividades...")
activities_data = [
    {'user': users[0], 'activity_type': 'running', 'duration': 45, 'distance': 7.5, 'calories_burned': 600, 'date': date.today() - timedelta(days=1)},
    {'user': users[0], 'activity_type': 'strength', 'duration': 60, 'distance': None, 'calories_burned': 400, 'date': date.today()},
    {'user': users[1], 'activity_type': 'running', 'duration': 60, 'distance': 10.0, 'calories_burned': 800, 'date': date.today()},
    {'user': users[1], 'activity_type': 'yoga', 'duration': 45, 'distance': None, 'calories_burned': 200, 'date': date.today() - timedelta(days=2)},
    {'user': users[2], 'activity_type': 'walking', 'duration': 30, 'distance': 3.0, 'calories_burned': 150, 'date': date.today()},
    {'user': users[2], 'activity_type': 'cycling', 'duration': 90, 'distance': 25.0, 'calories_burned': 700, 'date': date.today() - timedelta(days=1)},
    {'user': users[3], 'activity_type': 'running', 'duration': 50, 'distance': 8.0, 'calories_burned': 650, 'date': date.today()},
    {'user': users[3], 'activity_type': 'swimming', 'duration': 60, 'distance': None, 'calories_burned': 500, 'date': date.today() - timedelta(days=1)},
    {'user': users[4], 'activity_type': 'strength', 'duration': 75, 'distance': None, 'calories_burned': 450, 'date': date.today()},
    {'user': users[4], 'activity_type': 'running', 'duration': 55, 'distance': 9.0, 'calories_burned': 750, 'date': date.today() - timedelta(days=1)},
]

for data in activities_data:
    Activity.objects.create(**data)
print(f"  - {len(activities_data)} atividades criadas")

print("\nCriando planos de treino...")
workouts_data = [
    {
        'name': 'Morning Run Starter',
        'description': 'Programa de corrida para iniciantes, 3x por semana',
        'difficulty': 'easy',
        'duration': 30,
        'exercises': 'Aquecimento 5min, Corrida steady 20min, Resfriamento 5min',
        'target_group': 'cardio'
    },
    {
        'name': 'Full Body Strength',
        'description': 'Treino de força para todo corpo',
        'difficulty': 'medium',
        'duration': 60,
        'exercises': 'Aquecimento 10min, Força 40min, Core 10min',
        'target_group': 'strength'
    },
    {
        'name': 'HIIT Power Blast',
        'description': 'Treino intenso de alta intensidade',
        'difficulty': 'hard',
        'duration': 45,
        'exercises': '5 exercícios em 30seg cada, 15seg descanso, 3 rodadas',
        'target_group': 'mixed'
    },
    {
        'name': 'Yoga & Flexibility',
        'description': 'Aula de yoga para flexibilidade',
        'difficulty': 'easy',
        'duration': 45,
        'exercises': 'Aquecimento, 15 posturas, Meditação final',
        'target_group': 'flexibility'
    },
    {
        'name': 'Cycling Endurance',
        'description': 'Treino de resistência em bicicleta',
        'difficulty': 'medium',
        'duration': 90,
        'exercises': 'Aquecimento 15min, Ritmo constante 60min, Resfriamento 15min',
        'target_group': 'cardio'
    },
]

for data in workouts_data:
    Workout.objects.create(**data)
print(f"  - {len(workouts_data)} planos de treino criados")

print("\nCriando leaderboards...")
week_of = date.today() - timedelta(days=date.today().weekday())
rankings = json.dumps([
    {'rank': 1, 'user': 'Maria Santos', 'points': 1550, 'activities': 3},
    {'rank': 2, 'user': 'Pedro Ferreira', 'points': 1400, 'activities': 2},
    {'rank': 3, 'user': 'João Silva', 'points': 1000, 'activities': 2},
    {'rank': 4, 'user': 'Ana Costa', 'points': 1150, 'activities': 2},
    {'rank': 5, 'user': 'Carlos Oliveira', 'points': 800, 'activities': 2},
])

leaderboard_global = Leaderboard.objects.create(
    team=None,
    week_of=week_of,
    rankings=rankings,
    total_activities=11,
    total_duration=510,
    total_distance=63.5
)
print(f"  - Leaderboard Global criado")

leaderboard_team1 = Leaderboard.objects.create(
    team=team1,
    week_of=week_of,
    rankings=json.dumps([
        {'rank': 1, 'user': 'Maria Santos', 'points': 1550, 'activities': 3},
        {'rank': 2, 'user': 'João Silva', 'points': 1000, 'activities': 2},
    ]),
    total_activities=5,
    total_duration=210,
    total_distance=17.5
)
print(f"  - Leaderboard {team1.name} criado")

print("\n✅ Base de dados populada com sucesso!")
print(f"Total: {len(users)} usuários, {Team.objects.count()} times, {Activity.objects.count()} atividades, {Workout.objects.count()} planos de treino")
