<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/17 09:18
 * @Path: src/views/projectManagement/editor/components/SubmitButConfig.vue
-->
<template>
  <div class="content">
    <div class="row-box">
      <ElFormItem label="按钮文字">
        <ElInput v-model="formTypeItem.submitButConfig.text" size="small"></ElInput>
      </ElFormItem>
      <ElFormItem label="字体颜色">
        <ColorPicker v-model="formTypeItem.submitButConfig.textColor"></ColorPicker>
      </ElFormItem>
      <ElFormItem label="圆角">
        <ElSwitch v-model="formTypeItem.submitButConfig.round" size="small"></ElSwitch>
      </ElFormItem>
    </div>
    <div class="row-box">
      <ElFormItem label="使用渐变">
        <ElSwitch v-model="formTypeItem.submitButConfig.openLinearGradient" size="small"></ElSwitch>
      </ElFormItem>
      <ElFormItem v-show="!openLinearGradient" label="背景色">
        <ColorPicker v-model="formTypeItem.submitButConfig.background"></ColorPicker>
      </ElFormItem>
      <ElFormItem v-show="openLinearGradient" label="渐变角度">
        <ElInputNumber v-model="formTypeItem.submitButConfig.linearGradient"
                       :step="10" size="small"></ElInputNumber>
      </ElFormItem>
      <ElFormItem v-show="openLinearGradient" label="背景色">
        <ColorPicker v-for="(color,index) in linearGradientColors"
                     :key="index" :defaultColor="color"
                     class="color-picker"
                     @colorChange="(val)=>onColorChange(val, index)"></ColorPicker>
        <ElButton :icon="Minus" circle size="small" :disabled="linearGradientColors.length===1" @click="delLinearGradientColor"></ElButton>
        <ElButton :icon="Plus" circle size="small" @click="addLinearGradientColor"></ElButton>
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Minus,Plus} from "@element-plus/icons-vue";
import ColorPicker from "@/components/ColorPicker.vue";
import {computed} from "vue";
import {colorPicker} from "@/constant/loginEdit";

const props = defineProps({
  formTypeItem:{
    type: Object,
    default: ()=>({})
  }
})

const emit = defineEmits(['update:formTypeItem'])

const formTypeItem = computed({
  get:()=>props.formTypeItem,
  set:(val)=>emit('update:formTypeItem',val)
})

const openLinearGradient = computed(()=>formTypeItem.value.submitButConfig.openLinearGradient)
const linearGradientColors = computed({
  get:()=>formTypeItem.value.submitButConfig.linearGradientColors,
  set:(val)=>{
    formTypeItem.value.submitButConfig.linearGradientColors = val
  }
})

function onColorChange(val: string, index: number){
  linearGradientColors.value[index] = val
}

function addLinearGradientColor(){
  linearGradientColors.value.push(colorPicker.defaultBgColor)
}

function delLinearGradientColor(){
  linearGradientColors.value.pop()
}

</script>

<script lang="ts">
export default {
  name: 'SubmitButConfig',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.row-box{
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  .el-form-item{
    margin-right: 30px;
  }
}
.color-picker{
  margin-right: 10px;
}
</style>