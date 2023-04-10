<template>
    <div class="headerMain">
        <el-descriptions class="margin-top" title="" :column="4" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <people theme="outline" size="18" fill="#000000" :strokeWidth="3" />
                        <div style="width: 20%;"></div>
                        <p>昵称：</p>
                    </div>
                </template>
                <p class="cell-info">{{ info.User.nickName }}</p>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <globe theme="outline" size="18" fill="#000000" :strokeWidth="3" />
                        <div style="width: 20%;"></div>
                        <p>地址：</p>
                    </div>
                </template>
                <p class="cell-info">{{ info.User.address }}</p>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <mail theme="outline" size="18" fill="#000000" :strokeWidth="3" />
                        <div style="width: 20%;"></div>
                        <p>邮箱</p>
                    </div>
                </template>
                <p class="cell-info">{{ info.User.email }}</p>
            </el-descriptions-item>
            <el-descriptions-item>
                <el-popover placement="bottom" trigger="hover" content="">
                    <template #reference>
                        <el-avatar style="display: flex;" :size="50" shape="circle" :src="headimg" fit="fill"></el-avatar>
                    </template>
                    <div class="userOperate">
                        <el-button type="danger" @click="loginout">注销</el-button>
                    </div>
                </el-popover>

            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
    
<script lang='ts' setup>
import type { UserDTO } from '@/controller';
import { PictureClient } from '@/controller'
import { People, Globe, Mail } from '@icon-park/vue-next'
import { useRouter } from 'vue-router'
const Router = useRouter()
const info = defineProps<{ User: UserDTO }>()
const headimg = ref()
const loginout = () => {
    localStorage.clear()
    Router.replace('/')
}
const a = '' as string
onBeforeMount(async () => {
    try {
        new PictureClient().getHeader().then(res => {
            headimg.value = URL.createObjectURL(res.data)
        }).catch(() => {
            Router.replace('/')
        })
    } catch (error) {
        console.log(error);

    }

})
</script>
    
<style scoped>
.headerMain {}

.userOperate {
    display: flex;
}

.headerdetiel {
    display: flex;
}

.cell-info {
    margin: auto;
    justify-items: center;
}

.cell-item {
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 0;
}
</style>
    