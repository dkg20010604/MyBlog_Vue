<template>
      <div v-if="load" class="ArtHead">
        <el-card style="overflow: visible;" shadow="always"
            :body-style="{ padding: '0', overflow: 'visible', display: 'flex' }">
            <div>
                <el-avatar style="margin-top: -16px;margin-left: 16px;" icon="el-icon-user-solid" :size="75" shape="circle"
                    :src="Img" fit="fill" />
            </div>
            <div style="margin-left: 16px;display: flex;flex-direction: column">
                <div style="display: flex; width: 100%;justify-content: space-between">
                    <p style="font-size: large;margin-top: 5px;">{{ UserBaseInfo?.nickName }}</p>

                    <el-button style="float: right;" :type="IsFollow ? 'primary' : ''" size="default"
                        @click="FollowButton(IsFollow)">{{ IsFollow
                            ? '已关注' : '关注' }}</el-button>
                </div>
                <div>
                    <div class="userinfo">
                        <span>{{ UserBaseInfo?.fans + ' ' }}粉丝</span>
                    </div>
                </div>
                <div>
                    <div>
                        <p>个人简介：{{ UserBaseInfo?.inyro?.length ? UserBaseInfo?.inyro : "这个人还没有简介" }}</p>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
    
<script lang='ts' setup>
import { UserClient,PictureClient, FriendClient, ServiceUrl, type UserDTO } from '@/controller'
const userid = defineProps<{
    id: number
}>()
const load = ref(false)
const userC = new UserClient();
const UserBaseInfo = ref<UserDTO>()
const Friend = new FriendClient()
const IsFollow = ref(false)
const Img=ref()
onBeforeMount(() => {
     userC.getUserInfoById(userid.id).then((res) => {
        if (res.code == 200) {
            UserBaseInfo.value = res.data
             userC.getHeadById(userid.id).then(res=>{
                 Img.value=URL.createObjectURL(res.data)
                    load.value = true
            })
        }
        else
            ElMessage.error('出现错误');
    })
    Friend.isFollow(userid.id).then(res => {
        if (res.code == 200)
            IsFollow.value = res.data
    })
    
})
const FollowButton = async (isfollow: boolean) => {
    if (isfollow) {
        await Friend.deleteFriend(userid.id).then(res => {
            if (res.code == 200) {
                ElMessage.success(res.message)
                IsFollow.value = !isfollow
            }
            else {
                ElMessage.error(res.message)
            }
        })
    }
    else {
        Friend.addFriend(userid.id).then(res => {
            if (res.code == 200) {
                ElMessage.success(res.message)
                IsFollow.value = !isfollow
            }
            else {
                ElMessage.error(res.message)
            }
        })
    }
}
// export default defineComponent({
//   setup() {
//     // todo
//     return {}
//   }
  
// })
</script>
    
<style scoped>
.userinfo {
    border-right: 1px solid var(--el-border-color);
}
</style>
    
<!-- <template>
    <div class="ArtHead">
        <el-card style="overflow: visible;" shadow="always"
            :body-style="{ padding: '0', overflow: 'visible', display: 'flex' }">
            <div>
                <el-avatar style="margin-top: -16px;margin-left: 16px;" icon="el-icon-user-solid" :size="75" shape="circle"
                    :src="ServiceUrl + '/api/Picture/path/' + UserBaseInfo.userImg" fit="fill"></el-avatar>
            </div>
            <div style="margin-left: 16px;display: flex;flex-direction: column">
                <div style="display: flex; width: 100%;justify-content: space-between">
                    <p style="font-size: large;margin-top: 5px;">{{ UserBaseInfo?.nickName }}</p>

                    <el-button style="float: right;" :type="IsFollow ? 'primary' : ''" size="default"
                        @click="FollowButton(IsFollow)">{{ IsFollow
                            ? '已关注' : '关注' }}</el-button>
                </div>
                <div>
                    <div class="userinfo">
                        <span>{{ UserBaseInfo?.fans + ' ' }}粉丝</span>
                    </div>
                </div>
                <div>
                    <div>
                        <p>个人简介：{{ UserBaseInfo?.inyro?.length ? UserBaseInfo?.inyro : "这个人还没有简介" }}</p>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
    
<script lang='ts' setup>
import { UserClient, FriendClient, ServiceUrl, type UserDTO } from '@/controller'
const userid = defineProps<{
    id: number
}>()
const load = ref(false)
const userC = new UserClient();
const UserBaseInfo = ref<UserDTO>()
const Friend = new FriendClient()
const IsFollow = ref(false)
onBeforeMount(async () => {
    await userC.getUserInfoById(userid.id).then(res => {
        if (res.code == 200) {

            UserBaseInfo.value = res.data
            load.value = true
        }
        else
            ElMessage.error('出现错误');
    })
    await Friend.isFollow(userid.id).then(res => {
        if (res.code == 200)
            IsFollow.value = res.data
    })
})
const FollowButton = async (isfollow: boolean) => {
    if (isfollow) {
        await Friend.deleteFriend(userid.id).then(res => {
            if (res.code == 200) {
                ElMessage.success(res.message)
                IsFollow.value = !isfollow
            }
            else {
                ElMessage.error(res.message)
            }
        })
    }
    else {
        Friend.addFriend(userid.id).then(res => {
            if (res.code == 200) {
                ElMessage.success(res.message)
                IsFollow.value = !isfollow
            }
            else {
                ElMessage.error(res.message)
            }
        })
    }
}
</script>
    
<style scoped>
.userinfo {
    border-right: 1px solid var(--el-border-color);
}
</style> -->