<template>
  <div>
    <div class="images-preview" v-if="first">
      <div class="img-wrapper">
        <img :src="previewURL">
        <div class="black"></div>
        <i class="el-icon-video-play" v-if="imgURL" @click="clickPlay = true"></i>
      </div>
    </div>

    <video width="320" height="240" autoplay controls @ended="clickPlay = false" v-else-if="second">
      <source :src="imgURL" type="video/mp4">
    </video>

    <div class="images-preview" v-else>
      <i class="el-icon-video-play aaa"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "showVideo",
  props: {
    showID: 0,
    flexImageIndex: 0
  },
  computed: {
    first: function() {
      return this.previewURL && !this.clickPlay;
    },
    second: function() {
      return this.imgURL || this.clickPlay;
    }
  },
  data() {
    return {
      clickPlay: false,
      imgURL: "",
      previewURL: "",
      images: []
    };
  },
  created() {
    console.log("add video listener " + this.showID);

    this.$bus.$on("videoUrlEvent" + this.showID, event => {
      this.imgURL = event;
      // console.log(this.showID);
    });
    this.$bus.$on("vedioPreviewUrlEvent" + this.showID, event => {
      this.previewURL = event;
      this.clickPlay = false;
      // console.log(this.showID);
    });
        this.$bus.$emit("componentHandSharkEvent", this.showID);
  },
  beforeDestroy: function() {
    this.$bus.$off("videoUrlEvent" + this.showID);
    this.$bus.$off("vedioPreviewUrlEvent" + this.showID);
  },
  destroyed() {
    this.$bus.$emit("destroyed", this.showID);
  }
};
</script>

<style lang="scss" scoped>
.images-preview {
  background: rgb(245, 238, 238);
  // width: 160px;
  // height: 160px;
  border-radius: 15px 15px 15px 15px;
  // position: absolute;
  text-align: center;
  // overflow: hidden;
  .aaa {
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
    justify-content: center;
    align-items: center;
    //overflow: hidden;
    // background: #fff;
    position: relative;
    i {
      position: absolute;
      font-size: 40px;
      z-index: 10;
      color: rgb(209, 209, 209);
    }
    .black {
      width: 100%;
      height: 100%;
      background: rgb(29, 29, 29);
      position: absolute;
      border-radius: 15px 15px 15px 15px;
      opacity: 0.5;
    }
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
video {
  height: auto;
  max-width: 60%;
  border-radius: 15px 15px 15px 15px;
}
</style>