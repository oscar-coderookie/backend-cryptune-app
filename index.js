const express = require("express");
const logger = require("morgan");
//Importamos la conexion a la db
const { connect } = require("./app/config/database");
const dotenv = require('dotenv');
dotenv.config()
//Importamos las rutas
const users = require("./app/api/routes/user.routes");
//Otras importaciones
const HTTPSTATUSCODE = require("./app/utils/httpStatusCode");
const cors = require("cors");

//Conectamos con la db
connect();

//* Guardamos el puerto en una variable:
const PORT = process.env.PORT || 3200;

const app = express();


//Config app
app.set("secretKey", "nodeRestApi"); // jwt secret token

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

// routes
app.get('/', (req, res, next) => {
  res.send("this is a sample express application")
})
app.use("/users", users);

app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.message = HTTPSTATUSCODE[404];
  next(err);
});

// handle errors
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || "Unexpected error");
});

app.disable("x-powered-by");

//Levantamos el servidor
app.listen(PORT, () => {
  console.log("Node server listening on port 3001, visit http://localhost:3001");
});
