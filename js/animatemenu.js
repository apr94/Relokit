expand_already = true;

function expand()
{
	if (expand_already) {
	var canvas = document.getElementById("Straight-mask");
	canvas.setAttribute ("id", "mask");
$("#menu").animate({
   width: '350px',
   left:"75.5%"
}, { duration: 1500, queue: false });
$("#mask").animate({
   width: '80%',
}, { duration: 1500, queue: false });
$("#map-canvas").animate({
   width: '68%',
}, { duration: 1500, queue: false });

$("#fb").animate({
   left: '58%',
}, { duration: 1500, queue: false });
$("#fb-container").animate({
   left: '58%',
}, { duration: 1500, queue: false });
$("#fb_religion").animate({
   left: '48%',
}, { duration: 1500, queue: false });

expand_already = expand_already;

}

else {

$("#menu").animate({
   width: '40px',
   left:"97.4%"
}, { duration: 1500, queue: false });

$("#map-canvas").animate({
   width: '86.3%',
}, { duration: 1500, queue: false });

$("#fb").animate({
   left: '78%',
}, { duration: 1500, queue: false });
$("#fb-container").animate({
   left: '78%',
}, { duration: 1500, queue: false });
$("#fb_religion").animate({
   left: '58%',
}, { duration: 1500, queue: false });

$("#mask").animate({
   width: '100%',
}, { duration: 1500, queue: true });


expand_already = !expand_already;
var canvas = document.getElementById("mask");
canvas.setAttribute ("id", "Straight-mask");	

}



}
