<template>
    <div class="centerpage">
        <div class="cardform">
            <el-card shadow="hover" v-show="show">
                <div style="display: inline;">
                    <h3>欢迎进入个人博客系统</h3>
                </div>
                <el-form ref="LoginRef" :model="logininfo" :rules="loginRule">
                    <el-form-item label="输入账号：" prop="username" class="loginitem">
                        <el-input v-model="logininfo.username" />
                    </el-form-item>
                    <el-form-item label="输入密码：" prop="password" class="loginitem">
                        <el-input v-model="logininfo.password" type="password"></el-input>
                    </el-form-item>
                    <el-button link type="primary" size="small" @click="Router.push('/Recover')"
                        style="margin-top: -20px;">忘记密码？</el-button>
                    <el-form-item class="Loginstatus">
                        <el-checkbox v-model="logininfo.reme" label="记住密码" size="large"></el-checkbox>
                        <el-checkbox v-model="logininfo.auto" label="下次自动登录" size="large"></el-checkbox>
                    </el-form-item>
                    <el-form-item class="Loginstatus">
                        <el-button type="primary" style="margin: auto;" @click="loginButton(LoginRef)">登录</el-button>
                        <el-button style="margin: auto;">重置</el-button>
                    </el-form-item>
                    <el-button link type="primary" size="small" @click="show = !show">立即注册</el-button>
                </el-form>
            </el-card>


            <el-card style="width: 100%;" shadow="hover" v-show="!show">
                <div style="display: inline;">
                    <h3>立即注册</h3>
                </div>
                <el-form :model="reginfo" ref="Regform" :rules="regrule" label-width="80px" :inline="false">
                    <el-form-item label="邮箱：" prop="account" class="loginitem">
                        <el-input v-model="reginfo.account" placeholder="请输入邮箱" size="default" @change=""></el-input>
                    </el-form-item>
                    <el-form-item label="昵称：" prop="nickName" class="loginitem">
                        <el-input v-model="reginfo.nickName" placeholder="请输入昵称" size="default" @change=""></el-input>
                    </el-form-item>
                    <el-form-item label="地址：" prop="address" class="loginitem">
                        <el-input v-model="reginfo.address" placeholder="请输入地址" size="default" @change=""></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password" class="loginitem">
                        <el-input v-model="reginfo.password" placeholder="请输入密码" type="password" @change=""></el-input>

                    </el-form-item>
                    <el-form-item label="头像：" class="loginitem" prop="userImg">
                        <el-upload class="avatar-uploader" action="http://127.0.0.1:32770/api/Picture/headfile"
                            :show-file-list="false" :on-success="imgsuccess" :before-upload="beforeup">
                            <img v-if="userimg" :src="userimg" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="loginitem">
                        <el-button type="primary" @click="regbutton(Regform)">立即注册</el-button>
                        <el-button @click="show = !show">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
    <div>
        <el-dialog v-model="showdialog" title="输入验证码" width="30%">
            <el-input v-model="vircode.code" placeholder="输入验证码" clearable></el-input>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="regstart">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { LoginClient, EmailClient, PictureClient, type RegInfo, type VerifyDTO } from '@/controller'
import type { UploadProps, FormInstance, FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
const Router = useRouter();
const email = new EmailClient()
const loginapi = new LoginClient();
const logininfo = reactive({
    username: '',
    password: '',
    reme: false,
    auto: false
})
const showdialog = ref(false)
const userimg = ref('')
const show = ref(true)
const imgsuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    userimg.value = URL.createObjectURL(uploadFile.raw!)
    reginfo.userImg = response.data

}
const beforeup: UploadProps['beforeUpload'] = (rawFile) => {
    if (!rawFile.type.startsWith('image')) {
        ElMessage.error('头像只能是图片')
        return false
    }
    else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片超过可上传大小上限：2MB')
        return false
    }
    return true
}
const reginfo = reactive<RegInfo>({
    account: '',
    nickName: '',
    password: '',
    address: '',
    userImg: ''
})
const vircode = reactive<VerifyDTO>({
    account: '',
    code: ''
});
const Regform = ref<FormInstance>()
const regrule = reactive<FormRules>({
    account: [
        { required: true, min: 3, message: '请输入邮箱', trigger: 'blur' },
        { required: true, type: 'email', message: '邮箱格式错误', trigger: 'blur' }
    ],
    nickName: [
        { required: true, min: 3, message: '请输入至少三位昵称', trigger: 'blur' }
    ],
    password: [
        { required: true, min: 6, message: '密码不得少于6位', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '请输入地址' }
    ],
    userImg: [
        { required: true, min: 3, message: '请上传头像', trigger: 'blur' }
    ]
})
const regbutton = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            // 填写完成 开始邮箱验证
            email.sendSecure({
                account: reginfo.account,
                code: reginfo.nickName
            }).then(res => {
                if (res.code == 200) {
                    ElMessage.success('发送成功，请注意查收')
                    showdialog.value = true
                    vircode.account = reginfo.account
                } else {
                    ElMessage.error(res.message)
                }
            }).catch(() => {
                ElMessage.error('发送失败')
            })
        }
    })
}
const regstart = async () => {
    const coderes = await email.verifyCode(vircode)
    // 验证成功
    if (coderes.code == 200) {
        const res = await loginapi.reg(reginfo)
        if (res.code == 200) {
            ElMessage.success("注册成功");
            showdialog.value = false
            show.value = !(show.value)
        }
    }
    // 失败
    else {
        ElMessage.error("验证码错误")
    }
}
const LoginRef = ref<FormInstance>()
const loginRule = reactive<FormRules>({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码至少6位', trigger: 'blur' }
    ]
})
const loginButton = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            const res = await loginapi.login({ account: logininfo.username, password: logininfo.password })
            if (res.code == 200) {
                ElMessage.success('登陆成功')
                localStorage.setItem('MyBlogJwt', 'Bearer ' + res.data?.jwt as string);
                localStorage.setItem('MyBlogUserId', res.data?.id as unknown as string);
                if (logininfo.reme) {
                    localStorage.setItem('MyBlogReme', logininfo.password)
                    if (logininfo.auto) {
                        localStorage.setItem('MyBlogAuto', 'true')
                    }
                }
                Router.push({
                    name: 'person'
                })
            }
            else {
                ElMessage.error(res.message as string)
            }
        }
    })
}
watch(
    () => logininfo.reme,
    () => {
        if (!logininfo.reme) {
            logininfo.auto = false
        }
    })
watch(() => logininfo.auto,
    () => {
        if (logininfo.auto) {
            logininfo.reme = true
        }
    });
onMounted(() => {
    if (localStorage.getItem('MyBlogAuto') == 'true') {
        loginapi.getByJwt().then(res => {
            if (res.code == 200) {
                Router.push({
                    name: 'person'
                })
            }
        })
    }
})
</script>
<style scoped>
.cardform {
    height: 100%;
    display: flex;
    float: right;
    margin-right: 10%;
    justify-content: center;
    align-items: center;

}

.loginitem {
    margin: 20px;
}

/* .Loginstatus div {
    opacity: 1;
    font-style: normal;
} */

h3 {
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}


.centerpage img {
    display: inline;
    float: left;
}

.centerpage {
    background-image: url('@/assets/创意发散.png'), linear-gradient(to right top, #df58a7, #ff5f77, #ff883c, #f1bc00, #a8eb12);
    background-position: left;
    background-repeat: no-repeat;
    height: 100%;
}
</style>