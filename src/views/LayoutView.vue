<template>
    <div class="common">
        <el-container>
            <el-aside width="15%" style="height: 100%;">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header style="height: auto;">
                    <HeaderIndex :User="info"></HeaderIndex>
                </el-header>
                <hr color="red" size="1" style="width: 99%;">
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { MenuIndex } from "@/stores/MenuStore";
import Menu from '@/components/MenuIndex.vue';
import { useRouter } from 'vue-router';
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { SignalR } from '@/stores/SignalR'
import HeaderIndex from '@/components/HeaderIndex.vue'
import type { UserDTO } from "@/controller";
import { UserClient, LoginClient } from '@/controller'
const router = useRouter()
const lo = new LoginClient()
watch(() => MenuIndex().index,
    () => {
        router.push({
            name: MenuIndex().index
        })
    });
onMounted(async () => {
    await lo.islogin().then(async () => {
        await SignalR().Build()
        SignalR().conn.on('ReceiveMessage', data => {
            ElMessage.info(data)
        });
        SignalR().conn.on('SendBack', data => {
            ElMessage.info(data)
        })
        SignalR().conn.on('NewLike', data => {
            ElMessage(data)
        })
        SignalR().conn.start();
    })


})
const info = ref<UserDTO>({})
const Send = () => {
    SignalR().conn.send('SendOne', '20010604', '456789')
}
onBeforeMount(async () => {
    info.value = (await new UserClient().getUserByJwt()).data
})

</script>

<style scoped>
.el-container {
    height: 100%;
}

.common {
    height: 100vh;
    margin: 0;
    padding: 0;
}

.main {
    height: 100vh;
    margin: 0;
    padding: 0;
}
</style>
