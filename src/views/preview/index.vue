<!--
 * @Description: 统一认证登陆页
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/11 09:10
 * @Path: src/views/src/index.vue.vue
-->
<template>
  <LFRenderVue3 :config="config" @formSubmit="formSubmit"></LFRenderVue3>
</template>

<script setup lang="ts">
import LFRenderVue3 from "../../../packages/index";
import config from "./config.json";

function formSubmit(tabsActive: string, verifyRes:{res:boolean,verifyRes: Record<string, string>}, formData: Record<string, string>) {
  console.log('tabsActive',tabsActive)
  console.log('tabsActive, verifyRes, formData',tabsActive, verifyRes, formData)
}

</script>

<script lang="ts">
export default {
  name: 'index',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>

</style>