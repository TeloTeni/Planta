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
    replace: function (value) {
        return typeof value === 'string' ? value.replace("EUR","").trim() : value
      },
    symbol: function (value, start , end) {
      return typeof value === 'string' ? value = value + " €" : value
  },
  }
}).delay(1000);

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['https://www.elsner-orchideen.de/Phalaenopsis/phalaenopsis-hybrids/?language=en&cat=c9&cPath=8_9',
 'https://www.elsner-orchideen.de/Phalaenopsis/Phalaenopsis-Species/?language=en&cat=c27&cPath=8_27',
'https://www.elsner-orchideen.de/Cattleya/Brassavola/?language=en&cat=c12&cPath=10_12',
'https://www.elsner-orchideen.de/Cattleya/Broughtonia/?language=en&cat=c13&cPath=10_13',
'https://www.elsner-orchideen.de/Cattleya/Cattleya-Hybriden/?language=en&cat=c11&cPath=10_11',
'https://www.elsner-orchideen.de/Cattleya/Cattleya-species/?language=en&cat=c15&cPath=10_15',
'https://www.elsner-orchideen.de/Cattleya/Laelia/?language=en&cat=c22&cPath=10_22',
'https://www.elsner-orchideen.de/Cattleya/Sophronitis/?language=en&cat=c29&cPath=10_29',
'https://www.elsner-orchideen.de/Paphiopedilum/Paphiopedilum-Hybriden/?language=en&cat=c25&cPath=24_25',
'https://www.elsner-orchideen.de/Paphiopedilum/Paphiopedilum-species/?language=en&cat=c26&cPath=24_26',
'https://www.elsner-orchideen.de/Paphiopedilum/Phragmipedium/?language=en&cat=c28&cPath=24_28',
'https://www.elsner-orchideen.de/Dendrobium/?language=en&cat=c17&cPath=17',
'https://www.elsner-orchideen.de/african-species/Aerangis/?language=en&cat=c3&cPath=2_3',
'https://www.elsner-orchideen.de/african-species/Aeranthes-english/?language=en&cat=c4&cPath=2_4',
'https://www.elsner-orchideen.de/african-species/Aerides/?language=en&cat=c5&cPath=2_5',
'https://www.elsner-orchideen.de/african-species/Angraecum/?language=en&cat=c6&cPath=2_6',
'https://www.elsner-orchideen.de/african-species/Jumella/?language=en&cat=c20&cPath=2_20',
'https://www.elsner-orchideen.de/other-species/?language=en&cat=c1&cPath=1',
'https://www.elsner-orchideen.de/Bulbophyllum/?language=en&cat=c14&cPath=14',
'https://www.elsner-orchideen.de/Catasetum/?language=en&cat=c30&cPath=30',
'https://www.elsner-orchideen.de/Coelogyne/?language=en&cat=c16&cPath=16',
'https://www.elsner-orchideen.de/Encyclia/?language=en&cat=c31&cPath=31',
'https://www.elsner-orchideen.de/Lycaste/?language=en&cat=c35&cPath=35',
'https://www.elsner-orchideen.de/Masdevallia/?language=en&cat=c23&cPath=23',
'https://www.elsner-orchideen.de/Maxillaria/?language=en&cat=c32&cPath=32',
'https://www.elsner-orchideen.de/Oncidium/?language=en&cat=c19&cPath=19',
'https://www.elsner-orchideen.de/Stanhopea/?language=en&cat=c33&cPath=33',
'https://www.elsner-orchideen.de/Vanda/?language=en&cat=c7&cPath=7',
'https://www.elsner-orchideen.de/flasks-orchids/?language=en&cat=c37&cPath=37'
];
var qfiles;
var vendor;

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.product-container',[{
title: '.title | trim',
image: 'img@src',
url: '.title a@href| trim',
price: '.price | replace | symbol',
//discription: '.article-list-item-main p'
description: '.description | trim'
}])
.paginate('.pagination li:last-child a@href')
.write('./public/vendors/elsner/elsner' + i + '.json')
});
console.log("parsind is DONE");
next();
});

// view.on('post', function(next){
//   function getDir(path,callback){
//   fs.readdir(path, function(err, content){
//     callback(null, content)
//     });
//   };
// vendor = req.body.vendor;
// var vendorLow = vendor.toLowerCase();
//   getDir('./public/vendors/elsner', function(err, content){
//     qfiles = content;
//     console.log('in getDir ' + qfiles.length);
//     var dataAll = [];
//     var data;
//     for (item in qfiles){
//     var dir = './public/vendors/elsner/' + qfiles[item];
//     console.log(dir);
//       data = JSON.parse(fs.readFileSync(dir, 'utf8'));
//       dataAll = dataAll.concat(data);
//     };



    // //TODO take vendor from list
    // for(var i=0; i < dataAll.length; i++){
    //   //Vendor name bigleter
    //   dataAll[i].vendor = vendor;
    // };
    // console.log( i + " products changed");
    //     fs.writeFile('./public/vendors/elsnerAll.json', JSON.stringify(dataAll));
    //   });
    //   console.log('so...' + qfiles);
    //   next();
    // });

console.log('finish');
view.render('vendors/elsner');//??
};
