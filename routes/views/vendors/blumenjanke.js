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
      return typeof value === 'string' ? value.replace(/Bisher: \d+,\d\d/g, "") : value
  },
  replaceL: function (value, start , end) {
    return typeof value === 'string' ? value.replace("inkl. MwSt zzgl. Versand", "").replace(/EUR/g, "") : value
  },
  titleL: function (value, start , end) {
  return typeof value === 'string' ? value.replace(/-(.*)/, "") : value
  //return typeof value === 'string' ? value.replace(/-\s\w+\s\w*\s*/, "") : value
  },
  symbol: function (value, start , end) {
  return typeof value === 'string' ? value = value + " €" : value
  },
},
}).delay(1000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['http://www.blumen-janke.de/shop/index.php/de/Orchideen-Prim-r-Hybriden/l-3200',
'http://www.blumen-janke.de/shop/index.php/de/Orchideen-Naturformen/l-3500',
'http://www.blumen-janke.de/shop/index.php/de/Orchideen-Kreuzungen-Hybriden/l-4000',
'http://www.blumen-janke.de/shop/index.php/de/Orchideen-Eigene-Kreuzungen/l-4500'
];

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.divproductinlist',[{
title: '.divproductinlistdesc a | titleL | trim',
url: '.divproductinlistdesc a@href | trim',
price: 'tr td:nth-child(4) |replace |replaceL | trim | symbol',
image: '.divproductinlistthumb img@src',
//description: x('a@href', '#comjshop > form > div.jshop_prod_description > p > font > font'),
}])
//.paginate('.jsn-pagination li:nth-last-child(2) > a@href')
.write('./public/vendors/blumenjanke/blumenjanke' + i + '.json')
});
//concat JSON files


next();
});


console.log('finish');
view.render('vendors/blumenjanke');//??
};
