//no price information

var keystone = require('keystone');
var fs = require('fs');
var Xray = require('x-ray');
var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
    reverse: function (value) {
      return typeof value === 'string' ? value.split('').reverse().join('') : value
    },
    slice: function (value, start , end) {
      return typeof value === 'string' ? value.slice(start, end) : value
    }
  }
});

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['http://www.paphiopedilumworld.com/assbb/phragm/index.html', 'http://www.paphiopedilumworld.com/assbb/cattlaya/index.html'];

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, 'article',[{
title: 'h4',
url: 'h4 > a@href | trim',
price: x('h4 > a@href', '#product_price .integer')
}])
//.paginate('.panel-pagination strong + a@href')
.write('./public/vendors/asendorfer' + i + '.json')
});
//concat JSON files


next();
});


console.log('finish');
view.render('vendors/asendorfer');//??
};
