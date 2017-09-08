/* global d3 */
import bar from 'britecharts/dist/umd/bar.min'

let barChart = bar()
const barContainer = d3.select('#js-bar-chart1')
const containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false
const dataset = [
  { name: '2002', value: 120038204 },
  { name: '2003', value: 126155452 },
  { name: '2004', value: 167252422 },
  { name: '2005', value: 180992079 },
  { name: '2006', value: 198793390 },
  { name: '2007', value: 222245772 },
  { name: '2008', value: 194357254 },
  { name: '2009', value: 157402401 },
  { name: '2010', value: 159070567 },
  { name: '2011', value: 163635498 },
  { name: '2012', value: 147175329 },
  { name: '2013', value: 179026591 },
  { name: '2014', value: 202684018 },
  { name: '2015', value: 180219334 },
  { name: '2016', value: 172208061 }
]

barChart.width(containerWidth)
.height(300)
.hasPercentage(false)
.isAnimated(true)
.margin({
  left: 90,
  right: 20,
  top: 20,
  bottom: 30
})
// .colorSchema(colors.colorSchemas.britecharts)

barContainer.datum(dataset).call(barChart)
