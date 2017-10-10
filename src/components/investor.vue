<template>
  <div>
      <div style="height: 1.55rem; padding:0.3rem 0.26rem">
        <div style="float:left;position: relative;">
          <span class="fs">{{investor.fenshe.name}}</span>
          <img :src="investor.image" class="img" :style="investType==1?'border-radius:50%':'border-radius:3px'">
          <div class="nav_right">
            <div class="nav_name">
              <div>{{investor.name}}</div>
            </div>
            <div class="summary">{{investor.motto}}</div>
            <div class="fkl">
              <span>投递数:</span><span class="num">{{investor.programs_count}}</span><span style="padding-left: 0.4rem">反馈率:</span><span class="num">{{investor.return_percent}}%</span>
             </div>
          </div>
        </div>
      </div>
      <div style="padding: 0 0.26rem;">
        <div class="fieldWord">
          <div class="field"><span class="fieldWordA">投资领域:</span><span class="fieldWordB">{{investor.invest_field}}</span></div>
          <div class="field"><span class="fieldWordA">投资案例:</span><span class="fieldWordB">{{investor.invest_case}}</span></div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    props: ['investor',"investType"],
    created(){
      if(!this.investor.fenshe)
        this.investor.fenshe={}
    }
  }
</script>
<style lang="scss" scoped>
  .img{width: 1.55rem; height: 1.55rem; float:left; border-radius: 3px;  border: 0.5px solid #efefef; box-sizing:border-box;}
  .nav_right{display:inline-block; float:left;height: 1.55rem; margin-left: 0.3rem}
  .nav_name{ height: 0.48rem; line-height: 0.48rem; font-size: 0.36rem; width: 5rem;overflow: hidden;}
  .nav_name div{float: left; color: #464c56;}
  .summary{font-size: 0.28rem; height: 0.6rem; line-height: 0.6rem; color:#6c747c; max-width: 5rem; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;}
  .fkl{font-size: 0.28rem; height: 0.28rem; line-height: 0.28rem; color: #969fa9; margin-top: 0.11rem;}
  .num{color: #4285F4; padding-left: 0.22rem;}

  .fs{position:absolute; right:0; top: 0; padding: 0.04rem 0.1rem; border: 0.5px solid #dddddd; border-radius: 3px; font-size: 0.24rem; color: #969fa9;}
  .fieldWord{border: 0.5px solid #dddddd; border-radius: 3px; padding:0.1rem 0.22rem; margin-bottom: 0.3rem;}
  .field{height:0.55rem; line-height:0.55rem; font-size: 0.28rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
  .fieldWordA{color: #969fa9; padding-right: 0.25rem;}
  .fieldWordB{ color: #464c56; max-width: 4.9rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
</style>
