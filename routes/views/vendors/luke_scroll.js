var keystone = require('keystone');
var fs = require('fs');
var puppeteer = require('puppeteer');

exports = module.exports = function(req, res){
var view = new keystone.View(req, res);
var locals = res.locals;
var links = [
'https://shop.orchideen-lucke.de/shop/en/hybrids/',

];

view.on('init', function(next){
console.log('start');

(async () => {

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('http://books.toscrape.com/');
  //await page.goto('https://shop.orchideen-lucke.de/shop/en/hybrids/');
  await page.setViewport({
  	width: 1200,
  	height: 800
  });

  await autoScroll(page);

  //const inputElement = await page.$('a.js--load-more');

  // while(page.$('.js--load-more')){
  //   console.log('while loop');
  //   page.click('.js--load-more');
  // };




      const result = await page.evaluate(() => {
          let data = []; // Create an empty array that will store our data
          let elements = document.querySelectorAll('.product_pod'); // Select all Products

          for (var element of elements){ // Loop through each proudct
              let title = element.childNodes[5].innerText; // Select the title
              let price = element.childNodes[7].children[0].innerText; // Select the price

              data.push({title, price}); // Push an object with the data onto our array
          }

          return data; // Return our data array
      });
      console.log(data);
      browser.close();
      return result; // Return the data


  scrape().then((value) => {
      console.log(value); // Success!

});


function autoScroll(page){
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        })
    });
};
// function clickScroll(page){
//   return page.evaluate(() => {
//
//   });
// };

});
next();

});




console.log('finish');
view.render('vendors/luke');//??
};
