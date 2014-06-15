// Load modules

var Controllers = require('./controllers'),
    Strategies = require('./strategies'),
    Async = require('async');

exports.register = function(plugin, options, next){

    // Register Strategies
    Async.parallel([
        Strategies.Bell.register.bind(this, plugin, options),
        Strategies.Hawk.register.bind(this, plugin, options),
        Strategies.Cookie.register.bind(this, plugin, options)
    ], function(err){

        plugin.select('http').route([
            { method: ['GET', 'POST'], path: '/auth/google', config: Controllers.Google.auth }
        ]);

        next(err);
    });

};

exports.register.attributes = {
    pkg: require('../package.json')
};
