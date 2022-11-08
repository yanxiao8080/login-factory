<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/12 15:45
 * @Path: src/views/preview/components/FormComp.vue
-->
<template>
  <ElForm :label-width="props.formTypeItem.showLabel? props.formTypeItem.labelWidth:0"
          :label-position="formTypeItem.labelPosition">
    <ElFormItem v-for="(item,index) in props.formTypeItem?.formCompList"
                :key="index"
                :label="props.formTypeItem.showLabel?item.label:''"
                :error="verifyRes[item.name]||''">
      <component :is="getCompByType(item.type)"
                 :placeholder="item.placeholder||`请输入${item.label}`"
                 :formCompAttrs="item"></component>
    </ElFormItem>

  </ElForm>
  <div class="but-box">
    <ElButton :style="butStyle"
              :round="submitButConfig.round"
              plain
              @click="submit">{{submitButConfig.text}}</ElButton>
  </div>
</template>

<script setup lang="tsx">
import {formCompList, useSubmitConfigStyle} from "@/views/preview/usePreview";
import type {Component} from "vue";
import {useRegisterFormComp} from "@/views/preview/useFormComp";
import {useRoute} from "vue-router";

const props = defineProps({
  formTypeItem: {
    type: Object,
    default: ()=>({
      labelPosition: 'left'
    })
  }
})

const {
  submitButConfig,
  butStyle,
} = useSubmitConfigStyle(props)

function getCompByType(type: string): Component{
  const compInfo = formCompList.filter(item=>item.type===type)[0]
  return compInfo? compInfo.component:
      <div style="padding: 0 20px;width:100%;color: #f56c6c;font-size:10px;border: 1px solid red;border-radius: 4px">
        组件暂不支持
      </div>
}

const {
  formData,
  verifyRes,
  verify
} = useRegisterFormComp()

const route = useRoute()
const clientId = route.query.client_id as string|undefined
const redirectUri = route.query.redirect_uri as string|undefined

console.log('clientId',clientId,redirectUri)

function submit(){
  const verifyRes = verify()
  console.log('submit verifyRes',verifyRes)
  if(!verifyRes.res) return
  console.log('submit formData',formData)
}

</script>

<script lang="tsx">
export default {
  name: 'FormComp',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.el-form{
  width: 100%;
}

.but-box{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .el-button{
    width: 100%;
    border: none;
    &:active{
      opacity: 0.8;
    }
  }
}
</style>