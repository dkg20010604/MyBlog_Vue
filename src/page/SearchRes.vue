<template>
    <div class="searchinput">
        <el-input v-model="searchtext" placeholder="输入要搜索的内容" size="large">
            <template #append style="width: 20%;">
                <div>
                    <el-button type="primary" size="default" @click="">搜索</el-button>
                </div>
            </template>
        </el-input>
    </div>
</template>
    
<script lang='ts' setup>
import { ref } from 'vue';

const searchtext = ref();
</script>
    
<style scoped>
.searchinput {
    align-items: center;
    width: 80%;
    height: 30px;
}
</style>
    