<!-- Logo -->
<p align="center">
  <a href="https://github.com/Qolzam/react-social-network">
    <img height="128" width="128" src="https://raw.githubusercontent.com/Qolzam/react-social-network/master/docs/app/logo.png">
  </a>
</p>
<!-- Name -->
<h1 align="center">
  <a href="https://github.com/Qolzam/react-social-network">React Social Network</a>
</h1>

[![Gitter](https://badges.gitter.im/react-social-network/Lobby.svg)](https://gitter.im/react-social-network/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The React Social Network is an open source project relying on [React](https://facebook.github.io/react/docs/hello-world.html) a powerful javascript library for building the user interface. In this project, I tried to show some features of react/react components as a social network.

<p align="center">
  <a href="http://greensocial.herokuapp.com/">
    <img src="https://raw.githubusercontent.com/Qolzam/react-social-network/master/docs/app/multi-device.png">
  </a>
</p>

Since I started building this project I've planned to have a back end for this project so I haven't focused on performance until I build the back end and move some data procedure from end to back end. Therefore I need to change data structure and actions for [Redux](http://redux.js.org/).

>You should consult the [CHANGELOG](https://github.com/Qolzam/react-social-network/blob/master/CHANGELOG.md) and related issues for more information

This project adheres to the Contributor Covenant [code of conduct](https://github.com/Qolzam/react-social-network/blob/master/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior to amir.gholzam@live.com.

## DEMO

  [Green Open Social](http://greensocial.herokuapp.com)

## Required Knowledge

I recommend that you get to know React before using React Social Network. React Social Network has built by React components, so understanding how React fits into web development is important.

(If you're not familiar with the concept of Single Page Applications (SPAs), head over to the [here](https://www.codeschool.com/beginners-guide-to-web-development/single-page-applications) for a quick introduction before you read on.

## Document

  Use [Documentation](https://qolzam.gitbooks.io/react-social-network/) to find out more details about this project.

## Features

  * [React](https://facebook.github.io/react/docs/hello-world.html) A javascript library for building user interfaces.
  * [Redux](http://redux.js.org/) is a predictable state container for JavaScript apps.
  * [Material-UI](http://www.material-ui.com/#/) A Set of React Components that Implement Google's Material Design.
  * [react-redux](https://github.com/reactjs/react-redux) Official React bindings for Redux.
  * [Firebase](https://firebase.google.com/) products like Analytics, Realtime Database, Messaging, and Crash Reporting let you move quickly and focus on your users.
  * [redux-thunk](https://github.com/gaearon/redux-thunk) Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
  * [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  * [React Router V4](https://github.com/ReactTraining/react-router) for routing website location
  * [Sass](http://sass-lang.com/) CSS with superpowers. Sass boasts more features and abilities than any other CSS extension language out there.
  * [Webpack](https://webpack.js.org/) for bundling code

## In my todo list

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

[![Build social network in 5 minutes](https://img.youtube.com/vi/E12PNKKjzqA/0.jpg)](https://www.youtube.com/watch?v=E12PNKKjzqA)

 1. Fork the [react-social-network](https://github.com/Qolzam/react-social-network) repository on Github
 2. Clone your fork to your local machine `git clone git@github.com:<yourname>/react-social-network.git`

  > You need to configure firbase first before starting other steps. We are using firebase storage to store files, firebase database to store user information and firebase authorization to authorize user with email and password.
 3. Configure firebase:
    - Get [firebase config](https://firebase.google.com/docs/web/setup)
    - Create a folder in root folder `react-social-network` set the name `config` => `>react-social-network\config`
    - Create three files in `>react-social-network\config` set their name `development.env` , `test.env` and `production.env` => `>react-social-network\config\development.env` and `>react-social-network\config\test.env`
    - Inside the files, you should write some keys of firebase configuration (each file is depend on the environment you work in `NODE_ENV`. If you set `NODE_ENV=development` your project will use from [development.env](https://github.com/Qolzam/react-social-network/blob/master/docs/app/configure/development.env) to config firebase but if you set it `NODE_ENV=test` it will use `test.env` in test environment):

      > API_KEY=[API_KEY] <br/>
      > AUTH_DOMAIN=[PROJECT_ID].firebaseapp.com<br/>
      > DATABASE_URL=https://[DATABASE_NAME].firebaseio.com<br/>
      > PROJECT_ID=[PROJECT_ID]<br/>
      > STORAGE_BUCKET=[BUCKET].appspot.com<br/>
      > MESSAGING_SENDER_ID=[SENDER_ID]HOST_URL<br/>

 4. [Enable Email/Password](https://firebase.google.com/docs/auth/web/password-auth) sign-in on firebase:
    - In the Firebase console, open the Auth section.
    - On the Sign in method tab, enable the Email/password sign-in method and click Save.

 5. Installing all nodejs modules:
  `npm install`
 6. Rub webpack to build bundle file
  `webpack`
 5. Running server:
  `node server.js`

# Warning

 - If you're using Windows you should install all node-gyp dependencies with following commands:

`$ npm install --global --production windows-build-tools`
and then install the package

`$ npm install --global node-gyp`

## Contribute

[React Social Network](http://greensocial.herokuapp.com/) has been made by love. I planed to build a back-end for this project and improve the perfomance as I process all procedures on the fron-end side. If you'd like to help,
check out the [document](https://qolzam.gitbooks.io/react-social-network/).
I'd greatly appreciate any [contribution](https://github.com/Qolzam/react-social-network/blob/master/CONTRIBUTING.md)
you make. :)

 # Authors

  - Amir Movahedi

# License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Qolzam/react-social-network/blob/master/LICENSE) file for details
