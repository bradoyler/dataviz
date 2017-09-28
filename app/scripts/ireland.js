/* global d3, topojson */
import geojson from '../data/ireland/markers_lines.geo.json'
import geoMarkers from '../data/ireland/markers.geo.json'

const {width} = d3.select('#map').node().getBoundingClientRect()
const height = width * 0.6
const svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height)

const image = svg.append('image')
      .attr('xlink:href', 'https://user-images.githubusercontent.com/425966/30931698-5c6b5888-a37a-11e7-980f-791406e2cb37.jpg')
      .attr('width', 2500)
      .attr('height', 2000)
      .attr('x', -612) // left/right
      .attr('y', -565) // up/down
      .attr('transform', 'scale(' + width / 2000 + ')')

const g = svg.append('g')
  .style('stroke-width', '1.5px')
  .attr('transform', 'scale(' + width / 2000 + ')')

const lat = -9 // left/right
const long = 54.59 // up/down
const proj = d3.geoMercator()
.center([lat, long])
.rotate([0, 0])
.scale(7100)

const path = d3.geoPath().projection(proj).pointRadius(8)

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

window.addEventListener('resize', () => {
  const { width } = d3.select('#map').node().getBoundingClientRect()
  svg.attr('width', width) // .attr('height', width * 0.6)
  image.attr('transform', 'scale(' + width / 2000 + ')')
  g.attr('transform', 'scale(' + width / 2000 + ')')
})

function ready (error, ireland) {
  if (error) throw error

  g.selectAll('.borders')
    .data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features)
    .enter().append('path')
    .attr('class', 'borders')
    .attr('d', path)

  const lines = geojson.features.filter(f => f.geometry.type === 'LineString')
  drawGeoJson(g, lines, 'geoLine')
  const els = drawGeoJson(g, geoMarkers.features, 'geoPoint')
  els.on('mouseover', (d, i) => {
    els.attr('style', '')
    d3.select('[data-id="' + d.id + '"]').attr('style', 'fill: #000')
    d3.select('#msg').html('Location:' + d.id)
  })
}
