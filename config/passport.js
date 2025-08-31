const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails && profile.emails[0] && profile.emails[0].value,
      });
      await user.save();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));


};
