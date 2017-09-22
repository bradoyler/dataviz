/* global d3, topojson */
const svg = d3.select('#us-map svg')
const width = +svg.attr('width')
const height = +svg.attr('height')

const projection = d3.geoAlbers().translate([width / 2, height / 2]).scale(960)

// const radius = d3.scaleSqrt()
//     .domain([0, 100])
//     .range([0, 14])

const path = d3.geoPath()
    .projection(projection)
    .pointRadius(2.5)

// const voronoi = d3.voronoi()
//     .extent([[-1, -1], [width + 1, height + 1]])

d3.queue()
  .defer(d3.json, 'data/us.json')
  .defer(d3.csv, 'data/airports.csv', typeAirport)
  .defer(d3.csv, 'data/flights.csv', typeFlight)
  .await(ready)

function ready (error, us, airports, flights) {
  // console.log(error, us);
  if (error) throw error

  const airportByIata = d3.map(airports, d => d.iata)
  // console.log(airportByIata, '>>>');

  flights.forEach((flight) => {
    const source = airportByIata.get(flight.origin)
    const target = airportByIata.get(flight.destination)
    source.arcs.coordinates.push([source, target])
    target.arcs.coordinates.push([target, source])
  })

  airports = airports.filter(d => d.arcs.coordinates.length)

  svg.append('path')
      .datum(topojson.feature(us, us.objects.land))
      .attr('class', 'land')
      .attr('d', path)

  svg.append('path')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr('class', 'state-borders')
      .attr('d', path)

  const coords = [{0: -99.68189722, 1: 32.41132}]

  console.log(airports, 'airports >>')
  svg.append('path')
      .datum({type: 'MultiPoint', coordinates: coords})
      .attr('class', 'airport-dots')
      .attr('d', path)

  // const airport = svg.selectAll('.airport')
  //   .data(airports)
  //   .enter().append('g')
  //     .attr('class', 'airport')
  //
  // airport.append('title')
  //     .text(d => {
  //       // console.log(d.arcs, 'arcs')
  //       return d.iata + '\n' + d.arcs.coordinates.length + ' flights'
  //     })
  //
  // airport.append('path')
  //     .attr('class', 'airport-arc')
  //     .attr('d', d => path(d.arcs))
  //
  // airport.append('path')
  //     .data(voronoi.polygons(airports.map(projection)))
  //     .attr('class', 'airport-cell')
  //     .attr('d', (d) => {
  //       return d ? 'M' + d.join('L') + 'Z' : null
  //     })
}

function typeAirport (d) {
  d[0] = +d.longitude
  d[1] = +d.latitude
  d.arcs = {type: 'MultiLineString', coordinates: []}
  return d
}

function typeFlight (d) {
  d.count = +d.count
  return d
}

// https://bl.ocks.org/mbostock/7608400/e5974d9bba45bc9ab272d98dd7427567aafd55bc
