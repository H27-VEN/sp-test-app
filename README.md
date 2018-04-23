Basic crud application with reactJS as front-end and NodeJS and Express for capturing the data.

Now before moving toward installation there are certain **assumptions** that I have made which I will clarify below



# Assumptions
1. This is complete front end app and I have written backend code just for the simulation purpose.
2. The user data is stored in an array in the backend and will be lost once the server is restarted.
3. And since the data is stored temporarily there is no session management or other nifty backend features.
4. Validations are performed only on client side. 

now that's out of the way lets move towards Installation.

# Installation

clone the repo on your desktop using `git clone https://github.com/H27-VEN/sp-test-app.git`

`cd` in to the root directory

`cd sp-test-app`

Now use your Favourite package manager `npm` or `yarn` to install dependencies 

`sp-test-app>npm install`

or

`sp-test-app>yarn`

This will install server-side dependencies for NodeJS and ExpressJS

now cd in to `react-src` directory which is inside `sp-test-app`


`sp-test-app>cd react-src`


And again run the `install` using `npm install` or `yarn` This will install ReactJS dependencies


`sp-test-app\react-src>npm install`

or

`sp-test-app\react-src>yarn`



# Run 

now to run the application move to the root directory and run `npm` or `yarn` start

`sp-test-app>npm start`

that will start the backend at port 5000

now `cd react-src` to start the ReactJS development server

ReactJS server runs at port 3000 by default

### Note : Both the server must be running in order for app to work



# Preview
User Registeration

[Imgur](https://i.imgur.com/lW1Caym.gif)

User Delete.

[Imgur](https://i.imgur.com/EqmyVjr.gif)

User Update.

[Imgur](https://i.imgur.com/aCX814f.gif)
