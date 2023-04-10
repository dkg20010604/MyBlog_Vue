import { createRouter, createWebHistory } from 'vue-router'
import { LoginClient } from '@/controller'
import { Login, Next } from '@icon-park/vue-next'

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
          name: 'viewpage',

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
router.beforeEach(async to => {
  // console.log(to.name);
  const l = new LoginClient()
  l.islogin().then(res => {
    if (res) {
      l.isAllow(to.name?.toString()).then(data=>{
        if(data.data){
          
        }
      })
    }
  }).catch((err)=>{
    console.log(err);
    
    router.replace('')
  })
})
export default router
