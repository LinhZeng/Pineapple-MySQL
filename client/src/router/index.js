import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Detail from '@/components/detail'
import Userinfo from '@/components/userinfo'
import Editinfo from '@/components/editinfo'
import Search from '@/components/search'
import Addpic from '@/components/addpic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: 'index',
      component: Index
    },
    {
      path:'detail',
      name:'detail',
      component:Detail
    },
    {
      path:'userinfo',
      name:'userinfo',
      component:Userinfo
    },
    {
      path:'editinfo',
      name:'editinfo',
      component:Editinfo
    },
    {
      path:'search',
      name:'search',
      component:Search
    },
    {
      path:'addpic',
      name:'addpic',
      component:Addpic
    },
  ]
})
