/* global d3 */
const svg = d3.select('#linechart svg')
const margin = {top: 20, right: 60, bottom: 30, left: 50}
const width = svg.node().clientWidth - margin.left - margin.right
const outerHeight = width * 0.67
svg.attr('height', outerHeight)
const height = outerHeight - margin.top - margin.bottom

const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const x = d3.scaleTime().rangeRound([0, width])
const y = d3.scaleLinear().rangeRound([height, 0])
const z = d3.scaleOrdinal(d3.schemeCategory20)

const line = d3.line()
    .curve(d3.curveNatural)
    .x(d => x(d.date))
    .y(d => y(d.ppf))

d3.csv('data/fpp.csv', type, ready)

function type (d, _, columns) {
  d.date = d3.timeParse('%Y')(d.date)
  for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c]
  return d
}

function ready (error, data) {
  if (error) throw error
  // 2,6 = top 4, 1,2 = single
  const carriers = data.columns.slice(2, 6).map(function (id) {
    return {
      id: id,
      values: data.map(function (d) {
        return {date: d.date, ppf: d[id]}
      })
    }
  })

  x.domain(d3.extent(data, d => d.date))

  y.domain([
    d3.min(carriers, c => d3.min(c.values, d => d.ppf)),
    d3.max(carriers, c => d3.max(c.values, d => d.ppf))
  ])

  z.domain(carriers.map(c => c.id))

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('fill', '#000')
    .text('Passengers Per Flight')

  const carrier = g.selectAll('.carrier')
    .data(carriers)
    .enter().append('g')
      .attr('class', 'carrier')

  carrier.append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', d => z(d.id))

  carrier.append('text')
      .datum(d => { return {id: d.id, value: d.values[d.values.length - 1]} })
      .attr('transform', d => 'translate(' + x(d.value.date) + ',' + y(d.value.ppf) + ')')
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '10px sans-serif')
      .text(d => d.id)
}

// $(window).resize(render)
