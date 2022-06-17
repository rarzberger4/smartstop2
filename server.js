const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const indexRouter = require('./api/routes/indexRouter')
const plannerRouter = require('./api/routes/plannerRouter')
const contactRouter = require('./api/routes/contactRouter')

const app = express();
const port = process.env.PORT ?? 3000;

// Serving static files from folder 'files'
app.use(express.static(path.join(__dirname, 'files')));

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


app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`) //test
    }
});