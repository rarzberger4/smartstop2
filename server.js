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



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/files/html/index.html');
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/files/html/index.html');
});

app.get('/planner.html', (req, res) => {
    res.sendFile(__dirname + '/files/html/planner.html');
});

app.get('/contact.html', (req, res) => {
    res.sendFile(__dirname + '/files/html/contact.html');
});





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

// cookie parser middleware
app.use(cookieParser());

//username and password
const myusername = 'user1';
const mypassword = 'mypassword';

// a variable to save a session
let session;        //this would be stored in a DB


// Route to Login Page

app.get('/login',(req,res) => {
    session=req.session;
    if(session.userid){
        res.sendFile(__dirname + '/files/html/index.html');
        //res.send("Welcome User <a href=\'/logout'>click to logout</a>");

    }else
        res.sendFile('/files/html/index.html',{root:__dirname});
        //app.use(express.static((__dirname, 'files')));
});


app.post('/login',(req,res) => {
    if(req.body.username === myusername && req.body.password === mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session);
        //res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
        res.sendFile(__dirname + '/files/html/index.html');

    }else{
            res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});















app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`) //shows server address at server start
    }
});