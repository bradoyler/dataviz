/* global d3, topojson */
const svg = d3.select('#us-map svg')
const width = +svg.attr('width')
const height = +svg.attr('height')

const projection = d3.geoAlbers().translate([width / 2, height / 2]).scale(960)

const path = d3.geoPath()
    .projection(projection)
    .pointRadius(1.6)

d3.queue()
  .defer(d3.json, 'data/us.topo.json')
  .defer(d3.json, 'data/homelands.topo.json')
  .defer(d3.json, 'data/stations.geo.json')
  .await(ready)

function ready (error, us, homelands, stations) {
  if (error) throw error

  console.log(stations, 'stations >>')
  // const coalStations = stations.features.filter(f => f.properties.GrossLoadMWh)
  // const stationsByID = d3.map(coalStations, d => d.properties.ID)

  svg.append('path')
      .datum(topojson.feature(us, us.objects.land))
      .attr('class', 'land')
      .attr('d', path)

  svg.append('path')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr('class', 'state-borders')
      .attr('d', path)

  svg.append('path')
      .datum(topojson.feature(homelands, homelands.objects.cb_2016_us_aiannh_500k))
      .attr('class', 'homelands-borders')
      .attr('d', path)

  svg.append('g')
     .attr('class', 'stations')
     .selectAll('path')
     .data(stations.features)
     .enter()
     .append('path')
     .attr('id', (d) => d.id)
     .attr('d', path)

  // manual points
  // const coords = [{0: -99.68189722, 1: 32.41132}]
  // svg.append('path')
  //     .datum({type: 'MultiPoint', coordinates: coords})
  //     .attr('class', 'other-points')
  //     .attr('d', path)
}

function typeStation (d) { // for points via CSV
  d[0] = +d.longitude
  d[1] = +d.latitude
  d.arcs = {type: 'MultiLineString', coordinates: []}
  return d
}
