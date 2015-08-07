var Sequelize = require('sequelize');
var db = require('../config/postgres.js');

var schema = {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
};

var classMethods = {};

classMethods.login = function(username, password) {
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    if(user.usesPassword(password)) {
      return user;
    }
    return false;
  });
};

classMethods.signup = function(username, password, email) {
  if(!isValidUsername())
      return false;
  if(!isValidPassword())
      return false;
  if(!isValidEmail())
      return false;
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    if(user) {
      return user;
    }
    return User.findOne({
      where: {
        email: email
      }
    });
  })
  .then(function(user) {
    if(user) {
      return false;
    }
    return User.create({username: username, password: password, email: email})
    .then(function(user){
      return user;
    });
  });
}

// --------------------------------------------------------------------------------

var instanceMethods = {};

instanceMethods.usesPassword = function(password) {
  return this.password === password;
};

// --------------------------------------------------------------------------------

function isValidUsername(username) {
  return true;
}

function isValidPassword(password) {
  return true;
}

function isValidEmail(email) {
  return true;
}

var User = db.define('user', schema, {classMethods: classMethods, instanceMethods: instanceMethods});

db.sync();
module.exports = User;