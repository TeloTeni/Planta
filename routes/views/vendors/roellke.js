var keystone = require('keystone');
var fs = require('fs');
var jsonConcat = require("json-concat");
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
      return typeof value === 'string' ? value.replace(/'EUR '/, "") : value
    },
    symbol: function (value, start , end) {
    return typeof value === 'string' ? value = value + " €" : value
},
  }
}).delay(1000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['https://www.roellke-orchideen.de/index.php/en/online-shop/in-flower',
'https://www.roellke-orchideen.de/index.php/en/online-shop/young-plants',
'https://www.roellke-orchideen.de/index.php/en/online-shop/orchi-pack',
'https://www.roellke-orchideen.de/index.php/en/online-shop/african-orchid',
'https://www.roellke-orchideen.de/index.php/en/online-shop/bulbophyllum',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cattleya-related/cattleya-species',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cattleya-related/cattleya-hybrids',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cattleya-related/cattleya-hybrids-blue',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cattleya-related/cattleya-meristems',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cattleya-related/laelia',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cattleya-related/epidendrum-related',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cattleya-related/cattleya-others',
'https://www.roellke-orchideen.de/index.php/en/online-shop/coelogyne',
'https://www.roellke-orchideen.de/index.php/en/online-shop/cymbidium',
'https://www.roellke-orchideen.de/index.php/en/online-shop/dendrobium',
'https://www.roellke-orchideen.de/index.php/en/online-shop/dendrochilum',
'https://www.roellke-orchideen.de/index.php/en/online-shop/masdevallia/masdevallia-bellavallia',
'https://www.roellke-orchideen.de/index.php/en/online-shop/masdevallia/masdevallia-species',
'https://www.roellke-orchideen.de/index.php/en/online-shop/masdevallia/masdevallia-related',
'https://www.roellke-orchideen.de/index.php/en/online-shop/maxillaria',
'https://www.roellke-orchideen.de/index.php/en/online-shop/paphiopedilum/paphiopedilum-species',
'https://www.roellke-orchideen.de/index.php/en/online-shop/paphiopedilum/paphiopedilum-hybrids',
'https://www.roellke-orchideen.de/index.php/en/online-shop/phalaenopsis/phalaenopsis-species',
'https://www.roellke-orchideen.de/index.php/en/online-shop/phalaenopsis/phalaenopsis-hybrids',
'https://www.roellke-orchideen.de/index.php/en/online-shop/phalaenopsis/phalaenopsis-meristemes',
'https://www.roellke-orchideen.de/index.php/en/online-shop/pleurothallis/pleurothallis',
'https://www.roellke-orchideen.de/index.php/en/online-shop/pleurothallis/pleurothallis-related',
'https://www.roellke-orchideen.de/index.php/en/online-shop/pleurothallis/scaphosepalum',
'https://www.roellke-orchideen.de/index.php/en/online-shop/restrepia',
'https://www.roellke-orchideen.de/index.php/en/online-shop/pleurothallis/scaphosepalum',
'https://www.roellke-orchideen.de/index.php/en/online-shop/other-orchids-species',
'https://www.roellke-orchideen.de/index.php/en/online-shop/stanhopea'
];


view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.row-fluid',[{
title: '.name | trim',
url: '.name a@href | trim',
image: 'a > img@src',
price: '.jshop_price | trim |slice:3 |trim | symbol',
description: '.description | trim'
}])
.paginate('.pagination-next a@href')
.write('./public/vendors/roellke/roellke' + i + '.json')
});


next();
});
//concat JSON files

// view.on('init', function(next){
//   function getDir(path,callback){
//   fs.readdir(path, function(err, content){
//     callback(null, content)
//     });
//   };
//
//   getDir('./public/vendors/roellke', function(err, content){
//     qfiles = content;
//     console.log('in getDir ' + qfiles.length);
//     var dataAll = [];
//     var data;
//     for (item in qfiles){
//     var dir = './public/vendors/roellke/' + qfiles[item];
//     console.log(dir);
//       data = JSON.parse(fs.readFileSync(dir, 'utf8'));
//       dataAll = dataAll.concat(data);
//     };
//     fs.writeFile('./public/vendors/roellkeAll.json', JSON.stringify(dataAll));
//   });
//   console.log('so...' + qfiles);
//   next();
// });

console.log('finish');
view.render('vendors/roellke');//??
};
