var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.username);
	});

	passport.deserializeUser(function(username, done){
		var user = {
			username: "kbrown364",
			favoriteColor: "red"
		}
		done(null,user);
	});

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},function(req, username, password, done){
		//authenticate user here
		var user = {
			username: "kbrown364",
			password: "password"
		}
		if(username == user.username && password === user.password)
			return done(null, user);
		else
			return done(null, false);
	}));
}