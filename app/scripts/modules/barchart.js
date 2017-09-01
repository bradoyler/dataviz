/* global d3 */

const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 60
}

function type (d) {
  d.flights = +d.flights
  return d
}

export default function (selector, dataUrl) {
  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  const svg = d3.select(selector)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

  const x = d3.scaleLinear().range([0, width])

  const y = d3.scaleBand().range([height, 0])

  const xAxis = d3.axisBottom(x).ticks(6).tickFormat(d => {
    if (d >= 1000 && d < 1000000) {
      d = d / 1000 + 'K'
    }
    if (d >= 1000000) {
      d = d / 1000000 + 'M'
    }
    return d
  }).tickSizeInner([height])
  const yAxis = d3.axisLeft(y)

  d3.csv(dataUrl, type, function (error, data) {
    if (error) throw error

    data.sort((a, b) => a.flights - b.flights)
    const minVal = d3.min(data, d => d.flights)
    const min = minVal - minVal * 0.1
    const max = d3.max(data, d => d.flights)
    x.domain([min, max])
    y.domain(data.map(d => d.carrier)).paddingInner(0.2)

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + -2 + ')')
        .call(xAxis)

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)

    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('height', y.bandwidth())
        .attr('y', d => y(d.carrier))
        .attr('width', d => x(d.flights))
  })
}
