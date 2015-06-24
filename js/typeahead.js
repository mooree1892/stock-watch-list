'use strict';
/**
 * Initates Typeaheads
 */
function thInit() {
	var tickers = new Bloodhound({
		local: Object.keys(lists.ticks),
		queryTokenizer: Bloodhound.tokenizers.nonword,
		datumTokenizer: Bloodhound.tokenizers.nonword
	});
	var ids = new Bloodhound({
		local: Object.keys(lists.types),
		queryTokenizer: Bloodhound.tokenizers.nonword,
		datumTokenizer: Bloodhound.tokenizers.nonword
	});
	$('#ticker').typeahead({
			hint: true,
			highlight: true
		},
		{
			limit: 5,
			source: tickers
	});
	$('#type').typeahead({
			hint: true,
			highlight: true
		},
		{
			limit: 5,
			source: ids
	});
};
