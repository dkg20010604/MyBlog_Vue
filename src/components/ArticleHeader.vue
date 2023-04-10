<template>
    <div class="ArtHead">
        <el-popover class="ArtHead" placement="bottom" trigger="hover" content="">
            <template #reference>
                <div>
                    <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="headimg" fit="fill"></el-avatar>
                </div>
            </template>
            <el-button :type="follow ? 'default' : 'primary'" @click="addfir">{{ follow ? '已关注' :
                '关注'
            }}</el-button>

        </el-popover>

        <span class="ArtHead">{{ user?.nickName }}</span>
    </div>
</template>
    
<script lang='ts' setup>
import { UserClient, PictureClient, FriendClient, type UserDTO } from '@/controller'
import { ElMessage } from 'element-plus';
const userckient = new UserClient()
const pic = new PictureClient();
const fir = new FriendClient();
const info = defineProps<{
    id: number,
    isfollow: boolean
}>()
const headimg = ref()
const user = ref<UserDTO>()
let follow = ref(false)
onMounted(async () => {
    await nextTick();
    user.value = (await userckient.getUserInfoById(info.id)).data;
    const res = await pic.getHeadById(info.id);
    headimg.value = URL.createObjectURL(res.data)
    follow.value = info.isfollow;
})

const addfir = async () => {
    if (follow.value) {
        await fir.deleteFriend(info.id).then(data => {
            data.data ? ElMessage.success(data.message) : ElMessage.error(data.message)
            follow.value = !follow.value
        })
    }
    else {
        await fir.addFriend(info.id).then(data => {
            data.data ? ElMessage.success(data.message) : ElMessage.error(data.message);
            follow.value = !follow.value;
        })
    }
}
</script>
    
<style scoped>
.ArtHead {
    display: flex;
    align-items: center;
}
</style>
    