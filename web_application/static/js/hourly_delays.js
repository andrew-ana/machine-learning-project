// Read in data and create line chart of departure delays by day of the week
d3.csv("/data/hourly_delays.csv").then((data) => {
  var hour = data.map(h => {
    return h.Hour
  });

  var delay = data.map(d => {
    return d.Delay
  });

 
  //Build line chart
  var hour1 = {
    x: hour,
    y: delay,
    marker: {
      color: '#3e4989'
    }
  };

  var hourData = [hour1];
  var hourLayout = {
    title: "<b>Departure Time Delays by Hour of the Day<b>",
    xaxis: {
      title: 'Hour of the Day'
    },
    yaxis: {
      title: '% Flights Delayed'
    }
  };

  Plotly.newPlot("vis-container", hourData, hourLayout);

})
 