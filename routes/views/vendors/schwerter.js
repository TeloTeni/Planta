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
  }
}).delay(1000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=22&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=21&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=21_39&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=27&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=29&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=38&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=42_28&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=42_28_36&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=42_43&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=42_33&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=42_33_35&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=41&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=25&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=25_37&language=en',
'http://www.shop.schwerter-orchideenzucht.de/index.php?cPath=30&language=en'
];
// var qfiles = [];
// var files;


view.on('init', function(next){
console.log('start');

links.forEach(function(link, i){
x(link, '.productListing-odd', [{
title: 'td:nth-child(2) a | trim',
price: 'td:nth-child(3) a | trim | slice:0,-3 | trim | symbol',
url: 'td:nth-child(2) > a > a@href',
image: 'td:nth-child(1) img@src'
}])
.paginate('.smallText + .smallText > b + a@href')
.write('./public/vendors/schwerter/schwerter1' + i + '.json')
});

links.forEach(function(link, i){
x(link, '.productListing-even', [{
title: 'td:nth-child(2) a | trim',
price: 'td:nth-child(3) a | trim | slice:0,-3 | trim | symbol',
url: 'td:nth-child(2) > a > a@href',
image: 'td:nth-child(1) img@src'
}])
.paginate('.smallText + .smallText > b + a@href')
.write('./public/vendors/schwerter/schwerter2' + i + '.json')
});

next()
});


console.log('finish');

view.render('vendors/schwerter');//??
};
// console.log('new');
//
// function getDir(path,callback){
// fs.readdir(path, function(err, content){
//   callback(null, content)
//   });
// };
//
// getDir('./public/vendors/schwerter', function(err, content){
//   qfiles = content;
//   console.log('in getDir ' + qfiles.length);
//   var dataAll = [];
//   var data;
//   for (item in qfiles){
//   var dir = './public/vendors/schwerter/' + qfiles[item];
//   console.log(dir);
//     data = JSON.parse(fs.readFileSync(dir, 'utf8'));
//     dataAll = dataAll.concat(data);
//   };
//   fs.writeFile('schwerterAll.json', JSON.stringify(dataAll));
// });
// console.log('so...' + qfiles);
//
//
// };
