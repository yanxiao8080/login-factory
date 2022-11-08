/*
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/11 11:45
 * @Path: src/views/projectManagement/editor/usePreview.ts
 */
import {onBeforeUnmount, watch} from "vue";
import {MsgType} from "@/enum/loginAuthEnum";
import {colorPicker} from "@/constant/loginEdit";

interface Option{
    label: string,
    value: string|number|boolean
}

export interface FormCompTemp{
    type: string,
    name: string,
    label: string,
    placeholder: string,
    required: boolean,
    rules: {
        reg: string,
        message: string
    },
    options: Option[]
}

export function getFormCompTemp(formItemIdx: number=1): FormCompTemp {
    return {
        // 组件类型,默认输入框
        type: 'user',
        // 字段名（唯一）
        name: 'key' + formItemIdx,
        // 标签
        label: '',
        // 占位描述
        placeholder: '',
        // 是否必填
        required: true,
        // 是否校验
        rules: {
            reg: '',
            message: '',
        },
        options: []
    }
}

export function getSubmitButConfigTemp(){
    return {
        text: '登陆',
        // 文字颜色
        textColor: colorPicker.defaultTextColor,
        // 圆角
        round: true,
        // 背景颜色
        background: colorPicker.defaultBgColor,
        // 开启渐变
        openLinearGradient: false,
        // 渐变角度
        linearGradient: 90,
        // 渐变颜色
        linearGradientColors: [colorPicker.defaultBgColor]
    }
}

export function useLoginType(formTypeList: any){

    function addLoginType(typeName: string){
        formTypeList.push({
            // 登陆方式类型名称
            typeName: typeName,
            // 登陆接口
            loginApi: '',
            showLabel: false,
            labelWidth: 60,
            labelPosition: "left",
            formCompList: [
                getFormCompTemp()
            ],
            // 提交按钮配置
            submitButConfig: getSubmitButConfigTemp()
        })
    }

    return{
        addLoginType
    }

}

export function usePreviewDataBroadcast(appInfo: any){

    const channel = new BroadcastChannel('preview');

    watch(appInfo,()=>{
        channel.postMessage(JSON.stringify({
            type: MsgType.UPDATE_DATA,
            data: appInfo
        }))
    },{deep:true})

    channel.addEventListener('message',function (event){
        const data = JSON.parse(event.data)
        if(data.type===MsgType.LOGIN_CREATE) {
            channel.postMessage(JSON.stringify({
                type: MsgType.REPLY_MOUNTED,
                data: appInfo
            }))
        }
    })

    onBeforeUnmount(()=>channel.close())
}