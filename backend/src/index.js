const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());

// define server to use http protocol
const server = require('http').Server(app);

// define server to use socketio
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://admin:admin@cluster0-zbmz9.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

// create personal midware to use socket in all requests
app.use((req, res, next) =>{
    req.io = io;
    
    next();
});

app.use(cors());

app.use('/files',express.static(path.resolve(__dirname,'..','uploads','resized')));

app.use(routes);

server.listen(3333);  



