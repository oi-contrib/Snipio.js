import Canvas from "vislite/lib/Canvas/index.umd";
import setStyle from "./core/xhtml/setStyle";

export default function (base64, width, height, tool) {
    var bodyEl = document.getElementsByTagName("body")[0];
    var editEl = document.createElement("div");
    var viewEl = document.createElement("div");

    bodyEl.appendChild(editEl);
    editEl.setAttribute("snipio", "edit");

    setStyle(editEl, {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999999,
        backgroundColor: "rgb(0 0 0 / 67%)"
    });

    editEl.appendChild(viewEl);

    setStyle(viewEl, {
        position: "absolute",
        left: "calc(50vw - " + width * 0.5 + "px)",
        top: "calc(50vh - " + height * 0.5 + "px)",
        width: width + "px",
        height: height + "px",
        backgroundColor: "white"
    });

    var painter = new Canvas(viewEl);

    // 画布初始化绘制
    if (base64) painter.drawImage(base64, 0, 0, width, height);

    // 编辑工具箱
    var toolboxEl = document.createElement("div");
    bodyEl.appendChild(toolboxEl);
    toolboxEl.setAttribute("snipio", "toolbox");

    setStyle(toolboxEl, {
        position: "absolute",
        right: "calc(50vw - " + width * 0.5 + "px)",
        bottom: "calc(50vh - " + (height * 0.5 + 30) + "px)",
        height: "30px",
        backgroundColor: "white",
        boxShadow: "0 0 5px 3px #607D8B",
        zIndex: "9999999"
    });

    // 为工具箱提供的实例对象
    var instance = {

        // 截图
        base64:base64,

        // 画布节点
        view: viewEl,

        // 画布尺寸
        width: width,
        height: height,

        // 画笔
        painter: painter,

        // 记录历史记录
        history: [],

        // 关闭
        close: function () {
            bodyEl.removeChild(editEl);
            bodyEl.removeChild(toolboxEl);
        }
    };

    // 注册的事件
    var bind = {};

    viewEl.addEventListener("mousedown", function (event) {
        if (bind.mouseDown) bind.mouseDown.call(instance, event);
    });

    viewEl.addEventListener("mousemove", function (event) {
        if (bind.mouseMove) bind.mouseMove.call(instance, event);
    });

    viewEl.addEventListener("mouseup", function (event) {
        if (bind.mouseUp) bind.mouseUp.call(instance, event);
    });

    // 点击后需要维持点击状态的
    var holdEls = [];

    for (var index = 0; index < tool.length; index++) {
        (function (index) {
            var toolEl = document.createElement("div");
            toolboxEl.appendChild(toolEl);

            if (tool[index].hold) holdEls.push(toolEl);

            toolboxEl.setAttribute("snipio", "tool");
            setStyle(toolEl, {
                display: "inline-block",
                lineHeight: "24px",
                outline: "1px solid gray",
                backgroundColor: "#2196F3",
                color: "white",
                margin: "3px",
                fontWeight: "200",
                fontSize: "14px",
                padding: "0 5px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                userSelect: "none"
            });

            toolEl.innerText = tool[index].label;
            toolEl.addEventListener("click", function () {
                var result = tool[index].on.call(instance) || {};

                if (tool[index].hold) {
                    for (var i = 0; i < holdEls.length; i++)  holdEls[i].style.backgroundColor = "#2196F3";
                    toolEl.style.backgroundColor = "#076ec1";

                    // 更新事件
                    bind = result.bind || {};
                }
            });
        })(index);
    }

};