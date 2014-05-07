// Load modules

// Add key placeholder for testing
var db = require('orchestrate')(process.env.orchestrateKey || 'key'),
    uuid = require('node-uuid'),

    // Declare internals
    internals = {};

module.exports = function(){};

module.exports.prototype.get = function(id, callback){
  db.get('users', id)
    .then(function(response){
      callback(null, {
        id: id,
        provider: response.body.provider,
        displayName: response.body.displayName,
        email: response.body.email,
        avatar: response.body.avatar
      });
    })
    .fail(function(err){
      callback(err);
    });
};

module.exports.prototype.create = function(id, model, callback){
  db.put('users', id, model)
    .then(function(response){
      callback(null, id);
    })
    .fail(function(err){
      callback(err);
    });
};

module.exports.prototype.update = function(id, model, callback){
  db.put('users', id, model)
    .then(function(response){
      callback(null, id);
    })
    .fail(function(err){
      callback(err);
    });
};

module.exports.prototype.destroy = function(id, callback){
  db.remove('users', id)
    .then(function(response){
      callback(null, null);
    })
    .fail(function(err){
      callback(err);
    });
};

module.exports.prototype.createKey = function(){
  return uuid.v1();
};
