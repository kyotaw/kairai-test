'use strict';

const passport = require('passport')
    , google = require('passport-google-oauth')
    , env = require('../env')
    , userService = require('../services/user_service');

passport.use(new google.OAuth2Strategy(
    {
        clientID: env.auth.google.CLIENT_ID,
        clientSecret: env.auth.google.CLIENT_SECRET,
        callbackURL: env.auth.google.CALLBACK_URL,
    },
    (request, accessToken, refreshToken, profile, done) => {
        userService.getBySocialId(profile.id, 'google').then(user => {
            if (user) {
                done(null, user);
            } else {
                user = userService.createSocialUser(profile.id, 'google').then(user => {
                    done(null, user);
                });
            }
        }).catch (err => {
            done(err);
        });
    }
));

function authenticateByGoogle() {
    return passport.authenticate('google', {session: false, scope: ['openid', 'profile']});
}

function callbackFromGoogle() {
    return passport.authenticate('google', {session: false});
}

module.exports = {
    authenticateByGoogle: authenticateByGoogle,
    callbackFromGoogle: callbackFromGoogle,
}
