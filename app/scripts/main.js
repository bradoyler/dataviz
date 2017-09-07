import linechart from './modules/timeSeriesLineChart'
import './modules/flightanimation'
import './modules/map'
import './modules/bbNetIncome'
import './modules/bbLoadFactor'
import './modules/bbAQR'
import './modules/bbPieChart'
import './modules/carriers'
import cabin from './modules/cabinVoronoi'

cabin({ selector: '#cabin1', space: 0.0405, rowCount: 24 })
cabin({ selector: '#cabin2', space: 0.036, rowCount: 27 })

linechart('#linechart0 svg', 'data/loadfactor.csv', 'Load Factor')
