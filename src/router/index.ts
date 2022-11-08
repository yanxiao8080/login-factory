/*
 * @Description: 路由
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/15 17:00
 * @LastEditors: yanxiaos
 * @Path: src/router/index.vue.ts
 */
import {createRouter, createWebHashHistory} from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import Layout from "@/views/layout/index.vue";

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  name: "/",
  redirect: '/src'
},{
  path: '/preview',
  name: "Preview",
  component: ()=>import('@/views/preview/index.vue'),
  meta:{
    // document.title 标题
    title: '预览',
    code: 'H1001'
  }
}]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
})

// 页面跳转进度条
NProgress.configure({
  template: `<div class="bar" role="bar"><div class="peg"></div></div>`
});
router.beforeEach((to,from,next)=>{
  NProgress.start()
  // 等待动画结束再跳转页面
  setTimeout(next,100)
})

router.afterEach((to)=>{
  NProgress.done()
})

export default router
