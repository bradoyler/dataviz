/* global bb */
/*
United,704426,99769952
Southwest,1311139,151740277
Delta,1059757,142286020
JetBlue,337950,38241080
American,1098210,144189749
*/

const data = [
  ['United', 704426],
  ['Southwest', 1311139],
  ['Delta', 1059757],
  ['JetBlue', 337950],
  ['American', 1098210]
]

const sorted = data.sort((a, b) => b[1] - a[1])
const columnData = sorted.map(item => item[1])
columnData.unshift('Flights') 

const labels = sorted.map(item => item[0]) // create array of labels

bb.generate({
  data: {
    columns: [columnData],
    type: 'bar'
  },
  axis: {
    y: {
      tick: {
        format: (d) => Math.round(d)
      },
      label: 'Flights'
    },
    x: {
      type: 'category',
      categories: labels,
      show: true
    },
    rotated: false
  },
  tooltip: {
    show: true
  },
  bindto: '#bbchart5'
})
 