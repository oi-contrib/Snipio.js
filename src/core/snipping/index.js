import elToTemplate from './elToTemplate';

export default function (_left, _top, _width, _height, el) {
    return new Promise(function (resolve, reject) {
        elToTemplate(el).then(function (template) {

            var width = el.offsetWidth;
            var height = el.offsetHeight;

            var img = document.createElement('img');

            img.setAttribute('width', width);
            img.setAttribute('height', height);
            img.setAttribute('src', "data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'><foreignObject width='" + width + "' height='" + height + "' ><body style='margin:0px;' xmlns='http://www.w3.org/1999/xhtml'>" + template + "</body></foreignObject></svg>");

            setTimeout(function () {

                // 准备画布
                var canvas = document.createElement('canvas');
                canvas.setAttribute('width', _width);
                canvas.setAttribute('height', _height);

                var painter = canvas.getContext('2d');

                // 绘制
                painter.drawImage(img, _left, _top, _width, _height, 0, 0, _width, _height);

                resolve(canvas.toDataURL());
            }, 100);
        });
    });
};