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
        component: () => import('src/pages/HomePage.vue'),
        meta: {
          title: '差滴滴',
          login: false,
          admin: false
        }
      },
      {
        path: 'exploreBG',
        name: 'ExploreBG',
        component: () => import('src/pages/ExploreBGPage.vue'),
        meta: {
          title: '差滴滴 | 探索桌遊'
        }
      },
      {
        path: 'event',
        name: 'Event',
        component: () => import('src/pages/EventPage.vue'),
        meta: {
          title: '差滴滴 | 本期EVENT'
        }
      },
      {
        path: '/reserve',
        name: 'Reserve',
        component: () => import('src/pages/ReservePage.vue'),
        meta: {
          title: '差滴滴 | 手刀預約'
        }
      },
      {
        path: 'teamup',
        name: 'TeamUp',
        component: () => import('src/pages/TeamUpPage.vue'),
        meta: {
          title: '差滴滴 | 揪團組隊'
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
