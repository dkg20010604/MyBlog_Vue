<template>
  <div style="padding: 20px;">
    <el-radio-group v-model="t" @change="GetComment(route.params.pageIndex as unknown as number, t)">
      <el-radio :label="0">正常</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">未通过</el-radio>
    </el-radio-group>


    <el-table style="width: 100%;" :data="ListInfo?.data" border stripe>
      <el-table-column prop="articleTitle" label="来源" width="180" />
      <el-table-column prop="userNickName" label="用户昵称" width="180" />
      <el-table-column prop="userHeaderImg" label="头像" width="180">
        <template #default="img">
          <el-image :src="'http://10.40.77.188:32770/api/Picture/path/' + img.row.userHeaderImg" fit="fill"
            :lazy="true"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="commentText" label="内容" width="180" />
      <el-table-column prop="responseCommentText" label="回复"></el-table-column>
      <el-table-column prop="releaseTime" label="发表时间" width="180"></el-table-column>
      <el-table-column label="操作">
        <template #default="id">
          <el-button-group v-if="t == 0">
            <el-button type="danger" size="default" @click="setcomment(id.row.commend, false)">拒绝通过</el-button>
          </el-button-group>
          <el-button-group v-if="t == 1">
            <el-button type="success" size="default" @click="setcomment(id.row.commend, true)">通过</el-button>
            <el-button type="danger" size="default" @click="setcomment(id.row.commend, false)">拒绝</el-button>
          </el-button-group>
          <el-button-group v-if="t == 2">
            <el-button type="success" size="default" @click="setcomment(id.row.commend, true)">通过</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total=ListInfo?.total :page-size=ListInfo?.pageSize
      :current-page="ListInfo?.pageindex" @current-change="PageChange" />
  </div>
</template>
  
<script lang='ts' setup>
import { CommentClient, PictureClient, type PageDataOfCommentCheck } from '@/controller'
import { Info } from '@icon-park/vue-next'
import { List } from 'echarts'
import { useRoute, useRouter } from 'vue-router'
const comment = new CommentClient()
const ListInfo = ref<PageDataOfCommentCheck>()
const pic = new PictureClient()
const t = ref(0)
const route = useRoute()
const router = useRouter()
const GetComment = async (index: number, type: number) => {
  const res = await comment.getUnPass(index, type)
  if (res.code == 200) {
    ListInfo.value = res.data
    router.push({
      name: 'commentview',
      params: {
        pageIndex: 1,
        type: t.value
      }
    })
  }
}
onMounted(async () => {
  await GetComment(route.params.pageIndex as unknown as number, route.params.type as unknown as number)
})
const PageChange = async (index: number) => {
  await GetComment(index, route.params.type as unknown as number)
  router.push({
    name: 'commentview',
    params: {
      pageIndex: index.toString(),
      type: route.params.type
    }
  })

}
const setcomment = async (id: number, ispass: boolean) => {
  await comment.passComment(id, ispass).then(res => {
    if (res.code == 200) {
      ElMessage.success(res.message)
    }
    else {
      ElMessage.error(res.message)
    }
  }).catch(err=>{
    ElMessage.error("网络错误")
  })
}
</script>
  
<style scoped></style>
  