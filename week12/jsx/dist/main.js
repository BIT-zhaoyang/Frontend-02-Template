/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./framework.js":
/*!**********************!*\
  !*** ./framework.js ***!
  \**********************/
/*! namespace exports */
/*! export Component [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => /* binding */ Component,\n/* harmony export */   \"createElement\": () => /* binding */ createElement\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Component = /*#__PURE__*/function () {\n  function Component(type) {\n    _classCallCheck(this, Component);\n\n    this.root = this.render();\n  }\n\n  _createClass(Component, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.mountTo(this.root);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Component;\n}();\n\nvar ElementWrapper = /*#__PURE__*/function (_Component) {\n  _inherits(ElementWrapper, _Component);\n\n  var _super = _createSuper(ElementWrapper);\n\n  function ElementWrapper(type) {\n    var _this;\n\n    _classCallCheck(this, ElementWrapper);\n\n    _this.root = document.createElement(type);\n    return _possibleConstructorReturn(_this);\n  }\n\n  return ElementWrapper;\n}(Component);\n\nvar TextWrapper = /*#__PURE__*/function (_Component2) {\n  _inherits(TextWrapper, _Component2);\n\n  var _super2 = _createSuper(TextWrapper);\n\n  function TextWrapper(content) {\n    var _this2;\n\n    _classCallCheck(this, TextWrapper);\n\n    _this2 = _super2.call(this);\n    _this2.root = document.createTextNode(content);\n    return _this2;\n  }\n\n  return TextWrapper;\n}(Component);\n\nfunction createElement(type, attributes) {\n  var element = null;\n\n  if (typeof type === 'string') {\n    element = new ElementWrapper(type);\n  } else {\n    element = new type();\n  }\n\n  for (var name in attributes) {\n    // here the `setAttribute` method may be the method provided by DOM\n    // or it may be the method provided by our class instance, which represents\n    // the customized HTML element node.\n    // This also applies to `appendChild`.\n    element.setAttribute(name, attributes[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n\n    if (typeof child === 'string') {\n      child = new TextWrapper(child);\n    }\n\n    element.appendChild(child);\n  }\n\n  return element;\n} // What we should do?\n// To create a class for customized HTML element,\n// which implements the DOM node element interface.\n// Namely, the class should have the methods: setAttribute(), appendChild()\n\nvar Div = /*#__PURE__*/function (_ElementWrapper) {\n  _inherits(Div, _ElementWrapper);\n\n  var _super3 = _createSuper(Div);\n\n  function Div() {\n    var _this3;\n\n    _classCallCheck(this, Div);\n\n    _this3 = _super3.call(this);\n    _this3.root = document.createElement('div');\n    return _this3;\n  } // Now we used `extends` so we don't need to write these methods again.\n  // setAttribute(name, value) {\n  //   this.root.setAttribute(name, value);\n  // }\n  // appendChild(child) {\n  //   this.root.appendChild(child);\n  // }\n  // mountTo(parent) {\n  //   parent.appendChild(this.root);\n  // }\n\n\n  return Div;\n}(ElementWrapper);\n\n//# sourceURL=webpack://jsx/./framework.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _framework_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework.js */ \"./framework.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n/* ** Moved to framework.js ***\nclass ElementWrapper {\n  constructor(type) {\n    this.root = document.createElement(type);\n  }\n  setAttribute(name, value) {\n    this.root.setAttribute(name, value);\n  }\n  appendChild(child) {\n    // this.root.appendChild(child);\n    // child is another ElementWrapper instance instead of a native Node element, so we need to use `mountTo` to mount the child to current element.\n    child.mountTo(this.root);\n  }\n  mountTo(parent) {\n    parent.appendChild(this.root);\n  }\n}\n\n\nclass TextWrapper extends ElementWrapper{\n  constructor(content) {\n    super();\n    this.root = document.createTextNode(content);\n  }\n  // setAttribute(name, value) {\n  //   this.root.setAttribute(name, value);\n  // }\n  // appendChild(child) {\n  //   child.mountTo(this.root);\n  // }\n  // mountTo(parent) {\n  //   parent.appendChild(this.root);\n  // }\n}\n\nfunction createElement(type, attributes, ...children) {\n  let element = null;\n  if (typeof type === 'string') {\n    element = new ElementWrapper(type);\n  } else {\n    element = new type;\n  }\n\n  for (let name in attributes) {\n    // here the `setAttribute` method may be the method provided by DOM\n    // or it may be the method provided by our class instance, which represents\n    // the customized HTML element node.\n    // This also applies to `appendChild`.\n    element.setAttribute(name, attributes[name]);\n  }\n  for (let child of children) {\n    if (typeof child === 'string') {\n      child = new TextWrapper(child);\n    }\n    element.appendChild(child);\n  }\n  return element;\n}\n\n// What we should do?\n// To create a class for customized HTML element,\n// which implements the DOM node element interface.\n// Namely, the class should have the methods: setAttribute(), appendChild()\nclass Div extends ElementWrapper{\n  constructor() {\n    super();\n    this.root = document.createElement('div');\n  }\n\n  // Now we used `extends` so we don't need to write these methods again.\n  // setAttribute(name, value) {\n  //   this.root.setAttribute(name, value);\n  // }\n  // appendChild(child) {\n  //   this.root.appendChild(child);\n  // }\n  // mountTo(parent) {\n  //   parent.appendChild(this.root);\n  // }\n}\n\nlet a = <div id=\"a\">\n  <span>a</span>\n  <span>b</span>\n  <span>c</span>\n</div>\n\n// `a` may be a native HTML Node element, \n// or it may be an instance of our customized class `Div`.\n// If `a` is a customized class instance, then it's not a native Node element,\n// thus, it can't be appended using appendChild. Thus, we create mountTo\n// method on `a`, to mount itself to DOM.\n// document.body.appendChild(a);\n\n// `a` may be a native HTML Node element, \n// or it may be an instance of our customized class `Div`.\n// If `a` is a native Node element, then it doesn't have the method\n// `mountTo`. Thus, we need to create a wrapper for it.\na.mountTo(document.body);\n*/\n\n\nvar Carousel = /*#__PURE__*/function (_Component) {\n  _inherits(Carousel, _Component);\n\n  var _super = _createSuper(Carousel);\n\n  function Carousel() {\n    var _this;\n\n    _classCallCheck(this, Carousel);\n\n    _this.root = document.createElement(\"div\");\n    return _possibleConstructorReturn(_this);\n  }\n\n  return Carousel;\n}(_framework_js__WEBPACK_IMPORTED_MODULE_0__.Component);\n\nvar d = ['http://img4.a0bi.com/upload/ttq/20170922/1506081303263.jpeg', 'http://img4.a0bi.com/upload/ttq/20170922/1506081330241.jpeg', 'http://img4.a0bi.com/upload/ttq/20170922/1506081421147.jpeg', 'http://img4.a0bi.com/upload/ttq/20170922/1506081450268.jpeg', 'http://img4.a0bi.com/upload/ttq/20170922/1506081518136.jpeg'];\n\n//# sourceURL=webpack://jsx/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;