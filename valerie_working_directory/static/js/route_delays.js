d3.csv("static/data/top_route_delays.csv").then((data) => {
   
  var route = data.map(r => {
    return r.Route
  });

  var delay = data.map(d => {
    return d.Delay_Per
  });
  
  var delay_mins = data.map(m => {
    return m.Avg_Delay
  });

  var colorArr = [];
  delay_mins.forEach(i => {
    if (i < 30) {
      colorArr.push('#86d549');
    }
    else if (i < 40 && i >= 30) {
      colorArr.push('#1e9b8a')
    }
    else if (i < 50 && i >= 40) {
      colorArr.push('#2d708e')
    }
    else if (i < 60 && i >= 50) {
      colorArr.push('#433e85')
    }
    else {
      colorArr.push('#440154');
    }
  })
  
  //Build bar chart
  var route1 = {
    x: route,
    y: delay,    
    type: 'bar',
    marker: {
      color: '#482173'
    },
    hovertemplate: '%{x}<br>' + '% Flights Delayed: %{y}<br>' + '<extra></extra>'
    };

  var routeData = [route1];
  var routeLayout = {
    title: "<b>Which Routes Have the Most Arrival Delays?<b>",
    xaxis: {
      title: 'Route',
      
    },
    yaxis: {
      title: '% Flights Delayed'
    }
  };

  Plotly.newPlot("route", routeData, routeLayout);

});
 