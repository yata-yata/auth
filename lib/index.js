// Load modules

var Controllers = require('./controllers'),
    Services = require('./services'),
    Hoek = require('hoek'),
    GoogleStrategy = require('passport-google').Strategy,

    // Declare internals
    internals = {};

exports.register = function(plugin, options, next){
  var passport = plugin.plugins.travelogue.passport,
      services = new Services();


  // Register strategies

  passport.use(new GoogleStrategy(options.google,
    function (identifier, profile, next) {

      // Check if a user exists
      services.users.get({ id: identifier }, function(err, user){

        // If we have an error
        if(err){

          // Check if we just didn't find a user
          if(err.statusCode === 404){

            // If the user doesn't exist,
            // create them
            services.users.create({
              id: identifier,
              model: {
                first: profile.name.givenName,
                last: profile.name.familyName,
                email: Hoek.reach(profile, 'emails.0.value'),
                displayName: profile.displayName,
                provider: 'google'
              }
            }, next);

          } else {


            // Otherwise, we have another error
            plugin.log(['error', 'auth'], err);
            next(err);
          }
        } else {

          // If no error, we have a user
          next(null, profile);
        }

      });

    }
    ));


  // Passport Specific
  passport.serializeUser(function(user, next) {
    next(null, user);
  });
  passport.deserializeUser(function(obj, next) {
    next(null, obj);
  });


  // Plugin Setup

  plugin.auth.strategy('passport', 'passport');

  plugin.bind({
    options: options,
    passport: passport
  });

  plugin.select('http').route([
      // TODO: Remove this and put it in the ui component
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
      { method: 'GET', path: '/auth/google', config: Controllers.Google.auth },
      { method: 'GET', path: '/auth/google/return', config: Controllers.Google.redirect }

  ]);

  next();
};

