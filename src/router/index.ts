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
          path: '/release',
          component: () => import('@/page/Release.vue'),
          name: 'release',
        },
        {
          path: '/article/:id',
          component: () => import('@/page/ViewArticlePage.vue'),
          name: 'viewpage'
        },
        {
          path: '/search',
          component: () => import('@/page/SearchRes.vue'),
          name: 'searchartticle'
        },
        {
          path: '/settings',
          component: () => import('@/page/SettingsPage.vue'),
          name: 'setting'
        }
      ]
    }
    // {
    //   path:'/404',
    //   component:''
    // },
    // {
    //   path:'/500',

    // }
  ]
})
router.beforeEach(async to => {
  console.log(to.name);

})
export default router
