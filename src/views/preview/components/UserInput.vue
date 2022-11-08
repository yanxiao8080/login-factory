<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/12 15:48
 * @Path: src/views/preview/components/UserInput.vue
-->
<template>
  <ElInput v-model="modelValue"
           v-bind="$attrs"
           @change="onChange">
    <template #prefix>
      <el-icon><User /></el-icon>
    </template>
  </ElInput>
</template>

<script setup lang="ts">
import {User} from "@element-plus/icons-vue";
import {useRegisterFormItemComp} from "@/views/preview/useFormComp";

const props = defineProps({
  formCompAttrs:{
    type: Object,
    default: ()=>({})
  }
})

const {
  modelValue,
  onChange
} = useRegisterFormItemComp(props)

</script>

<script lang="ts">
export default {
  name: 'UserInput',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>

</style>