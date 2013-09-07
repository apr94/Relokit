$(function() {
    $("#slider" + selections).slider({
        value: 50,
        min: 20,
        max: 400,
        step: 10,
        slide: function(event, ui) {
            $("#amount").val("" + ui.value);
        }
    });
    $("#amount").val("" + $("#slider").slider("value"));
});
  });
