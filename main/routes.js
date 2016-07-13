var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app, passport){
	app.get('/', ensureLoggedIn('/login'),function(req, res){
		res.render('home');
	})
	app.get('/login', function(req, res){
		res.render('login');
	})
	app.post('/login', passport.authenticate('local-login',{
		successRedirect: '/',
		failureRedirect: '/login'
	}));
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});
	app.get('/*', function(req, res){
		res.render('home');
	})
}