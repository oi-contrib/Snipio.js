import setStyle from "./core/xhtml/setStyle";
import snipping from "./core/snipping/index";

export default function (type, callback) {
    var bodyEl = document.getElementsByTagName("body")[0];
    var snippingEl = document.createElement("div");
    var viewEl = document.createElement("div");

    bodyEl.appendChild(snippingEl);
    snippingEl.setAttribute("snipio", "snipping");

    setStyle(snippingEl, {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999999,
        backgroundColor: "rgb(0 0 0 / 4%)"
    });

    snippingEl.appendChild(viewEl);

    setStyle(viewEl, {
        position: "absolute",
        backgroundColor: "rgb(0 0 0 / 10%)"
    });

    var isSnipping = false; // 记录是否正在截图选择中
    var left, top; // 鼠标按下位置
    var width, height; // 区域尺寸

    snippingEl.addEventListener("mousedown", function (event) {
        left = event.clientX;
        top = event.clientY;

        isSnipping = true;
    });

    snippingEl.addEventListener("mousemove", function (event) {
        if (isSnipping) {
            width = event.clientX - left;
            height = event.clientY - top;

            var _left = left, _top = top, _width = width, _height = height;

            if (_width <= 0) { _left += _width; _width *= -1; }
            if (_height <= 0) { _top += _height; _height *= -1; }

            setStyle(viewEl, {
                left: _left + "px",
                top: _top + "px",
                width: _width + "px",
                height: _height + "px"
            });
        }
    });

    snippingEl.addEventListener("mouseup", function (event) {
        if (isSnipping) {

            // 结束的时候，进行校对
            if (width <= 0) { left += width; width *= -1; }
            if (height <= 0) { top += height; height *= -1; }

            bodyEl.removeChild(snippingEl);

            if (type == 'h5') {
                snipping(left, top, width, height, bodyEl).then(function (base64) {
                    callback(base64, width, height);
                });
            } else if (type == 'system') {
                var videoEl = document.createElement('video');

                // 获取屏幕内容
                navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: false
                }).then(function (stream) {

                    // 视频流及时播放
                    videoEl.srcObject = stream;
                    videoEl.onloadedmetadata = function () {
                        videoEl.play();
                    };

                    stream.getVideoTracks()[0].onended = function () {

                        // 准备画布
                        var canvas = document.createElement('canvas');
                        canvas.setAttribute('width', width);
                        canvas.setAttribute('height', height);

                        var painter = canvas.getContext('2d');

                        // 绘制
                        painter.drawImage(videoEl, left + (event.screenX - event.clientX), top + (event.screenY - event.clientY), width, height, 0, 0, width, height);

                        callback(canvas.toDataURL(), width, height);
                    };


                }).catch(function (event) {
                    alert("取消截图或遇到错误\n\n" + event);
                });

            } else {
                throw new Error("不合法的截图模式：" + type);
            }

            isSnipping = false;
        }
    });

};