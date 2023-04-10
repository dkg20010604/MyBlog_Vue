<template>
  <div style="width: 99%;">
    <!-- 作者信息区 -->
    <div style="display: flex;">

      <ArticleHeader v-if="ArticleInfo.userId && isfollow != null" :id="ArticleInfo?.userId as number"
        :isfollow="isfollow">
      </ArticleHeader>
    </div>
    <!-- 文档区 -->
    <div style="z-index: 200;background-color:white;">
      <el-row :gutter="10">
        <!-- 目录部分 -->
        <el-col :xs="24" :sm="24" :md="8" :lg="4" class="MdMenu">
          <div>
            <el-affix class="menus" target=".MdMenu" :offset="160">
              <div v-for="anchor in catalogue" :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                @click="scrollTop(anchor)">
                <a style="cursor: pointer;">{{ anchor.title }}</a>
              </div>
            </el-affix>
          </div>
        </el-col>
        <!-- md文件部分 -->
        <el-col :xs="24" :sm="24" :md="16" :lg="20" style="overflow: auto" ref="scrollOut">
          <v-md-preview :text="ArticleInfo?.detail" ref="preview"></v-md-preview>
          <el-tag style="margin-left: 50px;" v-for="tag in ArticleInfo?.tags" type="success" size="large" effect="dark"
            @close="">{{ tag.tagName }}</el-tag>

        </el-col>
      </el-row>
    </div>

    <!-- 点赞数、收藏数 -->
    <div class="Chart" style="z-index: 500;background-color:white;">
      <div class="Chart-good">
        <good-two class="icon-number" @click="goodclick" :theme="(good ? 'filled' : 'outline')" size="30"
          :fill="(good ? '#32a4e0' : '#000000')" :strokeWidth="3" />
        <p class="font-number">{{ ArticleInfo.likeNumber }}</p>
      </div>
      <div class="Chart-star">
        <star class="icon-number" @click="starclick" :theme="(stars ? 'filled' : 'outline')" size="30"
          :fill="(stars ? '#32a4e0' : '#000000')" :strokeWidth="3" />
        <p class="font-number">{{ ArticleInfo.collection }}</p>
      </div>
    </div>

    <!-- 发评论 -->

    <div class="Recommen" style="z-index: 500;position: relative;background-color:white;">
      <el-input v-model="writerComment.commentText" type="textarea" :show-word-limit="true" placeholder="写下你的评论"
        size="default" :row="3" clearable @change=""></el-input>
      <el-button style="margin-top: 8px;" type="primary" size="default" @click="sendcomment(false)">发送</el-button>
    </div>
    <!-- 看评论 -->
    <div style="z-index: 500;position: relative;background-color:white;">
      <CommentIndex v-if="comment?.length as number > 0" :comments="comment as CommentDTO[]" />
      <span class="com" v-else>还没有评论</span>
    </div>

  </div>
</template>
  
<script lang='ts' setup>
import { ArticleClient, CollectionAndLikeClient, FriendClient, CommentClient, type ArticleDTO, type CommentDTO } from '@/controller'
import { GoodTwo, Star } from '@icon-park/vue-next'
import { useRoute } from 'vue-router';
import ArticleHeader from '@/components/ArticleHeader.vue'
import CommentIndex from '@/components/CommentIndex.vue'
import { ElMessage } from 'element-plus';
const art = new ArticleClient()
const fir = new FriendClient();
const comm = new CommentClient();
const coll = new CollectionAndLikeClient()
const route = useRoute()

const writerComment = reactive<CommentDTO>({
  userId: 0,
  commentText: '',
})
// 发送评论按钮
const sendcomment = async (IsResponse: boolean, responseid?: number) => {
  writerComment.isResponse = IsResponse
  if (IsResponse) {
    writerComment.responseId = responseid
  }
  await comm.addComment(writerComment).then(data => {
    if (data.code == 200) {
      ElMessage.success('发送成功')
      writerComment.commentText = ''
    }
    else {
      ElMessage.error('发送失败')
    }
  })
  await getcomment();

}
const ArticleInfo = ref<ArticleDTO>({})

const isfollow = ref();
const good = ref(false)
const stars = ref(false)

const artId = route.params.id as string as unknown as number;
const preview = ref();
const comment = ref<CommentDTO[]>()
onBeforeMount(async () => {
  await getcomment();
})
const getcomment = async () => {
  ArticleInfo.value = (await art.getById(artId)).data;
  writerComment.articleId = artId
  stars.value = (await coll.isCollection(ArticleInfo.value.id as number)).data as boolean
  good.value = (await coll.islike(ArticleInfo.value.id as number)).data as boolean
  await loadFile()
  console.log(ArticleInfo.value);
  isfollow.value = (await fir.isFollow(ArticleInfo.value.userId as number)).data
  comment.value = (await comm.getComment(artId)).data
}
const catalogue: any = ref([]);

const loadFile = async () => {
  await nextTick();
  const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

  const titles = Array.from(anchors).filter(
    (title: any) => !!title.innerText.trim()
  );

  if (!titles.length) {
    catalogue.value = [];
    return;
  }

  const hTags = Array.from(
    new Set(titles.map((title: any) => title.tagName))
  ).sort();

  catalogue.value = titles.map((el: any) => ({
    title: el.innerText,
    lineIndex: el.getAttribute("data-v-md-line"),
    indent: hTags.indexOf(el.tagName),
  }));

};

// 定位内容
const scrollTop = (anchor: any) => {
  const { lineIndex } = anchor;
  console.log(lineIndex);
  console.log(preview.value);

  const heading = (preview.value.$el as HTMLElement).querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );
  console.log(heading);

  if (heading) {
    heading.scrollIntoView();
  }
}
const scrollOut = ref();

//点赞按钮
const goodclick = () => {
  if (!good.value) {
    coll.addlike(ArticleInfo.value.id as number).then(res => {
      if (res.code == 200) {
        ElMessage.success('点赞成功')
        good.value = !good.value
      }
      else {
        ElMessage.error(res.message)
      }
    }).catch(() => {
      ElMessage.error('点赞失败')
    })
  }
  else {
    coll.voidlike(ArticleInfo.value.id as number).then(res => {
      if (res.code == 200) {
        ElMessage.success('取消点赞成功')
        good.value = !good.value
      }
      else {
        ElMessage.success(res.message)
      }
    }).catch(() => {
      ElMessage.success('取消点赞失败')
    })
  }
}

//收藏按钮
const starclick = () => {
  if (!stars.value) {
    coll.addCollect(ArticleInfo.value.id as number).then(res => {
      if (res.code == 200) {
        ElMessage.success('点赞成功')
        stars.value = !stars.value
      }
      else {
        ElMessage.error(res.message)
      }
    }).catch(() => {
      ElMessage.error('取消点赞失败')
    })
  }
  else {
    coll.voidArt(ArticleInfo.value.id as number).then(res => {
      if (res.code == 200) {
        ElMessage.success('取消点赞成功')
        stars.value = !stars.value
      }
      else {
        ElMessage.error(res.message)
      }
    }).catch(() => {
      ElMessage.error('取消点赞失败')
    })
  }
}
onMounted(async () => {

})
</script >


<style scoped>
.MdMenu {
  overflow: auto;
}

.ArtView {
  display: flex;
  align-items: center;
  padding: 0;
}

.menu {
  width: 10%;
}

.textdiv {
  width: 100%;
  padding: 0;
}

.Chart {
  position: relative;
  display: flex;
  margin: auto;
}

.divpreview {
  align-items: center;
}

.Chart-good {
  padding: 20px;
  display: flex;
}

.Chart-star {
  padding: 20px;
  display: flex;
}

.font-number {
  font-size: 24px;
}

.icon-number {
  margin: auto;
}

.Recommen {
  padding: 10px;
  margin-top: 8px;
  z-index: 101;
}

.com {
  margin: auto;
  font-size: 20px;
  font-style: normal;
  font-family: 'Times New Roman', Times, serif;
}

.menus :hover {
  background-color: rgb(154, 154, 154);
}
</style>
