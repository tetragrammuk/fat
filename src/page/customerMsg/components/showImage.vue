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
    console.log(
      "addListen: " + "imageEvent" + this.showID + "_" + this.flexImageIndex
    );
    // [註冊監聽事件]
    this.$bus.$on(
      "imageEvent" + this.showID + "_" + this.flexImageIndex,
      event => {
        this.images = event;
        // console.log(this.showID);
      }
    );
    // [註冊監聽事件]
    this.$bus.$on(
      "imageUrlEvent" + this.showID + "_" + this.flexImageIndex,
      event => {
        this.imgURL = event;
        // console.log(this.showID);
      }
    );
    this.$bus.$emit("flexHandSharkEvent", this.showID, this.flexImageIndex - 1);
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("imageEvent" + this.showID + "_" + this.flexImageIndex);
    this.$bus.$off("imageUrlEvent" + this.showID + "_" + this.flexImageIndex);
  },
  // destroyed() {
  //   this.$bus.$emit("destroyed", this.showID);
  // }
};
</script>

<style lang="scss" scoped>
.images-preview {
  background: rgb(100, 100, 100);
  width: 160px;
  // max-height: 120px;
  border-radius: 10px 10px 0px 0px;
  // position: relative;
  text-align: center;
  // overflow: hidden;
  i {
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .img-wrapper {
    // width: 100%;
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
      height: auto;
      // position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border-radius: 10px 10px 0px 0px;
    }
  }

  .details {
    font-size: 12px;
    background: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    padding: 3px 6px;

    .name {
      overflow: hidden;
      height: 18px;
    }
  }
}
</style>