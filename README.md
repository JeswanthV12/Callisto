# Callisto
# JeswanthV12

## Intro:

Hello! My project’s mission is to provide users with a way to learn more about the intricacies of astronomy. It provides them with the latest news pertaining to space, 
upcoming launches throughout the world, and near earth asteroids! It displayes a new image related to astronomy each day. Users who don’t know much about astronomy, or are curious to learn more, are able to learn from a series 
of videos embedded in the website. There is also a quiz to test their knowledge. Users are able to communicate with one another to ask and answer questions related to astronomy.

## Files & Directories:

* Main Directory
  - Capstone - Main application directory.
     - space - Space app.
        - Migrations - Holds all migration files
        - Static - Contains static files. 
          - Callisto - img file for website logo
          - Script.js - js file for all dom manipulation
          - Styles.css - css file for styling of website
        - Templates - Holds all html files.
          - Answer.html - Displays all answers to a question. If the user is logged in, they can create their own answer.
          - Course.html - DDisplays embedded videos of astronomy, as well as a quiz built with javascript. 
          - Index.html - The home page. Displays the image of the day, upcoming launches, and near earth asteroids. 
          - layout.html - layout of html which other html files can use
          - login.html - allows users to login
          - news.html - displays the latest news related to astronomy
          - question.html - displays all questions. If the user is logged in they can create their own question.
          - register.html - allows users to create an account
          - search.html - displays questions based on search results from a search bar
          - User_question.html - displays all the questions of the logged in user. The user has the ability to delete their questions if desired.
        - models.py - Contains django built in User Model. Contains a model called “Question” that stores all questions created by users. Contains a model called “Answer” that stores all answers created by users.
        - urls.py - Contains all url paths for authentication, like login, sign up, forget and reset password as well as logout. Contains all other routes for html files. 
        - views.py - Contains all view functions for authentication, like login, sign up, forget and reset password as well as logout. Contains all other view functions. 
