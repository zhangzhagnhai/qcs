<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  data:function(){
    return{
      titleMsg:"1"
    }
  },
  name: 'app',
  mounted () {
    const script = document.createElement('script')
    script.src = 'https://s4.cnzz.com/z_stat.php?id=1260141495&web_id=1260141495'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    '$route' () {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
        window._czc.push(['_trackEvent', '小说', '打分', '达芬奇密码','5','dafen']);
      }
    }
  }
}


</script>

<style>
</style>
