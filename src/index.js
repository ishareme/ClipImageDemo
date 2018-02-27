import utils from './utils';
import ClipImage from '@meitu/ClipImage';
function ClipImageDemo(options) {
    this.init(options);
}

ClipImageDemo.prototype = {
    init(options){
        if (!options) return new Error('未传参数');

        this.defaultOptions = {
            originDom: null,
            uploadBtn: null,
            width: 400,
            height: 400,
            type: 'jpeg',
            quality: 1,
            success(){},
            error(){},
        };
        this.options = utils.extend(true, this.defaultOptions, options);

        console.log('this.options', this.options)

        if(!utils.$(this.options.originDom) || !utils.$(this.options.originDom)) return new Error('未找到相应的Dom元素');

        this.mouseStartPoint = {};
        this.mouseMovePoint = {};
        this.mouseEndPoint = {};

        this.resultObj = {}

        this.drawFinished = false
        this.chooseAreaFinished = false;
        this.touchTime = new Date().getTime();

        this.originDom = utils.$(this.options.originDom);
        this.uploadBtn = utils.$(this.options.uploadBtn);

        this.initCanvas();

        this.bind();
    },
    initCanvas(){
        this.originCanvas = document.createElement('canvas');
        this.originDom.appendChild(this.originCanvas);
        this.originCtx = this.originCanvas.getContext('2d');

        this.originCanvas.width = this.getRealVal(this.options.width);
        this.originCanvas.height = this.getRealVal(this.options.width);

        this.originCtx.fillStyle = '#FFF'
        this.originCtx.fillRect(0,0, this.originCanvas.width, this.originCanvas.height)
        this.originCtx.font = '20px Arial';
        this.originCtx.textAlign = 'center';
        this.originCtx.textBaseline = 'middle';
        this.originCtx.fillStyle = '#ff4694';
        this.originCtx.fillText('You can drag the picture here', this.originCanvas.width / 2, this.originCanvas.height / 2);

        if (this.originDom.style.position !== 'relative' || this.originDom.style.position !== 'absolute'){
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
    bind(){
        //使用拖拽上传
        //阻止dragenter和dragover事件的默认行为，这样才能触发 drop 事件
        this.originDom.addEventListener('dragenter', (event) => {
            console.log('dragenter');
            event.stopPropagation();
            event.preventDefault();
        });
        this.originDom.addEventListener('dragover', (event) => {
            console.log('dragover');
            event.stopPropagation();
            event.preventDefault();
        });
        this.originDom.addEventListener('drop', (event) => {
            console.log('drop');
            event.stopPropagation();
            event.preventDefault();

            let dataTransferFile = event.dataTransfer.files[0];

            this.fileReaderFun(dataTransferFile);
        });

        //使用点击上传
        this.uploadBtn.addEventListener('change', (event) => {
            var eventFile = event.target.files[0];

            // readerFileDec(eventFile)

            event.target.value = '';

            this.fileReaderFun(eventFile);

        });

        this.maskCanvas.addEventListener('dbclick', () => {
            console.log('this.chooseAreaFinished',this.chooseAreaFinished)
            if (this.mouseEndPoint.x === this.mouseStartPoint.x && this.mouseEndPoint.y === this.mouseStartPoint.y) return;
            if (this.chooseAreaFinished && this.drawFinished) {
                this.clipFun();
                // clipFunTwo()
                // clipFunThree()
            }
        });

        this.maskCanvas.addEventListener('click', () =>{
            console.log('this.drawFinished', this.drawFinished)
            if( new Date().getTime() - this.touchTime < 500 ){
                console.log('dbclick');
                if (this.mouseEndPoint.x === this.mouseStartPoint.x && this.mouseEndPoint.y === this.mouseStartPoint.y) return;
                if (this.chooseAreaFinished && this.drawFinished) {
                    this.clipFun();
                    // clipFunTwo()
                    // clipFunThree()
                }
            }else{
                this.touchTime = new Date().getTime();
                console.log('click');
            }
        });

        this.captureMT(this.maskCanvas, this.touchStart, this.touchMove, this.touchEnd);
    },

    fileReaderFun(dataTransferFile){
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.drawCanvasImage(event);
        };
        fileReader.readAsDataURL(dataTransferFile);
    },
    drawCanvasImage(event){
        this.originB64 = event.target.result;

        let originImage = new Image();
        originImage.onload = () => {
            let originImageWidth = originImage.width;
            let originImageHeight = originImage.height;

            this.originCtx.clearRect(0, 0, this.originCanvas.width, this.originCanvas.height);
            if (originImageWidth <= this.originCanvas.width && originImageHeight <= this.originCanvas.height){
                this.originCtx.fillStyle = '#FFF'
                this.originCtx.fillRect(0,0, this.originCanvas.width, this.originCanvas.height)
                this.originCtx.drawImage(originImage, (this.originCanvas.width - originImageWidth) / 2, (this.originCanvas.height - originImageHeight) / 2, originImageWidth, originImageHeight);
                this.originDom.appendChild(this.maskCanvas);
                this.drawFinished = true
            }
            else if (originImageWidth > this.originCanvas.width || originImageHeight > this.originCanvas.height){
                this.originCtx.fillStyle = '#FFF'
                this.originCtx.fillRect(0,0, this.originCanvas.width, this.originCanvas.height)
                if (originImageWidth >= originImageHeight){
                    this.originCtx.drawImage(originImage, 0, (this.originCanvas.height - ((this.originCanvas.width * originImageHeight) / originImageWidth)) / 2, this.originCanvas.width, (this.originCanvas.width * originImageHeight) / originImageWidth);
                }
                else {
                    this.originCtx.drawImage(originImage, (this.originCanvas.width - ((this.originCanvas.height * originImageWidth) / originImageHeight)) / 2, 0, (this.originCanvas.height * originImageWidth) / originImageHeight, this.originCanvas.height);
                }
                this.drawFinished = true
                this.originDom.appendChild(this.maskCanvas);
            }

        };

        originImage.src = this.originB64;
    },
    clipFun(){
        let self = this;
        new ClipImage(this.originCanvas, {
            width: Math.abs(this.mouseEndPoint.x - this.mouseStartPoint.x),
            height: Math.abs(this.mouseEndPoint.y - this.mouseStartPoint.y),
            left: this.mouseStartPoint.x,
            top: this.mouseStartPoint.y,
            type: this.options.type,
            quality: this.options.quality,
            success(b64){
                self.resultObj = {
                    b64: b64,
                    width: Math.abs(self.mouseEndPoint.x - self.mouseStartPoint.x),
                    height: Math.abs(self.mouseEndPoint.y - self.mouseStartPoint.y),
                    type: self.options.type,
                }
                self.options.success && self.options.success(self.resultObj);
            },
            error(error){
                console.log(error);
                self.options.error && self.options.error(error);
            },
        });
    },
    toFile(){
        // canvasResult.toBlob(function (result) {
        //     console.log('canvasResult.toBlob', result)
        //     resultFileDecSize.innerHTML = 'Size: ' + utils.readFileSize(result)
        //     resultFileDecType.innerHTML = 'Type: ' + result.type
        // }, 'image/jpeg')
    },

    touchStart(event) {
        if (this.chooseAreaFinished) return;
        this.mouseStartPoint.x = event.point.x;
        this.mouseStartPoint.y = event.point.y;
    },
    touchMove(event) {
        if (this.chooseAreaFinished) return;
        this.mouseMovePoint.x = event.point.x;
        this.mouseMovePoint.y = event.point.y;
        if (this.mouseMovePoint.x > this.mouseStartPoint.x && this.mouseMovePoint.y > this.mouseStartPoint.y){
            this.maskCtx.clearRect(this.mouseStartPoint.x, this.mouseStartPoint.y, Math.abs(this.mouseMovePoint.x - this.mouseStartPoint.x), Math.abs(this.mouseMovePoint.y - this.mouseStartPoint.y));
        }
        else if (this.mouseMovePoint.x < this.mouseStartPoint.x && this.mouseMovePoint.y < this.mouseStartPoint.y) {
            this.maskCtx.clearRect(this.mouseStartPoint.x, this.mouseStartPoint.y, -Math.abs(this.mouseMovePoint.x - this.mouseStartPoint.x), -Math.abs(this.mouseMovePoint.y - this.mouseStartPoint.y));
        }
    },
    touchEnd(event) {
        if (this.chooseAreaFinished) return;
        this.mouseEndPoint.x = event.point.x;
        this.mouseEndPoint.y = event.point.y;
        if (this.mouseEndPoint.x === this.mouseStartPoint.x && this.mouseEndPoint.y === this.mouseStartPoint.y){
            this.chooseAreaFinished = false;
        }
        else {
            this.chooseAreaFinished = true;
        }
    },
    captureMT(ele, touchStartEvent, touchMoveEvent, touchEndEvent) {
        if (!ele) return;
        var isTouch = ('ontouchend' in document);
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
                y: y,
            };
        }

        ele.addEventListener(touchStart, (event) => {
            event.point = getPoint(event);
            touchStartEvent && touchStartEvent.call(this, event);
        }, false);
        ele.addEventListener(touchMove, (event) => {
            event.point = getPoint(event);
            touchMoveEvent && touchMoveEvent.call(this, event);
        }, false);
        ele.addEventListener(touchEnd, (event) => {
            event.point = getPoint(event);
            touchEndEvent && touchEndEvent.call(this, event);
        });
    },

    getRealVal(val){
        if (utils.isNumber(val) || (utils.isString(val) && utils.isPX(val))){
            return utils.isNumber(val) ? val : parseInt(val.trim().slice(0, -2));
        }
    },
};

export default ClipImageDemo;
