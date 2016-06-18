$(document).ready(function() {

	// Take care of the menu handle
	$(".handle").on("click", function(event) {
		event.preventDefault();
		$(".modal").toggleClass("showing");
	});
});