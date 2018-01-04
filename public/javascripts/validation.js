$("#addReview").submit(
	function(e){
		$(".alert.alert-danger").hide();
		if (!$("input#name").val()){
			if ($(".alert.alert-danger").length){
				$(".alert.alert-danger").show();
			} else {
				$(this).prepend("<div role='alert' class='alert alert-danger'>Required!</div>");
			}
			return false;
		}
	});