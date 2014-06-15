// Load modules

exports.register = function(plugin, options, next){

    // Register Deps
    plugin.register([require('bell')], function(err){

        // Declare plugin dependencies
        plugin.dependency('bell');

        plugin.auth.strategy('google', 'bell', {
            provider: 'google',
            password: process.env.cookieKey,
            clientId: process.env.googleClient,
            clientSecret: process.env.googleSecret,
            isSecure: false
        });

        return next(err);
    });

};

