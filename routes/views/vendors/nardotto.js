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
    symbol: function (value, start , end) {
    return typeof value === 'string' ? value = value + " €" : value
    },
    letterCase: function (value, start , end) {
      return typeof value === 'string' ? value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value
    },
}
}).delay(1000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['http://www.nardottoecapello.it/shop/catalogo.asp?scat=13',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=2&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=3&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=4&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=5&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=6&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=7&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=8&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=9&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=10&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=11&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=12&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=13&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=14&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=15&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=16&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=17&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=18&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=19&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=20&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=21&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=22&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=23&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=24&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=25&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=26',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=26&cat=&pg=2&q=',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=27',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=28',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=29',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=30',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=31',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=32',
'http://www.nardottoecapello.it/shop/catalogo.asp?scat=33'
];
// var pages = ['http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=3&q=', 'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=4&q=', 'http://www.nardottoecapello.it/shop/catalogo.asp?scat=13&cat=&pg=5&q=']

view.on('init', function(next){
console.log('start');
var n = 0
for(var i = 0; i < links.length; i++){
// links.forEach(function(link, i){
var link = links[i];

  //x(link, 'table > tr:nth-child(3) > td:nth-child(3) > div ',[{
//    a: 'a:nth-child(4) @href'
x(link, 'table > tr:nth-child(3) > td:nth-child(3) > table > tr',[{
title: 'a | letterCase | trim',
url: 'a@href',
image:'img@src',
price: 'font | symbol',
// description: 'table > tbody > tr:nth-child(3) > td:nth-child(3) > div > a@href'
//description: 'td:nth-child(4) @html | trim'
}])
//.paginate('table > tr:nth-child(3) > td:nth-child(3) > div a:nth-of-type(i+2) @href')
//.limit(10)
.write('./public/vendors/nardotto/nardotto' + i + '.json')
};


next();
});

console.log('finish');
view.render('vendors/nardotto');//??
};
