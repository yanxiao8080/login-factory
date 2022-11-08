/*
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/14 14:04
 * @Path: src/views/src/components/useFormComp.ts
 */
import {inject, InjectionKey, onBeforeUnmount, onMounted, provide, reactive, ref} from "vue";
import {Publisher} from "../utils/publisher";

const formDataInject: InjectionKey<Record<string, string|number|boolean>> = Symbol()
const verifyResInject: InjectionKey<Record<string, string>> = Symbol()
const formVerifyInject: InjectionKey<Publisher<()=>void>> = Symbol()

export function useRegisterFormComp(){

    // 表单数据
    const formData: Record<string, string|number|boolean> = {}
    // 向子组件提供formData, 供子组件修改
    provide(formDataInject, formData)

    // 校验结果
    const verifyRes: Record<string, string> = reactive({})
    // 向子组件提供校验结果, 供子组件修改
    provide(verifyResInject, verifyRes)

    // 主动触发子组件校验
    const formVerify = new Publisher<()=>void>()
    provide(formVerifyInject, formVerify)
    function verify(){
        // 通知子组件进行校验
        formVerify.emit()
        // 返回校验结果
        return Object.keys(verifyRes).length>0?
            {res: false,verifyRes}: {res: true}
    }

    return{
        formData,
        verifyRes,
        verify
    }
}


export function useRegisterFormItemComp(props: any){

    const formItemChange = inject(formDataInject, {})
    const formVerifyResChange = inject(verifyResInject, {})
    const formVerify = inject(formVerifyInject)

    const modelValue = ref('')

    // 组件创建完成时初始化formData和校验结果
    onMounted(()=>{
        formItemChange[props.formCompAttrs.name] = modelValue.value
    })
    // 组件销毁前删除formData和校验结果中的字段
    onBeforeUnmount(()=>{
        delete formItemChange[props.formCompAttrs.name]
        delete formVerifyResChange[props.formCompAttrs.name]
    })
    // 组件数据变化时，更新formData和校验结果
    function onChange(val: string){
        formItemChange[props.formCompAttrs.name] = val
        // 校验
        setVerifyRes(val)
    }

    formVerify && formVerify.on(()=>setVerifyRes(modelValue.value))

    function setVerifyRes(val: string){
        const verifyRes = verify(val)
        if(verifyRes.res){
            delete formVerifyResChange[props.formCompAttrs.name]
        }else{
            formVerifyResChange[props.formCompAttrs.name] = verifyRes.msg
        }
    }

    function verify(value: string){
        if(props.formCompAttrs.required && !value) {
            return {
                res: false,
                msg: props.formCompAttrs.label+'不能为空'
            }
        }
        const rules = props.formCompAttrs.rules
        if(rules.reg && !(new RegExp(rules.reg).test(value))) {
            return {
                res: false,
                msg: rules.message || props.formCompAttrs.label+'格式错误'
            }
        }
        return {
            res: true
        }
    }

    return {
        modelValue,
        onChange
    }
}