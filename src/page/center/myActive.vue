<template>
  <div>
    <div v-title data-title="已报名活动">
      已报名活动
    </div>

    <ul>
      <li v-for="active in activeList">
        <router-link :to="{name:'activeDetail',query:{id:active.id}}">
          <div class="imgContainer">
            <img :src="active.image"/>
            <div class="statusBG"></div>
            <div class="status">{{active.act_statusString}}</div>
          </div>

          <div class="right">
            <div class="rightName">{{active.title}}</div>
            <div class="rightItem">
              <img src="../../assets/images/riqi.png">
              <span class="iconFont">{{active.start_time | formatDate}} 至 {{active.end_time | formatDate}}</span>
            </div>
            <div class="rightItem">
              <img src="../../assets/images/dizhi.png">
              <span class="iconFont">{{active.city_str}}<span>{{active.county_str}}</span></span>
              <span class="iconFont" style="float: right; color: #4285F4;">{{active.price?'￥'+active.price:'免费'}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <div v-if="activeList.length==0">
      <img src="static/x.png" style="width: 3.27rem" class="noDataImg">
      <div class="noDataFont">还没有参加过任何活动呢~</div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../assets/js/date.js';
  import {host} from '../../assets/js/util'
  export default{
    data(){
      return {
        activeList: [],
        actives: {
          addTime: 1500608590000
        }
      }
    }, mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    }, methods: {
      getData(){
        var _this = this;
        _this.$emit("loading",true);
        $.getJSON(host + "/center/centerJoinActivity", {id: this.id}).then(function (response) {
          _this.activeList = response.activity;
          for(var i=0;i< _this.activeList.length;i++){
            switch(_this.activeList[i].act_status){
              case 0:
                _this.activeList[i].act_statusString="未开始";
                break;
              case 1:
                _this.activeList[i].act_statusString="进行中";
                break;
              case 2:
                _this.activeList[i].act_statusString="已结束";
                break;
            }
          }
          _this.$emit("loading",false);
        })
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "MM-dd hh:mm");
      }
    }
  }
</script>
<style src="../../assets/css/myProjectMeeting.css" scoped>
</style>
<style scoped></style>
