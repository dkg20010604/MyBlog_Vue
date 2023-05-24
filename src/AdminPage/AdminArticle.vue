<template>
    <div style="padding: 20px;">
        <el-select v-model="articleStatus" value-key="id" @change="GetData(1, articleStatus?.id as number)">
            <el-option v-for="item in type" :key="item.id" :label="item.label" :value="item">
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
const pageindex = ref((route.params.pageIndex as unknown as number) + 1 - 1)
const ListInfo = ref<PageDataOfArticleDTO>({
    pageindex: 0,
    pageSize: 0,
    total: 0,
    data: undefined
})
const articleStatus = ref<Usertype>()
interface Usertype {
    id: number,
    label: string
}
const type = reactive<Usertype[]>([
    {
        id: 3,
        label: '全部'
    },
    {
        id: 0,
        label: '正常'
    },
    {
        id: 1,
        label: '待删除'
    },
    {
        id: 2,
        label: '已删除'
    },

])
onMounted(async () => {
    articleStatus.value = type.find(a => a.id == route.params.articleStatus as unknown as number)
    await GetData(route.params.pageIndex as unknown as number, route.params.articleStatus as unknown as number);
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
            articleStatus.value = type.find(a => a.id == status)
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
    await GetData(val, articleStatus.value?.id as number)
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
    