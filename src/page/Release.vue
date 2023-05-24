<template>
    <el-card class="articlecard" shadow="always" :body-style="{ padding: '5px' }">
        <div class="cardhead">
            <span style="font-size: 20px;">发布文章</span>
            <div class="headbuttongroup">
                <el-button-group>
                    <el-button type="primary" size="default" @click="GetArticle">选择文章</el-button>
                    <el-button type="danger" size="default" @click="clear">清空输入</el-button>
                </el-button-group>
                <el-button class="settingtag" type="text" @click="showtag = true">设置标签</el-button>
            </div>
        </div>
        <hr width="100%">
        <hr style="float: left;margin-left: -14px;" size="30px" width="10px" color="#59D861">
        <div class="titaldiv">

            <el-input placeholder="请输入标题" v-model="articleInfo.title" clearable></el-input>
            <div style="width: 10px;"></div>
            <el-button type="primary" @click="releaseArticle(0)">发布文章</el-button>
            <el-button type="warning" @click="releaseArticle(1)">保存草稿</el-button>
        </div>
        <v-md-editor class="textdiv" v-model="articleInfo.detail" :disabled-menus="[]"
            left-toolbar="undo redo clear | h bold italic strikethrough quote | tip todo-list | ul ol table hr | link image code "
            height="80%" @upload-image="UploadImage"></v-md-editor>
    </el-card>
    <div>
        <el-drawer title="选择您的文章进行修改" v-model="showDrawer" direction="rtl" size="30%" :destroy-on-close="true"
            :show-close="true">
            <div>
                <el-card class="drawer_card" v-for="a in page.data" shadow="hover" :body-style="{ padding: '0px' }">
                    <template #header>
                        <div class="card-header">
                            <span>{{ a.title }}</span>
                            <div></div>
                            <el-button class="button" type="primary" text bg @click="select(a)">选择</el-button>
                        </div>
                    </template>
                    <div style="display:block;">
                        <v-md-preview class="textdiv" :text="a.detail" height="80%"></v-md-preview>
                    </div>
                </el-card>
                <el-pagination v-if="showDrawer" layout="prev, pager, next" :total="page.total" :page-size="page.pageSize"
                    :hide-on-single-page="false" :page-count="page.pageindex" />

            </div>
        </el-drawer>
    </div>
    <div>
        <el-drawer title="设置标签" v-model="showtag" direction="rtl" size="30%" :before-close="tagclose"
            :destroy-on-close="true" :show-close="true" :wrapperClosable="true">
            <el-autocomplete v-on:select="selecttag" value-key="tagName" v-model="tagtext" :fetch-suggestions="SearchTag"
                placeholder="Please input" />
            <el-button type="primary" size="default" @click="addtags">添加标签</el-button>

            <div style="margin-top: 40px;">
                <el-tag style="margin-left: 20px;" v-for="tag in tags" size="large" closable
                    @close="tags.splice(tags.indexOf(tag), 1)">{{ tag.tagName
                    }}</el-tag>
            </div>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="showtag = false">关闭</el-button>
                    <el-button type="primary" @click="savetag">保存</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>
    
<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { PictureClient, ArticleClient, TagsClient, type ArticleDTO, type PageDataOfArticleDTO, type TagInfo, type TagDTO } from '@/controller'
import { ElMessage, ElMessageBox, type Action } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
let timeout: any;
const route = useRoute()
const router = useRouter()
const TotlePage = ref(0)
const SearchTag = (queryString: string, cb: (arg: any) => void) => {
    clearTimeout(timeout)
    timeout = setTimeout(async () => {
        if (queryString) {
            cb((await ta.getByName(queryString)).data)
        }
        else {
            cb((await ta.getall()))
        }

    }, 300);
}
const selecttag = (item: TagDTO | any) => {
    if (tags.value.find(f => f.id == item.id)) {
        return;
    }
    tags.value.push({
        id: item.id,
        tagName: item.tagName
    })
}
const savetag = () => {
    articleInfo.tags = tags.value
    showtag.value = false
    ElMessage.success('保存成功')
}
const addtags = () => {
    if (tags.value.find(f => f.tagName == tagtext.value)) {
        return;
    }
    tags.value.push({
        id: undefined,
        tagName: tagtext.value
    })
}
const showDrawer = ref(false)
const showtag = ref(false);
const tagclose = (done: () => void) => {
    ElMessageBox.confirm('你确定要关闭吗，所做的更改不会被保存')
        .then(() => {
            done()
        })
}
const pic = new PictureClient()
const art = new ArticleClient()
const ta = new TagsClient()
const UploadImage = async (event: any, insertImage: any, files: (string | Blob)[]) => {
    const formData = new FormData();
    formData.append('files', files[0]);
    const res = await pic.upLoadArticleImg(formData);
    insertImage({
        url: 'http://127.0.0.1:32770/api/Picture/GetByPicName/' + res.data,
        width: 'auto',
        height: 'auto',
    })
}

const articleInfo = reactive<ArticleDTO>({
    id: undefined,
    title: '',
    detail: '',
    collection: 0,
    likeNumber: 0,
    userId: 0,
    changeTime: undefined,
    count: 0,
    status: 0,
    typeNumber: 0,
    isTop: false,
    tags: undefined,
    creatTime: new Date()
})
const tagtext = ref('')
const tags = ref<TagDTO[]>([])
const releaseArticle = async (status: number) => {
    if (!articleInfo.title) {
        ElMessage.warning('请填写标题');
        return;
    }
    articleInfo.status = status;
    articleInfo.tags = tags.value
    if (articleInfo.id == undefined) {
        const res = await art.addArticle(articleInfo).catch(err => {
            ElMessage.error("发布失败")
        })
        if (res) {
            ElMessage.success("成功")
            articleInfo.id = res
        }
    }
    else {
        const res = await art.changeArticle(articleInfo).catch(err => {
            ElMessage.error("发布失败")
        })
        if (res) {
            ElMessage.success("成功")
        }
    }
}
const page = reactive<PageDataOfArticleDTO>({
    pageindex: 1,
    pageSize: 20,
    data: [],
    total: 0
})
const GetArticle = async () => {
    const res = await art.getPersonalArticle(page.pageindex as number)
    page.data = res.data.data
    TotlePage.value = (page.total as number) / (page.pageSize as number)
    showDrawer.value = true;

}

const select = (a: ArticleDTO) => {
    router.push({
        name: 'release',
        params: {
            id: a.id
        }
    })
    articleInfo.id = a.id;
    articleInfo.title = a.title;
    articleInfo.detail = a.detail;
    articleInfo.userId = a.userId;
    showDrawer.value = false;
    articleInfo.tags = a.tags
    tags.value = JSON.parse(JSON.stringify(articleInfo.tags)) as TagInfo[];
}
onBeforeMount(async () => {
    if ((route.params.id as unknown as number) == 0)
        return;
    else {
        await art.getPersonalArticleById(route.params.id as unknown as number).then(res => {
            if (res.code == 200) {
                articleInfo.id = res.data.id;
                articleInfo.title = res.data.title;
                articleInfo.detail = res.data.detail;
                articleInfo.userId = res.data.userId;
                showDrawer.value = false;
                articleInfo.tags = res.data.tags
                tags.value = JSON.parse(JSON.stringify(articleInfo.tags)) as TagInfo[];
            }
            else {
                ElMessage.error(res.message)
            }
        })
    }
})
const clear = () => {
    ElMessageBox.alert('你确定要清空吗？（清空并不会删除文章）', '警告', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true,
        callback: (action: Action) => {
            if (action == 'confirm') {
                articleInfo.id = undefined;
                articleInfo.title = '';
                articleInfo.detail = '';
                articleInfo.tags = undefined;
                tags.value = JSON.parse(JSON.stringify(articleInfo.tags)) as TagInfo[];
            }
        },
    })

}
</script>
    
<style scoped>
.drawer_card {
    margin-bottom: 10px;
    max-height: 200px;
}

.cardhead {
    padding: 5px;
    display: flex;
}

.articlecard {
    margin: 5px;
    height: 98%;
}

.titaldiv {
    padding: 10px;
    display: flex;
}

.textdiv {
    width: 100%;
    height: 50%;
}

.headbuttongroup {
    margin-left: 50px;
}

.card-header {
    display: flex;
    height: 100%;
}

.settingtag {
    margin-left: 60px;
}
</style>
<style>
.el-card__body {
    height: 100%;
}
</style>

    