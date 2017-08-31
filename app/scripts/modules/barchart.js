/* global d3 */

var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 60
}

var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

var svg = d3.select('#barchart svg')
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var x = d3.scaleLinear().range([0, width])

var y = d3.scaleBand().range([height, 0])

var xAxis = d3.axisBottom(x).ticks(6).tickFormat(d => {
  if (d >= 1000 && d < 1000000) {
    d = d / 1000 + 'K'
  }
  if (d >= 1000000) {
    d = d / 1000000 + 'M'
  }
  return d
}).tickSizeInner([height])
var yAxis = d3.axisLeft(y)

d3.csv('data/carriers.csv', type, function (error, data) {
  if (error) throw error

  data.sort((a, b) => a.flights - b.flights)
  var minVal = d3.min(data, d => d.flights)
  var min = minVal - minVal * 0.1
  var max = d3.max(data, d => d.flights)
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

function type (d) {
  d.flights = +d.flights
  return d
}
