<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }" v-for="item in listInfo?.data">
        <p style="font-size: 20px;">{{ item.commentText }}</p>
        <span>评论文章：<a @click="router.push({
            name: 'viewpage',
            params: {
                id: item.articleId
            }
        })">{{ item.articleTitle }}</a></span>
    </el-card>
</template>
    
<script lang='ts' setup>
import { CommentClient, type PageDataOfCommentCheck } from "@/controller"
import { useRouter } from "vue-router"
const Prop = defineProps<{ userId: number }>()
const comment = new CommentClient()
const listInfo = ref<PageDataOfCommentCheck>()
const router = useRouter()
onBeforeMount(() => {
    comment.getCommentByUserId(Prop.userId, 1).then(res => {
        listInfo.value = res.data
    })
})
</script>
    
<style scoped></style>
    