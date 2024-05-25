import getStyle from '../xhtml/getStyle';

export default function (el, imgUrlWill) {
    var styleTemplate = "";
    var elStyles = getStyle(el);

    for (var index = 0; index < elStyles.length; index++) {
        var keyName = elStyles[index];
        var keyValue = elStyles[keyName];

        // 背景图片
        if (/^background\-image/.test(keyName)) {
            if (/^url\(\".+\"\)$/.test(keyValue)) {
                var imgUrl = keyValue.replace(/^url\(\"/, "").replace(/\"\)$/, "");
                keyValue = encodeURIComponent("@@@@" + imgUrl + "@@@@");
                imgUrlWill[keyValue] = imgUrl;
                styleTemplate += keyName + ":url(" + keyValue + ");";
            }
        } else {
            styleTemplate += keyName + ":" + keyValue + ";";
        }

    }

    return styleTemplate;
};