const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys.js'); // Relative to the location of index.js

const User = mongoose.model('users');

passport.deserializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(extstingUser => {
        if (extstingUser) {
            done(null, extstingUser);

        } else {
            new User({ googleId: profile.id }).save()
                .then(user => done(null, user));
            // console.log('accessToken', accessToken);
            // console.log('refreshToken', refreshToken);
            // console.log('profile:', profile);
        }
    })

}));
