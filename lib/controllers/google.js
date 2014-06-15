exports.auth = {
    handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
            request.auth.session.set(request.auth.credentials.profile);
            request.session.set('user', request.auth.credentials.profile.id);
            return reply.redirect('/');
        }
        return reply.redirect('/login');
    },
    auth: {
        strategies: ['google'],
        mode: 'try'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    }
};
