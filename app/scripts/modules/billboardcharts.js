/* global bb */

const timeSeriesFromCSV = {
  padding: {
    left: 30,
    right: 10,
    bottom: 20
  },
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
  regions: [
    {
      axis: 'y',
      start: 0,
      end: -350000000,
      class: 'fill_red'
    }
  ],
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

bb.generate({
  data: {
    columns: [
      ['Southwest', 151740277],
      ['United', 99769952],
      ['American', 144189749],
      ['Delta', 142286020],
      ['JetBlue', 38241080],
      ['Alaska', 24370439],
      ['SkyWest', 31204880],
      ['Other', 299051986]
    ],
    type: 'pie'
  },
  pie: {
    label: {
      format: function (value, ratio, id) {
        return id
      }
    }
  },
  bindto: '#bbchart3'
})

bb.generate(timeSeriesFromCSV)
bb.generate(netIncome)
