// Load modules

var Controllers = require('./controllers'),
    Strategies = require('./strategies'),


// Declare internals
internals = {};

exports.register = function(plugin, options, next){

    // Declare plugin dependencies
    plugin.dependency('bell');
    plugin.dependency('hapi-auth-hawk');

    // Register Strategies
    Strategies.Google.register(plugin, options);
    Strategies.Bell.register(plugin, options);
    Strategies.Hawk.register(plugin, options);

    plugin.bind({
        options: options,
        passport: plugin.plugins.travelogue.passport
    });

    plugin.select('http').route([
        {
            method: ['GET', 'POST'], // Must handle both GET and POST
            path: '/auth/google',          // The callback endpoint registered with the provider
            config: {
                auth: 'bell',
                handler: function (request, reply) {

                    // Perform any account lookup or registration, setup local session,
                    // and redirect to the application. The third-party credentials are
                    // stored in request.auth.credentials. Any query parameters from
                    // the initial request are passed back via request.auth.credentials.query.
                    return reply.redirect('/');
                }
            }
    }]);

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
