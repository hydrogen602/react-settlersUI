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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/canvas.tsx":
/*!***********************************!*\
  !*** ./src/components/canvas.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const React = __webpack_require__(/*! react */ "react");
const Point_1 = __webpack_require__(/*! ./canvasCode/graphics/Point */ "./src/components/canvasCode/graphics/Point.ts");
const Settlement_1 = __webpack_require__(/*! ./canvasCode/map/Settlement */ "./src/components/canvasCode/map/Settlement.ts");
const Road_1 = __webpack_require__(/*! ./canvasCode/map/Road */ "./src/components/canvasCode/map/Road.ts");
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            highlightFunc: null
        };
    }
    componentDidMount() {
        const canvas = this.canvasRef.current;
        if (!canvas) {
            throw Error("this shouldn't happen, canvasRef not set");
        }
        this.makeHiDPICanvas(canvas);
        this.componentDidUpdate();
    }
    componentDidUpdate() {
        //console.log('update');
        const canvas = this.canvasRef.current;
        if (!canvas) {
            throw Error("this shouldn't happen, canvasRef not set");
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw Error("getContext('2d') failed");
        }
        // implement draw on ctx here
        ctx.fillStyle = '#8395c1'; // background color is set here!
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.props.gm.draw(ctx);
        if (this.state.highlightFunc) {
            this.state.highlightFunc(ctx);
        }
        // ctx.beginPath();
        // ctx.arc(this.state.x, this.state.y, 10, 0, 6.28);
        // ctx.fill();
    }
    // onClick(e: React.MouseEvent) {
    //     // the on-click
    //     this.setState({
    //         x: e.clientX,
    //         y: e.clientY
    //     });
    //     console.log(e.clientX, e.clientY);
    // }
    render() {
        return (React.createElement("canvas", { ref: this.canvasRef, width: window.innerWidth, height: window.innerHeight, onClick: this.props.onClick, onMouseMove: this.mouseHoverHandler.bind(this) }));
    }
    makeHiDPICanvas(canvas) {
        // https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
        const w = window.innerWidth;
        const h = window.innerHeight;
        const ctx = function () {
            const tmp = canvas.getContext("2d");
            if (tmp == null) {
                throw "CanvasRenderingContext2D is null";
            }
            return tmp;
        }();
        const ratio = window.devicePixelRatio || 1;
        canvas.width = w * ratio;
        canvas.height = h * ratio;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        return canvas;
    }
    mouseHoverHandler(e) {
        const p = new Point_1.RelPoint(e.clientX, e.clientY);
        const r = Point_1.Hex.distanceFromNearestHexCorner(p);
        if (this.props.mayPlaceSettlement) {
            const h = p.toHexPoint();
            const back = h.toRelPoint();
            if (r < Point_1.Hex.getSideLength() / 4) {
                this.setState({
                    highlightFunc: (ctx) => {
                        Settlement_1.Settlement.stroke(back, ctx);
                    }
                });
            }
            else {
                if (this.state.highlightFunc) {
                    // not yet null, reset to null
                    this.setState({
                        highlightFunc: null
                    });
                }
            }
        }
        else if (this.props.mayPlaceRoad) {
            const hArr = p.toDualHexPoint();
            if (hArr.length == 2) { // hArr is empty if not over a line
                const [a, b] = hArr;
                this.setState({
                    highlightFunc: (ctx) => {
                        Road_1.Road.stroke(a.toRelPoint(), b.toRelPoint(), ctx);
                    }
                });
            }
            else {
                if (this.state.highlightFunc) {
                    // not yet null, reset to null
                    this.setState({
                        highlightFunc: null
                    });
                }
            }
        }
        else {
            if (this.state.highlightFunc) {
                // not yet null, reset to null
                this.setState({
                    highlightFunc: null
                });
            }
        }
    }
}
exports.Canvas = Canvas;


/***/ }),

/***/ "./src/components/canvasCode/graphics/Point.ts":
/*!*****************************************************!*\
  !*** ./src/components/canvasCode/graphics/Point.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RelPoint = exports.AbsPoint = exports.HexPoint = exports.maxDistance = exports.centerOfScreen = exports.currLocation = exports.Hex = void 0;
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// offset x = 1.5x-0.5
function getN() {
    return 3;
}
class Hex {
    constructor() { }
    static getSideLength() {
        return Hex.sectionLength;
    }
    static getApothem() {
        return Hex.apothem;
    }
    static pxUnshiftedToHexGrid(x, y) {
        const row = Math.round(y / Hex.apothem);
        // x has to be unshifted
        const col = x / (Hex.sectionLength * 1.5);
        // col = col - (1/6); // (1/3) * (1/2); offset is 0 or 1/3, so subtract middle and round
        // return new HexPoint(Math.round(col), Math.round(row));
        // new approach -> look for which one is closer
        const colR = Math.ceil(col);
        const colL = Math.floor(col);
        const pR = Hex.hexGridToPxUnshifted(row, colR).x;
        const pL = Hex.hexGridToPxUnshifted(row, colL).x;
        if (Math.abs(x - pR) < Math.abs(x - pL)) {
            // closer to right point than left
            return new HexPoint(colR, row);
        }
        else {
            return new HexPoint(colL, row);
        }
    }
    static pxUnshiftedToDualHexGrid(x, y) {
        const row = Math.round(y / Hex.apothem);
        // x has to be unshifted
        const col = x / (Hex.sectionLength * 1.5);
        const colR = Math.ceil(col);
        const colL = Math.floor(col);
        const rowErr = Math.abs((y / Hex.apothem) % 1);
        if (rowErr < 0.15 || rowErr > 0.85) {
            // horizontal mode
            const p1 = new HexPoint(colL, row);
            const p2 = new HexPoint(colR, row);
            if (p1.isNeighbor(p2)) {
                return [p1, p2];
            }
            else {
                return [];
            }
        }
        else if ((col % 1) > 0 && (col % 1) < 1 / 3) {
            // check for sloped lines
            const rowTop = Math.floor(y / Hex.apothem);
            const rowBottom = Math.ceil(y / Hex.apothem);
            let col = Hex.pxUnshiftedToHexGrid(x, y).x;
            const p1 = new HexPoint(col, rowTop);
            const p2 = new HexPoint(col, rowBottom);
            if (p1.isNeighbor(p2)) {
                return [p1, p2];
            }
            else {
                return [];
            }
        }
        return [];
    }
    static hexGridToPxUnshifted(row, col) {
        //
        //  /--\
        //  \--/
        //  
        // let x = col * (Hex.sectionLength + Hex.sectionLength * Math.sin(Math.PI/6));
        // Math.sin(Math.PI / 6) == 0.5 so...
        let x = col * Hex.sectionLength * 1.5;
        if (Math.abs(row % 2) == Math.abs(col % 2)) {
            x = x + Hex.sectionLength * 0.5; //Math.sin(Math.PI/6);
        }
        const y = Hex.apothem * row;
        return new AbsPoint(x, y);
    }
    static hexGridToPx(row, col) {
        return Hex.hexGridToPxUnshifted(row, col).toRelPoint();
    }
    static getCenterOfHex(row, col) {
        // assuming row, col is top left corner
        const p = Hex.hexGridToPxUnshifted(row, col);
        //  /--\
        //  \--/
        p.x += Hex.sectionLength / 2;
        p.y += Hex.apothem;
        return p;
    }
    static getHexCorners(row, col) {
        return [
            new HexPoint(col, row),
            new HexPoint(col + 1, row),
            new HexPoint(col + 1, row + 1),
            new HexPoint(col + 1, row + 2),
            new HexPoint(col, row + 2),
            new HexPoint(col, row + 1)
        ];
    }
    static fillHex(row, col, ctx) {
        let p = Hex.hexGridToPx(row, col);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        // const ls = this.getHexCorners(row, col);
        // ls.forEach(p => {
        //     var tmp = p.toRelPoint();
        //     ctx.lineTo(tmp.x, tmp.y);
        // });
        p = Hex.hexGridToPx(row, col + 1);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 1, col + 1);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 2, col + 1);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 2, col);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 1, col);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row, col);
        ctx.lineTo(p.x, p.y);
        ctx.fill();
    }
    static strokeHex(row, col, ctx) {
        let p = Hex.hexGridToPx(row, col);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        p = Hex.hexGridToPx(row, col + 1);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 1, col + 1);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 2, col + 1);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 2, col);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row + 1, col);
        ctx.lineTo(p.x, p.y);
        p = Hex.hexGridToPx(row, col);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
    static distanceFromNearestHexCorner(p) {
        const abs = p.toAbsPoint(); // if already absolute, it returns a copy of itself
        const backConvertedHex = p.toHexPoint().toAbsPoint();
        return Math.sqrt(util_1.square(abs.x - backConvertedHex.x) + util_1.square(abs.y - backConvertedHex.y));
    }
}
exports.Hex = Hex;
Hex.sectionLength = 50;
//
// apothem = s / 2 * tan(180/n)
// where n is the number of sides (n=6)
//
// so apothem = s / 2 * tan(30) = s / (2 * (1 / sqrt(3)))
// = s * sqrt(3) / 2
//
Hex.apothem = Hex.sectionLength * Math.sqrt(3) / 2;
// offset of map on screen in order to move around the map
exports.currLocation = new Point(window.innerWidth / 2 - Hex.getSideLength() * (1.5 * getN() - 0.5), window.innerHeight / 2 - Hex.getApothem() * getN()); // in px
exports.centerOfScreen = new Point(window.innerWidth / 2 - Hex.getSideLength() * (1.5 * getN() - 0.5), window.innerHeight / 2 - Hex.getApothem() * getN()); // in px
exports.maxDistance = Hex.getSideLength() * (1.5 * getN() - 0.5) * 1.5;
class HexPoint extends Point {
    constructor(col, row) {
        util_1.assertInt(col);
        util_1.assertInt(row);
        super(col, row);
    }
    static fromJson(data) {
        jsonParser_1.JsonParser.requireName(data, 'HexPoint');
        const row = jsonParser_1.JsonParser.requireNumber(data, 'row');
        const col = jsonParser_1.JsonParser.requireNumber(data, 'col');
        return new HexPoint(col, row);
    }
    toJsonSerializable() {
        return {
            '__name__': 'HexPoint',
            'row': this.y,
            'col': this.x
        };
    }
    toAbsPoint() {
        return Hex.hexGridToPxUnshifted(this.y, this.x);
    }
    toRelPoint() {
        return Hex.hexGridToPx(this.y, this.x);
    }
    isNeighbor(other) {
        if (other.x == this.x && other.y == this.y + 1) {
            return true;
        }
        if (other.x == this.x && other.y == this.y - 1) {
            return true;
        }
        if (Math.abs(this.x % 2) == Math.abs(this.y % 2)) {
            // check right
            if (other.x == this.x + 1 && other.y == this.y) {
                return true;
            }
        }
        else {
            // check left
            if (other.x == this.x - 1 && other.y == this.y) {
                return true;
            }
        }
        return false;
    }
    isEqual(other) {
        return (other.x == this.x && other.y == this.y);
    }
}
exports.HexPoint = HexPoint;
class AbsPoint extends Point {
    constructor(x, y) {
        super(x, y);
    }
    toRelPoint() {
        return new RelPoint(this.x + exports.currLocation.x, this.y + exports.currLocation.y);
    }
    toAbsPoint() {
        return new AbsPoint(this.x, this.y);
    }
    toHexPoint() {
        return Hex.pxUnshiftedToHexGrid(this.x, this.y);
    }
    toDualHexPoint() {
        return Hex.pxUnshiftedToDualHexGrid(this.x, this.y);
    }
}
exports.AbsPoint = AbsPoint;
class RelPoint extends Point {
    constructor(x, y) {
        super(x, y);
    }
    toRelPoint() {
        return new RelPoint(this.x, this.y);
    }
    toAbsPoint() {
        return new AbsPoint(this.x - exports.currLocation.x, this.y - exports.currLocation.y);
    }
    toHexPoint() {
        const p = this.toAbsPoint();
        return Hex.pxUnshiftedToHexGrid(p.x, p.y);
    }
    toDualHexPoint() {
        const p = this.toAbsPoint();
        return Hex.pxUnshiftedToDualHexGrid(p.x, p.y);
    }
}
exports.RelPoint = RelPoint;


/***/ }),

/***/ "./src/components/canvasCode/map/Biome.ts":
/*!************************************************!*\
  !*** ./src/components/canvasCode/map/Biome.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getBiomeByName = exports.biomes = exports.Quarry = exports.Farmland = exports.Mountain = exports.Forest = exports.Grassland = exports.Desert = exports.Biome = void 0;
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
class Biome {
    constructor(color) {
        this.color = color;
    }
    getColor() {
        util_1.defined(this.color);
        return this.color;
    }
}
exports.Biome = Biome;
exports.Desert = new (class Desert extends Biome {
    constructor() {
        super('yellow');
    }
})();
exports.Grassland = new (class Grassland extends Biome {
    constructor() {
        super('limegreen');
    }
})();
exports.Forest = new (class Forest extends Biome {
    constructor() {
        super('forestgreen');
    }
})();
exports.Mountain = new (class Mountain extends Biome {
    constructor() {
        super('dimgray');
    }
})();
exports.Farmland = new (class Farmland extends Biome {
    constructor() {
        super('goldenrod');
    }
})();
exports.Quarry = new (class Quarry extends Biome {
    constructor() {
        super('firebrick');
    }
})();
exports.biomes = [exports.Desert, exports.Grassland, exports.Forest, exports.Mountain, exports.Farmland, exports.Quarry];
function getBiomeByName(name) {
    switch (name) {
        case 'desert':
            return exports.Desert;
        case 'grassland':
            return exports.Grassland;
        case 'forest':
            return exports.Forest;
        case 'mountain':
            return exports.Mountain;
        case 'farmland':
            return exports.Farmland;
        case 'quarry':
            return exports.Quarry;
        default:
            throw new Error("KeyError: Could not find biome named '" + name + "'");
    }
}
exports.getBiomeByName = getBiomeByName;
// export const biomeDistributionArray = function() {
//     let tmp_biomeDistributionArray: Array<Biome> = [];
//     biomes.forEach((e: Biome) => {
//         for (let i = 0; i < e.getAbundance(); i++) {
//             tmp_biomeDistributionArray.push(e);
//         }
//     });
//     return tmp_biomeDistributionArray;
// }();


/***/ }),

/***/ "./src/components/canvasCode/map/GameMap.ts":
/*!**************************************************!*\
  !*** ./src/components/canvasCode/map/GameMap.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
const Tile_1 = __webpack_require__(/*! ./Tile */ "./src/components/canvasCode/map/Tile.ts");
const Settlement_1 = __webpack_require__(/*! ./Settlement */ "./src/components/canvasCode/map/Settlement.ts");
const Road_1 = __webpack_require__(/*! ./Road */ "./src/components/canvasCode/map/Road.ts");
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
class GameMap {
    // offset of map on screen in order to move around the map
    // currLocation: RelPoint;
    constructor(tilesArr, settlementsArr, roadsArr) {
        this.tilesArr = tilesArr;
        this.settlementsArr = settlementsArr;
        this.roadsArr = roadsArr;
    }
    static fromJson(data) {
        jsonParser_1.JsonParser.requireName(data, 'GameMap');
        let tmp = jsonParser_1.JsonParser.requireArray(data, 'tiles');
        const tilesArr = [];
        for (const t of tmp) {
            tilesArr.push(Tile_1.Tile.fromJson(t));
        }
        tmp = jsonParser_1.JsonParser.requireArray(data, 'points');
        const settlementsArr = [];
        for (const s of tmp) {
            settlementsArr.push(Settlement_1.Settlement.fromJson(s));
        }
        tmp = jsonParser_1.JsonParser.requireArray(data, 'lines');
        const roadsArr = [];
        for (const r of tmp) {
            roadsArr.push(Road_1.Road.fromJson(r));
        }
        return new GameMap(tilesArr, settlementsArr, roadsArr);
    }
    getTiles() {
        return this.tilesArr;
    }
    getSettlements() {
        return this.settlementsArr;
    }
    getRoads() {
        return this.roadsArr;
    }
    draw(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        this.tilesArr.forEach(e => {
            e.draw(ctx);
        });
        this.tilesArr.forEach(e => {
            e.draw2(ctx);
        });
        this.roadsArr.forEach(r => {
            r.draw(ctx);
        });
        this.settlementsArr.forEach(s => {
            s.draw(ctx);
        });
    }
    dieRolled(value) {
        util_1.assertInt(value);
        this.tilesArr.forEach(tile => {
            tile.activateIfDiceValueMatchesElseDeactivate(value);
        });
    }
}
exports.GameMap = GameMap;


/***/ }),

/***/ "./src/components/canvasCode/map/Road.ts":
/*!***********************************************!*\
  !*** ./src/components/canvasCode/map/Road.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Road = void 0;
const Point_1 = __webpack_require__(/*! ../graphics/Point */ "./src/components/canvasCode/graphics/Point.ts");
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
const Player_1 = __webpack_require__(/*! ../mechanics/Player */ "./src/components/canvasCode/mechanics/Player.ts");
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
class Road {
    constructor(p1, p2, owner) {
        this.p1 = p1;
        this.p2 = p2;
        this.owner = owner;
        // defined(p1);
        // defined(p2);
        util_1.defined(owner);
        //this.owner.addRoad(this);
    }
    isEqual(p1, p2) {
        if (!p1 || !p2 || !this.p1 || !this.p2) {
            return false;
        }
        if (p1.isEqual(this.p1) && p2.isEqual(this.p2)) {
            return true;
        }
        if (p1.isEqual(this.p2) && p2.isEqual(this.p1)) {
            return true;
        }
        return false;
    }
    isAdjacent(p) {
        if (!p || !this.p1 || !this.p2) {
            return false;
        }
        if (p.isEqual(this.p1) || p.isEqual(this.p2)) {
            return true;
        }
        return false;
    }
    draw(ctx) {
        if (!this.p1 || !this.p2) {
            return;
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 14;
        ctx.beginPath();
        const tmp1 = this.p1.toRelPoint();
        const tmp2 = this.p2.toRelPoint();
        ctx.moveTo(tmp1.x, tmp1.y);
        ctx.lineTo(tmp2.x, tmp2.y);
        ctx.stroke();
        ctx.strokeStyle = this.owner.getColor();
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(tmp1.x, tmp1.y);
        ctx.lineTo(tmp2.x, tmp2.y);
        ctx.stroke();
    }
    static stroke(tmp1, tmp2, ctx) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(tmp1.x, tmp1.y);
        ctx.lineTo(tmp2.x, tmp2.y);
        ctx.stroke();
    }
    static fromJson(data) {
        const name = jsonParser_1.JsonParser.requireName(data, 'Road');
        const owner = Player_1.Player.fromJson(jsonParser_1.JsonParser.requireObject(data, 'owner'), true);
        let tmp = jsonParser_1.JsonParser.requireObject(data, 'point1');
        const point1 = (tmp) ? Point_1.HexPoint.fromJson(tmp) : null;
        tmp = jsonParser_1.JsonParser.requireObject(data, 'point2');
        const point2 = (tmp) ? Point_1.HexPoint.fromJson(tmp) : null;
        if (!owner) {
            console.error(owner);
            throw Error('Unknown player');
        }
        const r = new Road(point1, point2, owner);
        return r;
    }
}
exports.Road = Road;


/***/ }),

/***/ "./src/components/canvasCode/map/Settlement.ts":
/*!*****************************************************!*\
  !*** ./src/components/canvasCode/map/Settlement.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Settlement = void 0;
const Point_1 = __webpack_require__(/*! ../graphics/Point */ "./src/components/canvasCode/graphics/Point.ts");
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
const Player_1 = __webpack_require__(/*! ../mechanics/Player */ "./src/components/canvasCode/mechanics/Player.ts");
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
class Settlement {
    constructor(location, owner) {
        this._isCity = false;
        this.p = location;
        this.owner = owner;
        //defined(this.p);
        util_1.defined(this.owner);
        //this.owner.addSettlement(this);
    }
    getHexPoint() {
        return this.p;
    }
    isCity() {
        return this._isCity;
    }
    upgrade() {
        if (this._isCity) {
            throw "This already is a city";
        }
        this._isCity = true;
    }
    isHere(h) {
        if (!this.p || !h) {
            return false;
        }
        return h.isEqual(this.p);
    }
    // production(r: ResourceType) {
    //     if (this._isCity) {
    //         this.owner.giveResource(r, 2); // 2 if city
    //     }
    //     else {
    //         this.owner.giveResource(r, 1);
    //     }
    // }
    draw(ctx) {
        if (!this.p) {
            return;
        }
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillStyle = this.owner.getColor();
        const relLoc = this.p.toRelPoint();
        // is city
        if (this._isCity) {
            const apo = Point_1.Hex.getSideLength() / 3.5 + 2;
            //      xStep
            //     |---
            // apo | /
            //     |/
            //
            // tan(30) = xStep / apo
            const xStep = 0.5773502691896257 * apo; //Math.tan(Math.PI / 6) * apo;
            ctx.beginPath();
            ctx.moveTo(relLoc.x + xStep, relLoc.y - apo);
            ctx.lineTo(relLoc.x + 2 * xStep, relLoc.y);
            ctx.lineTo(relLoc.x + xStep, relLoc.y + apo);
            ctx.lineTo(relLoc.x - xStep, relLoc.y + apo);
            ctx.lineTo(relLoc.x - 2 * xStep, relLoc.y);
            ctx.lineTo(relLoc.x - xStep, relLoc.y - apo);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(relLoc.x + xStep, relLoc.y - apo);
            ctx.lineTo(relLoc.x + 2 * xStep, relLoc.y);
            ctx.lineTo(relLoc.x + xStep, relLoc.y + apo);
            ctx.lineTo(relLoc.x - xStep, relLoc.y + apo);
            ctx.lineTo(relLoc.x - 2 * xStep, relLoc.y);
            ctx.lineTo(relLoc.x - xStep, relLoc.y - apo);
            ctx.closePath();
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.arc(relLoc.x, relLoc.y, Point_1.Hex.getSideLength() / 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(relLoc.x, relLoc.y, Point_1.Hex.getSideLength() / 4 - 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    static stroke(loc, ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, Point_1.Hex.getSideLength() / 4, 0, 2 * Math.PI);
        ctx.stroke();
    }
    static strokeCity(relLoc, ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        const apo = Point_1.Hex.getSideLength() / 3 + 2;
        const xStep = Math.tan(Math.PI / 6) * apo;
        ctx.beginPath();
        ctx.moveTo(relLoc.x + xStep, relLoc.y - apo);
        ctx.lineTo(relLoc.x + 2 * xStep, relLoc.y);
        ctx.lineTo(relLoc.x + xStep, relLoc.y + apo);
        ctx.lineTo(relLoc.x - xStep, relLoc.y + apo);
        ctx.lineTo(relLoc.x - 2 * xStep, relLoc.y);
        ctx.lineTo(relLoc.x - xStep, relLoc.y - apo);
        ctx.closePath();
        ctx.stroke();
    }
    static fromJson(data) {
        const name = jsonParser_1.JsonParser.askName(data);
        if (name != 'Settlement' && name != 'City') {
            throw new jsonParser_1.JsonParserError(`Wrong name, got ${name} instead of Settlement or City`);
        }
        const owner = Player_1.Player.fromJson(jsonParser_1.JsonParser.requireObject(data, 'owner'), true);
        const tmp = jsonParser_1.JsonParser.requireObject(data, 'position');
        const position = (tmp) ? Point_1.HexPoint.fromJson(tmp) : null;
        if (!owner) {
            console.error(owner);
            throw Error('Unknown player');
        }
        const s = new Settlement(position, owner);
        if (name == 'City') {
            s._isCity = true;
        }
        return s;
    }
}
exports.Settlement = Settlement;


/***/ }),

/***/ "./src/components/canvasCode/map/Tile.ts":
/*!***********************************************!*\
  !*** ./src/components/canvasCode/map/Tile.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const Biome_1 = __webpack_require__(/*! ./Biome */ "./src/components/canvasCode/map/Biome.ts");
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
const Point_1 = __webpack_require__(/*! ../graphics/Point */ "./src/components/canvasCode/graphics/Point.ts");
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
// import { Settlement } from "./Settlement";
// import { Config } from "../Config";
class Tile {
    constructor(location, landType, diceValue) {
        this.active = false; // whether this round's die roll matches this tile
        this.isDisabledByRobber = false;
        this.diceValue = diceValue;
        this.landType = landType;
        this.p = location;
        this.center = Point_1.Hex.getCenterOfHex(location.y, location.x); // flip on purpose
        util_1.defined(this.diceValue);
        util_1.defined(this.landType);
        util_1.defined(this.p);
        util_1.defined(this.center);
    }
    static fromJson(data) {
        jsonParser_1.JsonParser.requireName(data, 'Tile');
        const diceValue = jsonParser_1.JsonParser.requireNumber(data, 'diceValue');
        const location = Point_1.HexPoint.fromJson(jsonParser_1.JsonParser.requireObject(data, 'location'));
        const biome = Biome_1.getBiomeByName(jsonParser_1.JsonParser.requireString(data, 'biome'));
        return new Tile(location, biome, diceValue);
    }
    // getDiceValue() {
    //     return this.diceValue;
    // }
    // getLandType() {
    //     return this.landType;
    // }
    // getPos() {
    //     return this.p;
    // }
    // // activate if die matches this tile. Also does production
    // activateIfDiceValueMatches(value: number, settlements: Array<Settlement>) {
    //     assertInt(value);
    //     if (value == this.diceValue && !this.isDisabledByRobber) { // no profits if the robber is around
    //         this.active = true;
    //         // find neighboring settlements and award resource
    //         Hex.getHexCorners(this.p.y, this.p.x).forEach(c => {
    //             settlements.forEach(s => {
    //                 if (s.isHere(c)) {
    //                     s.production(this.landType.getResourceType());
    //                 }
    //             })
    //         })
    //     }
    // }
    activateIfDiceValueMatchesElseDeactivate(value) {
        util_1.assertInt(value);
        if (value == this.diceValue && !this.isDisabledByRobber) { // no profits if the robber is around
            this.active = true;
        }
        else {
            this.active = false;
        }
    }
    highlightIfActive(ctx) {
        if (this.active && !this.isDisabledByRobber) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 4;
            Point_1.Hex.strokeHex(this.p.y, this.p.x, ctx);
        }
    }
    // arriveRobber() {
    //     this.isDisabledByRobber = true;
    // }
    // departRobber() {
    //     this.isDisabledByRobber = false;
    // }
    draw(ctx) {
        ctx.fillStyle = this.landType.getColor();
        Point_1.Hex.fillHex(this.p.y, this.p.x, ctx);
        const relCenter = this.center.toRelPoint();
        if (this.landType != Biome_1.Desert) {
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(this.diceValue.toString(), relCenter.x, relCenter.y);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        Point_1.Hex.strokeHex(this.p.y, this.p.x, ctx);
    }
    /**
     * Call this function after draw() has
     * been called on all tiles
     *
     * @param ctx CanvasRenderingContext2D
     */
    draw2(ctx) {
        if (this.isDisabledByRobber) {
            this.strokeRobber(ctx);
        }
        this.highlightIfActive(ctx);
    }
    strokeRobber(ctx) {
        const relCenter = this.center.toRelPoint();
        const apo = Point_1.Hex.getSideLength() / 3.5 + 2;
        const xStep = 0.5773502691896257 * apo; // Math.tan(Math.PI / 6) * apo;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(relCenter.x + xStep, relCenter.y - apo);
        ctx.lineTo(relCenter.x + 2 * xStep, relCenter.y);
        ctx.lineTo(relCenter.x + xStep, relCenter.y + apo);
        ctx.lineTo(relCenter.x - xStep, relCenter.y + apo);
        ctx.lineTo(relCenter.x - 2 * xStep, relCenter.y);
        ctx.lineTo(relCenter.x - xStep, relCenter.y - apo);
        ctx.closePath();
        ctx.stroke();
    }
    // this method is from http://www.playchilla.com/how-to-check-if-a-point-is-inside-a-hexagon
    isInside(pos) {
        // vertical = apothem
        const q2x = Math.abs(pos.x - this.center.x);
        const q2y = Math.abs(pos.y - this.center.y);
        const vert = Point_1.Hex.getApothem();
        const hori = Point_1.Hex.getSideLength() / 2;
        if (q2x > hori * 2 || q2y > vert)
            return false;
        return vert * 2 * hori - vert * q2x - 2 * hori * q2y >= 0;
    }
}
exports.Tile = Tile;


/***/ }),

/***/ "./src/components/canvasCode/mechanics/Inventory.ts":
/*!**********************************************************!*\
  !*** ./src/components/canvasCode/mechanics/Inventory.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
//import { ResourceType } from "./dataTypes";
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
const Settlement_1 = __webpack_require__(/*! ../map/Settlement */ "./src/components/canvasCode/map/Settlement.ts");
const Road_1 = __webpack_require__(/*! ../map/Road */ "./src/components/canvasCode/map/Road.ts");
// my own inventory system cause map is limited
// requirements - map based/ like
// get - set - update
// verify enough resources
class Inventory {
    // private static conversionMap = new Map([
    //     ['Wheat', ResourceType.Wheat],
    //     ['Sheepie', ResourceType.Sheep],
    //     ['Lumber', ResourceType.Lumber],
    //     ['Ore', ResourceType.Ore],
    //     ['Brick', ResourceType.Brick],
    //     ['NoResource', ResourceType.NoResource]
    // ])
    constructor() {
        this.content = new Map();
        this.pointFeatures = [];
        this.lineFeatures = [];
    }
    keys() {
        return this.content.keys();
    }
    get(k) {
        const tmp = this.content.get(k);
        util_1.defined(tmp);
        return tmp;
    }
    getPointFeatures() {
        return this.pointFeatures.slice();
    }
    getLineFeatures() {
        return this.lineFeatures.slice();
    }
    static fromJson(data) {
        const name = jsonParser_1.JsonParser.askName(data);
        if (name != 'ExpandedInventory' && name != 'Inventory') {
            throw new jsonParser_1.JsonParserError(`Wrong name, got ${name} instead of ExpandedInventory or Inventory`);
        }
        const inv = new Inventory();
        const invData = jsonParser_1.JsonParser.requireObject(data, 'inventory');
        for (const resourceName in invData) {
            const count = jsonParser_1.JsonParser.requireNumber(invData, resourceName);
            util_1.assertInt(count);
            inv.content.set(resourceName, count);
        }
        if (name == 'ExpandedInventory') {
            const settlementArr = jsonParser_1.JsonParser.requireArray(data, 'pointFeatures');
            for (const it of settlementArr) {
                inv.pointFeatures.push(Settlement_1.Settlement.fromJson(it));
            }
            const roadArr = jsonParser_1.JsonParser.requireArray(data, 'lineFeatures');
            for (const it of roadArr) {
                inv.lineFeatures.push(Road_1.Road.fromJson(it));
            }
        }
        return inv;
    }
}
exports.Inventory = Inventory;


/***/ }),

/***/ "./src/components/canvasCode/mechanics/Player.ts":
/*!*******************************************************!*\
  !*** ./src/components/canvasCode/mechanics/Player.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
//import { Settlement } from "../map/Settlement";
//import { Road } from "../map/Road";
//import { RelPoint } from "../graphics/Point";
//import { Inventory } from "./Inventory";
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
class Player {
    constructor(color, name, token) {
        this.color = color;
        this.name = name;
        this.token = token;
        //this.settlements = [];
        util_1.defined(color);
        util_1.defined(name);
        util_1.defined(token);
        //this.inventory = new Inventory();
        Player.playerDict[token] = this;
    }
    static doesPlayerExists(data) {
        jsonParser_1.JsonParser.requireName(data, 'Player');
        const token = jsonParser_1.JsonParser.requireString(data, 'token');
        return token in Player.playerDict;
    }
    static fromJson(data, returnNullOnMissingPlayer) {
        jsonParser_1.JsonParser.requireName(data, 'Player');
        const token = jsonParser_1.JsonParser.requireString(data, 'token');
        if (token in Player.playerDict) {
            // player already exists
            return Player.playerDict[token];
        }
        if (returnNullOnMissingPlayer) {
            return null;
        }
        return new Player(jsonParser_1.JsonParser.requireString(data, 'color'), jsonParser_1.JsonParser.requireString(data, 'name'), token);
    }
    static getPlayerDict() {
        return Player.playerDict;
    }
    // getRoads() {
    //     return this.roads;
    // }
    // getSettlements() {
    //     return this.settlements;
    // }
    getColor() {
        return this.color;
    }
    getName() {
        return this.name;
    }
    getToken() {
        return this.token;
    }
    draw() {
        //this.invBoard.draw();
    }
    debug() {
        console.log(this);
        // this.settlements.forEach(e => {
        //     console.log("  ", e)
        // });
        //console.log("  Inv:", this.inventory);
    }
}
exports.Player = Player;
//private inventory: Inventory;
Player.playerDict = {};


/***/ }),

/***/ "./src/components/canvasCode/mechanics/Turn.ts":
/*!*****************************************************!*\
  !*** ./src/components/canvasCode/mechanics/Turn.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Turn = void 0;
const util_1 = __webpack_require__(/*! ../util */ "./src/components/canvasCode/util.ts");
const jsonParser_1 = __webpack_require__(/*! ../../../jsonParser */ "./src/jsonParser.tsx");
const Player_1 = __webpack_require__(/*! ./Player */ "./src/components/canvasCode/mechanics/Player.ts");
class Turn {
    constructor(roundNum, currentPlayer, dieValue) {
        this.roundNum = roundNum;
        this.currentPlayer = currentPlayer;
        this.dieValue = dieValue;
        util_1.defined(this.roundNum);
        util_1.defined(this.currentPlayer);
        //defined(this.dieValue); may be null
        util_1.assertInt(this.roundNum);
        if (this.dieValue) {
            util_1.assertInt(this.dieValue);
        }
    }
    static fromJson(obj) {
        const playerTag = jsonParser_1.JsonParser.requireObject(obj, 'currentPlayer');
        const player = Player_1.Player.fromJson(playerTag, true);
        const dieVal = (jsonParser_1.JsonParser.requireAny(obj, 'dieValue')) ? jsonParser_1.JsonParser.requireNumber(obj, 'dieValue') : null;
        if (player) {
            return new Turn(jsonParser_1.JsonParser.requireNumber(obj, 'roundNum'), player, dieVal);
        }
        else {
            console.error(playerTag);
            throw Error('Unknown player!');
        }
    }
}
exports.Turn = Turn;


/***/ }),

/***/ "./src/components/canvasCode/util.ts":
/*!*******************************************!*\
  !*** ./src/components/canvasCode/util.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = exports.rollTwoDice = exports.randomInt = exports.assertInt = exports.square = exports.defined = exports.assert = void 0;
class AssertionError extends Error {
}
function assert(condition, message) {
    if (!condition) {
        throw new AssertionError(message || "Assertion failed");
    }
}
exports.assert = assert;
function defined(condition) {
    if (condition == undefined) {
        throw new AssertionError("Variable undefined");
    }
}
exports.defined = defined;
function square(n) {
    return n * n;
}
exports.square = square;
function assertInt(n) {
    if (!Number.isInteger(n)) {
        throw new AssertionError("TypeError: expected int");
    }
}
exports.assertInt = assertInt;
function randomInt(high, low) {
    if (low == undefined) {
        low = 0;
    }
    assertInt(high);
    assertInt(low);
    return Math.floor(Math.random() * (high - low) + low);
}
exports.randomInt = randomInt;
function rollTwoDice() {
    return randomInt(7, 1) + randomInt(7, 1); // high limit (7) is excluded
}
exports.rollTwoDice = rollTwoDice;
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 */
function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
exports.shuffle = shuffle;
;


/***/ }),

/***/ "./src/components/colorBox.tsx":
/*!*************************************!*\
  !*** ./src/components/colorBox.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorBox = void 0;
const React = __webpack_require__(/*! react */ "react");
const colors = new Map([
    ['red', [
            "lightsalmon",
            "salmon",
            "darksalmon",
            "lightcoral",
            "indianred",
            "crimson",
            "firebrick",
            "red",
            "darkred"
        ]],
    ['orange', [
            "coral",
            "tomato",
            "orangered",
            "gold",
            "orange",
            "darkorange"
        ]],
    ['yellow', [
            "lightyellow",
            "lemonchiffon",
            "lightgoldenrodyellow",
            "papayawhip",
            "moccasin",
            "peachpuff",
            "palegoldenrod",
            "khaki",
            "darkkhaki",
            "yellow"
        ]],
    ['green', [
            "lawngreen",
            "chartreuse",
            "limegreen",
            "lime",
            "forestgreen",
            "green",
            "darkgreen",
            "greenyellow",
            "yellowgreen",
            "springgreen",
            "mediumspringgreen",
            "lightgreen",
            "palegreen",
            "darkseagreen",
            "mediumseagreen",
            "seagreen",
            "olive",
            "darkolivegreen",
            "olivedrab"
        ]],
    ['cyan', [
            "lightcyan",
            "cyan",
            "aqua",
            "aquamarine",
            "mediumaquamarine",
            "paleturquoise",
            "turquoise",
            "mediumturquoise",
            "darkturquoise",
            "lightseagreen",
            "cadetblue",
            "darkcyan",
            "teal"
        ]],
    ['blue', [
            "powderblue",
            "lightblue",
            "lightskyblue",
            "skyblue",
            "deepskyblue",
            "lightsteelblue",
            "dodgerblue",
            "cornflowerblue",
            "steelblue",
            "royalblue",
            "blue",
            "mediumblue",
            "darkblue",
            "navy",
            "midnightblue",
            "mediumslateblue",
            "slateblue",
            "darkslateblue"
        ]],
    ['purple', [
            "lavender",
            "thistle",
            "plum",
            "violet",
            "orchid",
            "fuchsia",
            "magenta",
            "mediumorchid",
            "mediumpurple",
            "blueviolet",
            "darkviolet",
            "darkorchid",
            "darkmagenta",
            "purple",
            "indigo"
        ]],
    ['pink', [
            "pink",
            "lightpink",
            "hotpink",
            "deeppink",
            "palevioletred",
            "mediumvioletred"
        ]],
    ['white', [
            "white",
            "snow",
            "honeydew",
            "mintcream",
            "azure",
            "aliceblue",
            "ghostwhite",
            "whitesmoke",
            "seashell",
            "beige",
            "oldlace",
            "floralwhite",
            "ivory",
            "antiquewhite",
            "linen",
            "lavenderblush",
            "mistyrose"
        ]],
    ['gray', [
            "gainsboro",
            "lightgray",
            "silver",
            "darkgray",
            "gray",
            "dimgray",
            "lightslategray",
            "slategray",
            "darkslategray",
            "black"
        ]],
    ['brown', [
            "cornsilk",
            "blanchedalmond",
            "bisque",
            "navajowhite",
            "wheat",
            "burlywood",
            "tan",
            "rosybrown",
            "sandybrown",
            "goldenrod",
            "peru",
            "chocolate",
            "saddlebrown",
            "sienna",
            "brown",
            "maroon"
        ]]
]);
function ColorBox(props) {
    const items = [];
    for (const [familyName, familyColors] of colors.entries()) {
        const len = items.length;
        items.push(React.createElement("div", { style: { display: 'block', width: '30%' }, key: len },
            React.createElement("h3", null, familyName),
            React.createElement("div", { className: "colorBoxSubBox" }, familyColors.map((value, index) => {
                return React.createElement("button", { key: index, onClick: (ev) => props.onClick(value, ev), style: { backgroundColor: value } });
            }))));
    }
    return (React.createElement("div", { className: "window colorBox center" },
        React.createElement("div", { className: "colorBoxCollection" }, items)));
}
exports.ColorBox = ColorBox;


/***/ }),

/***/ "./src/components/game.tsx":
/*!*********************************!*\
  !*** ./src/components/game.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const React = __webpack_require__(/*! react */ "react");
const canvas_1 = __webpack_require__(/*! ./canvas */ "./src/components/canvas.tsx");
const GameMap_1 = __webpack_require__(/*! ./canvasCode/map/GameMap */ "./src/components/canvasCode/map/GameMap.ts");
const jsonParser_1 = __webpack_require__(/*! ../jsonParser */ "./src/jsonParser.tsx");
const statusBar_1 = __webpack_require__(/*! ./gameOverlays/statusBar */ "./src/components/gameOverlays/statusBar.tsx");
const Player_1 = __webpack_require__(/*! ./canvasCode/mechanics/Player */ "./src/components/canvasCode/mechanics/Player.ts");
const Turn_1 = __webpack_require__(/*! ./canvasCode/mechanics/Turn */ "./src/components/canvasCode/mechanics/Turn.ts");
const popup_1 = __webpack_require__(/*! ./gameOverlays/popup */ "./src/components/gameOverlays/popup.tsx");
const Point_1 = __webpack_require__(/*! ./canvasCode/graphics/Point */ "./src/components/canvasCode/graphics/Point.ts");
const Inventory_1 = __webpack_require__(/*! ./canvasCode/mechanics/Inventory */ "./src/components/canvasCode/mechanics/Inventory.ts");
const inventoryDisplay_1 = __webpack_require__(/*! ./gameOverlays/inventoryDisplay */ "./src/components/gameOverlays/inventoryDisplay.tsx");
class Game extends React.Component {
    constructor(props) {
        super(props);
        props.conn.setJsonMessageHandler(this.onMessage.bind(this));
        this.state = {
            gm: new GameMap_1.GameMap([], [], []),
            gameStarted: false,
            currNotification: null,
            currError: null,
            playerList: [],
            currentTurn: null,
            inventory: null,
            selectedLinePurchased: null,
            selectedPointPurchased: null,
        };
    }
    onMessage(obj) {
        //console.log(obj);
        if (jsonParser_1.JsonParser.askName(obj) == 'Game') {
            this.props.conn.sendMessage('update', 'inventory', []);
            const gameMapJson = jsonParser_1.JsonParser.requireObject(obj, 'gameMap');
            const gameMap = GameMap_1.GameMap.fromJson(gameMapJson);
            const gameStarted = jsonParser_1.JsonParser.requireBool(obj, 'gameStarted');
            const playerList = this.state.playerList;
            const players = jsonParser_1.JsonParser.requireArray(obj, 'players');
            for (const p of players) {
                if (!Player_1.Player.doesPlayerExists(p)) {
                    const x = Player_1.Player.fromJson(p);
                    if (!x) {
                        throw Error('This should not happen');
                    }
                    playerList.push(x.getName());
                }
            }
            this.setState({
                gm: gameMap,
                gameStarted: gameStarted,
                playerList: playerList
            });
        }
        else if (jsonParser_1.JsonParser.askName(obj) == 'Turn') {
            // should only be received on a new turn
            const turn = Turn_1.Turn.fromJson(obj);
            this.setState({
                currentTurn: turn,
                currNotification: `${turn.currentPlayer.getName()}'s turn`
            });
            if (turn.dieValue) {
                this.state.gm.dieRolled(turn.dieValue);
            }
            console.log(turn);
        }
        else if (jsonParser_1.JsonParser.askName(obj) == 'Inventory' || jsonParser_1.JsonParser.askName(obj) == 'ExpandedInventory') {
            this.setState({ 'inventory': Inventory_1.Inventory.fromJson(obj) });
        }
        else if (jsonParser_1.JsonParser.askType(obj) == "notification") {
            const msg = jsonParser_1.JsonParser.requireString(obj, 'content');
            this.setState({
                currNotification: msg
            });
            setTimeout(() => {
                if (this.state.currNotification == msg) {
                    this.setState({ currNotification: null });
                }
            }, 10000);
        }
        else if (jsonParser_1.JsonParser.askType(obj) == "error") {
            const errMsg = jsonParser_1.JsonParser.requireString(obj, 'content');
            this.setState({
                currError: errMsg
            });
        }
    }
    mouseHandler(e) {
        const p = new Point_1.RelPoint(e.clientX, e.clientY);
        const r = Point_1.Hex.distanceFromNearestHexCorner(p);
        if (this.state.selectedPointPurchased != null) {
            if (r < Point_1.Hex.getSideLength() / 4) {
                // clicked on a corner
                const h = p.toHexPoint();
                console.log("new settlement");
                this.props.conn.send({ 'type': 'action', 'content': 'placeSettlement', 'args': [h.toJsonSerializable(), this.state.selectedPointPurchased] });
                this.setState({
                    selectedPointPurchased: null
                });
            }
        }
        else if (this.state.selectedLinePurchased != null) {
            const hArr = p.toDualHexPoint();
            if (hArr.length == 2) { // hArr is empty if not over a line 
                const [a, b] = hArr;
                console.log("new road");
                this.props.conn.send({ 'type': 'action', 'content': 'placeRoad', 'args': [a.toJsonSerializable(), b.toJsonSerializable(), this.state.selectedLinePurchased] });
                this.setState({
                    selectedLinePurchased: null
                });
            }
        }
    }
    onClickPurchasedPoint(index, ev) {
        this.setState({
            selectedLinePurchased: null,
            selectedPointPurchased: index
        });
    }
    onClickPurchasedLine(index, ev) {
        this.setState({
            selectedLinePurchased: index,
            selectedPointPurchased: null
        });
    }
    render() {
        const defaultMsg = this.state.gameStarted ? "Game running" : "Game hasn't started yet";
        const msg = this.state.currNotification == null ? defaultMsg : this.state.currNotification;
        return (React.createElement("div", null,
            (this.state.currError) ? React.createElement(popup_1.Popup, { msg: this.state.currError, callBack: () => { this.setState({ currError: null }); } }) : null,
            React.createElement(statusBar_1.StatusBar, { msg: msg },
                (this.state.gameStarted) ? null : React.createElement("button", { className: "button", onClick: () => { this.props.conn.send({ 'debug': 'startGame' }); } }, "Start Game"),
                (this.state.currentTurn && this.state.currentTurn.currentPlayer.getName() == this.props.conn.getName()) ? React.createElement("button", { className: "button", onClick: () => { this.props.conn.send({ 'type': 'action', 'content': 'nextTurn' }); } }, "End Turn") : null,
                (this.state.currentTurn && this.state.currentTurn.dieValue) ? React.createElement("p", null, `Die Roll: ${this.state.currentTurn.dieValue}`) : null),
            React.createElement(inventoryDisplay_1.InventoryDisplay, { inv: this.state.inventory, onClickPurchasedLine: this.onClickPurchasedLine.bind(this), onClickPurchasedPoint: this.onClickPurchasedPoint.bind(this) }),
            React.createElement(statusBar_1.PlayerList, { names: this.state.playerList, currentPlayer: (this.state.currentTurn) ? this.state.currentTurn.currentPlayer.getName() : null }),
            React.createElement(canvas_1.Canvas, { gm: this.state.gm, onClick: this.mouseHandler.bind(this), mayPlaceRoad: this.state.selectedLinePurchased != null, mayPlaceSettlement: this.state.selectedPointPurchased != null })));
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/components/gameOverlays/inventoryDisplay.tsx":
/*!**********************************************************!*\
  !*** ./src/components/gameOverlays/inventoryDisplay.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryDisplay = void 0;
const React = __webpack_require__(/*! react */ "react");
// interface IState {
//     selectedLinePurchased: number | null,
//     selectedPointPurchased: number | null,
// }
// export class InventoryDisplay extends React.Component<IProps, IState> {
//     constructor(props: IProps) {
//         super(props);
//         this.state = {
//             selectedLinePurchased: null,
//             selectedPointPurchased: null
//         }
//     }
//     render() {
function InventoryDisplay(props) {
    if (!props.inv) {
        return React.createElement("div", { className: "window inventory" }, "Inventory");
    }
    const tmp = [];
    for (const resourceName of props.inv.keys()) {
        if (resourceName == 'NoResource') {
            continue;
        }
        tmp.push(`${resourceName}: ${props.inv.get(resourceName)}`);
    }
    const anyPurchased = props.inv.getLineFeatures().length > 0 || props.inv.getPointFeatures().length > 0;
    return (React.createElement("div", null,
        React.createElement("div", { className: "window inventory" }, tmp.join('; ')),
        anyPurchased ? React.createElement("div", { className: "window inventory2" },
            React.createElement("h3", null, "Purchased:"),
            React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', marginBottom: '0.5em' } }, props.inv.getPointFeatures().map((value, index) => {
                return (React.createElement("button", { key: index, onClick: (ev) => props.onClickPurchasedPoint(index, ev) }, value.isCity() ? React.createElement("i", { className: "fas fa-city" }) : React.createElement("i", { className: "fas fa-home" })));
            })),
            React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap' } }, props.inv.getLineFeatures().map((value, index) => {
                return (React.createElement("button", { key: index, onClick: (ev) => props.onClickPurchasedLine(index, ev) },
                    React.createElement("i", { className: "fas fa-road" })));
            }))) : null));
}
exports.InventoryDisplay = InventoryDisplay;


/***/ }),

/***/ "./src/components/gameOverlays/popup.tsx":
/*!***********************************************!*\
  !*** ./src/components/gameOverlays/popup.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const React = __webpack_require__(/*! react */ "react");
function Popup(props) {
    return (React.createElement("div", { className: "popup center window" },
        React.createElement("p", null, props.msg),
        React.createElement("button", { className: "button", onClick: props.callBack }, "OK")));
}
exports.Popup = Popup;


/***/ }),

/***/ "./src/components/gameOverlays/statusBar.tsx":
/*!***************************************************!*\
  !*** ./src/components/gameOverlays/statusBar.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerList = exports.StatusBar = void 0;
const React = __webpack_require__(/*! react */ "react");
// {(props.isTurn) ? <button className="button" onClick={props.onClick}>Start Game</button> : null}
function StatusBar(props) {
    return (React.createElement("div", { className: "window statusBar", style: { textAlign: 'center' } },
        props.children,
        React.createElement("div", null, props.msg)));
}
exports.StatusBar = StatusBar;
function PlayerList(props) {
    return (React.createElement("div", { className: "window playerList" },
        React.createElement("h3", null, "Players:"),
        props.names.map((value, index) => {
            if (value == props.currentPlayer) {
                return React.createElement("p", { key: index },
                    React.createElement("i", { className: "fas fa-arrow-alt-circle-right" }),
                    " ",
                    value);
            }
            else {
                return React.createElement("p", { key: index }, value);
            }
        })));
}
exports.PlayerList = PlayerList;


/***/ }),

/***/ "./src/components/login.tsx":
/*!**********************************!*\
  !*** ./src/components/login.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = void 0;
const React = __webpack_require__(/*! react */ "react");
const colorBox_1 = __webpack_require__(/*! ./colorBox */ "./src/components/colorBox.tsx");
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            host: '',
            port: '',
            color: '',
            pickingColor: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onColorClick(color, ev) {
        this.setState({
            color: color,
            pickingColor: false
        });
    }
    handleChange(event) {
        if (event.currentTarget.name == "name") {
            this.setState({ name: event.currentTarget.value });
        }
        else if (event.currentTarget.name == "host") {
            this.setState({ host: event.currentTarget.value });
        }
        else if (event.currentTarget.name == "port") {
            this.setState({ port: event.currentTarget.value });
        }
    }
    handleSubmit(event) {
        const port = parseInt(this.state.port);
        if (this.state.name != '' && this.state.host != '' && port.toString() != "NaN" && port > 0 && this.state.color != '') {
            console.log("yeet", this.state);
            this.props.callback({
                name: this.state.name,
                host: this.state.host,
                port: port,
                color: this.state.color,
                token: null
            });
        }
        event.preventDefault();
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("form", { id: "loginForm", className: "center window", onSubmit: this.handleSubmit },
                React.createElement("input", { required: true, name: "name", type: "text", placeholder: "Name", value: this.state.name, onChange: this.handleChange }),
                React.createElement("input", { required: true, name: "host", type: "text", placeholder: "Hostname", value: this.state.host, onChange: this.handleChange }),
                React.createElement("input", { required: true, name: "port", type: "number", placeholder: "Port", value: this.state.port, onChange: this.handleChange }),
                React.createElement("input", { required: true, readOnly: true, name: "color", type: "string", placeholder: "Color", value: this.state.color, onFocus: () => { this.setState({ pickingColor: true }); } }),
                React.createElement("button", { className: "button" }, "Join Game")),
            (this.state.pickingColor) ? React.createElement(colorBox_1.ColorBox, { onClick: this.onColorClick.bind(this) }) : null));
    }
}
exports.LoginForm = LoginForm;


/***/ }),

/***/ "./src/components/spinner.tsx":
/*!************************************!*\
  !*** ./src/components/spinner.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const React = __webpack_require__(/*! react */ "react");
function Spinner(props) {
    if (props.shown) {
        return React.createElement("div", { className: 'loader' });
    }
    else {
        return React.createElement("div", { className: 'loader', style: { opacity: 0 } });
    }
}
exports.Spinner = Spinner;


/***/ }),

/***/ "./src/components/ui.tsx":
/*!*******************************!*\
  !*** ./src/components/ui.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
const React = __webpack_require__(/*! react */ "react");
const login_1 = __webpack_require__(/*! ./login */ "./src/components/login.tsx");
const spinner_1 = __webpack_require__(/*! ./spinner */ "./src/components/spinner.tsx");
const connection_1 = __webpack_require__(/*! ../connection */ "./src/connection.tsx");
const game_1 = __webpack_require__(/*! ./game */ "./src/components/game.tsx");
const atLogin = 0;
const atConnecting = 1;
const atGame = 2;
class UI extends React.Component {
    constructor(props) {
        super(props);
        const maybe = connection_1.Connection.regainOldConnectionIfExists(this.onWebSockFailure.bind(this), this.onWebSockOpen.bind(this));
        if (maybe) {
            console.log('regained old connection');
        }
        else {
            console.log('no old connection found');
        }
        this.state = {
            progressState: (maybe) ? atConnecting : atLogin,
            failedConn: false,
            dat: null,
            conn: (maybe) ? maybe : null,
        };
        this.loginSubmitCallback = this.loginSubmitCallback.bind(this);
    }
    loginSubmitCallback(data) {
        this.setState({
            dat: data,
            progressState: atConnecting,
            failedConn: false,
            conn: new connection_1.Connection(data, this.onWebSockFailure.bind(this), this.onWebSockOpen.bind(this))
        });
    }
    onWebSockFailure(ev) {
        console.log("back to login");
        this.setState({
            progressState: atLogin,
            failedConn: true
        });
    }
    onWebSockOpen(ev) {
        this.setState({
            progressState: atGame,
            failedConn: false
        });
    }
    render() {
        if (this.state.progressState == atLogin) {
            if (this.state.failedConn) {
                return (React.createElement("div", null,
                    React.createElement(login_1.LoginForm, { callback: this.loginSubmitCallback }),
                    React.createElement("img", { id: "whoopsie", src: "whoopsie-01.png", alt: "whoopsie" })));
            }
            else {
                return (React.createElement("div", null,
                    React.createElement(login_1.LoginForm, { callback: this.loginSubmitCallback })));
            }
        }
        else if (this.state.progressState == atConnecting) {
            return (React.createElement("div", { className: "window center", style: { width: "6em" } },
                React.createElement("p", { style: { margin: 'auto', paddingBottom: '0.5em', color: 'white' } }, "Connecting..."),
                React.createElement(spinner_1.Spinner, { shown: true })));
        }
        else if (this.state.progressState == atGame) {
            if (!this.state.conn) {
                throw Error("this shouldn't happen");
            }
            return (React.createElement(game_1.Game, { conn: this.state.conn }));
        }
        else {
            return React.createElement("p", null,
                "Hi, ",
                (this.state.dat) ? this.state.dat.name : null);
        }
    }
}
exports.UI = UI;


/***/ }),

/***/ "./src/connection.tsx":
/*!****************************!*\
  !*** ./src/connection.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const jsonParser_1 = __webpack_require__(/*! ./jsonParser */ "./src/jsonParser.tsx");
const dataTypes_1 = __webpack_require__(/*! ./dataTypes */ "./src/dataTypes.ts");
/**
 * sets sessionStorage 'connection' to a json representation of ConnectionData
 */
class Connection {
    constructor(data, onWebSockFailure, onWebSockOpen) {
        if (data.port.toString() == 'NaN') {
            throw Error("yeet the port");
        }
        this.data = {
            host: encodeURIComponent(data.host),
            name: encodeURIComponent(data.name),
            color: encodeURIComponent(data.color),
            port: data.port,
            token: (data.token) ? data.token : null
        };
        this.onWebSockFailure = onWebSockFailure;
        this.onWebSockOpen = onWebSockOpen;
        this.connectedOnce = false;
        this.failedAttempts = 0;
        this.verifiedConnection = false;
        this.jsonMessageHandler = (a) => { throw Error("jsonMessageHandler not set"); };
        this.ws = null;
        this.connect();
    }
    /**
     *
     * @param onWebSockFailure a callback for handling errors
     * @param onWebSockOpen a callback for handling a successful connection
     *
     * @returns a Connection object if connection data is found in sessionStorage, else null
     */
    static regainOldConnectionIfExists(onWebSockFailure, onWebSockOpen) {
        const result = sessionStorage.getItem('connection');
        if (result) {
            const dat = dataTypes_1.connectionDataFromJson(JSON.parse(result)); // json parsing shouldn't fail
            return new Connection(dat, onWebSockFailure, onWebSockOpen);
        }
        else {
            return null;
        }
    }
    getName() {
        return this.data.name;
    }
    getUrl() {
        if (this.data.token != null) {
            return `ws://${this.data.host}:${this.data.port}/${this.data.name}/${this.data.token}/${this.data.color}`;
        }
        else {
            return `ws://${this.data.host}:${this.data.port}/${this.data.name}/${this.data.color}`;
        }
    }
    connect() {
        this.ws = new WebSocket(this.getUrl());
        this.ws.onerror = this.onerror.bind(this);
        this.ws.onclose = this.onclose.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onopen = this.onopen.bind(this);
        this.verifiedConnection = false;
    }
    onclose(ev) {
        console.log("WS closed", ev);
        this.verifiedConnection = false;
        if (ev.code >= 4000 && ev.code < 4100) {
            // my error codes
            console.log("Connection failed due to:", ev.reason);
            this.onWebSockFailure(ev);
        }
        else if (this.connectedOnce) {
            if (this.failedAttempts > 5) {
                return;
            }
            setTimeout(() => {
                //newNotification('Reconnecting...');
                this.connect();
            }, 3000);
        }
    }
    onerror(ev) {
        console.log("WS errored", ev);
        this.verifiedConnection = false;
        this.failedAttempts += 1;
        if (!this.connectedOnce) {
            this.onWebSockFailure(ev);
        }
    }
    onmessage(ev) {
        if (ev.data == "Hello") {
            console.log("Successful Echo, Server is alive!");
            this.verifiedConnection = true;
        }
        else {
            try {
                const obj = JSON.parse(ev.data);
                //console.log("got msg:", obj);
                if ('token' in obj) {
                    const token = jsonParser_1.JsonParser.requireString(obj, 'token');
                    if (!this.data.token) {
                        // remember the token
                        console.log('Got token', token);
                        this.data.token = token;
                        sessionStorage.setItem('connection', JSON.stringify(this.data));
                    }
                    return;
                }
                this.jsonMessageHandler(obj);
            }
            catch (e) {
                if (e.name == 'SyntaxError') {
                    console.log('Got invalid JSON');
                }
                else {
                    console.log('Error:', e);
                    console.log('Error data:', e.data);
                    throw (e);
                }
            }
        }
    }
    onopen(ev) {
        console.log("WS opened", ev);
        this.failedAttempts = 0;
        this.onWebSockOpen(ev);
        this.connectedOnce = true;
        if (this.ws) {
            this.ws.send('Hi');
            this.ws.send('history');
        }
        else {
            throw Error('this shouldn\'t happen');
        }
    }
    setJsonMessageHandler(f) {
        this.jsonMessageHandler = f;
    }
    /**
 * The function handles the JSON.stringify
 *
 * @param o An object to send.
 */
    send(o) {
        const msg = JSON.stringify(o);
        if (this.ws) {
            this.ws.send(msg);
        }
        else {
            console.log('Disconnected');
        }
    }
    sendMessage(type, content, args) {
        this.send(jsonParser_1.JsonMessage(type, content, args));
    }
    getHistory() {
        if (this.ws) {
            this.ws.send('history');
        }
        else {
            console.log('Disconnected');
        }
    }
}
exports.Connection = Connection;


/***/ }),

/***/ "./src/dataTypes.ts":
/*!**************************!*\
  !*** ./src/dataTypes.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDataFromJson = void 0;
const jsonParser_1 = __webpack_require__(/*! ./jsonParser */ "./src/jsonParser.tsx");
function connectionDataFromJson(o) {
    return {
        name: jsonParser_1.JsonParser.requireString(o, 'name'),
        host: jsonParser_1.JsonParser.requireString(o, 'host'),
        port: jsonParser_1.JsonParser.requireNumber(o, 'port'),
        token: jsonParser_1.JsonParser.requireString(o, 'token'),
        color: jsonParser_1.JsonParser.requireString(o, 'color')
    };
}
exports.connectionDataFromJson = connectionDataFromJson;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const ui_1 = __webpack_require__(/*! ./components/ui */ "./src/components/ui.tsx");
ReactDOM.render(React.createElement(ui_1.UI, null), document.getElementById("root"));


/***/ }),

/***/ "./src/jsonParser.tsx":
/*!****************************!*\
  !*** ./src/jsonParser.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonParser = exports.JsonParserError = exports.JsonMessage = void 0;
function JsonMessage(type, content, args) {
    if (args.length > 0) {
        return { "type": type, "content": content, "args": args };
    }
    else {
        return { "type": type, "content": content };
    }
}
exports.JsonMessage = JsonMessage;
class JsonParserError extends Error {
    // from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.JsonParserError = JsonParserError;
class JsonParser {
    /**
     * Check the __name__ tag of the serialized object
     *
     * @param o The result of JSON.parse
     * @returns String which is the name of the serialized object, or "" if there is no name
     */
    static askName(o) {
        if (!('__name__' in o)) {
            //throw new JsonParserError("Missing json field: '__name__'");
            return '';
        }
        const value = o['__name__'];
        if (typeof (value) != 'string') {
            throw new JsonParserError("Json field '__name__' is of the wrong type: got '" + typeof (value) + "' but expected 'string'");
        }
        return value;
    }
    static askType(o) {
        if (!('type' in o)) {
            return '';
        }
        const value = o['type'];
        if (typeof (value) != 'string') {
            throw new JsonParserError("Json field 'type' is of the wrong type: got '" + typeof (value) + "' but expected 'string'");
        }
        return value;
    }
    static requireAny(o, name) {
        if (!(name in o)) {
            throw new JsonParserError("Missing json field: '" + name + "'");
        }
        return o[name];
    }
    static requireName(o, nameRequired) {
        if (!('__name__' in o)) {
            throw new JsonParserError("Missing json field: '" + name + "'");
        }
        const value = o['__name__'];
        if (typeof (value) != 'string') {
            throw new JsonParserError("Json field '__name__' is of the wrong type: got '" + typeof (value) + "' but expected 'string'");
        }
        if (value != nameRequired) {
            throw new JsonParserError("Json has incorrect object name, got '" + value + "' but expected '" + nameRequired + "'");
        }
    }
    static requireNumber(o, name) {
        if (!(name in o)) {
            throw new JsonParserError("Missing json field: '" + name + "'");
        }
        const value = o[name];
        if (typeof (value) != 'number') {
            throw new JsonParserError("Json field '" + name + "' is of the wrong type: got '" + typeof (value) + "' but expected 'number'");
        }
        return value;
    }
    static requireString(o, name) {
        if (!(name in o)) {
            throw new JsonParserError("Missing json field: '" + name + "'");
        }
        const value = o[name];
        if (typeof (value) != 'string') {
            throw new JsonParserError("Json field '" + name + "' is of the wrong type: got '" + typeof (value) + "' but expected 'string'");
        }
        return value;
    }
    static requireObject(o, name) {
        if (!(name in o)) {
            throw new JsonParserError("Missing json field: '" + name + "'");
        }
        const value = o[name];
        if (typeof (value) != 'object') {
            throw new JsonParserError("Json field '" + name + "' is of the wrong type: got '" + typeof (value) + "' but expected 'object'");
        }
        return value;
    }
    static requireArray(o, name) {
        if (!(name in o)) {
            throw new JsonParserError("Missing json field: '" + name + "'");
        }
        const value = o[name];
        if (typeof (value) != 'object' || value.__proto__.constructor.name != 'Array') {
            throw new JsonParserError("Json field '" + name + "' is of the wrong type: got '" + typeof (value) + "' but expected 'Array'");
        }
        return value;
    }
    static requireBool(o, name) {
        if (!(name in o)) {
            throw new JsonParserError("Missing json field: '" + name + "'");
        }
        const value = o[name];
        if (typeof (value) != 'boolean') {
            throw new JsonParserError("Json field '" + name + "' is of the wrong type: got '" + typeof (value) + "' but expected 'boolean'");
        }
        return value;
    }
}
exports.JsonParser = JsonParser;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map