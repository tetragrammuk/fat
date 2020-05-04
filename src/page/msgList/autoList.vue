<template>
  <div class="fillcontain">
    <div
      class="contain"
      style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;"
    >
      <div
        style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start;"
      >
        <div
          class="contain"
          style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;"
        >
          <div class="contain3">
            <el-divider content-position="left">
              <h1>
                <i class="el-icon-chat-dot-round"></i>訊息清單
              </h1>
            </el-divider>
            <el-button
              class="primaryButton"
              type="primary"
              size="medium"
              round
              @click="autoReplyOnclick"
              icon="el-icon-share"
            >自動回覆</el-button>
            <el-dialog
              title="設定自動回覆"
              :visible.sync="autoReplyDialogVisible"
              width="25%"
              :before-close="handleClose"
            >
              <div
                style="display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start;"
              >
                <el-form ref="form" :model="form" label-width="150px" :rules="rules">
                  <el-form-item label="訊息腳本">
                    <el-col :span="20">
                      <el-select v-model="AutoMsg_id" size="medium" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <!-- <el-form ref="form" :model="form" :rules="rules"> -->
                  <el-form-item label="關鍵字" prop="keyword">
                    <el-col :span="20">
                      <el-input
                        :disabled="welcome_radio"
                        v-model="form.keyword"
                        placeholder="請輸入關鍵字"
                        maxlength="20"
                        show-word-limit
                      ></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label>
                    <add-label @transferLabels="parentGetLeabels"></add-label>
                  </el-form-item>
                  <!-- <el-form-item label="是否為歡迎訊息">
                    <el-radio v-model="welcome_radio" :label="true" @change="welcome_radio_f">是</el-radio>
                    <el-radio v-model="welcome_radio" :label="false">否</el-radio>
                  </el-form-item>
                  <el-button
                    style="margin-left:50px"
                    size="large"
                    type="info"
                    plain
                  >歡 迎 訊 息 會 覆 蓋 掉 原 本 的，請 再 三 確 認</el-button> -->
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="autoReplyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkReply">確 定</el-button>
              </span>
            </el-dialog>
          </div>
          <div class="table_container" style="width:800px">
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
              <el-table-column style="cursor: pointer;" label="訊息名稱" width="428" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="此訊息為歡迎訊息" placement="left">
                    <i
                      style="margin-right: 5px"
                      v-if="welcome_msg == scope.row.msg_id"
                      class="el-icon-s-home"
                    ></i>
                  </el-tooltip>
                  <span style="margin-left: 0">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="創建時間" width="230" align="center">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.event_time }}</span>
                </template>
              </el-table-column>
              <el-table-column label="刪除" width="80" align="center">
                <template>
                  <span style="cursor: pointer;">
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
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;"
          >
            <el-divider content-position="left">
              <h1 class="contain2">
                <i class="el-icon-setting"></i>歷史設定
              </h1>
            </el-divider>
            <div class="table_container" style="width:800px;">
              <el-table
                v-loading="loadingAuto"
                :data="tableAutoData"
                border
                stripe
                highlight-current-row
                header-cell-class-name="table-header-class"
                style="width:100%; cursor: pointer;"
                @row-click="onclickAuto"
              >
                <el-table-column label="序號" width="60" align="center">
                  <template slot-scope="scope">
                    <span
                      style="cursor: pointer;"
                    >{{scope.$index+(paginations_Auto.pageIndex - 1) * paginations_Auto.pageSize + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  style="cursor: pointer;"
                  property="msg_name"
                  label="訊息名稱"
                  width="198"
                  align="center"
                ></el-table-column>
                <el-table-column property="keyword" label="關鍵字" width="150" align="center"></el-table-column>
                <el-table-column label="標籤" width="150" align="center">
                  <template slot-scope="scope">
                    <el-tag :key="index" v-for="(tag, index) in scope.row.label_list">{{tag}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="創建時間" width="180" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.event_time }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="刪除" width="60" align="center">
                  <template>
                    <span style="cursor: pointer;">
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
                      v-if="paginations_Auto.total > 0"
                      :page-sizes="paginations_Auto.pageSizes"
                      :page-size="paginations_Auto.pageSize"
                      :layout="paginations_Auto.layout"
                      :total="paginations_Auto.total"
                      :current-page="paginations_Auto.pageIndex"
                      @current-change="handleCurrentChange_Auto"
                      @size-change="handleSizeChange_Auto"
                    ></el-pagination>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div style="margin-left: 150px">
          <transition name="slide-fade">
            <div
              class="contain"
              style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;"
              v-if="show"
            >
              <h1 class="contain4">
                <i class="el-icon-mobile"></i>訊息預覽
              </h1>
              <div id="1" class="phone">
                <div class="screen">
                  <div
                    class="hair"
                    style="display: flex; flex-direction: row;justify-content: center;"
                  >
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
                        <component ref="componentShowList" :showID="comShow.id" :is="comShow.text"></component>
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showVideo from "../customerMsg/components/showVideo";
import showImage from "../customerMsg/components/showImage";
import showImageMsg from "../customerMsg/components/showImageMsg";
import showImageOnly from "../customerMsg/components/showImageOnly";
import showText from "../customerMsg/components/showText";
import showMultiFlex from "../customerMsg/components/showMultiFlex";
import addLabel from "../customerMsg/components/addLabel";
import axios from "axios";
import { getToken } from '@/utils/auth' ; 
export default {
  data() {
    var keywordCheck = (rule, value, callback) => {
      if (!value && this.welcome_radio == false) {
        return callback(new Error("請輸入關鍵字，最多20字"));
      } else {
        return callback();
      }
    };
    return {
      welcome_msg: "",
      welcome_radio: false,
      autoReplyDialogVisible: false,
      autoReplyTableData: [],
      AutoMsg_id: "",
      label_list: [],
      tableData: [],
      tableAutoData: [],
      loading: true,
      loadingAuto: true,
      //需要给分页组件传的信息
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      paginations_Auto: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      APIbaseURL: "https://test-backend-dot-flow-263607.appspot.com",
      show: false,
      componentShowList: [],
      flexList: [1],
      buttonTexts: [],
      messages: [],
      currentMsg_id: "",
      destroyedCnt: 0,
      lastComLen: 0,
      form: {
        keyword: ""
      },
      rules: {
        keyword: [{ validator: keywordCheck, trigger: "blur" }]
      }
    };
  },
  components: {
    showVideo,
    showImage,
    showImageMsg,
    showImageOnly,
    showText,
    showMultiFlex,
    addLabel
  },
  created() {
    console.log("addlistener autoList componentHandSharkEvent");

    // [註冊監聽事件]
    this.$bus.$on("componentHandSharkEvent", this.comlistener);
    // [註冊監聽事件]
    this.$bus.$on("flexHandSharkEvent", this.flexlistener);
    this.$bus.$on("destroyed", this.destroyedlistener);
  },
  beforeDestroy: function() {
    console.log("beforeDestroy autoList");

    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("flexHandSharkEvent", this.flexlistener);
    this.$bus.$off("componentHandSharkEvent", this.comlistener);
    this.$bus.$off("destroyed", this.destroyedlistener);
  },
  mounted() {
    this.getMsgList();
    this.getAutoList();
  },
  methods: {
    autoReplyOnclick() {
      this.autoReplyDialogVisible = true;
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/query_msg",
        data: {
          limit: 999999,
          page: 1
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        this.autoReplyTableData = res.data.data;
      });
    },
    welcome_radio_f() {
      this.$refs.form.resetFields();
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
      console.log("receive autoList componentHandSharkEvent " + event);
      if (this.messages[event].type == "flex") {
        this.flexList = [1];

        //multi flex  j start with 1 because flexList start with 1
        if (this.messages[event].contents.type == "carousel") {
          var j;
          for (j = 1; j < this.messages[event].contents.contents.length; j++) {
            this.flexList.push(j + 1);
          }
          this.$bus.$emit("specialEvent" + event, event, this.flexList); //send flexList
        } else {
          //one flex
        }
      } else if (this.messages[event].type == "imagemap") {
        var imagemapURL =
          this.messages[event].baseUrl +
          "/" +
          this.messages[event].baseSize.height;
        this.$bus.$emit("imageMsgUrlEvent" + event, imagemapURL);
      } else if (this.messages[event].type == "image") {
        this.$bus.$emit(
          "imageUrlEvent" + event,
          this.messages[event].originalContentUrl
        );
      } else if (this.messages[event].type == "video") {
        this.$bus.$emit(
          "videoUrlEvent" + event,
          this.messages[event].originalContentUrl
        );
        this.$bus.$emit(
          "vedioPreviewUrlEvent" + event,
          this.messages[event].previewImageUrl
        );
      } else if (this.messages[event].type == "text") {
        this.$bus.$emit("textEvent" + event, this.messages[event].htmlStr);
      }
    },
    flexlistener(event, j) {
      console.log("receive autoList flexHandSharkEvent " + event + " " + j);
      if (this.messages[event].contents.type == "carousel") {
        //multi flex
        var b;
        this.$bus.$emit(
          "imageUrlEvent" + event + "_" + (j + 1),
          this.messages[event].contents.contents[j].hero.url
        );
        this.$bus.$emit(
          "flexTitleEvent" + event + "_" + (j + 1),
          this.messages[event].contents.contents[j].body.contents[0].text
        );
        this.$bus.$emit(
          "flexTextEvent" + event + "_" + (j + 1),
          this.messages[event].contents.contents[j].body.contents[1].text
        );
        console.log("ssssssssssss " + j);
        this.buttonTexts = [];
        for (
          b = 0;
          b < this.messages[event].contents.contents[j].footer.contents.length;
          b++
        ) {
          this.buttonTexts.push(
            this.messages[event].contents.contents[j].footer.contents[b].action
              .label
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
          this.messages[event].contents.hero.url
        );
        this.$bus.$emit(
          "flexTitleEvent" + event + "_" + (j + 1),
          this.messages[event].contents.body.contents[0].text
        );
        this.$bus.$emit(
          "flexTextEvent" + event + "_" + (j + 1),
          this.messages[event].contents.body.contents[1].text
        );
        console.log("ssssssssssss " + j);
        this.buttonTexts = [];
        for (
          b = 0;
          b < this.messages[event].contents.footer.contents.length;
          b++
        ) {
          this.buttonTexts.push(
            this.messages[event].contents.footer.contents[b].action.label
          );
        }
        this.$bus.$emit(
          "showButtonsTextEvevt" + event + "_" + (j + 1),
          this.buttonTexts
        );
      }
    },
    onclickAuto(row, column) {
      this.destroyedCnt = 0;
      this.lastComLen = this.componentShowList.length;
      console.log(column.label);
      console.log(row);
      this.messages = row.content;
      console.log("msgCnt " + this.messages.length);
      console.log(this.messages);
      this.currentMsg_id = row.msg_id;
      if (column.label != "刪除") {
        this.show = true;
        console.log(this.componentShowList.length);
        if (this.componentShowList.length) {
          this.componentShowList = [];
          var a;
          // for (a = 0; a < this.lastComLen; a++) {                  //加了反而錯this.destroyedCnt
          //   this.$refs.componentShowList[a].destroyElement();
          // }
        } else {
          this.rebuildShow();
        }
      } else {
        console.log("deleteAutoReply " + row.reply_id);
        this.deleteAuto(row.reply_id);
        this.componentShowList = [];
        this.lastComLen = 0;
      }
    },
    onclick(row, column) {
      this.destroyedCnt = 0;
      this.lastComLen = this.componentShowList.length;
      console.log(column.label);
      console.log(row);
      this.messages = row.content;
      console.log("msgCnt " + this.messages.length);
      console.log(this.messages);
      this.currentMsg_id = row.msg_id;
      if (column.label != "刪除") {
        this.show = true;
        console.log(this.componentShowList.length);
        if (this.componentShowList.length) {
          this.componentShowList = [];
          var a;
          // for (a = 0; a < this.lastComLen; a++) {                  //加了反而錯
          //   this.$refs.componentShowList[a].destroyElement();
          // }
        } else {
          this.rebuildShow();
        }
      } else {
        this.$confirm("如自動回覆或歡迎訊息有此訊息也將一併被刪除！")
          .then(_ => {
            console.log("deleteMsg " + row.msg_id);
            this.deleteMsg(row.msg_id);
            this.componentShowList = [];
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
          this.componentShowList.push({ text: "showMultiFlex", id: i });
        } else if (this.messages[i].type == "imagemap") {
          this.componentShowList.push({ text: "showImageMsg", id: i });
        } else if (this.messages[i].type == "image") {
          this.componentShowList.push({ text: "showImageOnly", id: i });
        } else if (this.messages[i].type == "text") {
          this.componentShowList.push({ text: "showText", id: i });
        } else if (this.messages[i].type == "video") {
          this.componentShowList.push({ text: "showVideo", id: i });
        }
      }
    },
    deleteAuto(Idx) {
      this.loadingAuto = true;
      let token = getToken('Token');
      if (this.tableData.length == 1) {
        this.paginations_Auto.pageIndex == 1
          ? 1
          : this.paginations_Auto.pageIndex--;
      }
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/delete_auto",
        data: {
          reply_id: Idx
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        this.getAutoList();
        console.log(res);
      });
    },
    deleteMsg(Idx) {
      this.loading = true;
      let token = getToken('Token');
      if (this.tableData.length == 1) {
        this.paginations.pageIndex == 1 ? 1 : this.paginations.pageIndex--;
      }
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
    getAutoList() {
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/query_auto",
        data: {
          limit: this.paginations_Auto.pageSize,
          page: this.paginations_Auto.pageIndex
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        console.log(res.data.data.length);
        console.log(res.data.data);
        this.loadingAuto = false;
        this.paginations_Auto.total = res.data.total;
        this.tableAutoData = res.data.data;
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
        // console.log(res.data);
        // console.log(res.data.data.length);
        // console.log(res.data.data);
        this.loading = false;
        this.paginations.total = res.data.total;
        this.tableData = res.data.data;
        this.welcome_msg = res.data.welcome;
        if (this.welcome_msg) {
          var i, which;
          for (i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].msg_id == this.welcome_msg) {
              which = i;
              break;
            }
          }
          var tmp = this.tableData.splice(which, 1);
          this.tableData.unshift(tmp[0]);
        }
      });
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
    // 每页多少条切换
    handleSizeChange_Auto(pageSize) {
      this.loadingAuto = true;
      this.paginations_Auto.pageSize = pageSize;
      this.getAutoList();
    },
    // 上下分页
    handleCurrentChange_Auto(page) {
      this.loadingAuto = true;
      this.paginations_Auto.pageIndex = page;
      this.getAutoList();
    },
    handleClose(done) {
      this.$confirm("設定並未儲存")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    parentGetLeabels(labels) {
      this.label_list = labels;
    },
    checkReply() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("success");
          this.setAutoReply();
          this.autoReplyDialogVisible = false;
          return true;
        } else {
          // alert("關鍵字不得為空!!");
          this.$message({
            message: "關鍵字不得為空!!",
            type: "warning"
          });
          console.log("form fail");
          return false;
        }
      });
    },
    setAutoReply() {
      console.log("post set auto");

      var jsonData = {
        keyword: this.form.keyword,
        msg_id: this.AutoMsg_id,
        label_list: this.label_list,
        // welcome_msg: this.welcome_radio ? 1 : 0
      };
      console.log(jsonData);
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/auto_reply",
        data: jsonData,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        console.log(res);
        if (this.welcome_radio) {
          this.loading = true;
          this.getMsgList();
        } else {
          this.loadingAuto = true;
          this.getAutoList();
        }
        if (res.data.message == "upload completed") {
          this.$message({
            message: "Upload completed !",
            type: "success"
          });
        } else if (res.data.message == "keyword has been exist!") {
          this.$message({
            message: "Keyword has been existed !",
            type: "warning"
          });
        } else {
          this.$message.error("Fail !");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fillcontain {
  padding-bottom: 0;
}
i {
  font-size: 20px;
}

.contain {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
  min-height: 100vh;
}
.contain2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  // padding: 10px;
  // margin-bottom: 20px;
  width: 100%;
}
.contain3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px;
  // margin-bottom: 20px;
  width: 800px;
}
.contain4 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: 69px;
}
.pagination {
  padding: 10px 20px;
  text-align: right;
}
.space {
  //background: rgb(255, 255, 255);
  padding: 5px;
  height: 10px;
  width: 50px;
  //border-radius: 15px;
}
.images-preview {
  border-radius: 20px 20px 20px 20px;
  .img-wrapper {
    img {
      border-radius: 20px 20px 20px 20px;
    }
  }
}
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
h1 {
  font-size: 20px;
  font-weight: bold;
  // font-family: "新細明體","Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  //   "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  i {
    margin-right: 5px;
  }
}
.el-icon-time {
  font-size: 12px;
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
</style>



