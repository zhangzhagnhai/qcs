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
          component: r => require.ensure([], () => r(require('@/components/Hello')), 'common')
        },
        {
          path: '/index',
          name: 'index',
          component: r => require.ensure([], () => r(require('@/page/index')), 'project')
        }, {
          path: '/projectIndex',
          name: 'projectIndex',
          component: r => require.ensure([], () => r(require('@/page/project/projectIndex')), 'project')
        }, {
          path: '/projectMeetingList',
          name: 'projectMeetingList',
          component: r => require.ensure([], () => r(require('@/page/project/projectMeetingList')), 'project')
        }, {
          path: '/projectList',
          name: 'projectList',
          component: r => require.ensure([], () => r(require('@/page/project/projectList')), 'project')
        }, {
          path: '/projectMeetingDetail',
          name: 'projectMeetingDetail',
          component: r => require.ensure([], () => r(require('@/page/project/projectMeetingDetail')), 'project')
        }, {
          path: '/projectDetail',
          name: 'projectDetail',
          component: r => require.ensure([], () => r(require('@/page/project/projectDetail')), 'project')
        }, {
          path: '/projectCommentList',
          name: 'projectCommentList',
          component: r => require.ensure([], () => r(require('@/page/project/projectCommentList')), 'project')
        }, {
          path: '/projectAttend',
          name: 'projectAttend',
          component: r => require.ensure([], () => r(require('@/page/project/projectAttend')), 'project')
        }, {
          path: '/cityIndex',
          name: 'cityIndex',
          component: r => require.ensure([], () => r(require('@/page/city/cityIndex')), 'city')
        }, {
          path: '/cityMenu',
          name: 'cityMenu',
          component: r => require.ensure([], () => r(require('@/page/city/cityMenu')), 'city')
        }, {
          path: '/activeDetail',
          name: 'activeDetail',
          component: r => require.ensure([], () => r(require('@/page/city/activeDetail')), 'city')
        }, {
          path: '/activeBaomingList',
          name: 'activeBaomingList',
          component: r => require.ensure([], () => r(require('@/page/city/activeBaomingList')), 'city')
        }, {
          path: '/newsDetail',
          name: 'newsDetail',
          component: r => require.ensure([], () => r(require('@/page/city/newsDetail')), 'city')
        }, {
          path: '/connectionDetail',
          name: 'connectionDetail',
          component: r => require.ensure([], () => r(require('@/page/city/connectionDetail')), 'city')
        }, {
          path: '/memberDetail',
          name: 'memberDetail',
          component: r => require.ensure([], () => r(require('@/page/city/memberDetail')), 'city')
        }, {
          path: '/addQcs',
          name: 'addQcs',
          component: r => require.ensure([], () => r(require('@/page/city/addQcs')), 'city')
        }, {
          path: '/aboutDetail',
          name: 'aboutDetail',
          component: r => require.ensure([], () => r(require('@/page/city/aboutDetail')), 'city')
        }, {
          path: '/serviceIndex',
          name: 'serviceIndex',
          component: r => require.ensure([], () => r(require('@/page/service/serviceIndex')), 'service')
        },
        {
          path: '/investorList',
          name: 'investorList',
          component: r => require.ensure([], () => r(require('@/page/service/investorList')), 'service')
        }, {
          path: '/investorDetail',
          name: 'investorDetail',
          component: r => require.ensure([], () => r(require('@/page/service/investorDetail')), 'service')
        }, {
          path: '/selectProject',
          name: 'selectProject',
          component: r => require.ensure([], () => r(require('@/page/service/selectProject')), 'service')
        }, {
          path: '/thinkList',
          name: 'thinkList',
          component: r => require.ensure([], () => r(require('@/page/service/thinkList')), 'service')
        }, {
          path: '/thinkDetail',
          name: 'thinkDetail',
          component: r => require.ensure([], () => r(require('@/page/service/thinkDetail')), 'service')
        }, {
          path: '/personCenter',
          name: 'personCenter',
          component: r => require.ensure([], () => r(require('@/page/center/personCenter')), 'center')
        }, {
          path: '/personManager',
          name: 'personManager',
          component: r => require.ensure([], () => r(require('@/page/center/personManager')), 'center')
        }, {
          path: '/personNameEdit',
          name: 'personNameEdit',
          component: r => require.ensure([], () => r(require('@/page/center/personNameEdit')), 'center')
        }, {
          path: '/messageList',
          name: 'messageList',
          component: r => require.ensure([], () => r(require('@/page/center/messageList')), 'center')
        }, {
          path: '/messageSystem',
          name: 'messageSystem',
          component: r => require.ensure([], () => r(require('@/page/center/messageSystem')), 'center')
        }, {
          path: '/messagePerson',
          name: 'messagePerson',
          component: r => require.ensure([], () => r(require('@/page/center/messagePerson')), 'center')
        }, {
          path: '/connectionDisplay',
          name: 'connectionDisplay',
          component: r => require.ensure([], () => r(require('@/page/center/connectionDisplay')), 'center')
        }, {
          path: '/connectionEdit',
          name: 'connectionEdit',
          component: r => require.ensure([], () => r(require('@/page/center/connectionEdit')), 'center')
        }, {
          path: '/memberDisplay',
          name: 'memberDisplay',
          component: r => require.ensure([], () => r(require('@/page/center/memberDisplay')), 'center')
        }, {
          path: '/memberEdit',
          name: 'memberEdit',
          component: r => require.ensure([], () => r(require('@/page/center/memberEdit')), 'center')
        }, {
          path: '/register',
          name: 'register',
          component: r => require.ensure([], () => r(require('@/page/center/register')), 'center')
        }, {
          path: '/myInvestor',
          name: 'myInvestor',
          component: r => require.ensure([], () => r(require('@/page/center/myInvestor')), 'center')
        }, {
          path: '/myProject',
          name: 'myProject',
          component: r => require.ensure([], () => r(require('@/page/center/myProject')), 'center')
        }, {
          path: '/myWallet',
          name: 'myWallet',
          component: r => require.ensure([], () => r(require('@/page/center/myWallet')), 'center')
        }, {
          path: '/BLPlan',
          name: 'BLPlan',
          component: r => require.ensure([], () => r(require('@/page/blPlan/BLPlan')), 'blPlan')
        }, {
          path: '/deposit',
          name: 'deposit',
          component: r => require.ensure([], () => r(require('@/page/center/deposit')), 'blPlan')
        }, {
          path: '/goodProject',
          name: 'goodProject',
          component: r => require.ensure([], () => r(require('@/page/blPlan/goodProject')), 'blPlan')
        }, {
          path: '/cooperationProject',
          name: 'cooperationProject',
          component: r => require.ensure([], () => r(require('@/page/blPlan/cooperationProject')), 'blPlan')
        }, {
          path: '/addBL',
          name: 'addBL',
          component: r => require.ensure([], () => r(require('@/page/blPlan/addBL')), 'blPlan')
        }, {
          path: '/projectSubmit',
          name: 'projectSubmit',
          component: r => require.ensure([], () => r(require('@/page/center/projectSubmit')), 'center')
        }, {
          path: '/projectDisplay',
          name: 'projectDisplay',
          component: r => require.ensure([], () => r(require('@/page/center/projectDisplay')), 'center')
        }, {
          path: '/myProjectMeeting',
          name: 'myProjectMeeting',
          component: r => require.ensure([], () => r(require('@/page/center/myProjectMeeting')), 'center')
        }, {
          path: '/myActive',
          name: 'myActive',
          component: r => require.ensure([], () => r(require('@/page/center/myActive')), 'center')
        }, {
          path: '/vipIntroduce',
          name: 'vipIntroduce',
          component: r => require.ensure([], () => r(require('@/page/vip/vipIntroduce')), 'vip')
        }, {
          path: '/vipSubmit',
          name: 'vipSubmit',
          component: r => require.ensure([], () => r(require('@/page/vip/vipSubmit')), 'vip')
        }, {
          path: '/vipRules',
          name: 'vipRules',
          component: r => require.ensure([], () => r(require('@/page/vip/vipRules')), 'vip')
        }, {
          path: '/secrecy',
          name: 'secrecy',
          component: r => require.ensure([], () => r(require('@/page/vip/secrecy')), 'vip')
        }, {
          path: '/vipSuccess',
          name: 'vipSuccess',
          component: r => require.ensure([], () => r(require('@/page/vip/vipSuccess')), 'vip')
        }, {
          path: '/error',
          name: 'error',
          component: r => require.ensure([], () => r(require('@/page/error')), 'common')
        }, {
          path: '/*',
          name: 'projectIndexs',
          component: r => require.ensure([], () => r(require('@/page/project/projectIndex')), 'project')
        }

      ]
    }]
})


