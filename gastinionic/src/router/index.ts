import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage'
import HelpPage from '../views/HelpPage'
import CategoriesPage from '../views/CategoriesPage'
import ExpenditurePage from '../views/ExpenditurePage'
import ReceiptsPage from '../views/ReceiptsPage'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomePage },
  { path: '/help', component: HelpPage },
  { path: "/categories", component: CategoriesPage },
  { path: "/expenditures", component: ExpenditurePage },
  { path: "/receipts", component: ReceiptsPage }
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
