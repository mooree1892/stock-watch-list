/**
 * Fail msg
 * @param {String} msg 
 * @param {Number} tmo 
 */
function FAIL (msg, tmo) {
	tmo = tmo || 3000;
	// $('.alert-danger').show();
	$('.alert-danger').css({"opacity":1});
	$('.alert-danger .alert-link').html(msg||'<i class="glyphicon glyphicon-flag"></i> Failed to Retrieve.');
	setTimeout(function () {
		$('.alert-danger').css({"opacity":0});
	}, tmo);
}
/**
 * Success msg
 * @param {String} msg 
 * @param {Number} tmo 
 */
function SUCS (msg, tmo) {
	tmo = tmo || 3000;
	// $('.alert-success').show();
	$('.alert-success').css({"opacity":1});
	$('.alert-success .alert-link').html(msg||'<i class="glyphicon glyphicon-check"></i> Added Successfully!');
	setTimeout(function () {
		$('.alert-success').css({"opacity":0});
	}, tmo);
}