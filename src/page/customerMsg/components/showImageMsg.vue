<template>
  <div class="images-preview">
    <i class="el-icon-picture"></i>
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
    <div
      class="clickbox"
      v-for="(item, index) in rect"
      :key="index"
      :style="item.style"
      @click="reply(index)"
    ></div>
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
      images: [],
      rect: []
    };
  },
  methods:{
    reply(index){
      if(this.rect[index].radio=="1"){
        console.log("transferImagemapReply " + this.rect[index].text);
        this.$emit("transferImagemapReply", this.rect[index].text);
      }
    }
  },
  created() {
    console.log("addListen: " + "imageMsgEvent" + this.showID);
    // [註冊監聽事件]
    this.$bus.$on("imageMsgClickRectEvent" + this.showID, event => {
      var i;
      // for (i = 0; i < event.length; i++) this.rect[i] = event[i];
      this.rect = JSON.parse(JSON.stringify(event));
      for (i = 0; i < this.rect.length; i++) {
        this.rect[i].style.left =
          ((this.rect[i].position.x / 400) * 280).toString() + "px";
        this.rect[i].style.top =
          ((this.rect[i].position.y / 400) * 280).toString() + "px";
        this.rect[i].style.width =
          ((this.rect[i].position.width / 400) * 280).toString() + "px";
        this.rect[i].style.height =
          ((this.rect[i].position.height / 400) * 280).toString() + "px";
      }
      console.log("showImgMsg rect")
      console.log(this.rect)
    });

    // [註冊監聽事件]
    this.$bus.$on("imageMsgEvent" + this.showID, event => {
      this.images = event;
      // console.log(this.showID);
    });
    // [註冊監聽事件]
    this.$bus.$on("imageMsgUrlEvent" + this.showID, event => {
      this.imgURL = event;
      console.log("UUURRRLLL "+this.imgURL);
      console.log("UUURRRLLL "+event);
    });
    console.log("send componentHandSharkEvent" + this.showID);
    this.$bus.$emit("componentHandSharkEvent", this.showID);
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("imageMsgEvent" + this.showID);
    this.$bus.$off("imageMsgUrlEvent" + this.showID);
    this.$bus.$off("imageMsgClickRectEvent" + this.showID);
  },
  destroyed() {
    this.$bus.$emit("destroyed", this.showID);
  }
};
</script>

<style lang="scss" scoped>
.clickbox {
  // display: flex;
  // flex-direction: row;
  // justify-content: flex-end;
  // align-items: flex-end;
  position: absolute;
  background: rgb(215, 240, 221);
  border: 1px dashed #0f0f0f;
  opacity: 0.5;
  z-index: 6;
  cursor: pointer;
}
.clickbox:hover {
  // opacity: 0.8;
  background: rgb(235, 243, 127);
}

.images-preview {
  background: rgb(100, 100, 100);
  width: 280px;
  height: 280px;
  border-radius: 20px 20px 20px 20px;
  position: relative;
  text-align: center;
  overflow: hidden;
  i {
    font-size: 50px;
    margin-top: 100px;
  }
  .img-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    // margin: 10px;
    height: 100%;
    justify-content: space-between;
    //overflow: hidden;
    // background: #fff;

    img {
      max-width: 100%;
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      //margin: auto;
      border-radius: 20px 20px 20px 20px;
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