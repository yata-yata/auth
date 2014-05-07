// Load modules

var Controllers = require('./controllers'),
    GoogleStrategy = require('passport-google').Strategy,

    // Declare internals
    internals = {};

exports.register = function(plugin, options, next){
  var passport = plugin.plugins.travelogue.passport;

  passport.use(new GoogleStrategy(config.google, function (identifier, profile, done) {
    // Find or create user here...
    return done(null, profile);
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  plugin.auth('passport', {
    scheme: 'passport'
  });

  plugin.bind({
    options: options,
    passport: passport
  });

  plugin.select('http').route([
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

