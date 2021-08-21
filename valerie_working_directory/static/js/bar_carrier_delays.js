// Read in data and create bar chart - Carrier Delays

d3.csv("static/data/carrier_delays.csv").then((data) => {
  //Save x and y variables
  var percentDelayed = data.map(d => {
    return d.Late_Arr_Per
  });
  
  var minsDelayed = data.map(m => {
    return m.Avg_Late_Arr
  });
  
  // Create xticks - Airline names
  carrier_name = ['American', 'Alaska', 'JetBlue', 'Delta', 'Frontier', 'Allegiant', 'Hawaiian', 'Spirit', 'United', 'SouthWest']

  //Build bar chart - % Delayed Flights, Avg Delay - by Carrier
  var carrier_bar1 = {
    type: "bar",
    x: carrier_name,
    y: percentDelayed,
    name: '% Flights Delayed',
    marker: {
      color: '#90d743'
    },
    hovertemplate: '%{x}<br>' + '% Flights Delayed: %{y}' + '<extra></extra>'  
  };

  var carrier_bar2 = {
    type: "bar",
    x: carrier_name,
    y: minsDelayed,
    name: 'Average Delay (in mins)',
    marker: {
      color: '#443983'
    },
    hovertemplate: '%{x}<br>' + 'Avg Delay: %{y}' + '<extra></extra>'
  };

  var carrier_barData = [carrier_bar1, carrier_bar2];
  var carrier_barLayout = {
    title: "<b>Airline Flight Arrival Delays<b>",
    xaxis: {
      title: 'Carrier'
    },
    yaxis: {
      title: '% Flights Delayed<br>Avg Delay (in minutes)<br>'
    }
  };

  Plotly.newPlot("carrier", carrier_barData, carrier_barLayout);

})
 