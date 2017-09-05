/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _barchart = __webpack_require__(8);

var _barchart2 = _interopRequireDefault(_barchart);

__webpack_require__(9);

__webpack_require__(11);

__webpack_require__(12);

var _timeSeriesLineChart = __webpack_require__(13);

var _timeSeriesLineChart2 = _interopRequireDefault(_timeSeriesLineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _barchart2.default)('#barchart svg', 'data/carriers.csv');
// linechart('#linechart svg', 'data/fpp.csv', 'Passengers Per Flight')
(0, _timeSeriesLineChart2.default)('#linechart0 svg', 'data/loadfactor.csv', 'Load Factor');

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector, dataUrl) {
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var svg = d3.select(selector).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var x = d3.scaleLinear().range([0, width]);

  var y = d3.scaleBand().range([height, 0]);

  var xAxis = d3.axisBottom(x).ticks(6).tickFormat(function (d) {
    if (d >= 1000 && d < 1000000) {
      d = d / 1000 + 'K';
    }
    if (d >= 1000000) {
      d = d / 1000000 + 'M';
    }
    return d;
  }).tickSizeInner([height]);
  var yAxis = d3.axisLeft(y);

  d3.csv(dataUrl, type, function (error, data) {
    if (error) throw error;

    data.sort(function (a, b) {
      return a.flights - b.flights;
    });
    var minVal = d3.min(data, function (d) {
      return d.flights;
    });
    var min = minVal - minVal * 0.1;
    var max = d3.max(data, function (d) {
      return d.flights;
    });
    x.domain([min, max]);
    y.domain(data.map(function (d) {
      return d.carrier;
    })).paddingInner(0.2);

    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + -2 + ')').call(xAxis);

    svg.append('g').attr('class', 'y axis').call(yAxis);

    svg.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar').attr('x', 0).attr('height', y.bandwidth()).attr('y', function (d) {
      return y(d.carrier);
    }).attr('width', function (d) {
      return x(d.flights);
    });
  });
};

/* global d3 */

var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 60
};

function type(d) {
  d.flights = +d.flights;
  return d;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _routes = __webpack_require__(10);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rAFscroll(fn) {
  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1000 / 60);
  };

  var lastPosition = -1;
  function loop() {
    // Avoid calculations if not needed
    if (lastPosition === window.pageYOffset) {
      rAF(loop);
      return false;
    } else lastPosition = window.pageYOffset;
    fn();
    rAF(loop);
  }
  loop();
} /* global d3, topojson, $ */


var $flightmap = $('#flightmap');
var currentWidth = $flightmap.width();
var width = 938;
var height = 620;

var pro = d3.geoAlbers().scale(900).translate([width / 2, height / 2]);

var path = d3.geoPath().pointRadius(1.2).projection(pro);

var svg = d3.select('#flightmap').append('svg').attr('preserveAspectRatio', 'xMidYMid').attr('viewBox', '0 0 ' + width + ' ' + height).attr('width', currentWidth).attr('height', currentWidth * height / width);

var airportMap = {};

function transition(plane, route) {
  var l = route.node().getTotalLength();
  plane.transition().duration(l * 20).attrTween('transform', delta(plane, route.node())).on('end', function () {
    route.remove();
  }).remove();
}

function delta(plane, path) {
  var l = path.getTotalLength();
  return function (i) {
    return function (t) {
      var p = path.getPointAtLength(t * l);
      var t2 = Math.min(t + 0.05, 1);
      var p2 = path.getPointAtLength(t2 * l);
      var x = p2.x - p.x;
      var y = p2.y - p.y;
      var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;
      var s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);
      return 'translate(' + p.x + ',' + p.y + ') scale(' + s + ') rotate(' + r + ')';
    };
  };
}

function fly(origin, destination) {
  if (!airportMap[origin] || !airportMap[destination]) return;

  var route = svg.append('path').datum({ type: 'LineString', coordinates: [airportMap[origin], airportMap[destination]] }).attr('class', 'route').attr('d', path);

  // const plane = svg.append('circle').attr('cx', 5).attr('cy', 5).attr('r', 5).style('fill', 'blue')
  var plane = svg.append('path').attr('class', 'plane').attr('d', 'm25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z');

  transition(plane, route);
}

function ready(error, topo, airports) {
  if (error) throw error;

  svg.append('g').attr('class', 'states').selectAll('path').data(topojson.feature(topo, topo.objects.states).features).enter().append('path').attr('d', path);

  svg.append('g').attr('class', 'airports').selectAll('path').data(topojson.feature(airports, airports.objects.airports).features).enter().append('path').attr('id', function (d) {
    return d.id;
  }).attr('d', path);

  var geos = topojson.feature(airports, airports.objects.airports).features;

  geos.forEach(function (geo) {
    airportMap[geo.id] = geo.geometry.coordinates;
  });

  var start = 0;
  function flyBatch() {
    var flightCnt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    if ($flightmap.offset().top + $flightmap.height() < $(window).scrollTop()) return;

    var end = start + flightCnt;
    var pairs = _routes2.default.slice(start, end);
    pairs.forEach(function (pair, idx) {
      fly(pair[0], pair[1]);
    });
    start = end;
    // reset the flight loop
    if (pairs.length === 0) {
      start = 0;
    }
  }

  flyBatch(200);
  rAFscroll(flyBatch);
}

d3.queue().defer(d3.json, 'data/us.json').defer(d3.json, 'data/us-airports-major.topo.json').await(ready);

$(window).resize(function () {
  currentWidth = $flightmap.width();
  svg.attr('width', currentWidth);
  svg.attr('height', currentWidth * height / width);
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [['LAS', 'MSY'], ['SPI', 'IAD'], ['MSP', 'IND'], ['CLT', 'DAB'], ['CLE', 'PVD'], ['CLE', 'DTW'], ['SYR', 'ATL'], ['MSY', 'DFW'], ['ORD', 'CAE'], ['IAH', 'LAS'], ['ATL', 'SAN'], ['MSP', 'FNT'], ['PIR', 'JAX'], ['BOS', 'MYR'], ['CVG', 'MDT'], ['SYR', 'MCO'], ['DFW', 'MSN'], ['DFW', 'IAH'], ['PNS', 'ATL'], ['VPS', 'CVG'], ['CVG', 'MCO'], ['CLT', 'CVG'], ['BWI', 'ABQ'], ['BFL', 'FAT'], ['MFR', 'RDM'], ['GSP', 'ORD'], ['IAH', 'PDX'], ['CLE', 'ROC'], ['IAH', 'TYS'], ['BOI', 'PHX'], ['ATL', 'PBI'], ['DSM', 'PHX'], ['DEN', 'SEA'], ['LAS', 'FNT'], ['IAD', 'DAY'], ['SAT', 'MCI'], ['KOA', 'LIH'], ['BUR', 'RNO'], ['MEM', 'MLI'], ['PHL', 'STT'], ['ORF', 'DTW'], ['IND', 'BOS'], ['ATL', 'MOB'], ['ATL', 'DTW'], ['CMH', 'CLT'], ['RNO', 'ONT'], ['MSY', 'MEM'], ['HPN', 'PBI'], ['LEX', 'COS'], ['BUR', 'PDX'], ['EWR', 'MTJ'], ['MSP', 'CVG'], ['LAX', 'MFR'], ['ACV', 'SFO'], ['FNT', 'DTW'], ['DEN', 'ABQ'], ['AEX', 'DFW'], ['MIA', 'SFO'], ['ATL', 'SBN'], ['LEX', 'CVG'], ['OTZ', 'ANC'], ['ORD', 'VPS'], ['PNS', 'MEM'], ['ASE', 'RFD'], ['IAD', 'AUS'], ['RNO', 'PHX'], ['CVG', 'ANC'], ['MSY', 'SAT'], ['DTW', 'AZO'], ['BIL', 'SLC'], ['ATL', 'PHF'], ['SAN', 'AUS'], ['FAT', 'SAN'], ['MEM', 'SDF'], ['ORD', 'MQT'], ['MIA', 'ORF'], ['SAT', 'CVG'], ['ATL', 'MYR'], ['PHL', 'PIT'], ['CVG', 'DCA'], ['LSE', 'MSP'], ['SJC', 'LAX'], ['SLC', 'JAC'], ['SEA', 'BOI'], ['ISP', 'MCO'], ['IAH', 'MCI'], ['SAN', 'HNL'], ['LGA', 'FLL'], ['TPA', 'CLE'], ['STL', 'ABQ'], ['AMA', 'ABQ'], ['LAX', 'MCI'], ['CMH', 'EWR'], ['ICT', 'MSP'], ['STT', 'CLT'], ['SAV', 'IAD'], ['SEA', 'BUR'], ['BDL', 'IND'], ['ANC', 'SEA'], ['ORD', 'PHL'], ['IAD', 'MDT'], ['DEN', 'CRW'], ['ORD', 'FSD'], ['SHV', 'DTW'], ['TPA', 'PHX'], ['RNO', 'SJC'], ['TYS', 'CVG'], ['IAD', 'MIA'], ['PHL', 'MSP'], ['PHX', 'GEG'], ['PHL', 'BUF'], ['BOI', 'SFO'], ['LAX', 'MTJ'], ['TLH', 'FLL'], ['PHL', 'LGA'], ['MCI', 'PIT'], ['AUS', 'BNA'], ['SFO', 'PIT'], ['DEN', 'ONT'], ['CLT', 'LIT'], ['JFK', 'ALB'], ['BOS', 'MDW'], ['BDL', 'ORD'], ['PWM', 'CLT'], ['ATL', 'LIT'], ['EWR', 'PDX'], ['CLE', 'CVG'], ['ATL', 'ICT'], ['SMF', 'ORD'], ['SDF', 'EWR'], ['DEN', 'IAH'], ['DFW', 'DTW'], ['SAN', 'STL'], ['DTW', 'MCI'], ['EWR', 'AVL'], ['TLH', 'CLT'], ['SCC', 'BRW'], ['SMF', 'BUR'], ['ATL', 'CAK'], ['LAX', 'EWR'], ['CMH', 'ICT'], ['ILM', 'CLT'], ['ITO', 'HNL'], ['CLT', 'BOS'], ['FLL', 'OAK'], ['ATL', 'JAC'], ['FLL', 'LAS'], ['ATL', 'SJC'], ['LGA', 'PHL'], ['SBP', 'SLC'], ['DEN', 'CYS'], ['BMI', 'MCO'], ['ORD', 'OAK'], ['BWI', 'LIT'], ['BOI', 'GEG'], ['DTW', 'RIC'], ['SNA', 'LAS'], ['SGF', 'DTW'], ['SAT', 'AMA'], ['DAB', 'CVG'], ['SEA', 'SIT'], ['MKE', 'EWR'], ['PIT', 'BWI'], ['ORD', 'FCA'], ['FLL', 'LAX'], ['STL', 'SFO'], ['BOS', 'IAD'], ['BQN', 'JFK'], ['DTW', 'CRW'], ['BQN', 'MCO'], ['SGF', 'STL'], ['EUG', 'LAX'], ['GEG', 'PHX'], ['DCA', 'XNA'], ['FNT', 'ORD'], ['HSV', 'MCO'], ['PHF', 'ATL'], ['CMH', 'GRR'], ['TPA', 'DCA'], ['SLC', 'CLT'], ['CVG', 'CLE'], ['PHX', 'LAS'], ['PHX', 'MKE'], ['SLC', 'ORD'], ['IAH', 'SAV'], ['DEN', 'MTJ'], ['GRK', 'IAH'], ['BOS', 'LAX'], ['IAH', 'SAN'], ['MKE', 'BDL'], ['LGA', 'XNA'], ['CVG', 'ROA'], ['MDW', 'SAT'], ['ROC', 'LAS'], ['BNA', 'DFW'], ['IAH', 'MAF'], ['HOU', 'TUL'], ['PHX', 'MRY'], ['RSW', 'DEN'], ['OKC', 'CVG'], ['DEN', 'RKS'], ['DEN', 'BFL'], ['MCI', 'LNK'], ['PHX', 'OAK'], ['LGB', 'PDX'], ['SEA', 'DEN'], ['MFE', 'DFW'], ['SLC', 'SJC'], ['PDX', 'SNA'], ['DAB', 'JAX'], ['LAX', 'SFO'], ['MFR', 'RDD'], ['MSP', 'GTF'], ['CVG', 'COS'], ['DEN', 'LIH'], ['CAE', 'MEM'], ['IAH', 'DEN'], ['ACK', 'EWR'], ['ATL', 'MEI'], ['DAY', 'DTW'], ['ORD', 'EWR'], ['DCA', 'BNA'], ['BIL', 'PIH'], ['CVG', 'PBI'], ['LGA', 'PIT'], ['LAN', 'MSP'], ['ICT', 'DEN'], ['ORD', 'CID'], ['IND', 'DFW'], ['LAX', 'FAT'], ['ICT', 'COS'], ['BHM', 'SDF'], ['RSW', 'ATL'], ['FLL', 'IAD'], ['CDC', 'LAX'], ['SAN', 'LAX'], ['BTR', 'DFW'], ['DCA', 'RDU'], ['SAN', 'BWI'], ['SLC', 'FLL'], ['RAP', 'TWF'], ['IAD', 'ABQ'], ['DCA', 'TPA'], ['DFW', 'BUR'], ['SNA', 'LAX'], ['PHX', 'OKC'], ['ELP', 'TUS'], ['SFO', 'TWF'], ['CWA', 'ORD'], ['XNA', 'SGF'], ['JAN', 'BWI'], ['CRW', 'ORD'], ['BDL', 'GRB'], ['BWI', 'MIA'], ['SJC', 'SAN'], ['IND', 'MDW'], ['IAD', 'BUF'], ['ACY', 'ATL'], ['LIH', 'HNL'], ['DFW', 'MEM'], ['DEN', 'DRO'], ['MSY', 'CMH'], ['IAH', 'BWI'], ['PBI', 'CMH'], ['BUF', 'JFK'], ['SLC', 'PSC'], ['MCO', 'JAX'], ['CLT', 'ORF'], ['RNO', 'IAH'], ['HNL', 'DEN'], ['TYS', 'MCO'], ['CLE', 'BHM'], ['SLC', 'OKC'], ['DSM', 'IAH'], ['SDF', 'SLC'], ['SYR', 'CVG'], ['ORF', 'MDW'], ['OKC', 'DFW'], ['FAI', 'SLC'], ['DEN', 'ROC'], ['CIC', 'FAT'], ['JFK', 'SRQ'], ['CLE', 'IAD'], ['JFK', 'OAK'], ['TPA', 'FNT'], ['XNA', 'LAX'], ['FSD', 'SLC'], ['GJT', 'LAX'], ['DEN', 'FAT'], ['DEN', 'ELP'], ['BWI', 'ALB'], ['RDU', 'DEN'], ['SEA', 'MCI'], ['CLT', 'MEM'], ['PSP', 'SFO'], ['SAT', 'MEM'], ['PHX', 'BUR'], ['BUR', 'PMD'], ['MSP', 'CLE'], ['BDL', 'LAS'], ['SLC', 'MSY'], ['ORD', 'ELP'], ['SJC', 'EWR'], ['ATL', 'OMA'], ['SYR', 'CLE'], ['MRY', 'SLC'], ['AVP', 'ORD'], ['RST', 'MSP'], ['PHL', 'ORF'], ['ROC', 'BWI'], ['MSO', 'SFO'], ['MSP', 'MDT'], ['HPN', 'TPA'], ['TUS', 'MDW'], ['EUG', 'PDX'], ['JFK', 'CMH'], ['HNL', 'ORD'], ['ORD', 'RDU'], ['ATL', 'CHS'], ['PSP', 'SEA'], ['CLT', 'SDF'], ['COS', 'MEM'], ['VLD', 'ATL'], ['BUF', 'PHL'], ['ATL', 'TOL'], ['DFW', 'EGE'], ['YUM', 'LAS'], ['OAK', 'MCI'], ['MCI', 'TUS'], ['PNS', 'DFW'], ['GEG', 'LGB'], ['SEA', 'JNU'], ['DAB', 'ATL'], ['SFO', 'BWI'], ['BOS', 'CVG'], ['SLC', 'CMH'], ['MIA', 'EWR'], ['ATL', 'PDX'], ['IAD', 'PHL'], ['JFK', 'AUS'], ['JFK', 'HDN'], ['MCO', 'IAD'], ['LGA', 'CMH'], ['BNA', 'STL'], ['BNA', 'MSY'], ['PBI', 'ATL'], ['MKE', 'SFO'], ['JFK', 'ORD'], ['IAD', 'DTW'], ['SLC', 'LAS'], ['SEA', 'PHL'], ['LGA', 'VPS'], ['DRO', 'ABQ'], ['MDT', 'DFW'], ['BOS', 'STT'], ['IND', 'PIT'], ['IAD', 'SAN'], ['ANC', 'ATL'], ['JAX', 'BHM'], ['BWI', 'HOU'], ['SAT', 'CLT'], ['GUC', 'DEN'], ['CAE', 'DFW'], ['FLL', 'AUS'], ['HOU', 'HRL'], ['STT', 'ATL'], ['EWR', 'CMH'], ['SBP', 'FAT'], ['MEM', 'CLE'], ['SWF', 'ATL'], ['MKE', 'TUS'], ['CLE', 'ABQ'], ['SAT', 'SLC'], ['CLE', 'SAV'], ['ISP', 'TPA'], ['MCO', 'LAS'], ['LAS', 'MKE'], ['PSP', 'DFW'], ['CVG', 'JFK'], ['IAD', 'SPI'], ['OAK', 'SNA'], ['DTW', 'ITH'], ['BHM', 'STL'], ['IAH', 'BNA'], ['BWI', 'BUF'], ['MCO', 'IND'], ['DCA', 'MHT'], ['EYW', 'ATL'], ['ORD', 'GEG'], ['MAF', 'DAL'], ['LAS', 'GEG'], ['IAD', 'BUR'], ['MDT', 'DTW'], ['BNA', 'MSP'], ['LEX', 'LGA'], ['CHS', 'EWR'], ['SLC', 'PSP'], ['ORD', 'MDT'], ['ONT', 'TUS'], ['PDX', 'ONT'], ['MYR', 'LGA'], ['PHX', 'OGG'], ['DTW', 'LAS'], ['ANC', 'JNU'], ['RDU', 'CVG'], ['ATL', 'VPS'], ['JFK', 'BGR'], ['MEM', 'BDL'], ['OTH', 'PDX'], ['PHX', 'MDW'], ['DEN', 'GRR'], ['MSP', 'LIT'], ['LIH', 'KOA'], ['BUR', 'PSP'], ['MCI', 'OMA'], ['CMH', 'MCI'], ['OAK', 'TUS'], ['MEM', 'CLT'], ['BHM', 'EWR'], ['TPA', 'CLT'], ['OMA', 'CVG'], ['TUS', 'ABQ'], ['JFK', 'CLE'], ['PHL', 'SEA'], ['PHX', 'LAX'], ['BIS', 'DEN'], ['PHX', 'ABQ'], ['BDL', 'PHL'], ['SLC', 'FCA'], ['BUF', 'RSW'], ['MHT', 'IAD'], ['DEN', 'MSO'], ['STL', 'OMA'], ['MSP', 'MCI'], ['SMF', 'LAX'], ['BZN', 'MSP'], ['SFO', 'EUG'], ['ABQ', 'CLE'], ['OME', 'ANC'], ['SFO', 'MDW'], ['AVL', 'CVG'], ['COS', 'MKE'], ['MFR', 'PHX'], ['MCO', 'PBI'], ['IAH', 'BDL'], ['MKE', 'GRR'], ['MCI', 'ABQ'], ['DFW', 'GRR'], ['MKE', 'BNA'], ['HDN', 'ORD'], ['DCA', 'LAX'], ['KOA', 'SAN'], ['SBN', 'ORD'], ['PBI', 'LGA'], ['DFW', 'CHA'], ['FLL', 'LGB'], ['SBP', 'LAS'], ['GSO', 'MSP'], ['SNA', 'PDX'], ['ORF', 'CLT'], ['SLC', 'ATL'], ['MCO', 'CLT'], ['DSM', 'DEN'], ['JAX', 'IAH'], ['BOI', 'DEN'], ['DTW', 'EWR'], ['ALB', 'ATL'], ['ABQ', 'LAX'], ['MKE', 'GRB'], ['EVV', 'DTW'], ['BTR', 'CVG'], ['EGE', 'MIA'], ['TYS', 'IAD'], ['MKE', 'STL'], ['MSY', 'LAX'], ['ROC', 'ATL'], ['IAH', 'CRW'], ['AGS', 'LGA'], ['DCA', 'MSN'], ['MKE', 'PIT'], ['TPA', 'SDF'], ['SJU', 'FLL'], ['DFW', 'SJC'], ['LFT', 'IAH'], ['MLI', 'LAS'], ['MKE', 'PHL'], ['IND', 'XNA'], ['TPA', 'CMH'], ['LGA', 'GSP'], ['BNA', 'MEM'], ['IAH', 'OKC'], ['RDU', 'MIA'], ['OKC', 'PHX'], ['MSY', 'MCO'], ['ANC', 'DLG'], ['DEN', 'RSW'], ['CLT', 'PDX'], ['IND', 'MKE'], ['TPA', 'BUF'], ['DFW', 'GRK'], ['CLT', 'IAH'], ['PHX', 'TPA'], ['DTW', 'PIT'], ['LGA', 'PBI'], ['SAN', 'BOS'], ['OKC', 'BWI'], ['CMH', 'BOS'], ['ANC', 'FAI'], ['SLC', 'STL'], ['SLC', 'COD'], ['PHX', 'MCI'], ['PIT', 'GRB'], ['BWI', 'SAV'], ['PHL', 'DEN'], ['GSO', 'LGA'], ['BWI', 'CLE'], ['SBA', 'PHX'], ['ORD', 'CMI'], ['SLC', 'SBA'], ['SLC', 'YUM'], ['DTW', 'SCE'], ['SEA', 'MCO'], ['MSY', 'DEN'], ['IAH', 'MGM'], ['FAR', 'MSP'], ['SBA', 'SJC'], ['ABQ', 'PDX'], ['SYR', 'PHL'], ['ATL', 'BZN'], ['MCO', 'MHT'], ['SFO', 'CLE'], ['PSG', 'JNU'], ['PIT', 'DEN'], ['PBI', 'CLE'], ['LEX', 'DFW'], ['HSV', 'MEM'], ['EGE', 'JFK'], ['TYS', 'ORD'], ['ATL', 'AUS'], ['STL', 'PHL'], ['BWI', 'GRR'], ['CLE', 'BDL'], ['ORD', 'GPT'], ['TUL', 'MCI'], ['ABQ', 'DEN'], ['DFW', 'MSP'], ['AZO', 'XNA'], ['PBI', 'JFK'], ['DFW', 'BUF'], ['PDX', 'MCI']];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global d3, topojson */
var svg = d3.select('#us-map svg');
var width = +svg.attr('width');
var height = +svg.attr('height');

var projection = d3.geoAlbers().translate([width / 2, height / 2]).scale(960);

// const radius = d3.scaleSqrt()
//     .domain([0, 100])
//     .range([0, 14])

var path = d3.geoPath().projection(projection).pointRadius(2.5);

var voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);

d3.queue().defer(d3.json, 'data/us.json').defer(d3.csv, 'data/airports.csv', typeAirport).defer(d3.csv, 'data/flights.csv', typeFlight).await(ready);

function ready(error, us, airports, flights) {
    // console.log(error, us);
    if (error) throw error;

    var airportByIata = d3.map(airports, function (d) {
        return d.iata;
    });
    // console.log(airportByIata, '>>>');

    flights.forEach(function (flight) {
        var source = airportByIata.get(flight.origin);
        var target = airportByIata.get(flight.destination);
        source.arcs.coordinates.push([source, target]);
        target.arcs.coordinates.push([target, source]);
    });

    airports = airports.filter(function (d) {
        return d.arcs.coordinates.length;
    });

    svg.append('path').datum(topojson.feature(us, us.objects.land)).attr('class', 'land').attr('d', path);

    svg.append('path').datum(topojson.mesh(us, us.objects.states, function (a, b) {
        return a !== b;
    })).attr('class', 'state-borders').attr('d', path);

    svg.append('path').datum({ type: 'MultiPoint', coordinates: airports }).attr('class', 'airport-dots').attr('d', path);

    var airport = svg.selectAll('.airport').data(airports).enter().append('g').attr('class', 'airport');

    airport.append('title').text(function (d) {
        // console.log(d.arcs, 'arcs')
        return d.iata + '\n' + d.arcs.coordinates.length + ' flights';
    });

    airport.append('path').attr('class', 'airport-arc').attr('d', function (d) {
        return path(d.arcs);
    });

    airport.append('path').data(voronoi.polygons(airports.map(projection))).attr('class', 'airport-cell').attr('d', function (d) {
        return d ? 'M' + d.join('L') + 'Z' : null;
    });
}

function typeAirport(d) {
    d[0] = +d.longitude;
    d[1] = +d.latitude;
    d.arcs = { type: 'MultiLineString', coordinates: [] };
    return d;
}

function typeFlight(d) {
    d.count = +d.count;
    return d;
}

// https://bl.ocks.org/mbostock/7608400/e5974d9bba45bc9ab272d98dd7427567aafd55bc

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global bb */

var timeSeriesFromCSV = {
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
};

function largeNumberFormat(dd) {
  var sign = Math.sign(dd);
  var d = Math.abs(dd);
  if (d >= 1000 && d < 1000000) {
    d = Math.round(d / 1000) + 'K';
  }
  if (d >= 1000000) {
    d = Math.round(d / 1000000) + 'M';
  }
  if (sign === -1) {
    return '-' + d;
  }
  return d;
}

var netIncome = {
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
      format: function format(d) {
        return '$' + largeNumberFormat(d);
      }
    }
  },
  axis: {
    y: {
      tick: {
        format: function format(d) {
          return '$' + largeNumberFormat(d);
        }
      },
      label: '$USD'
    },
    rotated: false
  },
  legend: {
    show: false
  }
};

bb.generate(timeSeriesFromCSV);
bb.generate(netIncome);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector, dataUrl, yText) {
  var svg = d3.select(selector);
  var margin = { top: 20, right: 60, bottom: 30, left: 50 };
  var width = svg.attr('width') - margin.left - margin.right;
  var outerHeight = width * 0.67;
  // console.log('>> width', svg.attr('width'))
  svg.attr('height', outerHeight);
  var height = outerHeight - margin.top - margin.bottom;

  var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  var x = d3.scaleTime().rangeRound([0, width]);
  var y = d3.scaleLinear().rangeRound([height, 0]);
  var z = d3.scaleOrdinal(d3.schemeCategory20);

  var line = d3.line().curve(d3.curveNatural).x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y(d.colValue);
  });

  d3.csv(dataUrl, type, ready);

  function ready(error, data) {
    if (error) throw error;
    // 2,6 = top 4, 1,2 = single
    var rows = data.columns.slice(1).map(function (id) {
      return {
        id: id,
        values: data.map(function (d) {
          return { date: d.date, colValue: d[id] };
        })
      };
    });

    x.domain(d3.extent(data, function (d) {
      return d.date;
    }));

    y.domain([d3.min(rows, function (c) {
      return d3.min(c.values, function (d) {
        return d.colValue;
      });
    }), d3.max(rows, function (c) {
      return d3.max(c.values, function (d) {
        return d.colValue;
      });
    })]);

    z.domain(rows.map(function (c) {
      return c.id;
    }));

    g.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));

    g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y)).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '0.71em').attr('fill', '#000').text(yText);

    var row = g.selectAll('.row').data(rows).enter().append('g').attr('class', 'row');

    row.append('path').attr('class', 'line').attr('d', function (d) {
      return line(d.values);
    }).style('stroke', function (d) {
      return z(d.id);
    });

    row.append('text').datum(function (d) {
      return { id: d.id, value: d.values[d.values.length - 1] };
    }).attr('transform', function (d) {
      return 'translate(' + x(d.value.date) + ',' + y(d.value.colValue) + ')';
    }).attr('x', 3).attr('dy', '0.35em').style('font', '12px sans-serif').text(function (d) {
      return d.id;
    });
  }
};

/* global d3 */

function type(d, _, columns) {
  d.date = d3.timeParse('%Y')(d.date);
  for (var i = 1, n = columns.length, c; i < n; ++i) {
    d[c = columns[i]] = +d[c];
  }return d;
}

/***/ })
/******/ ]);