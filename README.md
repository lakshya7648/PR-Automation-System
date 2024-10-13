
# PR Automation System

Developed an automated system for GitHub pull request (PR) reviews that integrates OAuth authentication and utilizes AI for code evaluation. The project enhances the efficiency of code reviews and facilitates seamless collaboration among developers.




## Assumptions
There are several assumptions used in this:

    1. No UI for pull requests has to be shown means whatever the data added whatever was the pull request is not shown in this.

    2. Due to less time accesstoken has been stored both in backend Database and localStorage for automation and good user experience.

## Future Improvements
While the current implementation of the Automated GitHub PR Review System provides a solid foundation, there are several areas for potential enhancement:
**User Interface and User Experience**
    UI/UX can be enhanced by including an option to create webhook with more options and to show the details PR raised and what comment is added by the AI Model.

**Security**
    Although tried to achieve as much as security possible, system can be furthur enhanced in future by storing the token in database only and sending the frontend access token encrypted by JWT.

**User Customization Options**
    Allow users to customize the criteria for automated reviews, enabling them to set specific rules or thresholds that align with their coding practices.

**Testing Suite**
    Develop a comprehensive testing suite to ensure all functionalities work as expected and to facilitate future development.

**Performance Optimization**
    Optimize the system for better performance and scalability, ensuring it can handle larger repositories and higher volumes of PRs without latency.

    
And many more improvements can be done in the project, thus by implementing these improvements, the system can evolve to better meet the needs of users and contribute to a more efficient development workflow.

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB, mongooseORM

**Linters:** eslint, prettier



## Installation

1. Clone this Github Repository

2. After cloning go to your folder and open CMD there and type the following

```bash
    npm install
```
to install the neccessary file for your project.
    a. Dont forget to run this both on frontend and backend folder. 

3. Ensure you have NodeJS in your computer to run this project.

4. Open CMD on both the folders i.e. frontend and backend folder (there is no folder with name frontend but a backend so this will differentiate between the two) and type the following :
   
**Frontend** 
```bash
    npm run dev
```
**Backend**
```bash
    node index.js
```
*If you have nodemon installed globally in your computer then do this*: 
```bash
    nodemon index.js
```

## Environment Variables

To run this project you will have to add following environment variables in both your frontend and backend to run the project smoothly - 

**Frontend :** ---- File : *.env.local*

`VITE_CLIENT_ID` : *your client_id obtained on creating a new oauth account in github.*

`VITE_HOOKS_CREATION_SECRET` : *your hooks creation secret which is upto you to choose anything as a secret which will be used to validate your webhook payload.*

`VITE_WEBHOOK_BACKEND_DELIVERY_URL` : *It may be your smee.io url or your actual hosted backend url endpoint which will handle the pr request payload to provide AI Review.*

**Backend :** ---- File : *.env*

`PORT` : *your application port eg:3000*

`CLIENT_ID` : *Same as obtained for above*

`CLIENT_SECRET` : *Will get at the same time when getting the client_id on github.*

`WEBHOOK_SECRET` : *Same as `VITE_HOOKS_CREATION_SECRET` .*

`GOOGLE_API_KEY` : *Can be obtained through the google gemini AI (references below).*

`MONGODB_URI` : *Your local or cloud mongodb uri for backend handling.*

`WEBHOOK_PROXY_URL` : *Same as `VITE_WEBHOOK_BACKEND_DELIVERY_URL` .*



## How to run

1. Open the `localhost:5173` on the browser and click on the button `loginwithgithub`.

2. Create your webhook by clicking on `create webhook` button.

3. After above your webhook will be created go and create the pull request in your repository where you created the webhook. (*For this purpose you can create a github test repository*).



## Node Modules Installed

**Frontend :**

1. TailwindCSS
2. Eslint and Prettier
3. prop-types


**Backend :**

1. Eslint and Prettier
2. @langchain/google-genai
    ```bash
        npm install @langchain/google-genai
    ```
3. cors
4. dotenv
5. express
6. mongoose
7. winston

*Incase if any error arises kindly install the node global packages among above or you can contact me*

### How to do this
```bash
    npm install -g <package-name>
```


## Authors

- [@lakshya7648](https://www.github.com/lakshya7648)


## Important Links For Reference

1. TailwindCSS

    [TailwindCSS](https://www.tailwindcss.com)

2. Creating an oAuth App

    [Create OAuth in Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

3. Testing Webhook

    [Testing Webhook](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/testing-webhooks)
