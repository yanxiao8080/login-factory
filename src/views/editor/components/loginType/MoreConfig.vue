<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/17 14:51
 * @Path: src/views/projectManagement/editor/components/loginType/MoreConfig.vue
-->
<template>
  <ElDialog v-model="show" title="更多配置">
    <div class="row-box">
      <ElFormItem label="校验正则" style="width: 100%;">
        <ElInput v-model="formCompItemData.rules.reg" size="small"></ElInput>
      </ElFormItem>
      <ElFormItem label="校验失败提示" style="width: 100%;">
        <ElInput v-model="formCompItemData.rules.message" size="small"></ElInput>
      </ElFormItem>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  formCompItemData: {
    type: Object,
    default: ()=>({})
  }
})

const emit = defineEmits(['update:modelValue'])

const show = computed({
  get:()=>props.modelValue,
  set:(val)=>emit('update:modelValue', val)
})

</script>

<script lang="ts">
export default {
  name: 'MoreConfig',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>

.row-box{
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
  .el-form-item{
    margin-right: 30px;
  }
}
</style>