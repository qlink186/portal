const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../model/user');
const configAuth = require('../config/auth');

const myModule = 'auth';

passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({where:{ 'google.id' : profile.id}}).then((row) => {
                let user = row.get();
                if (user) {
                    return done(null, user);
                } else {
                    let newUser          = {};
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value;
                    User.create(newUser).then(() => {
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, username, password, done) {
    User.findOne({
        where:{
            username: username
        }})
        .then((row) => {
            if(!row) return done(null, false, 'Username Tidak Ditemukan, Silakan Coba Lagi');
            let user = row.get();
            if(!user.status_user) return done(null, false, 'Akun anda belum aktif, Silakan Kontak Administrator Diskominfo Kota Tanjungpinang');
            User.comparePassword(password, user.paswd, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, 'Password Salah, Silakan Coba Lagi');
                }
            });
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id_user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then((user) => {
        done(null, user.get());
    });
});

router.get('/', isLoggedIn, function(req, res, next) {
    let data = {title:'Login', menu: 'login'};
    data = Object.assign(data, res.locals);
    data = Object.assign(data, {'module':myModule,'adm_url':res.locals.adm_url+myModule+'/'});
    res.render('login/login', data);
});

/*router.post('/', passport.authenticate('local'), function(req, res) {
    console.log( req );
    res.json(true);
    res.end();
});*/

router.post('/', passport.authenticate('local'), function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(400).json(info); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json(info);
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'Anda berhasil keluar');
    res.redirect('/auth');
});

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/adm');
    }else{
        return next();
    }
}

module.exports = router;