import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta: {
      withHeader: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'template/:id',
        name: 'Template',
        component: () => import('../views/TemplateDetail.vue')
      }
    ]
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () =>
      import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
