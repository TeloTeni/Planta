var keystone = require('keystone');
var fs = require('fs');

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);

var locals = res.locals;
// // locals.section is for nav menu
// locals.section = 'addproducts';
var vendor;
var vendorLow;

view.on('post', function(next){
  vendor = req.body.vendor;
  vendorLow = vendor.toLowerCase();
  console.log(vendorLow);

var file = './public/vendorsFull/' + vendorLow + 'AllFull.json';
      console.log(file);

      data = JSON.parse(fs.readFileSync(file, 'utf8'));
      console.log('data parsed');


console.log('Items: ' + data.length);
  var dataCorrupted = [];
  var itemCorrupted = 0;
  var itemDB;

  var Product = keystone.list('Product');
    for (var item = 0; item < data.length; item++){
      //don't add to db products with no title - if
      //if(data[item].title){ //TODO change for title&price(number)
        addProducts = new Product.model(data[item]); //was new Product.model(item)
        addProducts.save().catch(function(err){
        console.log(err.message);
        });
      // }else{
      //   dataCorrupted = dataCorrupted.concat(data[item]);
      //   itemCorrupted = ++itemCorrupted;
      // };
   };
// itemDB = item - itemCorrupted;
console.log( 'Result: All ' + item + ' products of ' + vendor + ' added to DB');
// file for corrupted itemes
// fs.writeFile('./public/vendors/'+ vendorLow + 'Corr.json', JSON.stringify(dataCorrupted, null, 2));


  next();
});

//
// view.on('post', function(next){
//
// var jsonNewProducts = JSON.parse(fs.readFileSync('./public/vendors/' + vendorLow + 'All.json', 'utf8'));
//
// var Product = keystone.list('Product');
// for (var item = 0; item < jsonNewProducts.length; item++){
// jsonNewProducts[item].vendor = vendor;
// addProducts = new Product.model(jsonNewProducts[item]); //was new Product.model(item)
// addProducts.save().catch(function(err){
//     console.log(err.message);
//   });
// };

// console.log( 'Result: ' + item + ' products of ' + vendor + 'added');
//
// next();
//
//
// });

view.render('addproducts');

//? add body.parser?
// copy file methods or upload


//var jsonArray = JSON.parse(fs.readFileSync('addproducts.json','utf8' ));
//for (var jsonItem in jsonArray){
//  new Product(jsonArray[jsonItem]) /or new Product.model()
//      .save
//      .catch(function(err){
//      })
//}
};
