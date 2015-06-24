'use strict';
$(document).ready(function(){

	// var currentPrice; //Will contain the stock's price value today.
 // 	var yesterdayPrice; //Will contain the stock's price value yesterday.
 // 	var priceChange; //Will contain the percent change of the price value compared to today and yesterday.
 // 	var temp;

	/*Hide extras*/
	$('#addToTable').hide();
	$('.alert-success').hide();
	$('.alert-danger').hide();
	/*Load Idlist*/
	SR.AppData.v1.idlist.GET('j').then(function (idlist) {
		/*Load Tickerlist*/
		SR.AppData.v1.Tickerlist.GET('j').then(function (tickerlist) {

			// currentPrice = val.response.data.slice(0,1)[0][1];
				// yesterdayPrice = val.response.data.slice(1,2)[0][1];
		
				// temp = ((currentPrice - yesterdayPrice)/ currentPrice) * 100;
				// priceChange = Math.round(temp * 100) / 100

				// //Check if data is retrieved.
				// console.log("Stock Ticker (Undefined means default company A is used.): " + stockName);
				// console.log("Current Price Value: " + currentPrice);
				// console.log("Yesterday's Price Value: " + yesterdayPrice);
				// console.log("Change in Price: " + priceChange + "%");

			/*Analyze idlist*/
			idlist.response.map(function (val) {
				lists.dt[val.dataset.split('/')[0]] = lists.dt[val.dataset.split('/')[0]]||{};
				lists.dt[val.dataset.split('/')[0]][val.dataset.split('/')[1]] = lists.dt[val.dataset.split('/')[0]][val.dataset.split('/')[1]]||[];
				lists.dt[val.dataset.split('/')[0]][val.dataset.split('/')[1]].push(val);
				lists.id[val.type] = {
					name		: val.name,
					description	: val.description
				};
				(val.dataset.split('/')[0] === 'price')&&(lists.price.push(val.type));
				lists.types[(val.name!=="NA"?val.name:val.type)] = val.type;
			});
			/*Analyze tickerlist*/
			tickerlist.response.map(function (val) {
				lists.ticker[val.ticker] = {
					name	: 	val.name || val.ticker,
					//change 	: 	val.change,
				};
				lists.ticks[val.ticker+'/'+(val.name || val.ticker)] = val.ticker;
			});
			/*Load dropdown*/
			loadDropdown();
			/*load table*/
			loadTable();
			/*Initiate table*/
			thInit();
			/*Disable loading...*/
			$('.loading').css({width:0,opacity:0});
		});
	});
	/*Add to function*/
	$('#addToTable')[0].onclick = function(){ 
		var dataset = $('#sel-dataset')[0].secret.split('.');
		if(lists.ticks[$('#ticker').val()])	{
			addToTable(
				lists.ticks[$('#ticker').val()] + '/' +
				dataset[1]
				); 
		}	else	{
			alert('Wrong input!');
		}
	}
});
