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
      return typeof value === 'string' ? value.replace('EUR', "") : value
  },
    symbol: function (value, start , end) {
    return typeof value === 'string' ? value = value + " €" : value
},
  },
}).delay(1000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['http://www.hennis-orchideen.de/Gesamtes-Sortiment/L0hPX1NIT1BfTElTVD9GSUxURVI9Njc3NzMsNjc3NzQsNjc4MzksNjc3NzUsNjc3NzYmTUFYUkVDPTEwJlNPUlQ9MSZQQUdFPTEmTUlEPTY3ODM1.html?UID=B2A0E3E3582E8C449BBE4EF5407A415B76B0D9D29887',
];

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.shop_list_RecordBox',[{
title: 'h2 | trim',
url: 'h2 a@href | trim',
price: '.shop_list_Price | trim | replace | trim | symbol',
image: '.c33l img@src',
description: '.shop_list_Category'
}])
.paginate('#navigator  .active + a@href')
.limit(50)
.write('./public/vendors/hennis/hennis' + i + '.json')
});
//concat JSON files


next();
});


console.log('finish');
view.render('vendors/hennis');//??
};
