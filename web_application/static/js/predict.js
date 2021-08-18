// Predict with form data
$.fn.prediction = function() {
    $.ajax({
        url: '/predict',
        data: {
            flight_num : $('#flight_num').val(),
            airport : $('#airport').val()
        },
        type: 'POST',
        success: function(response) {
            console.log(response);
            $('#form-output').children().remove()
            $('#form-output').css("width", response.width+"px");
            $('#form-output').css("height", response.height+"px");
            $('#form-output').append('<p class="text-white">'+response.airport+'</p>');
            $('#form-output').append('<p class="text-white">'+response.flight_num+'</p>');
        },
        error: function(response){
            console.log('Bad Response')
        }
    })
};


// LISTENER: When the button is clicked, follow route
$('#form-update').click(function(){
    $(document).prediction();
});