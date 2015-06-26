'use strict';
/*Variables*/
var appmemory = new SR.AppMemory(SR.AppID, SR.UserID),
	lists = {
		ticker: {},
		ticks: {}
	};

/*Initiate AppMemory*/
appmemory.save('list',[
	'AAPL',
	'ARI',
	'Z',
	'GOOG',
	'AA',
	'A',
	'TSLA'
	]).then(function () {});

appmemory.save('settings',{
	'companyname': true,
	'number'	 : true,
	'change'	 : true
}).then(function () {});

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
function loadData(ticker) {
	return new Promise(function (res, rej) {
		SR.AppData.v1.direct.GET(ticker, 'pricedata', {from:"2013-01-01"}).then(function(data){
			//console.log(data);
			return (data&&data.response&&data.response.data.length > 0)?[data.response.data[0][1],data.response.data[1][1]]:false;
		}, function (reason) {
			console.warn((reason[0].responseJSON)?reason[0].responseJSON.error:[ticker, type , reason]);	
			rej('Failed getting ' + ticker + '/pricedata due to `' + reason[1] + '`');
		}).then(function(price){
			if(price){
				// console.log(price[0])
				// console.log(price[1])
				console.log(price[0]);
				console.log(price[0]-price[1]);
				res((price[0]-price[1])/price[1]);
			}
		})
		
	})
}