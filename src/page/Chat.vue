<template>
    <div class="main">
        <div style="width: 30%;background-color:beige;padding:5px 0px">
            <el-card @click="StartChat(index)" style="margin-top: 2px;" v-for="(item, index ) in Firends" shadow="hover"
                :body-style="{ padding: '5px' }" :class="{ 'whthchatclass': item.withchat }">
                <div style="display: flex;align-items: center">
                    <el-avatar :src="item.headimg" icon="el-icon-user-solid" size="default" shape="circle"
                        fit="fill"></el-avatar>
                    <p style="margin-left: 20px;">{{ item.nickName }}</p>
                </div>
            </el-card>
        </div>
        <div style="width: 70%; background-color:darkgrey;padding:5px 0px;">
            <el-card style="width: 100%;height: 99%;" shadow="always" :body-style="{
                    padding: '10px', height: '80%', flexDirection: 'row', alignContent: 'flex-end'
                }">
                <template #header>
                    <span>{{ withchat?.nickName }}</span>
                </template>
                <div class="body-main">
                    <el-scrollbar ref="scrollbar" class="chatlist_box" id="withchatuserbox">
                        <div class="chatlist" :id="'chatlistof' + index.toString()" v-for="(item, index) in chatlist">
                            <p style="margin: 0;align-items: center;justify-items: center;font-size: 15px;">
                                {{ item.sendTime.toString().replace('T', " ") }}
                            </p>
                            <div :class="{ issend: item.sendId == store.userinfo?.id }" class="chatview">
                                <el-avatar
                                    :src="item.sendId == store.userinfo?.id ? store.userinfo.userImg : Firends[chatting].headimg"
                                    icon="el-icon-user-solid" size="default" shape="circle" fit="fill"></el-avatar>
                                <div style="margin-left: 8px;">
                                    <p class="nicknane">{{ item.sendId == store.userinfo?.id ? store.userinfo?.nickName :
                                        Firends[chatting].nickName }}</p>
                                    <div>
                                        <p>{{ item.message }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                    <div class="sendarea">
                        <hr size="2px">
                        <el-input style="width: 90%; " v-model="sendmessage" clearable>
                            <template #append>
                                <el-button type="primary" size="default"
                                    @click="sendbutton(withchat?.id as number)">发送</el-button>
                            </template>
                        </el-input>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
    
<script lang='ts' setup>
import { ChatClient, PictureClient, type ChatDTO, type UserDTO } from '@/controller'
import { SignalR } from '@/stores/SignalR'
import { MenuIndex } from '@/stores/MenuStore'
import type { ElScrollbar } from 'element-plus';
const store = MenuIndex()
const chatinfo = new ChatClient()
interface detie extends UserDTO {
    writeresponse?: boolean
    headimg?: string;
    withchat?: boolean;
    UnRead?: number;
    isunread?: boolean
}
let chatting = 0;
let pageindex = 1;
const picc = new PictureClient()
const Firends = ref<detie[]>([])
const withchat = ref<detie>();
const sendmessage = ref('')
const chatlist = ref<ChatDTO[]>()
const scrollbar = ref<InstanceType<typeof ElScrollbar>>();
onBeforeMount(() => {
    chatinfo.getChatUserList().then(res => {
        Firends.value = res
        Firends.value?.forEach(async item => {
            item.headimg = URL.createObjectURL((await picc.getHeadByPath(item.userImg as string)).data)
        })
    })
})
onMounted(() => {
    SignalR().conn.on('receivenewchat', (data) => {
        ElMessage.success("聊天页面收到消息")
        if (data.sendId == Firends.value[chatting].id) {
            chatlist.value?.push(data)
        }
        else {

        }
    })
})
const StartChat = async (item: number) => {
    pageindex = 1
    const res = await chatinfo.getChat(Firends.value[item].id as number, pageindex, 20)
    Firends.value[chatting].withchat = false
    Firends.value[item].withchat = true
    console.log(res);
    chatlist.value = res.data?.data
    chatting = item
    withchat.value = Firends.value[item]
    pageindex++;
}
const sendbutton = async (userid: number) => {
    const res = await chatinfo.sendMessage(userid, sendmessage.value);
    if (res.code == 200) {
        console.log(res);
        ElMessage.success('发送成功')
        sendmessage.value = ''
        chatlist.value?.push(res.data)
    }
}
onUpdated(() => {
    if (chatlist.value) {
        document.getElementById('chatlistof' + (chatlist.value.length - 1).toString())?.scrollIntoView()
        document.getElementById('chatlistof0')?.addEventListener('mouseenter', async () => {
            const res = await chatinfo.getChat(Firends.value[chatting].id as number, pageindex, 20)
            pageindex++;
            console.log(res);
            chatlist.value?.forEach(item => {
                res.data.data.push(item)
            })
            chatlist.value = res.data.data
        })
    }
})
watch(
    () => chatlist.value,
    (data, old) => {
        if (((data as any[])?.length as number) >= ((old as any[])?.length as number))
            document.getElementById('chatlistof' + ((data as any[]).length).toString())?.scrollIntoView()
    }
)
</script>
    
<style scoped>
.main {
    display: flex;
    width: 99%;
    height: 99%;
}

.whthchatclass {
    background-color: beige;
}

.body-main {
    width: 99%;
    height: 99%;
}

.chatlist_box {
    display: flexbox;
    height: 80%;
    overflow: auto;
}


.chatview {
    padding: 10px;
    padding-top: 16;
    display: flex;
    margin: 0;
}


.nicknane {
    font-size: small;
    margin: 0;
}
</style>
    