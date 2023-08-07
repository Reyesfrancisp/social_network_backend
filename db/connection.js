const mongoose = require("mongoose");

//dJZROgOmIEyi8eUa
const isProduction = process.env.PORT;

if (isProduction) {
  mongoose.connect("mongodb+srv://reyesfrancisp:dJZROgOmIEyi8eUa@clusterfreyes.6oydxvn.mongodb.net/?retryWrites=true&w=majority")
} else mongoose.connect("mongodb://127.0.0.1:27017/social_network_api_db");


module.exports = mongoose.connection;