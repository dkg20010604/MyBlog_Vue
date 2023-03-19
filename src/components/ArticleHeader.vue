<template>
    <div class="ArtHead">
        <el-popover class="ArtHead" placement="bottom" trigger="hover" content="">
            <template #reference>
                <div>
                    <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="headimg" fit="fill"></el-avatar>
                </div>
            </template>
            <el-button type="primary" @click="">关注</el-button>
            
        </el-popover>

        <span class="ArtHead">{{ user?.nickName }}</span>
    </div>
</template>
    
<script lang='ts' setup>
import { UserClient, PictureClient, type UserDTO } from '@/controller'
const info = defineProps<{
    id: number
}>()
const headimg = ref()
const user = ref<UserDTO>()
onMounted(async () => {
    await nextTick();
    user.value = (await new UserClient().getUserInfoById(info.id)).data;
    const res = await new PictureClient().getHeadById(info.id);
    headimg.value = URL.createObjectURL(res.data)
})
</script>
    
<style scoped>
.ArtHead {
    display: flex;
    align-items: center;
    justify-items: center;
    margin: auto;
}
</style>
    