<!--
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/11/7 15:26
 * @Path: src/views/projectManagement/editor/components/titleConfig/TitleConfig.vue
-->
<template>
  <div class="form-area-config">
    <div class="content" v-for="(titleItem,index) in titleList">
      <ElFormItem label="文字">
        <ElInput v-model="titleItem.content"
                 size="small" type="textarea"
                 placeholder="支持html字符串"></ElInput>
      </ElFormItem>
      <ElFormItem label="样式">
        <ElInput v-model="titleItem.style"
                 size="small" type="textarea"
                 placeholder="例: width: 200px; text-align: center; color: #3b3f41"></ElInput>
      </ElFormItem>
      <el-icon class="icon-box delete" @click="()=>delTitleItem(index)"><Delete /></el-icon>
    </div>
    <el-button type="primary" style="width: 100%;margin-bottom: 20px" @click="addTitle">
      <el-icon style="margin-right: 5px"><Plus /></el-icon>新增标题
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {computed, inject} from "vue";
import {Delete, Plus} from "@element-plus/icons-vue";

const appInfo = inject("appInfo")! as any

const titleList = computed({
  get: ()=>appInfo.titleList,
  set(val){
    appInfo.titleList = val
  }
})

function addTitle(){
  titleList.value.push({
    content: '',
    style: ''
  })
}

function delTitleItem(index: number){
  titleList.value.splice(index, 1)
}

</script>

<script lang="ts">
export default {
  name: 'TitleConfig',
  inheritAttrs: false
}
</script>

<style lang='scss' scoped>
.form-area-config{
  .title-box{
    padding: 10px;
    font-size: 14px;
    color: #505050;
    border: 1px solid #e3e3e3;
    border-radius: 5px 5px 0 0;
  }
  .content{
    position: relative;
    margin-bottom: 10px;
    padding: 10px 10px 15px;
    border: 1px solid #e3e3e3;
    border-radius:5px;
    overflow: hidden;
    box-sizing: border-box;
  }
}
.icon-box{
  position: absolute;
  right: 8px;
  bottom: 5px;
  margin-right: 3px;
  width: 20px;
  height: 20px;
  color: #ffffff;
  background: #c7c7c7;
  border: 1px solid rgba(199, 199, 199, 0.56);
  border-radius: 3px;
  cursor: pointer;
  &:active{
    background: rgba(199, 199, 199, 0.56);
  }
}

.delete{
  background: #f56c6c;
  border: 1px solid #f56c6c;
  &:active{
    background: rgba(245, 108, 108, 0.8);
  }
}
</style>