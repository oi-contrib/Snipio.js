import mousePosition from "../core/xhtml/mousePosition";

export default function () {
    var points = [];
    var isDown = false;

    return {
        on: {
            mouseDown: function (event) {
                isDown = true;
                points = [];
            },
            mouseMove: function (event) {
                if (isDown) {
                    var p = mousePosition(this.view, event);
                    this.painter.clearRect(p.x - 5, p.y - 5, 10, 10);

                    points.push(p);
                }
            },
            mouseUp: function () {
                isDown = false;

                // 记录历史
                this.history.push({
                    type: "mosaic",
                    value: points
                });
            }
        }
    }
};