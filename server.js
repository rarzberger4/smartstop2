const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require("cookie-parser");      //session management
const sessions = require('express-session');        //session management

const indexRouter = require('./api/routes/indexRouter')
const plannerRouter = require('./api/routes/plannerRouter')
const contactRouter = require('./api/routes/contactRouter')

const app = express();
const port = process.env.PORT ?? 3000;

//serving public file
app.use(express.static((__dirname, 'files')));

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (from requests)
app.use(bodyParser.json());

// Include the index routes
app.use('/api', indexRouter);

//Include the planner routes
app.use('/api', plannerRouter);

//Include the contact routes
app.use('/api', contactRouter);

//Include the index routes
app.use('/api', indexRouter);







//###Session Management###


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "super9secret8secret7for6the5super4secret3session2",            //in production environment much longer and random created
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//users and PWs --> usually a DB
const users = [
    { id: 1, user: "user1", password: "secret"},
    { id: 2, user: "user2", password: "secret"},
    { id: 3, user: "user3", password: "secret"},
]

// cookie parser middleware
app.use(cookieParser());


// a variable to save a session
let session;        //this would be stored in a DB


// Route to Login Page
app.get('/login',(req,res) => {
    session=req.session;
    if(session.userid){                                                                           //checks if there is a session id (cookie)
        res.sendFile(__dirname + '/files/html/index.html');
    }else
        res.sendFile('/files/html/login.html',{root:__dirname});
});

app.post('/login',(req,res) => {//login form is processed here
    /*
    if(req.body.username === myusername && req.body.password === mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session);
        res.sendFile(__dirname + '/files/html/index.html');

    }else{
            res.send('Invalid username or password');
    }*/

    const user = users.find(
        user => user.user === req.body.username && user.password === req.body.password
    )

    if(user){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session);
        res.redirect("/index.html");
    }else {
        res.send('Invalid username or password');
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/', (req, res) => {                    //sends you directly to login if you land on the page
    session=req.session;
    if(session.userid){
        res.sendFile(__dirname + '/files/html/index.html');
        //res.send("Welcome User <a href=\'/logout'>click to logout</a>");

    }else
        res.sendFile('/files/html/login.html',{root:__dirname});
});

app.get('/index.html', (req, res) => {          //checks if you have a valid session before routing you to the page --> logged in
    session=req.session;
    if(session.userid){
        res.sendFile(__dirname + '/files/html/index.html');
        //res.send("Welcome User <a href=\'/logout'>click to logout</a>");

    }else
        res.sendFile('/files/html/login.html',{root:__dirname});
});

app.get('/planner.html', (req, res) => {        //checks if you have a valid session before routing you to the page --> logged in
    session=req.session;
    if(session.userid){
        res.sendFile(__dirname + '/files/html/planner.html');
    }else
        res.sendFile('/files/html/login.html',{root:__dirname});
});

app.get('/contact.html', (req, res) => {             //checks if you have a valid session before routing you to the page --> logged in
    session=req.session;
    if(session.userid){
        res.sendFile(__dirname + '/files/html/contact.html');

    }else
        res.sendFile('/files/html/login.html',{root:__dirname});
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/files/html/register.html');
});

app.post('/register', (req, res) => {
    if(req.body.username && req.body.password){
        const exists = users.some(
            user => user.user === req.body.username
        )

        if(!exists){
            const user = {
                id: users.length + 1,
                user: req.body.username,
                password: req.body.password
            }

            users.push(user);

            session=req.session;
            session.userid=req.body.username;
            console.log(req.session);
            res.redirect("/index.html");
        }else{
            res.redirect("/register" + encodeURIComponent('Incorrect username or password'));
        }

    }

});








app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`) //shows server address at server start
    }
});