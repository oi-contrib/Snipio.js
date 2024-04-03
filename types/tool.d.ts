interface bindFun {
    (event: Event): void
}

interface onFun {
    (): {

        /**
         * 事件
         * 
         * （只有hold=true此配置有效）
         */
        bind?: {

            /**
             * 鼠标按下
             */
            mouseDown?: bindFun

            /**
             * 鼠标移动
             */
            mouseMove?: bindFun

            /**
             * 鼠标松开
             */
            mouseUp?: bindFun
        }
    } | null
}

export default interface ToolType {

    /**
     * 按钮名称
     */
    label: string

    /**
     * 当前工具实例方法
     */
    on: onFun

    /**
     * 点击是否需要持久点中状态
     */
    hold: boolean
}