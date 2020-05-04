<template>
  <div
    class="fillcontain"
    style="display: flex; justify-content: flex-start; align-items: flex-start;"
  >
    <div
      style="display: flex;flex-direction: column; justify-content: flex-start; align-items: flex-start;"
    >
      <el-divider content-position="left">
        <h1>
          <i class="el-icon-message"></i>訊息製作
        </h1>
      </el-divider>

      <div class="contain" ref="contain">
        <div
          style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;margin-bottom: 10px;"
        >
          <div
            style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;"
          >
            <div style="margin-bottom: 20px">訊息名稱:</div>
            <div style="width:200px;margin-left: 10px;">
              <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="msgName">
                  <el-input maxlength="20" show-word-limit size="small " v-model="form.msgName"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <el-button
            icon="el-icon-folder-add"
            style="margin-bottom: 20px"
            class="primaryButton"
            type="primary"
            size="medium"
            round
            @click="checkForms"
          >儲存</el-button>
        </div>
        <el-divider></el-divider>
        <div
          :key="com.id"
          v-for="(com, index) in componentList"
          style="width: 100%; display: flex;flex-direction: column; align-items: flex-start;"
        >
          <div
            class="msg_ele"
            style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start; padding:10px;"
          >
            <component
              ref="componentList"
              @getJSON="parentGetJSON"
              @deleteMultiflexComponent="deleteComponent"
              :comID="com.id"
              :is="com.text"
              :realIndex="index"
            ></component>
            <div class="tool">
              <i
                class="el-icon-delete"
                style="color:red;cursor: pointer;"
                @click="deleteComponent(index)"
              ></i>
              <i
                v-if="componentList.length!=1 && index != 0"
                class="el-icon-caret-top"
                style="cursor: pointer;"
                @click="moveUp(index)"
              ></i>
              <i
                v-if="componentList.length!=1 && index != 4"
                class="el-icon-caret-bottom"
                style="cursor: pointer;"
                @click="moveDown(index)"
              ></i>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
        <div style="margin:10px; color: rgb(130, 130, 130);">新增訊息模組</div>
        <div
          style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start;flex-wrap: wrap;"
        >
          <div class="fakeButton" @click="addText">
            <i class="el-icon-chat-line-square icon"></i>
            +文字
          </div>
          <div class="fakeButton" @click="addImage">
            <i class="el-icon-picture-outline icon"></i>
            +圖片
          </div>
          <div class="fakeButton" @click="addImageMsg">
            <i class="el-icon-menu icon"></i>
            +圖文訊息
          </div>
          <div class="fakeButton" @click="addFlex">
            <i class="el-icon-document-copy icon"></i>
            +輪播圖卡
          </div>
          <div class="fakeButton" @click="addVideo">
            <i class="el-icon-video-play icon"></i>
            +影片
          </div>
        </div>
        <!-- <el-button size="medium" type="primary" @click="addText">+ 文字</el-button>
      <el-button size="medium" type="primary" @click="addImage">+ 圖片</el-button>
      <el-button size="medium" type="primary" @click="addImageMsg">+ 圖文訊息</el-button>
        <el-button size="medium" type="primary" @click="addFlex">+ 輪播圖卡</el-button>-->
      </div>
    </div>
    <div style="margin-left: 50px; margin-top:69px">
      <transition name="slide-fade">
        <div class="phone" v-if="show">
          <div class="screen">
            <div class="hair" style="display: flex; flex-direction: row;justify-content: center;">
              <div class="air"></div>
            </div>
            <el-scrollbar>
              <div
                style="height: 530px; display: flex; flex-direction: column; flex-wrap: nowrap; align-items: flex-start;"
              >
                <div
                  :key="comShow.id"
                  v-for="comShow in componentShowList"
                  style="display: flex; justify-content: space-between; align-items: flex-start; padding:10px;"
                >
                  <component
                    @transferImagemapReply="parentGetImagemapReply"
                    :showID="comShow.id"
                    :is="comShow.text"
                  ></component>
                </div>
                <div
                  style="width: 300px;display: flex; flex-direction: column; flex-wrap: nowrap; align-items: flex-end;"
                >
                  <div
                    :key="index+10"
                    v-for="(reply,index) in ReplyList"
                    style="display: flex; justify-content: space-between; align-items: flex-start; padding:10px;"
                  >
                    <reply-text :replyText="reply"></reply-text>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </transition>
    </div>
    <div
      style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;margin-left: 60px"
    >
      <el-divider content-position="left">
        <h1>
          <i class="el-icon-chat-dot-round"></i>訊息清單
        </h1>
      </el-divider>
      <div class="table_container" style="width:471px; ">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          highlight-current-row
          header-cell-class-name="table-header-class"
          style="width:100%; cursor: pointer;"
          @row-click="onclick"
        >
          <el-table-column label="序號" width="60" align="center">
            <template slot-scope="scope">
              <span
                style="cursor: pointer;"
              >{{scope.$index+(paginations.pageIndex - 1) * paginations.pageSize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column property="name" label="訊息名稱" width="150" align="center"></el-table-column>
          <el-table-column property="event_time" label="創建時間" width="200" align="center"></el-table-column>
          <el-table-column label="刪除" width="60" align="center">
            <template>
              <span class="deleteIcon" style="cursor: pointer;">
                <i class="el-icon-delete"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                background
                v-if="paginations.total > 0"
                :page-sizes="paginations.pageSizes"
                :page-size="paginations.pageSize"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page="paginations.pageIndex"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin-left: 50px;">
      <transition name="slide-fade">
        <div
          style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;"
          v-if="show_Preview"
        >
          <h1 class="contain2">
            <i class="el-icon-mobile"></i>訊息預覽
          </h1>

          <div id="1" class="phone">
            <div class="screen">
              <div class="hair" style="display: flex; flex-direction: row;justify-content: center;">
                <div class="air"></div>
              </div>
              <el-scrollbar>
                <div
                  style="height: 530px; display: flex; flex-direction: column; flex-wrap: nowrap; align-items: flex-start;"
                >
                  <div
                    :key="comShow.id"
                    v-for="comShow in componentShowList_Preview"
                    style="display: flex; justify-content: space-between; align-items: flex-start; padding:10px;"
                  >
                    <component
                      ref="componentShowList_Preview"
                      :showID="comShow.id"
                      :is="comShow.text"
                    ></component>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import * as mutils from "@/utils/mUtils";
import imageUploader from "./components/imageUploader";
import imageMsgUploader from "./components/imageMsgUploader";
import imageOnlyUploader from "./components/imageOnlyUploader";
import addMultiFlex from "./components/addMultiFlex";
import addText from "./components/addText";
import videoUploader from "./components/videoUploader";
import showVideo from "./components/showVideo";
import showImage from "./components/showImage";
import showImageMsg from "./components/showImageMsg";
import showImageOnly from "./components/showImageOnly";
import showText from "./components/showText";
import showTextMake from "./components/showTextMake";
import replyText from "./components/replyText";
import showMultiFlex from "./components/showMultiFlex";
import axios from "axios";
import { getToken } from '@/utils/auth' ; 

export default {
  name: "customerMsg",
  data() {
    var msgNameCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入訊息名稱"));
      } else {
        return callback();
      }
    };
    return {
      loading: true,
      tableData: [],
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      t: 500,
      ReplyList: [],
      componentList: [],
      componentIDList: [],
      componentShowList: [],
      componentShowList_Preview: [],
      componentCntLimit: 5,
      lastComLen: 0,
      destroyedCnt: 0,
      flexList: [],
      componentID: 0,
      show: false,
      show_Preview: false,
      messages: [],
      currentMsgCnt: 0,
      checkFlag: true,
      APIbaseURL: "https://test-backend-dot-flow-263607.appspot.com",
      form: {
        msgName: ""
      },
      rules: {
        msgName: [{ validator: msgNameCheck, trigger: "blur" }]
      }
    };
  },
  components: {
    videoUploader,
    imageUploader,
    imageMsgUploader,
    imageOnlyUploader,
    showVideo,
    showImage,
    showImageMsg,
    showImageOnly,
    addText,
    showText,
    showTextMake,
    replyText,
    addMultiFlex,
    showMultiFlex
  },
  mounted() {
    this.getMsgList();
  },
  methods: {
    onclick(row, column) {
      this.destroyedCnt = 0;
      this.lastComLen = this.componentShowList_Preview.length;
      console.log("onclick lastComLen = " + this.lastComLen);
      this.messages = row.content;
      console.log("msgCnt " + this.messages.length);
      console.log(this.messages);
      this.currentMsg_id = row.msg_id;
      if (column.label != "刪除") {
        this.show_Preview = true;
        console.log(this.componentShowList_Preview.length);
        if (this.componentShowList_Preview.length) {
          this.componentShowList_Preview = [];
          var a;
          // for (a = 0; a < this.lastComLen; a++) {                  //加了反而錯
          //   this.$refs.componentShowList_Preview[a].destroyElement();
          // }
        } else {
          this.rebuildShow();
        }
      } else {
        this.$confirm("如自動回復或歡迎訊息有此訊息也將一併被刪除！")
          .then(_ => {
            console.log("deleteMsg " + row.msg_id);
            this.deleteMsg(row.msg_id);
            this.componentShowList_Preview = [];
            this.lastComLen = 0;
            done();
          })
          .catch(_ => {});
      }
    },
    rebuildShow() {
      console.log("rebuildShow");
      var i, j, b;
      for (i = 0; i < this.messages.length; i++) {
        if (this.messages[i].type == "flex") {
          this.componentShowList_Preview.push({
            text: "showMultiFlex",
            id: i + this.componentCntLimit
          });
        } else if (this.messages[i].type == "imagemap") {
          this.componentShowList_Preview.push({
            text: "showImageMsg",
            id: i + this.componentCntLimit
          });
        } else if (this.messages[i].type == "image") {
          this.componentShowList_Preview.push({
            text: "showImageOnly",
            id: i + this.componentCntLimit
          });
        } else if (this.messages[i].type == "text") {
          this.componentShowList_Preview.push({
            text: "showText",
            id: i + this.componentCntLimit
          });
        } else if (this.messages[i].type == "video") {
          this.componentShowList_Preview.push({
            text: "showVideo",
            id: i + this.componentCntLimit
          });
        }
      }
    },
    deleteMsg(Idx) {
      this.loading = true;
      if (this.tableData.length == 1) {
        this.paginations.pageIndex == 1 ? 1 : this.paginations.pageIndex--;
      }
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/delete_msg",
        data: {
          msg_id: Idx
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        this.getMsgList();
        console.log(res);
      });
    },
    getMsgList() {
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/query_msg",
        data: {
          limit: this.paginations.pageSize,
          page: this.paginations.pageIndex
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        console.log(res.data);
        console.log(res.data.data.length);
        console.log(res.data.data);
        this.loading = false;
        this.paginations.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    checkForms() {
      var i, f;
      this.checkFlag = true;
      console.log(this.componentList);
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("success");
          return true;
        } else {
          //alert("某些欄位不得為空!!");
          console.log("form fail x");
          this.checkFlag = false;
          return false;
        }
      });
      for (i = 0; i < this.componentList.length; i++) {
        if (this.componentList[i].text == "addMultiFlex") {
          this.$refs.componentList[i].$refs["form"].validate(valid => {
            if (valid) {
              console.log("success");
              return true;
            } else {
              this.$message.error("請輸入必填欄位!!");
              console.log("form fail");
              this.checkFlag = false;
              return false;
            }
          });
          for (f = 0; f < this.flexList[i].length; f++) {
            this.$refs.componentList[i].$refs.flex[f].$refs["form"].validate(
              valid => {
                if (valid) {
                  console.log("success");
                  return true;
                } else {
                  this.$message.error("請輸入必填欄位!!");
                  console.log("form fail f");
                  this.checkFlag = false;
                  return false;
                }
              }
            );
          }
        } else if (this.componentList[i].text == "imageMsgUploader") {
          this.$refs.componentList[i].$refs["form"].validate(valid => {
            if (valid) {
              console.log("success");
              return true;
            } else {
              this.$message.error("請輸入必填欄位!!");
              console.log("form fail");
              this.checkFlag = false;
              return false;
            }
          });
        }
      }
      if (this.checkFlag) {
        this.colletionMsg();
      }
    },
    colletionMsg() {
      var i;
      for (i = 0; i < this.componentList.length; i++) {
        this.$refs.componentList[i].post2DB();
      }
    },
    parentGetJSON(message, id) {
      console.log(message);
      console.log(id);
      this.currentMsgCnt++;
      this.messages[id] = message;
      if (this.currentMsgCnt == this.componentList.length) {
        this.save();
      }
    },
    parentGetImagemapReply(text) {
      console.log("parentGetImagemapReply " + text);
      this.ReplyList.push(text);
      console.log(this.ReplyList);
    },
    save() {
      this.currentMsgCnt = 0;
      var jsonData = {
        name: this.form.msgName,
        message: this.messages
      };
      console.log(jsonData);
      let token = getToken('Token');

      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/create_msg",
        data: jsonData,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(response => {
        console.log(response);
        if (response.status == 200) {
          this.loading = true;
          this.getMsgList();
          this.$message({
            message: "儲存成功！",
            type: "success"
          });
        } else {
          this.$message.error("儲存失敗！");
        }
      });
    },
    addText() {
      var i;
      for (i = 0; i < this.componentIDList.length; i++) {
        if (this.componentList[i].text == "addText") {
          this.$message.error("目前文字訊息限一組");
          return;
        }
      }
      this.show = true;
      for (i = 0; i < this.componentCntLimit; i++) {
        if (this.componentIDList.indexOf(i) == -1) {
          this.componentIDList.push(i);
          this.componentID = i;
          this.componentList.push({ text: "addText", id: this.componentID });
          this.componentShowList.push({
            text: "showTextMake",
            id: this.componentID
          });
          console.log(this.componentList);
          break;
        }
      }
    },
    addImage() {
      this.show = true;
      var i;
      for (i = 0; i < this.componentCntLimit; i++) {
        if (this.componentIDList.indexOf(i) == -1) {
          this.componentIDList.push(i);
          this.componentID = i;
          this.componentList.push({
            text: "imageOnlyUploader",
            id: this.componentID
          });
          this.componentShowList.push({
            text: "showImageOnly",
            id: this.componentID
          });
          console.log(this.componentList);
          break;
        }
      }
    },
    addVideo() {
      this.show = true;
      var i;
      for (i = 0; i < this.componentCntLimit; i++) {
        if (this.componentIDList.indexOf(i) == -1) {
          this.componentIDList.push(i);
          this.componentID = i;
          this.componentList.push({
            text: "videoUploader",
            id: this.componentID
          });
          this.componentShowList.push({
            text: "showVideo",
            id: this.componentID
          });
          console.log(this.componentList);
          break;
        }
      }
    },
    addImageMsg() {
      this.show = true;
      var i;
      for (i = 0; i < this.componentCntLimit; i++) {
        if (this.componentIDList.indexOf(i) == -1) {
          this.componentIDList.push(i);
          this.componentID = i;
          this.componentList.push({
            text: "imageMsgUploader",
            id: this.componentID
          });
          this.componentShowList.push({
            text: "showImageMsg",
            id: this.componentID
          });
          console.log(this.componentList);
          break;
        }
      }
    },
    addFlex() {
      this.show = true;
      var i;
      for (i = 0; i < this.componentCntLimit; i++) {
        if (this.componentIDList.indexOf(i) == -1) {
          this.componentIDList.push(i);
          this.componentID = i;
          this.componentList.push({
            text: "addMultiFlex",
            id: this.componentID
          });
          this.componentShowList.push({
            text: "showMultiFlex",
            id: this.componentID
          });
          console.log(this.componentList);
          break;
        }
      }
    },
    deleteComponent(componentIndex) {
      this.componentList.splice(componentIndex, 1);
      this.componentShowList.splice(componentIndex, 1);
      this.componentIDList.splice(componentIndex, 1);
      console.log(this.componentList);
      //console.log(componentIndex);
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.loading = true;
      this.paginations.pageSize = pageSize;
      this.getMsgList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.loading = true;
      this.paginations.pageIndex = page;
      this.getMsgList();
    },
    destroyedlistener(event) {
      console.log("destroyed ID " + event);
      this.destroyedCnt++;
      console.log(
        "destroyedCnt = " +
          this.destroyedCnt +
          " lastComLen = " +
          this.lastComLen
      );

      if (this.destroyedCnt == this.lastComLen) {
        this.rebuildShow();
        this.destroyedCnt = 0;
      }
    },
    comlistener(event) {
      if (event < 5) {
        return;
      }
      console.log("receive customer componentHandSharkEvent " + event);
      var forMsgIndex = event - this.componentCntLimit;
      if (this.messages[forMsgIndex].type == "flex") {
        this.flexList = [1];

        //multi flex  j start with 1 because flexList start with 1
        if (this.messages[forMsgIndex].contents.type == "carousel") {
          var j;
          for (
            j = 1;
            j < this.messages[forMsgIndex].contents.contents.length;
            j++
          ) {
            this.flexList.push(j + 1);
          }
          this.$bus.$emit("specialEvent" + event, event, this.flexList); //send flexList
        } else {
          //one flex
        }
      } else if (this.messages[forMsgIndex].type == "imagemap") {
        var imagemapURL =
          this.messages[forMsgIndex].baseUrl +
          "/" +
          this.messages[forMsgIndex].baseSize.height;
        this.$bus.$emit("imageMsgUrlEvent" + event, imagemapURL);
      } else if (this.messages[forMsgIndex].type == "image") {
        this.$bus.$emit(
          "imageUrlEvent" + event,
          this.messages[forMsgIndex].originalContentUrl
        );
      } else if (this.messages[forMsgIndex].type == "video") {
        this.$bus.$emit(
          "videoUrlEvent" + event,
          this.messages[forMsgIndex].originalContentUrl
        );
        this.$bus.$emit(
          "vedioPreviewUrlEvent" + event,
          this.messages[forMsgIndex].previewImageUrl
        );
      } else if (this.messages[forMsgIndex].type == "text") {
        this.$bus.$emit(
          "textEvent" + event,
          this.messages[forMsgIndex].htmlStr
        );
      }
    },
    flexlistener(event, j) {
      if (event < 5) {
        return;
      }
      var forMsgIndex = event - this.componentCntLimit;
      console.log("receive customer flexHandSharkEvent " + event + " " + j);
      if (this.messages[forMsgIndex].contents.type == "carousel") {
        //multi flex
        var b;
        this.$bus.$emit(
          "imageUrlEvent" + event + "_" + (j + 1),
          this.messages[forMsgIndex].contents.contents[j].hero.url
        );
        this.$bus.$emit(
          "flexTitleEvent" + event + "_" + (j + 1),
          this.messages[forMsgIndex].contents.contents[j].body.contents[0].text
        );
        this.$bus.$emit(
          "flexTextEvent" + event + "_" + (j + 1),
          this.messages[forMsgIndex].contents.contents[j].body.contents[1].text
        );
        console.log("ssssssssssss " + j);
        this.buttonTexts = [];
        for (
          b = 0;
          b <
          this.messages[forMsgIndex].contents.contents[j].footer.contents
            .length;
          b++
        ) {
          this.buttonTexts.push(
            this.messages[forMsgIndex].contents.contents[j].footer.contents[b]
              .action.label
          );
        }
        this.$bus.$emit(
          "showButtonsTextEvevt" + event + "_" + (j + 1),
          this.buttonTexts
        );
      } else {
        //one flex
        var b;
        this.$bus.$emit(
          "imageUrlEvent" + event + "_" + (j + 1),
          this.messages[forMsgIndex].contents.hero.url
        );
        this.$bus.$emit(
          "flexTitleEvent" + event + "_" + (j + 1),
          this.messages[forMsgIndex].contents.body.contents[0].text
        );
        this.$bus.$emit(
          "flexTextEvent" + event + "_" + (j + 1),
          this.messages[forMsgIndex].contents.body.contents[1].text
        );
        console.log("ssssssssssss " + j);
        this.buttonTexts = [];
        for (
          b = 0;
          b < this.messages[forMsgIndex].contents.footer.contents.length;
          b++
        ) {
          this.buttonTexts.push(
            this.messages[forMsgIndex].contents.footer.contents[b].action.label
          );
        }
        this.$bus.$emit(
          "showButtonsTextEvevt" + event + "_" + (j + 1),
          this.buttonTexts
        );
      }
    },
    moveUp(index) {
      if (index == 0) {
        return;
      }
      [this.componentList[index - 1], this.componentList[index]] = [
        this.componentList[index],
        this.componentList[index - 1]
      ];
      [this.componentIDList[index - 1], this.componentIDList[index]] = [
        this.componentIDList[index],
        this.componentIDList[index - 1]
      ];
      [this.componentShowList[index - 1], this.componentShowList[index]] = [
        this.componentShowList[index],
        this.componentShowList[index - 1]
      ];
      var tmp = [];
      tmp = [];
      tmp = this.componentList;
      this.componentList = [];
      this.componentList = tmp;
      tmp = [];
      tmp = this.componentIDList;
      this.componentIDList = [];
      this.componentIDList = tmp;
      tmp = [];
      tmp = this.componentShowList;
      this.componentShowList = [];
      this.componentShowList = tmp;
    },
    moveDown(index) {
      if (index == 4) {
        return;
      }
      [this.componentList[index], this.componentList[index + 1]] = [
        this.componentList[index + 1],
        this.componentList[index]
      ];
      [this.componentIDList[index], this.componentIDList[index + 1]] = [
        this.componentIDList[index + 1],
        this.componentIDList[index]
      ];
      [this.componentShowList[index], this.componentShowList[index + 1]] = [
        this.componentShowList[index + 1],
        this.componentShowList[index]
      ];
      var tmp = [];
      tmp = [];
      tmp = this.componentList;
      this.componentList = [];
      this.componentList = tmp;
      tmp = [];
      tmp = this.componentIDList;
      this.componentIDList = [];
      this.componentIDList = tmp;
      tmp = [];
      tmp = this.componentShowList;
      this.componentShowList = [];
      this.componentShowList = tmp;
    }
  },
  created() {
    var i;
    for (i = 0; i < this.componentCntLimit; i++) {
      console.log("addListen: " + "specialEvent" + i);
      this.$bus.$on("specialEvent" + i, (index, event) => {
        this.flexList[index] = event;
        console.log(
          "customerMsg receive FlexList : " +
            this.flexList[index] +
            ", ID: " +
            index
        );
      });
    }

    console.log("addlistener msgList componentHandSharkEvent");

    // [註冊監聽事件]
    this.$bus.$on("componentHandSharkEvent", this.comlistener);
    // [註冊監聽事件]
    this.$bus.$on("flexHandSharkEvent", this.flexlistener);
    this.$bus.$on("destroyed", this.destroyedlistener);
  },
  beforeDestroy: function() {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    var i;
    for (i = 0; i < this.componentCntLimit; i++) {
      this.$bus.$off("specialEvent" + i);
    }

    console.log("beforeDestroy coustomerMsg");

    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("flexHandSharkEvent", this.flexlistener);
    this.$bus.$off("componentHandSharkEvent", this.comlistener);
    this.$bus.$off("destroyed", this.destroyedlistener);
  }
};
</script>

<style lang="scss" scoped>
.fillcontain {
  background: #f0f2f5;
  min-height: 100vh;
  // min-width: 100vw;
}
.contain {
  background: rgb(247, 248, 250);
  padding: 20px;
  min-height: 1000px;
  width: 510px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 3px 15px 20px #727171;
  // margin-left: 400px;
  //box-sizing: border-box;
  margin-top: 20px;
}

.contain2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #f0f2f5;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
}

i {
  font-size: 30px;
  margin-top: 4px;
}
.deleteIcon {
  i {
    font-size: 20px;
  }
}
// .images-preview {
//   border-radius: 20px 20px 20px 20px;
//   .img-wrapper {
//     img {
//       border-radius: 20px 20px 20px 20px;
//     }
//   }
// }
.phone {
  background: rgb(0, 0, 0);
  padding: 12px;
  height: 650px;
  width: 324px;
  border-radius: 50px;
}
.hair {
  //background: rgb(142, 181, 226);
  //padding: 10px;
  height: 25px;
  width: 300px;
  border-radius: 15px;
}
.space {
  //background: rgb(255, 255, 255);
  padding: 5px;
  height: 100vh;
  width: 50px;
  //border-radius: 15px;
}
.air {
  background: rgb(0, 0, 0);
  //padding: 10px;
  height: 18px;
  width: 150px;
  border-radius: 0px 0px 20px 20px;
}
.screen {
  background: rgb(142, 181, 226);
  // padding: 20px;
  height: 100%;
  width: 100%;
  border-radius: 40px;
}
.fakeButton {
  border-radius: 15px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 100px;
  width: 100px;
  border: 1px dashed #aaaaaa;
  cursor: pointer;
  margin: 5px;
  color: rgb(158, 156, 156);
  -moz-transition: all 0.35s;
  -webkit-transition: all 0.35s;
  -ms-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
  i {
    -moz-transition: all 0.35s;
    -webkit-transition: all 0.35s;
    -ms-transition: all 0.35s;
    -o-transition: all 0.35s;
    transition: all 0.35s;
    margin-bottom: 15px;
  }
}
.fakeButton:hover {
  color: rgb(39, 77, 201);
  border: 1px dashed rgb(39, 77, 201);
  height: 110px;
  width: 110px;
  margin: 0px;
  font-size: 20px;
  i {
    font-size: 40px;
    margin-bottom: 20px;
    margin-right: 10px;
  }
}
.slide-fade-enter-active {
  transition: all 3.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(77px);
  opacity: 0;
}
.primaryButton {
  font-size: 18px;
  font-weight: bold;
}
.pagination {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 20px;
  text-align: center;
}
.pagination/deep/.el-pagination {
  display: flex;
}
.table_container {
  margin-bottom: 10px;
  margin-top: 20px;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  background: #f0f2f5;

  // font-family: "新細明體","Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  //   "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  i {
    margin-right: 5px;
  }
}
.el-divider__text {
  position: absolute;
  background-color: #f0f2f5;
  padding: 0 20px;
  color: #000000;
}
.tool {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5px;
}
.msg_ele {
  .tool {
    opacity: 0;
    -moz-transition: all 0.35s;
    -webkit-transition: all 0.35s;
    -ms-transition: all 0.35s;
    -o-transition: all 0.35s;
    transition: all 0.35s;
  }
}
.msg_ele:hover {
  .tool {
    opacity: 1;
    -moz-transition: all 2s;
    -webkit-transition: all 2s;
    -ms-transition: all 2s;
    -o-transition: all 2s;
    transition: all 2s;
  }
}
</style>
