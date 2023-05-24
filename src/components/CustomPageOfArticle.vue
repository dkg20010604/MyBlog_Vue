<template>
    <el-card style="margin-top: 16px;cursor: pointer;" shadow="hover" :body-style="{ padding: '20px' }" v-for="item in listInfo?.data"
        @click="router.push({
            name: 'viewpage',
            params: {
                id: item.id
            }
        })">
        <p style="font-size: 20px;">{{ item.title }}</p>
        <div>
            <span>点击数：{{ item.count }}</span>
            <span style="margin-left: 16px;">喜欢数：{{ item.likeNumber }}</span>
            <span style="margin-left: 16px;">收藏数：{{ item.collection }}</span>
        </div>
    </el-card>
    <el-pagination style="margin-top: 16px;" @current-change="pagechange" v-model:currentPage="pageindex" :page-size="20"
        layout="prev, pager, next" :total="Total" background :pager-count="7">
    </el-pagination>
</template>
    
<script lang='ts' setup>
import { ArticleClient, type PageDataOfArticleDTO } from '@/controller'
import { useRouter } from 'vue-router'
const ID = defineProps<{ userId: number }>()
const article = new ArticleClient()
const listInfo = ref<PageDataOfArticleDTO>()
const pageindex = ref(1)
const Total = ref(0)
const router = useRouter()
onBeforeMount(async () => {
    await article.getPageAricleById(1, ID.userId).then(res => {
        if (res.code == 200) {
            listInfo.value = res.data
            pageindex.value = listInfo.value.pageindex
            Total.value = res.data.total
        }
        else {
            ElMessage.error(res.message)
        }
    })
})
const pagechange = async (val: number) => {
    await article.getPageAricleById(val, ID.userId).then(res => {
        if (res.code == 200) {
            listInfo.value = res.data
            pageindex.value = listInfo.value.pageindex
            Total.value = res.data.total
        }
        else {
            ElMessage.error(res.message)
        }
    })
}
</script>
    
<style scoped></style>