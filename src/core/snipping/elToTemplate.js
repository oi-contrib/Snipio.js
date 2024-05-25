import getStyleTemplate from "./getStyleTemplate";

var imgUrlWill = {};

var elToTemplate = function (el) {
    var tagName = el.tagName.toLowerCase();

    var styleTemplate = getStyleTemplate(el, imgUrlWill);
    var template = "<" + tagName + " style='" + styleTemplate + "'>";

    for (var index = 0; index < el.childNodes.length; index++) {

        // 排除掉一些特殊的标签和截图工具本身
        if (["SCRIPT", "#comment", "STYLE", "NOSCRIPT"].indexOf(el.childNodes[index].nodeName) > -1 || (el.childNodes[index].getAttribute && el.childNodes[index].getAttribute('page-view') == 'snipping-tool')) {
            continue;
        }

        // 文本
        if (el.childNodes[index].nodeType == '3') {
            template += el.childNodes[index].textContent;
        }

        // 节点
        else if (el.childNodes[index].nodeType == '1') {

            // 图片
            if (el.childNodes[index].nodeName == 'IMG') {

                var imgUrl = el.childNodes[index].getAttribute("src");
                var keyValue = encodeURIComponent("@@@@" + imgUrl + "@@@@");
                imgUrlWill[keyValue] = imgUrl;

                var styleTemplate = getStyleTemplate(el.childNodes[index], imgUrlWill);
                template += "<img src='" + keyValue + "' style='" + styleTemplate + "'/>";

            } else {
                template += elToTemplate(el.childNodes[index]);
            }
        }

    }

    template += "</" + tagName + ">";
    return template;
};

export default function (el) {
    imgUrlWill = {};
    var template = elToTemplate(el);

    return new Promise(function (resolve, reject) {
        var promises = [];

        for (var key in imgUrlWill) {
            (function (key) {
                promises.push(new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.onload = function () {

                        var canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;

                        var context = canvas.getContext('2d');
                        context.drawImage(img, 0, 0);

                        var base64 = canvas.toDataURL();
                        while (template.match(key)) {
                            template = template.replace(key, base64);
                        }

                        resolve();
                    };
                    img.src = imgUrlWill[key];
                }));
            })(key);
        }

        Promise.all(promises).then(function () {
            resolve(template);
        });
    });
};