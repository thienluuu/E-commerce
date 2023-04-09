const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const connectDB = require("./config/connectDB");

const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./Routes/route");

const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // React port
//   },
// });

// io.on("connection", (socket) => {
//   console.log("user connected");
//   socket.on("setup", (userData) => {
//     socket.join(userData.token);
//     socket.emit("connected");
//   });
//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });

//   socket.on("private-chat", (message) => {
//     console.log(message);
//     socket.to(message.to).emit("private-chat", message);
//     io.emit("private-chat", message);
//   });
// });

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));

viewEngine(app);
initWebRoutes(app);
connectDB();
const PORT = process.env.PORT || 3030;

// server.listen(8080, () => {
//   console.log("Listening on port:" + 8080);
// });
app.listen(PORT, () => {
  console.log("Server running on:" + PORT);
});
