/* global d3, topojson */

import geojson from '../data/ireland/markers_lines.geo.json'
// let locationIndex = 0

// const locations = [
//   { name: 'Londonderry, UK', lat: 54.9966120, long: -7.3085750 },
// //   { name: 'The Peace Bridge, Derry BT48 7NN, UK', lat: 54.9979, long: -7.3159400 },
//   { name: 'Mullenan Rd, Londonderry BT48 9XW, UK', lat: 54.96788, long: -7.39015 },
//   { name: 'Fermanagh, United Kingdom', lat: 54.34383, long: -7.63187 },
//   { name: 'Sheridan John, DP1, Enniskillen BT92 1ED, UK', lat: 54.28067, long: -7.82704 },
//   { name: 'Ballindarragh, Enniskillen BT94 5NZ, UK', lat: 54.2705, long: -7.50278 },
//   { name: 'Newtownbutler, Enniskillen, UK', lat: 54.18207, long: -7.36064 },
//   { name: 'Belturbet, Kilconny, Co. Cavan, Ireland', lat: 54.10191, long: -7.44967 }
// Warrenpoint -6.2628936767578125, 54.10369688287697
// Parish Church:-6.05020523071289, 54.74587920873868
// ]

const svg = d3.select('#map')
.append('svg').attr('width', '100%')

const { width } = d3.select('#map').node().getBoundingClientRect()
const height = width * 0.6

svg.attr('height', height)

const proj = d3.geoAlbers()
.center([-7.5, 54])
.rotate([0, 0])
.scale(15000)
.translate([width / 2, height / 2])

const path = d3.geoPath().projection(proj) // .pointRadius(2.5)

d3.queue()
  .defer(d3.json, 'data/ireland/topo.json')
  .await(ready)

function drawGeoJson (svg, geojson) {
  const lines = geojson.features.filter(f => f.geometry.type === 'LineString')
  const points = geojson.features.filter(f => f.geometry.type === 'Point')
  svg.selectAll('.geoLine').data(lines)
    .enter()
    .append('path')
    .attr('class', 'geoLine')
    .attr('data-id', (d) => {
      return d.id
    })
    .attr('d', path)

  svg.selectAll('.geoPoint').data(points)
    .enter()
    .append('path')
    .attr('class', 'geoPoint')
    .attr('d', path)
}

function ready (error, ireland) {
  if (error) throw error

  const g = svg.append('g').style('stroke-width', '1.5px')

  g.selectAll('.borders')
  .data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features)
  .enter().append('path')
  .attr('class', 'borders')
  .attr('d', path)

  drawGeoJson(g, geojson)
  // setInterval(() => {
  //   if (locationIndex > (locations.length - 1)) {
  //     locationIndex = 0
  //   }
  //   centerMap(g, proj, locations[locationIndex])
  //   d3.select('#location').text(locations[locationIndex].name)
  //   d3.select("[data-name='" + locations[locationIndex].name + "']")
  //     .style('fill', 'blue').style('stroke', 'white')
  //   locationIndex += 1
  // }, 3000)
}

// function centerMap (g, projection, location) {
//   const originXY = projection([locations[0].long, locations[0].lat])
//   const XY = projection([location.long, location.lat])
//   const dx = originXY[0] - XY[0]
//   const dy = originXY[1] - XY[1]
//   const xy = [dx, dy]
//   console.log('>>>', location)
//   g.transition()
//       .duration(1500)
//       .attr('transform', `translate(${xy})`)
// }
