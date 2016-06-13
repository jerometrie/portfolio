$(document).ready(function() {

	// Take care of the menu handle
	$(".handle").on("click", function() {
		$(this).closest("nav").find("ul").toggleClass("showing");
	});
});