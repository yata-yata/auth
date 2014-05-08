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
      { method: 'GET', path: '/auth/google', config: Controllers.Google.auth },
      { method: 'GET', path: '/auth/google/return', config: Controllers.Google.redirect }
  ]);

  next();
};

