'use strict';
/**
 * Load table
 */
function loadTable () {
	appmemory.load('list').then(function(list){
		async.map(list, function (item) {
			$('table')[0].list = list;
			loadData(item.split('/')[0], 
				item.split('/')[1]
			).then(function(data){
				createRow(
					lists.ticker[item.split('/')[0]], 
					lists.id[item.split('/')[1]],
					data,
					item
				);
			});
		});;
	});
}
/**
 * Add values to table
 * @param {String} item 
 */
function addToTable (item) {
	addToList(item).then(function () {
		loadData(item.split('/')[0], 
			item.split('/')[1]
		).then(function(data){
			createRow(
				lists.ticker[item.split('/')[0]], 
				lists.id[item.split('/')[1]],
				data,
				item
			);
			SUCS();
		});
	})
}
/**
 * Create a row item
 * @param  {Object} tickData 
 * @param  {Object} idData 
 * @param  {String/Number} val
 * @return {HTML}      
 */
function createRow(tickData, idData, val, item){
	var tr = $('<tr></tr>');
	var td = $('<td><i class="glyphicon glyphicon-remove"></i> ' + tickData.name + '</td>');
		td[0].children[0].onclick = function () {
			removeRow(this.parentElement.parentElement);
		};
		tr[0].appendChild(td[0]);
		tr[0].appendChild($('<td>' + numeral(val).format('($0,0.00a)') + '</td>')[0]);
		tr[0].appendChild($('<td>' + tickData.change + '</td>')[0]);
		// tr[0].appendChild()
		tr[0].item = item;
	$('tbody').append(tr);
	$('table').tablesorter({sortList: [[0,0], [1,0]]});
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