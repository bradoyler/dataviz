import barchart from './modules/barchart'
import './modules/flightanimation'
import './modules/map'
import './modules/billboardcharts'
import linechart from './modules/timeSeriesLineChart'

barchart('#barchart svg', 'data/carriers.csv')
linechart('#linechart svg', 'data/fpp.csv', 'Passengers Per Flight')
linechart('#linechart0 svg', 'data/loadfactor.csv', 'Load Factor')
