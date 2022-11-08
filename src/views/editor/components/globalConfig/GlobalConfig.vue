<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/11 20:59
 * @Path: src/views/projectManagement/editor/components/GlobalConfig.vue
-->
<template>
  <ElForm label-width="150px" label-position="left" size="small">
    <ElFormItem label="项目名称：">
      <ElInput v-model="appInfo.app.projectName"></ElInput>
    </ElFormItem>
    <ElFormItem label="logo：">
      <ElInput v-model="appInfo.app.projectLogo"></ElInput>
    </ElFormItem>
    <ElFormItem label="描述：">
      <ElInput v-model="appInfo.app.describe"></ElInput>
    </ElFormItem>
    <ElFormItem label="重定向地址：">
      <ElInput v-model="appInfo.app.redirect"></ElInput>
    </ElFormItem>
    <ElFormItem label="背景图片">
      <ElInput v-model="appInfo.app.bgImg.src"></ElInput>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">

import {inject} from "vue";

const appInfo = inject("appInfo")!

</script>

<script lang="ts">
export default {
  name: 'GlobalConfig',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>

</style>