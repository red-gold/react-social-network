# social-firebase built for [react-social-network](https://github.com/red-gold/react-social-network)
##  🚧 Not Ready yet under construction  🚧
## DO NOT USE THIS REPOSITORY
## Getting Started

I recommend read [firbase instruction](https://firebase.google.com/docs/functions/get-started) first, then continue installation.

### Prerequisites

 Install [NodeJs](https://nodejs.org/en/)
 
#### Note

 - If you're using Windows you should install all node-gyp dependencies with following commands:

`$ npm install --global --production windows-build-tools`
and then install the package

`$ npm install --global node-gyp`


### Installing
 
#### Install back-end server/serverless

 1. Fork the [firestore-social-backend](https://github.com/Qolzam/firestore-social-backend) repository on Github
 1. Clone your fork to your local machine 
    ```bash
    git clone git@github.com:<yourname>/firestore-social-backend.git
    ```
 1. Go to the project root directory 
    ```bash
    cd firestore-social-backend
    ```
 1. Installing all nodejs modules:
    ```bash
    cd functions && npm install
    ```
 1. Configure firebase:
    - In command line of [react-social-network] root project, type [firebase login](https://firebase.google.com/docs/cli/). This command connects your local machine to your Firebase account and grants access to your projects. To test that authentication worked, you can run firebase list to see a list of all of your Firebase projects. The list should be the same as the projects listed at [Firebase console](https://console.firebase.google.com).
    - Be sure the name of firebase project for [react-social-network] and this project is same. You also need to check `.firebaserc` if you set correct project name in `default` field of `projects` field.
 1. Set the `gmail.email` and `gmail.password` Google Cloud environment variables to match the email and password of the Gmail account used to send emails (or [the app password](https://support.google.com/accounts/answer/185833?hl=en) if your account has 2-step verification enabled). The `recaptcha.secretKey` key is using for recaptcha secret key in SMS verification. The `phone.sourceNumber`, `plivo.authId` and `plivo.authToken` are configuration from [Plivo SMS Service](https://www.plivo.com/) in SMS verification .For this use:
    ```bash
    firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword" recaptcha.secretkey="secretKey" phone.sourcenumber="sourceNumber" plivo.authid="authId" plivo.authtoken="authToken" setting.appname="App Name"
    ```
 1. Deploy ;)
   ```bash
    npm start
   ```
