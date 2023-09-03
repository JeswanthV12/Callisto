from django.shortcuts import render

# Create your views here.

from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from .models import User, Question, Answer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django import forms
from crispy_forms.helper import FormHelper
from django.contrib.auth import authenticate, login, logout
import json

# Create your views here.

class createQuestion(forms.Form):
    text = forms.CharField(max_length=280)

    def __init__(self, *args, **kwargs):
        super(createQuestion, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False 

class createAnswer(forms.Form):
    text = forms.CharField(max_length=2000)

    def __init__(self, *args, **kwargs):
        super(createAnswer, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False 

def paginate(a, request):
    pagination = Paginator(a, 10)
    page_num = request.GET.get('page')

    try:
        pages = pagination.page(page_num)
    except EmptyPage and PageNotAnInteger:
        pages = pagination.page(1)
    
    return pages


def index(request):
    return render(request, "callistoApp/index.html")

def news(request):
    return render(request, "callistoApp/news.html")

def course(request):
    return render(request, "callistoApp/course.html")

def question(request):
    # question = Question.objects.get()

    if request.method == "POST":
        form = createQuestion(request.POST)
        if form.is_valid():
            question = form.cleaned_data["text"]
            submit = Question(question=question, user=request.user)

            submit.save()
            return HttpResponseRedirect(reverse("question"))
        else:
            return render(request, "network/index.html", {
                "form": form,
            })
    
    questions = Question.objects.all().order_by('-timestamp')

    pages = paginate(questions, request)

    return render(request, "callistoApp/question.html", {
        "user": request.user,
        "form": createQuestion(),
        "questions": pages,
    })

def user_question(request):
    questions = Question.objects.filter(user=request.user).order_by('-timestamp')
    pages = paginate(questions, request)

    if request.method == "POST":
        data = json.loads(request.body)

        if data.get("id") is not None:
            question = Question.objects.get(id=data.get("id"))
            
            question.delete()
        
        return HttpResponse(status=204)

    return render(request, "callistoApp/user_question.html", {
        "questions": pages
    })

def search(request):
    if request.method == "POST":
        searched = request.POST['searched']

        questions = Question.objects.filter(question__contains=searched).order_by('-timestamp')
        pages = paginate(questions, request)

    return render (request, "callistoApp/search.html", {
        "searched": searched,
        "questions": pages
    })

def answer(request, id):
    question = Question.objects.get(id=id)

    answers = Answer.objects.filter(question=question).order_by('-timestamp')
    pages = paginate(answers, request)

    if request.method == "POST":
        form = createAnswer(request.POST)
        if form.is_valid():
            user = User.objects.get(username=request.user)
            answer = form.cleaned_data["text"]
            submit = Answer(answer=answer, question=question, user=user)
            submit.save()

            return HttpResponseRedirect(reverse("answer", args=[id]))
        else:
            return render(request, "network/index.html", {
                "form": form,
            })

    return render(request, "callistoApp/answer.html", {
        "form": createAnswer(),
        "user": request.user,
        "answers": pages,
        "question": question,
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "callistoApp/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "callistoApp/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "callistoApp/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "callistoApp/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "callistoApp/register.html")