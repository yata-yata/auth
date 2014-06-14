// Load modules

var Controllers = require('./controllers'),
    Strategies = require('./strategies'),


// Declare internals
internals = {};

exports.register = function(plugin, options, next){

    // Register Strategies
    Strategies.Google.register(plugin, options);
    Strategies.Hawk.register(plugin, options);

    plugin.bind({
        options: options,
        passport: plugin.plugins.travelogue.passport
    });

    plugin.select('http').route([
        { method: 'GET', path: '/auth/google', config: Controllers.Google.auth },
        { method: 'GET', path: '/auth/google/callback', config: Controllers.Google.callback }
    ]);

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
