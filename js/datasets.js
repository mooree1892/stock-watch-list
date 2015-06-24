/**
 * Load Dropdown Menu
 */
function loadDropdown () {
	for(var subCat in lists.dt['direct']){
					$('#datasets').append(dropdownBuilder(subCat.charAt(0).toUpperCase() + subCat.slice(1),subCat,lists.dt['direct'][subCat]));
			}
}
/**
 * Create a sub-dropdown html variable
 * @param  {String} title  
 * @param  {Array} vals 
 * @return {HTML}      
 */
function dropdownBuilder (title, dataset, vals) {
	var pli	= $('<li class="dropdown-submenu"><a>' + title + '</a></li>'),
		ul	= $('<ul class="dropdown-menu"></ul>');

		vals.forEach(function (val) {
			if(val.type !== 'pricedata')	{
				var li = $('<li><a href="#">' + val.name + '</a></li>');
					li[0].type  	= val.type;
					li[0].dataset 	= dataset;
					li[0].title 	= val.description;
					li[0].onclick 	= function() {
						$('#sel-dataset').html(val.name);
						$('#sel-dataset')[0].secret = dataset + '.' + val.type;
						$('#addToTable').show();
					};
					ul.append(li);
			};
		});
		pli.append(ul);

		return pli;
}
