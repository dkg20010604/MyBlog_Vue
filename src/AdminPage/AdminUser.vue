<template>
    <div style="padding: 16px;">
        <div style="display: flex;padding: 16px;">
            <div>
                <label>用户身份：</label>
                <el-select v-model="userType" value-key="id" @change="changeselect">
                    <el-option v-for="item in type" :key="item.id" :label="item.label" :value="item"></el-option>
                </el-select>
            </div>
            <div style="margin-left: 48px;">
                <label>用户状态：</label>
                <el-select v-model="userStatus" value-key="id" @change="changeselect">
                    <el-option v-for="item in status" :key="item.id" :label="item.label" :value="item" />
                </el-select>
            </div>
        </div>

        <el-table :data="InfoList?.data" border stripe>
            <el-table-column type="index" width="50" />
            <el-table-column prop="account" label="邮箱" />
            <el-table-column prop="nickName" label="昵称" />
            <el-table-column prop="fans" label="粉丝数" />
            <el-table-column prop="userImg" label="头像">
                <template #default="img">
                    <el-avatar icon="el-icon-user-solid" size="large"
                        :src="'http://127.0.0.1:32770/api/Picture/path/' + img.row.userImg" fit="fill"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="" label="身份">
                <template #default="role">
                    <el-tag v-if="role.row.roleId == 1" color="#CD31E5" size="default" effect="dark">管理员</el-tag>
                    <el-tag v-if="role.row.roleId == 2" color="#0084FF" size="default" effect="dark">普通用户</el-tag>
                    <el-tag v-if="role.row.roleId == 3" color="B9B9B9" size="default" effect="dark">小黑屋</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="" label="状态">
                <template #default="role">
                    <el-tag v-if="role.row.status == 0" type="success" size="default" effect="dark">正常</el-tag>
                    <el-tag v-if="role.row.status == 1" type="warning" size="default" effect="dark">待注销</el-tag>
                    <el-tag v-if="role.row.status == 2" type="danger" size="default" effect="dark">已注销</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="button">
                    <el-button type="primary" size="default" @click="showuserdialog(button.row)">编辑</el-button>
                    <el-popconfirm title="软删除，是否继续?" @confirm="DelectUser(button.row.id)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="ChangePageIndex" v-model:currentPage="InfoList.pageindex"
            :page-size="InfoList.pageSize" layout="prev, pager, next" :total="InfoList.total" background :pager-count="7">
        </el-pagination>

    </div>
    <el-dialog v-model="showdialog" title="更改用户" width="30%">
        <div>
            <div style="display: flex;padding: 16px;">
                <div>
                    <label>用户身份：</label>
                    <el-select v-model="waiteChangeUser.roleId" value-key="id">
                        <el-option v-for="item in changeType" :key="item.id" :label="item.label" :value="item.id" />
                    </el-select>
                </div>
                <div style="margin-left: 48px;">
                    <label>用户状态：</label>
                    <el-select v-model="waiteChangeUser.status" value-key="id">
                        <el-option v-for="item in changeStatus" :key="item.id" :label="item.label" :value="item.id" />
                    </el-select>
                </div>
            </div>
            <div>
                <el-form :model="waiteChangeUser" ref="form" :rules="AdminFormRule" label-width="80px" :inline="false">
                    <el-form-item label="邮箱">
                        <el-input readonly v-model="waiteChangeUser.account"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="waiteChangeUser.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="waiteChangeUser.address"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-avatar icon="el-icon-user-solid" size="large" shape="circle"
                            :src="'http://127.0.0.1:32770/api/Picture/path/' + waiteChangeUser.userImg"
                            fit="fill"></el-avatar>

                    </el-form-item>

                    <el-form-item>
                        <el-popconfirm title="是否保存?" @confirm="SaveUser">
                            <template #reference>
                                <el-button type="primary">保存</el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm title="再次确认?" @confirm="ReSetPassword">
                            <template #reference>
                                <el-button type="info">重置密码</el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm title="是否清除?" @confirm="clearHeader">
                            <template #reference>
                                <el-button type="warning">清除头像</el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm title="是否继续?" @confirm="clearHeader">
                            <template #reference>
                                <el-button type="danger">打入小黑屋</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-dialog>
</template>
    
<script lang='ts' setup>
import { LoginClient, AdminClient, type PageDataOfAdminUserDTO, type UserDTO, type AdminUserDTO } from '@/controller'
import type { FormRules } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const admin = new AdminClient()
const log = new LoginClient()
const router = useRouter()
const route = useRoute()
const showdialog = ref(false)
interface Usertype {
    id: number,
    label: string
}
const AdminFormRule = reactive<FormRules>({

})
const type = reactive<Usertype[]>([
    {
        id: 0,
        label: '所有'
    },
    {
        id: 1,
        label: '管理员'
    },
    {
        id: 2,
        label: '普通用户'
    },
    {
        id: 3,
        label: '小黑屋'
    }
])
const status = reactive<Usertype[]>([
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
        label: '待注销'
    },
    {
        id: 2,
        label: '已注销'
    }
])
const changeType = reactive<Usertype[]>([
    {
        id: 1,
        label: '管理员'
    },
    {
        id: 2,
        label: '普通用户'
    },
    {
        id: 3,
        label: '小黑屋'
    }
])
const changeStatus = reactive<Usertype[]>([
    {
        id: 0,
        label: '正常'
    },
    {
        id: 2,
        label: '已注销'
    }
])
const userType = ref<Usertype>()
const userStatus = ref<Usertype>()
const paegIndex = ref(1)
onBeforeMount(async () => {
    await log.admin().then(res => {
        if (!res) {
            router.push('/');
            ElMessage.warning('非法访问')
        }
    })
})
const InfoList = ref(reactive<PageDataOfAdminUserDTO>({
    pageindex: 0,
    pageSize: 0,
    total: 0,
    data: []
}))
const changeselect = async () => {
    await admin.getUser(1, userType.value?.id as number, userStatus.value?.id as number).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
            InfoList.value = res.data
            router.push({
                name: 'adminuser',
                params: {
                    pageIndex: route.params.pageIndex as unknown as number,
                    userType: userType.value?.id,
                    userStatus: userStatus.value?.id
                }
            })
        }
    })
}
const DelectUser = async (id: number) => {
    await admin.deleteUser(id).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
        }
        else {
            ElMessage.error(res.message)
        }
    })
}
onMounted(async () => {
    userType.value = type.find(a => a.id == route.params.userType as unknown as number);
    userStatus.value = status.find(a => a.id == route.params.userStatus as unknown as number);
    console.log(userType.value);
    console.log(userStatus.value);
    paegIndex.value = route.params.pageIndex as unknown as number
    await admin.getUser(paegIndex.value, userType.value?.id as number, userStatus.value?.id as number).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
            InfoList.value = res.data
        }
        else {
            ElMessage.error(res.message)
        }
    })
})
const waiteChangeUser = ref<AdminUserDTO>({
    id: 0,
    account: '',
    nickName: '',
    inyro: undefined,
    fans: 0,
    userImg: '',
    address: '',
    roleId: 0,
    status: 0
})
const showuserdialog = async (user: UserDTO) => {
    await admin.getUserById(user.id as number).then(res => {
        if (res.code == 200) {
            waiteChangeUser.value = res.data
            showdialog.value = true
        }
    })
}
const ChangePageIndex = async (val: number) => {
    await admin.getUser(val, userType.value?.id as number, userStatus.value?.id as number).then(res => {
        if (res.code == 200) {
            ElMessage.success(res.message)
            InfoList.value = res.data
            router.push({
                name: 'adminuser',
                params: {
                    pageIndex: val,
                    userType: userType.value?.id,
                    userStatus: userStatus.value?.id
                }
            })
        }
    })
}
const SaveUser = async (e: MouseEvent) => {
    await admin.saveUser(waiteChangeUser.value).then(res => {
        if (res.code == 200)
            ElMessage.success(res.message)
        else
            ElMessage.error(res.message)
    })

}
const ReSetPassword = async () => {
    await admin.changgeUser(waiteChangeUser.value.id as number).then(res => {
        if (res.code == 200)
            ElMessage.success(res.message)
        else {
            ElMessage.error(res.message)
        }
    }).catch(() => {
        ElMessage.error('网络错误')
    })
}
const clearHeader = () => {
    waiteChangeUser.value.userImg = ''
    ElMessage.info('点击保存生效')
}
const putBlackRoom = () => {

}
</script>
    
<style scoped></style>
    