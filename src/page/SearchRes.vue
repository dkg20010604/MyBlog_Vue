<template>
    <div class="searchinput">
        <el-input v-model="querystring" placeholder="输入要搜索的内容" size="large">
            <template #append style="width: 20%;">
                <div>
                    <el-button-group style="display: flex;">
                        <el-button type="primary" round size="default" @click="search(0)">搜索标题</el-button>
                        <el-button type="primary" round size="default" @click="search(1)">搜索标签</el-button>
                    </el-button-group>
                </div>
            </template>
        </el-input>
    </div>
    <div class="reslist">
        <el-card @click="clickcard(res.id as number)" v-for="res in searchpage?.data" shadow="hover"
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
    <div class="page" v-if="searchpage">
        <el-pagination background layout="prev, pager, next" :page-size="searchpage.pageSize" :total="searchpage.total"
            @current-change="ChangePage" v-model:current-page="searchpage.pageindex" />
    </div>
    <router-view></router-view>
</template>
    
<script lang='ts' setup>
import type { PageDataOfArticleDTO } from '@/controller'
import { ArticleClient } from '@/controller'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const searchpage = ref<PageDataOfArticleDTO>()
const searchclient = new ArticleClient()
const querystring = ref(route.params.query as string);
const type = ref(route.params.type as unknown as number)
const pageSize = 20
const pageindex = ref(route.params.pageIndex as unknown as number)
const search = (type: number) => {
    router.push({
        name: 'searchartticle',
        params: {
            type: type,
            pageIndex: 1,
            query: querystring.value
        }
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

const ChangePage = (index: number) => {
    router.push({
        name: 'searchartticle',
        params: {
            type: type.value,
            pageIndex: index,
            query: querystring.value
        }
    })
    if (type.value == 0) {
        searchclient.getAllArticle(index, pageSize, querystring.value)
            .then(res => {
                searchpage.value = res.data
            })
    }
    else {
        searchclient.searchByTags(index, pageSize, querystring.value)
            .then(res => {
                searchpage.value = res
            })
    }
}
watch(
    () => route.params,
    (val, old) => {

        if (!route.name?.toString().endsWith('searchartticle')) {
            return;
        }
        type.value = route.params.type as unknown as number
        pageindex.value = route.params.pageIndex as unknown as number

        if (type.value == 0) {
            searchclient.getAllArticle(val.pageIndex as unknown as number, pageSize, querystring.value)
                .then(res => {
                    searchpage.value = res.data
                })
        }
        else {
            searchclient.searchByTags(val.pageIndex as unknown as number, pageSize, querystring.value)
                .then(res => {
                    searchpage.value = res
                })
        }
    }
)
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