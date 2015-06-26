'use strict';
/**
 * Load table
 */
function loadTable () {
	appmemory.load('list').then(function(list){
		async.map(list, function (item) {
			$('table')[0].list = list;
			addToTable(item);
		});;
	});
}
/**
 * Add values to table
 * @param {String} item 
 */
function addToTable (item) {
	// addToList(item).then(function () {
		loadData(item
		).then(function(data){
			if(data) {
				createRow(
						[
							{
								name 	: '<i class="glyphicon glyphicon-remove"></i> ' + lists.ticker[item].name,
								onclick	:  function () {
									removeRow(this.parentElement);
								},
								tooltip	: lists.ticker[item].description,
								class	: 'companyname-tb'
							},
							{
								name 	: numeral(data[0]).format('($0,0.00)'),
								onclick	: false,
								tooltip	: lists.ticker[item].description,
								class	: 'number-tb'
								
							},
							{
								name 	: numeral(data[1]).format('0,0.00%'),
								onclick	: false,
								tooltip	: lists.ticker[item].description,
								class	: 'change-tb'
								
							}
						],
						item
					);
				console.log(data);
			}	else	{
				FAIL('data for ' + item + ' came back empty');
			}
		}, FAIL);
	// })
}
/**
 * Create a row item
 * @param  {Object} tickData 
 * @param  {Object} idData 
 * @param  {String/Number} val
 * @return {HTML}      
 */
function createRow(vals, item){
	var tr = $('<tr></tr>');
	vals.forEach(function(val){
		if(tsettings.getAttr(val.class.split('-')[0])) {
			var td = document.createElement('td');
				td.innerHTML = val.name;
				td.className = val.class;
				(val.tooltip)&&(td.title = val.tooltip);
				td.onclick	 = val.onclick;
				tr[0].appendChild(td);
		};
	});
	tr[0].item = item;
	$('tbody').append(tr);
	$('table').tablesorter({sortList: [[0,0], [1,0]]});
	SUCS();
}

/**
 * Remove a row
 * @param  {this} ctx
 */
function removeRow (ctx) {
	$('table')[0].list = JSON.parse(JSON.stringify($('table')[0].list).replace(ctx.item,"").replace(',"",',','));
	return appmemory.save('list', $('table')[0].list).then(function () {
		ctx.remove();
		$('table').trigger('update');
	});
}