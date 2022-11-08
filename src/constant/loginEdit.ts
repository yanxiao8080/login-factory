/*
 * @Description: 登陆页编辑模块 常量定义
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/13 10:57
 * @Path: src/constant/loginEdit.ts
 */

export const colorPicker = {
    predefineColors: [
        '#000000',
        '#FFFFFF',
        '#FF1900',
        '#F47365',
        '#FFB243',
        '#FFE623',
        '#6EFF2A',
        '#1BC7B1',
        '#409eff',
        '#2E81FF',
        '#5D61FF',
        '#FF89CF',
        '#FC3CAD',
        '#BF3DCE',
        '#8E00A7',
        'rgba(0,0,0,0)'
    ],
    defaultBgColor: 'rgba(64, 158, 255, 1)',
    defaultTextColor: 'rgba(255, 255, 255, 1)'
}


export const formPosition = {
    flexOption: [{
        label: 'start',
        value: 'flex-start'
    },{
        label: 'center',
        value: 'center'
    },{
        label: 'end',
        value: 'flex-end'
    }],
    // 水平默认值
    defaultHorizontal: 'flex-end',
    // 垂直默认值
    defaultVertical: 'center'
}