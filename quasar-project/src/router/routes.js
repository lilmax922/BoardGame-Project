import MainLayout from 'src/layouts/MainLayout.vue'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          title: '差滴滴',
          login: false,
          admin: false
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: ErrorNotFound,
    meta: {
      title: '差滴滴 | 404',
      login: false,
      admin: false
    }
  },
  {
    path: '/:catchAll(.*)*',
    name: 'all',
    redirect: '/404'
  }
]

export default routes
