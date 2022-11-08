<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/10/11 09:19
 * @Path: src/views/projectManagement/editor/index.vue.vue
-->
<template>
  <div class="project-edit">
    <div class="header-box">
      <div class="title">项目编辑</div>
      <div>
        <ElButton type="info" @click="previewClick" size="small">预览</ElButton>
        <ElButton type="primary" @click="readConfig" size="small">读取</ElButton>
        <ElButton type="primary" @click="saveConfig" size="small">保存</ElButton>
      </div>
    </div>
    <div class="title-lv2">全局配置</div>
    <div class="form-box">
      <GlobalConfig></GlobalConfig>
    </div>
    <div class="title-lv2">
      <div>登陆方式</div>
      <AddLoginTypeInput @addClick="addLoginTypeClick"></AddLoginTypeInput>
    </div>
    <div class="form-box">
      <LoginFormList></LoginFormList>
    </div>
    <div class="title-lv2">表单区域配置</div>
    <div class="form-box">
      <FormAreaConfig></FormAreaConfig>
    </div>
    <div class="title-lv2">标题/文字 配置</div>
    <div class="form-box">
      <TitleConfig></TitleConfig>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalConfig from "./components/globalConfig/GlobalConfig.vue";
import AddLoginTypeInput from "./components/loginType/AddLoginTypeInput.vue";
import LoginFormList from "./components/loginType/LoginType.vue";
import FormAreaConfig from "./components/formAreaConfig/FormAreaConfig.vue";
import TitleConfig from "./components/titleConfig/TitleConfig.vue";
import {provide, reactive} from "vue";
import {
  getFormCompTemp,
  usePreviewDataBroadcast,
  useLoginType,
  getSubmitButConfigTemp
} from "@/views/editor/useProjectEdit";
import {formPosition} from "@/constant/loginEdit";
import {FileTransform} from "@/utils/fileTransform";
import {CheckType} from "@/utils/checkType";

const appInfo = reactive({
  app: {
    // 项目名称
    projectName: '',
    // 项目id
    projectId: '',
    // 项目logo
    projectLogo: '',
    // 描述
    describe: '',
    // 重定向地址
    redirect: '',
    // 背景图片
    bgImg:{
      src: "/images/bgImg.png",
      position: [],
    }
  },
  // 表单区域配置
  formAreaConfig:{
    // 表单位置&大小
    position: {
      horizontal: formPosition.defaultHorizontal,
      vertical: formPosition.defaultVertical,
      top: '',
      topUnit: 'px',
      right: '',
      rightUnit: 'px',
      width: '350',
      widthUnit: 'px',
      height: '',
      heightUnit: 'px'
    },
    // 背景颜色
    background: '#ffffff',
    // 登陆区域标题
    title:{
      content: '统一认证登陆',
      style: ''
    },
    // 是否开启注册页
    showRegister: false
  },
  // 登陆方式表单列表
  formTypeList: [{
    // 登陆方式类型名称
    typeName: '用户名密码登陆',
    showLabel: false,
    labelWidth: 60,
    labelPosition: "left",
    formCompList: [
      getFormCompTemp()
    ],
    // 提交按钮配置
    submitButConfig: getSubmitButConfigTemp()
  }],
  // 登陆页面上的标题
  titleList: [{
    content: '',
    style: ''
  }],
})

// 向子组件提供配置
provide('appInfo', appInfo)
// 向预览页面提供配置
usePreviewDataBroadcast(appInfo)

const {
  addLoginType,
} = useLoginType(appInfo.formTypeList)

function previewClick() {
  window.open(origin + import.meta.env.VITE_BASE + '/preview')
}

function saveConfig(){
  const blob = FileTransform.stream2Blob(JSON.stringify(appInfo),"text/plain;charset=utf-8")
  const file = FileTransform.blob2File(blob,'config.json')
  FileTransform.file2DataUrl(file).then(dataUrl=>{
    FileTransform.downloadFile(dataUrl as string,'config.json')
  })
}

function readConfig() {
  FileTransform.selectFile({accept: '.json'},(result)=>{
    const data = JSON.parse(result as string)
    appInfo.app = data.app
    appInfo.formAreaConfig = data.formAreaConfig
    appInfo.formTypeList = data.formTypeList
    appInfo.titleList = data.titleList
  })
}

function addLoginTypeClick(typeName: string){
  addLoginType(typeName)
}

</script>

<script lang="ts">
export default {
  name: 'index',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.project-edit{
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: auto;
  .header-box{
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    background: #ffffff;
    border-bottom: 1px solid #e3e3e3;
    box-sizing: border-box;
    z-index: 10;
  }
}
.title{
  font-size: 18px;
  font-weight: 500;
}
.title-lv2{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  color: #505050;
  background: #f5f5f5;
}

.form-box{
  margin: 0 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>