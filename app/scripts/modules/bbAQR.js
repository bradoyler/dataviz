/* global bb */

const data = [
  ['Alaska', -0.39],
  ['American', -1.35],
  ['Delta', -0.4],
  ['ExpressJet', -1.36],
  ['Frontier', -2.24],
  ['Hawaiian', -0.69],
  ['JetBlue', -0.6],
  ['SkyWest', -0.97],
  ['Southwest', -0.88],
  ['Spirit', -2.01],
  ['United', -1.05],
  ['VirginAmerica', -0.5]
]

const sorted = data.sort((a, b) => b[1] - a[1])
const columnData = sorted.map(item => item[1] + 5)
columnData.unshift('Major US Airlines') // add the column header
const labels = sorted.map(item => item[0]) // create array of labels

bb.generate({
  data: {
    columns: [columnData],
    type: 'bar'
  },
  axis: {
    y: {
      tick: {
        format: (d) => (d).toFixed(1)
      },
      label: 'Score'
    },
    x: {
      type: 'category',
      categories: labels,
      show: true
    },
    rotated: true
  },
  tooltip: {
    show: true
  },
  bindto: '#bbchart4'
})
