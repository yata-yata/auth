exports.auth = {
    auth: false,
    handler: function (request, reply) {
        this.passport.authenticate('google', { scope : ['profile', 'email'] })(request, reply);
    }
};

exports.callback = {
    auth: false,
    handler: function (request, reply) {

        this.passport.authenticate('google')(request, reply, function (err) {

            if (err && err.isBoom) {
                request.session.error = err;
            }

            // TODO: Redirect to previous
            reply().redirect('/home');
        });
    }
};
