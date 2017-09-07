/* global d3 */

export default function ({ selector, space = 0.04, rowCount = 24 }) {
  // outer svg dimensions
  const width = 110
  const height = 300

  // padding around the chart where axes will go
  const padding = { top: 5, right: 20, bottom: 5, left: 20 }

  // inner chart dimensions, where the dots are plotted
  const plotAreaWidth = width - padding.left - padding.right
  const plotAreaHeight = height - padding.top - padding.bottom

  // radius of points in the scatterplot
  const pointRadius = 3

  // initialize scales
  const xScale = d3.scaleLinear().domain([0, 1]).range([0, plotAreaWidth])
  const yScale = d3.scaleLinear().domain([0, 1]).range([plotAreaHeight, 0])
  const colorScale = d3.scaleLinear().domain([0, 1]).range(['#06a', '#0bb'])

  // select the container and create svg
  const container = d3.select(selector)
  const svg = container.append('svg').attr('width', width).attr('height', height)

  // the main <g> where all the chart content goes inside
  const g = svg.append('g').attr('transform', `translate(${padding.left} ${padding.top})`)

  // const seatShape = svg.append('path')
  //               .attr('class', 'seat')
  //               .attr('d', 'M45.53125,1.12696311e-14 L130,3.24237165e-14 L130,3.55271368e-14 C154.852814,5.30352672e-14 175,20.1471863 175,45 L175,84 L175,84 C175,108.852814 154.852814,129 130,129 L45.53125,129 L45.53125,129 C20.6784363,129 0.53125,108.852814 0.53125,84 L0.53125,45 L0.53125,45 C0.53125,20.1471863 20.6784363,-2.54006885e-15 45.53125,-7.10542736e-15 Z')

  // ----- end inits -----

  function buildData ({ space, rowCount }) {
     // { space = 0.038, rowCount = 27 }
    const seats = [
      { id: 0, label: 'Seat $A', y: -0.01, x: 0.14 },
      { id: 0, label: 'Seat $B', y: -0.01, x: 0.26 },
      { id: 0, label: 'Seat $C', y: -0.01, x: 0.38 },
      { id: 0, label: 'Seat $D', y: -0.01, x: 0.62 },
      { id: 0, label: 'Seat $E', y: -0.01, x: 0.74 },
      { id: 0, label: 'Seat $F', y: -0.01, x: 0.86 }
    ]

    let seatCount = 0
    // change to 27 rows
    const allRows = d3.range(rowCount).map((d, i) => {
      const rowNum = i + 1
      return seats.map((seat) => {
        const ydiff = space * rowNum
        seatCount += 1
        const y = (seat.y + ydiff)
        const { x } = seat
        return { id: seatCount, label: seat.label.replace('$', rowNum), x, y }
      })
    })

    return [].concat.apply([], allRows) // merge rows
  }

  function buildNodes (data) {
    // add in circles
    const circles = g.append('g').attr('class', 'circles')
    const binding = circles.selectAll('.data-point').data(data, d => d.id)
    binding.enter().append('circle')
      .classed('data-point', true)
      .attr('r', pointRadius)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('fill', d => colorScale(d.y))
  }

  const data = buildData({ space, rowCount })
  buildNodes(data)

// --- voronoi stuff --------
  // function buildVoronoiDiagram (data) {
  //   // create voronoi based on the data and scales
  //   return d3.voronoi()
  //     .x(d => xScale(d.x))
  //     .y(d => yScale(d.y))
  //     .size([plotAreaWidth, plotAreaHeight])(data)
  // }

  // let voronoiDiagram = buildVoronoiDiagram(data)

  // function toggleVoronoi () {
  //   // remove if there
  //   if (!g.select('.voronoi-polygons').empty()) {
  //     g.select('.voronoi-polygons').remove()
  //     g.select('.voronoi-radius-circle').remove()
  //     g.select('.overlay').on('mousemove.voronoi', null).on('mouseleave.voronoi', null)
  //   // otherwise, add the polygons in
  //   } else {
  //     const voronoiPolygons = g.append('g')
  //       .attr('class', 'voronoi-polygons')
  //       .style('pointer-events', 'none')
  //
  //     const binding = voronoiPolygons.selectAll('path').data(voronoiDiagram.polygons())
  //     binding.enter().append('path')
  //       .style('stroke', 'tomato')
  //       .style('fill', 'none')
  //       .style('opacity', 0.15)
  //       .attr('d', d => {
  //         if (d) {
  //           return `M${d.join('L')}Z`
  //         }
  //       })
  //   }
  // }

  // toggleVoronoi()
}
