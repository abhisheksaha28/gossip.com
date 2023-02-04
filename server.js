//jshint esversion : 6
const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
 const io = require("socket.io")(server);
// app.get("/", function(req,res) {

//     res.send("Hello");

// });
// app.get("/webdev", function(req,res) {

//     res.sendFile(__dirname+"./webdev.html" );

// });
app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function (socket) {
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " " + "joined the chatroom");

    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " " + "left the chatroom");

    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);

    });


});
server.listen(5000,function () {

    console.log("Server started at port 5000");

});