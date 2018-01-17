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
    },
    replace: function (value, start , end) {
      return typeof value === 'string' ? value.replace("EUR", "") : value
  },
    symbol: function (value, start , end) {
    return typeof value === 'string' ? value = value + " €" : value
},
  },
}).delay(1000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['https://www.woessnerorchideen.de/shop/paphiopedilum.html',
'https://www.woessnerorchideen.de/shop/phragmipedium.html',
'https://www.woessnerorchideen.de/shop/cattleya-und-verwandte.html',
'https://www.woessnerorchideen.de/shop/phalaenopsis-und-verwandte.html',
'https://www.woessnerorchideen.de/shop/raritaeten.html',
];

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.block_product',[{
title: '.name a | trim',
url: 'a@href | trim',
price: '.jshop_price span | trim | replace | trim | symbol',
image: '.image_block img@src',
description: '.description | trim',
}])
.paginate('.jsn-pagination li:nth-last-child(2) > a@href')
.write('./public/vendors/wossner/wossner' + i + '.json')
});
//concat JSON files


next();
});


console.log('finish');
view.render('vendors/wossner');//??
};
