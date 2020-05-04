<template>
  <div
    id="my-strictly-unique-vue-upload-multiple-image"
    style="display: flex; justify-content: center;"
  >
    <el-popover
      @hide="getFlexButton"
      placement="right"
      title="編輯按鈕"
      width="260"
      hight="800"
      v-model="visible"
    >
      <hr>
      <div style="padding:5px">
        <p>按鈕文字</p>
        <el-input
          maxlength="10"
          show-word-limit
          v-model="btnNameInput"
          @change="getButtonName"
          @input="showButton"
        ></el-input>
      </div>
      <div style="padding:5px">
        <p>通知訊息</p>
        <el-input
          maxlength="10"
          show-word-limit
          v-model="btnInfoInput"
          @change="getButtonInfoMsg"
          placeholder="請輸入通知訊息"
        ></el-input>
      </div>
      <div style="text-align: left; margin: 0; padding:5px">
        <p>互動區塊</p>
        <el-radio v-model="button.radio" label="1">發送訊息</el-radio>
        <el-radio v-model="button.radio" label="2">開啟網頁</el-radio>
      </div>
      <div v-if="this.button.radio =='1'" style="padding:5px">
        <p>訊息</p>
        <el-input
          maxlength="30"
          show-word-limit
          v-model="btnMsgInput"
          @change="getButtonMsg"
          placeholder="請輸訊息"
          type="textarea"
        ></el-input>
      </div>
      <div v-if="this.button.radio =='2'" style="padding:5px">
        <p>URL</p>
        <el-input v-model="inputUrl" @change="getButtonURL" placeholder="請輸網址"></el-input>
      </div>
      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start;">
        <add-label @transferLabels="parentGetLeabels"></add-label>
        <el-button type="primary" size="mini" @click="visible = false">確定</el-button>
      </div>
      <el-button slot="reference">{{this.btnNameInput}}</el-button>
    </el-popover>
    <!-- <el-input v-model="input" placeholder="請輸入文字"></el-input>
    <el-input v-model="inputUrl" placeholder="請輸入網址"></el-input>-->
  </div>
</template>

<script>
import addLabel from "./addLabel";
export default {
  name: "addButtonText",
  props: {
    parentInput: "",
    parentInputUrl: "",
    btnIndex: 0,
    btnBackgroundIndex: 0,
    comID: 0,
    comIndex: 0
  },
  components: {
    addLabel
  },
  mounteds: {
    handleClose(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    }
  },
  data() {
    return {
      btnNameInput: "Button #" + this.btnIndex,
      btnInfoInput: "您有新訊息！",
      btnMsgInput: "",
      inputUrl: "",
      visible: false,
      button: {
        name: "Button #" + this.btnIndex,
        infoMsg: "您有新訊息！",
        radio: "1",
        Msg: "預設訊息",
        URL: "",
        tags: []
      }
    };
  },
  methods: {
    showButton() {
      this.$bus.$emit(
        "modifyButtonsTextEvevt" + this.comID + "_" + this.comIndex,
        this.btnNameInput,
        this.btnBackgroundIndex
      );
    },
    getFlexButton() {
      console.log("HIDE and btnBackgroundIndex: " + this.btnBackgroundIndex);
      console.log(this.button);
      this.$emit("getFlexButton", this.button, this.btnBackgroundIndex);
    },
    getButtonName() {
      this.button.name = this.btnNameInput;
      console.log("button.name: " + this.button.name);
    },
    getButtonInfoMsg() {
      this.button.infoMsg = this.btnInfoInput;
      console.log("button.infoMsg: " + this.button.infoMsg);
    },
    getButtonMsg() {
      this.button.Msg = this.btnMsgInput;
      console.log("button.Msg: " + this.button.Msg);
    },
    getButtonURL() {
      this.button.URL = this.inputUrl;
      console.log("button.URL: " + this.button.URL);
    },
    parentGetLeabels(labels) {
      this.button.tags = labels;
      console.log("button.tags: " + this.button.tags);
    }
  }
};
</script>

<style scoped>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#label {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: #9a9b9c;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
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