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

//TODO vybrakuvaty dubli + dodaty vsi linky
var links = ['https://www.currlin.com/en/online-shop/kategorie/84-cattleya-laelia-hybriden.html',
'https://www.currlin.com/en/online-shop/kategorie/83-cattleya-naturformen.html',
'https://www.currlin.com/en/online-shop/kategorie/65-dendrobium.html',
'https://www.currlin.com/en/online-shop/kategorie/170-hoya.html',
'https://www.currlin.com/en/online-shop/kategorie/67-paphiopedilum.html',
'https://www.currlin.com/en/online-shop/kategorie/86-phalaenopsis-naturformen.html',
'https://www.currlin.com/en/online-shop/kategorie/73-tillandsien-und-co.html',
'https://www.currlin.com/en/online-shop/kategorie/68-vanda-ascocenda.html',
'https://www.currlin.com/en/online-shop/kategorie/75-spezies-a-b.html',
'https://www.currlin.com/en/online-shop/kategorie/76-spezies-c-d.html',
'https://www.currlin.com/en/online-shop/kategorie/77-spezies-e-f.html',
'https://www.currlin.com/en/online-shop/kategorie/78-spezies-g-h.html',
'https://www.currlin.com/en/online-shop/kategorie/79-spezies-i-l.html',
'https://www.currlin.com/en/online-shop/kategorie/80-spezies-m-n.html',
'https://www.currlin.com/en/online-shop/kategorie/81-spezies-o-p.html',
'https://www.currlin.com/en/online-shop/kategorie/82-spezies-q-z.html',

];

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.tabellenlinie',[{
title: '.hikashop_product_name a | trim',
url: '.hikashop_product_name a@href | trim',
price: '.hikashop_product_price | trim',
image: '.hikashop_product_image_subdiv img@src',
description: '.hikashop_product_custom_value_JD | trim',
}])
.paginate('.pagination-list li:nth-last-child(2) > a@href')
.write('./public/vendors/currlin/currlin' + i + '.json')
});
//concat JSON files


next();
});


console.log('finish');
view.render('vendors/currlin');//??
};
