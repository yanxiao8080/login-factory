<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/17 11:22
 * @Path: src/views/projectManagement/editor/components/loginType/FormCompList.vue
-->
<template>
  <ElTable :data="formTypeItem.formCompList" size="small">
    <ElTableColumn label="表单类型" width="120">
      <template #default="scope">
        <ElSelect v-model="formTypeItem.formCompList[scope.$index].type"
                  size="small" @change="(type)=>formTypeChange(type,scope.row)">
          <ElOption v-for="(item, index) in formCompList"
                    :key="index"
                    :label="item.label"
                    :value="item.type"></ElOption>
        </ElSelect>
      </template>
    </ElTableColumn>
    <ElTableColumn label="字段名(唯一)*" width="180">
      <template #default="scope">
        <ElInput v-model="formTypeItem.formCompList[scope.$index].name" size="small"></ElInput>
      </template>
    </ElTableColumn>
    <ElTableColumn label="标签" width="180">
      <template #default="scope">
        <ElInput v-model="formTypeItem.formCompList[scope.$index].label" size="small"></ElInput>
      </template>
    </ElTableColumn>
    <ElTableColumn label="占位描述">
      <template #default="scope">
        <ElInput v-model="formTypeItem.formCompList[scope.$index].placeholder" size="small"></ElInput>
      </template>
    </ElTableColumn>
    <ElTableColumn label="是否必填" width="100">
      <template #default="scope">
        <el-switch v-model="formTypeItem.formCompList[scope.$index].required" size="small" />
      </template>
    </ElTableColumn>
    <ElTableColumn label="操作" width="120">
      <template #default="scope">
        <el-icon class="icon-box" @click="()=>openMoreConfig(scope.row)"><More /></el-icon>
        <el-icon class="icon-box" @click="()=>sortUp(scope.$index)"><Top /></el-icon>
        <el-icon class="icon-box" @click="()=>sortDown(scope.$index)"><Bottom /></el-icon>
        <el-icon class="icon-box delete" @click="()=>delFormItem(scope.$index)"><Delete /></el-icon>
      </template>
    </ElTableColumn>
    <template #append>
      <el-button type="primary" style="width: 100%;border-radius: 0;border: none;"
                 @click="()=>addFormItem()">
        <el-icon style="margin-right: 5px"><Plus /></el-icon>新增表单项
      </el-button>
    </template>
  </ElTable>
  <MoreConfig v-model="showMoreConfig" :formCompItemData="formCompItemData"></MoreConfig>
</template>

<script setup lang="ts">
import MoreConfig from "./MoreConfig.vue";
import {Top,Bottom,Delete,Plus,More} from "@element-plus/icons-vue";
import {getFormCompTemp} from "@/views/editor/useProjectEdit";
import {inject, ref} from "vue";
import {formCompList} from "@/views/preview/usePreview";

const props = defineProps({
  formTypeItem: {
    type: Object,
    default: ()=>({})
  },
  formTypeIdx:{
    type: Number,
    default: 0
  }
})

const appInfo = inject('appInfo')! as any

const showMoreConfig = ref(false)
// 点击更多的表格行数据
const formCompItemData = ref({})
// 打开更多配置窗口
function openMoreConfig(rowData: any){
  showMoreConfig.value = !showMoreConfig.value
  formCompItemData.value = rowData
}
// 表单类型变化
function formTypeChange(){

}

let formItemCount = 1
// 新增表单项
function addFormItem(){
  const formCompList = appInfo.formTypeList[props.formTypeIdx].formCompList
  formCompList.push(getFormCompTemp(++formItemCount))
}

// 删除表单项
function delFormItem(index: number){
  appInfo.formTypeList[props.formTypeIdx].formCompList.splice(index,1)
}

// 表单项向上排序
function sortUp(index: number) {
  // 表单项在第一位，不做处理
  if(index===0) return
  const formCompList = appInfo.formTypeList[props.formTypeIdx].formCompList
  formCompList.splice(index-1,0,formCompList.splice(index,1)[0])
}

// 表单项向下排序
function sortDown(index: number) {
  const formCompList = appInfo.formTypeList[props.formTypeIdx].formCompList
  // 表单项在最后一位，不做处理
  if(index===formCompList.length-1) return
  formCompList.splice(index+1,0,formCompList.splice(index,1)[0])
}

</script>

<script lang="ts">
export default {
  name: 'FormCompList',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>

.icon-box{
  margin-right: 3px;
  width: 20px;
  height: 20px;
  color: #ffffff;
  background: #c7c7c7;
  border: 1px solid rgba(199, 199, 199, 0.56);
  border-radius: 3px;
  cursor: pointer;
  &:active{
    background: rgba(199, 199, 199, 0.56);
  }
}
.delete{
  background: #f56c6c;
  border: 1px solid #f56c6c;
  &:active{
    background: rgba(245, 108, 108, 0.8);
  }
}

</style>