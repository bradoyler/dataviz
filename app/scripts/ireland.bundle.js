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


var _markers_linesGeo = __webpack_require__(21);

var _markers_linesGeo2 = _interopRequireDefault(_markers_linesGeo);

var _markersGeo = __webpack_require__(22);

var _markersGeo2 = _interopRequireDefault(_markersGeo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3, topojson */
var _d3$select$node$getBo = d3.select('#map').node().getBoundingClientRect(),
    width = _d3$select$node$getBo.width;

var height = width * 0.6;
var svg = d3.select('#map').append('svg').attr('width', width).attr('height', height);

var image = svg.append('image').attr('xlink:href', 'https://user-images.githubusercontent.com/425966/30931698-5c6b5888-a37a-11e7-980f-791406e2cb37.jpg').attr('width', 2500).attr('height', 2000).attr('x', -612) // left/right
.attr('y', -565) // up/down
.attr('transform', 'scale(' + width / 2000 + ')');

var g = svg.append('g').style('stroke-width', '1.5px').attr('transform', 'scale(' + width / 2000 + ')');

var lat = -9; // left/right
var long = 54.59; // up/down
var proj = d3.geoMercator().center([lat, long]).rotate([0, 0]).scale(7100);

var path = d3.geoPath().projection(proj).pointRadius(8);

d3.queue().defer(d3.json, 'data/ireland/topo.json').await(ready);

function drawGeoJson(svg, features, className) {
  return svg.selectAll('.' + className).data(features).enter().append('path').attr('class', className).attr('data-id', function (d) {
    return d.id;
  }).attr('d', path);
}

window.addEventListener('resize', function () {
  var _d3$select$node$getBo2 = d3.select('#map').node().getBoundingClientRect(),
      width = _d3$select$node$getBo2.width;

  svg.attr('width', width); // .attr('height', width * 0.6)
  image.attr('transform', 'scale(' + width / 2000 + ')');
  g.attr('transform', 'scale(' + width / 2000 + ')');
});

function ready(error, ireland) {
  if (error) throw error;

  g.selectAll('.borders').data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features).enter().append('path').attr('class', 'borders').attr('d', path);

  var lines = _markers_linesGeo2.default.features.filter(function (f) {
    return f.geometry.type === 'LineString';
  });
  var linePath = drawGeoJson(g, lines, 'geoLine');
  var totalLength = linePath.node().getTotalLength();
  linePath.transition().duration(5000).attrTween('stroke-dasharray', function () {
    return d3.interpolateString('0,' + totalLength, totalLength + ',' + totalLength);
  });

  var els = drawGeoJson(g, _markersGeo2.default.features, 'geoPoint');
  els.on('mouseover', function (d, i) {
    els.attr('style', '');
    d3.select('[data-id="' + d.id + '"]').attr('style', 'fill: #000');
    d3.select('#msg').html('Location:' + d.id);
  });
}

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"id":"Londonderry","geometry":{"type":"Point","coordinates":[-7.308575,54.996612]}},{"type":"Feature","properties":{},"id":"Mullenan Rd","geometry":{"type":"Point","coordinates":[-7.39015,54.96788]}},{"type":"Feature","properties":{},"id":"Fermanagh","geometry":{"type":"Point","coordinates":[-7.63187,54.34383]}},{"type":"Feature","properties":{},"id":"Sheridan John, DP1, Enniskillen BT92 1ED, UK","geometry":{"type":"Point","coordinates":[-7.82704,54.28067]}},{"type":"Feature","properties":{},"id":"Ballindarragh, Enniskillen BT94 5NZ, UK","geometry":{"type":"Point","coordinates":[-7.50278,54.2705]}},{"type":"Feature","properties":{},"id":"Newtownbutler","geometry":{"type":"Point","coordinates":[-7.362213134765626,54.181927519980945]}},{"type":"Feature","properties":{},"id":"Belturbet","geometry":{"type":"Point","coordinates":[-7.44967,54.10191]}},{"type":"Feature","properties":{},"id":"Warrenpoint","geometry":{"type":"Point","coordinates":[-6.2628936767578125,54.10369688287697]}},{"type":"Feature","properties":{},"id":"Parish Church","geometry":{"type":"Point","coordinates":[-6.05020523071289,54.74587920873868]}},{"type":"Feature","properties":{},"id":"Dundalk","geometry":{"type":"Point","coordinates":[-6.401081085205078,54.00514576822198]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-7.307281494140625,54.99100959165552],[-7.344360351562499,54.99494871768561],[-7.36358642578125,54.98628213000453],[-7.3663330078125,54.97603738608567],[-7.381439208984374,54.97130816096891],[-7.39105224609375,54.964213278995565],[-7.418518066406249,54.950808415794604],[-7.45697021484375,54.935821217398704],[-7.46795654296875,54.89793393064141],[-7.477569580078125,54.86949505279727],[-7.481689453125,54.85368700183775],[-7.495422363281249,54.835500081451656],[-7.48443603515625,54.82205230607877],[-7.477569580078125,54.802268028128864],[-7.47344970703125,54.783266005102874],[-7.465209960937499,54.76742416272956],[-7.474822998046875,54.755538709513225],[-7.489929199218751,54.746820492190885],[-7.518768310546875,54.7277924107821],[-7.579193115234374,54.707168569101256],[-7.601165771484375,54.690503190824515],[-7.636871337890624,54.665095162842086],[-7.643737792968749,54.65000162223775],[-7.646484374999999,54.63410762690361],[-7.660217285156249,54.61582184967801],[-7.66571044921875,54.59434544805755],[-7.664337158203126,54.57683778006274],[-7.6629638671875,54.56250772767092],[-7.66571044921875,54.54418977348489],[-7.669830322265624,54.52905134493475],[-7.683563232421874,54.51470449573694],[-7.689056396484375,54.50035260560785],[-7.676696777343749,54.4923771548133],[-7.6519775390625,54.482804559582554],[-7.630004882812499,54.47562364233815],[-7.628631591796875,54.45886326537355],[-7.625885009765625,54.43570669518777],[-7.627258300781249,54.41733182694633],[-7.631378173828125,54.39655031438518],[-7.636871337890624,54.38295670784131],[-7.636871337890624,54.37095860924334],[-7.636871337890624,54.35655626208956],[-7.640991210937501,54.34134830540375],[-7.673950195312499,54.33174038033774],[-7.735748291015625,54.3149211085581],[-7.787933349609374,54.303704439898084],[-7.80029296875,54.29729354239265],[-7.808532714843749,54.29088164657006],[-7.797546386718749,54.28286537279382],[-7.737121582031249,54.27965842645384],[-7.71240234375,54.28286537279382],[-7.689056396484375,54.28446875235516],[-7.656097412109375,54.2884769282426],[-7.63275146484375,54.28446875235516],[-7.60528564453125,54.2884769282426],[-7.565460205078125,54.290080089394316],[-7.537994384765625,54.287675324266324],[-7.513275146484376,54.28446875235516],[-7.483062744140626,54.28446875235516],[-7.461090087890625,54.286072069512265],[-7.411651611328124,54.301300470319084],[-7.3333740234375,54.32613472050531],[-7.305908203125,54.33414257209148],[-7.253723144531249,54.374158445055734],[-7.237243652343749,54.4029457476126],[-7.266082763671875,54.42372401996795],[-7.222137451171875,54.46285445402037],[-7.233123779296875,54.494769953452256],[-7.310028076171875,54.509123804178635],[-7.39654541015625,54.48599567367709],[-7.4102783203125,54.43490795919083],[-7.436370849609375,54.402146372988085],[-7.429504394531251,54.36455818952145],[-7.4267578125,54.32613472050531],[-7.417144775390625,54.283667070375095],[-7.411651611328124,54.267630154326795],[-7.408905029296874,54.25559837127025],[-7.403411865234375,54.23714281711491],[-7.397918701171875,54.22510213749345],[-7.386932373046875,54.208239284622316],[-7.378692626953124,54.20261680346748],[-7.364959716796874,54.18895902062141],[-7.358093261718749,54.16645400892218],[-7.373199462890625,54.149567212540525],[-7.400665283203125,54.120602386175754],[-7.434997558593749,54.1109429427243],[-7.444610595703125,54.10530722783159],[-7.36358642578125,54.09644955669078],[-7.371826171874999,54.06744758645126],[-7.38006591796875,54.03842534637411],[-7.364959716796874,54.02552006488194],[-7.344360351562499,54.0214863429344],[-7.337493896484375,54.01583847496656],[-7.281188964843749,54.03277977858892],[-7.224884033203126,54.04003822492974],[-7.154846191406249,54.0521328194133],[-7.101287841796875,54.0609999517185],[-7.0697021484375,54.07308844572374],[-7.05047607421875,54.06583577161278],[-7.007904052734375,54.0521328194133],[-6.973571777343749,54.03277977858892],[-6.93511962890625,54.01583847496656],[-6.9049072265625,53.99969748380847],[-6.870574951171875,53.99969748380847],[-6.807403564453124,53.99566125779008],[-6.74835205078125,53.985165238685454],[-6.714019775390625,53.97708957753223],[-6.6796875,53.973858874700106],[-6.598663330078125,53.969012350740314],[-6.5313720703125,53.97224342934289],[-6.483306884765625,53.98758763175327],[-6.427001953125,54.00131186464819],[-6.400909423828125,54.00938282974412],[-6.3720703125,54.02552006488194],[-6.373443603515625,54.04165104090459],[-6.359710693359375,54.05374516606874],[-6.359710693359375,54.081145486784855],[-6.36383056640625,54.11416300731598],[-6.354217529296874,54.13589190180979],[-6.3446044921875,54.157609403474126],[-6.329498291015625,54.16323800748458],[-6.310272216796875,54.14474114796277],[-6.277313232421875,54.123016895336384],[-6.258087158203125,54.11013788749546],[-6.258087158203125,54.14474114796277],[-6.2457275390625,54.159217654166895],[-6.227874755859375,54.18172660239092],[-6.203155517578124,54.21707306629117],[-6.181182861328125,54.229918830835224],[-6.156463623046875,54.25479612755466],[-6.149597167968749,54.286873704689604],[-6.142730712890625,54.31011433916155],[-6.153717041015625,54.322931143263474],[-6.1578369140625,54.34134830540375],[-6.159210205078125,54.36455818952145],[-6.17706298828125,54.37815788916952],[-6.172943115234374,54.39814926617165],[-6.139984130859375,54.410938637023676],[-6.126251220703125,54.43011521616438],[-6.112518310546875,54.45167814495863],[-6.0919189453125,54.46604712471081],[-6.07269287109375,54.482804559582554],[-6.053466796875,54.49955513055588],[-6.02325439453125,54.509123804178635],[-6.005401611328125,54.53144199643833],[-5.994415283203125,54.56091518865429],[-5.987548828125,54.569673383565096],[-5.958709716796875,54.584000917273244],[-5.9326171875,54.61025498157912],[-5.923004150390624,54.62774828881341],[-5.92987060546875,54.65476860921579],[-5.972442626953125,54.67224277785812],[-6.01776123046875,54.689709430616546],[-6.064453125,54.71034215072395],[-6.052093505859375,54.718275018302315],[-6.031494140625,54.73334319109242],[-6.00677490234375,54.74127155831599],[-6.038360595703125,54.74285704556977],[-6.04522705078125,54.74840576223716]]}}]}

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"id":"Londonderry","geometry":{"type":"Point","coordinates":[-7.308575,54.996612]}},{"type":"Feature","properties":{},"id":"Mullenan Rd","geometry":{"type":"Point","coordinates":[-7.39015,54.96788]}},{"type":"Feature","properties":{},"id":"Fermanagh","geometry":{"type":"Point","coordinates":[-7.63187,54.34383]}},{"type":"Feature","properties":{},"id":"Sheridan John, DP1, Enniskillen BT92 1ED, UK","geometry":{"type":"Point","coordinates":[-7.82704,54.28067]}},{"type":"Feature","properties":{},"id":"Ballindarragh, Enniskillen BT94 5NZ, UK","geometry":{"type":"Point","coordinates":[-7.50278,54.2705]}},{"type":"Feature","properties":{},"id":"Newtownbutler","geometry":{"type":"Point","coordinates":[-7.362213134765626,54.181927519980945]}},{"type":"Feature","properties":{},"id":"Belturbet","geometry":{"type":"Point","coordinates":[-7.44967,54.10191]}},{"type":"Feature","properties":{},"id":"Warrenpoint","geometry":{"type":"Point","coordinates":[-6.2628936767578125,54.10369688287697]}},{"type":"Feature","properties":{},"id":"Parish Church","geometry":{"type":"Point","coordinates":[-6.05020523071289,54.74587920873868]}},{"type":"Feature","properties":{},"id":"Dundalk","geometry":{"type":"Point","coordinates":[-6.401081085205078,54.00514576822198]}}]}

/***/ })

/******/ });