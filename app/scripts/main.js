// import barchart from './modules/barchart'
import linechart from './modules/timeSeriesLineChart'
import './modules/flightanimation'
import './modules/map'
import './modules/billboardcharts'
import './modules/aqr'
import './modules/carriers'

// barchart('#barchart svg', 'data/carriers.csv')
// // linechart('#linechart svg', 'data/fpp.csv', 'Passengers Per Flight')
linechart('#linechart0 svg', 'data/loadfactor.csv', 'Load Factor')
