<template>
    <el-card style="margin: 20px; height: 90%;" shadow="hover" :body-style="{ padding: '20px', height: '100%' }">
        <el-tabs v-model="activeName" class="tabs">
            <el-tab-pane label="个人信息" name="userinfo" style="height: 100%;">
                <Person></Person>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="chang">
                <changepass></changepass>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
    
<script lang='ts' setup>
const Person = defineAsyncComponent(
    () => import('@/components/PersonInfo.vue')
)
const changepass = defineAsyncComponent(
    () => import('@/components/ChangePass.vue')
)
const activeName = ref('userinfo')
</script>
    
<style scoped>
.tabs {
    height: 100%;
}
</style>
<style>
.el-tabs__content {
    height: 100%;
}
</style>
    