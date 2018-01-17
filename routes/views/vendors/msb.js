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
    cutEnter: function (value, start , end) {
            return typeof value === 'string' ? value.replace('\n\n', " ") : value
    },
    cutDesc: function (value, start , end) {
            return typeof value === 'string' ? value.replace('\b\spicture of flower is an example', " ") : value
    }
  }

}).delay(1000);;

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = [
'http://msb-orchideen.de/epages/d5ebfe92-7305-474a-b60e-86a9022e6c26.sf/en_GB/?ObjectPath=/Shops/d5ebfe92-7305-474a-b60e-86a9022e6c26/Categories/9',
'http://msb-orchideen.de/epages/d5ebfe92-7305-474a-b60e-86a9022e6c26.sf/en_GB/?ObjectPath=/Shops/d5ebfe92-7305-474a-b60e-86a9022e6c26/Categories/20',
'http://msb-orchideen.de/epages/d5ebfe92-7305-474a-b60e-86a9022e6c26.sf/en_GB/?ObjectPath=/Shops/d5ebfe92-7305-474a-b60e-86a9022e6c26/Categories/2',
'http://msb-orchideen.de/epages/d5ebfe92-7305-474a-b60e-86a9022e6c26.sf/en_GB/?ObjectPath=/Shops/d5ebfe92-7305-474a-b60e-86a9022e6c26/Categories/38',
'http://msb-orchideen.de/epages/d5ebfe92-7305-474a-b60e-86a9022e6c26.sf/en_GB/?ObjectPath=/Shops/d5ebfe92-7305-474a-b60e-86a9022e6c26/Categories/14',
'http://msb-orchideen.de/epages/d5ebfe92-7305-474a-b60e-86a9022e6c26.sf/en_GB/?ObjectPath=/Shops/d5ebfe92-7305-474a-b60e-86a9022e6c26/Categories/59',
'http://msb-orchideen.de/epages/d5ebfe92-7305-474a-b60e-86a9022e6c26.sf/en_GB/?ObjectPath=/Shops/d5ebfe92-7305-474a-b60e-86a9022e6c26/Categories/5'
];

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.InfoArea',[{
title: 'h3 > a | trim',
image: 'img@src',
url: 'a@href | trim',
price: '.price-value | trim | slice:0,-1 | trim',
description: '.Description | cutEnter | cutDesc | trim'
}])
.paginate('.PagerSizeContainer .Current + li a@href')
.write('./public/vendors/msb/msb' + i + '.json')
});


next();
});

// view.on('init', function(next){
//   function getDir(path,callback){
//   fs.readdir(path, function(err, content){
//     callback(null, content)
//     });
//   };
//
//   getDir('./public/vendors/msb', function(err, content){
//     qfiles = content;
//     console.log('in getDir ' + qfiles.length);
//     var dataAll = [];
//     var data;
//     for (item in qfiles){
//     var dir = './public/vendors/msb/' + qfiles[item];
//     console.log(dir);
//       data = JSON.parse(fs.readFileSync(dir, 'utf8'));
//       dataAll = dataAll.concat(data);
//     };
//     fs.writeFile('./public/vendors/msbAll.json', JSON.stringify(dataAll));
//   });
//
//   next();
// });

console.log('finish');
view.render('vendors/msb');//??
};
