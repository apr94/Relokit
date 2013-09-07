$(function() {
$( "#locationsdiv" ).accordion();
});

$(function() {
$( "#slider-range" ).slider({
range: true,
min: 0,
max: 1400,
values: [ 75, 300 ],
slide: function( event, ui ) {
$( "#amountPrice" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
}
});
$( "#amountPrice" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
" - $" + $( "#slider-range" ).slider( "values", 1 ) );
});


 $(function() {
$( "#slider-range-max" ).slider({
range: "max",
min: 1,
max: 10,
value: 2,
slide: function( event, ui ) {
$( "#amountBedrooms" ).val( ui.value );
}
});
$( "#amountBedrooms" ).val( $( "#slider-range-max" ).slider( "value" ) );
});
