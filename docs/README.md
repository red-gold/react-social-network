<!-- Logo -->
<p align="center">
  <a href="https://github.com/Qolzam/react-social-network">
    <img height="128" width="128" src="https://raw.githubusercontent.com/Qolzam/react-social-network/master/docs/app/logo.png">
  </a>
</p>
<!-- Name -->
<h1 align="center">
  <a href="https://github.com/Qolzam/react-social-network">React Social Network </a>:rocket:<span style="font-variant-caps: petite-caps;font-size: 30px;font-weight: 100;"> Version NEXT! </span>:rocket:
</h1>

[![Gitter](https://badges.gitter.im/react-social-network/Lobby.svg)](https://gitter.im/react-social-network/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The React Social Network is an open source project relying on [React](https://facebook.github.io/react/docs/hello-world.html) a powerful javascript library for building the user interface. In this project, I tried to show some features of react/react components as a social network. 
The structure of this project give the ability to devoloper to develop their project on thier own idea and environment.

<p align="center">
  <a href="http://greensocial.herokuapp.com/">
    <img src="https://raw.githubusercontent.com/Qolzam/react-social-network/master/docs/app/multi-device.png">
  </a>
</p>

Since I started building this project I've planned to have a back end for this project so I haven't focused on performance until I build the back end and move some data procedure from end to back end. Therefore I need to change data structure and actions for [Redux](http://redux.js.org/).
For those who prefer writing code by typescript, now React Social Network support both javascript and typescript language.

>You should consult the [CHANGELOG](https://github.com/Qolzam/react-social-network/blob/master/CHANGELOG.md) and related issues for more information

This project adheres to the Contributor Covenant [code of conduct](https://github.com/Qolzam/react-social-network/blob/master/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior to amir.gholzam@live.com.

## Example

  [Love Open Social](https://love-social.firebaseapp.com)

## Required Knowledge

I recommend that you get to know React before using React Social Network. React Social Network has built by React components, so understanding how React fits into web development is important.

(If you're not familiar with the concept of Single Page Applications (SPAs), head over to the [here](https://www.codeschool.com/beginners-guide-to-web-development/single-page-applications) for a quick introduction before you read on.

## Document

  Comming soon :) ...


## Roadmap
 1. Support Firebase/Firestore -> on developing
 2. Support AWS -> on developing
 3. Support Azure
 4. Support ASP.NET -> on developing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

 Install [NodeJs](https://nodejs.org/en/)
 
#### Note

 - If you're using Windows you should install all node-gyp dependencies with following commands:

`$ npm install --global --production windows-build-tools`
and then install the package

`$ npm install --global node-gyp`


### Installing

1. Fork the [react-social-network](https://github.com/Qolzam/react-social-network) repository on Github
2. Clone your fork to your local machine `git clone git@github.com:<yourname>/react-social-network.git`

3. Choose and install your backend bfore installing UI

    [![Firestore](https://raw.githubusercontent.com/Qolzam/react-social-network/master/docs/app/firestore.png)](firebase.google.com/cloud/firestore)
    #### [Firestore Social Backend](https://github.com/Qolzam/firestore-social-backend)
      * Configure firebase:
        * Get [firebase config](https://firebase.google.com/docs/web/setup)
        * Create a folder in root folder `react-social-network` set the name `config` => `>react-social-network\config`
        * Create three files in `>react-social-network\config` set their name `development.env` , `test.env` and `production.env` => `>react-social-network\config\development.env` and `>react-social-network\config\test.env`
        * Inside the files, you should write some keys of firebase configuration (each file is depend on the environment you work in `NODE_ENV`. If you set `NODE_ENV=development` your project will use from [development.env](https://github.com/Qolzam/react-social-network/blob/master/docs/app/configure/development.env) or [production.env](https://github.com/Qolzam/react-social-network/blob/master/docs/app/configure/production.env) to config firebase but if you set it `NODE_ENV=test` it will use `test.env` in test environment):
        * [Enable Email/Password](https://firebase.google.com/docs/auth/web/password-auth) sign-in on firebase:
            * In the Firebase console, open the Auth section.
            * On the Sign in method tab, enable the Email/password sign-in method and click Save.
        * [Enable Firestore](https://firebase.google.com/docs/firestore/quickstart)
          * Open the [Firebase Console](https://console.firebase.google.com/) and create a new project.
          * In the Database section, click Try Firestore Beta.
          * Click Enable.
        * [Install Firestore Social Backend](https://github.com/Qolzam/firestore-social-backend)
      * Enable firestore dependecies
        * Go to React Social Network folder in `src/socialEngine.ts` write `useFirestore(provider)` to enable firestore dependencies!

    #### AWS Social Backend
      * Comming soon ...
    #### [ASP.NET Social Backend](https://github.com/Qolzam/aspnet-core-social-network)
      * Comming soon ...

4. Installing all nodejs modules:
  `npm install`
5. Go ahead ;)
  `npm start`




## Deployment
Follow [firebase instruction](https://firebase.google.com/docs/hosting/deploying)
`firebase deploy`

## Built With

  * [TypeScript](https://www.typescriptlang.org/) TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
  * [JSX/TSX](https://jsx.github.io/) This project support both *.jsx and *.tsx files. JSX is a statically-typed, object-oriented programming language designed to run on modern web browsers. Being developed at DeNA as a research project, the language has following characteristics.
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

## Contributing

[React Social Network](https://love-social.firebaseapp.com) has been made by love. I planed to build a back-end for this project and improve the performance as I process all procedures on the front-end side. If you'd like to help,
check out the [document](https://qolzam.gitbooks.io/react-social-network/).
I'd greatly appreciate any [contribution](https://github.com/Qolzam/react-social-network/blob/master/CONTRIBUTING.md)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Qolzam/react-social-network/tags). 

## Authors

  - Amir Movahedi
  - See also the list of [contributors](https://github.com/Qolzam/react-social-network/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Qolzam/react-social-network/blob/master/LICENSE) file for details


## Acknowledgments

* React
* Firebase
* JavaScript
* TypeScript


