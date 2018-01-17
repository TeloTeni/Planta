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
    points: function (value, start , end) {
    return typeof value === 'string' ? value.replace("...", "")  : value
    },
  },
}).delay(1000);

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = [
'https://www.orchideenwlodarczyk.de/shop/catalog/ascocenda-ascda-c-41.html?language=en',
 'https://www.orchideenwlodarczyk.de/shop/catalog/hybrids-c-6.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/aerangis-c-52_21.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/angraecum-c-52_23.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/ascocentrum-c-52_40.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/bromelia-c-52_48.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/bulbophyllum-c-52_30.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/cattleya-c-52_32.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/coelogyne-c-52_24.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/dendrobium-c-52_31.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/dendrochilum-c-52_25.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/dracula-c-52_43.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/jewel-orchids-c-52_42.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/karnivoren-c-52_46.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/laelia-c-52_26.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/masdevallia-c-52_28.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/maxillaria-c-52_29.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/more-species-c-52_34.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/oncidium-c-52_39.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/paphiopedilum-c-52_33.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/phalaenopsis-c-52_38.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/phragmipedium-c-52_51.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/pleione-c-52_49.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/tilandsia-c-52_45.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/tolumnia-c-52_47.html?language=en',
'https://www.orchideenwlodarczyk.de/shop/catalog/vanda-c-52_37.html?language=en'
];

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '#bodyContent > div > div > div > div > div',[{
//title: 'a:nth-of-type(2)',
title: x('a@href', '.product_info_name'),
url: 'a@href | trim',
price: 'span | trim | slice: 3 | trim | symbol',
image: 'img@src',
description: '.product_teaser | points'
}])
.paginate('.pagination li.active + li > a@href')
.write('./public/vendors/wlodarczyk/wlodarczyk' + i + '.json')
});
//concat JSON files


next();
});


console.log('finish');
view.render('vendors/wlodarczyk');//??
};
