<template>
  <div class="fillcontain">
    <div
      class="contain"
      style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start;"
    >
      <div
        class="contain"
        style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;"
      >
        <div class="contain2">
          <el-button @click="broadcastOnclick">Broadcast</el-button>
          <el-dialog title="推送分眾廣播" :visible.sync="broadcastDialogVisible" width="40%">
            <div
              style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; height: 140px;"
            >
              請選擇要發布的訊息
              <el-select v-model="PushMsg_id" size="medium" placeholder="請選擇訊息">
                <el-option
                  v-for="item in tableData"
                  :key="item.msg_id"
                  :label="item.name"
                  :value="item.msg_id"
                ></el-option>
              </el-select>
              <el-select v-model="labelsForBroadcast" multiple size="medium" placeholder="請選擇標籤">
                <el-option
                  v-for="item in options"
                  :key="item.label_id"
                  :label="item.label_name"
                  :value="item.label_id"
                ></el-option>
              </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="broadcastDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="checkPush">確 定</el-button>
            </span>
          </el-dialog>

          <!-- new one  -->
          <el-dialog title="推送分眾廣播" :visible.sync="broadcastDialogVisible" width="40%">
                <el-form ref="form" :model="form" label-width="200px" :rules="rules">
                    <el-form-item label="訊息腳本" prop="row_email">
                        <el-col :span="20">
                        <el-select v-model="PushMsg_id" size="medium" placeholder="請選擇訊息">
                          <el-option
                            v-for="item in tableData"
                            :key="item.msg_id"
                            :label="item.name"
                            :value="item.msg_id"
                          ></el-option>
                        </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="發送對象" prop="row_phone">
                        <el-col :span="20">
                        <el-select v-model="labelsForBroadcast" multiple size="medium" placeholder="請選擇標籤">
                          <el-option
                            v-for="item in options"
                            :key="item.label_id"
                            :label="item.label_name"
                            :value="item.label_id"
                          ></el-option>
                        </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="發送時間" prop="row_jointime">

                        <div><el-radio v-model="broadcast_radio" label="立即發送" @change="broadcast_time_disabled_f">立即發送</el-radio></div>
                        <div><el-radio v-model="broadcast_radio" label="預約時間"@change="broadcast_time_disabled_f">預約時間</el-radio></div>
                        <el-col :span="7">
                        <el-date-picker :disabled="radio_select"  type="date" v-model="broadcast_date" style="width: 100%;" placeholder="選擇日期"></el-date-picker>
                        </el-col>
                        <el-col :span="7">
                        <el-time-select
                          :disabled="radio_select"
                          v-model="broadcast_time"
                          :picker-options="{
                            start: '00:00',
                            step: '00:15',
                            end: '24:00'
                          }"
                          placeholder="選擇時間"
                          style="width: 100%;"
                          >
                        </el-time-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="checkPush">確 定</el-button>
                      <el-button @click="broadcastDialogVisible = false">取 消</el-button>
                    </el-form-item>
                </el-form>
          </el-dialog>



          <!-- <el-button @click="autoReplyDialogVisible = true">AutoReply</el-button>
          <el-dialog
            title="設定自動回復"
            :visible.sync="autoReplyDialogVisible"
            width="40%"
            :before-close="handleClose"
          >
            <div
              style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; height: 140px;"
            >
              <el-select v-model="AutoMsg_id" size="medium" placeholder="請選擇訊息">
                <el-option
                  v-for="item in tableData"
                  :key="item.msg_id"
                  :label="item.name"
                  :value="item.msg_id"
                ></el-option>
              </el-select>
              <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="keyword">
                  <el-input
                    v-model="form.keyword"
                    placeholder="請輸入關鍵字"
                    maxlength="20"
                    show-word-limit
                    style="width:200px;"
                  ></el-input>
                </el-form-item>
              </el-form>
              <add-label @transferLabels="parentGetLeabels"></add-label>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="autoReplyDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="checkReply">確 定</el-button>
            </span>
          </el-dialog> -->
        </div>
        <div class="table_container" style="width:471px">
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
            <el-table-column
              property="name"
              label="訊息名稱"
              width="150"
              align="center"
            ></el-table-column>
            <el-table-column property="event_time" label="創建時間" width="200" align="center"></el-table-column>
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
      <div class="space"></div>
      <div>
        <transition name="slide-fade">
          <div id="1" class="phone" v-if="show">
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
                    <component ref="componentShowList" :showID="comShow.id" :is="comShow.text"></component>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </transition>
      </div>
      <div class="space"></div>
      <div class="table_container" style="width:400px">
        <el-table
          v-loading="loading"
          :data="tableHistoryData"
          border
          stripe
          highlight-current-row
          header-cell-class-name="table-header-class"
          style="width:100%"
        >
          <el-table-column label="序號" width="60" align="center">
            <template slot-scope="scope">
              <span
                style="cursor: pointer;"
              >{{scope.$index+(paginations.pageIndex - 1) * paginations.pageSize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            style="cursor: pointer;"
            property="name"
            label="訊息名稱"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column property="event_time" label="推播時間" width="200" align="center"></el-table-column>
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
  </div>
</template>

<script>
import showImage from "../customerMsg/components/showImage";
import showImageMsg from "../customerMsg/components/showImageMsg";
import showImageOnly from "../customerMsg/components/showImageOnly";
import showText from "../customerMsg/components/showText";
import showMultiFlex from "../customerMsg/components/showMultiFlex";
import addLabel from "../customerMsg/components/addLabel";
import axios from "axios";
export default {
  data() {
    var keywordCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入關鍵字，最多20字"));
      } else {
        return callback();
      }
    };
    return {
      radio_select:true, // 日期選擇匡是否禁址
      broadcast_radio:'立即發送', //預約的單選radio
      broadcast_time:'', // 預約廣播選擇的時間
      broadcast_date:'',// 預約廣播選擇的日期

      broadcastDialogVisible: false,
      autoReplyDialogVisible: false,
      tableData: [],
      tableHistoryData: [],
      PushMsg_id: "",
      AutoMsg_id: "",
      label_list: [],
      options: [],
      labelsForBroadcast: ["全部"],
      loading: true,
      //需要给分页组件传的信息
      paginations: {
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
    showImage,
    showImageMsg,
    showImageOnly,
    showText,
    showMultiFlex,
    addLabel
  },
  created() {
    console.log("addlistener msgList componentHandSharkEvent");

    // [註冊監聽事件]
    this.$bus.$on("componentHandSharkEvent", this.comlistener);
    // [註冊監聽事件]
    this.$bus.$on("flexHandSharkEvent", this.flexlistener);
    this.$bus.$on("destroyed", event => {
      console.log("destroyed ID " + event);
      this.destroyedCnt++;
      if (this.destroyedCnt == this.lastComLen) {
        this.rebuildShow();
        this.destroyedCnt = 0;
      }
    });
  },
  beforeDestroy: function() {
    console.log("beforeDestroy msgList");

    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("flexHandSharkEvent", this.flexlistener);
    this.$bus.$off("componentHandSharkEvent", this.comlistener);
    this.$bus.$off("destroyed");
  },
  mounted() {
    this.show = true;
    this.geMsgList();
  },
  methods: {
    //判定broadcast 日期選擇公式
    broadcast_time_disabled_f(){
                if(this.broadcast_radio=="立即發送"){
                    this.radio_select=true
                }else{
                  this.radio_select=false
                }
    },
    comlistener(event) {
      console.log("receive msgList componentHandSharkEvent " + event);
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
      } else if (this.messages[event].type == "text") {
        this.$bus.$emit("textEvent" + event, this.messages[event].text);
      }
    },
        flexlistener(event,j){
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
    onclick(row, column) {
      console.log(column.label);
      console.log(row);
      this.messages = row.content;
      console.log("msgCnt " + this.messages.length);
      console.log(this.messages);
      this.currentMsg_id = row.msg_id;
      if (column.label != "刪除") {
        console.log(this.componentShowList.length);
        if (this.componentShowList.length) {
          this.lastComLen = this.componentShowList.length;
          this.componentShowList = [];
          var a;
          // for (a = 0; a < this.lastComLen; a++) {                  //加了反而錯
          //   this.$refs.componentShowList[a].destroyElement();
          // }
        } else {
          this.rebuildShow();
        }
      } else {
        this.$confirm("如自動回復有此訊息也將一併被刪除！")
          .then(_ => {
            console.log("deleteMsg " + row.msg_id);
            this.deleteMsg(row.msg_id);
            this.componentShowList = [];
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
        }
      }
    },
    testt() {
      var jsonData = {
        object: ["U07ed2f1860bd9f02884d95e495e60bab"],
        msg_id: this.currentMsg_id
      };
      console.log(jsonData);
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/push_msg",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res);
      });
    },
    deleteMsg(Idx) {
      this.loading = true;
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/delete_msg",
        data: {
          msg_id: Idx
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        this.geMsgList();
        console.log(res);
      });
    },
    geMsgList() {
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/query_msg",
        //data: jsonData,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
             limit: this.paginations.pageSize, // 一頁有幾條
             page: this.paginations.pageIndex,  // 第幾頁
        }
      }).then(res => {
        console.log(res.data);
        console.log(res.data.data.length);
        console.log(res.data.data);
        this.loading = false;
        this.paginations.total = res.data.data.length;
        this.tableData = res.data.data;
        this.tableHistoryData = res.data.history;
      });
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getUserList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getUserList();
    },
    checkReply() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("success");
          this.setAutoReply();
          this.autoReplyDialogVisible = false;
          return true;
        } else {
          alert("關鍵字不得為空!!");
          console.log("form fail");
          return false;
        }
      });
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
    setAutoReply() {
      console.log("post set auto");
      var jsonData = {
        keyword: this.form.keyword,
        msg_id: this.AutoMsg_id,
        label_list: this.label_list
      };
      console.log(jsonData);

      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/auto_reply",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res);
        alert(res.data.message);
      });
    },
    broadcastOnclick() {
      this.broadcastDialogVisible = true;
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/push_msg_tag",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log(response);
        this.options = response.data.data;
        this.options.unshift({ label_id: "全部", label_name: "全部" });
        this.options.unshift({ label_id: "男生", label_name: "男生" });
        this.options.unshift({ label_id: "女生", label_name: "女生" });
      });
    },
    checkPush() {
      if (this.labelsForBroadcast.length == 0) {
        alert("請選擇推播對象!!");
      } else {
        this.getUserIDs();
      }
    },
    getUserIDs() {
      var jsonData = {
        gender: [],
        label_id: [],
        others: []
      };
      if (this.labelsForBroadcast.indexOf("全部") != -1) {
        jsonData = {
          gender: [],
          label_id: [],
          others: ["全部"]
        };
      } else {
        if (this.labelsForBroadcast.indexOf("男生") != -1) {
          jsonData.gender.push("男生");
        }
        if (this.labelsForBroadcast.indexOf("女生") != -1) {
          jsonData.gender.push("女生");
        }
        jsonData.label_id = this.labelsForBroadcast;
        jsonData.others = [];
      }
      console.log(jsonData);
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/push_msg_filter",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log(response);
        console.log(response.data.user_id);
        this.push(response.data.user_id);
      });
    },
    push(ids) {
      console.log("push");
      console.log(ids);
      var jsonData = {
        object: ids,
        msg_id: this.PushMsg_id
      };
      console.log(jsonData);

      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/push_msg",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fillcontain {
  padding-bottom: 0;
}
.contain {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.contain2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
  width: 400px;
}

.pagination{
       display:flex;
        flex-direction: row ;
        flex-wrap: wrap;
       padding: 10px 20px;
       text-align: center;
}
.pagination /deep/.el-pagination {
       display:flex;
}
.space {
  //background: rgb(255, 255, 255);
  padding: 5px;
  height: 100vh;
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
.clickable-rows {
  tbody tr td {
    cursor: pointer;
  }

  .el-table__expanded-cell {
    cursor: pointer;
  }
}
</style>



