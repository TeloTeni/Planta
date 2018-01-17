var keystone = require('keystone');
//var paginate = require('handlebars-paginate');



exports = module.exports = function(req, res){
  var view = new keystone.View(req, res);

    var locals = res.locals;
    // locals.section is for nav menu
    locals.section = 'products';

  	locals.data = {
  		products: [],
  		};

    view.on('init', function (next) {

  		var q = keystone.list('Product').paginate({
  			page: req.query.page || 1,
  			perPage: 10,
  			maxPages: 10,
      });

  		q.exec(function (err, results) {
  			locals.data.products = results;
  			next(err);
  		});
  	});
    // Load Products
   view.query('products', keystone.list('Product').model.find());

// Render View
    view.render('products');

};
