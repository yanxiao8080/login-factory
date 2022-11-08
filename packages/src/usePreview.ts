 /*
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/12 14:18
 * @Path: src/views/src/usePreview.ts
 */
import {Component, computed, reactive, Ref, ref, watch} from "vue";
import {ElInput} from "element-plus";
import UserInput from "./components/UserInput.vue";
import PasswordInput from "./components/PasswordInput.vue";

interface FormComp{
    type: string,
    label: string,
    component: Component
}

export const formCompList: FormComp[] = [
    {
        type: 'input',
        label: '输入框',
        component: ElInput
    },{
        type: 'user',
        label: '用户名',
        component: UserInput
    },{
        type: 'password',
        label: '密码',
        component: PasswordInput
    }
]

export function useLoginStyle(app:any, formAreaConfig:any){

    const bgImg = computed(()=>app.value?.bgImg?.src? `url('${app.value.bgImg.src}')`:``)

    const position = computed(()=>formAreaConfig.value.position||{})

    // 当表单区域又对其且right为空是
    const positionPadding = computed(()=>{
        let paddingVertical = 0
        let paddingHorizontal = 0
        if(position.value.top===''&&position.value.vertical!=='center'){
            paddingVertical = 5
        }

        if(position.value.right===''&&position.value.horizontal!=='center'){
            paddingHorizontal = 10
        }

        return `${paddingVertical}% ${paddingHorizontal}%`
    })

    const positionTop = computed(()=>position.value.top + position.value.topUnit)

    const positionRight = computed(()=>position.value.right + position.value.rightUnit)

    const positionWidth = computed(()=>position.value.width + position.value.widthUnit)

    const positionHeight = computed(()=>position.value.height + position.value.heightUnit)

    return{
        bgImg,
        position,
        positionPadding,
        positionTop,
        positionRight,
        positionWidth,
        positionHeight,
        formAreaBg: computed(()=>formAreaConfig.value.background)
    }
}

export function useSubmitConfigStyle(props: any){

    const submitButConfig = computed(()=>props.formTypeItem.submitButConfig||{})

    // 按钮样式
    const butStyle = reactive({
        color: computed(()=>submitButConfig.value.textColor),
        background: '',
    })

    // 监听按钮样式变化，重新计算按钮样式
    watch(submitButConfig,(newVal)=>{
        if(newVal.openLinearGradient){
            butStyle.background = `linear-gradient(${newVal.linearGradient}deg, ${newVal.linearGradientColors.join(',')})`
        }else{
            butStyle.background = newVal.background
        }
    },{deep: true,immediate: true})

    return {
        submitButConfig,
        butStyle,
    }

}