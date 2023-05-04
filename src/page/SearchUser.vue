<template>
    <div class="searchinput">
        <el-input v-model="query" placeholder="输入用户名或邮箱" size="large">
            <template #append style="width: 20%;">
                <div>
                    <el-button-group style="display: flex;">
                        <el-button type="primary" round size="default" @click="searchByaccount">搜索邮箱</el-button>
                        <el-button type="primary" round size="default" @click="searchByNickname">搜索昵称</el-button>
                    </el-button-group>
                </div>
            </template>
        </el-input>
    </div>
    <div class="reslist" v-if="showres" style="padding: 10px;">
        <el-scrollbar v-infinite-scroll="LoadMore" infinite-scroll-immediate="false" style="width: 90%;">
            <div style="display: flex; flex-wrap: wrap;">
                <el-card v-for="user in userres" style="width:45%;margin: 20px;cursor: pointer" shadow="hover"
                    :body-style="{ padding: '20px' }">
                    <div style="display: flex;flex-direction: row">
                        <el-avatar icon="el-icon-user-solid" :size="60" shape="circle" :src="user.userImg"
                            fit="fill"></el-avatar>
                        <div style="display: flex;margin-left: 16px; flex-direction: column">
                            <div style="font-size: 20px;"><b>{{ user.nickName }}</b></div>
                            <div style="display: flex;">
                                <p>{{ user.fans?.toString() }}粉丝</p>
                                <p style="margin-left: 10px;">{{ user.inyro }}</p>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-scrollbar>
    </div>
    <div v-else>
        <p>暂无数据</p>
    </div>
</template>
    
<script lang='ts' setup>
import { useRouter, useRoute } from 'vue-router'
import { UserClient, PictureClient, type UserDTO } from '@/controller'
const router = useRouter()
const route = useRoute()
const userclient = new UserClient()
const headeclient = new PictureClient()
const userres = ref<UserDTO[]>()
const query = ref('')
const type = ref(route.params.type as unknown as number)
const pageindex = ref(route.params.pageIndex as unknown as number)
const showres = ref(false)
const searchByaccount = async () => {
    router.push({
        name: 'searchuser',
        params: {
            type: 0,
            pageIndex: 1,
            query: query.value.replace('.', '。')
        }
    })
    userres.value = []
    const res = await userclient.searchUser(query.value)
    if (res.code == 200) {
        userres.value?.push(res.data)
    }
}
const searchByNickname = async () => {
    router.push({
        name: 'searchuser',
        params: {
            type: 1,
            pageIndex: 1,
            query: query.value.replace('.', '。')
        }
    })
    userres.value = undefined
    const res = await userclient.searchUsersByNickname(1, 20, query.value)
    if (res.code == 200) {
        userres.value = res.data
    }
    else {
        ElMessage.warning(res.message)
    }
}
const LoadMore = () => {
    pageindex.value++;
    userclient.searchUsersByNickname(pageindex.value, 20, query.value).then(res => {
        res.data.forEach(item => {
            userres.value?.push(item)
        })
    })
}
watch(
    () => route.params,
    (val, old) => {
        if (!route.name?.toString().endsWith('searchuser')) {
            return;
        }
        else {

            if (type.value == 0) {
                userclient.searchUser(query.value)
                    .then(res => {
                        if (res.code == 200) {
                            userres.value?.push(res.data)
                            showres.value = true
                        }
                    })
            }
            else {
                userclient.searchUsersByNickname(val.pageIndex as unknown as number, 20, query.value)
                    .then(res => {
                        if (res.code == 200) {
                            userres.value = res.data
                            showres.value = true
                        }
                        else {
                            ElMessage.warning(res.message)
                        }
                    })
            }
        }
    }
)
const getheader = (path: string): string => {
    let bloburl = '';
    new PictureClient().getHeadByPath(path).then(res => {
        const url = URL.createObjectURL(res.data);
        bloburl = url;
    })
    return bloburl as string;
}
</script>
    
<style scoped>
.searchinput {
    align-items: center;
    width: 90%;
    height: 30px;
    margin: auto;
}

.reslist {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    margin-top: 20PX;
    width: 1100px;
}

.cardlist {
    margin: auto;
    margin-top: 20px;
    width: 48%;
    cursor: pointer;
    height: 150px;
}

.cardinfo {
    display: flex;
    margin: auto;
    flex-direction: column;
}

.page {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    justify-content: center;
}


.restags {
    display: flex;
    flex-direction: row-reverse;
    margin-top: -30px;
}

.restag {
    margin-left: 10px;
    font-family: '楷体';
}

.cardheader p {
    writing-mode: sideways-lr;
    font-kerning: 2px;
}
</style>
    