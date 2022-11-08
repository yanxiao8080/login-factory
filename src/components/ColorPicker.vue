<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/13 11:49
 * @Path: src/components/ColorPicker.vue
-->
<template>
  <div class="color-picker">
    <el-popover :width="218" trigger="click" :hide-after="0"
                popper-class="popper-hidden-padding">
      <template #reference>
        <div class="color-box">
          <div class="color-inner">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path></svg>
          </div>
        </div>
      </template>
      <ColorPickerPanel theme="light"
                        :color="color"
                        :colors-default="colorPicker.predefineColors"
                        @changeColor="onColorChange"></ColorPickerPanel>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import ColorPickerPanel from "@caohenghu/vue-colorpicker";
import {ref} from "vue";
import {colorPicker} from "@/constant/loginEdit";

interface colorInfo {
	rgba: {
    a: number;
    r: number;
    b: number;
    g: number;
  };
	hsv: {
    s: number;
    v: number;
    h: number;
  };
	hex: string;
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  defaultColor:{
    type: String,
    default: ''
  }
})

const color = ref(props.modelValue||props.defaultColor)

const emit = defineEmits(['update:modelValue', 'colorChange'])


function onColorChange(colorInfo: colorInfo){
  const {r,g,b,a} = colorInfo.rgba
  const rgba = `rgba(${r},${g},${b},${a})`
  color.value = rgba
  emit('update:modelValue', rgba)
  emit('colorChange', rgba, colorInfo)
}
</script>

<script lang="ts">
export default {
  name: 'ColorPicker',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.color-box{
  padding: 4px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  .color-inner{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #ffffff;
    background: v-bind(color);
    border: 1px solid #909399;
    border-radius: 2px;
    box-sizing: border-box;
    svg{
      width: 10px;
      height: 10px;
    }
  }
}
</style>