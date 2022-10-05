const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// const host = '0.0.0.0'
const port = 3000;

// app.set('Host', host)
app.set("Port", port);
app.get("/", (req, res) => {
  res.json({ msg: "Express App" });
});

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log("server is running");
});
