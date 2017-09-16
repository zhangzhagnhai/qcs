<template>
  <div>
    <!--团队介绍-->
    <ul class="team_ul">
      <li v-for="(founder,founderIndex) in project.teams">
        <div class="teamContain">
          <div class="teamContain1" :style="founderIndex==project.teams.length-1?'border:none':''">
            <teamDisplay :founder="founder"></teamDisplay>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import teamDisplay from '../../components/teamDisplay'
  export default {
    data(){
      return {
        teamList:[{
          "img": "http://www.hcsoo.com/test/Public/upload/img/2017-04-02/58e06b412437e.jpg",
          "name": "林元杰",
          "duty": "资深技术开发经营      高级产品经理",
          "introduce": "温州攻城sdf狮科技负责人，有丰富的APP外包开发经验，资深技术、产品经理，负责聚e场APP推广、内容合作、活动策划等运营内容。"
        },
          {
            "img": "http://www.hcsoo.com/test/Public/upload/img/2017-04-02/58e06b412437e.jpg",
            "name": "林元杰",
            "duty": "资深技术开发经营      高级产品经理",
            "introduce": "温州攻城狮科技负责人，有丰富的APP外包开发经验，资深技术、产品经理，负责聚e场APP推广、内容合作、活动策划等运营内容。"
          }]
      }
    },
    props: ["project"],
    methods: {

    },
    components: {
      teamDisplay
    }
  }
</script>
<style scoped>
  .team_ul {
    display: inline-block;
  }

  .team_ul li {
    float: left;
    width: 100%
  }

  .teamContain {
    padding-left: 0.3rem;
  }

  .teamContain1 {
    border-bottom: 0.5px solid #d1d1d1;
  }
</style>
