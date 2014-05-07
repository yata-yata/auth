// Load modules
var Users = require('../persistence/users'),

    // Declare internals
    internals = {};

module.exports = function(){
  this.users = new Users();
};

module.exports.prototype.get = function(options, callback){
  this.users.get(options.id, callback);
};

module.exports.prototype.create = function(options, callback){
  this.users.create(options.id, options.model, callback);
};

module.exports.prototype.update = function(options, callback){
  this.users.update(options.id, options.model, callback);
};

module.exports.prototype.destroy = function(options, callback){
  this.users.destroy(options.id, callback);
};

