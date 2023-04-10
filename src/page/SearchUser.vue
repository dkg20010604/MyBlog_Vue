<template>
    <div class="searchinput">
        <el-input v-model="searchpage.data[0]" placeholder="输入用户名或账号" size="large">
            <template #append style="width: 20%;">
                <div>
                    <el-button-group style="display: flex;">
                        <el-button type="primary" round size="default" @click="searchTitle">搜索</el-button>
                    </el-button-group>
                </div>
            </template>
        </el-input>
    </div>
    <div class="reslist">
        <el-card @click="clickcard(res.id as number)" v-for="res in articles.data" shadow="hover"
            :body-style="{ padding: 10 }" class="cardlist">
            <div class="cardinfo">
                <div class="cardheader">
                    <p style="word-break: keep-all;overflow: hidden; text-overflow: ellipsis;">{{ res.title }}</p>
                    <div class="restags">
                        <p class="restag" v-for="tag in res.tags">{{ tag.tagName }}</p>
                    </div>
                </div>
                <v-md-preview :text="res.detail" style="word-break: keep-all; text-overflow: ellipsis;"></v-md-preview>
            </div>
        </el-card>
    </div>
    <div class="page">
        <el-pagination background layout="prev, pager, next" :page-size="articles.pageSize" :total="articles.total" />
    </div>
</template>
    
<script lang='ts' setup>
import type { PageDataOfArticleDTO, PageDataOfString } from '@/controller'
import { ArticleClient } from '@/controller'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const searchclient = new ArticleClient()
const articles = reactive<PageDataOfArticleDTO>({
    pageindex: 1,
    pageSize: 20,
    total: 0,
    data: []
})
const searchpage = reactive<PageDataOfString>({
    pageindex: 1,
    pageSize: 20,
    data: ['']
})
const searchTitle = () => {
    articles.data.length = 0;
    searchclient.searchArticle(searchpage).then(res => {
        res.data?.data?.forEach(a => {
            articles.data.push(a);
        })
    })
}
const searchTag = () => {
    articles.data.length = 0;
    searchclient.searchByTags(searchpage).then(res => {
        res.data?.forEach(r => {
            articles.data.push(r)
        })
    })
}
const clickcard = (id: number) => {
    router.push({
        name: 'viewpage',
        params: {
            id: id
        }
    })
}
</script>
    
<style scoped>
.searchinput {
    align-items: center;
    width: 90%;
    height: 30px;
    margin: auto;
}

.reslist {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    margin-top: 20PX;
}

.cardlist {
    margin: auto;
    margin-top: 20px;
    width: 48%;
    cursor: pointer;
    height: 150px;
}

.cardinfo {
    display: flex;
    margin: auto;
    flex-direction: column;
}

.page {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    justify-content: center;
}

.cardheader {}

.restags {
    display: flex;
    flex-direction: row-reverse;
    margin-top: -30px;
}

.restag {
    margin-left: 10px;
    font-family: '楷体';
}

.cardheader p {
    writing-mode: sideways-lr;
    font-kerning: 2px;
}
</style>
    