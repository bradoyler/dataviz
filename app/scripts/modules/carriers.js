/* global bb */
/*
United,704426,99769952
Southwest,1311139,151740277
Delta,1059757,142286020
JetBlue,337950,38241080
American,1098210,144189749
*/

function largeNumberFormat (dd) {
  const sign = Math.sign(dd)
  let d = Math.abs(dd)
  if (d >= 1000 && d < 1000000) {
    d = Math.round(d / 1000) + 'K'
  }
  if (d >= 1000000) {
    d = Math.round(d / 1000000) + 'M'
  }
  if (sign === -1) {
    return `-${d}`
  }
  return d
}

const dalayData = [
  ['2002', 120038204],
  ['2003', 126155452],
  ['2004', 167252422],
  ['2005', 180992079],
  ['2006', 198793390],
  ['2007', 222245772],
  ['2008', 194357254],
  ['2009', 157402401],
  ['2010', 159070567],
  ['2011', 163635498],
  ['2012', 147175329],
  ['2013', 179026591],
  ['2014', 202684018],
  ['2015', 180219334],
  ['2016', 172208061]
]

const columnDataD = dalayData.map(item => item[1])
const labelsD = dalayData.map(item => item[0])
columnDataD.unshift('Passengers delayed')

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

bb.generate({
  data: {
    columns: [columnDataD],
    type: 'bar',
    labels: {
      format: function (d) { return largeNumberFormat(d) }
    }
  },
  axis: {
    y: {
      // tick: {
      //   format: (d) => largeNumberFormat(d)
      // },
      show: false,
      label: 'delayed'
    },
    x: {
      type: 'category',
      categories: labelsD,
      show: true
    },
    rotated: false
  },
  tooltip: {
    show: true
  },
  bindto: '#bbchart-delays'
})
