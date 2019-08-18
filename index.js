var app = require("express")();
var http = require("http").createServer(app);
var path = require("path");
var io = require("socket.io")(http);

/**************************************************
 *                     SOCKET                     *
 **************************************************/

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

/**************************************************
 *                     REST                       *
 **************************************************/
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const port = process.env.PORT;
http.listen(port || 3000, function() {
  console.log("listening on *:" + port);
});
