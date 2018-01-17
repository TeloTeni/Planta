var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function(req, res){

  var view = new keystone.View(req, res);

  locals = res.locals;
//Set locals
locals.filters = {
  //keywords: "paph"
  keywords: req.query.keywords,
  page: req.query.page
};
locals.data = {
  products: [],
  //posts: [],
  keywords: "",
};

Product.paginate({
    page: req.query.page || 1,
    perPage: 2,
    maxPages: 5
});

//Load the current products
view.on('init', function(next){
  console.log('search keywords = ' + locals.filters.keywords); //TODO log file for search words analitic
  locals.data.keywords = locals.filters.keywords;
  locals.data.page = locals.filters.page;
// Pagination

  // Product.paginate({
  //     page: req.query.page || 1,
  //     perPage: 2,
  //     maxPages: 5
  // });

console.log(req.query.page);

  //search... trying without index
  //var q = keystone.list('Product').model.find(
  var q = Product.model.find(
    {title : {$regex : locals.filters.keywords, $options : 'i'}})
    //{score : {$meta : "textScore"}})
      .sort({title: 1})

    //  .limit(5)
      q.exec(function(error, results){
      if(error) console.log(error);
      // need any punctuation? ))
      locals.data.products = results;
      locals.data.posts = results;
      locals.data.qnt = results.length;
      console.log(locals.data.qnt);
    next();
    });

});
//TODO pagination
//TODO some problems whith seatchig: not all posible results
//render view
view.render('search');
};
