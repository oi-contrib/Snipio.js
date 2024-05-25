import ToolType from "./tool"

export default function (options: {

    /**
     * 启动后是否需要先让用户截图
     * 
     * 1、h5 页面截图方式
     * 
     * 2、system 系统截图方式
     * 
     * 3、none 不截图
     * 
     * 4、html2canvas
     */
    snipping?: "h5" | "system" | "none" | "html2canvas",

    /**
     * 截图方式选择html2canvas方式时需要，值为html2canvas
     */
    html2canvas?: any,

    /**
     * 自定义工具，可选
     * 
     * （通过此，你可以自定义一些工具方法）
     */
    tool?: Array<ToolType>

}): void