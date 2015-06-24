'use strict';

var currentPrice; //Will contain the stock's price value today.
var yesterdayPrice; //Will contain the stock's price value yesterday.
var priceChange; //Will contain the percent change of the price value compared to today and yesterday.
var temp;

/*Initiate AppMemory*/
var appmemory = new SR.AppMemory(SR.AppID, SR.UserID);
	appmemory.save('list',[
		'AAPL/assets',
		'GOOG/netincome',
		]).then(function () {});
/*Variables*/
var lists = {
	dt: {},
	id: {},
	ticker: {},
	ticks: {},
	types: {},
	price: []
}
/**
 * Add values to the memo-list
 * @param {String} item 
 */
function addToList (item) {
	$('table')[0].list.push(item);
	return appmemory.save('list', $('table').list)
}
/**
 * Load the data from SR backend
 * @param  {String} ticker 
 * @param  {String} type   
 * @return {Promise}        
 */
function loadData(ticker, type) {
	return new Promise(function (res, rej) {
		if($.inArray(type, lists.price)){
			type = 'pricedata';
		}
		SR.AppData.v1.direct.GET(ticker, type, {from:"2013-01-01"}).then(function(data){
			res(((data&&data.response&&data.response.data.length > 0)?data.response.data[0][1]:'NA'));

			currentPrice = data.response.data.slice(0,1)[0][1];
			yesterdayPrice = data.response.data.slice(1,2)[0][1];
		
			temp = ((currentPrice - yesterdayPrice)/ currentPrice) * 100;
			priceChange = Math.round(temp * 100) / 100

			// //Check if data is retrieved.
			// console.log("Stock Ticker (Undefined means default company A is used.): " + stockName);
			// console.log("Current Price Value: " + currentPrice);
			// console.log("Yesterday's Price Value: " + yesterdayPrice);
			// console.log("Change in Price: " + priceChange + "%");

		}, function (reason) {
			FAIL();
			rej('NA');
		})	
	})
}