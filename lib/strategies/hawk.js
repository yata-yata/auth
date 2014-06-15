// Load modules

exports.register = function(plugin, options, next){

    // Register Deps
    plugin.register({
        plugin: require('hapi-auth-hawk')
    }, function(err){

        // Declare plugin dependencies
        plugin.dependency('hapi-auth-hawk');


        plugin.auth.strategy('api', 'hawk', {
            getCredentialsFunc: function (id, callback){
                return callback(null, {
                    id: process.env.hawkClient,
                    key: process.env.hawkSecret,
                    algorithm: 'sha256'
                });
            }
        });

        return next(err);
    });

};

