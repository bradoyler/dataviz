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

bb.generate(timeSeriesFromCSV)
