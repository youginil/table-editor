(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["te"] = factory();
	else
		root["te"] = factory();
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/editor.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/editor.scss":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/editor.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".table-editor-hahaha {\n  border-collapse: collapse;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  box-sizing: border-box; }\n  .table-editor-hahaha.full-width {\n    width: 100%; }\n  .table-editor-hahaha * {\n    box-sizing: border-box; }\n  .table-editor-hahaha > tbody > tr > td {\n    border: 1px solid #000;\n    margin: 0;\n    padding: 0; }\n    .table-editor-hahaha > tbody > tr > td > div.cell-content {\n      padding: 0 7px;\n      height: 100%;\n      min-height: 30px;\n      outline: none;\n      word-break: break-word; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, repository, keywords, author, license, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"web-table-editor\",\"version\":\"1.0.2\",\"description\":\"edit table structure and content\",\"main\":\"index.js\",\"scripts\":{\"build\":\"./node_modules/.bin/webpack\",\"dev\":\"./node_modules/.bin/webpack-dev-server --inline\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/yinliguo/table-editor\"},\"keywords\":[\"table\",\"editor\"],\"author\":\"yinliguo\",\"license\":\"ISC\",\"devDependencies\":{\"css-loader\":\"^3.2.0\",\"node-sass\":\"^4.13.0\",\"sass-loader\":\"^8.0.0\",\"style-loader\":\"^1.0.0\",\"ts-loader\":\"^6.2.1\",\"typescript\":\"^3.7.2\",\"webpack\":\"^4.41.2\",\"webpack-cli\":\"^3.3.10\",\"webpack-dev-server\":\"^3.9.0\"}}");

/***/ }),

/***/ "./src/command.ts":
/*!************************!*\
  !*** ./src/command.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __webpack_require__(/*! ./log */ "./src/log.ts");
var CmdDebugger = /** @class */ (function () {
    function CmdDebugger() {
    }
    CmdDebugger.prototype.execute = function () {
        debugger;
        return true;
    };
    CmdDebugger.prototype.undo = function () {
        return true;
    };
    return CmdDebugger;
}());
var CommandMacro = /** @class */ (function () {
    function CommandMacro(commands) {
        this.commands = commands || [];
    }
    CommandMacro.prototype.addCommand = function () {
        var _a;
        var cmds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cmds[_i] = arguments[_i];
        }
        (_a = this.commands).push.apply(_a, cmds);
    };
    CommandMacro.prototype.execute = function () {
        for (var i = 0; i < this.commands.length; i++) {
            if (!this.commands[i].execute()) {
                log_1.default.error("CommandMacro fail on " + i + "th command.", this.commands);
                while (--i >= 0) {
                    this.commands[i].undo();
                }
                return false;
            }
        }
        return true;
    };
    CommandMacro.prototype.undo = function () {
        var i = this.commands.length;
        while (--i >= 0) {
            if (!this.commands[i].undo()) {
                var c = this.commands.length - 1;
                while (++i <= c) {
                    this.commands[i].execute();
                }
                return false;
            }
        }
        return true;
    };
    return CommandMacro;
}());
exports.CommandMacro = CommandMacro;
var noopCmdMacro = new CommandMacro();
var CmdAddCell = /** @class */ (function () {
    function CmdAddCell(table, td) {
        this.table = table;
        this.td = td;
    }
    CmdAddCell.prototype.execute = function () {
        var rowRange = this.td.getRowRange();
        var tr = this.table.getRowByIndex(rowRange[0]);
        if (!tr) {
            log_1.default.error('CmdAddCell', "Invalid rowRange: " + rowRange + ", colRange: " + this.td.getColRange());
            return false;
        }
        return tr.addTd(this.td) > 0;
    };
    CmdAddCell.prototype.undo = function () {
        return this.table.removeCell(this.td.getRowRange()[0], this.td.getColRange()[0]) > 0;
    };
    return CmdAddCell;
}());
var CmdDelCell = /** @class */ (function () {
    function CmdDelCell(table, rowIdx, colIdx) {
        this.td = null;
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
    }
    CmdDelCell.prototype.execute = function () {
        this.td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!this.td) {
            log_1.default.error('CmdDelCell', "Cell not found. rowIdx: " + this.rowIdx + ", colIdx: " + this.colIdx);
            return false;
        }
        return this.table.removeCell(this.rowIdx, this.colIdx) > 0;
    };
    CmdDelCell.prototype.undo = function () {
        var tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            log_1.default.error('CmdDelCell', "Row not found. rowIdx: " + this.rowIdx);
            return false;
        }
        return tr.addTd(this.td) > 0;
    };
    return CmdDelCell;
}());
var CmdAddColHeader = /** @class */ (function () {
    function CmdAddColHeader(table, colIdx) {
        this.table = table;
        this.colIdx = colIdx;
    }
    CmdAddColHeader.prototype.execute = function () {
        return this.table.addColHeader(this.colIdx) > 0;
    };
    CmdAddColHeader.prototype.undo = function () {
        return this.table.delColHeader(this.colIdx) > 0;
    };
    return CmdAddColHeader;
}());
var CmdDelColHeader = /** @class */ (function () {
    function CmdDelColHeader(table, colIdx) {
        this.table = table;
        this.colIdx = colIdx;
    }
    CmdDelColHeader.prototype.execute = function () {
        return this.table.delColHeader(this.colIdx) > 0;
    };
    CmdDelColHeader.prototype.undo = function () {
        return this.table.addColHeader(this.colIdx) > 0;
    };
    return CmdDelColHeader;
}());
var CmdSetCellRowRange = /** @class */ (function () {
    function CmdSetCellRowRange(table, rowIdx, colIdx, newRange) {
        this.oldRange = null;
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.newRange = newRange;
    }
    CmdSetCellRowRange.prototype.execute = function () {
        var td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            log_1.default.error('CmdSetCellRowRange', "Invalid position. rowIdx: " + this.rowIdx + ", colIdx: " + this.colIdx);
            return false;
        }
        this.oldRange = td.getRowRange();
        td.setRowRange(this.newRange);
        return true;
    };
    CmdSetCellRowRange.prototype.undo = function () {
        var td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            log_1.default.error('CmdSetCellRowRange', "Cell not found. rowIdx: " + this.rowIdx + ", colIdx: " + this.colIdx);
            return false;
        }
        td.setRowRange(this.oldRange);
        return true;
    };
    return CmdSetCellRowRange;
}());
var CmdSetCellColRange = /** @class */ (function () {
    function CmdSetCellColRange(table, rowIdx, colIdx, newRange) {
        this.oldRange = null;
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.newRange = newRange;
    }
    CmdSetCellColRange.prototype.execute = function () {
        var td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            return false;
        }
        this.oldRange = td.getColRange();
        td.setColRange(this.newRange);
        return true;
    };
    CmdSetCellColRange.prototype.undo = function () {
        var td = this.table.getCell(this.rowIdx, this.newRange[0]);
        if (!td) {
            log_1.default.error('CmdSetCellColRange', "Cell not found. rowIdx: " + this.newRange[0] + ", colIdx: " + this.newRange[1]);
            return false;
        }
        td.setColRange(this.oldRange);
        return true;
    };
    return CmdSetCellColRange;
}());
var CmdSetColCount = /** @class */ (function () {
    function CmdSetColCount(table, colCount) {
        this.prevColCount = 0;
        this.table = table;
        this.colCount = colCount;
    }
    CmdSetColCount.prototype.execute = function () {
        this.prevColCount = this.table.getColCount();
        this.table.setColCount(this.colCount);
        return true;
    };
    CmdSetColCount.prototype.undo = function () {
        this.table.setColCount(this.prevColCount);
        return true;
    };
    return CmdSetColCount;
}());
var CmdAddBlankRow = /** @class */ (function () {
    function CmdAddBlankRow(table, rowIdx) {
        this.table = table;
        this.rowIdx = rowIdx;
    }
    CmdAddBlankRow.prototype.execute = function () {
        return this.table.addRow(this.rowIdx) > 0;
    };
    CmdAddBlankRow.prototype.undo = function () {
        return this.table.delRow(this.rowIdx) > 0;
    };
    return CmdAddBlankRow;
}());
var CmdDelBlankRow = /** @class */ (function () {
    function CmdDelBlankRow(table, rowIdx) {
        this.table = table;
        this.rowIdx = rowIdx;
    }
    CmdDelBlankRow.prototype.execute = function () {
        return this.table.delRow(this.rowIdx) > 0;
    };
    CmdDelBlankRow.prototype.undo = function () {
        return this.table.addRow(this.rowIdx) > 0;
    };
    return CmdDelBlankRow;
}());
var CmdRemoveBlankRows = /** @class */ (function () {
    function CmdRemoveBlankRows(table) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
    }
    CmdRemoveBlankRows.prototype.execute = function () {
        this.cmdMacro = new CommandMacro();
        var trs = this.table.getRows();
        for (var i = 0; i < trs.length; i++) {
            if (trs[i].getTds().length === 0) {
                if (i !== trs.length - 1) {
                    this.cmdMacro.addCommand(new CmdMoveRow(this.table, i + 1, -1));
                }
                this.cmdMacro.addCommand(new CmdDelBlankRow(this.table, i));
            }
        }
        return this.cmdMacro.execute();
    };
    CmdRemoveBlankRows.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdRemoveBlankRows;
}());
var CmdAddRow = /** @class */ (function () {
    function CmdAddRow(table, refRowIdx, above) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.refRowIdx = refRowIdx;
        this.above = above;
    }
    CmdAddRow.prototype.execute = function () {
        var _this = this;
        this.cmdMacro = new CommandMacro();
        var trs = this.table.getRows();
        if (this.refRowIdx < 0 || this.refRowIdx >= trs.length) {
            log_1.default.error('CmdAddRow', "Invalid refRowIdx: " + this.refRowIdx);
            return false;
        }
        var relativeTr = trs[this.refRowIdx];
        var targetRowIdx = this.refRowIdx + (this.above ? 0 : 1);
        // 对应位置增加空行
        this.cmdMacro.addCommand(new CmdAddBlankRow(this.table, targetRowIdx));
        // 空行下面的每行向下偏移一行
        if (this.refRowIdx !== trs.length - 1 || this.above) {
            var rowIdxWillMoveDown = this.above ? this.refRowIdx + 1 : this.refRowIdx + 2;
            this.cmdMacro.addCommand(new CmdMoveRow(this.table, rowIdxWillMoveDown, 1));
        }
        // 按照相对行的单元格生成单元格并插入到空行中
        var relativeTds = relativeTr.getTds();
        var holeStartColIdx = 0;
        for (var i = 0; i < relativeTds.length; i++) {
            var relTd = relativeTds[i];
            var relTdColRange = relTd.getColRange();
            var relTdRowRange = relTd.getRowRange();
            // 如果单元格跨行，向下增加行时不用加单元格，但需要把单元格的跨行+1
            if (relTdRowRange[0] === relTdRowRange[1] || this.above) {
                var tmpTd = this.table.createCell({
                    rowRange: [targetRowIdx, targetRowIdx],
                    colRange: [relTdColRange[0], relTdColRange[1]]
                });
                this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
            }
            else {
                this.cmdMacro.addCommand(new CmdSetCellRowRange(this.table, relTdRowRange[0], relTdColRange[0], [relTdRowRange[0], relTdRowRange[1] + 1]));
            }
            // 前面有空洞
            if (holeStartColIdx < relTdColRange[0]) {
                // 去上面的行中找到跨行的单元格，并取出跨了几行，如果相对的行《不是空洞的最后一个》或者《是最后一个并且向上添加行》
                // 就把跨行的单元格增加跨一行
                var tmpTds = this.table.getTdsCrossRow(this.refRowIdx - 1, holeStartColIdx, relTdColRange[0] - 1);
                if (tmpTds.length === 0) {
                    log_1.default.error('CmdAddRow', "Table data error");
                    return false;
                }
                for (var j = 0; j < tmpTds.length; j++) {
                    var tmpRowRange = tmpTds[j].getRowRange();
                    if (tmpRowRange[1] !== this.refRowIdx || this.above) {
                        tmpTds[j].setRowRange([tmpRowRange[0], tmpRowRange[1] + 1]);
                    }
                }
            }
            holeStartColIdx = relTdColRange[1] + 1;
        }
        // 最后如果有空洞
        var lastColIdx = this.table.getColCount() - 1;
        if (holeStartColIdx < lastColIdx) {
            var tmpTds = this.table.getTdsCrossRow(this.refRowIdx - 1, holeStartColIdx, lastColIdx);
            if (tmpTds.length === 0) {
                log_1.default.error('CmdAddRow', "Table data error");
                return false;
            }
            tmpTds.forEach(function (td) {
                var tmpRowRange = td.getRowRange();
                if (tmpRowRange[1] !== _this.refRowIdx || _this.above) {
                    td.setRowRange([tmpRowRange[0], tmpRowRange[1] + 1]);
                }
            });
        }
        return this.cmdMacro.execute();
    };
    CmdAddRow.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdAddRow;
}());
exports.CmdAddRow = CmdAddRow;
var CmdDelRow = /** @class */ (function () {
    function CmdDelRow(table, rowIdx) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.rowIdx = rowIdx;
    }
    CmdDelRow.prototype.execute = function () {
        var _this = this;
        this.cmdMacro = new CommandMacro();
        var tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            return false;
        }
        tr.getTds().forEach(function (td) {
            _this.cmdMacro.addCommand(new CmdDelCell(_this.table, td.getRowRange()[0], td.getColRange()[0]));
        });
        this.cmdMacro.addCommand(new CmdDelBlankRow(this.table, this.rowIdx));
        if (this.rowIdx < this.table.getRowCount() - 1) {
            this.cmdMacro.addCommand(new CmdMoveRow(this.table, this.rowIdx, -1));
        }
        return this.cmdMacro.execute();
    };
    CmdDelRow.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdDelRow;
}());
exports.CmdDelRow = CmdDelRow;
var CmdAddColumn = /** @class */ (function () {
    function CmdAddColumn(table, refColIdx, left) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.refColIdx = refColIdx;
        this.left = left;
    }
    CmdAddColumn.prototype.execute = function () {
        this.cmdMacro = new CommandMacro();
        this.cmdMacro.addCommand(new CmdAddColHeader(this.table, this.left ? this.refColIdx : this.refColIdx + 1));
        var colCount = this.table.getColCount();
        var trs = this.table.getRows();
        for (var i = 0; i < trs.length; i++) {
            var tr = trs[i];
            var tds = tr.getTds();
            var holeStart = 0;
            for (var j = 0; j < tds.length; j++) {
                var td = tds[j];
                var colRange = td.getColRange();
                // 参考位置在空洞里，不需要加单元格，把该位置单元格往后移动一列
                if (holeStart < colRange[0] && this.refColIdx === holeStart && this.refColIdx <= colRange[0] - 1) {
                    this.cmdMacro.addCommand(new CmdMoveCol(this.table, i, colRange[0], 1));
                    break;
                }
                // 参考位置在单元格中
                if (this.refColIdx >= colRange[0] && this.refColIdx <= colRange[1]) {
                    var rowRange = td.getRowRange();
                    var cellWidth = colRange[1] - colRange[0] + 1;
                    if (colRange[0] !== colRange[1] && ((!this.left && this.refColIdx < colRange[1])
                        || (this.left && this.refColIdx > colRange[0]))) {
                        // 如果单元格跨列，并且插入的位置在跨列范围内，跨列+1
                        this.cmdMacro.addCommand(new CmdSetCellColRange(this.table, rowRange[0], colRange[0], [colRange[0], colRange[1] + 1]));
                    }
                    else {
                        // 插入不跨列的单元格
                        var tmpColIdx = this.left ? colRange[0] : colRange[1] + 1;
                        this.cmdMacro.addCommand(new CmdMoveCol(this.table, rowRange[0], tmpColIdx, 1));
                        var tmpTd = this.table.createCell({
                            rowRange: [rowRange[0], rowRange[1]],
                            colRange: [tmpColIdx, tmpColIdx]
                        });
                        this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
                    }
                    break;
                }
                // 如果在最后一个单元格后面是空洞并且参考位置在空洞里，什么都不做
                if (j === tds.length - 1 && colRange[1] < colCount - 1 && this.refColIdx > colRange[1] && this.refColIdx <= colCount - 1) {
                    // do nothing
                }
                holeStart = colRange[1] + 1;
            }
        }
        var c = this.table.getColCount();
        this.cmdMacro.addCommand(new CmdSetColCount(this.table, c + 1));
        return this.cmdMacro.execute();
    };
    CmdAddColumn.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdAddColumn;
}());
exports.CmdAddColumn = CmdAddColumn;
var CmdDelColumn = /** @class */ (function () {
    function CmdDelColumn(table, colIdx) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.colIdx = colIdx;
    }
    CmdDelColumn.prototype.execute = function () {
        var _this = this;
        this.cmdMacro = new CommandMacro();
        this.cmdMacro.addCommand(new CmdDelColHeader(this.table, this.colIdx));
        var firstTr = this.table.getRowByIndex(0);
        var firstTd = firstTr.getTdByColIndex(this.colIdx);
        if (!firstTd) {
            log_1.default.warn('CmdDelColumn', "Invalid colIdx: " + this.colIdx);
            return false;
        }
        var trs = this.table.getRows();
        // 校验每行是否都有colIdx的单元格，保证左边列对齐
        for (var i = 0; i < trs.length; i++) {
            if (!trs[i].leftAlign(this.colIdx)) {
                log_1.default.warn('CmdDelColumn', "Invalid colIdx: " + this.colIdx);
                return false;
            }
        }
        var firstTdIdx = firstTr.indexOf(firstTd);
        var tdsOfFirstRow = firstTr.getTds();
        // 第一行从colIdx单元格往后依次检查，保证列对齐
        var rightAlignColIdx = -1;
        var rightAligned = false;
        for (var i = firstTdIdx; i < tdsOfFirstRow.length; i++) {
            rightAlignColIdx = tdsOfFirstRow[i].getColRange()[1];
            if (trs.every(function (tr) { return tr.rightAlign(rightAlignColIdx); })) {
                rightAligned = true;
                break;
            }
        }
        if (!rightAligned) {
            return false;
        }
        var offset = rightAlignColIdx - this.colIdx + 1;
        trs.forEach(function (tr, i) {
            var tdsMatched = tr.getTdsInColRange([_this.colIdx, rightAlignColIdx]);
            tdsMatched.forEach(function (td) {
                _this.cmdMacro.addCommand(new CmdDelCell(_this.table, i, td.getColRange()[0]));
            });
            _this.cmdMacro.addCommand(new CmdMoveCol(_this.table, i, _this.colIdx, -offset));
        });
        var c = this.table.getColCount();
        this.cmdMacro.addCommand(new CmdSetColCount(this.table, c - 1));
        return this.cmdMacro.execute();
    };
    CmdDelColumn.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdDelColumn;
}());
exports.CmdDelColumn = CmdDelColumn;
var CmdMoveRow = /** @class */ (function () {
    function CmdMoveRow(table, rowIdx, offsetRows) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.offsetRows = offsetRows;
    }
    CmdMoveRow.prototype.execute = function () {
        var trs = this.table.getRows();
        if (this.rowIdx < 0 || this.rowIdx >= trs.length) {
            log_1.default.error('CmdMoveRow', "Invalid rowIdx: " + this.rowIdx + ", total rows: " + trs.length);
            return false;
        }
        for (var i = this.rowIdx; i < trs.length; i++) {
            trs[i].moveRows(this.offsetRows);
        }
        return true;
    };
    CmdMoveRow.prototype.undo = function () {
        var trs = this.table.getRows();
        for (var i = this.rowIdx; i < trs.length; i++) {
            trs[i].moveRows(-this.offsetRows);
        }
        return true;
    };
    return CmdMoveRow;
}());
var CmdMoveCol = /** @class */ (function () {
    function CmdMoveCol(table, rowIdx, startColIdx, offset) {
        this.anchorIdx = -1;
        this.table = table;
        this.rowIdx = rowIdx;
        this.startColIdx = startColIdx;
        this.offset = offset;
    }
    CmdMoveCol.prototype.execute = function () {
        var tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            return false;
        }
        this.anchorIdx = tr.moveCols(this.offset, this.startColIdx);
        return true;
    };
    CmdMoveCol.prototype.undo = function () {
        if (this.anchorIdx >= 0) {
            var tr = this.table.getRowByIndex(this.rowIdx);
            tr.moveCols(-this.offset, this.anchorIdx);
        }
        return true;
    };
    return CmdMoveCol;
}());
var CmdExtendRows = /** @class */ (function () {
    function CmdExtendRows(table, rowIdx, offsetRows) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.rowIdx = rowIdx;
        this.offsetRows = offsetRows;
    }
    CmdExtendRows.prototype.execute = function () {
        var _this = this;
        this.cmdMacro = new CommandMacro();
        var trs = this.table.getRows();
        if (this.rowIdx < 0 || this.rowIdx >= trs.length) {
            log_1.default.error('CmdExtendRow', "Invalid rowIdx: " + this.rowIdx + ", total rows: " + trs.length);
            return false;
        }
        var colCount = this.table.getColCount();
        var tds = trs[this.rowIdx].getTds();
        var holeStart = 0;
        var holeList = [];
        for (var i = 0; i < tds.length; i++) {
            var td = tds[i];
            var colRange = td.getColRange();
            if (holeStart < colRange[0]) {
                // 遇到空洞把空洞上面的单元格进行扩展
                holeList.push([holeStart, colRange[1] - 1]);
            }
            else {
                // 扩展单元格
                var rowRange = td.getRowRange();
                this.cmdMacro.addCommand(new CmdSetCellRowRange(this.table, rowRange[0], colRange[0], [rowRange[0], rowRange[1] + this.offsetRows]));
            }
            holeStart = colRange[1] + 1;
        }
        // 如果最后有空洞
        if (holeStart <= colCount - 1) {
            holeList.push([holeStart, colCount - 1]);
        }
        holeList.forEach(function (holeRange) {
            var holes = _this.table.getTdsCrossRow(_this.rowIdx, holeRange[0], holeRange[1]);
            holes.forEach(function (hole) {
                var holeRowRange = hole.getRowRange();
                var holeColRange = hole.getColRange();
                _this.cmdMacro.addCommand(new CmdSetCellRowRange(_this.table, holeRowRange[0], holeColRange[0], [holeRowRange[0], holeRowRange[1] + _this.offsetRows]));
            });
        });
        return this.cmdMacro.execute();
    };
    CmdExtendRows.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdExtendRows;
}());
var CmdExtendCols = /** @class */ (function () {
    function CmdExtendCols(table, rowIdx, colIdx, offsetCols) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.offsetCols = offsetCols;
    }
    CmdExtendCols.prototype.execute = function () {
        var tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            log_1.default.error('CmdExtendCol', "Invalid rowIdx: " + this.rowIdx);
            return false;
        }
        tr.extendCols(this.colIdx, this.offsetCols);
        return true;
    };
    CmdExtendCols.prototype.undo = function () {
        var tr = this.table.getRowByIndex(this.rowIdx);
        tr.extendCols(this.colIdx, -this.offsetCols);
        return true;
    };
    return CmdExtendCols;
}());
var CmdMergeCells = /** @class */ (function () {
    function CmdMergeCells(table, rowRange, colRange) {
        this.tds = [];
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.rowRange = rowRange;
        this.colRange = colRange;
    }
    CmdMergeCells.prototype.execute = function () {
        var _this = this;
        this.cmdMacro = new CommandMacro();
        var rowRange = this.rowRange;
        var colRange = this.colRange;
        var trs = this.table.getRows();
        var totalColCount = this.table.getColCount();
        if (rowRange[0] < 0 || rowRange[0] >= trs.length || rowRange[1] < 0 || rowRange[1] >= trs.length || rowRange[0] > rowRange[1]) {
            log_1.default.error('Table.mergeCells', "Invalid rowRange: " + this.rowRange);
            return false;
        }
        if (colRange[0] < 0 || colRange[0] >= totalColCount || colRange[1] < 0 || colRange[1] >= totalColCount || colRange[0] > colRange[1]) {
            log_1.default.error('Table.mergeCells', "Invalid colRange: " + this.colRange);
            return false;
        }
        // 校验左右是否对齐
        for (var i = rowRange[0]; i <= rowRange[1]; i++) {
            var tr = trs[i];
            if (!tr.leftAlign(colRange[0], true) || !tr.rightAlign(colRange[1], true)) {
                log_1.default.error('Table.mergeCells', "Invalid range. rowRange: " + rowRange + ", colRange: " + colRange);
                return false;
            }
        }
        // 校验第一行选中的单元格是否连续
        var tmpTds = trs[rowRange[0]].getTdsInColRange(colRange);
        for (var i = 0; i < tmpTds.length - 1; i++) {
            if (tmpTds[i].getColRange()[1] + 1 !== tmpTds[i + 1].getColRange()[0]) {
                log_1.default.error('Table.mergeCells', "Invalid rowRange: " + rowRange);
                return false;
            }
        }
        // 检验最后一行的空洞是否不再延续到下面
        var tmpTr = trs[rowRange[1]];
        tmpTds = tmpTr.getTdsInColRange(colRange);
        var holeStartIdx = colRange[0];
        for (var i = 0; i < tmpTds.length; i++) {
            var tmpTd = tmpTds[i];
            var tmpColRange = tmpTd.getColRange();
            if (holeStartIdx < tmpColRange[0]) {
                var tdsInHole = this.table.getTdsCrossRow(rowRange[1], holeStartIdx, tmpColRange[0] - 1);
                if (tdsInHole.length === 0) {
                    log_1.default.error('CmdMergeCells', "Invalid hole. rowIndex: " + rowRange[1] + ", colRange: [" + colRange[0] + ", " + (tmpColRange[0] - 1) + "]");
                    return false;
                }
                if (!tdsInHole.every(function (td) { return td.getRowRange()[1] === rowRange[1]; })) {
                    log_1.default.error('CmdMergeCells', "Hole is too large");
                    return false;
                }
            }
            holeStartIdx = tmpColRange[1] + 1;
            if (i === tmpTds.length - 1 && holeStartIdx <= colRange[1]) {
                var tdsInHole = this.table.getTdsCrossRow(rowRange[1], colRange[0], colRange[1]);
                if (tdsInHole.length === 0) {
                    log_1.default.error('CmdMergeCells', "Invalid hole. rowIndex: " + rowRange[1] + ", colRange: [" + colRange[0] + ", " + (tmpColRange[0] - 1) + "]");
                    return false;
                }
                if (!tdsInHole.every(function (td) { return td.getRowRange()[1] === rowRange[1]; })) {
                    log_1.default.error('CmdMergeCells', "Hole is too large");
                    return false;
                }
            }
        }
        // 取出所选区域的单元格
        var content = '';
        for (var i = rowRange[0]; i <= rowRange[1]; i++) {
            var tr = this.table.getRowByIndex(i);
            var tds = tr.getTdsInColRange(colRange);
            this.tds = this.tds.concat(tds);
            content += tds.reduce(function (r, td) {
                _this.cmdMacro.addCommand(new CmdDelCell(_this.table, td.getRowRange()[0], td.getColRange()[0]));
                return r + td.getContent();
            }, '');
        }
        var tdMerged = this.table.createCell({
            rowRange: rowRange,
            colRange: colRange,
            content: content
        });
        this.cmdMacro.addCommand(new CmdAddCell(this.table, tdMerged), new CmdRemoveBlankRows(this.table));
        // 如果跨n列合并的单元格上下的所有单元格都横跨该单元格的横向范围，就把这些单元格的跨列-(n - 1)
        if (colRange[0] != colRange[1]) {
            this.cmdMacro.addCommand(new CmdShrinkColumns(this.table, colRange));
        }
        return this.cmdMacro.execute();
    };
    CmdMergeCells.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdMergeCells;
}());
exports.CmdMergeCells = CmdMergeCells;
var CmdShrinkColumns = /** @class */ (function () {
    function CmdShrinkColumns(table, colRange) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.colRange = colRange;
    }
    CmdShrinkColumns.prototype.execute = function () {
        var _a;
        this.cmdMacro = new CommandMacro();
        var trs = this.table.getRows();
        var intersectRanges = this.table.getIntersectColRanges(this.colRange, 1);
        var colCountShrinked = 0;
        // 对交集列表从右到左进行遍历，避免计算上一次命令导致的偏移
        for (var i = intersectRanges.length - 1; i >= 0; i--) {
            var cmdList = [];
            var insRange = intersectRanges[i];
            var insRangeCount = insRange[1] - insRange[0] + 1;
            colCountShrinked += insRangeCount;
            for (var j = 0; j < trs.length; j++) {
                var tds = trs[j].getTds();
                var holeStartIdx = 0;
                for (var z = 0; z < tds.length; z++) {
                    var colRange = tds[z].getColRange();
                    if (colRange[0] <= insRange[0] && colRange[1] >= insRange[1]) {
                        // 在单元格里（因为获取交集时的冗余参数设置为1，因此肯定比交集大），就可以进行缩减
                        var tmpColIdxAfterShrink = colRange[0] + (colRange[1] - colRange[0]) - (insRange[1] - insRange[0]) - 1;
                        cmdList.push(new CmdSetCellColRange(this.table, j, colRange[0], [colRange[0], tmpColIdxAfterShrink]));
                        if (z !== tds.length - 1) {
                            // 把后面的单元格往左移动
                            cmdList.push(new CmdMoveCol(this.table, j, tds[z + 1].getColRange()[0], -insRangeCount));
                        }
                        break;
                    }
                    else if (holeStartIdx <= insRange[0] && colRange[0] > insRange[1]) {
                        // 在前面的空洞里（交集不会占据多个连续的空洞），就把后面的单元格往左移动
                        cmdList.push(new CmdMoveCol(this.table, j, colRange[0], -insRangeCount));
                        break;
                    }
                    // 交集在最后的空洞里不需要做任何事
                    holeStartIdx = colRange[1] + 1;
                }
            }
            if (cmdList.length > 0) {
                (_a = this.cmdMacro).addCommand.apply(_a, cmdList);
            }
        }
        this.cmdMacro.addCommand(new CmdSetColCount(this.table, this.table.getColCount() - colCountShrinked));
        return this.cmdMacro.execute();
    };
    CmdShrinkColumns.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdShrinkColumns;
}());
var CmdSplitCell = /** @class */ (function () {
    function CmdSplitCell(table, rowIdx, colIdx, rowCount, colCount) {
        this.cmdMacro = noopCmdMacro;
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.rowCount = rowCount;
        this.colCount = colCount;
    }
    CmdSplitCell.prototype.execute = function () {
        this.cmdMacro = new CommandMacro();
        var trs = this.table.getRows();
        if (this.rowIdx < 0 || this.rowIdx >= trs.length) {
            log_1.default.error('CmdSplitCell', "Invalid rowIdx: " + this.rowIdx);
            return false;
        }
        var td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            log_1.default.error('CmdSplitCell', "Cell not found. rowIdx: " + this.rowIdx + ", colIdx: " + this.colIdx);
            return false;
        }
        var rowRange = td.getRowRange();
        var originStartRowIdx = rowRange[0];
        var originEndRowIdx = rowRange[1];
        var originRowCount = originEndRowIdx - originStartRowIdx + 1;
        var colRange = td.getColRange();
        var originStartColIdx = colRange[0];
        var originEndColIdx = colRange[1];
        var originColCount = originEndColIdx - originStartColIdx + 1;
        // 拆分必须是整数倍
        if (this.rowCount % originRowCount !== 0 && originRowCount % this.rowCount !== 0) {
            log_1.default.error(originRowCount + " rows cannot be split into " + this.rowCount + " rows");
            return false;
        }
        if (this.colCount % originColCount !== 0 && originColCount % this.colCount !== 0) {
            log_1.default.error(originColCount + " columns cannot be split into " + this.colCount + " columns");
            return false;
        }
        // *** 分割行 ***
        var endRowIdxAfterSplit = originEndRowIdx;
        var rowStep;
        if (this.rowCount > originRowCount) {
            /* 如果分割的行比最小单位的行数多 */
            var cPerRow = this.rowCount / originRowCount;
            endRowIdxAfterSplit = originStartRowIdx + this.rowCount - 1;
            rowStep = 1;
            var blankRowsInc = cPerRow - 1;
            // 把被拆分的单元格下面的行都向下移动
            if (originEndRowIdx !== trs.length - 1) {
                this.cmdMacro.addCommand(new CmdMoveRow(this.table, originEndRowIdx + 1, this.rowCount - originRowCount));
            }
            for (var i = originStartRowIdx; i < originEndRowIdx + 1; i++) {
                var tmpIdx = i + (cPerRow - 1) * (i - originStartRowIdx);
                this.cmdMacro.addCommand(new CmdExtendRows(this.table, tmpIdx, blankRowsInc));
                // 把被拆分单元格所在的所有行向下扩展
                var tmpC = blankRowsInc;
                while (tmpC-- > 0) {
                    this.cmdMacro.addCommand(new CmdAddBlankRow(this.table, tmpIdx + 1));
                }
            }
        }
        else {
            rowStep = originRowCount / this.rowCount;
        }
        // 缩小被拆分单元格所占的行数
        this.cmdMacro.addCommand(new CmdSetCellRowRange(this.table, originStartRowIdx, originStartColIdx, [originStartRowIdx, originStartRowIdx + rowStep - 1]));
        // 插入单元格到被拆分的单元格中
        for (var i = originStartRowIdx + rowStep; i < endRowIdxAfterSplit + 1; i += rowStep) {
            var tmpTd = this.table.createCell({
                rowRange: [i, i + rowStep - 1],
                colRange: [originStartColIdx, originEndColIdx]
            });
            this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
        }
        // 修改行后的末行索引
        var finalEndRowIdx = trs.length + endRowIdxAfterSplit - originEndRowIdx;
        // *** 分割列 ***
        var endColIdxAfterSplit = originEndColIdx;
        var colStep;
        if (this.colCount > originColCount) {
            /* 如果分割的列比最小单位的列数多 */
            // originStartColIdx = 0 originEndColIdx = 1 cPerCol = 2
            var cPerCol = this.colCount / originColCount;
            colStep = 1;
            endColIdxAfterSplit = originStartColIdx + this.colCount - 1;
            var blankColsInc = cPerCol - 1;
            // 每行在被拆分单元格（包含）及后面的单元格进行扩展
            for (var i = originStartColIdx; i < originEndColIdx + 1; i++) {
                for (var j = 0; j < finalEndRowIdx; j++) {
                    this.cmdMacro.addCommand(new CmdExtendCols(this.table, j, originStartColIdx, blankColsInc));
                }
                var tmpC = blankColsInc;
                while (tmpC-- > 0) {
                    this.cmdMacro.addCommand(new CmdAddColHeader(this.table, i + (i - originStartColIdx) * cPerCol));
                }
            }
        }
        else {
            colStep = originColCount / this.colCount;
        }
        for (var i = originStartRowIdx; i < endRowIdxAfterSplit + 1; i += rowStep) {
            // 缩小被拆分的单元格
            this.cmdMacro.addCommand(new CmdSetCellColRange(this.table, i, originStartColIdx, [originStartColIdx, originStartColIdx + colStep - 1]));
            // 插入新增的单元格
            for (var j = originStartColIdx + colStep; j < endColIdxAfterSplit + 1; j += colStep) {
                var tmpTd = this.table.createCell({
                    rowRange: [i, i + rowStep - 1],
                    colRange: [j, j + colStep - 1]
                });
                this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
            }
        }
        this.cmdMacro.addCommand(new CmdRemoveBlankRows(this.table), new CmdSetColCount(this.table, this.table.getColCount() + this.colCount - 1));
        return this.cmdMacro.execute();
    };
    CmdSplitCell.prototype.undo = function () {
        return this.cmdMacro.undo();
    };
    return CmdSplitCell;
}());
exports.CmdSplitCell = CmdSplitCell;
var CmdSetCellContent = /** @class */ (function () {
    function CmdSetCellContent(table, row, col, content) {
        this.prevContent = '';
        this.table = table;
        this.row = row;
        this.col = col;
        this.content = content;
    }
    CmdSetCellContent.prototype.execute = function () {
        var prevContent = this.table.getCellContent(this.row, this.col);
        if (prevContent === null) {
            return false;
        }
        this.prevContent = prevContent;
        return this.table.setCellContent(this.row, this.col, this.content);
    };
    CmdSetCellContent.prototype.undo = function () {
        var content = this.table.getCellContent(this.row, this.col);
        if (content === null) {
            return false;
        }
        if (content !== this.content) {
            // warn
        }
        return this.table.setCellContent(this.row, this.col, this.prevContent);
    };
    return CmdSetCellContent;
}());
exports.CmdSetCellContent = CmdSetCellContent;


/***/ }),

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function insertNode(parent, child, idx) {
    if (idx < 0 || idx > parent.childNodes.length) {
        return false;
    }
    if (idx === parent.childNodes.length) {
        parent.appendChild(child);
    }
    else {
        parent.insertBefore(child, parent.childNodes[idx]);
    }
    return true;
}
exports.insertNode = insertNode;
function getEventPath(e) {
    if ('path' in e) {
        return e['path'];
    }
    var path = [e.target];
    var elem = e.target;
    while (elem['parentElement'] !== null) {
        path.push(elem.parentElement);
        elem = elem.parentElement;
    }
    path.push(document, window);
    return path;
}
exports.getEventPath = getEventPath;


/***/ }),

/***/ "./src/editor.ts":
/*!***********************!*\
  !*** ./src/editor.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pkg = __webpack_require__(/*! ../package.json */ "./package.json");
var table_1 = __webpack_require__(/*! ./table */ "./src/table.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var command_1 = __webpack_require__(/*! ./command */ "./src/command.ts");
__webpack_require__(/*! ../style/editor.scss */ "./style/editor.scss");
var log_1 = __webpack_require__(/*! ./log */ "./src/log.ts");
var event_1 = __webpack_require__(/*! ./event */ "./src/event.ts");
var NOT_EDITABLE_MSG = 'Table can not be edit';
var TableEditor = /** @class */ (function () {
    function TableEditor(options) {
        var _this = this;
        this.elem = options.elem;
        this.elem.innerHTML = '';
        var className = "table-editor-hahaha";
        this.editable = 'editable' in options ? !!options.editable : true;
        this.eventHandler = new event_1.EditorEventHandler();
        this.debug = 'debug' in options ? !!options.debug : false;
        this.table = new table_1.Table({
            className: className,
            data: options.data,
            defaultColWidth: options.defaultColWidth || 0,
            fullWidth: !!options.fullWidth,
            editable: this.editable,
            resizeable: 'resizeable' in options ? !!options['resizeable'] : false,
            borderColor: options.borderColor || '',
            cellStyle: 'cellStyle' in options ? options.cellStyle : {},
            cellClass: utils_1.isString(options.cellClass) ? "" + options.cellClass : '',
            debug: this.debug,
            onCellFocus: function (v) {
                _this.eventHandler.trigger(event_1.EDITOR_EVENTS.CELL_FOCUS, v);
            },
            onCellBlur: function (v) {
                _this.eventHandler.trigger(event_1.EDITOR_EVENTS.CELL_BLUR, v);
            },
            onMouseMove: function (v) {
                _this.eventHandler.trigger(event_1.EDITOR_EVENTS.MOUSE_MOVE, v);
            }
        });
        this.elem.appendChild(this.table.elem);
        this.cmdHistory = new CommandHistory('maxUndoTimes' in options && options.maxUndoTimes > 0 ? options.maxUndoTimes : 10);
    }
    TableEditor.prototype.addRow = function (rowIdx, above) {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info("Add one row " + (above ? 'above' : 'below') + " row: " + rowIdx);
        }
        var cmd = new command_1.CmdAddRow(this.table, rowIdx, above);
        var success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.delRow = function (rowIdx) {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info("Delete row " + rowIdx);
        }
        var cmd = new command_1.CmdDelRow(this.table, rowIdx);
        var success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.addColumn = function (colIdx, left) {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info("Add one column " + (left ? 'left' : 'right') + " of column " + colIdx);
        }
        var cmd = new command_1.CmdAddColumn(this.table, colIdx, left);
        var success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.delColumn = function (colIdx) {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info("Delete column " + colIdx);
        }
        var cmd = new command_1.CmdDelColumn(this.table, colIdx);
        var success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.mergeCells = function (rowRange, colRange) {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info("Merge cells. Row: " + rowRange[0] + " ~ " + rowRange[1] + ", Column: " + colRange[0] + " ~ " + colRange[1]);
        }
        var cmd = new command_1.CmdMergeCells(this.table, rowRange, colRange);
        var success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.splitCell = function (rowIdx, colIdx, rowCount, colCount) {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info("Split cell (" + rowIdx + ", " + colIdx + ") into " + rowCount + " rows and " + colCount + " columns");
        }
        var cmd = new command_1.CmdSplitCell(this.table, rowIdx, colIdx, rowCount, colCount);
        var success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.getCellContent = function (rowIdx, colIdx) {
        return this.table.getCellContent(rowIdx, colIdx) || '';
    };
    TableEditor.prototype.setCellContent = function (rowIdx, colIdx, content) {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info("Set cell (" + rowIdx + ", " + colIdx + ") \"" + content + "\"");
        }
        var cmd = new command_1.CmdSetCellContent(this.table, rowIdx, colIdx, content);
        var success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.undo = function () {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log_1.log.info('Undo');
        }
        var success = this.cmdHistory.undo();
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    };
    TableEditor.prototype.redo = function () {
        if (!this.editable) {
            log_1.log.warn(NOT_EDITABLE_MSG);
            return;
        }
        if (this.debug) {
            log_1.log.info('Redo');
        }
        this.cmdHistory.redo();
        if (this.debug) {
            this.printDebugInfo();
        }
    };
    TableEditor.prototype.getTableData = function () {
        return this.table.getTableData();
    };
    TableEditor.prototype.setEditable = function (editable) {
        this.editable = editable;
        this.table.setEditable(this.editable);
    };
    TableEditor.prototype.addEventListener = function (name, handler) {
        this.eventHandler.addHandler(name, handler);
    };
    TableEditor.prototype.removeEventListener = function (name, handler) {
        this.eventHandler.removeHandler(name, handler);
    };
    TableEditor.prototype.printDebugInfo = function () {
        var errorMsg = this.table.validate();
        if (errorMsg) {
            log_1.log.error("\uD83D\uDCA9 " + errorMsg);
        }
        this.cmdHistory.printStatus();
    };
    TableEditor.prototype.destroy = function () {
        this.table.destroy();
    };
    TableEditor.version = pkg.version;
    return TableEditor;
}());
exports.TableEditor = TableEditor;
var CommandHistory = /** @class */ (function () {
    function CommandHistory(max) {
        this.divide = 0;
        this.top = 0;
        this.cap = +max;
        this.commands = [];
    }
    CommandHistory.prototype.push = function (cmd) {
        if (this.divide < this.top) {
            for (var i = this.divide; i <= this.top - 1; i++) {
                this.commands[i] = null;
            }
            this.top = this.divide;
        }
        if (this.top === this.cap) {
            this.commands.shift();
            this.commands.push(cmd);
        }
        else {
            this.commands[this.top] = cmd;
            this.divide = ++this.top;
        }
    };
    CommandHistory.prototype.undo = function () {
        if (this.divide === 0) {
            return false;
        }
        var success = this.commands[this.divide - 1].undo();
        if (success) {
            this.divide--;
        }
        return success;
    };
    CommandHistory.prototype.redo = function () {
        if (this.divide === this.top) {
            return false;
        }
        var success = this.commands[this.divide + 1].execute();
        if (success) {
            this.divide++;
        }
        return success;
    };
    CommandHistory.prototype.printStatus = function () {
        log_1.log.info("\uD83D\uDC7D Command History: Capability: " + this.cap + "  Undo: " + this.divide + "  Redo: " + (this.top - this.divide), this.commands);
    };
    return CommandHistory;
}());


/***/ }),

/***/ "./src/event.ts":
/*!**********************!*\
  !*** ./src/event.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __webpack_require__(/*! ./log */ "./src/log.ts");
exports.EDITOR_EVENTS = {
    CELL_FOCUS: 'cellfocus',
    CELL_BLUR: 'cellblur',
    MOUSE_MOVE: 'mousemove'
};
var eventNames = Object.keys(exports.EDITOR_EVENTS).map(function (k) {
    return exports.EDITOR_EVENTS[k];
});
var EditorEventHandler = /** @class */ (function () {
    function EditorEventHandler() {
        var _this = this;
        this.events = new Map();
        eventNames.forEach(function (n) {
            _this.events.set(n, []);
        });
    }
    EditorEventHandler.prototype.addHandler = function (name, handler) {
        if (!this.events.has(name)) {
            log_1.default.warn("Invalid event: " + name + ". Available events: " + eventNames.join(', '));
            return;
        }
        if (typeof handler !== 'function') {
            log_1.default.warn("Invalid event handler");
            return;
        }
        this.events.get(name).push(handler);
    };
    EditorEventHandler.prototype.removeHandler = function (name, handler) {
        if (!this.events.has(name)) {
            log_1.default.warn("Invalid event: " + name + ". Available events: " + eventNames.join(', '));
            return;
        }
        if (typeof handler !== 'function') {
            log_1.default.warn("Invalid event handler");
            return;
        }
        var hs = this.events.get(name);
        var idx = hs.indexOf(handler);
        if (idx >= 0) {
            hs.splice(idx, 1);
        }
    };
    EditorEventHandler.prototype.trigger = function (name, value) {
        this.events.get(name).forEach(function (h) {
            h(value);
        });
    };
    return EditorEventHandler;
}());
exports.EditorEventHandler = EditorEventHandler;
var TECellFocusEvent = /** @class */ (function () {
    function TECellFocusEvent(row, col) {
        this.row = row;
        this.col = col;
    }
    return TECellFocusEvent;
}());
exports.TECellFocusEvent = TECellFocusEvent;
var TECellBlurEvent = /** @class */ (function () {
    function TECellBlurEvent(row, col) {
        this.row = row;
        this.col = col;
    }
    return TECellBlurEvent;
}());
exports.TECellBlurEvent = TECellBlurEvent;
var TEMouseMoveEvent = /** @class */ (function () {
    function TEMouseMoveEvent(data) {
        this.offsetX = data.offsetX;
        this.offsetY = data.offsetY;
    }
    return TEMouseMoveEvent;
}());
exports.TEMouseMoveEvent = TEMouseMoveEvent;


/***/ }),

/***/ "./src/log.ts":
/*!********************!*\
  !*** ./src/log.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PREFIX = '👻';
exports.log = {
    info: function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        (console.info || console.log).apply(void 0, __spreadArrays([PREFIX], messages));
    },
    warn: function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        (console.warn || console.log).apply(void 0, __spreadArrays([PREFIX], messages));
    },
    error: function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        (console.error || console.log).apply(void 0, __spreadArrays([PREFIX], messages));
    }
};
exports.default = exports.log;


/***/ }),

/***/ "./src/table.ts":
/*!**********************!*\
  !*** ./src/table.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __webpack_require__(/*! ./log */ "./src/log.ts");
var dom_1 = __webpack_require__(/*! ./dom */ "./src/dom.ts");
var event_1 = __webpack_require__(/*! ./event */ "./src/event.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function tdRangeToString(range) {
    if (range.length === 0) {
        return '';
    }
    if (typeof range[0] === 'number') {
        return "[" + range[0] + ", " + range[1] + "]";
    }
    var tmpArr = range.map(function (r) {
        return "[" + r[0] + ", " + r[1] + "]";
    });
    return "[" + tmpArr.join(', ') + "]";
}
exports.tdRangeToString = tdRangeToString;
var Td = /** @class */ (function () {
    function Td(options) {
        var _this = this;
        this.rowRange = [-1, -1];
        this.colRange = [-1, -1];
        this.editable = true;
        this.content = options.content || '';
        this.elem = document.createElement('td');
        if ('borderColor' in options && options.borderColor) {
            this.elem.style.borderColor = options.borderColor;
        }
        // cc is short for "content cell"
        this.ccElem = document.createElement('div');
        this.ccElem.className = 'cell-content';
        this.ccElem.innerText = this.content;
        this.elem.appendChild(this.ccElem);
        // @ts-ignore
        this.elem.td = this;
        this.setRowRange(options.rowRange);
        this.setColRange(options.colRange);
        this.props = options.props || {};
        if (this.props.style) {
            Object.keys(this.props.style).forEach(function (k) {
                // @ts-ignore
                _this.ccElem.style[k] = _this.props.style[k];
            });
        }
        if (this.props.class) {
            this.ccElem.classList.add(this.props.class);
        }
    }
    Td.prototype.getRowRange = function () {
        return this.rowRange;
    };
    Td.prototype.getColRange = function () {
        return this.colRange;
    };
    Td.prototype.getContent = function () {
        return this.content;
    };
    Td.prototype.getElem = function () {
        return this.elem;
    };
    Td.prototype.setRowRange = function (range) {
        this.rowRange = range;
        if (range[1] === range[0]) {
            this.elem.removeAttribute('rowspan');
        }
        else {
            this.elem.rowSpan = range[1] - range[0] + 1;
        }
    };
    Td.prototype.setColRange = function (range) {
        this.colRange = range;
        if (range[1] === range[0]) {
            this.elem.removeAttribute('colspan');
        }
        else {
            this.elem.colSpan = range[1] - range[0] + 1;
        }
    };
    Td.prototype.setContent = function (content, updateElement) {
        if (updateElement === void 0) { updateElement = true; }
        this.content = content;
        if (updateElement) {
            this.ccElem.innerText = content;
        }
    };
    Td.prototype.setEditable = function (editable) {
        this.editable = editable;
        if (this.editable) {
            this.ccElem.contentEditable = 'true';
        }
        else {
            this.ccElem.removeAttribute('contenteditable');
        }
    };
    return Td;
}());
exports.Td = Td;
var Tr = /** @class */ (function () {
    function Tr(tds) {
        var _this = this;
        this.colCount = 0;
        this.tds = tds || [];
        this.elem = document.createElement('tr');
        this.tds.forEach(function (td) {
            _this.elem.appendChild(td.getElem());
        });
    }
    Tr.prototype.getElem = function () {
        return this.elem;
    };
    Tr.prototype.getTds = function () {
        return this.tds;
    };
    Tr.prototype.addTd = function (td) {
        var colRange = td.getColRange();
        if (this.tds.length === 0 || this.tds[this.tds.length - 1].getColRange()[1] < colRange[0]) {
            // 空行或者需要插入到最后
            this.elem.appendChild(td.getElem());
            this.tds.push(td);
            return 1;
        }
        else if (this.tds[0].getColRange()[0] > colRange[1]) {
            // 插入到开头
            dom_1.insertNode(this.elem, td.getElem(), 0);
            this.tds.unshift(td);
            return 1;
        }
        else {
            // 插入到中间
            for (var i = 0; i < this.tds.length; i++) {
                if (i !== this.tds.length - 1) {
                    var tmpColRange = this.tds[i].getColRange();
                    var tmpNextColRange = this.tds[i + 1].getColRange();
                    if (colRange[0] > tmpColRange[1] && colRange[1] < tmpNextColRange[0]) {
                        // 插入到空洞
                        dom_1.insertNode(this.elem, td.getElem(), i + 1);
                        this.tds.splice(i + 1, 0, td);
                        return 1;
                    }
                }
            }
        }
        var tdsRange = this.tds.map(function (td) {
            return td.getColRange();
        });
        log_1.default.error('Tr.addTd', "Add td fail. tds col range: " + tdRangeToString(tdsRange) + ", tdRange: " + tdRangeToString(colRange));
        return 0;
    };
    Tr.prototype.removeTdByColIdx = function (colIdx) {
        for (var i = 0; i < this.tds.length; i++) {
            var td = this.tds[i];
            var colRange = td.getColRange();
            if (colRange[0] === colIdx) {
                this.elem.removeChild(td.getElem());
                this.tds.splice(i, 1);
                return 1;
            }
        }
        return 0;
    };
    Tr.prototype.getTdByColIndex = function (colIdx) {
        for (var i = 0; i < this.tds.length; i++) {
            if (this.tds[i].getColRange()[0] === colIdx) {
                return this.tds[i];
            }
        }
        return null;
    };
    Tr.prototype.getTdsInColRange = function (range) {
        var start = -1;
        var end = -1;
        for (var i = 0; i < this.tds.length; i++) {
            var colRange = this.tds[i].getColRange();
            if (start === -1 && colRange[0] >= range[0]) {
                start = i;
            }
            if (colRange[1] <= range[1]) {
                end = i;
            }
        }
        return start >= 0 && end >= 0 ? this.tds.slice(start, end + 1) : [];
    };
    Tr.prototype.indexOf = function (td) {
        for (var i = 0; i < this.tds.length; i++) {
            if (td === this.tds[i]) {
                return i;
            }
        }
        return -1;
    };
    Tr.prototype.leftAlign = function (colIdx, strict) {
        if (strict === void 0) { strict = false; }
        if (colIdx === 0) {
            return true;
        }
        var holeStart = 0;
        for (var i = 0; i < this.tds.length; i++) {
            var colRange = this.tds[i].getColRange();
            if (colRange[0] === colIdx) {
                return true;
            }
            // 如果非严格模式并且在空洞里
            if (!strict && colIdx >= holeStart && colIdx < colRange[0]) {
                return true;
            }
            holeStart = colRange[1] + 1;
        }
        // 非严格模式落在最后一个空洞里
        return !strict && colIdx >= holeStart && colIdx < this.colCount - 1;
    };
    Tr.prototype.rightAlign = function (colIdx, strict) {
        if (strict === void 0) { strict = false; }
        if (colIdx === this.colCount - 1) {
            return true;
        }
        var holeStart = 0;
        for (var i = 0; i < this.tds.length; i++) {
            var colRange = this.tds[i].getColRange();
            if (colIdx === colRange[1]) {
                return true;
            }
            if (!strict && colIdx >= holeStart && colIdx < colRange[0]) {
                return true;
            }
            holeStart = colRange[1] + 1;
        }
        return !strict && colIdx >= holeStart && colIdx < this.colCount - 1;
    };
    Tr.prototype.moveRows = function (offset) {
        if (offset === void 0) { offset = 1; }
        this.tds.forEach(function (td) {
            var rowRange = td.getRowRange();
            td.setRowRange([rowRange[0] + offset, rowRange[1] + offset]);
        });
    };
    Tr.prototype.moveCols = function (offset, startColIdx) {
        var anchorIdx = -1;
        this.tds.forEach(function (td) {
            var colRange = td.getColRange();
            if (colRange[0] >= startColIdx) {
                td.setColRange([colRange[0] + offset, colRange[1] + offset]);
                if (anchorIdx < 0) {
                    anchorIdx = colRange[0] + offset;
                }
            }
        });
        return anchorIdx;
    };
    Tr.prototype.extendCols = function (colIdx, offsetCols) {
        var targetTd;
        var targetIdx = -1;
        // 设置为"空洞"的开始
        var holeStart = 0;
        for (var i = 0; i < this.tds.length; i++) {
            var td = this.tds[i];
            var colRange = td.getColRange();
            if (colIdx >= holeStart && colIdx < colRange[0]) {
                // 在空洞里，就把后面的都往后移动
                for (var j = i; j < this.tds.length; j++) {
                    var tmpTd = this.tds[j];
                    var tmpColRange = tmpTd.getColRange();
                    tmpTd.setColRange([tmpColRange[0] + offsetCols, tmpColRange[1] + offsetCols]);
                }
                break;
            }
            else if (colIdx >= colRange[0] && colIdx <= colRange[1]) {
                // 如果在单元格里，就把当前单元格扩展，把后面的单元格后移
                td.setColRange([colRange[0], colRange[1] + offsetCols]);
                for (var j = i + 1; j < this.tds.length; j++) {
                    var tmpColRange = this.tds[j].getColRange();
                    this.tds[j].setColRange([tmpColRange[0] + offsetCols, tmpColRange[1] + offsetCols]);
                }
                break;
            }
            holeStart = colRange[1] + 1;
        }
    };
    Tr.prototype.setColContent = function (n) {
        this.colCount = n;
    };
    return Tr;
}());
exports.Tr = Tr;
var MouseMode;
(function (MouseMode) {
    MouseMode[MouseMode["NONE"] = 0] = "NONE";
    MouseMode[MouseMode["RESIZE"] = 1] = "RESIZE";
    MouseMode[MouseMode["SELECT"] = 2] = "SELECT";
})(MouseMode || (MouseMode = {}));
var Table = /** @class */ (function () {
    function Table(options) {
        var _this = this;
        this.colCount = 0;
        this.mouseMode = MouseMode.NONE;
        this.mouseDownPos = { pageX: 0, pageY: 0, clientX: 0, clientY: 0 };
        // 拖动的竖线的状态变量
        this.colElsResizing = [];
        this.resizeRange = [-1, -1];
        // 开始拖拽的单元格
        this.tdSelectStart = { r: 0, c: 0 };
        this.elem = document.createElement('table');
        this.elem.className = options.className;
        if (options.fullWidth) {
            this.elem.classList.add('full-width');
        }
        this.colgroupElem = document.createElement('colgroup');
        this.tbodyElem = document.createElement('tbody');
        this.elem.appendChild(this.colgroupElem);
        this.elem.appendChild(this.tbodyElem);
        this.trs = [];
        this.defaultColWidth = options.defaultColWidth;
        this.editable = options.editable;
        this.resizeable = options.resizeable;
        this.cellStyle = options.cellStyle;
        this.cellClass = options.cellClass;
        this.borderColor = options.borderColor;
        this.debug = options.debug;
        this.onCellFocus = options.onCellFocus;
        this.onCellBlur = options.onCellBlur;
        this.onMouseMove = options.onMouseMove;
        var data = options.data || [[{
                    row: [0, 0],
                    col: [0, 0],
                    content: '',
                    style: {}
                }]];
        try {
            if (data.length === 0) {
                return;
            }
            var cwc_1 = new ColWidthCalculator();
            if ('row' in data[0]) {
                // TableCells
                data.forEach(function (tdData) {
                    var rowRange = tdData.row;
                    var colRange = tdData.col;
                    if (_this.trs.length - 1 < rowRange[1]) {
                        for (var i_1 = _this.trs.length; i_1 <= rowRange[1]; i_1++) {
                            var tr_1 = new Tr();
                            _this.trs.push(tr_1);
                            _this.tbodyElem.appendChild(tr_1.getElem());
                        }
                    }
                    var tr = _this.trs[rowRange[0]];
                    tr.addTd(_this.createCell({
                        rowRange: rowRange,
                        colRange: colRange,
                        content: tdData.content,
                        props: {
                            style: 'style' in tdData ? utils_1.extend(_this.cellStyle, tdData.style) : _this.cellStyle,
                            class: _this.cellClass
                        }
                    }));
                    if ('width' in tdData) {
                        cwc_1.add(colRange, tdData['width']);
                    }
                    if (_this.colCount < colRange[1]) {
                        _this.colCount = colRange[1];
                    }
                });
            }
            else {
                // TableData
                this.trs = data.map(function (trData) {
                    var tds = trData.map(function (td) {
                        if (_this.colCount < td.col[1]) {
                            _this.colCount = td.col[1];
                        }
                        if ('width' in td) {
                            cwc_1.add(td.col, td.width);
                        }
                        return _this.createCell({
                            rowRange: td.row,
                            colRange: td.col,
                            content: td.content,
                            props: {
                                style: 'style' in td ? utils_1.extend(_this.cellStyle, td.style) : _this.cellStyle,
                                class: _this.cellClass
                            }
                        });
                    });
                    var tr = new Tr(tds);
                    _this.tbodyElem.appendChild(tr.getElem());
                    return tr;
                });
            }
            this.colCount++;
            var i = 0;
            var colWidthCalculated = cwc_1.calc(this.colCount, this.defaultColWidth);
            while (i < this.colCount) {
                var colElem = document.createElement('col');
                if (colWidthCalculated[i] > 0) {
                    colElem.style.width = colWidthCalculated[i] + "px";
                }
                else if (this.defaultColWidth > 0) {
                    colElem.style.width = this.defaultColWidth + "px";
                }
                this.colgroupElem.appendChild(colElem);
                i++;
            }
            // 空行
            var blankRowIndexes_1 = [];
            this.trs.forEach(function (tr, tri) {
                var tds = tr.getTds();
                if (tds.length === 0) {
                    blankRowIndexes_1.push(tri);
                }
                else {
                    tds.forEach(function (td) {
                        td.setEditable(_this.editable);
                    });
                }
            });
            if (blankRowIndexes_1.length > 0) {
                for (var tri = blankRowIndexes_1.length - 1; tri >= 0; tri--) {
                    this.trs[tri].getElem().remove();
                    this.trs.splice(tri, 1);
                }
                log_1.default.warn("Rows: (" + blankRowIndexes_1.join(', ') + ") are blank.");
            }
            // 校验一下
            var errMsg = this.validate();
            if (errMsg) {
                log_1.default.error('Table data error.', this.trs, "" + errMsg);
                return;
            }
        }
        catch (e) {
            log_1.default.error('Invalid table data.', options.data, e);
            return;
        }
        this.initEventListener();
    }
    Table.prototype.initEventListener = function () {
        var _this = this;
        this.elem.addEventListener('input', function (e) {
            if (!_this.editable) {
                return;
            }
            e.stopPropagation();
            var ep = dom_1.getEventPath(e);
            var target = e.target;
            if (_this.eventTargetIsCellContent(e)) {
                // @ts-ignore
                var td = ep[1].td;
                td.setContent(target['innerText'], false);
            }
        });
        var RESIZE_OFFSET = 5;
        this.elem.addEventListener('mousedown', function (e) {
            if (!_this.editable || !_this.eventTargetIsCellContent(e)) {
                return;
            }
            _this.mouseDownPos = {
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY
            };
            var target = e.target;
            // @ts-ignore
            var td = target['parentNode']['td'];
            var tmpIdx = td.getColRange()[0] + (e.offsetX < RESIZE_OFFSET ? 0 : 1);
            if ((e.offsetX < RESIZE_OFFSET && tmpIdx > 0) || e.offsetX > target['clientWidth'] - RESIZE_OFFSET) {
                if (!_this.resizeable || _this.defaultColWidth <= 0) {
                    return;
                }
                // 不能拖拽第一条竖线
                _this.mouseMode = MouseMode.RESIZE;
                var colEls = _this.colgroupElem.children;
                var maxLeftOffset = +colEls[tmpIdx + 1]['style'].width.slice(0, -2) - 2 * RESIZE_OFFSET - 30;
                var colEl = colEls[tmpIdx];
                // @ts-ignore
                colEl['originWidth'] = +colEl.style.width.slice(0, -2);
                if (tmpIdx === colEls.length) {
                    // 最后一条竖线
                    _this.resizeRange = [maxLeftOffset, _this.elem.parentElement.clientWidth - _this.elem.clientWidth];
                    _this.colElsResizing = [colEl];
                }
                else {
                    var maxRightOffset = +colEl['style'].width.slice(0, -2) - 2 * RESIZE_OFFSET - 30;
                    _this.resizeRange = [maxLeftOffset, maxRightOffset];
                    var leftColEl = colEls[tmpIdx - 1];
                    // @ts-ignore
                    leftColEl['originWidth'] = +leftColEl.style.width.slice(0, -2);
                    _this.colElsResizing = [leftColEl, colEl];
                }
            }
            else {
                _this.mouseMode = MouseMode.SELECT;
                _this.tdSelectStart = { r: td.getRowRange()[0], c: td.getColRange()[0] };
            }
        });
        this.elem.addEventListener('mouseup', function (e) {
            if (!_this.editable) {
                return;
            }
            _this.elem.style.cursor = 'text';
            _this.mouseMode = MouseMode.NONE;
        });
        this.elem.addEventListener('mousemove', function (e) {
            var target = e.target;
            var ep = dom_1.getEventPath(e);
            if (_this.mouseMode === MouseMode.NONE) {
                if (_this.eventTargetIsCellContent(e) && (e.offsetX < RESIZE_OFFSET || e.offsetX > target['clientWidth'] - RESIZE_OFFSET)) {
                    // 鼠标在竖线上
                    if (_this.resizeable) {
                        _this.elem.style.cursor = 'col-resize';
                    }
                }
                else {
                    if (_this.editable) {
                        _this.elem.style.cursor = 'text';
                    }
                }
            }
            else if (_this.mouseMode === MouseMode.RESIZE) {
                if (_this.resizeable) {
                    _this.elem.style.cursor = 'col-resize';
                    var startPageX = _this.mouseDownPos.pageX;
                    var leftOffset = e.pageX < startPageX
                        ? Math.min(startPageX - e.pageX, _this.resizeRange[0])
                        : -Math.min(e.pageX - startPageX, _this.resizeRange[1]);
                    var leftColEl = _this.colElsResizing[0];
                    // @ts-ignore
                    leftColEl.style.width = leftColEl['originWidth'] - leftOffset + "px";
                    if (_this.colElsResizing.length > 1) {
                        var rightColEl = _this.colElsResizing[1];
                        // @ts-ignore
                        rightColEl.style.width = rightColEl['originWidth'] + leftOffset + "px";
                    }
                }
            }
            else if (_this.mouseMode === MouseMode.SELECT) {
                if (_this.editable) {
                    //
                }
            }
            _this.onMouseMove(new event_1.TEMouseMoveEvent({
                offsetX: e.offsetX,
                offsetY: e.offsetY
            }));
        });
        this.elem.addEventListener('mouseout', function (e) {
            _this.elem.style.cursor = 'default';
        });
        this.elem.addEventListener('focusin', function (e) {
            if (_this.eventTargetIsCellContent(e)) {
                var target = e.target;
                var tdEl = target.parentElement;
                // @ts-ignore
                var td = tdEl.td;
                var rowRange = td.getRowRange();
                var colRange = td.getColRange();
                _this.onCellFocus(new event_1.TECellFocusEvent([rowRange[0], rowRange[1]], [colRange[0], colRange[1]]));
            }
        });
        this.elem.addEventListener('focusout', function (e) {
            if (_this.eventTargetIsCellContent(e)) {
                var target = e.target;
                var tdEl = target.parentElement;
                tdEl.style.background = '';
                // @ts-ignore
                var td = tdEl.td;
                var rowRange = td.getRowRange();
                var colRange = td.getColRange();
                _this.onCellBlur(new event_1.TECellBlurEvent([rowRange[0], rowRange[1]], [colRange[0], colRange[1]]));
            }
        });
    };
    Table.prototype.createCell = function (options) {
        if (!options.props) {
            options.props = {};
        }
        if (!options.props.style) {
            options.props.style = {};
        }
        if (this.cellClass) {
            options.props.class = this.cellClass;
        }
        if (this.borderColor) {
            options.borderColor = this.borderColor;
        }
        var td = new Td(options);
        td.setEditable(this.editable);
        return td;
    };
    Table.prototype.eventTargetIsCellContent = function (e) {
        var ep = dom_1.getEventPath(e);
        return e.target instanceof HTMLElement && e.target.classList.contains('cell-content') && ep[4] === this.elem;
    };
    Table.prototype.addRow = function (rowIdx) {
        if (rowIdx < 0 || rowIdx > this.trs.length) {
            log_1.default.error('Table.addRow', "Invalid rowIdx: " + rowIdx);
            return 0;
        }
        var tr = new Tr();
        dom_1.insertNode(this.tbodyElem, tr.getElem(), rowIdx);
        this.trs.splice(rowIdx, 0, tr);
        return 1;
    };
    Table.prototype.delRow = function (rowIdx) {
        if (rowIdx < 0 || rowIdx >= this.trs.length) {
            log_1.default.error('Table.delRow', "Invalid rowIdx: " + rowIdx);
            return 0;
        }
        var tr = this.trs[rowIdx];
        this.tbodyElem.removeChild(tr.getElem());
        this.trs.splice(rowIdx, 1);
        return 1;
    };
    Table.prototype.addColHeader = function (colIdx) {
        var cols = this.colgroupElem.children;
        if (colIdx < 0 || colIdx >= cols.length) {
            log_1.default.error('Table.addCol', "Invalid colIdx: " + colIdx);
            return 0;
        }
        var colElem = document.createElement('col');
        if (this.defaultColWidth > 0) {
            colElem.style.width = this.defaultColWidth + "px";
        }
        dom_1.insertNode(this.colgroupElem, colElem, colIdx);
        return 1;
    };
    Table.prototype.delColHeader = function (colIdx) {
        var colElem = this.colgroupElem.children[colIdx];
        if (!colElem) {
            return 0;
        }
        this.colgroupElem.removeChild(colElem);
        return 1;
    };
    Table.prototype.getRows = function () {
        return this.trs;
    };
    Table.prototype.getRowCount = function () {
        return this.trs.length;
    };
    Table.prototype.getColCount = function () {
        return this.colCount;
    };
    Table.prototype.setColCount = function (n) {
        this.colCount = n;
        this.trs.forEach(function (tr) {
            tr.setColContent(n);
        });
    };
    Table.prototype.getRowByIndex = function (idx) {
        if (idx < 0 || idx >= this.trs.length) {
            return null;
        }
        return this.trs[idx];
    };
    // 获取空洞位置的单元格
    Table.prototype.getTdsCrossRow = function (fromRowIdx, colStartIdx, colEndIdx) {
        var ret = [];
        if (fromRowIdx < 0 || fromRowIdx >= this.trs.length) {
            log_1.default.error('Table.getTdsCrossRow', "Invalid param fromRowIdx: " + fromRowIdx);
            return ret;
        }
        var c = 1;
        for (var i = fromRowIdx; i >= 0; i--) {
            var td = this.trs[i].getTdByColIndex(colStartIdx);
            if (td) {
                ret.push(td);
                var colRange = td.getColRange();
                if (colRange[1] < colEndIdx) {
                    colStartIdx = colRange[1] + 1;
                    i = fromRowIdx;
                    c++;
                }
                else {
                    break;
                }
            }
        }
        if (c !== ret.length) {
            log_1.default.error('Table.getTdsCrossRow', "Table data error");
        }
        return ret;
    };
    Table.prototype.removeCell = function (rowIdx, colIdx) {
        if (rowIdx < 0 || rowIdx >= this.trs.length) {
            log_1.default.error('Table.removeCell', "Invalid param rowIdx: " + rowIdx);
            return 0;
        }
        var tr = this.trs[rowIdx];
        return tr.removeTdByColIdx(colIdx);
    };
    Table.prototype.getCell = function (rowIdx, colIdx) {
        if (rowIdx < 0 || rowIdx >= this.trs.length) {
            log_1.default.error('Table.getCell', "Invalid param rowIdx: " + rowIdx);
            return null;
        }
        var tr = this.trs[rowIdx];
        return tr.getTdByColIndex(colIdx);
    };
    Table.prototype.getCellContent = function (rowIdx, colIdx) {
        var td = this.getCell(rowIdx, colIdx);
        if (!td) {
            return null;
        }
        return td.getContent();
    };
    Table.prototype.setCellContent = function (rowIdx, colIdx, content) {
        var td = this.getCell(rowIdx, colIdx);
        if (!td) {
            return false;
        }
        td.setContent(content);
        return true;
    };
    Table.prototype.validate = function () {
        if (this.trs.length !== this.tbodyElem.children.length) {
            return 'Row number not match';
        }
        // 校验数据与生成的表格信息是否一致
        for (var i = 0; i < this.trs.length; i++) {
            var tds = this.trs[i].getTds();
            var tdElems = this.tbodyElem.children[i].children;
            if (tds.length !== tdElems.length) {
                return "The td amount of " + (i + 1) + "th row not match";
            }
            for (var j = 0; j < tds.length; j++) {
                var td = tds[j];
                var tdElem = tdElems[j];
                var rowRange = td.getRowRange();
                var colRange = td.getColRange();
                if (rowRange[0] < 0 || rowRange[1] < 0 || colRange[0] < 0 || colRange[1] < 0) {
                    return "Td data error. rowIndex: " + i + ", colIndex: " + j;
                }
                if (rowRange[0] !== i) {
                    return "Row range not match. rowIndex: " + i;
                }
                var colspan = tdElem.hasAttribute('colspan') ? +tdElem.getAttribute('colspan') : 1;
                if (colspan !== colRange[1] - colRange[0] + 1) {
                    return "Colspan not match. rowIndex: " + i + ", colIndex: " + j;
                }
                var rowspan = tdElem.hasAttribute('rowspan') ? +tdElem.getAttribute('rowspan') : 1;
                if (rowspan !== rowRange[1] - rowRange[0] + 1) {
                    return "Rowspan not match. rowIndex: " + i + ", colIndex: " + j;
                }
                if (td.getContent() !== tdElem.children[0].innerText) {
                    return "Td content not match. rowIndex: " + i + ", colIndex: " + j;
                }
            }
        }
        // 校验表格是否为正常表格
        var totalColCount = this.colgroupElem.children.length;
        var trs = this.tbodyElem.children;
        // 空洞集合
        var holes = [];
        for (var tri = 0; tri < trs.length; tri++) {
            var tds = trs[tri].children;
            // 创建出实体的部分
            var solidRanges = [];
            if (holes.length === 0) {
                solidRanges.push({
                    fill: 0,
                    total: totalColCount,
                    range: [0, totalColCount - 1]
                });
            }
            else {
                var tmpColIdx = 0;
                for (var hi = 0; hi < holes.length; hi++) {
                    var holeStart = holes[hi].range[0];
                    if (holeStart > tmpColIdx) {
                        solidRanges.push({
                            fill: 0,
                            total: holeStart - tmpColIdx,
                            range: [tmpColIdx, holeStart - 1]
                        });
                    }
                    tmpColIdx = holes[hi].range[1] + 1;
                    if (hi === holes.length - 1 && tmpColIdx < totalColCount) {
                        solidRanges.push({
                            fill: 0,
                            total: totalColCount - tmpColIdx,
                            range: [tmpColIdx, totalColCount - 1]
                        });
                    }
                }
            }
            // 遍历当前行的单元格，往实体部分填充
            var solidIdx = 0;
            var newHoles = [];
            for (var tdi = 0; tdi < tds.length; tdi++) {
                var td = tds[tdi];
                // @ts-ignore
                var colspan = td.hasAttribute('colspan') ? +td.getAttribute('colspan') : 1;
                // @ts-ignore
                var rowspan = td.hasAttribute('rowspan') ? +td.getAttribute('rowspan') : 1;
                var solid = solidRanges[solidIdx];
                if (colspan <= solid.total - solid.fill) {
                    solid.fill += colspan;
                }
                else {
                    return "Invalid Row: " + tri + " near Cell: " + tdi;
                }
                if (tdi === tds.length - 1) {
                    if (solid.fill !== solid.total || solidIdx < solidRanges.length - 1) {
                        return "Invalid Row: " + tri;
                    }
                }
                else if (solid.fill === solid.total) {
                    if (solidIdx === solidRanges.length - 1) {
                        return "Invalid Row: " + tri;
                    }
                    solidIdx++;
                }
                // 如果单元格跨行，就保存到新的空洞
                if (rowspan > 1) {
                    var tmpStartColIdx = solid.range[0] + solid.fill - 1;
                    newHoles.push({
                        depth: rowspan - 1,
                        range: [tmpStartColIdx, tmpStartColIdx + colspan - 1]
                    });
                }
            }
            // 把空洞集合过滤掉已经到底的空洞
            holes = holes.filter(function (item) {
                item.depth--;
                return item.depth > 0;
            });
            // 把新的空洞插入到空洞集合并进行排序
            holes.push.apply(holes, newHoles);
            // 校验空洞集合数据合法性
            for (var hi = 0; hi < holes.length; hi++) {
                if (hi !== holes.length - 1 && holes[hi].range[1] >= holes[hi + 1].range[0]) {
                    return "Invalid table structure. " + JSON.stringify(holes);
                }
            }
            // 如果是最后一行，没有空洞了
            if (tri === trs.length - 1 && holes.length > 0) {
                return "Invalid Table structure. " + JSON.stringify(holes);
            }
        }
        return '';
    };
    Table.prototype.getTableData = function () {
        var rows = this.trs.map(function (tr) {
            return tr.getTds().map(function (td) {
                var rowRange = td.getRowRange();
                var colRange = td.getColRange();
                return {
                    row: [rowRange[0], rowRange[1]],
                    col: [colRange[0], colRange[1]],
                    content: td.getContent(),
                    width: td.getElem().clientWidth,
                    height: td.getElem().clientHeight
                };
            });
        });
        var colEls = this.colgroupElem.children;
        var colWidth = [];
        for (var i = 0; i < colEls.length; i++) {
            colWidth.push(+colEls[i].style.width.slice(0, -2));
        }
        return {
            rows: rows,
            colWidth: colWidth
        };
    };
    Table.prototype.setEditable = function (editable) {
        if (this.editable === editable) {
            return;
        }
        this.editable = editable;
        var edt = this.editable ? 'true' : 'false';
        this.trs.forEach(function (tr) {
            tr.getTds().forEach(function (td) {
                td.getElem().contentEditable = edt;
            });
        });
    };
    // 单元格的跨列交集
    Table.prototype.getIntersectColRanges = function (colRange, redundancy) {
        var _this = this;
        if (redundancy === void 0) { redundancy = 0; }
        if (colRange[0] >= colRange[1]) {
            return [];
        }
        var startIdx = colRange[0];
        var endIdx = colRange[1] + 1;
        // 把result当作一个数轴，设置区间colRange[0] ~ colRange[1] + 1，把每行中列的点（索引）画（存）到数轴上
        // 最后把每2个点作为区间取出来，然后去掉不满足冗余条件的区间
        var axis = [startIdx, endIdx];
        this.trs.forEach(function (tr, rowIdx) {
            var tds = tr.getTds();
            var holeStartIdx = 0;
            for (var i = 0; i < tds.length; i++) {
                var tdColRange = tds[i].getColRange();
                var points = new Set();
                if (holeStartIdx < tdColRange[0]) {
                    // 把空洞中所有的点取出来
                    var holes = _this.getTdsCrossRow(rowIdx, holeStartIdx, tdColRange[0] - 1);
                    for (var j = 0; j < holes.length; j++) {
                        var tmpHoleTdColRange = holes[j].getColRange();
                        if (tmpHoleTdColRange[0] > startIdx && tmpHoleTdColRange[0] < endIdx) {
                            points.add(tmpHoleTdColRange[0]);
                        }
                        if (tmpHoleTdColRange[1] + 1 > startIdx && tmpHoleTdColRange[1] + 1 < endIdx) {
                            points.add(tmpHoleTdColRange[1] + 1);
                        }
                    }
                }
                if (tdColRange[0] + 1 >= endIdx) {
                    break;
                }
                if (tdColRange[0] > startIdx && tdColRange[0] < endIdx) {
                    points.add(tdColRange[0]);
                }
                if (tdColRange[1] + 1 > startIdx && tdColRange[1] + 1 < endIdx) {
                    points.add(tdColRange[1] + 1);
                }
                holeStartIdx = tdColRange[1] + 1;
                if (points.size > 0) {
                    points.forEach(function (v) {
                        for (var i_2 = 0; i_2 < axis.length - 1; i_2++) {
                            if (v > axis[i_2] && v < axis[i_2 + 1]) {
                                axis.splice(i_2 + 1, 0, v);
                                break;
                            }
                        }
                    });
                }
            }
        });
        var result = [];
        for (var i = 0; i < axis.length - 1; i++) {
            if (axis[i + 1] - axis[i] > redundancy) {
                result.push([axis[i] + redundancy, axis[i + 1] - 1]);
            }
        }
        return result;
    };
    Table.prototype.destroy = function () {
        this.elem.remove();
    };
    return Table;
}());
exports.Table = Table;
var ColWidthCalculator = /** @class */ (function () {
    function ColWidthCalculator() {
        this.result = [];
        this.data = Object.create(null);
    }
    ColWidthCalculator.prototype.add = function (colRange, width) {
        if (typeof width !== 'number') {
            return;
        }
        if (colRange[0] === colRange[1]) {
            if (colRange[0] > this.result.length - 1) {
                for (var i = this.result.length; i <= colRange[0]; i++) {
                    this.result.push(0);
                }
                this.result[colRange[0]] = width;
            }
        }
        else {
            if (!(colRange[0] in this.data)) {
                this.data[colRange[0]] = {};
            }
            this.data[colRange[0]][colRange[1]] = width;
        }
    };
    ColWidthCalculator.prototype.calc = function (colCount, colWidth) {
        var _this = this;
        if (colCount > this.result.length) {
            for (var i = this.result.length; i < colCount; i++) {
                this.result.push(0);
            }
        }
        var isNum = typeof colWidth === 'number';
        this.result.forEach(function (w, i) {
            if (w === null) {
                _this.result[i] = isNum ? colWidth : colWidth[i];
            }
        });
        return this.result;
    };
    return ColWidthCalculator;
}());


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function extend(target, source) {
    var result = {};
    Object.keys(target).forEach(function (k) {
        result[k] = target[k];
    });
    Object.keys(source).forEach(function (k) {
        result[k] = source[k];
    });
    return result;
}
exports.extend = extend;
function isString(v) {
    return typeof v === 'string';
}
exports.isString = isString;


/***/ }),

/***/ "./style/editor.scss":
/*!***************************!*\
  !*** ./style/editor.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./editor.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/editor.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ })

/******/ });
});
//# sourceMappingURL=editor.js.map