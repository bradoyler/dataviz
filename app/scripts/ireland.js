/* global d3, topojson */
const coords = [
  { name: 'a', long: -7.5, lat: 55 },
  { name: 'b', long: -7.49, lat: 54.9 },
  { name: 'c', long: -7.48, lat: 54.7 },
  { name: 'd', long: -7.47, lat: 54.5 },
  { name: 'e', long: -7.46, lat: 54.45 },
  { name: 'f', long: -7.45, lat: 54.44 }
]

const svg = d3.select('#map')
.append('svg').attr('width', '100%')

const { width } = d3.select('#map').node().getBoundingClientRect()
const height = width * 0.72 // aspect

svg.attr('height', height)

const proj = d3.geoAlbers()
.center([coords[0].long, coords[0].lat])
.rotate([0, 0])
.scale(35000)
.translate([width / 2, height / 2])

const path = d3.geoPath().projection(proj) // .pointRadius(2.5)

d3.queue()
  .defer(d3.json, 'data/ireland/topo.json')
  .await(ready)

function ready (error, ireland) {
  if (error) throw error

  const g = svg.append('g')
    .style('stroke-width', '1.5px')

  g.selectAll('.borders')
  .data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features)
  .enter().append('path')
  .attr('class', 'borders')
  .attr('d', path)

  drawMapPoints(g, proj, coords)
  setInterval(() => {
    centerMap(g, proj, [coords[5].long, coords[5].lat])
  }, 4000)
}

function drawMapPoints (svg, projection, coords) {
  const circleGroup = svg.selectAll('circle')
  .data(coords)
  .enter()
  .append('g')
  .attr('transform', function (d) {
    return 'translate(' + projection([d.long, d.lat]) + ')'
  })
  .attr('class', 'points')

  circleGroup
    .append('circle')
    // .style('fill-opacity', .8)
    .attr('r', (d) => 2)
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
    .append('title')
    .text((d) => d.name)
}
let Xpoint = -50
let Ypoint = -100
function centerMap (g, projection, latlong) {
  const x = Xpoint -= 1
  const y = Ypoint -= 100
  if (y < -900) {
    Xpoint = -50
    Ypoint = -100
  }
  const xy = [x, y]
  console.log(xy, '<< new xy')
  g.transition()
    //   .duration(1500)
    //   .attr('transform', `scale(1)`)
    // .transition()
      .duration(1500)
      .attr('transform', `translate(${xy})`)
}
