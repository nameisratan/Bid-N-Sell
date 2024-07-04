var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
const passport = require('passport');
const UserModel = require('../models/user');
require('dotenv').config();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET; 

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    await UserModel.findById(jwt_payload.id).then((user)=>
    {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch(err => {
        if(err) console.log(err);
    });
}));
