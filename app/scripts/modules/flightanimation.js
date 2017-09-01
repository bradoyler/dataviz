/* global d3, topojson, $ */
import flightRoutes from './routes'

function rAFscroll (fn) {
  const rAF = window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               // IE Fallback, you can even fallback to onscroll
               function (callback) { window.setTimeout(callback, 1000 / 60) }

  let lastPosition = -1
  function loop () {
    // Avoid calculations if not needed
    if (lastPosition === window.pageYOffset) {
      rAF(loop)
      return false
    } else lastPosition = window.pageYOffset
    fn()
    rAF(loop)
  }
  loop()
}

const $flightmap = $('#flightmap')
let currentWidth = $flightmap.width()
const width = 938
const height = 620

const pro = d3.geoAlbers()
                   .scale(900)
                   .translate([width / 2, height / 2])

const path = d3.geoPath()
             .pointRadius(1.2)
             .projection(pro)

const svg = d3.select('#flightmap')
            .append('svg')
            .attr('preserveAspectRatio', 'xMidYMid')
            .attr('viewBox', '0 0 ' + width + ' ' + height)
            .attr('width', currentWidth)
            .attr('height', currentWidth * height / width)

const airportMap = {}

function transition (plane, route) {
  const l = route.node().getTotalLength()
  plane.transition()
      .duration(l * 20)
      .attrTween('transform', delta(plane, route.node()))
      .on('end', () => { route.remove() })
      .remove()
}

function delta (plane, path) {
  const l = path.getTotalLength()
  return function (i) {
    return function (t) {
      const p = path.getPointAtLength(t * l)
      const t2 = Math.min(t + 0.05, 1)
      const p2 = path.getPointAtLength(t2 * l)
      const x = p2.x - p.x
      const y = p2.y - p.y
      const r = 90 - Math.atan2(-y, x) * 180 / Math.PI
      const s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3)
      return 'translate(' + p.x + ',' + p.y + ') scale(' + s + ') rotate(' + r + ')'
    }
  }
}

function fly (origin, destination) {
  if (!airportMap[origin] || !airportMap[destination]) return

  const route = svg.append('path')
                 .datum({type: 'LineString', coordinates: [airportMap[origin], airportMap[destination]]})
                 .attr('class', 'route')
                 .attr('d', path)

  // const plane = svg.append('circle').attr('cx', 5).attr('cy', 5).attr('r', 5).style('fill', 'blue')
  const plane = svg.append('path')
                .attr('class', 'plane')
                .attr('d', 'm25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z')

  transition(plane, route)
}

function ready (error, topo, airports) {
  if (error) throw error

  svg.append('g')
     .attr('class', 'states')
     .selectAll('path')
     .data(topojson.feature(topo, topo.objects.states).features)
     .enter()
     .append('path')
     .attr('d', path)

  svg.append('g')
     .attr('class', 'airports')
     .selectAll('path')
     .data(topojson.feature(airports, airports.objects.airports).features)
     .enter()
     .append('path')
     .attr('id', (d) => d.id)
     .attr('d', path)

  const geos = topojson.feature(airports, airports.objects.airports).features

  geos.forEach(function (geo) {
    airportMap[geo.id] = geo.geometry.coordinates
  })

  let start = 0
  function flyBatch (flightCnt = 10) {
    if ($flightmap.offset().top + $flightmap.height() < $(window).scrollTop()) return

    let end = start + flightCnt
    const pairs = flightRoutes.slice(start, end)
    pairs.forEach((pair, idx) => {
      fly(pair[0], pair[1])
    })
    start = end
    // reset the flight loop
    if (pairs.length === 0) {
      start = 0
    }
  }

  flyBatch(200)
  rAFscroll(flyBatch)
}

d3.queue()
  .defer(d3.json, 'data/us.json')
  .defer(d3.json, 'data/us-airports-major.topo.json')
  .await(ready)

$(window).resize(function () {
  currentWidth = $flightmap.width()
  svg.attr('width', currentWidth)
  svg.attr('height', currentWidth * height / width)
})
