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


var _timeSeriesLineChart = __webpack_require__(8);

var _timeSeriesLineChart2 = _interopRequireDefault(_timeSeriesLineChart);

var _flightAniCanvas = __webpack_require__(9);

var _flightAniCanvas2 = _interopRequireDefault(_flightAniCanvas);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

var _cabinSpace = __webpack_require__(18);

var _cabinSpace2 = _interopRequireDefault(_cabinSpace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './modules/map'
(0, _flightAniCanvas2.default)('#flightMapTest');
(0, _cabinSpace2.default)({ selector: '#cabin1', space: 0.04, rowCount: 24 });
(0, _cabinSpace2.default)({ selector: '#cabin2', space: 0.0357, rowCount: 27 });

(0, _timeSeriesLineChart2.default)('#linechart0 svg', 'data/loadfactor.csv', 'Load Factor');

/***/ }),
/* 8 */
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#flightmap';

  var airportMap = {};
  var $flightmap = $(selector);

  if (!$flightmap[0]) return;
  var width = 720;
  var height = 512;

  var pro = d3.geoAlbersUsa().scale(900).translate([width / 2, height / 2]);

  var path = d3.geoPath().pointRadius(1.2).projection(pro);

  var svg = d3.select(selector).append('svg').attr('preserveAspectRatio', 'xMidYMid').attr('viewBox', '0 0 ' + width + ' ' + height).attr('width', width).attr('height', height);

  var canvasEl = d3.select(selector).append('canvas').attr('style', 'position:absolute;left:0;top:0;').attr('width', width).attr('height', height);

  var canvas = canvasEl.node();
  var ctx = canvas.getContext('2d');

  // set starting values
  var fps = 20;
  var curveFactor = 10;
  var points = [];
  var batchSize = 5;

  function animate() {
    draw();
    // request another frame
    setTimeout(function () {
      window.requestAnimationFrame(animate);
    }, 1000 / fps);
  }

  // draw the current frame based on sliderValue
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < points.length; i++) {
      if (i > batchSize) {
        batchSize += 1;
        break;
      }
      var point = points[i];
      var start = point.start,
          end = point.end,
          progress = point.progress;

      var wayPoint = _canvasHelpers2.default.getWaypoint(start, end, 90);
      var controlPt = { x: wayPoint.x, y: wayPoint.y - curveFactor };
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      // helpers.drawLine(ctx, end, controlPt, '#000')

      // draw the tracking rectangle
      var percentFactor = progress / 100;
      var xy = _canvasHelpers2.default.getQuadraticBezierXY(start, controlPt, end, percentFactor);
      point.progress++;

      if (progress < 101) {
        _canvasHelpers2.default.drawDot(ctx, xy, 'grey', 0.4);
      } else {
        point.progress = 0;
      }
    }
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

    points = _canvasHelpers2.default.generatePoints(airportMap, _routes2.default, pro);
    animate();
  }

  d3.queue().defer(d3.json, '//ori-nodeassets.nbcnews.com/cdnassets/projects/2017/08/airplane-mode/us.json').defer(d3.json, '//ori-nodeassets.nbcnews.com/cdnassets/projects/2017/08/airplane-mode/us-airports-major.topo.json').await(ready);
};

var _routes = __webpack_require__(10);

var _routes2 = _interopRequireDefault(_routes);

var _canvasHelpers = __webpack_require__(11);

var _canvasHelpers2 = _interopRequireDefault(_canvasHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

// draw tracking dot at xy
function drawDot(ctx, point, color, size) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  // ctx.lineWidth = 1
  ctx.beginPath();
  ctx.arc(point.x, point.y, size, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawLine(ctx, end, controlPt, color) {
  ctx.quadraticCurveTo(controlPt.x, controlPt.y, end.x, end.y); // curved lines
  // ctx.lineTo(end.x, end.y) // straight lines
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

function generatePoints(airportMap, routes, projection) {
  var points = [];
  routes.forEach(function (route, idx) {
    var origin = airportMap[route[0]];
    var dest = airportMap[route[1]];
    if (origin && dest && origin.length && dest.length) {
      var startXY = projection(origin) || [0, 0];
      var endXY = projection(dest) || [0, 0];
      var start = { x: startXY[0], y: startXY[1] };
      var end = { x: endXY[0], y: endXY[1] };
      points.push({ idx: idx, start: start, end: end, progress: 0 });
    }
  });
  return points;
}

function getWaypoint(startPoint, endPoint, percent) {
  var factor = percent / 100;
  var x = startPoint.x + (endPoint.x - startPoint.x) * factor;
  var y = startPoint.y + (endPoint.y - startPoint.y) * factor;
  return { x: x, y: y };
}

// quadratic bezier: percent is 0-1
function getQuadraticBezierXY(startPt, controlPt, endPt, percent) {
  var x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
  var y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
  return { x: x, y: y };
}

exports.default = {
  drawDot: drawDot,
  drawLine: drawLine,
  getQuadraticBezierXY: getQuadraticBezierXY,
  getWaypoint: getWaypoint,
  generatePoints: generatePoints
};

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global bb */

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
  regions: [{
    axis: 'y',
    start: 0,
    end: 50000000,
    class: 'fill_red'
  }],
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

bb.generate(netIncome);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global bb */

var timeSeriesFromCSV = {
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
};

bb.generate(timeSeriesFromCSV);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global bb */

var data = [['Alaska', -0.39], ['American', -1.35], ['Delta', -0.4], ['ExpressJet', -1.36], ['Frontier', -2.24], ['Hawaiian', -0.69], ['JetBlue', -0.6], ['SkyWest', -0.97], ['Southwest', -0.88], ['Spirit', -2.01], ['United', -1.05], ['VirginAmerica', -0.5]];

var sorted = data.sort(function (a, b) {
  return b[1] - a[1];
});
var columnData = sorted.map(function (item) {
  return item[1] + 5;
});
columnData.unshift('Major US Airlines'); // add the column header
var labels = sorted.map(function (item) {
  return item[0];
}); // create array of labels

bb.generate({
  data: {
    columns: [columnData],
    type: 'bar'
  },
  axis: {
    y: {
      tick: {
        format: function format(d) {
          return d.toFixed(1);
        }
      },
      label: 'Score'
    },
    x: {
      type: 'category',
      categories: labels,
      show: true
    },
    rotated: true
  },
  tooltip: {
    show: true
  },
  bindto: '#bbchart4'
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global bb */

var data = [['Southwest', 151740277], ['United', 99769952], ['American', 144189749], ['Delta', 142286020], ['JetBlue', 38241080], ['Alaska', 24370439], ['SkyWest', 31204880], ['Other', 299051986]];

bb.generate({
  data: {
    columns: data,
    type: 'pie'
  },
  pie: {
    label: {
      format: function format(value, ratio, id) {
        return id;
      }
    }
  },
  bindto: '#bbchart3'
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global bb */
/*
United,704426,99769952
Southwest,1311139,151740277
Delta,1059757,142286020
JetBlue,337950,38241080
American,1098210,144189749
*/

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

var dalayData = [['2002', 120038204], ['2003', 126155452], ['2004', 167252422], ['2005', 180992079], ['2006', 198793390], ['2007', 222245772], ['2008', 194357254], ['2009', 157402401], ['2010', 159070567], ['2011', 163635498], ['2012', 147175329], ['2013', 179026591], ['2014', 202684018], ['2015', 180219334], ['2016', 172208061]];

var columnDataD = dalayData.map(function (item) {
  return item[1];
});
var labelsD = dalayData.map(function (item) {
  return item[0];
});
columnDataD.unshift('Passengers delayed');

var data = [['United', 704426], ['Southwest', 1311139], ['Delta', 1059757], ['JetBlue', 337950], ['American', 1098210]];

var sorted = data.sort(function (a, b) {
  return b[1] - a[1];
});
var columnData = sorted.map(function (item) {
  return item[1];
});
columnData.unshift('Flights');

var labels = sorted.map(function (item) {
  return item[0];
}); // create array of labels

bb.generate({
  data: {
    columns: [columnData],
    type: 'bar'
  },
  axis: {
    y: {
      tick: {
        format: function format(d) {
          return Math.round(d);
        }
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
});

bb.generate({
  data: {
    columns: [columnDataD],
    type: 'bar',
    labels: {
      format: function format(d) {
        return largeNumberFormat(d);
      }
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
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var selector = _ref.selector,
      _ref$space = _ref.space,
      space = _ref$space === undefined ? 0.04 : _ref$space,
      _ref$rowCount = _ref.rowCount,
      rowCount = _ref$rowCount === undefined ? 24 : _ref$rowCount;

  // outer svg dimensions
  var width = 110;
  var height = 300;

  // padding around the chart where axes will go
  var padding = { top: 5, right: 20, bottom: 5, left: 20

    // inner chart dimensions, where the dots are plotted
  };var plotAreaWidth = width - padding.left - padding.right;
  var plotAreaHeight = height - padding.top - padding.bottom;

  // radius of points in the scatterplot
  var pointRadius = 3;

  // initialize scales
  var xScale = d3.scaleLinear().domain([0, 1]).range([0, plotAreaWidth]);
  var yScale = d3.scaleLinear().domain([0, 1]).range([plotAreaHeight, 0]);
  var colorScale = d3.scaleLinear().domain([0, 1]).range(['#06a', '#0bb']);

  // select the container and create svg
  var container = d3.select(selector);
  var svg = container.append('svg').attr('width', width).attr('height', height);

  // the main <g> where all the chart content goes inside
  var g = svg.append('g').attr('transform', 'translate(' + padding.left + ' ' + padding.top + ')');

  // const seatShape = svg.append('path')
  //               .attr('class', 'seat')
  //               .attr('d', 'M45.53125,1.12696311e-14 L130,3.24237165e-14 L130,3.55271368e-14 C154.852814,5.30352672e-14 175,20.1471863 175,45 L175,84 L175,84 C175,108.852814 154.852814,129 130,129 L45.53125,129 L45.53125,129 C20.6784363,129 0.53125,108.852814 0.53125,84 L0.53125,45 L0.53125,45 C0.53125,20.1471863 20.6784363,-2.54006885e-15 45.53125,-7.10542736e-15 Z')

  // ----- end inits -----

  function buildData(_ref2) {
    var space = _ref2.space,
        rowCount = _ref2.rowCount;

    // { space = 0.038, rowCount = 27 }
    var seats = [{ id: 0, label: 'Seat $A', y: -0.01, x: 0.14 }, { id: 0, label: 'Seat $B', y: -0.01, x: 0.26 }, { id: 0, label: 'Seat $C', y: -0.01, x: 0.38 }, { id: 0, label: 'Seat $D', y: -0.01, x: 0.62 }, { id: 0, label: 'Seat $E', y: -0.01, x: 0.74 }, { id: 0, label: 'Seat $F', y: -0.01, x: 0.86 }];

    var seatCount = 0;
    // change to 27 rows
    var allRows = d3.range(rowCount).map(function (d, i) {
      var rowNum = i + 1;
      return seats.map(function (seat) {
        var ydiff = space * rowNum;
        seatCount += 1;
        var y = seat.y + ydiff;
        var x = seat.x;

        return { id: seatCount, label: seat.label.replace('$', rowNum), x: x, y: y };
      });
    });

    return [].concat.apply([], allRows); // merge rows
  }

  function buildNodes(data) {
    // add in circles
    var circles = g.append('g').attr('class', 'circles');
    var binding = circles.selectAll('.data-point').data(data, function (d) {
      return d.id;
    });
    binding.enter().append('circle').classed('data-point', true).attr('r', pointRadius).attr('cx', function (d) {
      return xScale(d.x);
    }).attr('cy', function (d) {
      return yScale(d.y);
    }).attr('fill', function (d) {
      return colorScale(d.y);
    });
  }

  var data = buildData({ space: space, rowCount: rowCount });
  buildNodes(data);

  // --- voronoi stuff --------
  // function buildVoronoiDiagram (data) {
  //   // create voronoi based on the data and scales
  //   return d3.voronoi()
  //     .x(d => xScale(d.x))
  //     .y(d => yScale(d.y))
  //     .size([plotAreaWidth, plotAreaHeight])(data)
  // }

  // let voronoiDiagram = buildVoronoiDiagram(data)

  // function toggleVoronoi () {
  //   // remove if there
  //   if (!g.select('.voronoi-polygons').empty()) {
  //     g.select('.voronoi-polygons').remove()
  //     g.select('.voronoi-radius-circle').remove()
  //     g.select('.overlay').on('mousemove.voronoi', null).on('mouseleave.voronoi', null)
  //   // otherwise, add the polygons in
  //   } else {
  //     const voronoiPolygons = g.append('g')
  //       .attr('class', 'voronoi-polygons')
  //       .style('pointer-events', 'none')
  //
  //     const binding = voronoiPolygons.selectAll('path').data(voronoiDiagram.polygons())
  //     binding.enter().append('path')
  //       .style('stroke', 'tomato')
  //       .style('fill', 'none')
  //       .style('opacity', 0.15)
  //       .attr('d', d => {
  //         if (d) {
  //           return `M${d.join('L')}Z`
  //         }
  //       })
  //   }
  // }

  // toggleVoronoi()
};

/***/ })
/******/ ]);