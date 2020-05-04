<template>
  <div
    class="fillcontain"
    style="display: flex;flex-wrap: nowrap;flex-direction: column; justify-content: center; align-items: flex-start;"
  >
    <div class="contain" ref="contain">
      <div style="display: flex;flex-direction: row; align-items: flex-start;">
        <image-uploader :comID="comID" :flexImageIndex="comIndex"></image-uploader>
        <i class="el-icon-delete-solid delete-icon" @click="deleteFlex(deleteIndex)"></i>
      </div>
      <el-divider></el-divider>
      <div class="sharedWidth">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="title">
            <el-input
              v-model="form.title"
              @input="showTitle"
              @change="getFlexTitle"
              placeholder="請輸入標題"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item prop="text">
            <el-input
              v-model="form.text"
              @input="showText"
              @change="getFlexText"
              placeholder="請輸入敘述"
              maxlength="50"
              rows=3
              :autosize="{ minRows: 3, maxRows: 3 }"
              show-word-limit
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <ul>
        <li v-bind:key="button" v-for="(button, index) in buttonList">
          <div
            style="display: flex;flex-wrap: nowrap;flex-direction: row; justify-content: flex-start; align-items: center;"
          >
            <add-button-text
              class="sharedWidth"
              :comID="comID"
              :comIndex="comIndex"
              @getFlexButton="parentGetFlexButton"
              :btnIndex="button"
              :btnBackgroundIndex="index"
            ></add-button-text>
            <i class="el-icon-delete-solid delete-icon" @click="deleteButton(index)"></i>
          </div>
        </li>
      </ul>
      <el-button class="sharedWidth addButton" @click="addButton">+ 增加按鈕</el-button>
    </div>
  </div>
</template>

<script>
import * as mutils from "@/utils/mUtils";
import imageUploader from "./imageUploader";
import addButtonText from "./addButtonText";
import axios from "axios";

export default {
  name: "flex",
  props: {
    comIndex: 0,
    comID: 0,
    deleteIndex:0
  },
  data() {
    var titleCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入標題"));
      } else {
        return callback();
      }
    };
    var textCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入敘述"));
      } else {
        return callback();
      }
    };
    return {
      resLink: "",
      empty: "",
      buttonCntLimit: 5,
      buttonList: [1],
      buttonTextList: ["Button #1"],
      buttons: [],
      form: {
        title: "",
        text: ""
      },
      rules: {
        title: [{ validator: titleCheck, trigger: "blur" }],
        text: [{ validator: textCheck, trigger: "blur" }]
      }
    };
  },
  components: {
    addButtonText,
    imageUploader
  },
  methods: {
    checkFlexForm() {
      console.log("ccheck form in flex");
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("form success");
          return true;
        } else {
          //alert("某些欄位不得為空!!");
          console.log("form fail f");
          return false;
        }
      });
    },
    showTitle() {
      console.log(
        "send: " + "flexTitleEvent" + this.comID + "_" + this.comIndex,
        this.form.title
      );
      this.$bus.$emit(
        "flexTitleEvent" + this.comID + "_" + this.comIndex,
        this.form.title
      );
    },
    showText() {
      console.log(
        "send: " + "flexTextEvent" + this.comID + "_" + this.comIndex,
        this.form.title
      );
      this.$bus.$emit(
        "flexTextEvent" + this.comID + "_" + this.comIndex,
        this.form.text
      );
    },
    getFlexTitle() {
      this.$emit("getFlexTitle", this.form.title, this.comIndex);
    },
    getFlexText() {
      this.$emit("getFlexText", this.form.text, this.comIndex);
    },
    parentGetFlexButton(button, index) {
      this.buttons[index] = button;
      console.log("Get button: " + this.buttons[index]);
      console.log(this.buttons[index]);
      this.$emit("getFlexButtonGroups", this.buttons, this.comIndex);
    },
    deleteFlex(i) {
            console.log("deleteFlex", i);
      this.$emit("deleteFlex", i);
    },
    deleteButton(i) {
      this.buttonList.splice(i, 1);
      this.buttonTextList.splice(i, 1);
      console.log("delete ", i);
      console.log("List ", this.buttonList);
      this.sendButtonTextList();
    },
    addButton() {
      var i;
      for (i = 1; i < this.buttonCntLimit + 1; i++) {
        if (this.buttonList.indexOf(i) == -1) {
          this.buttonList.push(i);
          this.buttonTextList.push("Button #" + i);
          console.log("add ", i);
          break;
        }
      }
      console.log("List ", this.buttonList);
      this.sendButtonTextList();
    },
    sendButtonTextList() {
      this.$bus.$emit(
        "showButtonsTextEvevt" + this.comID + "_" + this.comIndex,
        this.buttonTextList
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../width.css";
.contain {
  background: #fff;
  padding: 0px;
  max-width: 250px;
  box-sizing: border-box;
  padding: 10px;
  margin-right: 30px;
    border: 1px solid #bdb5b5;
}
.addButton {
  border: 1px dashed #aaaaaa;
  margin-top: 5px;
}
.fillcontain {
  padding: 0px;
}
i {
  font-size: 20px;
  margin: 3px;
}
.delete-icon {
  margin-left: 15px;
  cursor: pointer;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
