<template>
    <div style="display: flex;height: 100%;overflow: hidden;">
        <iframe style="width: 100%;height:100%;" :src="res"></iframe>
    </div>
</template>
    
<script lang='ts' setup>
const res = ref('http://127.0.0.1:32770/hangfire?Authorization=' + localStorage.getItem('MyBlogJwt'))
</script>
    
<style scoped></style>