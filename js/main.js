'use strict';
// Containers
var dt = {data:{},list:{id:{},ticker:{}},fail:{"1":{},"2":{}}};
/*Direct Data*/
SR.AppData.v1.direct.GET('AAPL','epsbase').then(function (data) {
	dt.data = data.response;
	$('.datasets').html(JSON.stringify(dt.data,undefined, 2	));
}, function (error) {
	alert("Opps I failed...");
	console.log(error);
});
/*Id list*/
SR.AppData.v1.idlist.GET('json').then(function (data) {
	dt.list.id = data.response;
	$('.idlist').html(JSON.stringify(dt.list.id,undefined, 2	));
}, function (error) {
	alert("Opps I failed...");
	console.log(error);
});
/*Ticker List*/
SR.AppData.v1.Tickerlist.GET('array').then(function (data) {
	dt.list.ticker = data.response;
	$('.tickerlist').html(JSON.stringify(dt.list.ticker,undefined, 2	));
}, function (error) {
	alert("Opps I failed...");
	console.log(error);
});
/*Errors*/
/*1*/
SR.AppData.v1.direct.GET('AAPL','data').then(function (data) {
	alert("Opps I didn't fail...");
}, function (error) {
	dt.fail["1"] = error;
	$('.errorData-1').html(JSON.stringify(dt.fail["1"],undefined, 2	));
});
/*2*/
SR.AppData.v1.direct.GET('AAPL','pricedata').then(function (data) {
	alert("Opps I didn't fail...");
}, function (error) {
	dt.fail["2"] = error;
	$('.errorData-2').html(JSON.stringify(dt.fail["2"],undefined, 2	));
});