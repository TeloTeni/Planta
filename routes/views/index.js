var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);


	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';


//TODO: add table with last ten plants and button "all new plants" (for today date)
  view.query('products', keystone.list('Product').model.find().limit(10));

	// Render the view
	view.render('index');
};
