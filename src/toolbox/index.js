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
                    _this.drawHistroy.call(_this);
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
        drawHistroy: {
            mosaic: function (value) {
                for (var j = 0; j < value.length; j++) {
                    this.painter.clearRect(value[j].x - 5, value[j].y - 5, 10, 10);
                }
            }
        },
        callback: function () {
            return drawMosaic();
        },
        hold: true
    },
    {
        label: "画笔",
        drawHistroy: {
            line: function (value) {
                this.painter.config({
                    strokeStyle: "red",
                    lineWidth: 2
                }).beginPath().moveTo(value[0].x, value[0].y);

                for (var j = 1; j < value.length; j++) {
                    this.painter.lineTo(value[j].x, value[j].y).stroke();
                }

            }
        },
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

