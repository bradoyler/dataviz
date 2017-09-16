
// draw tracking dot at xy
function drawDot (ctx, point, color, size) {
  ctx.fillStyle = color
  ctx.strokeStyle = color
  // ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(point.x, point.y, size, 0, Math.PI * 2, false)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

function drawLine (ctx, end, controlPt, color) {
  ctx.quadraticCurveTo(controlPt.x, controlPt.y, end.x, end.y) // curved lines
  // ctx.lineTo(end.x, end.y) // straight lines
  ctx.strokeStyle = '#000'
  ctx.stroke()
}

function generatePoints (airportMap, routes, projection) {
  const points = []
  routes.forEach((route, idx) => {
    const origin = airportMap[route[0]]
    const dest = airportMap[route[1]]
    if (origin && dest && origin.length && dest.length) {
      const startXY = projection(origin) || [0, 0]
      const endXY = projection(dest) || [0, 0]
      const start = { x: startXY[0], y: startXY[1] }
      const end = { x: endXY[0], y: endXY[1] }
      points.push({ idx, start, end, progress: 0 })
    }
  })
  return points
}

function getWaypoint (startPoint, endPoint, percent) {
  const factor = percent / 100
  const x = startPoint.x + (endPoint.x - startPoint.x) * factor
  const y = startPoint.y + (endPoint.y - startPoint.y) * factor
  return { x, y }
}

// quadratic bezier: percent is 0-1
function getQuadraticBezierXY (startPt, controlPt, endPt, percent) {
  const x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x
  const y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y
  return { x, y }
}

export default {
  drawDot,
  drawLine,
  getQuadraticBezierXY,
  getWaypoint,
  generatePoints
}
