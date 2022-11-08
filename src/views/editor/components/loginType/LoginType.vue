<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/11 11:55
 * @Path: src/views/projectManagement/editor/components/LoginType.vue
-->
<template>
  <el-tabs v-model="tabActive">
    <el-tab-pane v-for="(formTypeItem,formTypeIdx) in appInfo.formTypeList"
                 :key="formTypeItem.typeName"
                 :label="formTypeItem.typeName"
                 :name="formTypeItem.typeName">
      <template #label>
        <div class="tabs-label">
          <div class="label">{{formTypeItem.typeName}}</div>
          <el-popconfirm title="确认删除这个登陆方式吗?" @confirm="()=>delLoginType(formTypeIdx)">
            <template  #reference>
              <el-icon v-show="appInfo.formTypeList.length>1&&tabActive===formTypeItem.typeName"
                       class="icon" @click.stop><Close /></el-icon>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <div>
        <div>
          <div class="label-config">
            <ElFormItem label="显示标签">
              <ElSwitch v-model="formTypeItem.showLabel" size="small"></ElSwitch>
            </ElFormItem>
            <ElFormItem label="标签宽度">
              <ElInputNumber v-model="formTypeItem.labelWidth"
                             :min="0" :step="10"
                             :disabled="!formTypeItem.showLabel" size="small"></ElInputNumber>
            </ElFormItem>
            <ElFormItem label="标签位置">
              <ElSelect v-model="formTypeItem.labelPosition" :disabled="!formTypeItem.showLabel" size="small">
                <ElOption label="left" value="left"></ElOption>
                <ElOption label="right" value="right"></ElOption>
                <ElOption label="top" value="top"></ElOption>
              </ElSelect>
            </ElFormItem>
          </div>
        </div>
        <div class="form-item">
          <FormCompList :formTypeItem="formTypeItem" :formTypeIdx="Number(formTypeIdx)"></FormCompList>
        </div>
        <div class="title-box">提交按钮</div>
        <SubmitButConfig :formTypeItem="formTypeItem"></SubmitButConfig>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import {Close} from "@element-plus/icons-vue";
import SubmitButConfig from "./SubmitButConfig.vue";
import FormCompList from "./FormCompList.vue";
import {inject, ref} from "vue";

const appInfo = inject('appInfo')! as any
// tab激活的卡片， 默认第一个
const tabActive = ref('')
tabActive.value = appInfo.formTypeList[0].typeName

// 删除登陆类型
function delLoginType(formTypeIdx: number){
  appInfo.formTypeList.splice(formTypeIdx, 1)
  tabActive.value = appInfo.formTypeList[0].typeName
}
</script>

<script lang="ts">
export default {
  name: 'LoginType',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.tabs-label{
  display: flex;
  align-items: center;
  .label{
    margin-right: 5px;
  }
}
.label-config{
  display: flex;
  .el-form-item{
    margin-right: 20px;
  }
}
.form-item{
  border: 1px solid #e3e3e3;
  overflow: hidden;
}

.title-box{
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  color: #505050;
  border: 1px solid #e3e3e3;
  border-radius: 5px 5px 0 0;
}
.content{
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e3e3e3;
  border-top: 0;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>