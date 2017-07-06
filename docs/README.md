 # React Social Network
The React Social Network is an open source project relying on [React](https://facebook.github.io/react/docs/hello-world.html) a powerful javascript library for building the user interface. In this project, I tried to show some features of react/react components as a social network.

Since I started building this project I've planned to have a back end for this project so I haven't focused on performance until I build the back end and move some data procedure from end to back end. Therefore I need to change data structure and actions for [Redux](http://redux.js.org/).

 ## DEMO
  [Green Open Social](http://greensocial.herokuapp.com)

 ## Features
  * [React](https://facebook.github.io/react/docs/hello-world.html) A javascript library for building user interfaces.
  * [Redux](http://redux.js.org/) is a predictable state container for JavaScript apps.
  * [Material-UI](http://www.material-ui.com/#/) A Set of React Components that Implement Google's Material Design.
  * [react-redux](https://github.com/reactjs/react-redux) Official React bindings for Redux.
  * [Firebase](https://firebase.google.com/) Firebase products like Analytics, Realtime Database, Messaging, and Crash Reporting let you move quickly and focus on your users.
  * [redux-thunk](https://github.com/gaearon/redux-thunk) Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
  * [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  * [React Router V4](https://github.com/ReactTraining/react-router) for routing website location
  * [Sass](http://sass-lang.com/) CSS with superpowers. Sass boasts more features and abilities than any other CSS extension language out there.
  * [Webpack](https://webpack.js.org/) for bundling code

## In my todo list :
  * Documentation
  * Testing
  * Security issues
  * Performance
  * Add some features and solving bugs
    * Sharing post in social itself and other socials
    * Add link feature to post
    * Add vido post
    * Add image gallery post
    * Search post and people
    ...


 # Prerequisites
 Install [NodeJs](https://nodejs.org/en/)

 # Installing
 1. Installing all nodejs modules:
  `npm install`
 2. Rub webpack to build bundle file
  `webpack`
 3. Running server:
  `node server.js`
 4. Configure firebase:
    - Get [firebase config](https://firebase.google.com/docs/web/setup)
    - Create a folder in root folder `react-blog` set the name `config` => `>react-blog\config`
    - Create two files in `>react-blog\config` set their name `development.env` and `test.env` => `>react-blog\config\development.env` and `>react-blog\config\test.env`
    - Inside the files, you should write some keys of firebase configuration (each file is depend on the environment you work in `NODE_ENV`. If you set `NODE_ENV=development` your project will use from `development.env` to config firebase but if you set it `NODE_ENV=test` it will use `test.env` in test environment):

      > API_KEY=<API_KEY> <br/>
      > AUTH_DOMAIN=<PROJECT_ID>.firebaseapp.com<br/>
      > DATABASE_URL=https://<DATABASE_NAME>.firebaseio.com<br/>
      > PROJECT_ID=<PROJECT_ID><br/>
      > STORAGE_BUCKET=<BUCKET>.appspot.com<br/>
      > MESSAGING_SENDER_ID=<SENDER_ID>HOST_URL<br/>

  - For example you should add `HOST_URL=http://localhost:3000` in `config/development.env` for development environment  and then add `HOST_URL=http://hostname.com` in `config/production.env` for production environment

 # Warning
 - If you're using Windows you should install all node-gyp dependencies with following commands:

`$ npm install --global --production windows-build-tools`
and then install the package

`$ npm install --global node-gyp`

 # Authors
  - Amir Movahedi

 #License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
# react-social-network
