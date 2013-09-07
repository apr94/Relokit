function place_some_markers()
{
	
	hasStarted = !hasStarted;
	
	if (hasStarted){
		var placer = document.getElementById("place-markers");
		placer.setAttribute ("id", "stop-place");
	}
	else{
		var placer = document.getElementById("stop-place");
		placer.setAttribute ("id", "place-markers");
	}
	
	
}
