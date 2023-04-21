import {
  createRouter,
  createWebHistory
} from 'vue-router'
import AccountsData from '../views/admin/AccountsData.vue'
import StaffData from '../views/admin/StaffData.vue'
import AllStoreList from '../views/admin/AllStoreList.vue'
import TemploraryPage from '../views/admin/TemploraryPage.vue'
const title = {
  component: StaffData,
};
const routes = [{
    path: '/:client?',
    redirect: {
      name: 'StaffData'
    }
  },
  {
    path: '/staffData/:client?',
    name: 'StaffData',
    component: title.component,

  },

  {
    path: '/accountsData/:client?',
    name: 'AccountsData',
    component: AccountsData,
    meta: {
      title: "",
      sub: ""
    },
  }, {
    path: '/allStoreList/:client?',
    name: 'AllStoreList',
    component: AllStoreList,
    meta: {
      title: "職員アカウント設定",
      sub: "職員マスタで登録済みの職員に対して、福祉見聞録システムを使用可能にするアカウント発行や、グランドメニューに表示するボタンの設定などができます。"

    },
  }, {
    path: '/temploraryPage',
    name: 'Temp',
    component: TemploraryPage,
    meta: {
      title: "temp",
      sub: "tempstr"

    },
  },
  // {
  //   path: '/aaa',
  //   name: 'home2',
  //   component: HomeView2
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router