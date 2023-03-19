<template>
  <div style="width: 99%;">
    <AH :id="ArticleInfo?.userId as number"></AH>
    <!-- 文档区 -->
    <div>
      <el-row :gutter="10">
        <!-- 目录部分 -->
        <el-col :xs="24" :sm="24" :md="8" :lg="4" class="MdMenu">
          <div>
            <div :style="{
              cursor: 'pointer',
              padding: '0 0 5px 0',
            }">
              <div v-for="item in catalogue" :key="item" class="list-group-item"
                :style="{ padding: `10px 0 10px ${item.indent * 20}px` }" @click="scrollTop(item)">
                <a>{{ item.title }}</a>
              </div>
            </div>
            <div v-for="anchor in catalogue" :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
              @click="scrollTop(anchor)">
              <a style="cursor: pointer">{{ anchor.title }}</a>
            </div>
          </div>


        </el-col>
        <!-- md文件部分 -->
        <el-col :xs="24" :sm="24" :md="16" :lg="20" :style="{
          overflow: auto,
        }" ref="scrollOut">
          <v-md-preview :text="ArticleInfo?.detail" ref="preview"></v-md-preview>
        </el-col>
      </el-row>
    </div>

    <!-- 点赞数、收藏数 -->
    <div class="Chart">
      <div class="Chart-good">
        <good-two class="icon-number" @click="good = !good" :theme="(good ? 'filled' : 'outline')" size="30"
          :fill="(good ? '#32a4e0' : '#000000')" :strokeWidth="3" />
        <p class="font-number">{{ 20 }}</p>
      </div>
      <div class="Chart-star">
        <star class="icon-number" @click="stars = !stars" :theme="(stars ? 'filled' : 'outline')" size="30"
          :fill="(stars ? '#32a4e0' : '#000000')" :strokeWidth="3" />
        <p class="font-number">{{ 16 }}</p>
      </div>
    </div>

    <!-- 发评论 -->
    <div class="Recommen">
      <el-input v-model="writerComment.commentText" placeholder="" size="default" clearable @change=""></el-input>
    </div>
    <!-- 看评论 -->
    <CommentIndex :comments="comment"></CommentIndex>
  </div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, reactive, ref, } from 'vue';
import { ArticleClient, CommentClient, type ArticleDTO, type CommentDTO } from '@/controller'
import { GoodTwo, Star } from '@icon-park/vue-next'
import CommentIndex from '@/components/CommentIndex.vue'
import { auto } from '@popperjs/core';
const AH = defineAsyncComponent(() =>
  import('@/components/ArticleHeader.vue')
)
const writerComment = reactive<CommentDTO>({
  userId: 0
})
const good = ref(false)
const stars = ref(false)
const art = new ArticleClient()
const ArticleInfo = ref<ArticleDTO>()
const preview = ref();
const comment = [{
  commend: 1,
  articleId: 1,
  userId: 7,
  commentText: '不定宽块级元素的居中方法有三种：第一种是加入table标签；第二种是设置display:inline方法，与第一种类似，显示类型设为行内元素，进行不定宽元素的属性设置；第三种方法是设置position:relative和left:50%，利用相对定位的方式，将元素向左偏移50%用以实现居中的目的',
  isResponse: false,
  likeCount: 19,
  status: 0,
  releaseTime: new Date(),
  children: [
    {
      commend: 2,
      articleId: 1,
      userId: 3,
      commentText: '这是第一条评论的回复',
      isResponse: true,
      responseId: 1,
      likeCount: 6,
      status: 0,
      releaseTime: new Date(),
    },
    {
      commend: 2,
      articleId: 1,
      userId: 3,
      commentText: '这是第一条评论的回复',
      isResponse: true,
      responseId: 1,
      likeCount: 6,
      status: 0,
      releaseTime: new Date(),
      children: [
        {
          commend: 2,
          articleId: 1,
          userId: 3,
          commentText: '这是第一条评论的回复的回复',
          isResponse: true,
          responseId: 1,
          likeCount: 6,
          status: 0,
          releaseTime: new Date(),
          children: [
            {
              commend: 2,
              articleId: 1,
              userId: 3,
              commentText: '这是第一条评论的回复的回复的回复',
              isResponse: true,
              responseId: 1,
              likeCount: 6,
              status: 0,
              releaseTime: new Date(),
            }
          ]
        }
      ]
    }
  ]
}] as CommentDTO[]
onBeforeMount(async () => {
  loadFile();
  sHeight.value = window.screen.height - 320 + "px";
})
const catalogue: any = ref([]);
const sHeight = ref("100px");

const loadFile = async () => {
  // 从接口获取文档内容，这部分省略了霍~
  ArticleInfo.value = await (await art.getById(1)).data;

  // 建目录
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
    // (preview.value.$el as HTMLElement).scrollBy({
    //   target: heading,
    //   scrollContainer: window,
    //   top: 60,
    // });
  }
}
const scrollOut = ref();
</script >
  
<style scoped>
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
</style>
