var keystone = require('keystone');
var fs = require('fs');
var Xray = require('x-ray');
// added .delay() but site still freezing
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
}).concurrency(2);

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = ['http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_42',
 'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_204',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_43',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_44',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_206',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_249',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_47',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_50',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_137',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_139',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_179',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_180',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_53',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_54',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_158',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_57',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_59',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_63',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_247',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_244',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_185',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_141',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_64',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_183',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_65',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_142',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_168',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_67',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_190',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_218',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_68',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_69',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_73',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_74',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_251',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_250',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_75',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_76',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_77',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_78',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_81',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_83',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_84',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_85',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_191',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_162',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_170',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_86',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_87',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_89',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_90',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_181',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_91',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_93',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_95',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_96',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_98',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_99',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_176',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_241',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_100',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_101',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_248',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_145',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_161',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_163',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_104',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_106',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_107',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_220',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_110',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_111',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_112',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_113',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_173',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_147',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_226',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_165',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_230',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_114',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_116',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_117',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_242',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_171',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_118',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_224',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_119',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_121',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_178',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_126',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_182',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_245',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_149',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_166',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_233',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_198',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_129',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_130',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_131',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_150',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_132',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_134',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=156_151',
'http://www.akerne-orchids.com/shop/index.php?route=product/category&path=39_152'
];
var vendor = "Akerne";

view.on('init', function(next){
console.log('start');
links.forEach(function(link, i){
x(link, '.list > tr > td',[{
title: 'img@title',
url: 'a@href',
image:'img@src',
price: '.price_normal',
description: x('a@href', '.size span')
}])
//.paginate('.panel-pagination strong + a@href')
.write('./public/vendors/akerne/akerne' + i + '.json')

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
//   getDir('./public/vendors/akerne', function(err, content){
//     qfiles = content;
//     console.log('in getDir ' + qfiles.length);
//     var dataAll = [];
//     var data;
//     for (item in qfiles){
//     var dir = './public/vendors/akerne/' + qfiles[item];
//     console.log(dir);
//       data = JSON.parse(fs.readFileSync(dir, 'utf8'));
//       dataAll = dataAll.concat(data);
//     };
//     fs.writeFile('./public/vendors/akerneAll.json', JSON.stringify(dataAll));
//   });
//
//   next();
// });


console.log('finish');
view.render('vendors/akerne');//??
};

// var path = './public/vendors/' + vendorLow + '/';
//    function getDir(path,callback){
//       fs.readdir(path, function(err, content){
//   callback(null, content)
//   });
// };


// getDir(path, function(err, content){
//   qfiles = content;
//   console.log('in getDir ' + qfiles.length);
//   var dataAll = [];
//   var data;
//
//   for (item in qfiles){
//   var dir = './public/vendors/' + vendorLow + '/' + qfiles[item];
//   console.log(dir);
//     data = JSON.parse(fs.readFileSync(dir, 'utf8'));
//     dataAll = dataAll.concat(data);
//   };
//   fs.writeFile('./public/vendors/' + vendorLow + 'All.json', JSON.stringify(dataAll));
// });
