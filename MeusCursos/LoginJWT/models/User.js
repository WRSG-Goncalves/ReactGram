const Sequelize = require('sequelize');
const db = require('./db');
const  User = db.define('users', {
    name : String,
    email : String,
    password : String
})
module.exports = User