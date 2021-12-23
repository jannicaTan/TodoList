import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '@/views/TodoList'
import Tomato from '@/views/Tomato/Tomato'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path:'/tomato',
    name:"tomato",
    component:Tomato
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
