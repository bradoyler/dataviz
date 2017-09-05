/* global bb */

const timeSeriesFromCSV = {
  data: {
    type: 'spline',
    x: 'date',
    url: './data/loadfactor.csv'
  },
  transition: {
    duration: 900
  },
  point: {
    show: false
  },
  axis: {
    date: {
      type: 'timeseries',
      tick: { format: '%Y' }
    }
  },
  bindto: '#bbchart1'
}

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

const netIncome = {
  bindto: '#bbchart2',
  padding: {
    left: 40,
    right: 9,
    bottom: 18
  },
  data: {
    x: 'date',
    url: './data/netIncomeTotal.csv',
    type: 'bar',
    labels: {
      format: function (d) { return '$' + largeNumberFormat(d) }
    }
  },
  axis: {
    y: {
      tick: {
        format: function (d) { return '$' + largeNumberFormat(d) }
      },
      label: '$USD'
    },
    rotated: false
  },
  legend: {
    show: false
  }
}

bb.generate(timeSeriesFromCSV)
bb.generate(netIncome)
