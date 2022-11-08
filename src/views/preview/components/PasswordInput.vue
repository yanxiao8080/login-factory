<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/12 15:55
 * @Path: src/views/preview/components/PasswordInput.vue
-->
<template>
  <ElInput v-model="modelValue"
           v-bind="$attrs"
           :type="showPassword?'':'password'"
           :prefix-icon="Lock"
           :suffix-icon="Eyes"
           @change="onChange">
  </ElInput>
</template>

<script setup lang="tsx">
import {Lock,View,Hide} from "@element-plus/icons-vue";
import {computed, ref} from "vue";
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


const showPassword = ref(false)

const Eyes = computed(()=>showPassword.value?HideComp:ViewComp)

function onEyesClick() {
  showPassword.value = !showPassword.value
}
const ViewComp = <div onClick={()=>onEyesClick()}><View style="cursor: pointer;"/></div>

const HideComp = <div onClick={()=>onEyesClick()}><Hide style="cursor: pointer;"/></div>


</script>

<script lang="tsx">
export default {
  name: 'PasswordInput',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>

</style>