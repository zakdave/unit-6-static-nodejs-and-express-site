const express = require('express');
const {projects} = require('./data/data.json');
const port = process.env.PORT || 3000;

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

app.get('/project/:id', (req, res)=> {
    const projectId = req.params.id;
    const project = projects.find(({id}) => id === + projectId);
    res.render('project', {project});
});

//Handle 404 errors
app.use((req, res, next) => {
    const err = new Error('404 not found bud');
    err.status = 404;
    err.message = "The page is not available at this time. "
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404 || err.status === undefined) {
        console.log(`404 Error Handler called:\n\n${err.status} - ${err.message}`);
        res.render('404');
    }
});


//Host on port process.env or default port 3000
app.listen(port, () => console.log(`App is running on port ${port}`));


