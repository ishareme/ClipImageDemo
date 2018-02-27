(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ClipImageDemo = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = {
    readFileSize: function readFileSize(file) {
        return (file.size / 1024).toFixed(4) > 1024 ? (file.size / 1024 * 1024).toFixed(4) + ' MB' : (file.size / 1024).toFixed(4) + ' KB';
    },
    //判断数字
    isNumber: function isNumber(val) {
        //isFinite 检测是否为无穷大
        //isNumber(parseInt(a))   // true
        // 第一种写法
        return typeof val === 'number' && isFinite(val);
        //第二种写法
        // return typeof val === 'number' && !isNaN(val)
    },
    $: function $(ele) {
        if (document.querySelector) {
            return document.querySelector(ele);
        } else {
            if (ele.indexOf('#') > -1) {
                return document.getElementById(ele.replace('#', ''));
            } else if (ele.indexOf('.') > -1) {
                return document.getElementsByClassName(ele.replace('.', ''))[0];
            } else {
                return document.getElementsByTagName(ele)[0];
            }
        }
    },
    extend: function extend() {
        var options = void 0,
            name = void 0,
            clone = void 0,
            copy = void 0,
            source = void 0,
            copyIsArray = void 0,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }

        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && type(target) !== 'function') {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            //
            if ((options = arguments[i]) !== null) {
                // for in source object
                for (name in options) {

                    source = target[name];
                    copy = options[name];

                    if (target == copy) {
                        continue;
                    }

                    // deep clone
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        // if copy is array
                        if (copyIsArray) {
                            copyIsArray = false;
                            // if is not array, set it to array
                            clone = source && Array.isArray(source) ? source : [];
                        } else {
                            // if copy is not a object, set it to object
                            clone = source && isPlainObject(source) ? source : {};
                        }

                        target[name] = this.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    }
};

function type(object) {
    var class2type = {},
        type = class2type.toString.call(object),
        typeString = 'Boolean Number String Function Array Date RegExp Object Error Symbol';

    if (object == null) {
        return object + '';
    }

    typeString.split(' ').forEach(function (type) {
        class2type['[object ' + type + ']'] = type.toLowerCase();
    });

    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' || typeof object === 'function' ? class2type[type] || 'object' : typeof object === 'undefined' ? 'undefined' : _typeof(object);
}

function isPlainObject(object) {
    var proto = void 0,
        ctor = void 0,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object);

    if (!object || toString.call(object) !== '[object Object]') return false;

    proto = Object.getPrototypeOf(object);

    if (!proto) return true;

    ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

    return typeof ctor === 'function' && fnToString.call(ctor) === ObjectFunctionString;
}

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof$1 = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var utils$1 = {
    isImageDom: function isImageDom(img) {
        return img.tagName.toLowerCase() === 'img';
    },
    isCanvasDom: function isCanvasDom(canvas) {
        return canvas.tagName.toLowerCase() === 'canvas';
    },
    isVideoDom: function isVideoDom(video) {
        return video.tagName.toLowerCase() === 'video';
    },

    isPX: function isPX(str) {
        return str.trim().endsWith('px');
    },
    isPercent: function isPercent(str) {
        return str.trim().endsWith('%');
    },
    isCenter: function isCenter(str) {
        return str.trim().toLowerCase() === 'center';
    },
    isLeft: function isLeft(str) {
        return str.trim().toLowerCase() === 'left';
    },
    isTop: function isTop(str) {
        return str.trim().toLowerCase() === 'top';
    },
    isRight: function isRight(str) {
        return str.trim().toLowerCase() === 'right';
    },
    isBottom: function isBottom(str) {
        return str.trim().toLowerCase() === 'bottom';
    },

    isPNG: function isPNG(val) {
        return val.trim().toLowerCase() === 'png';
    },
    isJPG: function isJPG(val) {
        return val.trim().toLowerCase() === 'jpg' || val.trim().toLowerCase() === 'jpeg';
    },

    //数组判断
    isArray: Array.isArray || function (arr) {
        return Array.prototype.toString.call(arr) === '[object Array]';
    },
    //判断数字
    isNumber: function isNumber(val) {
        //isFinite 检测是否为无穷大
        //isNumber(parseInt(a))   // true
        // 第一种写法
        return typeof val === 'number' && isFinite(val);
        //第二种写法
        // return typeof val === 'number' && !isNaN(val)
    },
    //判断字符串
    isString: function isString(str) {
        return typeof str === 'string';
    },
    //判断布尔值
    isBoolean: function isBoolean(bool) {
        return typeof bool === 'boolean';
    },
    //判断函数
    isFun: function isFun(fn) {
        return typeof fn === 'function';
    },
    //判断对象
    isObject: function isObject(obj) {
        //{},[],null 用typeof检测不出来
        return Object.prototype.toString.call(obj) === '[object Object]';
    },
    //判断undefined
    isUndefined: function isUndefined(undefined) {
        return typeof undefined === 'undefined';
    },
    isNull: function isNull(n) {
        //判断空值用 n === null
        return n === null;
    },
    isNaN: function (_isNaN) {
        function isNaN(_x) {
            return _isNaN.apply(this, arguments);
        }

        isNaN.toString = function () {
            return _isNaN.toString();
        };

        return isNaN;
    }(function (val) {
        return typeof val === 'number' && isNaN(val);
    }),
    $: function $(ele) {
        if (document.querySelector) {
            return document.querySelector(ele);
        } else {
            if (ele.indexOf('#') > -1) {
                return document.getElementById(ele.replace('#', ''));
            } else if (ele.indexOf('.') > -1) {
                return document.getElementsByClassName(ele.replace('.', ''))[0];
            } else {
                return document.getElementsByTagName(ele)[0];
            }
        }
    },
    extend: function extend() {
        var options = void 0,
            name = void 0,
            clone = void 0,
            copy = void 0,
            source = void 0,
            copyIsArray = void 0,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }

        if ((typeof target === 'undefined' ? 'undefined' : _typeof$1(target)) !== 'object' && type$1(target) !== 'function') {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            //
            if ((options = arguments[i]) !== null) {
                // for in source object
                for (name in options) {

                    source = target[name];
                    copy = options[name];

                    if (target == copy) {
                        continue;
                    }

                    // deep clone
                    if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = Array.isArray(copy)))) {
                        // if copy is array
                        if (copyIsArray) {
                            copyIsArray = false;
                            // if is not array, set it to array
                            clone = source && Array.isArray(source) ? source : [];
                        } else {
                            // if copy is not a object, set it to object
                            clone = source && isPlainObject$1(source) ? source : {};
                        }

                        target[name] = this.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    }
};

function type$1(object) {
    var class2type = {},
        type = class2type.toString.call(object),
        typeString = 'Boolean Number String Function Array Date RegExp Object Error Symbol';

    if (object == null) {
        return object + '';
    }

    typeString.split(' ').forEach(function (type) {
        class2type['[object ' + type + ']'] = type.toLowerCase();
    });

    return (typeof object === 'undefined' ? 'undefined' : _typeof$1(object)) === 'object' || typeof object === 'function' ? class2type[type] || 'object' : typeof object === 'undefined' ? 'undefined' : _typeof$1(object);
}

function isPlainObject$1(object) {
    var proto = void 0,
        ctor = void 0,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object);

    if (!object || toString.call(object) !== '[object Object]') return false;

    proto = Object.getPrototypeOf(object);

    if (!proto) return true;

    ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

    return typeof ctor === 'function' && fnToString.call(ctor) === ObjectFunctionString;
}

function ClipImage() {
    var _this = this;

    for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
    }

    console.log('ImageClip');
    return new Promise(function (resolve, reject) {
        _this.init(options, resolve, reject);
    });
}

ClipImage.prototype = {
    init: function init(options, resolve, reject) {
        console.log('options', options);
        this.defaultConfigOption = {
            width: 100,
            height: 100,
            left: 0, //数字 px, %, center top 等等
            top: 0,
            type: 'jpeg',
            quality: 1, //0-1
            success: function success() {},
            error: function error() {}
        };
        this.errorObj = {};

        if (utils$1.isUndefined(options[0]) || !utils$1.isString(options[0]) && !utils$1.isImageDom(options[0]) && !utils$1.isCanvasDom(options[0]) && !utils$1.isVideoDom(options[0])) return new Error('ClipImage第一个参数是url/HTMLImageElement/HTMLVideoElement/HTMLCanvasElement');
        if (!utils$1.isObject(options[1])) return new Error('ClipImage第二个参数是对象哦~~');

        this.canvasImageSource = options[0];
        this.configOptions = utils$1.extend(true, this.defaultConfigOption, options[1]);

        this.initCanvas(this.canvasImageSource, resolve, reject);
    },
    initCanvas: function initCanvas(source, resolve, reject) {
        var _this2 = this;

        this.resultCanvas = document.createElement('canvas');
        this.resultCtx = this.resultCanvas.getContext('2d');

        this.resultW = this.getRealVal(this.configOptions.width, 'x');
        this.resultH = this.getRealVal(this.configOptions.height, 'y');
        this.sourceX = this.getRealVal(this.configOptions.left, 'x');
        this.sourceY = this.getRealVal(this.configOptions.top, 'y');

        this.resultCanvas.width = this.resultW;
        this.resultCanvas.height = this.resultH;

        if (utils$1.isString(source) || utils$1.isImageDom(source)) {
            this.sourceImage = new Image();
            this.sourceImage.setAttribute('crossOrigin', 'anonymous');
            this.sourceImage.onload = function () {
                _this2.clip(resolve);
            };
            this.sourceImage.onerror = function (error) {
                _this2.configOptions.error && _this2.configOptions.error(error);
                reject(error);
            };
            this.sourceImage.src = utils$1.isImageDom(source) ? source.src : source;
        } else if (utils$1.isCanvasDom(source)) {
            this.sourceImage = source;
            this.clip(resolve);
        } else if (utils$1.isVideoDom(source)) {}
    },
    clip: function clip(resolve) {
        console.log('source', this.sourceImage);

        this.resultCtx.drawImage(this.sourceImage, this.sourceX, this.sourceY, this.resultW, this.resultH, 0, 0, this.resultW, this.resultH);

        this.resultB64 = this.resultCanvas.toDataURL('image/' + this.getOutType(this.configOptions.type), this.configOptions.quality);

        this.configOptions.success && this.configOptions.success(this.resultB64);

        resolve(this.resultB64);
    },
    getRealVal: function getRealVal(val, direction) {
        if (utils$1.isNumber(val) || utils$1.isString(val) && utils$1.isPX(val)) {
            return utils$1.isNumber(val) ? val : parseInt(val.trim().slice(0, -2));
        } else if (utils$1.isString(val) && utils$1.isPercent(val)) {
            return direction === 'x' ? this.sourceImage.width * (parseInt(val.slice(0, -1)) / 100) : this.sourceImage.height * (parseInt(val.slice(0, -1)) / 100);
        } else if (utils$1.isString(val) && utils$1.isCenter(val)) {
            return direction === 'x' ? this.sourceImage.width / 2 : this.sourceImage.height / 2;
        } else if (utils$1.isString(val) && (utils$1.isLeft(val) || utils$1.isTop(val))) {
            return 0;
        } else if (utils$1.isString(val) && (utils$1.isRight(val) || utils$1.isBottom(val))) {
            return utils$1.isRight(val) ? this.sourceImage.width : this.sourceImage.height;
        } else {
            this.errorObj.msg = '参数配置错误';
            this.configOptions.error && this.configOptions.error(this.errorObj);
            return false;
        }
    },
    getOutType: function getOutType(val) {
        return utils$1.isJPG(val) ? 'jpeg' : 'png';
    }
};

function ClipImageDemo(options) {
    this.init(options);
}

ClipImageDemo.prototype = {
    init: function init(options) {
        if (!options) return new Error('未传参数');

        this.defaultOptions = {
            originDom: null,
            uploadBtn: null,
            width: 400,
            height: 400,
            type: 'jpeg',
            quality: 1,
            success: function success() {},
            error: function error() {}
        };
        this.options = utils.extend(true, this.defaultOptions, options);

        console.log('this.options', this.options);

        if (!utils.$(this.options.originDom) || !utils.$(this.options.originDom)) return new Error('未找到相应的Dom元素');

        this.mouseStartPoint = {};
        this.mouseMovePoint = {};
        this.mouseEndPoint = {};

        this.resultObj = {};

        this.drawFinished = false;
        this.chooseAreaFinished = false;
        this.touchTime = new Date().getTime();

        this.originDom = utils.$(this.options.originDom);
        this.uploadBtn = utils.$(this.options.uploadBtn);

        this.initCanvas();

        this.bind();
    },
    initCanvas: function initCanvas() {
        this.originCanvas = document.createElement('canvas');
        this.originDom.appendChild(this.originCanvas);
        this.originCtx = this.originCanvas.getContext('2d');

        this.originCanvas.width = this.getRealVal(this.options.width);
        this.originCanvas.height = this.getRealVal(this.options.width);

        this.originCtx.fillStyle = '#FFF';
        this.originCtx.fillRect(0, 0, this.originCanvas.width, this.originCanvas.height);
        this.originCtx.font = '20px Arial';
        this.originCtx.textAlign = 'center';
        this.originCtx.textBaseline = 'middle';
        this.originCtx.fillStyle = '#ff4694';
        this.originCtx.fillText('You can drag the picture here', this.originCanvas.width / 2, this.originCanvas.height / 2);

        if (this.originDom.style.position !== 'relative' || this.originDom.style.position !== 'absolute') {
            this.originDom.style.position = 'relative';
        }
        this.maskCanvas = document.createElement('canvas');
        this.maskCanvas.style.position = 'absolute';
        this.maskCanvas.style.left = '0';
        this.maskCanvas.style.top = '0';
        this.maskCtx = this.maskCanvas.getContext('2d');
        this.maskCanvas.width = this.originCanvas.width;
        this.maskCanvas.height = this.originCanvas.height;
        this.maskCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.maskCtx.fillRect(0, 0, this.maskCanvas.width, this.maskCanvas.height);
    },
    bind: function bind() {
        var _this = this;

        //使用拖拽上传
        //阻止dragenter和dragover事件的默认行为，这样才能触发 drop 事件
        this.originDom.addEventListener('dragenter', function (event) {
            console.log('dragenter');
            event.stopPropagation();
            event.preventDefault();
        });
        this.originDom.addEventListener('dragover', function (event) {
            console.log('dragover');
            event.stopPropagation();
            event.preventDefault();
        });
        this.originDom.addEventListener('drop', function (event) {
            console.log('drop');
            event.stopPropagation();
            event.preventDefault();

            var dataTransferFile = event.dataTransfer.files[0];

            _this.fileReaderFun(dataTransferFile);
        });

        //使用点击上传
        this.uploadBtn.addEventListener('change', function (event) {
            var eventFile = event.target.files[0];

            // readerFileDec(eventFile)

            event.target.value = '';

            _this.fileReaderFun(eventFile);
        });

        this.maskCanvas.addEventListener('dbclick', function () {
            console.log('this.chooseAreaFinished', _this.chooseAreaFinished);
            if (_this.mouseEndPoint.x === _this.mouseStartPoint.x && _this.mouseEndPoint.y === _this.mouseStartPoint.y) return;
            if (_this.chooseAreaFinished && _this.drawFinished) {
                _this.clipFun();
                // clipFunTwo()
                // clipFunThree()
            }
        });

        this.maskCanvas.addEventListener('click', function () {
            console.log('this.drawFinished', _this.drawFinished);
            if (new Date().getTime() - _this.touchTime < 500) {
                console.log('dbclick');
                if (_this.mouseEndPoint.x === _this.mouseStartPoint.x && _this.mouseEndPoint.y === _this.mouseStartPoint.y) return;
                if (_this.chooseAreaFinished && _this.drawFinished) {
                    _this.clipFun();
                    // clipFunTwo()
                    // clipFunThree()
                }
            } else {
                _this.touchTime = new Date().getTime();
                console.log('click');
            }
        });

        this.captureMT(this.maskCanvas, this.touchStart, this.touchMove, this.touchEnd);
    },
    fileReaderFun: function fileReaderFun(dataTransferFile) {
        var _this2 = this;

        var fileReader = new FileReader();
        fileReader.onload = function () {
            _this2.drawCanvasImage(event);
        };
        fileReader.readAsDataURL(dataTransferFile);
    },
    drawCanvasImage: function drawCanvasImage(event) {
        var _this3 = this;

        this.originB64 = event.target.result;

        var originImage = new Image();
        originImage.onload = function () {
            var originImageWidth = originImage.width;
            var originImageHeight = originImage.height;

            _this3.originCtx.clearRect(0, 0, _this3.originCanvas.width, _this3.originCanvas.height);
            if (originImageWidth <= _this3.originCanvas.width && originImageHeight <= _this3.originCanvas.height) {
                _this3.originCtx.fillStyle = '#FFF';
                _this3.originCtx.fillRect(0, 0, _this3.originCanvas.width, _this3.originCanvas.height);
                _this3.originCtx.drawImage(originImage, (_this3.originCanvas.width - originImageWidth) / 2, (_this3.originCanvas.height - originImageHeight) / 2, originImageWidth, originImageHeight);
                _this3.originDom.appendChild(_this3.maskCanvas);
                _this3.drawFinished = true;
            } else if (originImageWidth > _this3.originCanvas.width || originImageHeight > _this3.originCanvas.height) {
                _this3.originCtx.fillStyle = '#FFF';
                _this3.originCtx.fillRect(0, 0, _this3.originCanvas.width, _this3.originCanvas.height);
                if (originImageWidth >= originImageHeight) {
                    _this3.originCtx.drawImage(originImage, 0, (_this3.originCanvas.height - _this3.originCanvas.width * originImageHeight / originImageWidth) / 2, _this3.originCanvas.width, _this3.originCanvas.width * originImageHeight / originImageWidth);
                } else {
                    _this3.originCtx.drawImage(originImage, (_this3.originCanvas.width - _this3.originCanvas.height * originImageWidth / originImageHeight) / 2, 0, _this3.originCanvas.height * originImageWidth / originImageHeight, _this3.originCanvas.height);
                }
                _this3.drawFinished = true;
                _this3.originDom.appendChild(_this3.maskCanvas);
            }
        };

        originImage.src = this.originB64;
    },
    clipFun: function clipFun() {
        var self = this;
        new ClipImage(this.originCanvas, {
            width: Math.abs(this.mouseEndPoint.x - this.mouseStartPoint.x),
            height: Math.abs(this.mouseEndPoint.y - this.mouseStartPoint.y),
            left: this.mouseStartPoint.x,
            top: this.mouseStartPoint.y,
            type: this.options.type,
            quality: this.options.quality,
            success: function success(b64) {
                self.resultObj = {
                    b64: b64,
                    width: Math.abs(self.mouseEndPoint.x - self.mouseStartPoint.x),
                    height: Math.abs(self.mouseEndPoint.y - self.mouseStartPoint.y),
                    type: self.options.type
                };
                self.options.success && self.options.success(self.resultObj);
            },
            error: function error(_error) {
                console.log(_error);
                self.options.error && self.options.error(_error);
            }
        });
    },
    toFile: function toFile() {
        // canvasResult.toBlob(function (result) {
        //     console.log('canvasResult.toBlob', result)
        //     resultFileDecSize.innerHTML = 'Size: ' + utils.readFileSize(result)
        //     resultFileDecType.innerHTML = 'Type: ' + result.type
        // }, 'image/jpeg')
    },
    touchStart: function touchStart(event) {
        if (this.chooseAreaFinished) return;
        this.mouseStartPoint.x = event.point.x;
        this.mouseStartPoint.y = event.point.y;
    },
    touchMove: function touchMove(event) {
        if (this.chooseAreaFinished) return;
        this.mouseMovePoint.x = event.point.x;
        this.mouseMovePoint.y = event.point.y;
        if (this.mouseMovePoint.x > this.mouseStartPoint.x && this.mouseMovePoint.y > this.mouseStartPoint.y) {
            this.maskCtx.clearRect(this.mouseStartPoint.x, this.mouseStartPoint.y, Math.abs(this.mouseMovePoint.x - this.mouseStartPoint.x), Math.abs(this.mouseMovePoint.y - this.mouseStartPoint.y));
        } else if (this.mouseMovePoint.x < this.mouseStartPoint.x && this.mouseMovePoint.y < this.mouseStartPoint.y) {
            this.maskCtx.clearRect(this.mouseStartPoint.x, this.mouseStartPoint.y, -Math.abs(this.mouseMovePoint.x - this.mouseStartPoint.x), -Math.abs(this.mouseMovePoint.y - this.mouseStartPoint.y));
        }
    },
    touchEnd: function touchEnd(event) {
        if (this.chooseAreaFinished) return;
        this.mouseEndPoint.x = event.point.x;
        this.mouseEndPoint.y = event.point.y;
        if (this.mouseEndPoint.x === this.mouseStartPoint.x && this.mouseEndPoint.y === this.mouseStartPoint.y) {
            this.chooseAreaFinished = false;
        } else {
            this.chooseAreaFinished = true;
        }
    },
    captureMT: function captureMT(ele, touchStartEvent, touchMoveEvent, touchEndEvent) {
        var _this4 = this;

        if (!ele) return;
        var isTouch = 'ontouchend' in document;
        var touchStart = isTouch ? 'touchstart' : 'mousedown';
        var touchMove = isTouch ? 'touchmove' : 'mousemove';
        var touchEnd = isTouch ? 'touchend' : 'mouseup';

        function getPoint(event) {
            event = event || window.event;
            event = isTouch ? event.touches[0] : event;

            var x = event.pageX || event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            x -= ele.parentElement.offsetLeft;
            var y = event.pageY || event.clientY + document.documentElement.scrollLeft + document.body.scrollLeft;
            y -= ele.parentElement.offsetTop;

            return {
                x: x,
                y: y
            };
        }

        ele.addEventListener(touchStart, function (event) {
            event.point = getPoint(event);
            touchStartEvent && touchStartEvent.call(_this4, event);
        }, false);
        ele.addEventListener(touchMove, function (event) {
            event.point = getPoint(event);
            touchMoveEvent && touchMoveEvent.call(_this4, event);
        }, false);
        ele.addEventListener(touchEnd, function (event) {
            event.point = getPoint(event);
            touchEndEvent && touchEndEvent.call(_this4, event);
        });
    },
    getRealVal: function getRealVal(val) {
        if (utils.isNumber(val) || utils.isString(val) && utils.isPX(val)) {
            return utils.isNumber(val) ? val : parseInt(val.trim().slice(0, -2));
        }
    }
};

return ClipImageDemo;

})));
