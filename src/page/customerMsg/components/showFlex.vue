<template>
  <div style="display: flex;flex-wrap: nowrap;flex-direction: row;">
    <div class="containFlex" style="display: flex;flex-wrap: nowrap;flex-direction: column;">
      <show-image :showID="showID" :flexImageIndex="showIndex"></show-image>
      <!-- <div class="images-preview">
        <i class="el-icon-picture"></i>
        <div class="img-wrapper" v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="`Image Uplaoder ${index}`">
        </div>
      </div>-->
      <div class="text-wrapper">
        <div class="textContain">{{showTitle}}</div>
        <div class="textContain">{{showText}}</div>
        <div class="buttonContain" :key="btn" v-for="btn in showButtonTextList">{{btn}}</div>
      </div>
    </div>
    <div class="space"></div>
  </div>
</template>

<script>
import showImage from "./showImage";

export default {
  name: "showFlex",
  components: {
    showImage
  },
  props: {
    showID: 0,
    showIndex: 0
  },
  data() {
    return {
      showTitle: "",
      showText: "",
      images: [],
      showButtonTextList: ["Button #1"]
    };
  },
  created() {
    console.log(
      "addListen: " + "flexTitleEvent" + this.showID + "_" + this.showIndex
    );
    // [註冊監聽事件]
    this.$bus.$on(
      "flexTitleEvent" + this.showID + "_" + this.showIndex,
      event => {
        this.showTitle = event;
        console.log("showTitle :" + this.showTitle);
      }
    );
    // [註冊監聽事件]
    this.$bus.$on(
      "flexTextEvent" + this.showID + "_" + this.showIndex,
      event => {
        this.showText = event;
        console.log("showText :" + this.showText);
      }
    );
    // [註冊監聽事件]
    this.$bus.$on(
      "modifyButtonsTextEvevt" + this.showID + "_" + this.showIndex,
      (event, index) => {
        this.showButtonTextList.splice(index, 1, event);
        console.log("showButtonsTextEvevt :");
        console.log(this.showButtonTextList);
      }
    );
    // [註冊監聽事件]
    this.$bus.$on(
      "showButtonsTextEvevt" + this.showID + "_" + this.showIndex,
      event => {
        this.showButtonTextList = [];
        this.showButtonTextList = event;
        console.log("showButtonsTextEvevt :");
        console.log(this.showButtonTextList);
      }
    );
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("flexTitleEvent" + this.showID + "_" + this.showIndex);
    this.$bus.$off("flexTextEvent" + this.showID + "_" + this.showIndex);
    this.$bus.$off(
      "modifyButtonsTextEvevt" + this.showID + "_" + this.showIndex
    );
    this.$bus.$off("showButtonsTextEvevt" + this.showID + "_" + this.showIndex);
  }
};
</script>

<style lang="scss" scoped>
.containFlex {
  //background: #fff;
  // padding: 10px;
  border-radius: 30px;
  /* height: 10px; */
  /* width: 300px; */
}
.space {
  padding: 5px;
}
.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  width: 160px;
  //height: 63px;

  border-radius: 0px 0px 10px 10px;
  .textContain {
    padding: 2px;
    //width: 100%;
    //word-break: break-all;
    word-wrap: break-word; 
  }
  .buttonContain {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(12, 66, 136);
    width: 145px;
    height: 28px;
    padding: 2px;
    background: rgb(68, 211, 116);
    border-radius: 8px;
    margin-bottom: 4px;
  }
}
// .images-preview {
//   background: rgb(100, 100, 100);
//   width: 160px;
//   height: 120px;
//   border-radius: 10px 10px 0px 0px;
//   position: relative;
//   text-align: center;
//   overflow: hidden;
//   i {
//     font-size: 30px;
//     margin-top: 50px;
//   }
//   .img-wrapper {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     // margin: 10px;
//     height: 100%;
//     justify-content: space-between;
//     //overflow: hidden;
//     // background: #fff;

//     img {
//       max-width: 100%;
//       width: auto;
//       height: auto;
//       position: absolute;
//       top: 0;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       //margin: auto;
//       border-radius: 10px 10px 0px 0px;
//     }
//   }

//   .details {
//     font-size: 12px;
//     background: #fff;
//     color: #000;
//     display: flex;
//     flex-direction: column;
//     align-items: self-start;
//     padding: 3px 6px;

//     .name {
//       overflow: hidden;
//       height: 18px;
//     }
//   }
// }
</style>