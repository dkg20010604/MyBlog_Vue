<template>
    <div>
        <el-table :data="collectionList?.data" border stripe highlight-current-row ref="InfoTable"
            @current-change="selectrow">
            <el-table-column type="index" width="50" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="" label="标签">
                <template #default="tag">
                    <el-tag style="margin-left: 16px;" v-for="item in tag.row.tags" type="success" effect="dark"
                        @close="">{{ (item as TagDTO).tagName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="set">
                    <div>
                        <el-button type="primary" size="default" @click="OutCollection(set.row.id)">取消收藏</el-button>

                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total=collectionList?.total :page-size=collectionList?.pageSize
            :current-page="collectionList?.pageindex" @current-change=PageChange />

    </div>
</template>
    
<script lang='ts' setup>
import type { ArticleDTO, PageDataOfArticleDTO, TagDTO } from '@/controller';
import { CollectionClient } from '@/controller'
import type { ElTable } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter()
const InfoTable = ref<InstanceType<typeof ElTable>>()
const collectclient = new CollectionClient()
const collectionList = ref<PageDataOfArticleDTO>()
const GetCollection = async (pageIndex: number) => {
    await collectclient.getCollection(pageIndex).then(res => {
        if (res.code == 200) {
            collectionList.value = res.data
        }
        else
            ElMessage.error('获取失败')
    }).catch(() => {
        ElMessage.error('网络错误')
    })
}
onMounted(async () => {
    await GetCollection(1)
})
const PageChange = async (val: number) => {
    await GetCollection(val)
}
const OutCollection = async (id: number) => {
    await collectclient.voidArt(id).then(res => {
        if (res.code == 200)
            ElMessage.success(res.message)
        else
            ElMessage.error(res.message)
    }).catch(() => {
        ElMessage.error('网络错误')
    })
}
const selectrow = (val: ArticleDTO) => {
    router.push({
        name: 'viewpage',
        params: {
            id: val.id
        }
    })

}
</script>
    
<style scoped></style>
    