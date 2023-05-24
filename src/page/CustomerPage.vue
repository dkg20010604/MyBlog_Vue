<template>
    <div style="padding: 10px;" v-if="load">
        <el-card style="overflow: visible;" shadow="always"
            :body-style="{ padding: '0', overflow: 'visible', display: 'flex' }">
            <div>
                <el-avatar style="margin-top: -16px;margin-left: 16px;" icon="el-icon-user-solid" :size="75" shape="circle"
                    :src="ServiceUrl + '/api/Picture/path/' + UserBaseInfo?.userImg" fit="fill"></el-avatar>
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
        <el-card style="margin-top: 24px;" shadow="always" :body-style="{ padding: '20px' }">
            <el-tabs v-model="tabsValue" type="border-card" tab-position="top" @tab-click="">
                <el-tab-pane label="文章" name="article">
                    <CustomPageOfArticle :userId="(route.params.id as unknown as number)"></CustomPageOfArticle>
                </el-tab-pane>
                <el-tab-pane label="评论" name="comment">
                    <CustomPageOfComment :userId="(route.params.id as unknown as number)"></CustomPageOfComment>
                </el-tab-pane>
            </el-tabs>


        </el-card>

    </div>
</template>
    
<script lang='ts' setup>
import { useRouter, useRoute } from 'vue-router';
import { UserClient, FriendClient, ServiceUrl, type UserDTO } from '@/controller'
const load = ref(false)
const router = useRouter()
const route = useRoute()
const userC = new UserClient();
const UserBaseInfo = ref<UserDTO>()
const Friend = new FriendClient()
const IsFollow = ref(false)
onBeforeMount(async () => {
    await userC.getUserInfoById(route.params.id as unknown as number).then(res => {
        if (res.code == 200) {

            UserBaseInfo.value = res.data
            load.value = true
        }
        else
            ElMessage.error('出现错误');
    })
    await Friend.isFollow(route.params.id as unknown as number).then(res => {
        if (res.code == 200)
            IsFollow.value = res.data
    })
})
const FollowButton = async (isfollow: boolean) => {
    if (isfollow) {
        await Friend.deleteFriend(UserBaseInfo.value?.id as number).then(res => {
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
        Friend.addFriend(UserBaseInfo.value?.id as number).then(res => {
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
const tabsValue = ref('article')
</script>
    
<style scoped>
.userinfo {
    border-right: 1px solid var(--el-border-color);
}
</style>
    