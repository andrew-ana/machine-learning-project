// Display paragraphs of 
$.fn.searchResults = function(searchArray) {
    this.children().remove();
    container = this;
    container.append('<h1 class="text-center">Historical Flights</h1>')
    searchArray.forEach(flight => {
        container.append('<p class="text-center"> Departure Date: '+flight[0] + '.   Delay: '+flight[1]+'</p>')
    });
}

function styleResults(value) {
    if (value<= 50) {
        $('#result-description').text('You are not going to make it.')
        $('.result-text').addClass('text-danger')
        $('.result-text').removeClass('text-warning')
        $('.result-text').removeClass('text-success')
    } else if (value <= 75) {
        $('#result-description').text('You might make it. But we doubt it.')
        $('.result-text').removeClass('text-danger')
        $('.result-text').addClass('text-warning')
        $('.result-text').removeClass('text-success')
    } else {
        $('#result-description').text('You are probably chill')
        $('.result-text').removeClass('text-danger')
        $('.result-text').removeClass('text-warning')
        $('.result-text').addClass('text-success')
    }
}

// Predict with form data
$.fn.prediction = function() {
    $.ajax({
        url: '/predict',
        data: {
            flight_num : $('#flight_num').val()
        },
        type: 'POST',
        success: function(response) {
            $('#loading-icon').hide()
            $('#result-container').show()
            $('#result-numeric').children().remove()
            $('#result-numeric').append('<h1 class="text-center">'+response.prediction*100+'%</h1>');
            styleResults(response.prediction*100)
            drawChart(response.prediction);
        },
        error: function(response){
            console.log('Bad Response')
        }
    })
};


// LISTENER: When the button is clicked, follow route
$('#form-update').click(function(){
    $('#result-container').hide();
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
