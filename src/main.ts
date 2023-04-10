import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import v3ImgPreview from 'v3-img-preview'
import 'element-plus/dist/index.css'
import '@icon-park/vue-next/styles/index.css'
import main from '@/App.vue'

/**
 * MarkDown插件
 */

//#region 编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
//#endregion

//#region 浏览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';


//#endregion

//提示插件
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
import '@kangc/v-md-editor/lib/plugins/tip/tip.css';

//代码行号
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

//代码高亮
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

//表情
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

//列表
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

//快捷复制
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

//对齐
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';


//数学公式
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';


VMdPreview.use(githubTheme, {
  Hljs: hljs,
  config: {
    toc: {
      includeLevel: [1, 2, 3, 4, 5, 6]
    }
  }
});
VMdPreview.use(createTipPlugin())
VMdPreview.use(createLineNumbertPlugin())
VMdPreview.use(createEmojiPlugin())
VMdPreview.use(createTodoListPlugin())
VMdPreview.use(createCopyCodePlugin())
VMdPreview.use(createAlignPlugin)
VMdPreview.use(createKatexPlugin())
VMdPreview.use(createHighlightLinesPlugin())


VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});
VueMarkdownEditor.use(createTipPlugin())
VueMarkdownEditor.use(createLineNumbertPlugin())
VueMarkdownEditor.use(createEmojiPlugin())
VueMarkdownEditor.use(createTodoListPlugin())
VueMarkdownEditor.use(createCopyCodePlugin())
VueMarkdownEditor.use(createAlignPlugin)
VueMarkdownEditor.use(createKatexPlugin())
VueMarkdownEditor.use(createHighlightLinesPlugin())
/**
 * 
 */

const app = createApp(main)

app.use(VMdPreview);
app.use(VueMarkdownEditor)

app.use(router)
app.use(v3ImgPreview, {
  keyboard: true,
  escClose: true,
  showToolbar: true
})
app.use(createPinia())
app.mount('#app')
