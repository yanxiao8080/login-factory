github: https://github.com/yanxiao8080/login-factory.git

# 使用

## 在线编辑登陆页

https://yanxiao8080.github.io/login-factory/#/editor

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9acfee32e644b7f862b553b9794572b~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad54590a64bf4f789a6a1f0351732281~tplv-k3u1fbpfcp-watermark.image?)

1. 点击预览按钮打开预览页，修改配置时预览页实时更新
   点击保存按钮，将配置下载为config.json
   点击读取按钮，选择本地的config.json读取配置
2. 全局配置，配置项目名称、项目描述、背景图片。
3. 登陆方式，默认为用户名密码登陆，可点击右侧新增按钮，添加新的登陆方式。点击下方新增表单项，为这个登陆方式添加新的输入框
4. 编辑提交按钮样式颜色
5. 表单区域配置用来设置整个表单的位置，宽高、背景颜色和标题的文字、样式
6. 标题/文字配置用来设置登陆页上的一些文字，可以是登陆页上的大标题，也可以是底部的一些说明文字。为了高自定义，文字可以设置html字符串，样式直接写行内style字符串

## 导出配置

编辑完成后点击保存按钮导出config.json文件，将config.json文件放到自己的项目目录。

## 下载登陆页渲染组件

```
npm install login-factory-render-vue3 -s
```

目前只封装了vue3的渲染组件，如果需要其他组件参考源码自行封装

## 渲染出登陆页

``` 
<template>
  <LFRenderVue3 :config="config" 
                @formSubmit="formSubmit"></LFRenderVue3>
</template>
```
```
<script setup lang="ts">
// 导入渲染组件
import LFRenderVue3 from "login-factory-render-vue3";
// 导入配置
import config from "./config.json";

function formSubmit(type: string, verifyRes:{res:boolean,verifyRes: Record<string, string>}, formData: Record<string, string>) {
  console.log('tabsActive',tabsActive)
  console.log('tabsActive, verifyRes, formData',tabsActive, verifyRes, formData)
}
</script>
```

1. `:config` 登陆页配置
2. `@formSubmit` 表单提交事件

3. `formSubmit`回调参数

`type`：多个登陆方式会被放在不同的tabs中，type的值对应当前激活的tabs，等于提交表单的类型

`verifyRes.res`：表单校验结果，boolean值

`verifyRes.verifyRes`：导致表单校验失败的字段，key为字段name，value失败原因

`formData`：表单数据

