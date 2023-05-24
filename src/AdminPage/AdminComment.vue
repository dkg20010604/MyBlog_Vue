<template>
    <div style="padding: 16px;">
        <div style="display: flex;padding: 16px;">
            <label>评论状态：</label>
            <el-select v-model="Commentstatus" value-key="id" @change="changeselect">
                <el-option v-for="item in status" :key="item.id" :label="item.label" :value="item" />
            </el-select>
        </div>

        <el-table :data="InfoList?.data" border stripe>
            <el-table-column type="index" width="50" />
            <el-table-column prop="articleTitle" label="文章标题" />
            <el-table-column prop="userNickName" label="昵称" />
            <el-table-column prop="commentText" label="内容" />
            <el-table-column prop="userImg" label="头像">
                <template #default="img">
                    <el-avatar icon="el-icon-user-solid" size="large"
                        :src="'http://127.0.0.1:32770/api/Picture/path/' + img.row.userHeaderImg" fit="fill"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="responseCommentText" label="回复" />
            <el-table-column prop="releaseTime" label="发表时间">
                <template #default="time">
                    {{ (time.row as CommentCheck).releaseTime.toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template #default="info">
                    <el-tag effect="dark" size="large" hit v-if="((info.row.articleId as number) % 10) == 0"
                        color="#00C9A7">正常</el-tag>
                    <el-tag effect="dark" size="large" hit v-if="((info.row.articleId as number) % 10) == 1"
                        color="#D621EA">审核中</el-tag>
                    <el-tag effect="dark" size="large" hit v-if="((info.row.articleId as number) % 10) == 2"
                        color="#A90000">未通过</el-tag>
                    <el-tag effect="dark" size="large" hit v-if="((info.row.articleId as number) % 10) == 3"
                        color="#845EC2">不可见</el-tag>
                </template>

            </el-table-column>

            <el-table-column label="操作">
                <template #default="button">
                    <el-button-group>
                        <el-popconfirm title="删除后无法恢复，并且会一并删除其回复，是否继续?" @confirm="delectComment(button.row.commend)">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="success" size="default" @click="router.push({
                            name: 'viewpage',
                            params: {
                                id: Math.floor((button.row.articleId as number) / 10)
                            }
                        })">查看文章</el-button>
                        <div v-if="((button.row.articleId as number) % 10) != 3">
                            <el-popconfirm title="(除管理员外任何人无法查看)是否继续?" @confirm="serCommentStatus(button.row.commend, 3)">
                                <template #reference>
                                    <el-button>设为不可见</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                        <div v-if="((button.row.articleId as number) % 10) == 3">
                            <el-popconfirm title="(将由博主进行审核)是否继续?" @confirm="serCommentStatus(button.row.commend, 1)">
                                <template #reference>
                                    <el-button>设为审核中</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="ChangePageIndex" v-model:currentPage="InfoList.pageindex"
            :page-size="InfoList.pageSize" layout="prev, pager, next" :total="InfoList.total" background :pager-count="7">
        </el-pagination>
    </div>
</template>
    
<script lang='ts' setup>
import { LoginClient, AdminClient, type PageDataOfCommentCheck, type CommentCheck } from '@/controller'
import { useRoute, useRouter } from 'vue-router'
const admin = new AdminClient()
const log = new LoginClient()
const router = useRouter()
const route = useRoute()
interface Usertype {
    id: number,
    label: string
}
const status = reactive<Usertype[]>([
    {
        id: 4,
        label: '所有'
    },
    {
        id: 0,
        label: '正常'
    },
    {
        id: 1,
        label: '审核中'
    },
    {
        id: 2,
        label: '未通过'
    },
    {
        id: 3,
        label: '不可见'
    }
])
const Commentstatus = ref<Usertype>()
const paegIndex = ref(1)
onBeforeMount(async () => {
    await log.admin().then(res => {
        if (!res) {
            router.push('/');
            ElMessage.warning('非法访问')
        }
    })
})
const InfoList = ref(reactive<PageDataOfCommentCheck>({
    pageindex: 0,
    pageSize: 0,
    total: 0,
    data: []
}))
const changeselect = async () => {
    console.log(Commentstatus.value);
    await admin.getCommentByStatus(1, Commentstatus.value?.id as number).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
            InfoList.value = res.data
            router.push({
                name: 'admincomment',
                params: {
                    pageIndex: 1,
                    status: Commentstatus.value?.id
                }
            })
        }
    })
}
onMounted(async () => {
    
    
    Commentstatus.value = status.find(a => a.id == route.params.status as unknown as number) as Usertype;
    paegIndex.value = route.params.pageIndex as unknown as number
    await admin.getCommentByStatus(paegIndex.value, Commentstatus.value?.id as number).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
            InfoList.value = res.data
        }
    })
})
const ChangePageIndex = async (val: number) => {
    await admin.getCommentByStatus(val, Commentstatus.value?.id as number).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
            InfoList.value = res.data
            router.push({
                name: 'admincomment',
                params: {
                    pageIndex: val,
                    status: Commentstatus.value?.id
                }
            })
        }
    })
}
const delectComment = async (id: number) => {
    await admin.delectCommentById(id).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
        }
        else
            ElMessage.error(res.message)
    })
}
const serCommentStatus = async (id: number, status: number) => {
    await admin.changeCommentStatus(id, status).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
        }
        else
            ElMessage.error(res.message)
    })
}
</script>
    
<style scoped></style>
    
    