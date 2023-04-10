<template>
    <div class="common">
        <el-container>
            <el-aside width="15%" style="height: 100%;">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header style="height: auto;z-index: 210;background-color: white;padding: 0;">
                    <HeaderIndex :User="info">
                    </HeaderIndex>
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
import { SignalR, type methodGroup } from '@/stores/SignalR'
import HeaderIndex from '@/components/HeaderIndex.vue'
import type { UserDTO, ChatDTO } from "@/controller";
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
    const meth: methodGroup[] = [
        {
            method: (data) => {
                ElMessage.info(data)
            },
            name: 'ReceiveMessage'
        },
        {
            name: 'SendBack',
            method: data => {
                ElMessage.info(data)
            }
        },
        {
            name: 'NewLike',
            method: data => {
                ElMessage(data)
            }
        },
        {
            name: 'newcollection',
            method: data => {
                ElMessage.info(data)
            }
        }
    ]
    await lo.islogin().then(async (res) => {
        console.log(res);
        SignalR().Build()
        meth.forEach(item => {
            SignalR().conn.on(item.name, item.method)
        })
        await SignalR().conn.start()
    })
})
const info = ref<UserDTO>({ nickName: '' })
onBeforeMount(async () => {
    info.value = (await new UserClient().getUserByJwt()).data
    MenuIndex().userinfo = info.value;

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
    margin: 0;
    padding: 0;
}
</style>
