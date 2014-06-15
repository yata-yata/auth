// Load modules

exports.register = function(plugin, options, next){

    // Register Deps
    plugin.register({
        plugin: require('hapi-auth-cookie')
    }, function(err){

        // Declare plugin dependencies
        plugin.dependency('hapi-auth-cookie');


        plugin.auth.strategy('session', 'cookie', {
            password: process.env.cookieKey,
            cookie: 'sid-yata',
            redirectTo: '/login',
            isSecure: false
        });

        return next(err);
    });

};


