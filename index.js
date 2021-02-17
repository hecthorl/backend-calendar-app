require("dotenv").config();
const express = require("express");
const bdConnection = require("./db/config");
const cors = require("cors");
const app = express();
bdConnection();
const auth = require("./routes/auth");
const events = require("./routes/events");

const port = process.env.PORT || 3002;

//cors
app.use(cors());

//directorio publico
app.use(express.static("public"));

//lectura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", auth);
app.use("/api/events", events);

app.listen(port, () => console.log("Server activo"));
