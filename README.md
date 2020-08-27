# Verve - a workout logger
Verve is a webapp for logging your workouts and observing your own trends. Authentication and data is handled by Firebase and the front end is in React.
## To Do
# Readme
* Get screenshots for Readme
* Make Readme more appealing
# App
* Finish Gains page
* Finish Workout History page
* Clean up components

## Table of Contents
* [Demo](#demo)
* [App Story](#app-story)
* [General info](#general-info)
* [Tech](#tech)
* [Download](#download)

## Demo
THIS APP IS NOT LIVE YET AND STILL IN DEVELOPMENT.

## App Story
In high school, I took a weights class and we had to record all of our workouts on a giant piece of paper. In college, I started recording them in a spreadsheet. Well, today, I refuse to go back. 

Origninally I started this app for myself so I could keep a convenient and accessible record of my exercise. However, I realized that there is a lot of room for features in this app! Especially since not many exercise apps appeal to me. So I will try to make this app is big as I can with as many useful features as I can fit. Here are some features I am hoping to implement in the future. 

### Potential future features
* Visualize specific exercise trends using graphs and tables
* Create *workout templates* for faster tracking
* Social network to connect with friends
* Timers
* Make into a progressive web app (to function similarly to a native mobile app)

## General Info
You can use verve without an account, however, since it uses your browser's local storage, the data is not guaranteed to persist. It also can't be transferred to other devices. With an email, you can create an account and log in to multiple devices and the data will persist. 

Exercises are defined by their unique name and their list of *set names*. These set names include things like **reps**, **weight**, **time**, etc... Verve lets you create custom exercises using a combination of these set names.

In your workouts, you can add exercises and edit their sets. Once you are finished with a specific exercise, you can move to the completed section by using the more dropdown (three dots) and selecting *complete*. 

Once you finish the workout (all exercises are in the completed section) you can click on *complete workout* and it will be saved to your "Workout History" page.

## Tech
* React & hooks, Router, styled-components, node-sass
* Firebase

## Download
To download, you can clone the repository using 
`git clone https://github.com/morales0/verve-workout-tracker.git`

You need npm to run this app locally. Once you do, you can run `npm install` in the project directory to download the necessary dependencies in the package.json file. 

Then, you can run `npm start` to host the app at `localhost:3000`
