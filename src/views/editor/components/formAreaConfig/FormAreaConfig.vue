<!--
 * @Description: 表单区域配置
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/12 09:47
 * @Path: src/views/projectManagement/editor/components/FormAreaConfig.vue
-->
<template>
  <div class="form-area-config">
    <div class="title-box">表单位置</div>
    <div class="content">
      <div class="row-box">
        <ElFormItem label="宽度">
          <ElInput v-model="formAreaConfig.position.width"
                   type="number" :step="10"
                   size="small" style="width: 120px;">
            <template #append>
              <ElSelect v-model="formAreaConfig.position.widthUnit"
                        size="small" style="width: 50px;">
                <ElOption label="px" value="px"></ElOption>
                <ElOption label="%" value="%"></ElOption>
              </ElSelect>
            </template>
          </ElInput>
        </ElFormItem>
        <ElFormItem label="高度">
          <ElInput v-model="formAreaConfig.position.height"
                   type="number" :step="10"
                   size="small" style="width: 120px;">
            <template #append>
              <ElSelect v-model="formAreaConfig.position.heightUnit"
                        size="small" style="width: 50px;">
                <ElOption label="px" value="px"></ElOption>
                <ElOption label="%" value="%"></ElOption>
              </ElSelect>
            </template>
          </ElInput>
        </ElFormItem>
      </div>
      <div class="row-box">
        <ElFormItem label="水平">
          <ElSelect v-model="formAreaConfig.position.horizontal"
                    size="small" style="width: 120px;">
            <ElOption v-for="item in formPosition.flexOption"
                      :key="item.value"
                      :label="item.label" :value="item.value"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="垂直">
          <ElSelect v-model="formAreaConfig.position.vertical"
                    size="small" style="width: 120px;">
            <ElOption v-for="item in formPosition.flexOption"
                      :key="item.value"
                      :label="item.label" :value="item.value"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="right">
          <ElInput v-model="formAreaConfig.position.right"
                   type="number" :step="10"
                   size="small" style="width: 120px;">
            <template #append>
              <ElSelect v-model="formAreaConfig.position.rightUnit"
                        size="small" style="width: 50px;">
                <ElOption label="px" value="px"></ElOption>
                <ElOption label="%" value="%"></ElOption>
              </ElSelect>
            </template>
          </ElInput>
        </ElFormItem>
        <ElFormItem label="top">
          <ElInput v-model="formAreaConfig.position.top"
                   type="number" :step="10"
                   size="small" style="width: 120px;">
            <template #append>
              <ElSelect v-model="formAreaConfig.position.topUnit"
                        size="small" style="width: 50px;">
                <ElOption label="px" value="px"></ElOption>
                <ElOption label="%" value="%"></ElOption>
              </ElSelect>
            </template>
          </ElInput>
        </ElFormItem>
      </div>
      <div class="row-box">
        <ElFormItem label="背景颜色">
          <ColorPicker v-model="formAreaConfig.background"></ColorPicker>
        </ElFormItem>
      </div>
    </div>
    <div class="title-box">表单标题</div>
    <div class="content">
      <ElFormItem label="文字">
        <ElInput v-model="formAreaConfig.title.content"
                 size="small" type="textarea"
                 placeholder="支持html字符串"></ElInput>
      </ElFormItem>
      <ElFormItem label="样式">
        <ElInput v-model="formAreaConfig.title.style"
                 size="small" type="textarea"
                 placeholder="例: width: 200px; text-align: center; color: #3b3f41"></ElInput>
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject} from "vue";
import {formPosition} from "@/constant/loginEdit";
import ColorPicker from "@/components/ColorPicker.vue";

const appInfo = inject("appInfo")! as any

const formAreaConfig = computed({
  get: ()=>appInfo.formAreaConfig,
  set(val){
    appInfo.formAreaConfig = val
  }
})

</script>

<script lang="ts">
export default {
  name: 'FormAreaConfig',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.form-area-config{
  .title-box{
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
}
.row-box{
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  .el-form-item{
    margin-right: 30px;
  }
}
</style>