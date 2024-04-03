import mousePosition from "../core/xhtml/mousePosition";

export default function () {
    var line = [];
    var isDown = false;

    return {
        bind: {
            mouseDown: function (event) {
                isDown = true;
                var p = mousePosition(this.view, event);

                this.painter.config({
                    strokeStyle: "red",
                    lineWidth: 2
                }).beginPath().moveTo(p.x, p.y);

                line = [p];
            },
            mouseMove: function (event) {
                if (isDown) {
                    var p = mousePosition(this.view, event);
                    this.painter.lineTo(p.x, p.y).stroke().moveTo(p.x, p.y);

                    line.push(p);
                }
            },
            mouseUp: function () {
                isDown = false;

                // 记录历史
                this.history.push({
                    type: "line",
                    value: line
                });
            }
        }
    }
};