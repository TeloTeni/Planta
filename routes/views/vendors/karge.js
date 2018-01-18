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
}).delay(2000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = [
'https://www.orchideengarten.de/shop/aliceara/',
'https://www.orchideengarten.de/shop/angraecum/',
'https://www.orchideengarten.de/shop/aspasia/',
'https://www.orchideengarten.de/shop/brassavola/',
'https://www.orchideengarten.de/shop/brassavola-1/',
'https://www.orchideengarten.de/shop/brassia/',
'https://www.orchideengarten.de/shop/bulbophyllum/',
'https://www.orchideengarten.de/shop/burrageara/',
'https://www.orchideengarten.de/shop/calanthe/',
'https://www.orchideengarten.de/shop/cambria/',
'https://www.orchideengarten.de/shop/cattleya/',
'https://www.orchideengarten.de/shop/christensonella/',
'https://www.orchideengarten.de/shop/chysis/',
'https://www.orchideengarten.de/shop/cochleanthes/',
'https://www.orchideengarten.de/shop/coelogyne/',
'https://www.orchideengarten.de/shop/colmanara/',
'https://www.orchideengarten.de/shop/cryptophorantus/',
'https://www.orchideengarten.de/shop/cycnodes/',
'https://www.orchideengarten.de/shop/cymbidium/',
'https://www.orchideengarten.de/shop/dendrochilum/',
'https://www.orchideengarten.de/shop/dendrobium/',
'https://www.orchideengarten.de/shop/encyclia/',
'https://www.orchideengarten.de/shop/epidendrum/',
'https://www.orchideengarten.de/shop/eria/',
'https://www.orchideengarten.de/shop/gongora/',
'https://www.orchideengarten.de/shop/grammatophyllum/',
'https://www.orchideengarten.de/shop/howeara/',
'https://www.orchideengarten.de/shop/ionopsis/',
'https://www.orchideengarten.de/shop/lycaste/',
'https://www.orchideengarten.de/shop/macodes/',
'https://www.orchideengarten.de/shop/masdevallia/',
'https://www.orchideengarten.de/shop/maxillaria/',
'https://www.orchideengarten.de/shop/miltonia/',
'https://www.orchideengarten.de/shop/neofinetia/',
'https://www.orchideengarten.de/shop/odontoglossum/',
'https://www.orchideengarten.de/shop/oncidium/',
'https://www.orchideengarten.de/shop/paphiopedilum/',
'https://www.orchideengarten.de/shop/pleione/',
'https://www.orchideengarten.de/shop/phaius/',
'https://www.orchideengarten.de/shop/phalaenopsis/',
'https://www.orchideengarten.de/shop/phragmipedium/',
'https://www.orchideengarten.de/shop/podangis/',
'https://www.orchideengarten.de/shop/promeneae/',
'https://www.orchideengarten.de/shop/psychopsis/',
'https://www.orchideengarten.de/shop/rhynchostylis/',
'https://www.orchideengarten.de/shop/sophrolaeliocattleya-slc/',
'https://www.orchideengarten.de/shop/spathoglottis/',
'https://www.orchideengarten.de/shop/stanhopea/',
'https://www.orchideengarten.de/shop/stelis/',
'https://www.orchideengarten.de/shop/stenoglottis/',
'https://www.orchideengarten.de/shop/tolumnia/',
'https://www.orchideengarten.de/shop/trichopilia/',
'https://www.orchideengarten.de/shop/vanda/',
'https://www.orchideengarten.de/shop/vanilla/',
'https://www.orchideengarten.de/shop/wilsonara/',
'https://www.orchideengarten.de/shop/zygopetalum/'];

view.on('init', function(next){
console.log('start');


links.forEach(function(link, i){
x(link,'.j-imageSubtitle',[{
url: 'a@href',
title: 'figcaption',
price: x('a@href', '.cc-shop-price-value | trim'),
description: x('a@href', '.description p:nth-last-child(3) | trim')
}])
.write('./public/vendors/karge/karge' + i + '.json')

//
// (function(err, obj){
// var obj1 = obj;
// console.log(obj1);
//
//     obj1.forEach(function(values, item){
//       (item.key) && values.push(item.value);
// console.log(item.key)
//     });
//
//     return values;



});



// x(link, '.cc-m-width-maxed ',[{
// title: x('a@ref', '.cc-shop-product-desc .fn'),
// url: 'a@href',
// price: x('a@ref', 'body')
// }])
// //.paginate('.panel-pagination strong + a@href')
// .write('./public/vendors/karge' + i + '.json')
// });


//concat JSON files

next();

});

console.log('finish');
view.render('vendors/karge');//??
};
