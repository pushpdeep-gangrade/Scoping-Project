# Scoping-Project

# Table of Contents
- [Authors](#authors)
- [App Mockup](#mockup)
- [Video Demo](#demo)
- [Project Wiki](#wiki)

## Authors <a name="authors"></a> 
- Pushdeep Gangrade
- Katy Mitchell 
- Valerie Ray
- Rockford Stoller

## App Mockup <a name="mockup"></a>
- Mockup: 

## Video Demo <a name="demo"></a>
- App Demo: 

## Project Wiki <a name="wiki"></a>
### Run the App
1. Run `npm install` command in the both the admin-portal-1 directory and the admin-portal-1/client folder. 
2. Once the installation is done, run the command `npm run dev` in the admin-portal-1 directory. 
   Doing this should start the back-end server and the front-end at the same time.
   - If you want to just run the front-end, navigate into the client folder and run the command `npm start`.

## To-Do:
1. Mobile app
  - The mobile app is only used by the examiner.
  - The app should provide authentication, using a username and password mechanism.
  - The mobile app should present the survey questions in the survey provided [LinkPreview the document]. The survey questions should be presented in a usable way to the user and should not be presented as a long list of questions. The user should be able to move from one screen to the other only when they answer the questions on the current app view. Your survey should provide validation to the user input and should alert the user when incorrect input is provided.
    - Score of an evaluation is the sum of points granted for that evaluation. Then the team's score is the average of all the evaluations they have received.
  - The user responses should be stored on the server and all communication with the server should be enabled through APIs.
  - The app should add the scores of the submitted evaluations. The overall average scores based on all the examiners for the different teams should be presented on the app. The teams should be stored by overall score in descending order.
  - In addition to the username/password authentication method, assuming the examiner arrives at the event and installs the app for the first time
    - Create an approach to pass on the user credentials or authentication information to the app other than giving the username and password to the examiner. Your approach should not simply provide the user with the username and password on a piece of paper. You are allowed to use other communication channels that are available in on the phone.
    - The created approach should enable the event organizers (admin) to pass on the user credentials to the a specific examiner. The security of the approach is essential.
    - The app should also allow username and password in addition to your new approach.
  - When an examiner arrives at a poster you should figure out a way for the examiner to identify the team using the app. You should consider using an approach other than simply select a team from a list.
2. Admin Portal
  - The admin portal should be accessible by only admin users.
  - The admin portal enables the admin to
    - Create examiners. 
    - Create project teams.
    - List the examiners, and project teams. You should consider using https://datatables.net/ (Links to an external site.) to manage the tables displayed.
    - Provide information needed for your examiner and teams to enable the approach you design for examiner authentication and team selection.
    - Display the examiners, teams and the score board for each team.
