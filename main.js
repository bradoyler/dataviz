
var svg = d3.select('#us-map'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

    var projection = d3.geoAlbers()
        .translate([width / 2, height / 2])
        .scale(1280);

    var radius = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, 14]);

    var path = d3.geoPath()
        .projection(projection)
        .pointRadius(2.5);

    var voronoi = d3.voronoi()
        .extent([[-1, -1], [width + 1, height + 1]]);

    d3.queue()
        .defer(d3.json, 'data/us.json')
        .defer(d3.csv, 'data/airports.csv', typeAirport)
        .defer(d3.csv, 'data/flights.csv', typeFlight)
        .await(ready);

    function ready(error, us, airports, flights) {
      if (error) throw error;

      var airportByIata = d3.map(airports, function(d) { return d.iata; });

      flights.forEach(function(flight) {
        var source = airportByIata.get(flight.origin),
            target = airportByIata.get(flight.destination);
        source.arcs.coordinates.push([source, target]);
        target.arcs.coordinates.push([target, source]);
      });

      airports = airports
          .filter(function(d) { return d.arcs.coordinates.length; });

      svg.append('path')
          .datum(topojson.feature(us, us.objects.land))
          .attr('class', 'land')
          .attr('d', path);

      svg.append('path')
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr('class', 'state-borders')
          .attr('d', path);

      svg.append('path')
          .datum({type: 'MultiPoint', coordinates: airports})
          .attr('class', 'airport-dots')
          .attr('d', path);

      var airport = svg.selectAll('.airport')
        .data(airports)
        .enter().append('g')
          .attr('class', 'airport');

      airport.append('title')
          .text(function(d) { return d.iata + '\n' + d.arcs.coordinates.length + ' flights'; });

      airport.append('path')
          .attr('class', 'airport-arc')
          .attr('d', function(d) { return path(d.arcs); });

      airport.append('path')
          .data(voronoi.polygons(airports.map(projection)))
          .attr('class', 'airport-cell')
          .attr('d', function(d) { return d ? 'M' + d.join('L') + 'Z' : null; });
    }

    function typeAirport(d) {
      d[0] = +d.longitude;
      d[1] = +d.latitude;
      d.arcs = {type: 'MultiLineString', coordinates: []};
      return d;
    }

    function typeFlight(d) {
      d.count = +d.count;
      return d;
    }


// https://bl.ocks.org/mbostock/7608400/e5974d9bba45bc9ab272d98dd7427567aafd55bc

var lineChart = d3.select('#lineChart'),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +lineChart.attr('width') - margin.left - margin.right,
    height = +lineChart.attr('height') - margin.top - margin.bottom,
    g = lineChart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var parseTime = d3.timeParse('%d-%b-%y');
var x = d3.scaleTime()
    .rangeRound([0, width]);
var y = d3.scaleLinear()
    .rangeRound([height, 0]);
var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
d3.tsv('data/prices.tsv', function(d) {
  d.date = parseTime(d.date);
  d.close = +d.close;
  return d;
}, function(error, data) {
  if (error) throw error;
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));
  g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
    .select('.domain')
      .remove();
  g.append('g')
      .call(d3.axisLeft(y))
    .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)');
  g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
});
