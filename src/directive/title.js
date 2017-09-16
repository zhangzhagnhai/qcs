import Vue from 'vue';

const title=Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  },
  update: function(el,binding){
    var changeTitle=$(el).attr("data-title");
    if(changeTitle&&changeTitle!="undefined"&&changeTitle!= document.title){
      document.title =$(el).attr("data-title");
      el.remove()
    }
    //根据获得的新值执行对应的更新
    //对于初始值也会调用一次
  }
})

export {title}
