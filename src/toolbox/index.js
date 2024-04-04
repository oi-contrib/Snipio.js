import drawLine from "./drawLine";
import drawMosaic from "./drawMosaic";

export default [
    {
        label: "撤销",
        callback: function () {
            if (this.history.length > 0) {
                this.history.pop();
                this.painter.clearRect(0, 0, this.width, this.height);

                var _this = this;
                var updateView = function () {
                    for (var i = 0; i < _this.history.length; i++) {

                        // 线条
                        if (_this.history[i].type == "line") {
                            _this.painter.config({
                                strokeStyle: "red",
                                lineWidth: 2
                            }).beginPath().moveTo(_this.history[i].value[0].x, _this.history[i].value[0].y);

                            for (var j = 1; j < _this.history[i].value.length; j++) {
                                _this.painter.lineTo(_this.history[i].value[j].x, _this.history[i].value[j].y).stroke();
                            }
                        }

                        // 马赛克
                        else if (_this.history[i].type == "mosaic") {
                            for (var j = 0; j < _this.history[i].value.length; j++) {
                                _this.painter.clearRect(_this.history[i].value[j].x - 5, _this.history[i].value[j].y - 5, 10, 10);
                            }
                        }
                    }
                };

                if (this.base64) {
                    this.painter.drawImage(this.base64, 0, 0, this.width, this.height).then(function () {
                        updateView();
                    });
                } else {
                    this.painter.config({
                        fillStyle: "white"
                    }).fillRect(0, 0, this.width, this.height);
                    updateView();
                }

            } else {
                console.log("Snipio.js 历史记录为空");
            }
        }
    },
    {
        label: "保存",
        callback: function () {
            var btn = document.createElement('a');
            this.toDataURL().then(function (base64) {
                btn.href = base64;
                btn.download = "截图.png";
                btn.click();
            });
        }
    },
    {
        label: "马赛克",
        callback: function () {
            return drawMosaic();
        },
        hold: true
    },
    {
        label: "画笔",
        callback: function () {
            return drawLine();
        },
        hold: true
    },
    {
        label: "取消",
        callback: function () {
            this.close();
        }
    }
];

