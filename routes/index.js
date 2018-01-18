/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/products', routes.views.products);
	app.all('/addproducts', routes.views.addproducts);
	//app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/search', routes.views.search);
	app.all('/roellke', routes.views.vendors.roellke);
	app.all('/wlodarczyk', routes.views.vendors.wlodarczyk);
	app.all('/elsner', routes.views.vendors.elsner);
	app.all('/schwerter', routes.views.vendors.schwerter);
	app.all('/wichmann', routes.views.vendors.wichmann);
	app.all('/asendorfer', routes.views.vendors.asendorfer);
	app.all('/akerne', routes.views.vendors.akerne);
	app.all('/msb', routes.views.vendors.msb);
	app.all('/karge', routes.views.vendors.karge);
	app.all('/nardotto', routes.views.vendors.nardotto);
	app.all('/wossner', routes.views.vendors.wossner);
	app.all('/hennis', routes.views.vendors.hennis);
	app.all('/currlin', routes.views.vendors.currlin);
	app.all('/blumenjanke', routes.views.vendors.blumenjanke);
	//app.all('/luke', routes.views.vendors.luke);
	app.all('/onemore', routes.views.plant);
	app.all('/plant', routes.views.plant);
	app.all('/concatenation', routes.views.concatenation);
// additional authentification link
	//app.all('/join', routes.views.auth.join);
	//app.all('/signin', routes.views.auth.signin);
	//app.get('/signout', routes.views.auth.signout);
	//app.all('/forgotpassword', routes.views.auth.forgotpassword);
	//app.all('/resetpassword/:key', routes.views.auth.resetpassword);
//app.all('/myproducts*', middleware.requireUser);
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
//app.all('/products', middleware.requireUser, routes.views.addproducts);
};
