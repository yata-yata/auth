var Users = require('./users');

module.exports = function(options){
    this.users = new Users();
};

