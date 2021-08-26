// Read in data and create line chart of departure delays by day of the week
d3.csv("/data/dow_data.csv").then((data) => {
  data.forEach(function (num) {
    num.Dep_Delay_Per = +num.Dep_Delay_Per;
  });
    
  //Save x and y variables
  var dow = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  var delay_percent = data.map(d => {
    return d.Dep_Delay_Per
  });
 
  //Build line chart
  var dow1 = {
    x: dow,
    y: delay_percent,
    marker: {
      color: '#21918c'
    }
  };

  var dowData = [dow1];
  var dowLayout = {
    title: "<b>Which Day of the Week Has the Fewest Departure Delays?<b>",
    xaxis: {
      title: 'Day of the Week'
    },
    yaxis: {
      title: '% Flights Delayed'
    }
  };

  Plotly.newPlot("vis-container", dowData, dowLayout);

})
 