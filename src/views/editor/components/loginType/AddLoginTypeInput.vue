<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/11 11:39
 * @Path: src/views/projectManagement/editor/components/AddLoginTypeInput.vue
-->
<template>
  <ElInput class="add-login-type-input"
           v-model="typeName"
           placeholder="登陆方式名称"
           size="small">
    <template #prepend>
      <ElButton type="primary" @click="addType" size="small">新增</ElButton>
    </template>
  </ElInput>
</template>

<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(['addClick'])

const typeName = ref()

function addType(){
  if(!typeName.value) return
  emit('addClick', typeName.value)
  typeName.value = ""
}
</script>

<script lang="ts">
export default {
  name: 'AddLoginTypeInput',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.add-login-type-input{
  width: 200px;
}
</style>