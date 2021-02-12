const express = require('express');
const {projects} = require('./data/data.json');

const app = express();

//Set view engine to pug 
app.set('view engine', 'pug');

//Serve static assets
app.use('/static', express.static('public'));

// Routes
app.get('/', (req, res, next) => {
    res.render('index', {projects});
});

app.get('/about', (req, res, next) => {
    res.render('about');
})


//Host on port 3000
app.listen(3000, () => console.log('App is running on port 3000'));


