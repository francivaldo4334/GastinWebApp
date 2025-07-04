import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HelpPage from '../views/HelpPage'
import ExpenditurePage from '../views/ExpenditurePage'
import ReceiptsPage from '../views/ReceiptsPage'
import AppLayout from '@/layouts/AppLayout';
import HomePage from '@/views/HomePage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', component: () => HomePage, name: "home" },
      { path: 'help', component: HelpPage, name: "help" },
      { path: 'categories', component: () => import("../views/CategoriesPage"), name: "categories" },
      { path: 'expenditures', component: ExpenditurePage, name: "expenditures" },
      { path: 'receipts', component: ReceiptsPage, name: "receipts" }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

    //   children: [
    //     {
    //       path: '',
    //       redirect: '/tabs/tab1'
    //     },
    //     {
    //       path: 'tab1',
    //       component: () => import('@/views/Tab1Page.vue')
    //     },
    //     {
    //       path: 'tab2',
    //       component: () => import('@/views/Tab2Page.vue')
    //     },
    //     {
    //       path: 'tab3',
    //       component: () => import('@/views/Tab3Page.vue')
    //     }
    //   ]
