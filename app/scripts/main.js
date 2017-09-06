import linechart from './modules/timeSeriesLineChart'
import './modules/flightanimation'
import './modules/map'
import './modules/bbNetIncome'
import './modules/bbLoadFactor'
import './modules/bbAQR'
import './modules/bbPieChart'
import './modules/carriers'

linechart('#linechart0 svg', 'data/loadfactor.csv', 'Load Factor')
