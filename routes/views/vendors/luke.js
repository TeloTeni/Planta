var keystone = require('keystone');
var fs = require('fs');
var puppeteer = require('puppeteer');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var links = [
		'https://shop.orchideen-lucke.de/shop/en/hybrids/',

	];

	view.on('init', function(next) {
		console.log('start');


		let scrape = async() => {
			const browser = await puppeteer.launch({
				headless: false
			});
			const page = await browser.newPage();

			await page.goto('https://shop.orchideen-lucke.de/shop/en/hybrids/');
			// await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
			await page.waitFor(5000);
			await page.setViewport({
				width: 1200,
				height: 800
			});
      const select = '.box--basic';

      //await autoScroll(page);

      let listLength = await page.evaluate((sel) => {

        return document.getElementsByClassName(sel).length;
      }, select);
      console.log(listLength);



			browser.close();

			return listLength; // Return the data
		};

		scrape().then((value) => {
			console.log(value); // Success!
		})
    .catch();

		function autoScroll(page) {
			return page.evaluate(() => {
				return new Promise((resolve, reject) => {
					var totalHeight = 0;
					var distance = 100;
					var timer = setInterval(() => {
						var scrollHeight = document.body.scrollHeight;
						window.scrollBy(0, distance);
						totalHeight += distance;

						if (totalHeight >= scrollHeight) {
							clearInterval(timer);
							resolve();
						}
					}, 100);
				})
			});
		};

		// function clickBtn(page) {
		// 	return page.evaluate(() => {
		// 		return new Promise((resolve, reject) => {
		// 			for (var l; l < 12; l++) {
		// 				if (!select) {
		// 					break;
		// 				};
		// 				let inputElement = await page.$('a.js--load-more');
		//         await inputElement.click();
		// 				await page.waitFor(1000);
		// 				await autoScroll(page);
		// 			};
		// 			resolve();
		// 		});
		// 	};);
		// };

		next();

	});




	console.log('finish');
	view.render('vendors/luke'); //??
};
