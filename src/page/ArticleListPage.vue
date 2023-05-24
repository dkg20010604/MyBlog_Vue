<template>
    <div style="padding: 20px;">
        <el-switch active-text="正在浏览回收站" inactive-text="正在浏览常规" v-model="ViewRubbish" :active-value="true"
            :inactive-value="false" @change="" style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66 ">
        </el-switch>

        <el-table :data="ListInfo?.data" border stripe>
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="changeTime" label="修改时间" width="180" />
            <el-table-column prop="collection" label="收藏数" width="180" />
            <el-table-column prop="likeNumber" label="喜欢数" width="180" />
            <el-table-column prop="status" label="状态">
                <template #default="statu">
                    <el-tag dark style="margin-left: 10px;" :type="statu.row.status == 0 ? 'success' : ''" effect="dark">
                        {{ statu.row.status == 0 ? '已发布' : '草稿' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="tags" label="标签" width="180">
                <template #default="tag">
                    <el-tag style="margin-left: 10px;" v-for="t in tag.row.tags" type="success" effect="dark">
                        {{ (t as TagDTO).tagName }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="info">
                    <el-button-group v-if="!ViewRubbish">
                        <el-button type="success" size="default" @click="router.push({
                            name: 'release',
                            params: {
                                id: info.row.id
                            }
                        })">编辑</el-button>
                        <el-button type="danger" size="default" @click="DeleteArticle(info.row.id)">删除</el-button>
                    </el-button-group>
                    <el-button-group v-else>
                        <el-button type="primary" size="default" @click="reSet(info.row.id)">恢复</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total=ListInfo.total :page-size=ListInfo.pageSize
            v-model:current-page=pageindex @current-change=PageChange />

    </div>
</template>
    
<script lang='ts' setup>
import type { PageDataOfArticleDTO, TagDTO } from '@/controller';
import { ArticleClient } from '@/controller'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const pageindex = ref<number>(route.params.pageIndex as unknown as number)
const ListInfo = ref<PageDataOfArticleDTO>({
    pageindex: 0,
    pageSize: 0,
    total: 0,
    data: undefined
})
const article = new ArticleClient()
const ViewRubbish = ref(false)
onMounted(async () => {
    await GetPersonData(route.params.pageIndex as unknown as number);
})
const GetPersonData = async (pageindex: number) => {
    ListInfo.value.data = [];
    const res = await article.getPersonalArticle(pageindex)
    if (res.code == 200) {
        ListInfo.value = res.data
    }
}
const GetRubish = async (pageindex: number) => {
    ListInfo.value.data = [];
    const res = await article.getPersonalArticleInRubbish(pageindex)
    if (res.code == 200) {
        ListInfo.value = res.data
    }
}
const DeleteArticle = async (id: number) => {
    const res = await article.delect(id)
    if (res.data) {
        ElMessage.success('文章将在七天后删除')
    }
    else {
        ElMessage.error('删除失败')
    }
}
const PageChange = async (index: number) => {
    router.push({
        name: 'articleview',
        params: {
            pageIndex: index.toString(),
            userid: route.params.userid
        }
    })
    pageindex.value = index
    if (ViewRubbish.value) {
        await GetRubish(index)
    }
    else {
        await GetPersonData(index)
    }
}
watch(() => ViewRubbish.value,
    async (value, old) => {
        router.push({
            name: 'articleview',
            params: {
                pageIndex: 1,
                userid: route.params.userid
            }
        })
        if (value) {
            await GetRubish(1)
        }
        else {
            await GetPersonData(1)
        }
    })
const reSet = async (id: number) => {
    await article.reRelease(id).then(res => {
        if (res.data) {
            ElMessage.success("恢复成功")
        }
    })
}
</script>
    
<style scoped></style>
    