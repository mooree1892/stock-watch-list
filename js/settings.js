function tableSettings () {
	var __settings = {};
	/*Get Appmemory*/
	appmemory.load('settings').then(function(memo){
		__settings = memo;
		return memo;
	}).then(function (memo) {
		/*Initiate the settings*/
		jQuery.each($('.settings-toggler'), function (i, val) {
			val.checked = memo[val.id.split('-')[0]];
			if(!memo[val.id.split('-')[0]])	{
				$('.' + val.id.replace('toggle','tb')).hide();
			}
		});
	});
	this.getAttr = function (attr) {
		return __settings[attr];
	}
	this.setAttr = function(attr, nattr) {
		__settings[attr] = nattr;
		appmemory.save('settings', __settings).then(function(){
			SUCS('<i class="glyphicon glyphicon-floppy-disk"></i>Succesfully updated settings!');
		}, function(){
			console.warn('could not update settings remotely');
		});
	}
};