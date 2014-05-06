exports.auth = {
  auth: false,
  handler: function (request, reply) {

    this.passport.authenticate('google')(request, reply);
  }
};

exports.redirect = {
  auth: false,
  handler: function (request, reply) {

    this.passport.authenticate('google', {
      failureRedirect: this.options.failureRedirect,
      successRedirect: this.options.successRedirect,
      failureFlash: true
    })(request, reply, function (err) {

      if (err && err.isBoom) {
        request.session.error = err;
      }
      reply().redirect('/');
    });
  }
};
