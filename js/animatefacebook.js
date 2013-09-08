function slideout() {
	//alert("slidout");
	var relationship_bar = document.getElementById("fb_relationship");
	var religion_bar = document.getElementById("fb_religion");
	religion_bar.style.visibility = "visible";
	relationship_bar.style.visibility = "visible";
	
	
	if (hasreligion) {
		//alert("hasreligion");
	}
	else {
		//alert("hasnoreligion");
	}
	if (hasrelationship){
		//alert("hasrelationship");
	}
	else{
		//alert("hasnorelationship");
	}
}

function transition_console(){
	document.getElementById("toprofile").style.display = "none";
	
	/*set overflow y scroll for facebook */
	document.getElementById("facebook").style.overflowY = "scroll";
	/*document.getElementById("extra-text").style.display = "";
	var clear = document.getElementsByClassName("clear") = "";
	var gen = document.getElementsByClassName("generate") = "";
	var cons =document.getElementsByClassName("console-element") =  "";
	
	for (var i = 0; i < clear.length; i++) {
	    clear[i].style = "";
	}
	for (var i = 0; i < gen.length; i++) {
	    gen[i].style = "";
	}
	for (var i = 0; i < cons.length; i++) {
	    cons[i].style = "";
	}
	*/
	$('#extra-text').css('display','inline');
	$('.clear').css('display','inline');
	$('.generate').css('display','inline');
	$('.console-element').css('display','block');
	
	
	$("#fb-container").animate({
	   top: '2%',
	   width:'30px',
	   left: '80%'
	}, { duration: 1000, queue: false });
	
	
	$("#facebook").animate({
	   width: '600px',
	   left: '50%'
	}, { duration: 1000, queue: false });
	/*$("#map-canvas").animate({
	   width: '68%',
	}, { duration: 1500, queue: false });*/
}