# JusKidin

## Introduction

**JusKidin** is a moble-first web resource for parents.  JusKidin connects parents to relevant child development information.  It also allows parents to organize hosted images into topic specific groupings called drawers. 

A live version of the application can be found at: https://juskidin.herokuapp.com/

**Current live version:** 1.0

![Juskidin_home](/ScreenShots/Juskidin_home.png)



## Features

### User Created and Password Protected Account

Each user can create and maintain their own secure account.  

![JusKidin_1](/ScreenShots/JusKidin_1.png)

### Child Profiles

Each user inputs a name and birthdate to have access to the results of a custom Google search engine that returns relevant web resources to that child's stage of development. 

![JusKidin_2](/ScreenShots/JusKidin_2.png)

### Drawers

Each user is able to connect already hosted images to topic specifc drawers to organize digitzed versions of school work, artwork, and pictures from sport games and other activities. 

![JusKidin_3](/JusKidin_3.png)

## Technical Requirements

- a modern web browser
- an active internet connection
- images hosted online (https://imgbb.com/)

## User Instructions

1. Create Account OR access application with a demo account
   - username: DemoUser
   - password: test123456
2. Add child profiled by inputing name and birthdate into New Child form found under Child(ren) link in navigation
3. Connect images by inputing info into Connect Images form found under Drawers link in navigation. 
4. Update Account or Delete Account from the forms accessed through the dropdown menu through the Account Login/Logged In link on the right side of the navigation menu. 

## Planned Development

- [ ] The ability to edit and delete Child Profiles, Drawers and Images
- [ ] Populate the images on home page from user account
- [ ] Display username when user is logged in
- [ ] The ability for the user to upload image files
- [ ] use a date picker or automatically attach the current date to new images connected
- [ ] Create custom queries to the Google Custom Search Engine
- [ ] Allow the digital assets to also be audio, video and multi-page files
- [ ] Search functionality for the uploaded image files
- [ ] Implement different user roles (ex parent, teacher, child)
- [ ] Implement the ability to invite others to "follow" specified drawers
- [ ] Add a calendar and todo functionality
- [ ] Create a "time capsule" feature
- [ ] Refactor for scalability

## Technology Used

### Frontend

- HTML5
- CSS3
- JavaScript/JQuery/AJAX

### Backend

- Express
- Node.js
- MongoDB
- mLab
- Passport
- Bcrypt

### Testing and Deployment

- Mocha
- Chai
- Faker
- TravisCI
- Heroku

## Credits

Google Custom Search Engine API

https://developers.google.com/custom-search/

Free Online Photo Hosting

https://imgbb.com/

## Author

Lisa Reinhardt

## Acknowledments

##### Supportive, patient and creative mentors from Thinkful: 

Jason Humphrey

Ben Pardo

Mike Ricos

Elias Mason
