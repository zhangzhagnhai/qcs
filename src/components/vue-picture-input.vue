<template>
  <div class="hello">
    <picture-input
      ref="pictureInput"
      @change="onChange"
      accept="image/jpeg,image/png"
      size="10"
      radius="50"
      buttonClass="btn"
      defaultImg="http://www.hcsoo.com/test/Public/upload/img/2017-06-23/594cebb4434bb.jpg"
      :customStrings="{ }">
    </picture-input>
  </div>
</template>
<script>
  import PictureInput from 'vue-picture-input'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
    components: {
      PictureInput
    },
    methods: {
      onChange () {
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          console.log(this.$refs.pictureInput)
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      }
    }
  }
</script>
