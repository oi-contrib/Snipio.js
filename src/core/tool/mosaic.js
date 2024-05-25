import Canvas from "vislite/lib/Canvas/index.es";

export var createMosaic = function (width, height) {
    var viewEl = document.createElement("div");
    var painter = new Canvas(viewEl, {}, width, height);

    for (var i = 0; i < width; i += 5) {
        for (var j = 0; j < height; j += 5) {

            var average = (Math.random() * 100 + 100).toFixed(0);
            painter.config({
                fillStyle: "rgb(" + average + "," + average + "," + average + ")"
            }).fillRect(i, j, 5, 5);

        }
    }

    return painter.getContext().canvas.toDataURL();
};