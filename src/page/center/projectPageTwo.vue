<template>
  <div>

     <draggable :list="userInfo.introduce" :options="{draggable:'.test'}">
           <div v-for="(item,index) in userInfo.introduce" style="padding: 0 0.26rem;"  class="test">
             <div style="position: absolute; height: 1rem; width: 6.98rem; z-index: 100000;"></div>
             <textarea v-if="item.type=='text'" class="companyContentx test" placeholder="添加文字内容" v-model="item.value"></textarea>

             <div v-if="item.type=='img'"
                  class="test" style="width: 6.98rem; margin: 0.3rem auto; border: 0.5px solid #c3ced9;border-radius: 3px;overflow: hidden;">
               <imageUpload
                 :ref="'pictureInput'+index"
                 @change="onChange(index,'pictureInput'+index)"
                 accept="image/jpeg,image/png"
                 size="10"
                 radius="0"
                 buttonClass="btn"
                 :customStrings="{ }"
                 :defaultImg="item.value?item.value:'static/wdxmtijiaoxiangmu.png'"
                 noCut="true"
                 style="overflow: hidden; margin: 0 auto; border-radius: 3px;"></imageUpload>
             </div>

             <div class="test" style="height: 0.4rem; font-size: 0px;">
               <img src="static/shanchu.png" class="delete" @click="deleteItem(index)" />
             </div>
           </div>
      <!--  <div v-for="(item,index) in userInfo.introduce" style="padding: 0 0.26rem;">

            <textarea v-if="item.type=='text'" class="companyContentx drag" placeholder="添加文字内容" v-model="item.value"></textarea>

            <div v-if="item.type=='img'"
                 class="drag" style="width: 6.98rem; margin: 0.3rem auto; border: 0.5px solid #c3ced9;border-radius: 3px;overflow: hidden;">
              <imageUpload
                :ref="'pictureInput'+index"
                @change="onChange(index,'pictureInput'+index)"
                accept="image/jpeg,image/png"
                size="10"
                radius="0"
                buttonClass="btn"
                :customStrings="{ }"
                :defaultImg="item.value?item.value:'/static/wdxmtijiaoxiangmu.png'"
                noCut="true"
                style="overflow: hidden; margin: 0 auto; border-radius: 3px;"></imageUpload>
            </div>

            <div style="height: 0.4rem; font-size: 0px;">
              <img src="static/shanchu.png" class="delete" @click="deleteItem(index)" />
            </div>
        </div>-->
  </draggable>

    <div style="height: 0.7rem; width: 6.98rem; margin: 0.3rem auto">
      <div class="addButton" @click="add('text')">
        <div style="display: inline-block"><span class="add">+</span><span>添加字体介绍</span>
        </div>
      </div>
      <div class="addButton" @click="add('img')" style="margin-left: 0.2rem">
        <div style="display: inline-block"><span class="add">+</span><span>添加图片</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import imageUpload from '../../components/imageUpload'
  import draggable from 'vuedraggable'
  export default {
    data(){
      return {
      }
    },
    props: ["userInfo"],
    methods: {
      onChange (index,name) {
        console.log('New picture selected!')
        if (this.$refs[name][0].image) {
          console.log(this.$refs[name][0].image)
          this.userInfo.introduce[index].value = this.$refs[name][0].image;
          this.userInfo.introduce[index].img=this.$refs[name][0].imgId;
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      add(str){
        console.log(this.userInfo.introduce)
         this.userInfo.introduce.push({type:str,value:''})
      },
      deleteItem(index){
        console.log(this.userInfo.introduce)
        this.userInfo.introduce.splice(index,1);
      }
    },
    components: {
      imageUpload,
      draggable
    }
  }
</script>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style scoped>
  .companyContentx {
    height: 2.2rem;
  }

  .addButton {
    box-sizing: border-box;
    width: 3.39rem;
    height: 0.7rem;
    font-size: 0;
    color: #4285F4;
    text-align: center;
    border: 0.5px solid #4285F4;
    border-radius: 3px;
    float: left;
  }

  .addButton span {
    height: 0.7rem;
    line-height: 0.7rem;
    float: left;
    font-size: 0.32rem
  }
  .addButton .add{
    font-size: 0.5rem; margin-top: -0.04rem; margin-right: 0.1rem;
  }
  .delete{display:inline-block; float: right; width: 0.9rem; height: 0.4rem; border-radius: 3px;}

</style>
