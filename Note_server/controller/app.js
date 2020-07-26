var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var path = require('path');

var cors = require('cors');
var cor = cors();
app.use(cor);
app.use(express.static(path.join(__dirname, "../public")));
const  sqlite3  =  require('sqlite3').verbose();
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const SECRET_KEY = "secretkey23456";

var note = require('../model/note.js');
var topic = require('../model/topic.js');
var event = require('../model/event.js')
var user = require('../model/user.js')

app.get('/api/:idnote/note', function (req, res){
    var idnote = req.params.idnote;
    note.getNoteByid(idnote, function (err, result ){
        if (!err){
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

app.get('/api/note', function (req, res){
    note.getNote(function (err, result){
        if (!err){
            res.send(result);
        }else{
            console.log(err);
            req.status(500).send(err)
        }
    });

});

app.post('/api/note', urlencodedParser, jsonParser, function (req, res) {
    const noteData = req.body
    // var idtopic = req.body.idtopic;
    // var tanggal = req.body.tanggal;
    // var deskripsi = req.body.deskripsi;
    // var mulai = req.body.mulai;
    // var selesai = req.body.selesai;
    // var catatan = req.body.catatan;

    note.addNote(noteData, function (err, result) {
        if (!err) {
            console.log(result);
            // res.send(result.affectedRows + 'record ditambahkan');
            res.send(JSON.stringify({status:200, data:result, success:"berhasil ditambahkan"}))
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

app.delete('/api/note/:idnote', function (req, res) {
    var idnote = req.params.idnote;

    note.deleteNote(idnote, function (err, result) {
        if (!err) {
            console.log(result);
            res.send({success:true,  result:result});
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }

    });
});

app.get('/api/note/user/:iduser', function(req, res){
var iduser = req.params.iduser;


    note.getPerUser(iduser, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }

    });
});

app.get('/api/:idtopic/topic', function (req, res){
    var idtopic = req.params.idtopic;
    note.getTopicByid(idtopic, function (err, result ){
        if (!err){
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

app.get('/api/topic', function(req, res){
    topic.getTopic(function(err, result){
        if (!err){
            res.send(result);
        }
        else{
            console.log(err);
            res.status(500).send(err);
        }
    })
})

app.get('/api/event', function(req, res) {
    event.getAll(function(err, result){
        if (err) {
            console.log(err)
            res.send(err)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})
app.delete('/api/event/:idevent/:iduser', function(req, res){
    var idevent = req.params.idevent
    var iduser = req.params.iduser
    event.delete(iduser, idevent, function(err, result){
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

app.get('/api/event/:idevent', function(req, res) {
    event.getById(req.params.idevent, function(err, result){
        if (err) {
            console.log(err)
            res.send(err)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

app.get('/api/event/total/:iduser', function(req, res){
    event.getTotalMenunggu(req.params.iduser, function(err, result){
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(result)
            res.send(result)
        }
    })
})

app.get('/api/event/menunggu/:iduser', function(req, res){
    event.getMenunggu(req.params.iduser, function(err, result){
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(result)
            res.send(result)
        }
    })
})

app.post('/api/event/update_participant',urlencodedParser, jsonParser, function(req, res){
    const status = req.body.status
    const idevent = req.body.idevent
    const iduser = req.body.iduser

    console.log(req.body)

    event.updateParticipant(status, idevent, iduser, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else{
            console.log(result)
            res.send({success: result})
        }
    })
})

app.get('/api/event/user/:id', function(req, res){

    event.getPerUser(req.params.id, function(err, result){
        if (err) {
            console.log(err)
            res.send(err)
        }
        else{
            console.log(result)
            res.send(result)
        }
    })
})

app.post('/auth/login',urlencodedParser, jsonParser, function(req, res){
    const users = req.body
    console.log(users)
    user.login(users, function(err, result){
        if (!err) {
            const  compare  =  bcrypt.compareSync(users.password, result.password);
            if (compare) {
                const  expiresIn  =  24  *  60  *  60;
                const  accessToken  =  jwt.sign({ id:  result.iduser }, SECRET_KEY, {
                    expiresIn:  expiresIn
                });
                res.send({success:true, "user":  result, "access_token":  accessToken, "expires_in":  expiresIn});
            }
            else{
                res.send({success:false});
                
            }
        }
        //     console.log(result)
        //     res.send(result)
        // }
        // else{
        //     console.log(err)
        //     res.send(err)
        // }
    })
})

app.post('/api/token/user/:iduser',urlencodedParser, jsonParser, function(req, res){
    const iduser = req.params.iduser
    const token = req.body.token
    const body = req.body

    console.log(body)

    user.updateToken(iduser, token, function(err , result){
        if (!err) {
            console.log(result)
            res.send(result)
        }
        else{
            console.log(err)
            res.send(err)
        }
    })
})
module.exports = app