expand_already = true;

function hover(){

   if(expand_already){
    $('#expander').css('background-image', "url('css/arrow-left(black).png')");
 }
 else{
      $('#expander').css('background-image', "url('css/arrow-right(black).png')"); 
 }


}


function nohover(){
   
   if(expand_already){
    $('#expander').css('background-image', "url('css/arrow-left(grey).png')");
 }
 else{
      $('#expander').css('background-image', "url('css/arrow-right(grey).png')"); 
 }
   
}

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
     $("#facebook").animate({
      left: '33%',
   }, { duration: 1500, queue: false });
     $("#fb_religion").animate({
      left: '48.75%',
   }, { duration: 1500, queue: false });
     $("#fb_relationship").animate({
      left: '32.5%',
   }, { duration: 1500, queue: false });
     $("#fb_likes").animate({
      left: '28%',
   }, { duration: 1500, queue: false });
     $("#expander").animate({
      left: '75.85%',
   }, { duration: 1500, queue: false });

     $('#expander').css('background-image', "url('css/arrow-right(grey).png')");
     expand_already = !expand_already;

  }

  else {

   $("#menu").animate({
      width: '40px',
      left:"97.4%"
   }, { duration: 1500, queue: false });

   $("#map-canvas").animate({
      width: '86.3%',
   }, { duration: 1500, queue: false });

   $("#facebook").animate({
      left: '50%',
   }, { duration: 1500, queue: false });

   $("#fb_religion").animate({
      left: '66%',
   }, { duration: 1500, queue: false });

   $("#fb_relationship").animate({
      left: '50%',
   }, { duration: 1500, queue: false });

   $("#fb_likes").animate({
      left: '32%',
   }, { duration: 1500, queue: false });
   $("#mask").animate({
      width: '100%',
   }, { duration: 1500, queue: true });

   $("#expander").animate({
      left: '97.7%',
   }, { duration: 1500, queue: false });

   expand_already = !expand_already;
   $('#expander').css('background-image', "url('css/arrow-left(grey).png')");
   var canvas = document.getElementById("mask");
   canvas.setAttribute ("id", "Straight-mask");	

}

}
