<template>
  <div id="textDiv" class="contain1">{{showText}}</div>
</template>

<script>
export default {
  name: "showText",
  props: {
    parentInput: "",
    parentInputUrl: "",
    showID: 0
  },
  data() {
    return {
      showText: ""
    };
  },
  created() {
    console.log("created showText ID: " + this.showID);
    // [註冊監聽事件]
    this.$bus.$on("textEvent" + this.showID, event => {
      this.showText = event;
      console.log("showText ID: " + this.showID);
    });
    console.log("send componentHandSharkEvent" + this.showID);
    this.$bus.$emit("componentHandSharkEvent", this.showID);
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("textEvent" + this.showID);
  },
  destroyed() {
        console.log("destroyed showText" + this.showID);
    this.$bus.$emit("destroyed", this.showID);
  }
};
</script>

<style scoped>
.contain1 {
  background: #fff;
  padding: 10px;
  border-radius: 20px;
  max-width: 260px;
  word-wrap: break-word; 
  /* word-break: break-all; */
  /* height: 10px; */
  /* width: 300px; */
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>