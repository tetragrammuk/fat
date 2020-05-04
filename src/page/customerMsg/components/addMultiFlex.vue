<template>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex;flex-direction: column; align-items: flex-start;">
      <div style="display: flex;flex-direction: row;">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="通知訊息" prop="input">
            <el-input style="width:250px;" v-model="form.input" placeholder="請輸入文字" maxlength="100"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="display: flex;flex-direction: column; align-items: center;">
        <!-- <el-scrollbar> -->
        <div class="allFlex" ref="father">
          <div class="slideContain" :style="position" ref="child">
            <flex
              ref="flex"
              @deleteFlex="parentDeleteFlex"
              @getFlexTitle="parentGetFlexTitle"
              @getFlexText="parentGetFlexText"
              @getFlexButtonGroups="parentGetFlexButtonGroups"
              :key="flexIndex"
              :comID="comID"
              :comIndex="flexIndex"
              :deleteIndex="index"
              v-for="(flexIndex, index) in flexList"
            ></flex>
          </div>
        </div>
        <!-- </el-scrollbar> -->
        <div
          v-if="flexList.length > 1"
          style="display: flex;flex-direction: row; align-items: flex-start;margin-top:10px"
        >
          <el-button
            class="selectButton"
            v-for="(flexIndex, index) in flexList"
            :key="flexIndex"
            size="small"
            @click="select(index)"
          >{{flexIndex}}</el-button>
        </div>
      </div>
    </div>
    <i class="el-icon-plus" @click="addMultiFlex()"></i>
  </div>
</template>

<script>
import flex from "./flex";
import axios from "axios";
import { isatty } from "tty";
export default {
  name: "addMultiFlex",
  components: {
    flex
  },
  props: {
    comID: 0,
    realIndex: 0
  },
  data() {
    var inputCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入訊息，最多100字"));
      } else {
        return callback();
      }
    };

    return {
      form: {
        input: ""
      },
      rules: {
        input: [{ validator: inputCheck, trigger: "blur" }]
      },
      position: {
        "margin-left": "0px"
      },
      flexCnt: 1,
      flexCntLimit: 5,
      flexList: [1],
      imageLinks: [],
      titles: [],
      texts: [],
      buttonGroups: []
      // button format:
      //  name
      //  infoMsg
      //  radio
      //  Msg
      //  URL
      //  tags[]
    };
  },
  created() {
    this.$bus.$emit("specialEvent" + this.comID, this.comID, this.flexList);

    var i;
    for (i = 1; i < this.flexCntLimit + 1; i++) {
      console.log("addListen: " + "getImageFileEvent" + this.comID + "_" + i);
      // [註冊監聽事件]
      this.$bus.$on(
        "getImageFileEvent" + this.comID + "_" + i,
        (event, index) => {
          this.imageLinks[index - 1] = event;
          console.log("Get Image: " + this.imageLinks[index - 1]);
        }
      );
    }
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    var i;
    for (i = 1; i < this.flexCntLimit + 1; i++) {
      this.$bus.$off("getImageFileEvent" + this.comID + "_" + i);
    }
  },
  methods: {
    select(index) {
      var left = 350 - this.flexList.length * 280;
      var right = left + (this.flexList.length - (index + 1)) * 280 - 20;
      if (index == 0) {
        this.position = {
          "margin-left": "0px"
        };
      } else if (index == this.flexList.length - 1) {
        this.position = {
          "margin-left": left.toString() + "px"
        };
      } else {
        this.position = {
          "margin-left": right.toString() + "px"
        };
      }
    },
    post2DB() {
      console.log("multiFlex post2DB Start");
      var multiFlex = [];
      var i;
      for (i = 0; i < this.flexList.length; i++) {
        var buttonsData = [];
        var btn;
        console.log(this.buttonGroups);
        console.log(i);
        console.log(this.buttonGroups[i]);
        for (btn = 0; btn < this.buttonGroups[i].length; btn++) {
          var act;
          if (this.buttonGroups[i][btn].radio == 1) {
            act = {
              type: "postback",
              label: this.buttonGroups[i][btn].name,
              text: this.buttonGroups[i][btn].Msg,
              label_id: this.buttonGroups[i][btn].tags
            };
          } else {
            act = {
              type: "uri",
              label: this.buttonGroups[i][btn].name,
              uri: this.buttonGroups[i][btn].URL,
              label_id: this.buttonGroups[i][btn].tags
            };
          }
          var temp = {
            type: "button",
            style: "primary",
            action: act
          };
          buttonsData.push(temp);
        }
        console.log(buttonsData);
        var flexUnit = {
          type: "bubble",
          hero: {
            type: "image",
            url: this.imageLinks[i],
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: this.titles[i],
                weight: "bold",
                color: "#1DB446",
                size: "sm"
              },
              {
                type: "text",
                text: this.texts[i],
                weight: "bold",
                size: "md",
                margin: "md"
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "md",
            contents: buttonsData
          }
        };
        multiFlex.push(flexUnit);
        console.log(multiFlex);
      }
      var message = {
        type: "flex",
        altText: this.form.input,
        contents:
          this.flexList.length == 1
            ? multiFlex[0]
            : {
                type: "carousel",
                contents: multiFlex
              }
      };
      console.log(message);

      // var jsonData = {
      //   name: msg_name,
      //   //object: ["U07ed2f1860bd9f02884d95e495e60bab"],
      //   message: messages
      // };
      // console.log(jsonData);

      this.$emit("getJSON", message, this.realIndex);

      // axios({
      //   method: "post",
      //   baseURL: "https://service2-dot-flow-263607.appspot.com",
      //   url: "/create_msg",
      //   data: jsonData,
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // }).then(response => {
      //   console.log(response);
      // });
    },
    addMultiFlex() {
      var i;
      for (i = 1; i < this.flexCntLimit + 1; i++) {
        if (this.flexList.indexOf(i) == -1) {
          this.flexList.push(i);
          this.$bus.$emit(
            "specialEvent" + this.comID,
            this.comID,
            this.flexList
          );
          // console.log('add ', i)
          break;
        }
      }
      var left = 350 - this.flexList.length * 280;
      this.position = {
        "margin-left": left.toString() + "px"
      };
    },
    parentDeleteFlex(i) {
      this.flexList.splice(i, 1);
      if (this.flexList.length == 0) {
        this.$emit("deleteMultiflexComponent", this.comID);
      }
      if (this.flexList.length == 1) {
        this.position = {
          "margin-left": "0px"
        };
      }
    },
    parentGetFlexTitle(title, index) {
      this.titles[index - 1] = title;
      console.log("Get title: " + this.titles[index - 1]);
    },
    parentGetFlexText(text, index) {
      this.texts[index - 1] = text;
      console.log("Get text: " + this.texts[index - 1]);
    },
    parentGetFlexButtonGroups(buttonGroup, index) {
      this.buttonGroups[index - 1] = buttonGroup;
      console.log("Get buttonGroup: " + (index - 1));
      console.log(this.buttonGroups[index - 1]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../width.css";
i {
  font-size: 40px;
  margin: 3px;
}

.slideContain {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  -moz-transition: all 1s;
  -webkit-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
}

.allFlex {
  overflow-x: hidden;
  width: 350px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: flex-start;
}
.selectButton {
  border: 2px solid rgb(129, 155, 238);
}
</style>