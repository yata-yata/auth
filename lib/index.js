// Load modules

var Controllers = require('./controllers'),
    GoogleStrategy = require('passport-google').Strategy,

    // Declare internals
    internals = {};

exports.register = function(plugin, options, next){
  plugin.auth('passport', {
    scheme: 'passport'
  });

  plugin.bind({
    options: options,
    passport: passport
  });

  plugin.select('api').route([
      {
        method: 'GET',
        path: '/login',
        config: {
          auth: false, // use this if your app uses other hapi auth schemes, otherwise optional
          handler: function (request, reply) {

            var html = '<a href="/auth/google">Login with Google</a>';
            if (request.session) {
              html += "<br/><br/><pre><span style='background-color: #eee'>session: " + JSON.stringify(request.session, null, 2) + "</span></pre>";
            }
            reply(html);
          }
        }
      },
      {
        method: 'GET',
        path: '/home',
        config: { auth: 'passport' },
        handler: function (request, reply) {

          // If logged in already, redirect to /home
          // else to /login
          reply("ACCESS GRANTED");
        }
      },
      { method: 'GET', path: '/auth/google' , config: Controllers.Google.auth },
      { method: 'GET', path: '/auth/google/return' , Controllers.Google.redirect }

  ]);

  next();
};

