$(document).ready(function() {

	// Take care of the menu handle
	$(".handle").on("click", function(event) {
		event.preventDefault();
		$(".js-modal").toggleClass("showing");
	});
});