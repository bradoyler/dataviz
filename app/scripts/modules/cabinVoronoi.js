/* global d3 */

const rowSeats = [
  { id: 1, label: 'Seat $A', x: 0, y: 0.14 },
  { id: 2, label: 'Seat $B', x: 0, y: 0.26 },
  { id: 3, label: 'Seat $C', x: 0, y: 0.38 },
  { id: 4, label: 'Seat $D', x: 0, y: 0.60 },
  { id: 5, label: 'Seat $E', x: 0, y: 0.72 },
  { id: 6, label: 'Seat $F', x: 0, y: 0.84 }
]

let seatCount = 0
// change to 27 rows
const arrays = d3.range(24).map((d, i) => {
  const rowNum = i + 1
  return rowSeats.map((seat) => {
    const xdiff = 0.04 * rowNum
    seatCount += 1
    const x = (seat.x + xdiff)
    const { y } = seat
    console.log(seatCount, x, y, 'x, y')
    return { id: seatCount, label: seat.label.replace('$', rowNum), x, y }
  })
})

const data = [].concat.apply([], arrays) // merge rows

// outer svg dimensions
const width = 800
const height = 110

// padding around the chart where axes will go
const padding = {
  top: 5,
  right: 20,
  bottom: 5,
  left: 20
}

// inner chart dimensions, where the dots are plotted
const plotAreaWidth = width - padding.left - padding.right
const plotAreaHeight = height - padding.top - padding.bottom

// radius of points in the scatterplot
const pointRadius = 3

// initialize scales
const xScale = d3.scaleLinear().domain([0, 1]).range([0, plotAreaWidth])
const yScale = d3.scaleLinear().domain([0, 1]).range([plotAreaHeight, 0])
const colorScale = d3.scaleLinear().domain([0, 1]).range(['#06a', '#0bb'])

// select the root container where the chart will be added
const container = d3.select('#vis-container')

// initialize main SVG
const svg = container.append('svg')
  .attr('width', width)
  .attr('height', height)

// the main <g> where all the chart content goes inside
const g = svg.append('g')
  .attr('transform', `translate(${padding.left} ${padding.top})`)

// add in circles
const circles = g.append('g').attr('class', 'circles')
const binding = circles.selectAll('.data-point').data(data, d => d.id)
binding.enter().append('circle')
  .classed('data-point', true)
  .attr('r', pointRadius)
  .attr('cx', d => xScale(d.x))
  .attr('cy', d => yScale(d.y))
  .attr('fill', d => colorScale(d.y))

// --- interaction ---
// initialize text output for highlighted points
const highlightOutput = container.append('div')
  .attr('class', 'highlight-output')
  .style('padding-left', `${padding.left}px`)
  .style('min-height', '100px')

// create voronoi based on the data and scales
const voronoiDiagram = d3.voronoi()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))
  .size([plotAreaWidth, plotAreaHeight])(data)

// limit how far away the mouse can be from finding a voronoi site
const voronoiRadius = plotAreaWidth / 10

// add a circle for indicating the highlighted point
g.append('circle')
  .attr('class', 'highlight-circle')
  .attr('r', pointRadius + 2) // slightly larger than our points
  .style('fill', 'none')
  .style('display', 'none')

// callback to highlight a point
function highlight (d) {
  // no point to highlight - hide the circle and clear the text
  if (!d) {
    d3.select('.highlight-circle').style('display', 'none')
    highlightOutput.text('')

  // otherwise, show the highlight circle at the correct position
  } else {
    d3.select('.highlight-circle')
      .style('display', '')
      .style('stroke', colorScale(d.y))
      .attr('cx', xScale(d.x))
      .attr('cy', yScale(d.y))

    // format the highlighted data point for inspection
    highlightOutput.html(`${d.label}, ${d.x} - ${d.y} `)
  }
}

// callback for when the mouse moves across the overlay
function mouseMoveHandler () {
  // get the current mouse position
  const [mx, my] = d3.mouse(this)

  // use the new diagram.find() function to find the voronoi site closest to
  // the mouse, limited by max distance defined by voronoiRadius
  const site = voronoiDiagram.find(mx, my, voronoiRadius)

  // highlight the point if we found one, otherwise hide the highlight circle
  highlight(site && site.data)
}

// add the overlay on top of everything to take the mouse events
g.append('rect')
  .attr('class', 'overlay')
  .attr('width', plotAreaWidth)
  .attr('height', plotAreaHeight)
  .style('fill', 'red')
  .style('opacity', 0)
  .on('mousemove', mouseMoveHandler)
  .on('mouseleave', () => {
    // hide the highlight circle when the mouse leaves the chart
    highlight(null)
  })

function toggleVoronoiDebug () {
  // remove if there
  if (!g.select('.voronoi-polygons').empty()) {
    g.select('.voronoi-polygons').remove()
    g.select('.voronoi-radius-circle').remove()
    g.select('.overlay').on('mousemove.voronoi', null).on('mouseleave.voronoi', null)
  // otherwise, add the polygons in
  } else {
    // draw the polygons
    const voronoiPolygons = g.append('g')
      .attr('class', 'voronoi-polygons')
      .style('pointer-events', 'none')

    const binding = voronoiPolygons.selectAll('path').data(voronoiDiagram.polygons())
    binding.enter().append('path')
      .style('stroke', 'tomato')
      .style('fill', 'none')
      .style('opacity', 0.15)
      .attr('d', d => {
        if (d) {
          return `M${d.join('L')}Z`
        }
      })
  }
}

toggleVoronoiDebug()
