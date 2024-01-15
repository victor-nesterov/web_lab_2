var express = require('express');

var app = express();
var server = app.listen(5500);

app.use(express.static('public'));

console.log("Server is ok");


var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) 
{
    console.log('new connection: ' + socket.id);

    socket.on('mouse_line', mouseMessage);

    function mouseMessage(data)
    {
        socket.broadcast.emit('mouse_line', data);
        //console.log(data);
    }
}
