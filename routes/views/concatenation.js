var keystone = require('keystone');
var fs = require('fs');



exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
// var vendors = ['Reollke', 'Schwerter', 'OrchClub'];

var locals = res.locals;
// // locals.section is for nav menu
// locals.section = 'addproducts';
var vendor;
var vendorLow;

//console.log(vendorLow);;
var qfiles;
var dataAll = [];


view.on('post', function(next){
  vendor = req.body.vendor;
  vendorLow = vendor.toLowerCase();

  function getDir(path,callback){
  fs.readdir(path, function(err, content){
    callback(null, content)
    });
  };

  getDir('./public/vendors/' + vendorLow, function(err, content){
    qfiles = content;
    console.log('in getDir ' + qfiles.length);

    var data = [];
    for (item in qfiles){
      var dir = './public/vendors/' + vendorLow + '/' + qfiles[item];
      //console.log(dir);

      data = JSON.parse(fs.readFileSync(dir, 'utf8'));
      
      dataAll = dataAll.concat(data);
    };
    fs.writeFile('./public/vendorsFull/'+ vendorLow + 'All.json', JSON.stringify(dataAll, null, 2));
    console.log("to Json");
});



// console.log('Itemes:' + dataAll.length);
//   var dataCorrupted = [];
//   var itemCorrupted = 0;
//   var itemDB;
//   console.log('dataCorrupted is ' + dataCorrupted);
//
//     var Product = keystone.list('Product');
//     for (var item = 0; item < dataAll.length; item++){
//       //don't add to db products with no title - if
//       if(dataAll[item].title){
//     dataAll[item].vendor = vendor;
//     dataAll[item].country = country;
//     addProducts = new Product.model(dataAll[item]); //was new Product.model(item)
//     addProducts.save().catch(function(err){
//         console.log(err.message);
//       });
//     }else{
//       dataCorrupted = dataCorrupted.concat(dataAll[item]);
//       itemCorrupted = ++itemCorrupted;
//
//     };
//    };
//    itemDB = item - itemCorrupted;
// console.log( 'Result: All ' + item + ' products of ' + vendor + ' And ' + itemDB + ' added to DB');
// // file for corrupted itemes
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

view.render('concatenation');

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
