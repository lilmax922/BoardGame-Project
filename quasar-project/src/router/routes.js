import MainLayout from 'src/layouts/MainLayout.vue'
import ErrorNotFound from 'src/pages/ErrorNotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('src/pages/IndexPage.vue'),
        meta: {
          title: '差滴滴',
          login: false,
          admin: false
        }
      },
      {
        path: 'exploreBGs',
        name: 'exploreBGs',
        component: () => import('src/pages/frontPages/ExploreBGs.vue'),
        meta: {
          title: '差滴滴 | 探索桌遊'
        },
        children: [
          {
            path: 'BGInfo',
            name: 'BGInfo',
            component: () => import('src/pages/frontPages/BGInfoPage.vue'),
            meta: {
              title: '差滴滴 | 桌遊介紹'
            }
          }
        ]
      },
      {
        path: 'event',
        name: 'event',
        component: () => import('src/pages/frontPages/EventPage.vue'),
        meta: {
          title: '差滴滴 | 本期EVENT'
        }
      },
      {
        path: 'searchTeamups',
        name: 'searchTeamups',
        component: () => import('src/pages/frontPages/SearchTeamupsPage.vue'),
        meta: {
          title: '差滴滴 | 揪團組隊'
        },
        children: [
          {
            path: 'joinTeamups',
            name: 'joinTeamups',
            component: () => import('src/pages/frontPages/joinTeamupsPage.vue'),
            meta: [
              {
                title: '差滴滴 | 參加揪團'
              }
            ]
          },
          {
            path: 'teamup',
            name: 'teamup',
            component: () => import('src/pages/frontPages/TeamupPage.vue'),
            meta: [
              {
                title: '差滴滴 | 我要揪團'
              }
            ]
          }
        ]
      },
      {
        path: 'reservation',
        name: 'reservation',
        component: () => import('src/pages/frontPages/ReservationPage.vue'),
        meta: {
          title: '差滴滴 | 手刀預約'
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('src/layouts/AdminLayout.vue'),
    meta: {
      title: '差滴滴 | 管理者後台',
      login: true,
      admin: true
    },
    children: [
      {
        path: '',
        name: 'admin-Index',
        component: () => import('src/pages/admin/IndexPage.vue'),
        meta: {
          title: '差滴滴 | 後台管理'
        }
      },
      {
        path: 'manageBG',
        name: 'manageBG',
        component: () => import('src/pages/admin/ManageBG.vue'),
        meta: {
          title: '差滴滴 | 桌遊管理'
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
