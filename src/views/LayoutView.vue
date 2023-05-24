<template>
    <div class="common">
        <el-container>
            <el-aside width="15%" style="height: 100%;">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header style="height: auto;z-index: 210;background-color: white;padding: 0;">
                    <HeaderIndex :User="MenuIndex().userinfo">
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
import { useRouter, useRoute } from 'vue-router';
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { SignalR, type methodGroup } from '@/stores/SignalR'
import HeaderIndex from '@/components/HeaderIndex.vue'
import { UserClient, LoginClient } from '@/controller'
const router = useRouter()
const lo = new LoginClient()
const pic = new UserClient()
watch(() => MenuIndex().index,
    (val, old) => {
        if (val == 'adminuser')
            router.push({
                name: val,
                params: {
                    pageIndex: 1,
                    userType: 0,
                    userStatus: 3
                }
            })
        else if (val == 'admincomment') {
            router.push({
                name: val,
                params: {
                    pageIndex: 1,
                    status: 4
                }
            })
        }
        else if (val == 'adminarticle')
            router.push({
                name: val,
                params: {
                    pageIndex: 1,
                    articleStatus: 3
                }
            })
        else if (val == 'articlecollection')
            router.push({
                name: val,
                params: {
                    pageIndex: 1,
                }
            })
        else if (val == 'searchuser')
            router.push({
                name: val,
                params: {
                    type: 0,
                    pageIndex: 1,
                    query: ' '
                }
            })
        else if (val == 'searchartticle')
            router.push({
                name: val,
                params: {
                    type: 0,
                    pageIndex: 1,
                    query: ' '
                }
            })
        else if (val == 'release')
            router.push({
                name: val,
                params: {
                    id: 0
                }
            })
        else {
            router.push({
                name: val
            })
        }
    });
onBeforeMount(async () => {
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
        },
        {
            name: 'outlogin',
            method: () => {
                router.replace('/')
                localStorage.clear()
            }
        }
    ]
    await new LoginClient().getByJwt().then(async (res) => {
        if (res.code == 200) {
            MenuIndex().userinfo = res.data
            pic.getHeader().then(res => {
                MenuIndex().setUserHeaderImg(URL.createObjectURL(res.data))
            })
            SignalR().Build()
            meth.forEach(item => {
                SignalR().conn.on(item.name, item.method)
            })
            await SignalR().conn.start()
        }
        else {
            router.replace('/');
        }
    })
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
