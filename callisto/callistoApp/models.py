from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

# Create your models here.

class User(AbstractUser):
    pass

class Question(models.Model):
    question = models.CharField(max_length=280)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Question_user")
    timestamp = models.DateTimeField(default=timezone.now)

class Answer(models.Model):
    answer = models.CharField(max_length=2000)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="Answer_question")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Answer_user")
    timestamp = models.DateTimeField(default=timezone.now)