<template>
    <div class="formclass">
        <el-form hide-required-asterisk :rules="changerule" label-position="right" :model="passgroup" ref="form"
            label-width="120px" :inline="false">
            <el-form-item label="输入原密码:" prop="oldPass">
                <el-input v-model="passgroup.oldPass" show-password></el-input>
            </el-form-item>
            <el-form-item label="输入新密码:" prop="newPass">
                <el-input v-model="passgroup.newPass" show-password></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码:">
                <el-input v-model="passagain" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changepassword">确定修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
    
<script lang='ts' setup>
import type { PasswordGroup } from '@/controller';
import { UserClient } from '@/controller'
import { ElMessage, type FormRules } from 'element-plus';
import { useRouter } from 'vue-router'
const user = new UserClient()
const passgroup = reactive<PasswordGroup>({
    oldPass: '',
    newPass: ''
})
const Router = useRouter()
const changerule = reactive<FormRules>({
    oldPass: [
        { required: true, trigger: 'blur', type: 'string', message: '必填项' },
        { min: 6, max: 15, trigger: 'blur', message: '密码长度需要在6到15位之间' }
    ],
    newPass: [
        { required: true, trigger: 'blur', type: 'string', message: '必填项' },
        { min: 6, max: 15, trigger: 'blur', message: '密码长度需要在6到15位之间' }
    ]
})
const passagain = ref('')
const changepassword = () => {
    if (passagain.value == passgroup.newPass)
        user.changePassword(passgroup).then(res => {
            if (res.code == 200) {
                ElMessage.success("修改成功")
                localStorage.clear()
                Router.replace('/')
            }
            else {
                ElMessage.error(res.message)
            }
        })
    else
        ElMessage.warning('两次输入密码不一致')
}
</script>
    
<style scoped>
.formclass {
    display: flex;
}
</style>
    