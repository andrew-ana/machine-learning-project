// Display paragraphs of 
$.fn.searchResults = function(searchArray) {
    this.children().remove();
    container = this;
    container.append('<h1 class="text-center">Historical Flights</h1>')
    searchArray.forEach(flight => {
        container.append('<p class="text-center"> Departure Date: '+flight[0] + '.   Delay: '+flight[1]+'</p>')
    });
}

$.fn.flightList = function(searchArray) {
    this.children().remove();
    container = this;
    searchArray.forEach(date => {
        container.append('<p class="text-center"> Flight Date:'+date[0]+'.    Number of Flights'+date[1]+'</p>')
    });
}

// Predict with form data
$.fn.prediction = function() {
    console.log($('#departs-from').val());
    $.ajax({
        url: '/predict',
        data: {
            flight_num : $('#flight_num').val()
        },
        type: 'POST',
        success: function(response) {
            $('#loading-icon').hide()
            $('#form-output').append('<p>'+response.prediction+'</p>');
        },
        error: function(response){
            console.log('Bad Response')
        }
    })
};

// Get Number of flights by date
$.fn.flightsByDate = function() {
    $.ajax({
        url: '/flightsbydate',
        data: {},
        type: 'POST',
        success: function(response) {
            $('#loading-icon').hide()
            $('#form-output').flightList(response.qresults);
        },
        error: function(response){
            console.log('Bad Response')
        }
    })
};


// LISTENER: When the button is clicked, follow route
$('#form-update').click(function(){
    $('#form-output').children().remove();
    $('#loading-icon').show()
    $(document).prediction();
});

/*
// LISTENER: When the button is clicked, follow route
$('#flight-summary').click(function(){
    $('#form-output').children().remove();
    $('#loading-icon').show()
    $(document).flightsByDate();
});
*/
