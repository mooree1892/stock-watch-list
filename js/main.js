'use strict';
var tsettings;
$(document).ready(function(){
	/*Settings*/
	tsettings = new tableSettings ();
	/*Hide extras*/
	$('.alert-success').css({opacity:0});
	$('.alert-danger').css({opacity:0});
	SR.AppData.v1.Tickerlist.GET('j').then(function (tickerlist) {
		/*Analyze tickerlist*/
		tickerlist.response.map(function (val) {
			lists.ticker[val.ticker] = {
				name		: val.name || val.ticker,
			};
			lists.ticks[val.ticker+'/'+(val.name || val.ticker)] = val.ticker;
		});
		/*load table*/
		loadTable();
		/*Initiate Typeaheads*/
		thInit();
		/*Disable loading...*/
		$('.loading').css({width:0,opacity:0});
	});
	/*Add to function*/
	$('#addToTable')[0].onclick = function(){ 
		if(lists.ticks[$('#ticker').val()])	{
			addToList(lists.ticks[$('#ticker').val()]).then(function () {
				addToTable(lists.ticks[$('#ticker').val()]); 
			});
		}	else	{
			FAIL('Wrong input!');
		}
	}
});
