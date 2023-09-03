from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("course", views.course, name="course"),
    path("news", views.news, name="news"),
    path("question", views.question, name="question"),
    path("user_question", views.user_question, name="user_question"),
    path("search", views.search, name="search"),
    path("answer/<int:id>", views.answer, name="answer"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
]
 