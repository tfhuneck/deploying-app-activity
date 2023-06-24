
const express   = require('express');
const app       = express();
const low       = require('lowdb');
const fs        = require('lowdb/adapters/FileSync');
const adapter   = new fs('database.json');
const db        = low(adapter);
const cors      = require('cors');
const { faker } = require('@faker-js/faker');
const port      = process.env.PORT || 2357;

//  cors = cross-origin resource sharing 
app.use(cors());

// initialize the database   
// ===comment out when using nodemon dev because of rerendering!=====
db.defaults({ users : [] }).write();

//  data parser - used to parse post data 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serving static files in ./public/
app.use('/',express.static('public'));

// return all users
app.get('/data', function(req, res){     
    res.send(db.get('users').value());
});

app.post('/add', (req, res) => {
    
    var user = {
        'name'          : req.body.name,
        'dob'           : req.body.dob,
        'email'         : req.body.email,
        'username'      : req.body.username,
        'password'      : req.body.password,
        'phone'         : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'city'          : req.body.city,
        'state'          : req.body.state,
        'zip'          : req.body.zip,
        'avatar'        : faker.internet.avatar() 
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
})


// Listen running server on Port
app.listen(port, () => {
    console.log(`Server now running on port ${port}`)
});