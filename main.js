//
// var svg = d3.select('#us-map'),
//     width = +svg.attr('width'),
//     height = +svg.attr('height');
//
//     var projection = d3.geoAlbers()
//         .translate([width / 2, height / 2])
//         .scale(1280);
//
//     var radius = d3.scaleSqrt()
//         .domain([0, 100])
//         .range([0, 14]);
//
//     var path = d3.geoPath()
//         .projection(projection)
//         .pointRadius(2.5);
//
//     var voronoi = d3.voronoi()
//         .extent([[-1, -1], [width + 1, height + 1]]);
//
//     d3.queue()
//         .defer(d3.json, 'data/us.json')
//         .defer(d3.csv, 'data/airports.csv', typeAirport)
//         .defer(d3.csv, 'data/flights.csv', typeFlight)
//         .await(ready);
//
//     function ready(error, us, airports, flights) {
//       if (error) throw error;
//
//       var airportByIata = d3.map(airports, function(d) { return d.iata; });
//
//       flights.forEach(function(flight) {
//         var source = airportByIata.get(flight.origin),
//             target = airportByIata.get(flight.destination);
//         source.arcs.coordinates.push([source, target]);
//         target.arcs.coordinates.push([target, source]);
//       });
//
//       airports = airports
//           .filter(function(d) { return d.arcs.coordinates.length; });
//
//       svg.append('path')
//           .datum(topojson.feature(us, us.objects.land))
//           .attr('class', 'land')
//           .attr('d', path);
//
//       svg.append('path')
//           .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//           .attr('class', 'state-borders')
//           .attr('d', path);
//
//       svg.append('path')
//           .datum({type: 'MultiPoint', coordinates: airports})
//           .attr('class', 'airport-dots')
//           .attr('d', path);
//
//       var airport = svg.selectAll('.airport')
//         .data(airports)
//         .enter().append('g')
//           .attr('class', 'airport');
//
//       airport.append('title')
//           .text(function(d) { return d.iata + '\n' + d.arcs.coordinates.length + ' flights'; });
//
//       airport.append('path')
//           .attr('class', 'airport-arc')
//           .attr('d', function(d) { return path(d.arcs); });
//
//       airport.append('path')
//           .data(voronoi.polygons(airports.map(projection)))
//           .attr('class', 'airport-cell')
//           .attr('d', function(d) { return d ? 'M' + d.join('L') + 'Z' : null; });
//     }
//
//     function typeAirport(d) {
//       d[0] = +d.longitude;
//       d[1] = +d.latitude;
//       d.arcs = {type: 'MultiLineString', coordinates: []};
//       return d;
//     }
//
//     function typeFlight(d) {
//       d.count = +d.count;
//       return d;
//     }
//

// https://bl.ocks.org/mbostock/7608400/e5974d9bba45bc9ab272d98dd7427567aafd55bc


var lineChart = d3.select('#lineChart'),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +lineChart.attr('width') - margin.left - margin.right,
    height = +lineChart.attr('height') - margin.top - margin.bottom,
    g = lineChart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var parseTime = d3.timeParse('%Y');

var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);
var z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.ppf); });

function processData(d) {
  if (!d.date) return;
  d.date = parseTime(d.date);
  d.ppf = +d.ppf;
  return d;
}

function ready(error, data) {
  if (error) throw error;

  var carriers = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {date: d.date, ppf: d[id]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(carriers, function(c) { return d3.min(c.values, function(d) { return d.ppf; }); }),
    d3.max(carriers, function(c) { return d3.max(c.values, function(d) { return d.ppf; }); })
  ]);

  z.domain(carriers.map(function(c) { return c.id; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Pass Per Flight");

  var carrier = g.selectAll(".carrier")
    .data(carriers)
    .enter().append("g")
      .attr("class", "carrier");

  carrier.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });

  carrier.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.ppf) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
}

d3.csv('data/fpp.csv', processData, ready);
