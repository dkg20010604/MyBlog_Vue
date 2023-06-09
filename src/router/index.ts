import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/LoginView.vue'),
      name: 'login'
    },
    {
      path: '/Recover',
      component: () => import('@/views/RecoverPassWord.vue'),
      name: 'Recover',
    },
    {
      path: '/Recover/:token',
      component: () => import('@/views/RecoverPassWord.vue'),
      name: 'RecoverPass',
    },
    {
      path: '/Layout',
      component: () => import('@/views/LayoutView.vue'),
      name: 'layout',
      props: true,
      children: [
        {
          path: '/mypage',
          component: () => import('@/page/PersonPage.vue'),
          name: 'person'
        },
        {
          path: '/release/:id',
          component: () => import('@/page/Release.vue'),
          name: 'release',
        },
        {
          path: '/article/:id',
          component: () => import('@/page/ViewArticlePage.vue'),
          name: 'viewpage',

        },
        {
          path: '/search/:type/:pageIndex/:query',
          component: () => import('@/page/SearchRes.vue'),
          name: 'searchartticle'
        },
        {
          path: '/settings',
          component: () => import('@/page/SettingsPage.vue'),
          name: 'setting'
        },
        {
          path: '/picture',
          component: () => import('@/page/PictureGroup.vue'),
          name: 'picture',
        },
        {
          path: '/group/:id',
          component: () => import('@/page/ViewPicture.vue'),
          name: 'viewpicture'
        },

        {
          path: '/chat',
          component: () => import('@/page/Chat.vue'),
          name: 'chat'
        },
        {
          path: '/searchuser/:type/:pageIndex/:query',
          component: () => import('@/page/SearchUser.vue'),
          name: 'searchuser'
        },
        {
          path: '/articleview/:pageIndex/:userid',
          component: () => import('@/page/ArticleListPage.vue'),
          name: 'articleview'
        },
        {
          path: '/commentview/:type/:pageIndex',
          component: () => import('@/page/CommentListPage.vue'),
          name: 'commentview'
        },
        {
          path: '/hangfire',
          component: () => import('@/page/HangFirePage.vue'),
          name: 'hangfire'
        },
        {
          path: '/articlecollection/:pageIndex',
          component: () => import('@/page/ArticleCollection.vue'),
          name: 'articlecollection'
        },
        {
          path: '/adminuser/:pageIndex/:userType/:userStatus',
          component: () => import('@/AdminPage/AdminUser.vue'),
          name: 'adminuser'
        },
        {
          path: '/adminarticle/:pageIndex/:articleStatus',
          component: () => import('@/AdminPage/AdminArticle.vue'),
          name: 'adminarticle'
        },
        {
          path: '/admincomment/:pageIndex/:status',
          component: () => import('@/AdminPage/AdminComment.vue'),
          name: 'admincomment'
        },
        {
          path: '/customer/:id',
          component: () => import('@/page/CustomerPage.vue'),
          name: 'CustomerPage'
        }
      ]
    },
    {
      path: '/404',
      component: () => import('@/errorPage/404.vue'),
      name: '404'
    },
    {
      path: '/500',
      component: () => import('@/errorPage/500.vue'),
      name: '500'
    },
    {
      path: '/401',
      component: () => import('@/errorPage/401.vue'),
      name: '401'
    },
    {
      path: '/error',
      component: () => import('@/errorPage/Error.vue'),
      name: 'error'
    }
  ]
})
// router.beforeEach(async to => {
//   // console.log(to.name);
//   const l = new LoginClient()
//   l.islogin().then(res => {
//     if (res) {
//       l.isAllow(to.name?.toString()).then(data => {
//         if (data.data) {

//         }
//       })
//     }
//   }).catch((err) => {
//     console.log(err);

//     router.replace('')
//   })
// })
export default router
