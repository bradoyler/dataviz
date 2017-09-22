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

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

var _cabinSpace = __webpack_require__(17);

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
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      _canvasHelpers2.default.drawLine(ctx, end, controlPt, '#000');

      // draw the tracking rectangle
      var percentFactor = progress / 100;
      var xy = _canvasHelpers2.default.getQuadraticBezierXY(start, controlPt, end, percentFactor);
      point.progress++;

      if (progress < 101) {
        _canvasHelpers2.default.drawPlane(ctx, xy, 2);
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

    points = _canvasHelpers2.default.generatePoints(airportMap, _moreRoutes2.default, pro);
    animate();
  }

  d3.queue().defer(d3.json, 'https://nodeassets.nbcnews.com/cdnassets/projects/2017/08/airplane-mode/us-states.json').defer(d3.json, 'https://nodeassets.nbcnews.com/cdnassets/projects/2017/08/airplane-mode/us-airports-major.topo.json').await(ready);
};

var _moreRoutes = __webpack_require__(10);

var _moreRoutes2 = _interopRequireDefault(_moreRoutes);

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
exports.default = [['LAS', 'MSY'], ['SPI', 'IAD'], ['MSP', 'IND'], ['CLT', 'DAB'], ['CLE', 'PVD'], ['CLE', 'DTW'], ['SYR', 'ATL'], ['MSY', 'DFW'], ['ORD', 'CAE'], ['IAH', 'LAS'], ['ATL', 'SAN'], ['MSP', 'FNT'], ['PIR', 'JAX'], ['BOS', 'MYR'], ['CVG', 'MDT'], ['SYR', 'MCO'], ['DFW', 'MSN'], ['DFW', 'IAH'], ['PNS', 'ATL'], ['VPS', 'CVG'], ['CVG', 'MCO'], ['CLT', 'CVG'], ['BWI', 'ABQ'], ['BFL', 'FAT'], ['MFR', 'RDM'], ['GSP', 'ORD'], ['IAH', 'PDX'], ['CLE', 'ROC'], ['IAH', 'TYS'], ['BOI', 'PHX'], ['ATL', 'PBI'], ['DSM', 'PHX'], ['DEN', 'SEA'], ['LAS', 'FNT'], ['IAD', 'DAY'], ['SAT', 'MCI'], ['KOA', 'LIH'], ['BUR', 'RNO'], ['MEM', 'MLI'], ['PHL', 'STT'], ['ORF', 'DTW'], ['IND', 'BOS'], ['ATL', 'MOB'], ['ATL', 'DTW'], ['CMH', 'CLT'], ['RNO', 'ONT'], ['MSY', 'MEM'], ['HPN', 'PBI'], ['LEX', 'COS'], ['BUR', 'PDX'], ['EWR', 'MTJ'], ['MSP', 'CVG'], ['LAX', 'MFR'], ['ACV', 'SFO'], ['FNT', 'DTW'], ['DEN', 'ABQ'], ['AEX', 'DFW'], ['MIA', 'SFO'], ['ATL', 'SBN'], ['LEX', 'CVG'], ['OTZ', 'ANC'], ['ORD', 'VPS'], ['PNS', 'MEM'], ['ASE', 'RFD'], ['IAD', 'AUS'], ['RNO', 'PHX'], ['CVG', 'ANC'], ['MSY', 'SAT'], ['DTW', 'AZO'], ['BIL', 'SLC'], ['ATL', 'PHF'], ['SAN', 'AUS'], ['FAT', 'SAN'], ['MEM', 'SDF'], ['ORD', 'MQT'], ['MIA', 'ORF'], ['SAT', 'CVG'], ['ATL', 'MYR'], ['PHL', 'PIT'], ['CVG', 'DCA'], ['LSE', 'MSP'], ['SJC', 'LAX'], ['SLC', 'JAC'], ['SEA', 'BOI'], ['ISP', 'MCO'], ['IAH', 'MCI'], ['SAN', 'HNL'], ['LGA', 'FLL'], ['TPA', 'CLE'], ['STL', 'ABQ'], ['AMA', 'ABQ'], ['LAX', 'MCI'], ['CMH', 'EWR'], ['ICT', 'MSP'], ['STT', 'CLT'], ['SAV', 'IAD'], ['SEA', 'BUR'], ['BDL', 'IND'], ['ANC', 'SEA'], ['ORD', 'PHL'], ['IAD', 'MDT'], ['DEN', 'CRW'], ['ORD', 'FSD'], ['SHV', 'DTW'], ['TPA', 'PHX'], ['RNO', 'SJC'], ['TYS', 'CVG'], ['IAD', 'MIA'], ['PHL', 'MSP'], ['PHX', 'GEG'], ['PHL', 'BUF'], ['BOI', 'SFO'], ['LAX', 'MTJ'], ['TLH', 'FLL'], ['PHL', 'LGA'], ['MCI', 'PIT'], ['AUS', 'BNA'], ['SFO', 'PIT'], ['DEN', 'ONT'], ['CLT', 'LIT'], ['JFK', 'ALB'], ['BOS', 'MDW'], ['BDL', 'ORD'], ['PWM', 'CLT'], ['ATL', 'LIT'], ['EWR', 'PDX'], ['CLE', 'CVG'], ['ATL', 'ICT'], ['SMF', 'ORD'], ['SDF', 'EWR'], ['DEN', 'IAH'], ['DFW', 'DTW'], ['SAN', 'STL'], ['DTW', 'MCI'], ['EWR', 'AVL'], ['TLH', 'CLT'], ['SCC', 'BRW'], ['SMF', 'BUR'], ['ATL', 'CAK'], ['LAX', 'EWR'], ['CMH', 'ICT'], ['ILM', 'CLT'], ['ITO', 'HNL'], ['CLT', 'BOS'], ['FLL', 'OAK'], ['ATL', 'JAC'], ['FLL', 'LAS'], ['ATL', 'SJC'], ['LGA', 'PHL'], ['SBP', 'SLC'], ['DEN', 'CYS'], ['BMI', 'MCO'], ['ORD', 'OAK'], ['BWI', 'LIT'], ['BOI', 'GEG'], ['DTW', 'RIC'], ['SNA', 'LAS'], ['SGF', 'DTW'], ['SAT', 'AMA'], ['DAB', 'CVG'], ['SEA', 'SIT'], ['MKE', 'EWR'], ['PIT', 'BWI'], ['ORD', 'FCA'], ['FLL', 'LAX'], ['STL', 'SFO'], ['BOS', 'IAD'], ['BQN', 'JFK'], ['DTW', 'CRW'], ['BQN', 'MCO'], ['SGF', 'STL'], ['EUG', 'LAX'], ['GEG', 'PHX'], ['DCA', 'XNA'], ['FNT', 'ORD'], ['HSV', 'MCO'], ['PHF', 'ATL'], ['CMH', 'GRR'], ['TPA', 'DCA'], ['SLC', 'CLT'], ['CVG', 'CLE'], ['PHX', 'LAS'], ['PHX', 'MKE'], ['SLC', 'ORD'], ['IAH', 'SAV'], ['DEN', 'MTJ'], ['GRK', 'IAH'], ['BOS', 'LAX'], ['IAH', 'SAN'], ['MKE', 'BDL'], ['LGA', 'XNA'], ['CVG', 'ROA'], ['MDW', 'SAT'], ['ROC', 'LAS'], ['BNA', 'DFW'], ['IAH', 'MAF'], ['HOU', 'TUL'], ['PHX', 'MRY'], ['RSW', 'DEN'], ['OKC', 'CVG'], ['DEN', 'RKS'], ['DEN', 'BFL'], ['MCI', 'LNK'], ['PHX', 'OAK'], ['LGB', 'PDX'], ['SEA', 'DEN'], ['MFE', 'DFW'], ['SLC', 'SJC'], ['PDX', 'SNA'], ['DAB', 'JAX'], ['LAX', 'SFO'], ['MFR', 'RDD'], ['MSP', 'GTF'], ['CVG', 'COS'], ['DEN', 'LIH'], ['CAE', 'MEM'], ['IAH', 'DEN'], ['ACK', 'EWR'], ['ATL', 'MEI'], ['DAY', 'DTW'], ['ORD', 'EWR'], ['DCA', 'BNA'], ['BIL', 'PIH'], ['CVG', 'PBI'], ['LGA', 'PIT'], ['LAN', 'MSP'], ['ICT', 'DEN'], ['ORD', 'CID'], ['IND', 'DFW'], ['LAX', 'FAT'], ['ICT', 'COS'], ['BHM', 'SDF'], ['RSW', 'ATL'], ['FLL', 'IAD'], ['CDC', 'LAX'], ['SAN', 'LAX'], ['BTR', 'DFW'], ['DCA', 'RDU'], ['SAN', 'BWI'], ['SLC', 'FLL'], ['RAP', 'TWF'], ['IAD', 'ABQ'], ['DCA', 'TPA'], ['DFW', 'BUR'], ['SNA', 'LAX'], ['PHX', 'OKC'], ['ELP', 'TUS'], ['SFO', 'TWF'], ['CWA', 'ORD'], ['XNA', 'SGF'], ['JAN', 'BWI'], ['CRW', 'ORD'], ['BDL', 'GRB'], ['BWI', 'MIA'], ['SJC', 'SAN'], ['IND', 'MDW'], ['IAD', 'BUF'], ['ACY', 'ATL'], ['LIH', 'HNL'], ['DFW', 'MEM'], ['DEN', 'DRO'], ['MSY', 'CMH'], ['IAH', 'BWI'], ['PBI', 'CMH'], ['BUF', 'JFK'], ['SLC', 'PSC'], ['MCO', 'JAX'], ['CLT', 'ORF'], ['RNO', 'IAH'], ['HNL', 'DEN'], ['TYS', 'MCO'], ['CLE', 'BHM'], ['SLC', 'OKC'], ['DSM', 'IAH'], ['SDF', 'SLC'], ['SYR', 'CVG'], ['ORF', 'MDW'], ['OKC', 'DFW'], ['FAI', 'SLC'], ['DEN', 'ROC'], ['CIC', 'FAT'], ['JFK', 'SRQ'], ['CLE', 'IAD'], ['JFK', 'OAK'], ['TPA', 'FNT'], ['XNA', 'LAX'], ['FSD', 'SLC'], ['GJT', 'LAX'], ['DEN', 'FAT'], ['DEN', 'ELP'], ['BWI', 'ALB'], ['RDU', 'DEN'], ['SEA', 'MCI'], ['CLT', 'MEM'], ['PSP', 'SFO'], ['SAT', 'MEM'], ['PHX', 'BUR'], ['BUR', 'PMD'], ['MSP', 'CLE'], ['BDL', 'LAS'], ['SLC', 'MSY'], ['ORD', 'ELP'], ['SJC', 'EWR'], ['ATL', 'OMA'], ['SYR', 'CLE'], ['MRY', 'SLC'], ['AVP', 'ORD'], ['RST', 'MSP'], ['PHL', 'ORF'], ['ROC', 'BWI'], ['MSO', 'SFO'], ['MSP', 'MDT'], ['HPN', 'TPA'], ['TUS', 'MDW'], ['EUG', 'PDX'], ['JFK', 'CMH'], ['HNL', 'ORD'], ['ORD', 'RDU'], ['ATL', 'CHS'], ['PSP', 'SEA'], ['CLT', 'SDF'], ['COS', 'MEM'], ['VLD', 'ATL'], ['BUF', 'PHL'], ['ATL', 'TOL'], ['DFW', 'EGE'], ['YUM', 'LAS'], ['OAK', 'MCI'], ['MCI', 'TUS'], ['PNS', 'DFW'], ['GEG', 'LGB'], ['SEA', 'JNU'], ['DAB', 'ATL'], ['SFO', 'BWI'], ['BOS', 'CVG'], ['SLC', 'CMH'], ['MIA', 'EWR'], ['ATL', 'PDX'], ['IAD', 'PHL'], ['JFK', 'AUS'], ['JFK', 'HDN'], ['MCO', 'IAD'], ['LGA', 'CMH'], ['BNA', 'STL'], ['BNA', 'MSY'], ['PBI', 'ATL'], ['MKE', 'SFO'], ['JFK', 'ORD'], ['IAD', 'DTW'], ['SLC', 'LAS'], ['SEA', 'PHL'], ['LGA', 'VPS'], ['DRO', 'ABQ'], ['MDT', 'DFW'], ['BOS', 'STT'], ['IND', 'PIT'], ['IAD', 'SAN'], ['ANC', 'ATL'], ['JAX', 'BHM'], ['BWI', 'HOU'], ['SAT', 'CLT'], ['GUC', 'DEN'], ['CAE', 'DFW'], ['FLL', 'AUS'], ['HOU', 'HRL'], ['STT', 'ATL'], ['EWR', 'CMH'], ['SBP', 'FAT'], ['MEM', 'CLE'], ['SWF', 'ATL'], ['MKE', 'TUS'], ['CLE', 'ABQ'], ['SAT', 'SLC'], ['CLE', 'SAV'], ['ISP', 'TPA'], ['MCO', 'LAS'], ['LAS', 'MKE'], ['PSP', 'DFW'], ['CVG', 'JFK'], ['IAD', 'SPI'], ['OAK', 'SNA'], ['DTW', 'ITH'], ['BHM', 'STL'], ['IAH', 'BNA'], ['BWI', 'BUF'], ['MCO', 'IND'], ['DCA', 'MHT'], ['EYW', 'ATL'], ['ORD', 'GEG'], ['MAF', 'DAL'], ['LAS', 'GEG'], ['IAD', 'BUR'], ['MDT', 'DTW'], ['BNA', 'MSP'], ['LEX', 'LGA'], ['CHS', 'EWR'], ['SLC', 'PSP'], ['ORD', 'MDT'], ['ONT', 'TUS'], ['PDX', 'ONT'], ['MYR', 'LGA'], ['PHX', 'OGG'], ['DTW', 'LAS'], ['ANC', 'JNU'], ['RDU', 'CVG'], ['ATL', 'VPS'], ['JFK', 'BGR'], ['MEM', 'BDL'], ['OTH', 'PDX'], ['PHX', 'MDW'], ['DEN', 'GRR'], ['MSP', 'LIT'], ['LIH', 'KOA'], ['BUR', 'PSP'], ['MCI', 'OMA'], ['CMH', 'MCI'], ['OAK', 'TUS'], ['MEM', 'CLT'], ['BHM', 'EWR'], ['TPA', 'CLT'], ['OMA', 'CVG'], ['TUS', 'ABQ'], ['JFK', 'CLE'], ['PHL', 'SEA'], ['PHX', 'LAX'], ['BIS', 'DEN'], ['PHX', 'ABQ'], ['BDL', 'PHL'], ['SLC', 'FCA'], ['BUF', 'RSW'], ['MHT', 'IAD'], ['DEN', 'MSO'], ['STL', 'OMA'], ['MSP', 'MCI'], ['SMF', 'LAX'], ['BZN', 'MSP'], ['SFO', 'EUG'], ['ABQ', 'CLE'], ['OME', 'ANC'], ['SFO', 'MDW'], ['AVL', 'CVG'], ['COS', 'MKE'], ['MFR', 'PHX'], ['MCO', 'PBI'], ['IAH', 'BDL'], ['MKE', 'GRR'], ['MCI', 'ABQ'], ['DFW', 'GRR'], ['MKE', 'BNA'], ['HDN', 'ORD'], ['DCA', 'LAX'], ['KOA', 'SAN'], ['SBN', 'ORD'], ['PBI', 'LGA'], ['DFW', 'CHA'], ['FLL', 'LGB'], ['SBP', 'LAS'], ['GSO', 'MSP'], ['SNA', 'PDX'], ['ORF', 'CLT'], ['SLC', 'ATL'], ['MCO', 'CLT'], ['DSM', 'DEN'], ['JAX', 'IAH'], ['BOI', 'DEN'], ['DTW', 'EWR'], ['ALB', 'ATL'], ['ABQ', 'LAX'], ['MKE', 'GRB'], ['EVV', 'DTW'], ['BTR', 'CVG'], ['EGE', 'MIA'], ['TYS', 'IAD'], ['MKE', 'STL'], ['MSY', 'LAX'], ['ROC', 'ATL'], ['IAH', 'CRW'], ['AGS', 'LGA'], ['DCA', 'MSN'], ['MKE', 'PIT'], ['TPA', 'SDF'], ['SJU', 'FLL'], ['DFW', 'SJC'], ['LFT', 'IAH'], ['MLI', 'LAS'], ['MKE', 'PHL'], ['IND', 'XNA'], ['TPA', 'CMH'], ['LGA', 'GSP'], ['BNA', 'MEM'], ['IAH', 'OKC'], ['RDU', 'MIA'], ['OKC', 'PHX'], ['MSY', 'MCO'], ['ANC', 'DLG'], ['DEN', 'RSW'], ['CLT', 'PDX'], ['IND', 'MKE'], ['TPA', 'BUF'], ['DFW', 'GRK'], ['CLT', 'IAH'], ['PHX', 'TPA'], ['DTW', 'PIT'], ['LGA', 'PBI'], ['SAN', 'BOS'], ['OKC', 'BWI'], ['CMH', 'BOS'], ['ANC', 'FAI'], ['SLC', 'STL'], ['SLC', 'COD'], ['PHX', 'MCI'], ['PIT', 'GRB'], ['BWI', 'SAV'], ['PHL', 'DEN'], ['GSO', 'LGA'], ['BWI', 'CLE'], ['SBA', 'PHX'], ['ORD', 'CMI'], ['SLC', 'SBA'], ['SLC', 'YUM'], ['DTW', 'SCE'], ['SEA', 'MCO'], ['MSY', 'DEN'], ['IAH', 'MGM'], ['FAR', 'MSP'], ['SBA', 'SJC'], ['ABQ', 'PDX'], ['SYR', 'PHL'], ['ATL', 'BZN'], ['MCO', 'MHT'], ['SFO', 'CLE'], ['PSG', 'JNU'], ['PIT', 'DEN'], ['PBI', 'CLE'], ['LEX', 'DFW'], ['HSV', 'MEM'], ['EGE', 'JFK'], ['TYS', 'ORD'], ['ATL', 'AUS'], ['STL', 'PHL'], ['BWI', 'GRR'], ['CLE', 'BDL'], ['ORD', 'GPT'], ['TUL', 'MCI'], ['ABQ', 'DEN'], ['DFW', 'MSP'], ['AZO', 'XNA'], ['PBI', 'JFK'], ['DFW', 'BUF'], ['PDX', 'MCI'], ['RDU', 'IAD'], ['ATL', 'JFK'], ['SGF', 'FSD'], ['SIT', 'JNU'], ['ERI', 'PIT'], ['MEM', 'EVV'], ['SFO', 'CVG'], ['CLE', 'MCO'], ['LAS', 'YUM'], ['PHX', 'DSM'], ['CLT', 'MCO'], ['OKC', 'SMF'], ['BOI', 'ORD'], ['LBB', 'ABQ'], ['ORD', 'HDN'], ['ATL', 'ALB'], ['DTW', 'TVC'], ['MEM', 'PIT'], ['TUS', 'JFK'], ['DAY', 'DEN'], ['EWR', 'CVG'], ['BDL', 'BNA'], ['AUS', 'OKC'], ['HNL', 'ATL'], ['SJU', 'ORD'], ['LGB', 'SMF'], ['BDL', 'LAX'], ['BET', 'ANC'], ['MEM', 'IAH'], ['ROC', 'MSP'], ['MKE', 'ATW'], ['PDX', 'MDW'], ['ATL', 'PHX'], ['SAV', 'EWR'], ['PHL', 'SJU'], ['CHA', 'ORD'], ['PBI', 'EWR'], ['BOS', 'PHX'], ['CLT', 'MKE'], ['CLT', 'DTW'], ['FNT', 'MSP'], ['IAH', 'AMA'], ['SLC', 'SNA'], ['DAB', 'CLT'], ['DEN', 'MRY'], ['DEN', 'FCA'], ['SFO', 'JFK'], ['SRQ', 'IND'], ['DTW', 'CHS'], ['BDL', 'RSW'], ['JAN', 'HOU'], ['GEG', 'LAS'], ['CVG', 'IAD'], ['JFK', 'SMF'], ['SNA', 'EWR'], ['PWM', 'ATL'], ['AUS', 'DTW'], ['RNO', 'PIH'], ['ONT', 'TUL'], ['SFO', 'CEC'], ['SMF', 'ATL'], ['LAS', 'PIT'], ['DFW', 'SEA'], ['BNA', 'ORF'], ['BNA', 'FSD'], ['MCO', 'OKC'], ['SLC', 'FAI'], ['IAD', 'SJU'], ['SFO', 'CLT'], ['ABQ', 'ORD'], ['DTW', 'DCA'], ['MSP', 'MLI'], ['ANC', 'ADQ'], ['TPA', 'GPT'], ['ATL', 'AEX'], ['BTV', 'ORD'], ['CHA', 'CVG'], ['CAK', 'LAS'], ['LIH', 'DEN'], ['CVG', 'LGA'], ['EWR', 'STT'], ['CLT', 'SFO'], ['DEN', 'GTF'], ['LAX', 'JAC'], ['SLC', 'GTF'], ['AUS', 'SNA'], ['BTV', 'IND'], ['RDD', 'SBA'], ['MEM', 'MIA'], ['SRQ', 'MDW'], ['DEN', 'LIT'], ['SJU', 'IAH'], ['IAH', 'LEX'], ['DFW', 'XNA'], ['DTW', 'CAE'], ['PHX', 'DCA'], ['PMD', 'SFO'], ['MBS', 'DTW'], ['EGE', 'MSP'], ['RDU', 'PHX'], ['LGA', 'MSY'], ['MKE', 'MSN'], ['DEN', 'PIH'], ['TOL', 'ATL'], ['BWI', 'PHL'], ['TRI', 'MEM'], ['PHX', 'GJT'], ['ORD', 'OKC'], ['MSP', 'STL'], ['SLC', 'SGF'], ['DEN', 'OGG'], ['ATL', 'MEM'], ['MDW', 'RDU'], ['FLL', 'ATL'], ['MSP', 'SMF'], ['MCI', 'SAN'], ['AUS', 'IAD'], ['SLC', 'CLE'], ['DAY', 'ATL'], ['MSY', 'MSP'], ['ROA', 'IAD'], ['BDL', 'CLE'], ['BIL', 'GTF'], ['GEG', 'ONT'], ['SEA', 'DFW'], ['SEA', 'EWR'], ['PDX', 'MSN'], ['SDF', 'SPI'], ['HTS', 'CVG'], ['LAX', 'OXR'], ['SMF', 'CLT'], ['SFO', 'MRY'], ['ATW', 'DSM'], ['ORD', 'MSO'], ['CHS', 'DFW'], ['DCA', 'MKE'], ['RDU', 'EWR'], ['BOS', 'GSO'], ['IND', 'LAS'], ['STL', 'LAS'], ['BOS', 'BWI'], ['STX', 'MIA'], ['LAS', 'LAX'], ['MAF', 'LAS'], ['MDW', 'MIA'], ['OAK', 'MDW'], ['EWR', 'RDU'], ['JFK', 'HOU'], ['CMH', 'MDW'], ['ATL', 'SNA'], ['IAD', 'STT'], ['LAX', 'RSW'], ['DEN', 'MLI'], ['DEN', 'OAK'], ['ACV', 'CEC'], ['CWA', 'MKE'], ['TLH', 'MEM'], ['GSO', 'MCO'], ['OGG', 'PHX'], ['MCI', 'ORD'], ['BWI', 'DEN'], ['ORF', 'BOI'], ['MGM', 'MEM'], ['BNA', 'OAK'], ['HLN', 'DEN'], ['SEA', 'CLE'], ['ATL', 'ORD'], ['ABE', 'DTW'], ['ICT', 'MCI'], ['SRQ', 'CLT'], ['DTW', 'CWA'], ['PIT', 'MDW'], ['MDW', 'BWI'], ['SEA', 'ABQ'], ['OMA', 'MEM'], ['CMH', 'LGA'], ['SAV', 'MEM'], ['ABQ', 'SEA'], ['CVG', 'PHL'], ['SLC', 'RDM'], ['ORD', 'LEX'], ['OAK', 'OGG'], ['SDF', 'DTW'], ['ORF', 'DFW'], ['JFK', 'BNA'], ['CLT', 'ABE'], ['DFW', 'TXK'], ['CVG', 'OMA'], ['TPA', 'SLC'], ['ABE', 'PHL'], ['FAT', 'TWF'], ['GPT', 'ORD'], ['EWR', 'BGR'], ['SAN', 'MEM'], ['LAX', 'DFW'], ['DTW', 'ORF'], ['BWI', 'CVG'], ['ABQ', 'TUS'], ['SLC', 'JFK'], ['PDX', 'ORD'], ['ATL', 'IAD'], ['BWI', 'SJU'], ['BFL', 'SLC'], ['DTW', 'ALB'], ['IAH', 'ANC'], ['CMH', 'SLC'], ['AUS', 'TPA'], ['ONT', 'SEA'], ['OAK', 'DEN'], ['BNA', 'FLL'], ['COS', 'LAN'], ['SAT', 'IAD'], ['GRB', 'DTW'], ['SFO', 'SNA'], ['CLE', 'TUL'], ['DFW', 'MLU'], ['LFT', 'DFW'], ['SJC', 'BOS'], ['DEN', 'PHL'], ['LGA', 'MEM'], ['SIT', 'SEA'], ['ATL', 'FCA'], ['DTW', 'JAX'], ['LGA', 'GSO'], ['SMF', 'MDW'], ['FWA', 'TVC'], ['MYR', 'DTW'], ['DCA', 'STL'], ['LGA', 'CHS'], ['ORD', 'PIA'], ['DEN', 'RDU'], ['FAR', 'ORD'], ['JAX', 'BNA'], ['DEN', 'FAR'], ['AUS', 'IAH'], ['DTW', 'DEN'], ['ICT', 'DTW'], ['SFO', 'ATL'], ['SBA', 'DFW'], ['CLT', 'EWR'], ['HOU', 'BHM'], ['ATW', 'XNA'], ['CID', 'DFW'], ['AUS', 'DSM'], ['CLT', 'ATW'], ['MCO', 'BNA'], ['DEN', 'IAD'], ['SDF', 'DEN'], ['PIT', 'LAX'], ['OAK', 'SEA'], ['IND', 'ORD'], ['KOA', 'PHX'], ['LEX', 'MCO'], ['MSY', 'IAD'], ['BWI', 'PWM'], ['PHX', 'SAN'], ['ORD', 'ATW'], ['HNL', 'OAK'], ['CLT', 'LAX'], ['SFO', 'MCO'], ['CLT', 'TPA'], ['DTW', 'GSP'], ['PHL', 'IND'], ['DEN', 'RNO'], ['SAT', 'MSY'], ['DBQ', 'ORD'], ['BOS', 'SFO'], ['RDU', 'BHM'], ['CLT', 'BUF'], ['OXR', 'PSP'], ['MLI', 'ORD'], ['RDU', 'BOS'], ['EWR', 'OKC'], ['EWR', 'TYS'], ['LAS', 'BDL'], ['BGR', 'BTV'], ['SFO', 'PHX'], ['LEX', 'ATL'], ['ALB', 'JFK'], ['MEM', 'GSO'], ['ILM', 'RDU'], ['STX', 'MGM'], ['SJC', 'HNL'], ['SFO', 'PDX'], ['MDW', 'TUS'], ['IAH', 'MTJ'], ['LAS', 'MLI'], ['LAS', 'ROC'], ['LWB', 'ATL'], ['MCO', 'HOU'], ['ONT', 'PDX'], ['GRB', 'ORD'], ['FLL', 'EWR'], ['MRY', 'ONT'], ['MSP', 'IAD'], ['ATL', 'TLH'], ['MYR', 'CVG'], ['JNU', 'SEA'], ['ICT', 'ATL'], ['JAX', 'TPA'], ['DCA', 'BDL'], ['MCI', 'RDU'], ['PHX', 'SEA'], ['COS', 'DFW'], ['GRK', 'DFW'], ['JFK', 'PWM'], ['TUS', 'SEA'], ['LGB', 'SEA'], ['ORD', 'ABE'], ['CMH', 'TPA'], ['IAD', 'RSW'], ['ATL', 'ABY'], ['PDX', 'SAN'], ['DCA', 'IAH'], ['ATL', 'FAY'], ['TPA', 'DEN'], ['MSP', 'GRR'], ['CVG', 'FSD'], ['DSM', 'RFD'], ['PIT', 'LGA'], ['AVP', 'HPN'], ['JFK', 'LGB'], ['OMA', 'MCO'], ['TOL', 'ORD'], ['HOU', 'SAT'], ['MDT', 'MSP'], ['STL', 'SNA'], ['RDU', 'CLE'], ['MEM', 'AUS'], ['CVG', 'ABE'], ['CLT', 'SYR'], ['MCI', 'SMF'], ['CVG', 'LAX'], ['CHO', 'DCA'], ['SEA', 'CLT'], ['EWR', 'SLC'], ['BHM', 'LGA'], ['SJU', 'CLT'], ['LAX', 'SEA'], ['FLL', 'BOS'], ['SEA', 'MDW'], ['IAD', 'OAK'], ['EWR', 'SEA'], ['MSP', 'ALB'], ['DTW', 'MYR'], ['CRP', 'ATL'], ['MSN', 'DFW'], ['PHL', 'MHT'], ['MCI', 'EWR'], ['SJU', 'PIT'], ['BGR', 'ATL'], ['ORF', 'PBI'], ['CID', 'ATL'], ['SEA', 'PSP'], ['ORF', 'MSP'], ['COS', 'IAH'], ['IAD', 'ROC'], ['ORD', 'ASE'], ['LGA', 'TYS'], ['SBN', 'DTW'], ['CIC', 'MRY'], ['IAH', 'SJC'], ['DCA', 'SLC'], ['DTW', 'BUF'], ['IAD', 'BDL'], ['ABE', 'ORD'], ['PIT', 'SFO'], ['CAK', 'TPA'], ['PIT', 'JFK'], ['XNA', 'LEX'], ['SGF', 'ATL'], ['BHM', 'MKE'], ['MDT', 'CLE'], ['SRQ', 'TPA'], ['BUF', 'CVG'], ['ANC', 'ORD'], ['STT', 'LGA'], ['DEN', 'DCA'], ['DTW', 'SAN'], ['SAV', 'ORD'], ['ORD', 'DAL'], ['RSW', 'IAD'], ['PDX', 'BOS'], ['SWF', 'FLL'], ['HPN', 'JFK'], ['DTW', 'BOS'], ['MEM', 'DCA'], ['MCO', 'DEN'], ['GJT', 'ASE'], ['COS', 'LAS'], ['ORF', 'MIA'], ['MSP', 'GFK'], ['DEN', 'PIA'], ['BFL', 'SAN'], ['BNA', 'DCA'], ['LBB', 'ELP'], ['BOS', 'RDU'], ['TUP', 'ATL'], ['ORD', 'GTF'], ['SLC', 'OMA'], ['MSY', 'ORD'], ['SEA', 'MSP'], ['SRQ', 'BOS'], ['MDW', 'LIT'], ['BHM', 'DEN'], ['STL', 'SGF'], ['IAH', 'TLH'], ['MDW', 'TPA'], ['ATL', 'LAS'], ['AUS', 'RDU'], ['BUR', 'DEN'], ['DTW', 'EVV'], ['PHX', 'PSP'], ['IND', 'PHX'], ['SJC', 'IAH'], ['DEN', 'AMA'], ['BOS', 'BNA'], ['ONT', 'PHX'], ['PDX', 'OGG'], ['FNT', 'LAS'], ['BIS', 'RAP'], ['GPT', 'TPA'], ['LAS', 'CAK'], ['BZN', 'LAX'], ['EWR', 'MKE'], ['MCO', 'MKE'], ['OKC', 'IAD'], ['FLL', 'DEN'], ['MSP', 'MSN'], ['ATL', 'ABE'], ['SEA', 'ANC'], ['DEN', 'GJT'], ['BUF', 'MSP'], ['PDX', 'PHX'], ['ATL', 'SAV'], ['PHL', 'ICT'], ['STL', 'DTW'], ['OKC', 'LAX'], ['RDU', 'GRB'], ['SJC', 'ORD'], ['MIA', 'MCI'], ['FAT', 'LGB'], ['PIT', 'FLL'], ['ORD', 'TUS'], ['SLC', 'LIT'], ['DTW', 'SLC'], ['SGU', 'PSP'], ['PBI', 'DCA'], ['DFW', 'EVV'], ['DFW', 'CLL'], ['SDF', 'BHM'], ['ISP', 'FLL'], ['SFO', 'ANC'], ['RSW', 'LGA'], ['BTR', 'ORD'], ['MCN', 'ATL'], ['BHM', 'SLC'], ['OAK', 'LAS'], ['JFK', 'SLC'], ['IND', 'FLL'], ['AUS', 'ORD'], ['MEM', 'DFW'], ['TUL', 'MCO'], ['CVG', 'SGF'], ['ABE', 'LGA'], ['ORD', 'MEM'], ['DAL', 'MSY'], ['SLC', 'EWR'], ['SFO', 'SAT'], ['SDF', 'CVG'], ['SNA', 'DFW'], ['SAT', 'MGM'], ['DEN', 'PHX'], ['CID', 'MSP'], ['PIT', 'MEM'], ['IAH', 'ONT'], ['LAX', 'EUG'], ['MOD', 'RNO'], ['JAX', 'MCI'], ['PHX', 'MFR'], ['TUS', 'EWR'], ['PHL', 'FLL'], ['CVG', 'ILM'], ['DTW', 'SAV'], ['BDL', 'RDU'], ['TUL', 'XNA'], ['EWR', 'PIT'], ['MEM', 'SAN'], ['JFK', 'PBI'], ['BUF', 'CLE'], ['ORD', 'ANC'], ['LNK', 'ORD'], ['DCA', 'DEN'], ['ORF', 'CLE'], ['BWI', 'PIT'], ['ORD', 'ALB'], ['DFW', 'SBA'], ['PHL', 'PBI'], ['MIA', 'MCO'], ['MSP', 'BNA'], ['COS', 'ATL'], ['RAP', 'ORD'], ['BZN', 'ATL'], ['DTW', 'PDX'], ['LGA', 'MIA'], ['GRB', 'SDF'], ['BNA', 'PHL'], ['PHF', 'MCO'], ['SAN', 'SMF'], ['BTR', 'DCA'], ['CVG', 'BOS'], ['OMA', 'ORD'], ['SNA', 'SAN'], ['ITO', 'KOA'], ['LAS', 'MEM'], ['SAN', 'HOU'], ['JAX', 'MSP'], ['ANC', 'CVG'], ['SLC', 'MFR'], ['SAT', 'TUS'], ['IAH', 'RDU'], ['MEM', 'HSV'], ['BOI', 'SEA'], ['MCI', 'TPA'], ['CMH', 'CVG'], ['RIC', 'EWR'], ['IAD', 'GSO'], ['OAJ', 'CLT'], ['STL', 'BWI'], ['JFK', 'LGA'], ['RIC', 'ORD'], ['BTV', 'BWI'], ['MDW', 'LAS'], ['JFK', 'FLL'], ['IAD', 'SAV'], ['DTW', 'AVP'], ['CVG', 'HSV'], ['CVG', 'GRR'], ['SAT', 'SAN'], ['MSP', 'PHL'], ['IAH', 'TUS'], ['PIT', 'IAH'], ['SLC', 'SAN'], ['LGA', 'MSP'], ['ATL', 'TPA'], ['IAH', 'BHM'], ['MDW', 'ISP'], ['ABQ', 'AUS'], ['LEX', 'DAY'], ['SAN', 'TUS'], ['IAH', 'MSP'], ['BNA', 'LAX'], ['ACV', 'SJC'], ['EWR', 'DTW'], ['LAS', 'PDX'], ['MCI', 'DEN'], ['LAX', 'OGG'], ['DAL', 'SAT'], ['DFW', 'HDN'], ['AMA', 'TUL'], ['SAN', 'PDX'], ['MSY', 'EWR'], ['IAH', 'SLC'], ['DTW', 'SDF'], ['LWS', 'IDA'], ['DEN', 'BNA'], ['DTW', 'PHX'], ['XNA', 'DFW'], ['RIC', 'RDU'], ['CVG', 'IAH'], ['PIA', 'DEN'], ['TUL', 'GJT'], ['MSP', 'SJC'], ['MSP', 'PIT'], ['CVG', 'STL'], ['BWI', 'RSW'], ['OMA', 'MSP'], ['CVG', 'TVC'], ['IAH', 'BOS'], ['STX', 'JAX'], ['SLC', 'YKM'], ['SEA', 'DTW'], ['TUL', 'PIA'], ['JFK', 'STT'], ['ATL', 'HDN'], ['MSP', 'SLC'], ['BOI', 'PIT'], ['RNO', 'SEA'], ['CRW', 'ATL'], ['MSY', 'MDW'], ['LAS', 'DFW'], ['MDW', 'ORF'], ['XNA', 'MEM'], ['IND', 'SEA'], ['SMF', 'MSP'], ['DEN', 'BZN'], ['MKE', 'DTW'], ['LGA', 'BHM'], ['ORD', 'SJC'], ['LAS', 'OAK'], ['AVL', 'ATL'], ['BDL', 'MDW'], ['ORD', 'SAV'], ['PHX', 'ORD'], ['SAN', 'ABQ'], ['DCA', 'FLL'], ['DCA', 'MCO'], ['BRW', 'FAI'], ['LAX', 'ELP'], ['ATL', 'PIT'], ['RIC', 'ATL'], ['SEA', 'SAN'], ['BHM', 'ORD'], ['SNA', 'SJC'], ['ATL', 'BTV'], ['CVG', 'BWI'], ['ORD', 'PNS'], ['RDU', 'SLC'], ['ATL', 'DHN'], ['EWR', 'GRR'], ['RSW', 'CLE'], ['RNO', 'GEG'], ['IAH', 'GRR'], ['DCA', 'SYR'], ['CLE', 'AUS'], ['GEG', 'MSP'], ['DAL', 'OKC'], ['MSY', 'IAH'], ['LGA', 'FNT'], ['CVG', 'MSN'], ['PHL', 'DCA'], ['TPA', 'PBI'], ['LRD', 'IAH'], ['LBB', 'IAH'], ['IAD', 'SLC'], ['PHX', 'MSP'], ['HPN', 'EWR'], ['MAF', 'ABQ'], ['OGG', 'SFO'], ['TRI', 'ATL'], ['TUS', 'DEN'], ['MSP', 'DTW'], ['FLL', 'BNA'], ['PVD', 'CLE'], ['STL', 'MIA'], ['ORD', 'GUC'], ['CRP', 'IAH'], ['SAV', 'CVG'], ['BTV', 'CVG'], ['TPA', 'IAD'], ['GEG', 'SEA'], ['DCA', 'CLE'], ['DSM', 'CLE'], ['TPA', 'ORF'], ['SNA', 'PHX'], ['PHX', 'PDX'], ['ABQ', 'BWI'], ['DFW', 'DAY'], ['FLL', 'MCO'], ['IAD', 'JAX'], ['CLT', 'SJU'], ['PIT', 'DTW'], ['RSW', 'CVG'], ['MDW', 'BUF'], ['MCO', 'STL'], ['HPN', 'RSW'], ['MIA', 'CMH'], ['IAD', 'DFW'], ['MSP', 'CMH'], ['BHM', 'HSV'], ['PHL', 'AUS'], ['SFO', 'CIC'], ['TYS', 'ATL'], ['BNA', 'CMH'], ['CHS', 'BOS'], ['LNK', 'LAN'], ['FSM', 'DFW'], ['OKC', 'MEM'], ['BOS', 'MEM'], ['IND', 'AUS'], ['DAL', 'AMA'], ['DFW', 'LAS'], ['HRL', 'IAH'], ['CAE', 'CVG'], ['TPA', 'BOS'], ['DEN', 'ATL'], ['SEA', 'TUS'], ['FSD', 'MSN'], ['ALB', 'MDW'], ['LAS', 'SAT'], ['ICT', 'ORD'], ['ICT', 'MEM'], ['BOS', 'SJC'], ['MCI', 'PDX'], ['ATL', 'LAW'], ['LAX', 'CLE'], ['MEM', 'LGA'], ['SFO', 'IAH'], ['LGA', 'ATL'], ['LAX', 'CVG'], ['CVG', 'SAT'], ['DEN', 'FSD'], ['LAS', 'IAH'], ['ABQ', 'MCI'], ['CVG', 'SBN'], ['SMF', 'TUS'], ['CVG', 'RSW'], ['DEN', 'MSY'], ['JAX', 'LAS'], ['BGR', 'EWR'], ['SAN', 'MSP'], ['RIC', 'DTW'], ['ORD', 'SGF'], ['CLE', 'MKE'], ['SLC', 'GJT'], ['CSG', 'ATL'], ['LGA', 'MYR'], ['JAC', 'LAX'], ['MFE', 'IAH'], ['SNA', 'ORD'], ['EWR', 'GSP'], ['SLC', 'WYS'], ['GTF', 'MSP'], ['IND', 'SRQ'], ['CLE', 'SAN'], ['GSO', 'RDU'], ['SFO', 'BOI'], ['DTW', 'RSW'], ['CAE', 'IAD'], ['AUS', 'MSP'], ['SAN', 'EWR'], ['MCI', 'CMH'], ['PHL', 'HOU'], ['SBA', 'SFO'], ['SLC', 'DTW'], ['ANC', 'OGG'], ['CHO', 'CVG'], ['BFL', 'DEN'], ['MKE', 'BWI'], ['ABE', 'CLT'], ['SEA', 'LIH'], ['SLC', 'MSO'], ['MEM', 'LEX'], ['SLC', 'DEN'], ['SEA', 'GEG'], ['DEN', 'DSM'], ['RNO', 'SAN'], ['ICT', 'STL'], ['DTW', 'SAT'], ['IAD', 'MSP'], ['SFO', 'HNL'], ['SMF', 'ABQ'], ['LIT', 'MCO'], ['RDU', 'MCO'], ['MCO', 'PIT'], ['MDW', 'ABQ'], ['MSP', 'DCA'], ['LAS', 'OKC'], ['PHX', 'BFL'], ['RNO', 'OAK'], ['GTF', 'BZN'], ['LGB', 'LAS'], ['LAS', 'FLL'], ['PHX', 'EWR'], ['SAN', 'DFW'], ['DTW', 'SRQ'], ['AUS', 'STL'], ['ATL', 'MGM'], ['LAX', 'PHL'], ['EGE', 'LGA'], ['HNL', 'MSP'], ['SFO', 'LAS'], ['BHM', 'BWI'], ['IAD', 'RDU'], ['PIT', 'BOS'], ['EWR', 'DEN'], ['BWI', 'EWR'], ['BWI', 'PVD'], ['PHX', 'MSY'], ['CLT', 'DFW'], ['SAT', 'STL'], ['CIC', 'SFO'], ['MEM', 'LAX'], ['SLC', 'BOS'], ['MKE', 'CWA'], ['EGE', 'ORD'], ['MSP', 'LAN'], ['PDX', 'SEA'], ['MSO', 'MSP'], ['MDW', 'OMA'], ['MHT', 'TPA'], ['ROC', 'CVG'], ['BUF', 'MDW'], ['SLC', 'BIL'], ['SLC', 'IAD'], ['LAS', 'RNO'], ['GRR', 'CVG'], ['ONT', 'MCI'], ['RHI', 'MSP'], ['MKE', 'FLL'], ['RIC', 'CLE'], ['PDX', 'DEN'], ['IAD', 'MCI'], ['GGG', 'DFW'], ['LGB', 'PHX'], ['BHM', 'LAS'], ['CLT', 'PHL'], ['CVG', 'PHX'], ['ROC', 'CLE'], ['ACK', 'JFK'], ['DEN', 'BOS'], ['JAN', 'CVG'], ['DFW', 'SJU'], ['DFW', 'MSY'], ['SAT', 'CLE'], ['DTW', 'RST'], ['FWA', 'MSP'], ['OGG', 'DEN'], ['MTJ', 'IAH'], ['DFW', 'MTJ'], ['ONT', 'OKC'], ['SLC', 'BFL'], ['DTW', 'BDL'], ['FAT', 'LAS'], ['SGF', 'MEM'], ['SBP', 'SFO'], ['BHM', 'BNA'], ['JFK', 'ROC'], ['DCA', 'PIT'], ['BUF', 'CLT'], ['MEM', 'MSN'], ['RDU', 'ORD'], ['ATL', 'MDT'], ['DFW', 'SPS'], ['MIA', 'DCA'], ['ATL', 'AGS'], ['CHS', 'MEM'], ['JAX', 'LGA'], ['BUF', 'MCO'], ['ATL', 'ANC'], ['HDN', 'SLC'], ['SAN', 'COS'], ['TYS', 'IAH'], ['LAS', 'SBA'], ['MCO', 'TYS'], ['MYR', 'IAD'], ['GSO', 'ATL'], ['DCA', 'CVG'], ['CVG', 'MIA'], ['EUG', 'SLC'], ['BWI', 'SLC'], ['PVD', 'MDW'], ['FLL', 'CLE'], ['SMF', 'PDX'], ['FLG', 'PHX'], ['FLL', 'PHX'], ['IAD', 'BTV'], ['FAR', 'LAN'], ['ORF', 'MEM'], ['SGF', 'BNA'], ['MIA', 'EGE'], ['CMH', 'DTW'], ['ORD', 'TPA'], ['DCA', 'RSW'], ['MLB', 'ATL'], ['GRK', 'ATL'], ['ATL', 'RSW'], ['MDT', 'CVG'], ['HNL', 'SAN'], ['GEG', 'SLC'], ['PIT', 'SJU'], ['DTW', 'MDW'], ['DTW', 'ROA'], ['CHA', 'MEM'], ['LAS', 'SEA'], ['CVG', 'GSO'], ['MDT', 'ATL'], ['PBI', 'DTW'], ['SAN', 'MRY'], ['MCO', 'CMH'], ['LIT', 'IAH'], ['SYR', 'FLL'], ['ALB', 'BWI'], ['TPA', 'SJU'], ['MEM', 'ATL'], ['TYS', 'DFW'], ['LGA', 'CID'], ['MSP', 'GSO'], ['MIA', 'MDW'], ['GRR', 'DTW'], ['ONT', 'SMF'], ['HNL', 'IAH'], ['ONT', 'SJC'], ['LGA', 'DAB'], ['PHX', 'SLC'], ['FSM', 'ATL'], ['ICT', 'PHX'], ['CLT', 'ILM'], ['CLE', 'LAS'], ['TPA', 'MEM'], ['CVG', 'CRW'], ['STL', 'FLL'], ['SEA', 'MEM'], ['RIC', 'LGA'], ['PHX', 'BHM'], ['ORD', 'RIC'], ['DEN', 'CVG'], ['ATL', 'CRP'], ['TUS', 'MSP'], ['FAR', 'SLC'], ['MSP', 'OMA'], ['CVG', 'LEX'], ['MCO', 'JAN'], ['FAR', 'STL'], ['RDU', 'DFW'], ['ATL', 'GTR'], ['STL', 'SLC'], ['SAT', 'ONT'], ['TYS', 'MEM'], ['MSP', 'PVD'], ['ABQ', 'MSP'], ['MCI', 'COS'], ['GEG', 'LAX'], ['SFO', 'PSP'], ['JFK', 'CVG'], ['BUF', 'FLL'], ['MTJ', 'LAX'], ['LAX', 'MEM'], ['FLL', 'ROC'], ['GSP', 'DFW'], ['SGF', 'DEN'], ['MSP', 'DAY'], ['CLT', 'DCA'], ['LAX', 'ANC'], ['BOS', 'SAN'], ['LAX', 'IAD'], ['OGG', 'HNL'], ['MEM', 'RIC'], ['LAX', 'SGU'], ['MCI', 'BNA'], ['ATW', 'CVG'], ['MSP', 'EGE'], ['BDL', 'FLL'], ['OAK', 'BNA'], ['DAB', 'LGA'], ['CLE', 'DEN'], ['TUL', 'ORD'], ['MCO', 'MDW'], ['DTW', 'SYR'], ['LBB', 'LAS'], ['IAD', 'TUS'], ['IPL', 'LAX'], ['DCA', 'CMH'], ['SNA', 'LIH'], ['FLL', 'PHF'], ['OMA', 'SAN'], ['MSP', 'DLH'], ['FLL', 'MDW'], ['CVG', 'TRI'], ['PHL', 'MKE'], ['HNL', 'SNA'], ['LGA', 'DSM'], ['PDX', 'DFW'], ['MSP', 'MSO'], ['CVG', 'LAN'], ['PHL', 'MCO'], ['DTW', 'DFW'], ['CVG', 'SYR'], ['JFK', 'IAH'], ['GTR', 'ATL'], ['FLL', 'GPT'], ['TOL', 'CVG'], ['ATL', 'ASE'], ['SWF', 'DTW'], ['SAN', 'OKC'], ['AMA', 'DAL'], ['JNU', 'SIT'], ['OGG', 'ANC'], ['BNA', 'DTW'], ['GCC', 'SLC'], ['IAD', 'BOS'], ['DSM', 'ORF'], ['GRB', 'GTF'], ['ONT', 'ABQ'], ['IAH', 'DTW'], ['SLC', 'MCI'], ['LAS', 'CLT'], ['IDA', 'MSP'], ['MSP', 'PWM'], ['BWI', 'SEA'], ['RFD', 'DEN'], ['HPN', 'CVG'], ['MIA', 'GSO'], ['ABE', 'CVG'], ['SLC', 'BLI'], ['MKE', 'DCA'], ['STT', 'EWR'], ['SEA', 'LGB'], ['MFR', 'DEN'], ['PHX', 'SDF'], ['DAY', 'TPA'], ['SAT', 'EWR'], ['ATL', 'TUL'], ['MSP', 'RHI'], ['EWR', 'JAN'], ['EWR', 'DAB'], ['GSO', 'CLT'], ['SJU', 'IAD'], ['SAN', 'MCI'], ['IAH', 'CLE'], ['OMA', 'LAS'], ['PUB', 'COS'], ['HOU', 'SAN'], ['EUG', 'SFO'], ['BIS', 'MSP'], ['GPT', 'FLL'], ['AUS', 'EWR'], ['SLC', 'TUL'], ['ORD', 'LNK'], ['LWS', 'SLC'], ['MFR', 'MOD'], ['IAD', 'SAT'], ['OTZ', 'OME'], ['CLE', 'MIA'], ['ATL', 'GPT'], ['ELM', 'DTW'], ['LAX', 'KOA'], ['ALB', 'SBN'], ['SAN', 'OGG'], ['PHL', 'MEM'], ['SMF', 'IAH'], ['ALB', 'BOS'], ['CVG', 'AVL'], ['KTN', 'SIT'], ['MKE', 'RSW'], ['OMA', 'ONT'], ['JAN', 'EWR'], ['MLI', 'DTW'], ['DTW', 'LAX'], ['SLC', 'DRO'], ['MEM', 'SEA'], ['BHM', 'DFW'], ['IAD', 'DEN'], ['LGA', 'SAV'], ['LIT', 'MDW'], ['MIA', 'BNA'], ['PHL', 'BDL'], ['BDL', 'ATL'], ['CMH', 'GRB'], ['PSP', 'PDX'], ['DEN', 'JAX'], ['SFO', 'ASE'], ['GRR', 'ORD'], ['DTW', 'OKC'], ['FLL', 'ISP'], ['DFW', 'SLC'], ['DEN', 'BTR'], ['ATL', 'BQK'], ['MSP', 'MYR'], ['IAH', 'PHL'], ['MRY', 'LAS'], ['GSP', 'EWR'], ['LSE', 'ORD'], ['PBI', 'BOS'], ['ORD', 'IND'], ['ATL', 'TUS'], ['LAS', 'ELP'], ['SBA', 'DEN'], ['LAX', 'SLC'], ['DEN', 'GCC'], ['SNA', 'ATL'], ['DFW', 'PIA'], ['MSY', 'SLC'], ['DLG', 'ANC'], ['MTJ', 'SLC'], ['JFK', 'JAX'], ['DEN', 'SFO'], ['HRL', 'SAT'], ['EWR', 'DFW'], ['BOS', 'BTV'], ['OKC', 'ABQ'], ['FLL', 'PIT'], ['HNL', 'SMF'], ['MOB', 'IAH'], ['ORD', 'TVC'], ['DTW', 'TUL'], ['MDW', 'BDL'], ['TXK', 'DFW'], ['CHS', 'CVG'], ['MDW', 'CLE'], ['MSN', 'ORD'], ['SWF', 'MCO'], ['PDX', 'GEG'], ['CLE', 'RDU'], ['ATL', 'DAY'], ['SAT', 'TPA'], ['EUG', 'RDM'], ['CVG', 'AVP'], ['LAW', 'ATL'], ['CLT', 'MSY'], ['PHX', 'MCO'], ['MCO', 'HPN'], ['MCO', 'ABQ'], ['ORD', 'JAC'], ['DTW', 'GRB'], ['BNA', 'SEA'], ['ORD', 'SLC'], ['LAS', 'AMA'], ['HOU', 'OKC'], ['XNA', 'ORD'], ['ABQ', 'SLC'], ['LEX', 'ORD'], ['LGA', 'IAH'], ['MEM', 'ICT'], ['RDM', 'DEN'], ['MSP', 'BOI'], ['DFW', 'TUS'], ['MTJ', 'ATL'], ['SLC', 'BTM'], ['ORD', 'BWI'], ['DAY', 'DFW'], ['MSN', 'DTW'], ['PIT', 'MKE'], ['DEN', 'BIS'], ['BOI', 'RNO'], ['HDN', 'JFK'], ['MSY', 'DTW'], ['LIT', 'MSP'], ['PWM', 'CVG'], ['SAT', 'MDW'], ['MKE', 'RDU'], ['SFO', 'DEN'], ['HSV', 'CVG'], ['BWI', 'MDW'], ['ONT', 'GEG'], ['ABE', 'ATL'], ['LIH', 'SNA'], ['CAE', 'IAH'], ['SFO', 'SJC'], ['ORD', 'MLI'], ['BHM', 'DTW'], ['SJC', 'MDW'], ['BNA', 'IAD'], ['ATL', 'ACY'], ['SAN', 'TUL'], ['DEN', 'MDW'], ['SLC', 'FAT'], ['GSP', 'MCO'], ['MCO', 'EYW'], ['MEM', 'MOB'], ['BTV', 'ATL'], ['ABQ', 'ONT'], ['IAH', 'HOU'], ['HDN', 'DEN'], ['HNL', 'PHX'], ['IAH', 'SMF'], ['CVG', 'DAB'], ['LAX', 'RDU'], ['ONT', 'SFO'], ['ONT', 'FAT'], ['SAT', 'AUS'], ['MTJ', 'EWR'], ['MCO', 'PHL'], ['COS', 'ORD'], ['TUS', 'SFO'], ['SLC', 'IAH'], ['DEN', 'MSP'], ['SEA', 'SNA'], ['LNK', 'DTW'], ['SLC', 'LWS'], ['BOI', 'PDX'], ['LAS', 'IAD'], ['CLD', 'LAX'], ['CVG', 'DSM'], ['CAE', 'LGA'], ['ORD', 'MSY'], ['SJC', 'SFO'], ['DEN', 'PBI'], ['RSW', 'DCA'], ['IAH', 'AGS'], ['AUS', 'MAF'], ['JAX', 'DEN'], ['MEM', 'ORD'], ['DFW', 'MIA'], ['OMA', 'CLE'], ['DFW', 'ABQ'], ['BTV', 'MSP'], ['RSW', 'MCO'], ['CID', 'CVG'], ['DEN', 'CLT'], ['DEN', 'BUR'], ['PBI', 'TPA'], ['PFN', 'ATL'], ['MEM', 'JAX'], ['STL', 'BNA'], ['PHL', 'ALB'], ['TPA', 'ISP'], ['HOU', 'LAX'], ['DFW', 'JAX'], ['DAL', 'AUS'], ['HSV', 'IAH'], ['EWR', 'SRQ'], ['SFO', 'SAN'], ['AUS', 'SEA'], ['BOS', 'CLT'], ['ATL', 'EWR'], ['ORD', 'DAY'], ['RIC', 'MEM'], ['EWR', 'MSN'], ['IAD', 'SMF'], ['FSD', 'SDF'], ['DCA', 'ALB'], ['ORD', 'CHS'], ['OAK', 'PHX'], ['EWR', 'HDN'], ['ORD', 'SNA'], ['OAK', 'IAH'], ['TPA', 'LAX'], ['GRR', 'LGA'], ['GSO', 'CVG'], ['KOA', 'SFO'], ['JFK', 'PSE'], ['ELP', 'ATL'], ['LAS', 'MIA'], ['MDW', 'BNA'], ['PSP', 'DEN'], ['DLH', 'DTW'], ['DFW', 'BHM'], ['CLT', 'PVD'], ['DEN', 'DAY'], ['DFW', 'PIT'], ['OXR', 'LAX'], ['ABQ', 'OAK'], ['HOU', 'FLL'], ['JFK', 'BUR'], ['SHV', 'DFW'], ['BNA', 'JAX'], ['JAX', 'DTW'], ['PHL', 'ATW'], ['DCA', 'LGA'], ['CVG', 'DEN'], ['JAX', 'BWI'], ['LIT', 'HOU'], ['DEN', 'SDF'], ['ORD', 'MOB'], ['MCO', 'LGA'], ['BNA', 'SAN'], ['CLT', 'OAJ'], ['SFO', 'MEM'], ['IND', 'MSP'], ['FCA', 'ATL'], ['SAT', 'PHL'], ['DFW', 'LFT'], ['RDM', 'PDX'], ['MIA', 'BDL'], ['STL', 'LGA'], ['ALB', 'ORD'], ['BOI', 'SAN'], ['ROC', 'FLL'], ['EWR', 'BOS'], ['CAE', 'ATL'], ['DSM', 'CVG'], ['ORD', 'BNA'], ['CLT', 'PNS'], ['YUM', 'SLC'], ['BDL', 'TPA'], ['LAX', 'SAN'], ['LAS', 'MHT'], ['CLT', 'PHX'], ['BWI', 'JAX'], ['AMA', 'DEN'], ['DFW', 'ATL'], ['RSW', 'MCI'], ['CLE', 'DSM'], ['MSP', 'TVC'], ['ORD', 'FLL'], ['GPT', 'MEM'], ['RSW', 'BDL'], ['ORD', 'BIL'], ['SLC', 'PIT'], ['FLL', 'MIA'], ['BWI', 'MCI'], ['EWR', 'SFO'], ['BZN', 'ORD'], ['CVG', 'MHT'], ['CID', 'DTW'], ['HOU', 'MDW'], ['DCA', 'DSM'], ['IAH', 'OMA'], ['KOA', 'DEN'], ['MDW', 'SRQ'], ['SMF', 'SLC'], ['CVG', 'SFO'], ['MCO', 'MSP'], ['MSY', 'AUS'], ['PHL', 'RDU'], ['GUC', 'ATL'], ['TYS', 'MSP'], ['SLC', 'GEG'], ['SAN', 'BFL'], ['EVV', 'STL'], ['SRQ', 'IAH'], ['LFT', 'ATL'], ['LEX', 'CLE'], ['JAX', 'ORF'], ['SHV', 'ATL'], ['FLO', 'ATL'], ['MIA', 'DTW'], ['LAS', 'TUS'], ['DFW', 'EWR'], ['MCO', 'DAY'], ['RSW', 'IAH'], ['PIT', 'MCI'], ['MHT', 'ORD'], ['SNA', 'SEA'], ['LAX', 'STL'], ['SFO', 'BFL'], ['CLT', 'EGE'], ['ORD', 'STL'], ['BOS', 'SEA'], ['KOA', 'HNL'], ['LAS', 'ONT'], ['PHL', 'CMH'], ['DTW', 'BZN'], ['DAY', 'IAD'], ['ATL', 'SJU'], ['LAX', 'PIT'], ['EWR', 'MSP'], ['ATL', 'BTR'], ['SNA', 'HNL'], ['DTW', 'MSY'], ['MEM', 'TPA'], ['ATL', 'TUP'], ['OKC', 'ORD'], ['LAX', 'GJT'], ['PHL', 'PHX'], ['AUS', 'TUL'], ['IAD', 'BHM'], ['ORD', 'SHV'], ['FNT', 'DFW'], ['MLI', 'DFW'], ['MDT', 'CLT'], ['RNO', 'LAS'], ['SLC', 'BHM'], ['ORD', 'MBS'], ['LAS', 'PSP'], ['TUS', 'SAT'], ['JAX', 'ATL'], ['ATL', 'SFO'], ['DTW', 'GRR'], ['SAV', 'BOS'], ['DEN', 'XNA'], ['TUS', 'RNO'], ['RIC', 'MIA'], ['CHS', 'SAV'], ['EGE', 'CLT'], ['SRQ', 'ATL'], ['SFO', 'MSP'], ['LAX', 'SBA'], ['JAX', 'RDU'], ['DCA', 'LAS'], ['DTW', 'DAY'], ['DFW', 'PDX'], ['DFW', 'ICT'], ['DCA', 'MSP'], ['LAX', 'SBP'], ['GRR', 'DCA'], ['HNL', 'LAS'], ['PNS', 'FLL'], ['DTW', 'CHA'], ['PHL', 'ATL'], ['LIT', 'ORD'], ['ORD', 'CMH'], ['DEN', 'TUS'], ['PDX', 'CVG'], ['CVG', 'TUL'], ['LAS', 'ANC'], ['IAH', 'OAK'], ['IAH', 'JFK'], ['CLE', 'LEX'], ['ATL', 'JAN'], ['HSV', 'TUS'], ['SAT', 'IAH'], ['LGA', 'RIC'], ['CLE', 'EWR'], ['DTW', 'HSV'], ['SEA', 'OAK'], ['OAK', 'SMF'], ['MIA', 'MSY'], ['MCI', 'OAK'], ['DFW', 'CLE'], ['ATL', 'SHV'], ['CVG', 'SLC'], ['ATL', 'BOS'], ['BOS', 'MIA'], ['JFK', 'RIC'], ['TPA', 'EWR'], ['DTW', 'STL'], ['PIT', 'PHX'], ['LGB', 'ORD'], ['ORD', 'GSP'], ['MCO', 'EWR'], ['MSP', 'OKC'], ['DEN', 'CID'], ['AUS', 'ONT'], ['HOU', 'JFK'], ['IAD', 'CLT'], ['BZN', 'SLC'], ['FCA', 'ORD'], ['SNA', 'KOA'], ['CVG', 'BTV'], ['SEA', 'IAD'], ['DTW', 'LAN'], ['CLT', 'SAT'], ['DEN', 'HLN'], ['ELP', 'ORD'], ['LAS', 'ATL'], ['GSO', 'ORD'], ['JAX', 'BOS'], ['BIL', 'ORD'], ['EWR', 'DAY'], ['PHX', 'PIT'], ['MEM', 'TLH'], ['MCO', 'ALB'], ['ABQ', 'DAL'], ['PBI', 'PHL'], ['TPA', 'RDU'], ['TPA', 'ORD'], ['ORD', 'HNL'], ['TUS', 'SLC'], ['SLE', 'TWF'], ['MCI', 'OKC'], ['BWI', 'LAX'], ['LGA', 'BOS'], ['ATL', 'GRK'], ['SEA', 'LAS'], ['CLT', 'MIA'], ['PWM', 'DTW'], ['IAH', 'ICT'], ['MSP', 'RAP'], ['TPA', 'HPN'], ['DCA', 'CLT'], ['MSP', 'BJI'], ['DTW', 'ICT'], ['STT', 'MIA'], ['BUF', 'ORD'], ['DSM', 'DTW'], ['ORD', 'LSE'], ['PHL', 'SMF'], ['PIT', 'RSW'], ['IAD', 'LGB'], ['MCI', 'CLE'], ['XNA', 'RFD'], ['OAK', 'KOA'], ['MEM', 'MCI'], ['MKE', 'TPA'], ['EWR', 'CAE'], ['DTW', 'ORD'], ['ORD', 'SAT'], ['OGG', 'LIH'], ['PDX', 'ABQ'], ['MSY', 'BWI'], ['BUR', 'IAD'], ['OMA', 'LNK'], ['CMI', 'ORD'], ['CVG', 'PVD'], ['SFO', 'DTW'], ['SJC', 'BFL'], ['MEM', 'SAV'], ['EGE', 'DFW'], ['JAX', 'AUS'], ['CLE', 'IAH'], ['MIA', 'MEM'], ['DFW', 'RSW'], ['ATL', 'MLI'], ['MFR', 'LAS'], ['MFE', 'ATL'], ['DSM', 'MEM'], ['HPN', 'ORD'], ['CLT', 'IAD'], ['DFW', 'BTR'], ['PBI', 'IAH'], ['GJT', 'SLC'], ['EWR', 'ATL'], ['ATL', 'XNA'], ['OAK', 'SAN'], ['SJU', 'TPA'], ['SEA', 'HNL'], ['RAP', 'SLC'], ['ROA', 'DTW'], ['LIH', 'SEA'], ['IAH', 'HDN'], ['IAH', 'GPT'], ['SLC', 'HDN'], ['ATL', 'HSV'], ['ATL', 'EYW'], ['LAS', 'PHX'], ['ALB', 'EWR'], ['FLL', 'BDL'], ['LAS', 'LGB'], ['ONT', 'SAT'], ['PHX', 'RNO'], ['VPS', 'DFW'], ['RIC', 'MCO'], ['KOA', 'OGG'], ['CVG', 'TPA'], ['LCH', 'IAH'], ['RNO', 'SNA'], ['DAY', 'ORD'], ['MEM', 'BWI'], ['AUS', 'LGB'], ['MCO', 'MLI'], ['SLC', 'SLE'], ['ACV', 'MRY'], ['IAH', 'MCO'], ['CLT', 'MSP'], ['BWI', 'MSP'], ['LIT', 'SLC'], ['AMA', 'DFW'], ['PLN', 'DCA'], ['SNA', 'DEN'], ['ORD', 'AZO'], ['PDX', 'PHL'], ['DEN', 'ORD'], ['RIC', 'FLL'], ['PHL', 'SAT'], ['ORD', 'RNO'], ['DFW', 'SHV'], ['LGB', 'JFK'], ['MSP', 'DEN'], ['STL', 'SRQ'], ['LIT', 'DAL'], ['MFR', 'PDX'], ['HOU', 'AUS'], ['CLT', 'CLE'], ['SFO', 'SEA'], ['DCA', 'JAN'], ['MSY', 'LAS'], ['PVD', 'DTW'], ['SFO', 'PHL'], ['SAV', 'DTW'], ['DAY', 'MSP'], ['SBN', 'MSP'], ['STL', 'OKC'], ['SLC', 'BWI'], ['CLT', 'SEA'], ['MYR', 'ILM'], ['EWR', 'LAS'], ['PHF', 'BOS'], ['ANC', 'DEN'], ['DAL', 'ABQ'], ['LAX', 'ORD'], ['MCO', 'CLE'], ['MSP', 'BDL'], ['PHL', 'TPA'], ['AUS', 'MCO'], ['AUS', 'HRL'], ['SEA', 'ORD'], ['MSP', 'SUX'], ['AGS', 'CLT'], ['SDF', 'TPA'], ['PHX', 'CLD'], ['GSP', 'LGA'], ['SAV', 'DFW'], ['PHX', 'BOI'], ['TPA', 'MDW'], ['CLT', 'ORD'], ['MKG', 'GRR'], ['FSM', 'MEM'], ['GUC', 'SLC'], ['DFW', 'STL'], ['ATL', 'MLB'], ['MRY', 'SAN'], ['MCO', 'PVD'], ['PHL', 'SYR'], ['PWM', 'BWI'], ['ATL', 'DCA'], ['LGA', 'CAK'], ['FNT', 'TPA'], ['ELP', 'LBB'], ['SJC', 'BUR'], ['OGG', 'SAN'], ['MCO', 'JFK'], ['TVC', 'MSP'], ['ONT', 'AUS'], ['OAK', 'ATL'], ['ACV', 'SMF'], ['CLE', 'PHL'], ['ONT', 'GJT'], ['DFW', 'CLT'], ['LAX', 'BZN'], ['SLC', 'EKO'], ['MDW', 'SLC'], ['BNA', 'PHX'], ['MCO', 'ATL'], ['SMF', 'LGB'], ['AZO', 'FAR'], ['TYS', 'EWR'], ['BWI', 'DAB'], ['DTW', 'LNK'], ['MCO', 'BWI'], ['IYK', 'PSP'], ['TPA', 'BDL'], ['SLC', 'RNO'], ['CLE', 'OMA'], ['PHX', 'FLL'], ['BNA', 'ORD'], ['ATL', 'PHL'], ['PHL', 'AVP'], ['CLT', 'SRQ'], ['BNA', 'CVG'], ['BWI', 'BHM'], ['ABE', 'CLE'], ['ANC', 'SLC'], ['LGA', 'CLT'], ['MCO', 'ORF'], ['FNT', 'MKG'], ['PHX', 'ONT'], ['MEM', 'TUL'], ['LAX', 'IYK'], ['MCO', 'CAK'], ['STL', 'AUS'], ['CMH', 'ORD'], ['GSP', 'MEM'], ['DAL', 'HRL'], ['PHX', 'COS'], ['SAN', 'MKE'], ['ICT', 'SLC'], ['ORD', 'PHX'], ['AUS', 'ELP'], ['ANC', 'PHX'], ['MOB', 'DFW'], ['ATL', 'VLD'], ['DFW', 'COS'], ['SLC', 'SAT'], ['CVG', 'AUS'], ['MCO', 'LEX'], ['JFK', 'RSW'], ['ATL', 'OAK'], ['LGA', 'IAD'], ['MSN', 'EWR'], ['ORD', 'SFO'], ['BWI', 'ISP'], ['TPA', 'PNS'], ['ORD', 'DEN'], ['EWR', 'SYR'], ['SDF', 'IAH'], ['PHL', 'LAS'], ['BWI', 'ROC'], ['ORD', 'DCA'], ['IAH', 'VPS'], ['ATL', 'SLC'], ['OKC', 'LAS'], ['MYR', 'MSP'], ['HOU', 'BWI'], ['IAH', 'CLT'], ['EWR', 'BHM'], ['SLC', 'FAR'], ['PBI', 'ISP'], ['MSP', 'HNL'], ['CLT', 'FLL'], ['LAX', 'TPA'], ['PWM', 'EWR'], ['DCA', 'JFK'], ['MIA', 'BOS'], ['CLE', 'MSN'], ['DTW', 'BGM'], ['DFW', 'SAN'], ['DAB', 'CLE'], ['IAH', 'HRL'], ['CAK', 'MCO'], ['DEN', 'EWR'], ['SLC', 'HLN'], ['TUL', 'SAN'], ['HOU', 'JAX'], ['ORD', 'ATL'], ['MCI', 'FLL'], ['HPN', 'MCO'], ['MCI', 'STL'], ['PIA', 'ATL'], ['ICT', 'DFW'], ['SLC', 'TPA'], ['MCO', 'PNS'], ['SLC', 'LGA'], ['TPA', 'JFK'], ['ORD', 'PSP'], ['SFO', 'FCA'], ['DFW', 'LRD'], ['PHL', 'BNA'], ['MDW', 'LAX'], ['CLT', 'LAS'], ['DAL', 'IAH'], ['CLE', 'ORD'], ['FAT', 'DEN'], ['CID', 'ORD'], ['SFO', 'GJT'], ['YUM', 'GJT'], ['SNA', 'RNO'], ['BIL', 'MSP'], ['LAX', 'BOI'], ['LAX', 'SJC'], ['SAN', 'PHL'], ['TPA', 'TLH'], ['LAX', 'DCA'], ['SAT', 'MCO'], ['BDL', 'MKE'], ['XNA', 'DTW'], ['CAK', 'DEN'], ['STL', 'MKE'], ['CLE', 'BWI'], ['TPA', 'STL'], ['MIA', 'RIC'], ['SFO', 'SMF'], ['SBP', 'MRY'], ['MSY', 'JAX'], ['SLC', 'SDF'], ['SDF', 'PHL'], ['LGA', 'DCA'], ['ROC', 'MCO'], ['MEM', 'SAT'], ['AUS', 'PHL'], ['DTW', 'SEA'], ['GCC', 'RKS'], ['MEM', 'PNS'], ['BIL', 'DEN'], ['MCI', 'CVG'], ['LAS', 'PHL'], ['ALB', 'DTW'], ['DEN', 'LNK'], ['MSP', 'MKE'], ['EWR', 'TPA'], ['EWR', 'SJC'], ['IDA', 'SLC'], ['MCI', 'DAL'], ['DTW', 'BTV'], ['RDU', 'LAS'], ['SJC', 'DFW'], ['SFO', 'DFW'], ['ORD', 'SAN'], ['MAF', 'HOU'], ['PHL', 'IAH'], ['BUF', 'IAD'], ['IAH', 'CRP'], ['PVD', 'MCO'], ['MSN', 'MSP'], ['BUF', 'DTW'], ['STL', 'DFW'], ['MSO', 'ORD'], ['ROA', 'CLT'], ['DAB', 'MCO'], ['LAN', 'CVG'], ['ABQ', 'ELP'], ['EGE', 'ATL'], ['CLE', 'MHT'], ['DTW', 'TYS'], ['CMH', 'JFK'], ['CVG', 'TYS'], ['STL', 'MEM'], ['STL', 'DAL'], ['ATL', 'FLL'], ['LAX', 'MRY'], ['AUS', 'LAS'], ['ORF', 'TPA'], ['CLT', 'MDW'], ['ANC', 'BET'], ['AUS', 'SAN'], ['RAP', 'MSP'], ['STL', 'BOS'], ['MDT', 'AVP'], ['MHT', 'ATL'], ['SDF', 'BOS'], ['MKE', 'SDF'], ['SFO', 'OGG'], ['DSM', 'LNK'], ['FSD', 'ATL'], ['SFO', 'SBP'], ['GEG', 'BOI'], ['IAH', 'MSY'], ['DCA', 'SEA'], ['DFW', 'JAC'], ['LAX', 'GEG'], ['DEN', 'DFW'], ['LGA', 'RSW'], ['ORD', 'CLT'], ['MEM', 'RDU'], ['DEN', 'LGA'], ['AVL', 'MCO'], ['IAH', 'MOB'], ['IAH', 'LCH'], ['AUS', 'CLE'], ['BNA', 'BHM'], ['MSP', 'CID'], ['ONT', 'BOI'], ['MEM', 'FLL'], ['RNO', 'BOI'], ['LAX', 'MKE'], ['OKC', 'MSP'], ['ORD', 'LAS'], ['PDX', 'DTW'], ['IAH', 'ORF'], ['ICT', 'SGF'], ['PHX', 'KOA'], ['BOI', 'OAK'], ['DFW', 'HSV'], ['ORD', 'TYS'], ['CRW', 'CVG'], ['PDX', 'JFK'], ['ALB', 'CVG'], ['MKG', 'MKE'], ['DSM', 'MKE'], ['MEM', 'GRR'], ['ANC', 'OTZ'], ['EWR', 'MCO'], ['RDU', 'MSP'], ['MDW', 'DEN'], ['BHM', 'DAL'], ['PHX', 'CMH'], ['DEN', 'GUC'], ['SJU', 'BDL'], ['MKG', 'FNT'], ['MSY', 'CVG'], ['RSW', 'CAK'], ['TUS', 'IAD'], ['STL', 'MDW'], ['TWF', 'SUN'], ['ASE', 'PHX'], ['RSW', 'ISP'], ['ROW', 'DFW'], ['BNA', 'DEN'], ['BWI', 'LGA'], ['OKC', 'AUS'], ['CLE', 'FLL'], ['MCI', 'SAT'], ['AUS', 'FLL'], ['SBA', 'LAX'], ['SJU', 'PHL'], ['LAX', 'DEN'], ['SJC', 'ATL'], ['ATL', 'AVL'], ['WRG', 'KTN'], ['CMH', 'MIA'], ['ATL', 'MLU'], ['MKE', 'OMA'], ['DFW', 'IND'], ['SLC', 'OGG'], ['MCI', 'SLC'], ['ALO', 'MSP'], ['DSM', 'CWA'], ['FLL', 'LGA'], ['CLT', 'ALB'], ['DFW', 'GSP'], ['PVD', 'MSP'], ['SLC', 'MTJ'], ['LGA', 'STT'], ['CHA', 'DFW'], ['SDF', 'MEM'], ['MEM', 'MSY'], ['AUS', 'TUS'], ['MDW', 'DTW'], ['TPA', 'PIT'], ['MCI', 'ICT'], ['CDC', 'SLC'], ['BFL', 'LAS'], ['RNO', 'MDW'], ['ANC', 'DFW'], ['FLL', 'MCI'], ['FLL', 'CAK'], ['GNV', 'ATL'], ['SEA', 'SFO'], ['CRW', 'IAH'], ['MCO', 'SEA'], ['CVG', 'BHM'], ['EWR', 'MHT'], ['OKC', 'SAT'], ['LAX', 'LAS'], ['PHF', 'TPA'], ['BOS', 'CHS'], ['IAH', 'TPA'], ['AUS', 'DEN'], ['DFW', 'CMI'], ['CLT', 'SAV'], ['MCO', 'BOS'], ['LAX', 'MSY'], ['MSP', 'JAX'], ['AUS', 'LAX'], ['SBA', 'SLC'], ['BOI', 'ATW'], ['AUS', 'LBB'], ['ATL', 'ILM'], ['SAV', 'CHS'], ['OGG', 'SMF'], ['EWR', 'TUL'], ['DTW', 'MBS'], ['RDU', 'JFK'], ['BNA', 'EWR'], ['DTW', 'MSP'], ['MEM', 'PHX'], ['BTR', 'IAH'], ['SLC', 'IDA'], ['DCA', 'PBI'], ['BNA', 'PVD'], ['SJC', 'PDX'], ['MSP', 'SAV'], ['SAV', 'MSP'], ['ABQ', 'CVG'], ['DEN', 'MEM'], ['OMA', 'ABQ'], ['CMH', 'PBI'], ['HNL', 'DFW'], ['LAS', 'DEN'], ['OAK', 'LAX'], ['EGE', 'EWR'], ['XNA', 'LGA'], ['MSN', 'DEN'], ['LAS', 'MRY'], ['MCO', 'RDU'], ['MDW', 'AUS'], ['RDU', 'LAX'], ['FLL', 'DFW'], ['CLL', 'IAH'], ['EWN', 'ATL'], ['TPA', 'BHM'], ['ISP', 'BWI'], ['LAX', 'IND'], ['MKE', 'ORD'], ['ATL', 'HNL'], ['MEM', 'CMH'], ['CLT', 'MCI'], ['BOS', 'MKE'], ['SLC', 'MSP'], ['MKE', 'MEM'], ['IAD', 'PVD'], ['SFO', 'MOD'], ['OMA', 'MKE'], ['AUS', 'SJC'], ['JAN', 'DFW'], ['CLE', 'BNA'], ['PHX', 'BNA'], ['PIA', 'DFW'], ['ORD', 'BUF'], ['SMF', 'RDD'], ['BHM', 'CVG'], ['CLT', 'RSW'], ['MSO', 'SLC'], ['LAS', 'MCI'], ['PHL', 'BOS'], ['LGA', 'IND'], ['ATL', 'CRW'], ['MLI', 'DEN'], ['XNA', 'RDU'], ['HNL', 'PDX'], ['GSP', 'IAD'], ['IAH', 'LFT'], ['JAN', 'MDW'], ['PDX', 'IAD'], ['PHL', 'CLT'], ['PVD', 'PHL'], ['MCI', 'MIA'], ['PNS', 'CLT'], ['BWI', 'DAY'], ['IAH', 'XNA'], ['HOU', 'BNA'], ['BWI', 'PBI'], ['MEM', 'CVG'], ['DFW', 'OKC'], ['BFL', 'SFO'], ['ATL', 'SEA'], ['EWR', 'ORD'], ['DFW', 'SDF'], ['CVG', 'LIT'], ['AZO', 'CVG'], ['CVG', 'BDL'], ['MSN', 'CVG'], ['MCO', 'LAX'], ['PHX', 'MIA'], ['BOS', 'PIT'], ['RSW', 'BOS'], ['EWR', 'TUS'], ['LGA', 'CAE'], ['BGR', 'BOS'], ['DEN', 'SJC'], ['BNA', 'HOU'], ['RDU', 'MEM'], ['PHX', 'SNA'], ['ATL', 'ELP'], ['PVD', 'CLT'], ['ORD', 'MCO'], ['GSO', 'IAH'], ['IAH', 'EWR'], ['BDL', 'CLT'], ['ROC', 'IAD'], ['BNA', 'ONT'], ['MCO', 'DFW'], ['ELP', 'PHX'], ['EWR', 'XNA'], ['ATL', 'MFE'], ['LGB', 'FAT'], ['OMA', 'ATW'], ['MKE', 'MCI'], ['TUL', 'AUS'], ['IND', 'JAX'], ['EWR', 'LIT'], ['OAK', 'BUR'], ['RKS', 'DEN'], ['PSP', 'ONT'], ['DFW', 'ABI'], ['MCI', 'BWI'], ['CLE', 'OKC'], ['SAT', 'ELP'], ['ISP', 'MDW'], ['SFO', 'RDM'], ['ATL', 'DAB'], ['STX', 'CLT'], ['TPA', 'BWI'], ['CVG', 'ROC'], ['TYS', 'DTW'], ['TUL', 'STL'], ['OKC', 'EWR'], ['MEI', 'ATL'], ['BFL', 'PHX'], ['SGF', 'ORD'], ['DEN', 'TYS'], ['SJU', 'EWR'], ['DFW', 'PHX'], ['MCO', 'PFN'], ['BUF', 'BOS'], ['CLE', 'SAT'], ['IAD', 'ATL'], ['CMH', 'RSW'], ['IAH', 'PBI'], ['STT', 'PHL'], ['PIT', 'MSP'], ['SFO', 'LGB'], ['LAS', 'HOU'], ['MSP', 'FCA'], ['MRY', 'PHX'], ['ATL', 'OAJ'], ['DEN', 'BOI'], ['CVG', 'BGR'], ['BHM', 'TPA'], ['PNS', 'MCO'], ['KTN', 'WRG'], ['GRR', 'MKE'], ['DFW', 'LEX'], ['LGB', 'GEG'], ['JAX', 'CVG'], ['MEM', 'ORF'], ['IAH', 'PSP'], ['BUR', 'SEA'], ['PHX', 'HNL'], ['PHX', 'FAT'], ['PDX', 'LGB'], ['BUF', 'DCA'], ['SJC', 'SNA'], ['MCI', 'SEA'], ['SUN', 'TWF'], ['HDN', 'MSP'], ['CVG', 'EVV'], ['DEN', 'OMA'], ['TPA', 'AUS'], ['AUS', 'ATL'], ['MIA', 'CVG'], ['PHX', 'TEX'], ['MHT', 'BWI'], ['MQT', 'GRB'], ['BHM', 'ATL'], ['RSW', 'JFK'], ['CRW', 'DTW'], ['CMH', 'STL'], ['IAD', 'BNA'], ['SDF', 'RDU'], ['HOU', 'JAN'], ['MSY', 'RDU'], ['MDW', 'SMF'], ['SLC', 'BNA'], ['HOU', 'MAF'], ['BDL', 'DCA'], ['LAS', 'ISP'], ['COS', 'SLC'], ['LGB', 'IAD'], ['SJC', 'PHX'], ['RNO', 'DFW'], ['CLE', 'SDF'], ['MDW', 'SEA'], ['ATL', 'PIA'], ['PHX', 'DRO'], ['MDW', 'MSP'], ['DEN', 'STL'], ['SAV', 'ATL'], ['DTW', 'SWF'], ['PHL', 'CVG'], ['SRQ', 'DCA'], ['MIA', 'TPA'], ['ORD', 'ABQ'], ['COS', 'ONT'], ['STX', 'ATL'], ['DTW', 'PLN'], ['DEN', 'CPR'], ['RDU', 'BDL'], ['HOU', 'ELP'], ['ATL', 'CAE'], ['ATL', 'MCI'], ['IAD', 'PIT'], ['CHS', 'JAX'], ['CLT', 'LGA'], ['CVG', 'SRQ'], ['FLL', 'CLT'], ['IAH', 'AVL'], ['SFO', 'IAD'], ['XNA', 'COS'], ['BWI', 'TPA'], ['FLL', 'CVG'], ['MDW', 'ATL'], ['IAH', 'CHS'], ['TUL', 'MSP'], ['OKC', 'TUL'], ['LIT', 'DFW'], ['MIA', 'STL'], ['LAX', 'ABQ'], ['LAX', 'JAX'], ['RSW', 'HPN'], ['ONT', 'LAX'], ['TUS', 'OAK'], ['ATL', 'BWI'], ['TPA', 'MHT'], ['MHT', 'CLT'], ['ORD', 'DFW'], ['DAB', 'EWR'], ['SFO', 'STL'], ['YUM', 'PHX'], ['PDX', 'SMF'], ['HSV', 'ATL'], ['ISP', 'ATL'], ['ATL', 'PWM'], ['IAD', 'SYR'], ['CRP', 'HOU'], ['FLL', 'PSE'], ['DTW', 'ERI'], ['LAX', 'RNO'], ['XNA', 'FAR'], ['ITH', 'DTW'], ['GSP', 'CLE'], ['SAV', 'IAH'], ['BHM', 'HOU'], ['SNA', 'OAK'], ['MEM', 'CHS'], ['TUL', 'EWR'], ['MRY', 'SFO'], ['CLT', 'IND'], ['SEA', 'KOA'], ['DEN', 'CAK'], ['PDX', 'EWR'], ['OAK', 'HNL'], ['RIC', 'BOS'], ['TYS', 'CLE'], ['HNL', 'LIH'], ['SFO', 'ACV'], ['CVG', 'CHA'], ['OKC', 'DAL'], ['BUR', 'LAS'], ['ATL', 'JAX'], ['EWR', 'ABQ'], ['SMF', 'IAD'], ['DAL', 'BHM'], ['SJC', 'MSP'], ['SAN', 'BNA'], ['ORD', 'XNA'], ['DTW', 'MHT'], ['TUS', 'PHX'], ['MCO', 'BHM'], ['JAX', 'MSY'], ['DFW', 'BMI'], ['SJC', 'DEN'], ['IND', 'CLE'], ['OMA', 'DSM'], ['JFK', 'BTV'], ['MHT', 'EWR'], ['SFO', 'KOA'], ['TPA', 'DAY'], ['LAS', 'TUL'], ['SWF', 'PBI'], ['DEN', 'BDL'], ['TPA', 'DTW'], ['MCO', 'CVG'], ['HDN', 'LGA'], ['SJC', 'RNO'], ['JFK', 'SEA'], ['IAD', 'MSY'], ['LAX', 'SMF'], ['HOU', 'TPA'], ['MEM', 'DSM'], ['FAT', 'ONT'], ['IAH', 'CLL'], ['LMT', 'PDX'], ['TPA', 'LAS'], ['IND', 'RDU'], ['ATL', 'ABQ'], ['CMI', 'SPI'], ['LIT', 'CVG'], ['GSO', 'DFW'], ['HOU', 'ABQ'], ['JAC', 'SLC'], ['LGA', 'TPA'], ['LIT', 'SAT'], ['TVC', 'CVG'], ['LAX', 'CLD'], ['LGA', 'ORD'], ['COS', 'CVG'], ['LAX', 'ICT'], ['OGG', 'SEA'], ['MSP', 'RSW'], ['SNA', 'MSP'], ['EWR', 'CLT'], ['ORF', 'ATL'], ['SAN', 'SJC'], ['BUR', 'SJC'], ['LIT', 'DTW'], ['FWA', 'ORD'], ['CLT', 'TLH'], ['IND', 'DEN'], ['ONT', 'DEN'], ['BDL', 'MCO'], ['DCA', 'PHL'], ['MSP', 'ATW'], ['SFO', 'PMD'], ['CWA', 'DTW'], ['BDL', 'IAD'], ['IAD', 'IAH'], ['MKE', 'CVG'], ['LGB', 'ONT'], ['BNA', 'AUS'], ['MIA', 'ORD'], ['EWR', 'MCI'], ['SJU', 'CLE'], ['AUS', 'JAX'], ['MSY', 'OKC'], ['JAX', 'HOU'], ['AUS', 'JFK'], ['PSP', 'ORD'], ['SNA', 'STL'], ['MEM', 'RSW'], ['IAD', 'OKC'], ['ABQ', 'IAD'], ['STL', 'CMH'], ['MEM', 'SHV'], ['IAH', 'RSW'], ['JFK', 'MSY'], ['MCO', 'MDT'], ['JAN', 'DCA'], ['RNO', 'DEN'], ['GRR', 'MKG'], ['MSP', 'RDU'], ['MEM', 'LIT'], ['MKE', 'AVP'], ['JFK', 'ONT'], ['MDW', 'PHX'], ['HRL', 'DAL'], ['MCO', 'MSY'], ['SMF', 'SEA'], ['GRB', 'CVG'], ['TUS', 'SMF'], ['CLE', 'DAB'], ['MSY', 'BHM'], ['SLC', 'ONT'], ['SMF', 'GEG'], ['HOU', 'CRP'], ['OKC', 'ATL'], ['CMH', 'DCA'], ['DEN', 'RFD'], ['TUS', 'SAN'], ['PWM', 'ORD'], ['CMH', 'PHL'], ['FAI', 'SCC'], ['LAX', 'BDL'], ['CLT', 'PWM'], ['MCI', 'MGM'], ['BWI', 'CLT'], ['MSY', 'CLT'], ['YAK', 'CDV'], ['DTW', 'PWM'], ['CHS', 'DTW'], ['SLC', 'AUS'], ['CVG', 'RIC'], ['MSN', 'MEM'], ['MDW', 'SAN'], ['EWR', 'FLL'], ['BZN', 'SFO'], ['SMF', 'BFL'], ['GEG', 'ORD'], ['TYS', 'DEN'], ['DFW', 'AMA'], ['EVV', 'ATL'], ['IAH', 'MKE'], ['TPA', 'MIA'], ['LIH', 'OGG'], ['RNO', 'SFO'], ['TRI', 'CLT'], ['RDU', 'SAT'], ['ERI', 'DTW'], ['CVG', 'MEM'], ['TUL', 'DFW'], ['BTM', 'SLC'], ['ALB', 'CLT'], ['BUR', 'OAK'], ['DFW', 'OMA'], ['SUN', 'SLC'], ['FNT', 'MCO'], ['RDU', 'CMH'], ['FAT', 'SLC'], ['RIC', 'CVG'], ['RSW', 'CLT'], ['LGA', 'TVC'], ['SAN', 'SAT'], ['MEM', 'TYS'], ['TUS', 'ONT'], ['JFK', 'DEN'], ['SFO', 'LIH'], ['SGU', 'PIH'], ['FAI', 'SEA'], ['LAS', 'DCA'], ['DTW', 'ROC'], ['BWI', 'SAN'], ['MHT', 'PHX'], ['MSY', 'PHL'], ['ALB', 'CLE'], ['AVP', 'ATL'], ['GSP', 'DTW'], ['BOS', 'MSP'], ['DTW', 'JFK'], ['ORF', 'IAH'], ['MCO', 'RIC'], ['CVG', 'ALB'], ['BNA', 'SAT'], ['DFW', 'ORF'], ['PDX', 'LAS'], ['SAT', 'SMF'], ['ORD', 'BTR'], ['MSP', 'BTV'], ['CLT', 'PBI'], ['JFK', 'PIT'], ['SMF', 'TUL'], ['IAH', 'SDF'], ['MSY', 'MCI'], ['IAD', 'FLL'], ['BWI', 'MSY'], ['FLL', 'PVD'], ['TLH', 'MIA'], ['FAT', 'SBA'], ['BNA', 'IAH'], ['MKE', 'LAX'], ['MLU', 'ATL'], ['TUL', 'CVG'], ['DFW', 'ANC'], ['SFO', 'IDA'], ['ELP', 'LAS'], ['EWR', 'PSE'], ['DAL', 'MCI'], ['CLE', 'MDW'], ['RIC', 'MSP'], ['PBI', 'BDL'], ['LYH', 'ATL'], ['ABQ', 'DFW'], ['ANC', 'PDX'], ['DEN', 'JAC'], ['BOS', 'CLE'], ['LBB', 'DFW'], ['CAK', 'DTW'], ['TUL', 'SLC'], ['TUS', 'LAS'], ['MSY', 'DCA'], ['IAH', 'LAX'], ['HPN', 'DTW'], ['BWI', 'BOS'], ['PVD', 'LAS'], ['DFW', 'BOS'], ['SMF', 'SBA'], ['PBI', 'SWF'], ['PSP', 'MSP'], ['XNA', 'EWR'], ['MSP', 'FSD'], ['LAS', 'IND'], ['IAH', 'CAE'], ['SFO', 'ORD'], ['HOU', 'PHL'], ['JFK', 'IND'], ['MDW', 'PIT'], ['SAT', 'IND'], ['MIA', 'XNA'], ['CWA', 'MLI'], ['OKC', 'SAN'], ['LAX', 'SJU'], ['OKC', 'CLE'], ['AEX', 'ATL'], ['PSG', 'WRG'], ['STL', 'JFK'], ['CID', 'DSM'], ['ORD', 'JAN'], ['RDU', 'BWI'], ['BOS', 'ACK'], ['SHV', 'ORD'], ['SRQ', 'CLE'], ['MIA', 'IAH'], ['SWF', 'BOS'], ['IAH', 'STL'], ['CLT', 'FAY'], ['MKE', 'ABE'], ['CVG', 'RDU'], ['DTW', 'IAD'], ['HHH', 'ATL'], ['FLL', 'BUF'], ['SFO', 'BZN'], ['AKN', 'ANC'], ['FLL', 'TPA'], ['MCO', 'IAH'], ['BTR', 'DEN'], ['SMF', 'SAN'], ['JAC', 'MSP'], ['AUS', 'OAK'], ['MDW', 'IND'], ['TUL', 'OMA'], ['SAN', 'CVG'], ['ORD', 'JFK'], ['OGG', 'SNA'], ['GRB', 'DSM'], ['MAF', 'DFW'], ['LAX', 'SAT'], ['CVG', 'CMH'], ['DFW', 'TYR'], ['MEM', 'CHA'], ['SFO', 'MKE'], ['ATL', 'LGA'], ['ATL', 'TRI'], ['LAS', 'LBB'], ['DTW', 'ELM'], ['RDU', 'DTW'], ['STL', 'IAH'], ['FAI', 'MSP'], ['GEG', 'DEN'], ['BOS', 'MCO'], ['LAS', 'BWI'], ['DTW', 'MDT'], ['GSP', 'IAH'], ['SLC', 'SBP'], ['DSM', 'DFW'], ['ORD', 'CPR'], ['SDF', 'DFW'], ['IAH', 'EGE'], ['IYK', 'BFL'], ['ATL', 'ONT'], ['MCO', 'DTW']];

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

function drawPlane(ctx, point, size, img) {
  ctx.fillStyle = '#CCC';
  ctx.strokeStyle = '#000';
  // ctx.lineWidth = 0.5
  ctx.beginPath();
  ctx.arc(point.x, point.y, size, 0, Math.PI * 2, false);
  // var p = new window.Path2D('M10 10 h 80 v 80 h -80 Z')
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawLine(ctx, end, controlPt, color) {
  ctx.quadraticCurveTo(controlPt.x, controlPt.y, end.x, end.y); // curved lines
  // ctx.lineTo(end.x, end.y) // straight lines
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 0.5;
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
  console.log('points:', points.length);
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
  drawPlane: drawPlane,
  getQuadraticBezierXY: getQuadraticBezierXY,
  getWaypoint: getWaypoint,
  generatePoints: generatePoints
};

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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