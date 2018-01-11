import Vue from 'vue'
import Router from 'vue-router'

import PageTransition from '@/components/PageTransition'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)

export default new Router({
  /*  mode:'history',*/
  /* scrollBehavior: () => ({ y: 0 }),*/
  routes: [
    {
      path: '/',
      name: 'PageTransition',
      component: PageTransition,
      children: [
        {
          path: '/hello',
          name: 'hello',
          component: resolve => require(['@/components/Hello.vue'], resolve)
        },
        {
          path: '/index',
          name: 'index',
          component:  resolve => require(['@/page/index.vue'], resolve)
        },{
          path: '/projectIndex',
          name: 'projectIndex',
          component:  resolve => require(['@/page/project/projectIndex.vue'], resolve)
        }, {
          path: '/projectMeetingList',
          name: 'projectMeetingList',
          component: resolve => require(['@/page/project/projectMeetingList.vue'], resolve)
        }, {
          path: '/projectList',
          name: 'projectList',
          component:  resolve => require(['@/page/project/projectList.vue'], resolve)
        }, {
          path: '/projectMeetingDetail',
          name: 'projectMeetingDetail',
          component: resolve => require(['@/page/project/projectMeetingDetail.vue'], resolve)
        }, {
          path: '/projectDetail',
          name: 'projectDetail',
          component:  resolve => require(['@/page/project/projectDetail.vue'], resolve)
        }, {
          path: '/projectCommentList',
          name: 'projectCommentList',
          component: resolve => require(['@/page/project/projectCommentList.vue'], resolve)
        }, {
          path: '/projectAttend',
          name: 'projectAttend',
          component: resolve => require(['@/page/project/projectAttend.vue'], resolve)
        }, {
          path: '/cityIndex',
          name: 'cityIndex',
          component:  resolve => require(['@/page/city/cityIndex.vue'], resolve)
        }, {
          path: '/cityMenu',
          name: 'cityMenu',
          component: resolve => require(['@/page/city/cityMenu.vue'], resolve)
        }, {
          path: '/activeDetail',
          name: 'activeDetail',
          component:  resolve => require(['@/page/city/activeDetail.vue'], resolve)
        }, {
          path: '/activeBaomingList',
          name: 'activeBaomingList',
          component:  resolve => require(['@/page/city/activeBaomingList.vue'], resolve)
        }, {
          path: '/newsDetail',
          name: 'newsDetail',
          component:  resolve => require(['@/page/city/newsDetail.vue'], resolve)
        }, {
          path: '/connectionDetail',
          name: 'connectionDetail',
          component:  resolve => require(['@/page/city/connectionDetail.vue'], resolve)
        },{
          path: '/memberDetail',
            name: 'memberDetail',
            component:  resolve => require(['@/page/city/memberDetail.vue'], resolve)
        },{
          path: '/addQcs',
          name: 'addQcs',
          component:  resolve => require(['@/page/city/addQcs.vue'], resolve)
        },{
          path: '/aboutDetail',
          name: 'aboutDetail',
          component:  resolve => require(['@/page/city/aboutDetail.vue'], resolve)
        }, {
          path: '/serviceIndex',
          name: 'serviceIndex',
          component:  resolve => require(['@/page/service/serviceIndex.vue'], resolve)
        },
        {
          path: '/investorList',
          name: 'investorList',
          component:   resolve => require(['@/page/service/investorList.vue'], resolve)
        }, {
          path: '/investorDetail',
          name: 'investorDetail',
          component:  resolve => require(['@/page/service/investorDetail.vue'], resolve)
        }, {
          path: '/selectProject',
          name: 'selectProject',
          component:  resolve => require(['@/page/service/selectProject.vue'], resolve)
        }, {
          path: '/thinkList',
          name: 'thinkList',
          component:  resolve => require(['@/page/service/thinkList.vue'], resolve)
        }, {
          path: '/thinkDetail',
          name: 'thinkDetail',
          component:  resolve => require(['@/page/service/thinkDetail.vue'], resolve)
        }, {
          path: '/personCenter',
          name: 'personCenter',
          component: resolve => require(['@/page/center/personCenter.vue'], resolve)
        },{
          path: '/personManager',
          name: 'personManager',
          component: resolve => require(['@/page/center/personManager.vue'], resolve)
        },{
          path: '/personNameEdit',
          name: 'personNameEdit',
          component: resolve => require(['@/page/center/personNameEdit.vue'], resolve)
        },{
          path: '/messageList',
          name: 'messageList',
          component: resolve => require(['@/page/center/messageList.vue'], resolve)
        },{
          path: '/messageSystem',
          name: 'messageSystem',
          component: resolve => require(['@/page/center/messageSystem.vue'], resolve)
        },{
          path: '/messagePerson',
          name: 'messagePerson',
          component: resolve => require(['@/page/center/messagePerson.vue'], resolve)
        },{
          path: '/connectionDisplay',
          name: 'connectionDisplay',
          component: resolve => require(['@/page/center/connectionDisplay.vue'], resolve)
        },{
          path: '/connectionEdit',
          name: 'connectionEdit',
          component: resolve => require(['@/page/center/connectionEdit.vue'], resolve)
        },{
          path: '/memberDisplay',
            name: 'memberDisplay',
            component: resolve => require(['@/page/center/memberDisplay.vue'], resolve)
        },{
          path: '/memberEdit',
            name: 'memberEdit',
            component: resolve => require(['@/page/center/memberEdit.vue'], resolve)
        },{
          path: '/register',
          name: 'register',
          component: resolve => require(['@/page/center/register.vue'], resolve)
        },{
          path: '/myInvestor',
          name: 'myInvestor',
          component: resolve => require(['@/page/center/myInvestor.vue'], resolve)
        },{
          path: '/myProject',
          name: 'myProject',
          component: resolve => require(['@/page/center/myProject.vue'], resolve)
        },{
          path: '/projectSubmit',
          name: 'projectSubmit',
          component: resolve => require(['@/page/center/projectSubmit.vue'], resolve)
        },{
          path: '/projectDisplay',
          name: 'projectDisplay',
          component: resolve => require(['@/page/center/projectDisplay.vue'], resolve)
        },{
          path: '/myProjectMeeting',
          name: 'myProjectMeeting',
          component: resolve => require(['@/page/center/myProjectMeeting.vue'], resolve)
        },{
          path: '/myActive',
          name: 'myActive',
          component: resolve => require(['@/page/center/myActive.vue'], resolve)
        },{
           path: '/vipIntroduce',
            name: 'vipIntroduce',
            component: resolve => require(['@/page/vip/vipIntroduce.vue'], resolve)
        },{
           path: '/vipSubmit',
            name: 'vipSubmit',
            component: resolve => require(['@/page/vip/vipSubmit.vue'], resolve)
        },{
            path: '/vipRules',
            name: 'vipRules',
            component: resolve => require(['@/page/vip/vipRules.vue'], resolve)
        },{
            path: '/vipSuccess',
            name: 'vipSuccess',
            component: resolve => require(['@/page/vip/vipSuccess.vue'], resolve)
        },{
          path: '/error',
          name: 'error',
          component: resolve => require(['@/page/error.vue'], resolve)
        },{
          path: '/*',
          name: 'projectIndexs',
          component: resolve => require(['@/page/project/projectIndex.vue'], resolve)
        }

      ]
    }]
})


