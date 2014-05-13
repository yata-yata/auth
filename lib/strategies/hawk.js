// Load modules

// Declare internals
var internals = {};

exports.register = function(plugin, options){

    plugin.auth.strategy('api', 'hawk', {
        getCredentialsFunc: function (id, callback) {
            return callback(null, {
                id: process.env.hawkClient,
                key: process.env.hawkSecret,
                algorithm: 'sha256'
            });
        }
    });
};

