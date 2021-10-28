// Cargamos el modelo recien creado
const User = require("../models/User");
// Cargamos el fichero de los HTTPSTATUSCODE
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
//Metodo para retornar todos los colores registrados en la base de datos


//Exportamos las funciones
module.exports = {
  getAllUsers,
  getUserById,
};
