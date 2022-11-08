<!--
 * @Description: layout
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/19 17:26
 * @LastEditors: yanxiao
 * @Path: src/views/layout/microservice-governance.vue
-->
<template>
  <div class='layout'>
    <el-container style="height: 100vh">
      <el-container style="height: calc(100vh);">
        <el-main class="main">
          <router-view v-slot="{ Component }">
            <!-- 动画样式定义在@/styles/animation.scss -->
            <transition name="fade" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

</script>
<style lang='scss' scoped>
.main{
  padding: 10px;
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
