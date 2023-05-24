<template>
    <div class="headerMain">
        <el-descriptions class="margin-top" title="" :column="4" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <people theme="outline" size="18" :fill="isdark ? '#000000' : '#ffffff'" :strokeWidth="3" />
                        <div style="width: 20%;"></div>
                        <p>昵称：</p>
                    </div>
                </template>
                <span :class="{ cellinfo: isdark }">{{ info.User.nickName }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <globe theme="outline" size="18" :fill="isdark ? '#000000' : '#ffffff'" :strokeWidth="3" />
                        <div style="width: 20%;"></div>
                        <p>地址：</p>
                    </div>
                </template>
                <p :class="{ cellinfo: isdark }">{{ info.User.address }}</p>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <mail theme="outline" size="18" :fill="isdark ? '#000000' : '#ffffff'" :strokeWidth="3" />
                        <div style="width: 20%;"></div>
                        <p>邮箱</p>
                    </div>
                </template>
                <p :class="{ cellinfo: isdark }">{{ info.User.account }}</p>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <el-popover placement="bottom" trigger="hover" style="width: auto">
                        <template #reference>
                            <el-avatar style=" display: flex;" :size="50" shape="circle" :src="headimg"
                                fit="fill"></el-avatar>
                        </template>
                        <div
                            style="display: flex;align-items: center;justify-self: center;flex-direction: column;width: auto;">
                            <el-button type="danger" @click="loginout">注销</el-button>

                            <el-switch active-text="审核开启" inactive-text="审核关闭" v-model="isChickComment" :active-value="true"
                                :inactive-value="false" @change="changeChick">
                            </el-switch>


                        </div>
                    </el-popover>
                </template>
                <el-button size="default" @click="usedark()">
                    <moon v-if="isdark" theme="outline" size="24" fill="#000000" :strokeWidth="3" />
                    <sun v-else theme="outline" size="24" fill="#ffffff" :strokeWidth="3" />
                </el-button>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
    
<script lang='ts' setup>
import type { UserDTO } from '@/controller';
import { UserClient } from '@/controller'
import { People, Globe, Mail, SunOne, Moon, Sun } from '@icon-park/vue-next'
import { useRouter } from 'vue-router'
import { toggleDark } from '@/UseDark'
import { MenuIndex } from '@/stores/MenuStore'
const Router = useRouter()
const store = MenuIndex()
const userc = new UserClient()
const info = defineProps<{ User: UserDTO }>()
const headimg = ref()
const loginout = () => {
    localStorage.clear()
    Router.replace('/')
}
const isdark = ref(true)
const usedark = () => {
    toggleDark()
    isdark.value = !isdark.value
}
const isChickComment = ref(false)
onMounted(() => {
    userc.getHeader().then(res => {
        store.setUserHeaderImg(URL.createObjectURL(res.data))
        headimg.value = store.userinfo.userImg
    }).catch((err) => {
        Router.replace('/')
    })
    userc.getCommentChick().then(res => {
        isChickComment.value = res.data
    })
    const doc = document.getElementById('Onlyhtml');
    if (doc?.classList.contains('dark'))
        isdark.value = false
    else
        isdark.value = true

})
const changeChick = () => {
    userc.setCommentChick(isChickComment.value).then(res => {
        if (res.code == 200)
            ElMessage.success(res.message)
        else
            ElMessage.error(res.message)
    }).catch((err) => {
        ElMessage.error('操作失败')
    })
}
</script>
    
<style scoped>
.headerdetiel {
    display: flex;
}

.cell-item {
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 0;
}

.cellinfo {
    color: #000;
}
</style>
<style>
.is-bordered-content {
    background-color: v-bind("!isdark ? '#000000' : '#ffffff'")
}

p {
    overflow: hidden;
}
</style>