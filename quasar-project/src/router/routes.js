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
          title: '差滴滴 | 探索桌遊',
          login: false,
          admin: false
        }

      },
      {
        path: 'BGInfo/:id',
        name: 'BGInfo',
        component: () => import('src/pages/frontPages/BGInfoPage.vue'),
        meta: {
          title: '差滴滴 | 桌遊介紹',
          login: false,
          admin: false
        }
      },
      {
        path: 'event',
        name: 'event',
        component: () => import('src/pages/frontPages/EventPage.vue'),
        meta: {
          title: '差滴滴 | 本期EVENT',
          login: false,
          admin: false
        }
      },
      {
        path: 'searchTeamups',
        name: 'searchTeamups',
        component: () => import('src/pages/frontPages/SearchTeamupsPage.vue'),
        meta: {
          title: '差滴滴 | 揪團組隊'
        }
      },
      {
        path: 'joinTeamups/:id',
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
      },
      {
        path: 'reservation',
        name: 'reservation',
        component: () => import('src/pages/frontPages/ReservationPage.vue'),
        meta: {
          title: '差滴滴 | 手刀預約',
          login: true,
          admin: false
        }
      }
      // {
      //   path: 'myReservation',
      //   name: 'myReservation',
      //   component: () => import('src/pages/layout/MemberLayout.vue'),
      //   meta: {
      //     title: '差滴滴 | 我的預約',
      //     login: true,
      //     admin: false
      //   }
      // }
    ]
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('src/layouts/MemberLayout.vue'),
    meta: {
      title: '差滴滴 | 我的主頁',
      login: true,
      admin: false
    },
    children: [
      {
        path: 'myInfo',
        name: 'myInfo',
        component: () => import('src/pages/member/MyInfo.vue'),
        meta: {
          title: '差滴滴 | 會員資料',
          login: true,
          admin: false
        }
      },
      {
        path: 'myReservation',
        name: 'myReservation',
        component: () => import('src/pages/member/MyReservation.vue'),
        meta: {
          title: '差滴滴 | 我的預約',
          login: true,
          admin: false
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
          title: '差滴滴 | 後台管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'manageAccount',
        name: 'manageAccount',
        component: () => import('src/pages/admin/ManageAccount.vue'),
        meta: {
          title: '差滴滴 | 帳號管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'manageReservation',
        name: 'manageReservation',
        component: () => import('src/pages/admin/ManageReservation.vue'),
        meta: {
          title: '差滴滴 | 預約管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'manageTeamup',
        name: 'manageTeamup',
        component: () => import('src/pages/admin/ManageTeamup.vue'),
        meta: {
          title: '差滴滴 | 揪團管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'manageEvent',
        name: 'manageEvent',
        component: () => import('src/pages/admin/ManageEvent.vue'),
        meta: {
          title: '差滴滴 | 活動管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'manageBG',
        name: 'manageBG',
        component: () => import('src/pages/admin/ManageBG.vue'),
        meta: {
          title: '差滴滴 | 桌遊管理',
          login: true,
          admin: true
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
