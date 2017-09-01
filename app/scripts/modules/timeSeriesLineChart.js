/* global d3 */

function type (d, _, columns) {
  d.date = d3.timeParse('%Y')(d.date)
  for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c]
  return d
}

export default function (selector, dataUrl, yText) {
  const svg = d3.select(selector)
  const margin = {top: 20, right: 60, bottom: 30, left: 50}
  const width = svg.node().clientWidth - margin.left - margin.right
  const outerHeight = width * 0.67
  svg.attr('height', outerHeight)
  const height = outerHeight - margin.top - margin.bottom

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
  const x = d3.scaleTime().rangeRound([0, width])
  const y = d3.scaleLinear().rangeRound([height, 0])
  const z = d3.scaleOrdinal(d3.schemeCategory20)

  const line = d3.line()
      .curve(d3.curveNatural)
      .x(d => x(d.date))
      .y(d => y(d.colValue))

  d3.csv(dataUrl, type, ready)

  function ready (error, data) {
    if (error) throw error
    // 2,6 = top 4, 1,2 = single
    const rows = data.columns.slice(1).map(id => {
      return {
        id: id,
        values: data.map(d => {
          return {date: d.date, colValue: d[id]}
        })
      }
    })

    x.domain(d3.extent(data, d => d.date))

    y.domain([
      d3.min(rows, c => d3.min(c.values, d => d.colValue)),
      d3.max(rows, c => d3.max(c.values, d => d.colValue))
    ])

    z.domain(rows.map(c => c.id))

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .text(yText)

    const row = g.selectAll('.row')
      .data(rows)
      .enter().append('g')
      .attr('class', 'row')

    row.append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', d => z(d.id))

    row.append('text')
      .datum(d => { return {id: d.id, value: d.values[d.values.length - 1]} })
      .attr('transform', d => `translate(${x(d.value.date)},${y(d.value.colValue)})`)
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '12px sans-serif')
      .text(d => d.id)
  }
}
