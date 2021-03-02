const config = require('./config');
const sql = require('mssql');
const express = require('express');
const path = require('path');
let users = require('./users.json');

var app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/angularRoute', express.static(__dirname + '/node_modules/angular-route'));

app.get('/', function(req, res) {
    res.status(200).sendFile('index.html');
});

app.get('/users', function(req, res) {
    res.status(200).send(users);
});

app.get('/user/:id', function(req, res) {
    const user = users.find(u => u.id === +req.params.id);
    res.status(200).send(user);
});

app.put('/user', (req, res) => {
    const existingUser = req.body;
    console.log(existingUser);
    const user = users.find(u => u.id === existingUser.id);
    user.name = existingUser.name;
    user.city = existingUser.city;
    user.country = existingUser.country;
    res.status(200).send(user);
})

app.delete('/user/:id', function(req, res) {
    users = users.filter(u => u.id !== +req.params.id);
    res.status(200).send('true');
});

// survey api
app.post('/survey', (req, res) => {
    const survey = req.body;
    var myQuery = `insert into surveys(name) values('${survey.name}')`;

    sql.connect(config).then((pool) => {
        return pool.request().query(myQuery);
    }).then(result => {
        sql.close();
        res.status(200).send("Record added successfully.");
    }).catch(err => {
        console.log(err);
        sql.close();
        res.status(501).send(err);
    })

})

app.listen(port);

console.log('Plase goto http://localhost:'+ port +' to access this app');
console.log('Perosn CRUD is listening on port :', port);
