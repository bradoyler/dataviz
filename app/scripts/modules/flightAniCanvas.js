/* global d3, topojson, $ */
import flightRoutes from './moreRoutes'
import helpers from './canvasHelpers'

export default function (selector = '#flightmap') {
  const airportMap = {}
  const $flightmap = $(selector)

  if (!$flightmap[0]) return
  const width = 720
  const height = 512

  const pro = d3.geoAlbersUsa().scale(900)
               .translate([width / 2, height / 2])

  const path = d3.geoPath().pointRadius(1.2)
                .projection(pro)

  const svg = d3.select(selector)
              .append('svg')
              .attr('preserveAspectRatio', 'xMidYMid')
              .attr('viewBox', '0 0 ' + width + ' ' + height)
              .attr('width', width)
              .attr('height', height)

  const canvasEl = d3.select(selector)
              .append('canvas')
              .attr('style', 'position:absolute;left:0;top:0;')
              .attr('width', width)
              .attr('height', height)

  const canvas = canvasEl.node()
  const ctx = canvas.getContext('2d')

  // set starting values
  const fps = 20
  const curveFactor = 10
  let points = []
  let batchSize = 5

  function animate () {
    draw()
     // request another frame
    setTimeout(function () {
      window.requestAnimationFrame(animate)
    }, 1000 / fps)
  }

 // draw the current frame based on sliderValue
  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < points.length; i++) {
      if (i > batchSize) {
        batchSize += 1
        break
      }
      const point = points[i]
      const { start, end, progress } = point
      var wayPoint = helpers.getWaypoint(start, end, 90)
      var controlPt = { x: wayPoint.x, y: wayPoint.y - curveFactor }
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      helpers.drawLine(ctx, end, controlPt, '#000')

      // draw the tracking rectangle
      const percentFactor = progress / 100
      const xy = helpers.getQuadraticBezierXY(start, controlPt, end, percentFactor)
      point.progress++

      if (progress < 101) {
        helpers.drawPlane(ctx, xy, 2)
      } else {
        point.progress = 0
      }
    }
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

    points = helpers.generatePoints(airportMap, flightRoutes, pro)
    animate()
  }

  d3.queue()
    .defer(d3.json, 'https://nodeassets.nbcnews.com/cdnassets/projects/2017/08/airplane-mode/us-states.json')
    .defer(d3.json, 'https://nodeassets.nbcnews.com/cdnassets/projects/2017/08/airplane-mode/us-airports-major.topo.json')
    .await(ready)
}
