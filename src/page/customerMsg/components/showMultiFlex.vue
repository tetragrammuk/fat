<template>
  <div
    style="position: relative;display: flex; justify-content: space-between; align-items: center;"
    @mouseenter="opacity = {
        'opacity':'1'
      }"
    @mouseleave="opacity = {
        'opacity':'0'
      }"
  >
    <!-- <el-scrollbar> -->
    <div class="arrow" :style="opacity">
      <el-button type="info" icon="el-icon-arrow-left" circle @click="MoveLeft"></el-button>
      <el-button type="info" icon="el-icon-arrow-right" circle @click="MoveRight"></el-button>
      <!-- <i class="el-icon-document-copy icon" @mousedown="MoveLeft"></i>
      <i class="el-icon-document-copy icon" @mousedown="MoveRight"></i> -->
    </div>

    <div
      class="test"
      style="overflow:hidden; width: 280px; display: flex; flex-wrap: nowrap; align-items: flex-start;"
    >
      <div class="slideContain" :style="position">
        <show-flex
          :key="flexIndex"
          :showID="showID"
          :showIndex="flexIndex"
          v-for="flexIndex in flexList"
        ></show-flex>
      </div>
    </div>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import showFlex from "./showFlex";
export default {
  name: "showMultiFlex",
  components: {
    showFlex
  },
  props: {
    showID: 0
  },
  data() {
    return {
      showArrow: false,
      position: {
        "margin-left": "0px"
      },
      opacity:{
        'opacity':'0'
      },
      marginValue: 0,
      flexCnt: 1,
      flexCntLimit: 5,
      flexList: [1]
    };
  },
  methods: {
    destroyElement() {
      // Destroy method
      console.log("destroy showMultiFlex ID: " + this.showID);
      this.$destroy();
    },
    MoveLeft() {
      if (this.marginValue != 0) {
        this.marginValue += 85;
      }

      this.position = {
        "margin-left": this.marginValue.toString() + "px"
      };
    },
    MoveRight() {
      if (
        this.marginValue != (this.flexList.length - 1) * -170 + 85 &&
        this.flexList.length != 1
      ) {
        this.marginValue -= 85;
      }
      this.position = {
        "margin-left": this.marginValue.toString() + "px"
      };
    }
  },
  created() {
    console.log("created showMultiFlex ID: " + this.showID);
    // [註冊監聽事件]
    this.$bus.$on("specialEvent" + this.showID, (index, event) => {
      this.flexList = event;
      console.log("receive showMultiFlex ID: " + this.showID);
      console.log("receive flexList: " + this.flexList);
    });
    console.log("send componentHandSharkEvent" + this.showID);
    this.$bus.$emit("componentHandSharkEvent", this.showID);
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("specialEvent" + this.showID);
    console.log("beforeDestroy showMultiFlex ID: " + this.showID);
  },
  destroyed() {
    console.log("destroyed showMultiFlex ID: " + this.showID);

    this.$bus.$emit("destroyed", this.showID);
  }
};
</script>

<style lang="scss" scoped>
@import "../width.css";

/* .test /deep/ .el-scrollbar__wrap {
  overflow-x: default;
  overflow-y: hidden;
} */
.arrow {
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 1;
  top: 42%;
  left: -10px;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  i {

  }
}

.slideContain {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
</style>