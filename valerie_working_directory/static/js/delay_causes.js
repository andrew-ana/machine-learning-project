// Read in data and create bar chart - Delay Causes
d3.csv("static/data/delay_causes.csv").then((data) => {
  
  //Set trace variables
  var cause = data.map(c => {
    return c.Causes
  });
 
  var delays_by_cause = data.map(d => {
    return d.delay_per
  });
    
 //Build bar chart - % Delayed Flights, Avg Delay - by Carrier
 var causebar1 = {
  type: "bar",
  x: cause,
  y: delays_by_cause,
  name: '% Flights Delayed',
  marker: {
    color: '#fde725'
  },
  hovertemplate: '%{x}<br>' + '% Flights Delayed: %{y}' + '<extra></extra>'  
};

  var causeData = [causebar1];
  var causeLayout = {
    title: "<b>Flight Arrival Delays by Cause<b>",
    xaxis: {
      title: 'Carrier'
    },
    yaxis: {
      title: '% Flights Delayed'
    }
  };

  Plotly.newPlot("cause", causeData, causeLayout);
})
  