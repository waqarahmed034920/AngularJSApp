const db = require('./db');
const config = require('./config');
const sql = require('mssql');
const express = require('express');
const path = require('path');
let users = require('./users.json');
const { options } = require('./config');
const { data } = require('jquery');
const { brotliDecompress } = require('zlib');

var app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrapjs', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/angularRoute', express.static(__dirname + '/node_modules/angular-route'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/', function (req, res) {
    res.status(200).sendFile('index.html');
});

app.get('/users', function (req, res) {
    res.status(200).send(users);
});

app.get('/user/:id', function (req, res) {
    const user = users.find(u => u.id === +req.params.id);
    res.status(200).send(user);
});

// put is for update
app.put('/user', (req, res) => {
    const existingUser = req.body;
    console.log(existingUser);
    const user = users.find(u => u.id === existingUser.id);
    user.name = existingUser.name;
    user.city = existingUser.city;
    user.country = existingUser.country;
    res.status(200).send(user);
})

// "update EmpSalary_Info set EmpName = '" + txtname + "' where EmpId=" + txtid,connection);
app.delete('/user/:id', function (req, res) {
    users = users.filter(u => u.id !== +req.params.id);
    res.status(200).send('true');
});

// survey api
// this is for insert
app.post('/survey', (req, res) => {

    const survey = req.body;
    var myQuery = `insert into tblsurvey(name, description, startDate, endDate, surveyFor) 
    values('${survey.name}', '${survey.description}', '${survey.startDate}', '${survey.endDate}', '${survey.surveyFor}')`;

    db.InsertOrUpdate(myQuery)
        .then((data) => {
            res.status(200).send('Record added successfully.');
        }, (err) => {
            res.status(501).send(err);
        });

})

app.get('/surveys', (req, res) => {
    var myQuery = "select * from tblSurvey";
    db.getDataSet(myQuery)
        .then((data) => {
            res.status(200).send(data);
        }, (err) => {
            res.status(200).send(err);
        });
});



app.post('/question', (req, res) => {
    const question = req.body;
    var myQuery = `declare @qid int;
    insert into tblQuestions(SurveyId, Question) values('${question.surveyId}', '${question.question}' );
    select @qid = scope_identity();`;
    question.options.forEach(o => {
        myQuery += `insert into tblOptions(QuestionId,Text,Type) values(@qid,'${o.text}','${o.type}');`;
    });

    db.InsertOrUpdate(myQuery)
        .then((data) => {
            res.status(200).send('Record added successfully.');
        })
        .catch((err) => {
            res.status(501).send(err);
        });
});

app.post('/faq',(req,res) => {
    const faq = req.body;
    var myQuery = `insert into tblFaq(faq, answer) 
    values('${faq.faq}','${faq.answer}')`;

    db.InsertOrUpdate(myQuery)
        .then((data) =>{
            res.status(200).send('Record added successfully.');
        })
        .catch((err) =>{
            res.status(501).setDefaultEncoding(err);
        });
});

app.put('/faq',(req,res) =>{
    const faq = req.body;
    var myQuery = `update tblFaq set faq = '${faq.faq}', answer = '${faq.answer}' where id = ${faq.id}  `; 
    
    db.InsertOrUpdate(myQuery)
    .then((data) =>{
        res.status(200).send('Record update successfully');
    })
    .catch((err) =>{
        res.status(501).send(err);
    })
    
});

app.get('/faqs', (req,res) =>{
    
    var myQuery = "select * from tblFaq";

    db.getDataSet(myQuery)
     .then((data) =>{
         res.status(200).send(data);
     },(err)=> {
        res.status(200).send(err);
     });
    
});    


app.listen(port);

console.log('Plase goto http://localhost:' + port + ' to access this app');
console.log('Survey portal is listening on port :', port);
