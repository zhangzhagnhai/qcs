// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
//import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import title from './directive/title.js';
import {host,strToJson} from './assets/js/util'
// 引入静态资源
//require('http://res.wx.qq.com/open/js/jweixin-1.0.0.js')
require(('./assets/css/fonts/icomoon.eot'))
require('./assets/css/index.css')
require('./assets/css/common.css')
require('./assets/css/style.css')
require('./assets/css/overlay.css')
import './assets/js/jquery.min.js';
import './assets/js/rem.js'
import './assets/js/overlay.js'
import weixin from './assets/js/wx.js'
import './assets/js/auth.js';
import loading from './components/loading'

$.getJSON(host+"/global/getFensheInfo").then(function (response) {
    console.log("fenshe init ok")
    window.fenshe=response;
    Vue.use(VueResource)
    Vue.use(VueLazyload)
    //Vue.use(VueAwesomeSwiper)
    /*const templateId='0791';*/
    Vue.prototype.loading=loading;
    Vue.http.options.emulateJSON = true;
    Vue.http.options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    /* eslint-disable no-new */
    var vue=new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })

    router.beforeEach((to, from, next) => {
      to.query.templateId =vue.$route.query.templateId?vue.$route.query.templateId:'0791';
      next();
    });
}).fail(function(){
    window.fenshe={}
    Vue.use(VueResource)
    Vue.use(VueAwesomeSwiper)
    /*const templateId='0791';*/

    Vue.http.options.emulateJSON = true;
    Vue.http.options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    /* eslint-disable no-new */
    var vue=new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })

    router.beforeEach((to, from, next) => {
      to.query.templateId =vue.$route.query.templateId?vue.$route.query.templateId:'0791';
      next();
    });
    console.log("初始化失败！！！！")
})

export default {
  created(){
    console.log(111)
  }
}
