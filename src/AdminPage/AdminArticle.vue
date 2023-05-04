<template>
    <div style="padding: 20px;">
        <el-select v-model="articleStatus" @change="GetData(1, articleStatus)">
            <el-option v-for="item in type" :key="item.key" :label="item.name" :value="item.key">
            </el-option>
        </el-select>

        <el-table :data="ListInfo?.data" border stripe style="margin-top: 16px;">
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
                    <el-button-group>
                        <el-button type="primary" size="default" @click="changeArticleStatus(info.row.id, 0)">恢复</el-button>
                        <el-button type="danger" size="default" @click="changeArticleStatus(info.row.id, 2)">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total=ListInfo.total :page-size=ListInfo.pageSize
            v-model:current-page="(pageindex as number)" @current-change="changePage" />

    </div>
</template>
    
<script lang='ts' setup>
import { LoginClient, AdminClient, type PageDataOfArticleDTO, type TagDTO, } from '@/controller';
import { useRoute, useRouter } from 'vue-router'
const log = new LoginClient()
const admin = new AdminClient()
const route = useRoute()
const router = useRouter()
const pageindex = ref(route.params.pageIndex as unknown as number)
const ListInfo = ref<PageDataOfArticleDTO>({
    pageindex: 0,
    pageSize: 0,
    total: 0,
    data: undefined
})
const articleStatus = ref(3)
interface Usertype {
    key: number,
    name: string
}
const type = reactive<Usertype[]>([
    {
        key: 3,
        name: '全部'
    },
    {
        key: 0,
        name: '正常'
    },
    {
        key: 1,
        name: '待删除'
    },
    {
        key: 2,
        name: '已删除'
    },

])
onMounted(async () => {
    await GetData(route.params.pageIndex as unknown as number, route.params.articleStatus as unknown as number);
    articleStatus.value = route.params.articleStatus as unknown as number
})
const GetData = async (pageindex: number, status: number) => {
    await admin.getArticleByType(pageindex, status).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
            ListInfo.value = res.data
            router.push({
                name: 'adminarticle',
                params: {
                    pageIndex: pageindex,
                    articleStatus: status
                }
            })
            articleStatus.value = status
        }
        else {
            ElMessage.error(res.message)
        }
    })
}
onBeforeMount(async () => {
    await log.admin().then(res => {
        if (!res) {
            router.push('/');
            ElMessage.warning('非法访问')
        }
    })
})
const changePage = async (val: number) => {
    await GetData(val, articleStatus.value)
}
const changeArticleStatus = async (id: number, status: number) => {
    await admin.setArticleStatus(id, status).then(res => {
        if (res.code == 200)
            ElMessage.success(res.message)
        else
            ElMessage.error(res.message)
    })

}
</script>
    
<style scoped></style>
    