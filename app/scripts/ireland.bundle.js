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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _markers_linesGeo = __webpack_require__(31);

var _markers_linesGeo2 = _interopRequireDefault(_markers_linesGeo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let locationIndex = 0

// const locations = [
//   { name: 'Londonderry, UK', lat: 54.9966120, long: -7.3085750 },
//   { name: 'The Peace Bridge, Derry BT48 7NN, UK', lat: 54.9979, long: -7.3159400 },
//   { name: 'Mullenan Rd, Londonderry BT48 9XW, UK', lat: 54.96788, long: -7.39015 },
//   { name: 'Fermanagh, United Kingdom', lat: 54.34383, long: -7.63187 },
//   { name: 'Sheridan John, DP1, Enniskillen BT92 1ED, UK', lat: 54.28067, long: -7.82704 },
//   { name: 'Ballindarragh, Enniskillen BT94 5NZ, UK', lat: 54.2705, long: -7.50278 },
//   { name: 'Newtownbutler, Enniskillen, UK', lat: 54.18207, long: -7.36064 },
//   { name: 'Belturbet, Kilconny, Co. Cavan, Ireland', lat: 54.10191, long: -7.44967 }
// ]

var svg = d3.select('#map').append('svg').attr('width', '100%'); /* global d3, topojson */

var _d3$select$node$getBo = d3.select('#map').node().getBoundingClientRect(),
    width = _d3$select$node$getBo.width;

var height = width * 0.6;

svg.attr('height', height);

var proj = d3.geoAlbers().center([-7.5, 54]).rotate([0, 0]).scale(15000).translate([width / 2, height / 2]);

var path = d3.geoPath().projection(proj); // .pointRadius(2.5)

d3.queue().defer(d3.json, 'data/ireland/topo.json').await(ready);

function drawGeoJson(svg, geojson) {
  var lines = geojson.features.filter(function (f) {
    return f.geometry.type === 'LineString';
  });
  var points = geojson.features.filter(function (f) {
    return f.geometry.type === 'Point';
  });
  svg.selectAll('.geoLine').data(lines).enter().append('path').attr('class', 'geoLine').attr('data-id', function (d) {
    return d.id;
  }).attr('d', path);

  svg.selectAll('.geoPoint').data(points).enter().append('path').attr('class', 'geoPoint').attr('d', path);
}

function ready(error, ireland) {
  if (error) throw error;

  var g = svg.append('g').style('stroke-width', '1.5px');

  g.selectAll('.borders').data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features).enter().append('path').attr('class', 'borders').attr('d', path);

  drawGeoJson(g, _markers_linesGeo2.default);
  // setInterval(() => {
  //   if (locationIndex > (locations.length - 1)) {
  //     locationIndex = 0
  //   }
  //   centerMap(g, proj, locations[locationIndex])
  //   d3.select('#location').text(locations[locationIndex].name)
  //   d3.select("[data-name='" + locations[locationIndex].name + "']")
  //     .style('fill', 'blue').style('stroke', 'white')
  //   locationIndex += 1
  // }, 3000)
}

// function centerMap (g, projection, location) {
//   const originXY = projection([locations[0].long, locations[0].lat])
//   const XY = projection([location.long, location.lat])
//   const dx = originXY[0] - XY[0]
//   const dy = originXY[1] - XY[1]
//   const xy = [dx, dy]
//   console.log('>>>', location)
//   g.transition()
//       .duration(1500)
//       .attr('transform', `translate(${xy})`)
// }

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-7.33062744140625,55.002431991917916]}},{"type":"Feature","properties":{},"id":"A","geometry":{"type":"LineString","coordinates":[[-7.329940795898437,55.00203817017638],[-7.342987060546875,54.98628213000453],[-7.356719970703125,54.98234215326033],[-7.371826171874999,54.97485513201905],[-7.392425537109376,54.97209640383145],[-7.399978637695312,54.95948266143258],[-7.404785156249999,54.953962903574094],[-7.3944854736328125,54.94725932108393],[-7.417831420898438,54.943315514969534],[-7.441177368164063,54.939765758658936],[-7.447357177734375,54.92280148574785],[-7.444610595703125,54.908593335436926],[-7.439117431640624,54.89911844831241],[-7.44049072265625,54.88055700158993],[-7.437057495117187,54.862382196732526],[-7.443923950195312,54.846571357032325],[-7.450103759765625,54.826007999094955],[-7.45147705078125,54.80701713846256],[-7.492675781249999,54.79118460009706],[-7.507095336914062,54.771385204918616],[-7.513961791992187,54.761878052220155]]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-7.520141601562501,54.73413609763888]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-7.6629638671875,54.6436447697515]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-7.687683105468749,54.513110090228956]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-7.6025390625,54.36135760559306]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-7.6519775390625,54.289278516618545]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-7.57232666015625,54.18172660239092]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-7.523231506347656,54.73572186418134],[-7.555503845214844,54.71668856895074],[-7.594985961914062,54.70776363457271],[-7.609748840332032,54.690304752228016],[-7.630348205566406,54.66886767196106],[-7.631721496582031,54.66171946293448],[-7.637901306152343,54.65218656068009],[-7.648887634277344,54.64265142174586],[-7.662620544433594,54.64344610209216],[-7.65850067138672,54.63112681098046],[-7.666053771972655,54.61940014851367],[-7.6897430419921875,54.59156064050079],[-7.7034759521484375,54.57126558050856],[-7.7117156982421875,54.55693356898938],[-7.711029052734374,54.53423091291802],[-7.697296142578124,54.52267558979492],[-7.689056396484375,54.5162988390112],[-7.68218994140625,54.49995387002701],[-7.683563232421874,54.47721951068214],[-7.673950195312499,54.457665832882164],[-7.6519775390625,54.439700141577894],[-7.640991210937501,54.42751891292726],[-7.643909454345704,54.41573362292812],[-7.644252777099609,54.40824121100936],[-7.6444244384765625,54.39704999351311],[-7.636871337890624,54.38575575966468],[-7.635841369628905,54.374558406999434],[-7.6322364807128915,54.368758577473116],[-7.616271972656249,54.36355803383329],[-7.608203887939453,54.3624578344475],[-7.607688903808593,54.356256159488616],[-7.629833221435547,54.34735211849],[-7.639961242675782,54.34825261481792],[-7.647686004638671,54.34665171881637],[-7.651805877685547,54.334943271492],[-7.650775909423828,54.323732060964595],[-7.646484374999999,54.31672350233462],[-7.645454406738281,54.2994974010095],[-7.64871597290039,54.29098184012015],[-7.63772964477539,54.28246451815269],[-7.635669708251953,54.276551459135675],[-7.634811401367187,54.25920827486423],[-7.627601623535156,54.24296121988242],[-7.618331909179687,54.23583857979814],[-7.606487274169921,54.2245000113088],[-7.590351104736328,54.211552174152736],[-7.583312988281249,54.20352046811479],[-7.5718116760253915,54.1975960844108],[-7.5661468505859375,54.1910682376307],[-7.572841644287109,54.18253026689359],[-7.57730484008789,54.15750888573078],[-7.569580078124999,54.13991452083357],[-7.569065093994141,54.131164825213396],[-7.57455825805664,54.12533066794549],[-7.5798797607421875,54.11728220637994]]}}]}

/***/ })

/******/ });