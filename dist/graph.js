(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("jsGraph", [], factory);
	else if(typeof exports === 'object')
		exports["jsGraph"] = factory();
	else
		root["jsGraph"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/graph.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/graph.js":
/*!**********************!*\
  !*** ./lib/graph.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Node schema\n * Node {\n *   val: Object,\n *   connections: Array<Node>\n * }\n *\n * Connection {\n *   target: Node\n * }\n */\nclass Graph {\n  constructor () {\n    this.nodes = []\n  }\n\n  createNode (val) {\n    const node = {\n      val,\n      connections: []\n    }\n    this.nodes.push(node)\n    return node\n  }\n\n  /**\n   * @param {JSON} node - Origin node. Read Node schema\n   * @param {JSON} node - Target node. Read Node schema\n   * @param {number} weight - Connection weight\n   */\n  static connect ({ node, target, weight }) {\n    const connection = {\n      target,\n      weight: weight || 1\n    }\n    node.connections.push(connection)\n    return connection\n  }\n\n  /**\n   * TODO\n   * @param {JSON} params\n   * @param {Object} params.val - Not required\n   * @param {Function} params.compare - Compare function\n   * @param {JSON} params.node - Origin node\n   */\n  static disconnect (params) {\n    let compare\n    if (!params.node) {\n      throw new Error('No node in params')\n    }\n    const node = params.node\n    if (params.compare) {\n      compare = params.compare\n    } else {\n      compare = (connection) => connection.val === params.val\n    }\n    return this.node.connections.findIndex(node, compare) // this might not work\n  }\n\n  /**\n   * TODO\n   * @param {JSON} from - Node\n   * @param {JSON} target - Node\n   */\n  static path (from, target) {\n    // TODO\n  }\n\n  /**\n   * @return {Array<JSON>} - List of nodes\n   */\n  getNodes () {\n    return this.nodes\n  }\n\n  /**\n   * @return {Object} - first node. Return null if there are no nodes\n   */\n  getFirstNode () {\n    if (this.nodes.length === 0) {\n      return null\n    }\n    return this.nodes[0]\n  }\n\n  /**\n   * @params {node} start\n   */\n  dijkstra(start) {\n    const visited = [];\n    const nodes = this.nodes.map((node) => ({\n      node,\n      weight: node === start ? 0 : Infinity,\n      parent: null\n    }))\n\n    while (nodes.length) {\n      let min = null\n      nodes.forEach((node) => {\n        if (min === null || node.weight <  min.weight) {\n          min = node\n        }\n      })\n\n      if (!min) {\n        break\n      }\n\n      const index = nodes.findIndex((node) => node === min)\n      nodes.splice(index, 1)\n      visited.push(min)\n\n      min.node.connections.forEach((connection) => {\n        const weight = connection.weight + min.weight\n        const target = connection.target;\n        const node = nodes.find(({ node }) => node === target)\n\n        if (node && node.weight > weight) {\n          node.weight = weight,\n          node.parent = min.node\n        }\n      })\n    }\n    return visited\n  }\n\n  /**\n   * @param {array} tree - point data\n   * @param {json} tree[].node - Reference to node in graph\n   * @param {number} tree[].weight - Weight from the beginning of three to the\n   *     point\n   * @param {json} tree[].parent - Path to the parent node\n   * @param {json} target - Node reference\n   */\n  static getPathFromParent (three, target) {\n    const targetPoint = three.find(({ node }) => node === target)\n    const rootPoint = three.find(({ parent }) => parent === null)\n    const path = []\n    let current = targetPoint\n\n    path.push(current.node)\n    while (current !== rootPoint) {\n      const parent = current.parent // parent node. it is not a point\n      current = three.find(({ node }) => node === parent)\n      path.push(current.node)\n    }\n\n    return {\n      weight: targetPoint.weight,\n      start: rootPoint.node,\n      path\n    }\n  }\n\n  /**\n   * @param {JSON} from - Origin node\n   * @param {JSON} to - Target node\n   */\n  getFastestPath(from, to) {\n  }\n\n  /**\n   * find node\n   * @param {Function} compare - Params node\n   * @return {JSON} node - If not found null\n   */\n  find(compare) {\n    return this.nodes.find(compare)\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Graph);\n\n\n\n//# sourceURL=webpack://jsGraph/./lib/graph.js?");

/***/ })

/******/ });
});