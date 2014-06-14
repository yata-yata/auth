// Load modules

// Declare internals
var internals = {};

exports.register = function(plugin, options){

    plugin.auth.strategy('bell', 'bell', {
        provider: 'google',
        password: 'cookie_encryption_password',
        clientID: process.env.googleClient,
        clientSecret: process.env.googleSecret,
        isSecure: false
    });
};

