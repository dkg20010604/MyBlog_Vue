<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu" default-active="person"
    text-color="#fff" @open="handleOpen" @close="handleClose" @select="menuSelect">
    <el-menu-item index="person">
      <home theme="outline" size="24" fill="#ffffff" :strokeWidth="3" strokeLinejoin="bevel" />
      <span style="width: 100%;align-items: center;display: flex;">首页</span>
    </el-menu-item>
    <el-sub-menu index="articleGroup">
      <template #title>
        <Notes theme="outline" size="24" fill="#ffffff" :strokeWidth="3" strokeLinejoin="bevel" />
        <span>文章管理</span>
      </template>
      <el-menu-item index="release">
        <TopicDiscussion theme="outline" size="24" fill="#ffffff" :strokeWidth="3" strokeLinejoin="bevel" />
        <span>发布文章</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="searchartticle" key="">
      <search theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
      <span>搜索文章</span>
    </el-menu-item>
    <el-menu-item index="setting" key="">
      <config theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
      <span>个人设置</span>
    </el-menu-item>

  </el-menu>
</template>
<script lang="ts" setup>
import { TopicDiscussion, Home, Notes, Search, Config } from '@icon-park/vue-next';
import { onBeforeMount } from 'vue';
import { MenuIndex } from '@/stores/MenuStore'
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
}

const menuSelect = (index: string) => {
  MenuIndex().SetMenu(index)
}

type menuitem = {
  index: String,
  key: string,
  title: string
}[]


const menulist = [{
  index: 'article',
  title: '文章管理',
  list: [{
    index: 'addarticle',
    key: 'article-add',
    title: '发布文章'
  }] as menuitem
}]
onBeforeMount(() => {

})
</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<style scoped>
.el-menu {
  width: 100%;
  height: 100%;
}

span {
  margin-left: 10px;
}
</style>