<template>
    <div class="TopClass">
        <div style="width: 15%;">
            <el-upload ref="headerupload" action="http://127.0.0.1:32770/api/Picture/headfile" :show-file-list="false"
                :auto-upload="false" :on-success="successchangeheader" :limit="1" :on-exceed="uploadexceed"
                :on-change="headerchange">
                <template #trigger>
                    <img :src="head" style="width: 100%; height: 100%;" />
                </template>
                <template #tip>
                    <div style="font-size: 15px;color: red;">
                        点击头像选择图片
                    </div>
                </template>
            </el-upload>
        </div>
        <div style="width: 25%;">
            <el-form :model="info" ref="form" label-width="80px" :inline="false">
                <el-form-item label="昵称：">
                    <el-input v-model="info.nickName"></el-input>
                </el-form-item>
                <el-form-item label="简介：">
                    <el-input v-model="info.inyro"></el-input>
                </el-form-item>
                <el-form-item label="地址：">
                    <el-input v-model="info.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changgeinfo">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
    
<script lang='ts' setup>
import { UserClient, LoginClient, PictureClient, type ChangeUserInfoAble } from '@/controller'
import { genFileId, type UploadInstance, type UploadProps, type UploadRawFile } from 'element-plus';
const usercli = new UserClient()
const pic = new PictureClient()
const head = ref('')
const info = ref<ChangeUserInfoAble>({
    nickName: '',
    inyro: undefined,
    userImg: '',
    address: ''
})
const changeheader = ref(false)
onMounted(() => {
    new LoginClient().getByJwt().then(res => {
        info.value = res.data;
        usercli.getHeader().then(respone => {
            head.value = URL.createObjectURL(respone.data)
        })
    })
})
const changgeinfo = () => {
    if (!changeheader.value) {
        usercli.upDataUser(info.value).then(res => {
            if (res.code == 200)
                ElMessage.success(res.message)
            else
                ElMessage.error(res.message)
        })
    }
    else {
        headerupload.value?.submit()
    }
}
const headerchange: UploadProps['onChange'] = (file) => {
    changeheader.value = true
    head.value = URL.createObjectURL(file.raw!.slice())
}
const headerupload = ref<UploadInstance>()
const successchangeheader: UploadProps['onSuccess'] = (response) => {

    info.value.userImg = response.data
    usercli.upDataUser(info.value).then(res => {
        if (res.code == 200)
            ElMessage.success(res.message)
        else
            ElMessage.error(res.message)
    })
}
const uploadexceed: UploadProps['onExceed'] = (files) => {
    headerupload.value?.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    headerupload.value?.handleStart(file)
}
</script>
    
<style scoped>
.TopClass {
    align-items: center;
    height: 100%;
    display: flex;
    margin: auto;
    justify-content: center
}
</style>
    