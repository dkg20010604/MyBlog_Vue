<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu" default-active="person"
    text-color="#fff" @select="menuSelect">
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
      <el-menu-item index="articlecollection">
        <TopicDiscussion theme="outline" size="24" fill="#ffffff" :strokeWidth="3" strokeLinejoin="bevel" />
        <span>我的收藏</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="searchartticle" key="">
      <doc-search-two theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
      <span>搜索文章</span>
    </el-menu-item>
    <el-menu-item index="searchuser" key="">
      <search theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
      <span>查找用户</span>
    </el-menu-item>
    <el-menu-item index="picture">
      <picture-album theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
      <span>相册管理</span>
    </el-menu-item>
    <el-menu-item index="chat" key="">
      <message-one theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
      <span>聊一聊</span>
    </el-menu-item>
    <el-menu-item index="setting" key="">
      <config theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
      <span>个人设置</span>
    </el-menu-item>
    <el-sub-menu index="AdminGroup" v-if="showHangFire">
      <template #title>
        <Notes theme="outline" size="24" fill="#ffffff" :strokeWidth="3" strokeLinejoin="bevel" />
        <span>管理功能</span>
      </template>
      <el-menu-item v-if="showHangFire" index="adminuser" key="">
        <config theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item v-if="showHangFire" index="adminarticle" key="">
        <config theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item v-if="showHangFire" index="admincomment" key="">
        <config theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
        <span>评论管理</span>
      </el-menu-item>
      <el-menu-item v-if="showHangFire" index="hangfire" key="">
        <config theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
        <span>后台任务</span>
      </el-menu-item>
    </el-sub-menu>


  </el-menu>
</template>
<script lang="ts" setup>
import { DocSearchTwo, TopicDiscussion, Home, Notes, Search, Config, PictureAlbum, MessageOne } from '@icon-park/vue-next';
import { onBeforeMount } from 'vue';
import { MenuIndex } from '@/stores/MenuStore'
import { LoginClient } from '@/controller'
const showHangFire = ref(false)
const login = new LoginClient()
const menuSelect = (index: string) => {
  MenuIndex().SetMenu(index)
}


onBeforeMount(async () => {
  await login.admin().then(res => [
    showHangFire.value = res
  ])
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