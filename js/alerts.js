function FAIL (msg, tmo) {
	tmo = 5000 || tmo;
	$('.alert-danger').show();
	$('.alert-danger .alert-link').html(msg||$('.alert-danger .alert-link').html());
	setTimeout(function () {
		$('.alert-danger').hide();
	}, tmo);
}
function SUCS (msg, tmo) {
	tmo = 5000 || tmo;
	$('.alert-success').show();
	$('.alert-success .alert-link').html(msg||$('.alert-success .alert-link').html());
	setTimeout(function () {
		$('.alert-success').hide();
	}, tmo);
}