import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        meta: { title: '欢迎来到德莱联盟' },
        component: () => import('../views/Home.vue')
      },
      {
        path: 'template/:id',
        name: 'Template',
        meta: { title: '模板详情' },
        component: () => import('../views/TemplateDetail.vue')
      }
    ]
  },
  {
    path: '/editor',
    name: 'Editor',
    meta: {
      requiredLogin: true,
      title: '编辑我的设计'
    },
    component: () =>
      import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
