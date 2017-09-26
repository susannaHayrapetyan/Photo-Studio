
// Get first page of articles when document is ready.

$(function() {

	var access_token = localStorage.getItem("access_token");

	$(window).on('scroll', function(e) {
		
		// Scrolled to bottom.

		if($(window).scrollTop() + $(window).height() > $(document).height() - 250) {
			// Infinite Scroll
	        
	   }
	});

	$.ajax({
		url: "/user/me/photo?access_token=" + access_token, 
		type: "GET",             
		contentType: false,       
		cache: false,             
		processData:false,        
		success: function(data){
		}
	});

	$("#uploadimage").on('submit',(function(e) {
		e.preventDefault();

		formdata = new FormData();
		formdata.append("image", $('#file')[0].files[0]);

		$.ajax({
			url: "/user/me/photo?access_token=" + access_token, 
			type: "POST",             
			data: formdata, 
			contentType: false,       
			cache: false,             
			processData:false,        
			success: function(data){
			}
		});
	}));
})