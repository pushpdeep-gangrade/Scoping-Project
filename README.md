# Scoping-Project

# Table of Contents
- [Authors](#authors)
- [App Mockup](#mockup)
- [Video Demo](#demo)
- [Project Wiki](#wiki)

## Authors <a name="authors"></a> 
- Pushpdeep Gangrade
- Katy Mitchell 
- Valerie Ray
- Rockford Stoller

## App Mockup <a name="mockup"></a>
<strong>Mockup:</strong>
  <br />
  <img src="https://github.com/pushpdeep-gangrade/Scoping-Project/blob/master/Mockup.png" width=800>
  <br />

## Video Demo <a name="demo"></a>
- App Demo: https://youtu.be/w3Lj8uQ2aZM

## Project Wiki <a name="wiki"></a>
### Intro
This "Scoping App" allows examiners to evaluate student research posters. It is suited for situations where
students are expected to create a poster and present it during a poster session. During the poster session,
there are examiners that will visit each poster and grade the poster based on a simple list of questions.

### Run the App
1. Run `npm install` command in the both the admin-portal-1 directory and the admin-portal-1/client folder. 
2. Once the installation is done, run the command `npm run dev` in the admin-portal-1 directory. 
   Doing this should start the back-end server and the front-end at the same time.
   - If you want to just run the front-end, navigate into the client folder and run the command `npm start`.

### App Features
1. Mobile app
   - The mobile app is only used by the examiner.
   - The app provides two forms of authentication: a username and password mechanism and a QR-code login.
     To login to the app, each examiner is granted a QR code by the admin. The token from these codes
     expires after 1 hour.
   - The app presents the survey questions with answer options (Poor, Fair, Good, Very Good, Superior).
     The user moves from one screen to the next only when they answer the questions on the current app view.
   - Score of an evaluation is the sum of points granted for that evaluation, and each team's score is the
     average of all the evaluations they have received.
   - Upon login, the teams are stored and displayed by overall score in descending order.
   - When an examiner arrives at a poster, they can identify the team using the QR scanner.
   - The user responses are be stored on the server and all communication with the server is enabled through APIs.

2. Admin Portal
   - The admin portal is accessible by only admin users. It enables the admin to
     - Create the examiners and project teams.
     - List the examiners and project teams.
     - Information is provided for your examiner and teams to enable the approach you design for examiner
       authentication and team selection.
     - Display the examiners, teams and the score board for each team. The score board for each team
       shows each evaluation submitted by an examiner, including the date and score of that evaluation.
