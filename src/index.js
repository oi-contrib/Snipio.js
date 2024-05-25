import snipping from "./snipping";
import edit from "./edit";
import { mergeArray } from "./core/tool/array";
import _tool from "./toolbox/index";

export default function (options) {
    options = options || {};

    var tool = mergeArray(_tool, options.tool || []);

    // 页面截图方式
    if (options.snipping == "h5") {
        snipping("h5", function (base64, width, height) {
            edit(base64, width, height, tool);
        });
    }

    // html2canvas截图方式
    else if (options.snipping == "html2canvas") {
        snipping("html2canvas", function (base64, width, height) {
            edit(base64, width, height, tool);
        }, options.html2canvas);
    }

    // 系统截图方式
    else if (options.snipping == "system") {
        snipping("system", function (base64, width, height) {
            edit(base64, width, height, tool);
        });
    }

    // 不截图
    else {
        edit(null, window.innerWidth - 160, window.innerHeight - 160, tool);
    }
};