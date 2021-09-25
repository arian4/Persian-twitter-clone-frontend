# Persian Twitter Clone
In progress... This project is a sample web app created by me to demonstrate my skills. It is made of two main folders. One is for the server which is entirely written by Django & DRF. The other is the client, which uses React.js 

Note: The server-side hasn't been deployed
**This application is designed to be responsive**
## What technologies does it use?
I haven't used a hundreds of JS libraries but instead have used fundamental technologies and built everything upon them:

## Virtual DOM: Powered by React.js
* More than 20 components have currently been designed and more to come
* Costume TextInputs, MultiSelects, Navbar, Hamburger Button,Toggle Button, A very responsive nav, A costume Theme Switching Button created by CSS and React and many more...

## State Management: React.js Contexts
* 4 Contexts have currently been created which make the entire application work in a smooth flow.
* As the APIs are currently under development after their completion other contexts will be added for fetching datas.
* for data fetching you can check /src/api/api_tweet.js (Data fetching is done using the Axios library)

## How to run?
* Install Node.js.
* Clone the repository.
* In the root directory type command: `$ npm i`
* To start the server type commands:  `$ npm run start`
* Open your browser and head to[http://localhost:3000] !
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


