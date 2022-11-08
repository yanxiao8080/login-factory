<!--
 * @Description: 统一认证登陆页
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/11 09:10
 * @Path: src/views/preview/index.vue.vue
-->
<template>
  <div class="login-auth">
    <div class="form-area">
      <div class="form-title" :style="formAreaConfig.title?.style" v-html="formAreaConfig.title?.content"></div>
      <div class="form-box" v-if="formTypeList.length===1">
        <FormComp :formTypeItem="formTypeList[0]||{}"></FormComp>
      </div>
      <el-tabs v-else-if="formTypeList.length>1" class="tabs">
        <el-tab-pane v-for="(item,index) in formTypeList" :label="item.typeName">
          <FormComp :formTypeItem="formTypeList[index]||{}"></FormComp>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--  标题列表  -->
    <div v-for="title in titleList" :style="title.style" v-html="title.content"></div>
  </div>
</template>

<script setup lang="ts">
import FormComp from "./components/FormComp.vue";
import {useAppInfo, useLoginStyle} from "@/views/preview/usePreview";
const {
  app,
  formAreaConfig,
  formTypeList,
  titleList
} = useAppInfo()

const {
  bgImg,
  position,
  positionPadding,
  positionTop,
  positionRight,
  positionWidth,
  positionHeight,
  formAreaBg
} = useLoginStyle(app, formAreaConfig)

</script>

<script lang="ts">
export default {
  name: 'index',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.login-auth{
  position: relative;
  display: flex;
  justify-content: v-bind('position.horizontal');
  align-items: v-bind('position.vertical');
  padding: v-bind(positionPadding);
  width: 100%;
  height: 100%;
  background-image: v-bind(bgImg);
  background-position: 50% 50%;
  background-size: cover;
  box-sizing: border-box;
}

.form-area{
  position: absolute;
  top: v-bind(positionTop);
  right: v-bind(positionRight);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px;
  width: v-bind(positionWidth);
  height: v-bind(positionHeight);
  background: v-bind(formAreaBg);
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 100;

  .form-title{
    width: 100%;
    font-size: 28px;
  }
  .tabs{
    width: 100%;
  }
}

.form-box{
  margin-top: 20px;
  width: 100%;
}
</style>