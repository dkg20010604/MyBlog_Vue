<template>
   <el-button type="info" size="default" @click="button">测试</el-button>
</template>
<script lang="ts" setup>
import { SignalR } from '@/stores/SignalR'
const signalr=SignalR().conn;
const button=()=>{
    SignalR().conn.send('SendBack','自回应')
}
</script>
<style lang="scss" scoped></style>