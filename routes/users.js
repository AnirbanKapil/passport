var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
var plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testingpassport");

const userSchema = mongoose.Schema({
  username : String,
  password : String,
  secret : String
});

userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema);
