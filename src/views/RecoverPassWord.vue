<template>
    <div style="height: 100%; width: 100%;">
        <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center;">
            <el-card v-show="setpass" style="width: 350px;height: auto;" shadow="hover" :body-style="{ padding: '20px' }">
                <template #header>
                    <div>
                        <span>找回密码</span>
                    </div>
                </template>
                <el-form :rules="rule" :model="info" ref="SenCodeForm" label-width="80px" :inline="false">
                    <el-form-item label-width="70" label="账号：">
                        <el-input :disabled="!CodeAble" v-model="info.account"></el-input>
                    </el-form-item>
                    <el-form-item label-width="70" label="验证码：">
                        <div style="display: flex;">
                            <el-input :disabled="CodeAble" v-model="info.code"></el-input>
                            <el-button :disabled="!info.account.endsWith('com')" style="margin-left: 8px;" type="primary"
                                size="default" @click="SendCode">获取验证码</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-card v-show="!setpass" style="width: 350px;" shadow="hover" :body-style="{ padding: '20px' }">
                <template #header>
                    <div>
                        <span>重设密码</span>
                    </div>
                </template>
                <el-form :model="info" ref="SetPassForm" :rules="setpassrule" label-width="80px" :inline="false">
                    <el-form-item label-width="110" label="输入密码：">
                        <el-input show-password v-model="info.code"></el-input>
                    </el-form-item>
                    <el-form-item label-width="110" label="再次输入密码：">
                        <el-input show-password v-model="reinterpass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetpass">修改</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
    
<script lang='ts' setup>
import type { VerifyDTO } from '@/controller'
import { EmailClient, UserClient } from '@/controller'
import type { FormInstance, FormRules } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
const email = new EmailClient()
const user = new UserClient()
const router = useRouter()
const route = useRoute()
const info = reactive<VerifyDTO>({
    account: '',
    code: ''
})
const resetpass = async () => {
    await SetPassForm.value?.validate(async (val) => {
        if (val) {
            if (info.code == reinterpass.value)
                await user.reSetPassWord(route.params.token as string, info).then(res => {
                    if (res.code == 200) {
                        ElMessage.success(res.message)
                        router.replace('/')
                    }
                    else {
                        ElMessage.error(res.data)
                        router.replace('/404')
                    }
                })
            else {
                ElMessage.warning('两次输入密码不一致')
            }
        }
    })

}
const SenCodeForm = ref<FormInstance>()
const SetPassForm = ref<FormInstance>()
const rule = reactive<FormRules>({
    code: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度在6到16位之间', trigger: 'blur' }
    ]
})
const setpassrule = reactive<FormRules>({
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { len: 6, message: '验证码长度为六位', trigger: 'blur' }
    ],
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { required: true, type: 'email', message: '请输入账号', trigger: 'blur' }
    ]
})
const reinterpass = ref('')
const CodeAble = ref(true)
const SendCode = async () => {
    const res = await email.reSetPassCode(info.account)
    if (res.data) {
        ElMessage.success(res.message)
        CodeAble.value = false
    }
    else {
        ElMessage.error(res.message)
    }

}
const setpass = ref(true)
const submit = async () => {
    await SenCodeForm.value?.validate(async (val) => {
        if (val) {
            await email.verifyPassCode(info).then(res => {
                if (res.code == 200) {
                    info.code = ''
                    ElMessage.success(res.message)
                    setpass.value = false
                    router.push({
                        name: 'RecoverPass',
                        params: {
                            token: res.data
                        }
                    })

                }
                else {
                    ElMessage.error(res.message)
                }
            })
        }
    })

}
</script>
    
<style scoped></style>
    