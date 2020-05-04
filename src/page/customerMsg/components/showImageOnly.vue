<template>
  <div class="images-preview">
    <div v-if="images.length != 0">
      <div class="img-wrapper" v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="`Image Uplaoder ${index}`">
      </div>
    </div>
    <div v-else-if="imgURL">
      <div class="img-wrapper">
        <img :src="imgURL">
      </div>
    </div>
    <div v-else>
      <i class="el-icon-picture"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "showImage",
  props: {
    showID: 0,
    flexImageIndex: 0
  },
  data() {
    return {
      imgURL: "",
      images: []
    };
  },
  created() {
    console.log("addListen: " + "imageEvent" + this.showID);
    // [註冊監聽事件]
    this.$bus.$on("imageEvent" + this.showID, event => {
      this.images = event;
      // console.log(this.showID);
    });
    // [註冊監聽事件]
    this.$bus.$on("imageUrlEvent" + this.showID, event => {
      this.imgURL = event;
      // console.log(this.showID);
    });
    console.log("send componentHandSharkEvent" + this.showID);
    this.$bus.$emit("componentHandSharkEvent", this.showID);
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("imageEvent" + this.showID);
    this.$bus.$off("imageUrlEvent" + this.showID);
  },
  destroyed() {
    this.$bus.$emit("destroyed", this.showID);
  }
};
</script>

<style lang="scss" scoped>
.images-preview {
  background: rgb(100, 100, 100);
  // width: 160px;
  // height: 160px;
  border-radius: 15px 15px 15px 15px;
  // position: absolute;
  text-align: center;
  // overflow: hidden;
  i {
    font-size: 40px;
    // margin-top: 60px;
    margin: 10px;
  }
  .img-wrapper {
    // width: 100%;
    width: 160px;
    display: flex;
    flex-direction: column;
    // margin: 10px;
    // height: 100%;
    justify-content: space-between;
    //overflow: hidden;
    // background: #fff;

    img {
      // max-width: 100%;
      width: 100%;
      // width: auto;
      height: auto;
      // po/sition: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border-radius: 15px 15px 15px 15px;
      // background-size: cover;
    // background-position: center 0;
    }
  }

}
</style>