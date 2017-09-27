/* global d3, topojson */
import geojson from '../data/ireland/markers_lines.geo.json'
import geoMarkers from '../data/ireland/markers.geo.json'

const svg = d3.select('#map').append('svg').attr('width', '100%')

const { width } = d3.select('#map').node().getBoundingClientRect()
const height = width * 0.6

svg.attr('height', height)

const proj = d3.geoAlbers()
.center([-7.5, 54])
.rotate([0, 0])
.scale(15000)
.translate([width / 2, height / 2])

const path = d3.geoPath().projection(proj)

d3.queue()
  .defer(d3.json, 'data/ireland/topo.json')
  .await(ready)

function drawGeoJson (svg, features, className) {
  return svg.selectAll('.' + className).data(features)
    .enter()
    .append('path')
    .attr('class', className)
    .attr('data-id', (d) => d.id)
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

  const lines = geojson.features.filter(f => f.geometry.type === 'LineString')
  drawGeoJson(g, lines, 'geoLine')
  const els = drawGeoJson(g, geoMarkers.features, 'geoPoint')
  els.on('mouseover', (d, i) => {
    // console.log(d, i)
    els.attr('style', '')
    d3.select('[data-id="' + d.id + '"]').attr('style', 'fill: #000')
    d3.select('#msg').html('Location:' + d.id)
  })
}
