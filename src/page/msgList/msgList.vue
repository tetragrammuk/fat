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
              icon="el-icon-s-promotion"
              type="primary"
              round
              size="medium"
              @click="broadcastOnclick"
            >廣播推送</el-button>
            <!-- new one  -->
            <el-dialog title="推送分眾廣播" :visible.sync="broadcastDialogVisible" width="40%">
              <el-form ref="form" :model="form" label-width="200px" :rules="rules">
                <el-form-item label="訊息腳本" prop="row_email">
                  <el-col :span="20">
                    <el-select v-model="PushMsg_id" size="medium" placeholder="請選擇訊息">
                      <el-option
                        v-for="item in broadcastTableData"
                        :key="item.msg_id"
                        :label="item.name"
                        :value="item.msg_id"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="發送對象" prop="row_phone">
                  <el-col :span="20">
                    <div>
                      <el-radio v-model="broadcast_radio_union" label="true">符合任意條件(聯集)</el-radio>
                    </div>

                    <div>
                      <el-radio v-model="broadcast_radio_union" label="false">同時滿足條件(交集)</el-radio>
                      <div class="select_filter">
                        <div>包含標籤:</div>
                        <el-select
                          v-model="labelsForBroadcast"
                          multiple
                          size="medium"
                          placeholder="請選擇標籤"
                          @change="options_change"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.label_id"
                            :label="item.label_name"
                            :value="item.label_id"
                          ></el-option>
                        </el-select>
                        <div>排除標籤:</div>
                        <el-select
                          v-model="Not_labelsForBroadcast"
                          multiple
                          size="medium"
                          placeholder="請選擇標籤"
                          @change="options_change"
                        >
                          <el-option
                            v-for="item in Not_options"
                            :key="item.label_id"
                            :label="item.label_name"
                            :value="item.label_id"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-form-item>

                <el-form-item label="發送人數試算">
                  <el-button @click="sending_number_f">點我試算</el-button>
                  <flip-number class="flip_number" :value="Send_people_number" :speed="200"></flip-number>
                </el-form-item>

                <el-form-item label="會員總人數">
                  <flip-number class="flip_number" :value="Total_people_number" :speed="200"></flip-number>
                </el-form-item>

                <el-divider></el-divider>
                <el-form-item label="發送時間" prop="row_jointime">
                  <div>
                    <el-radio
                      v-model="broadcast_radio"
                      label="立即發送"
                      @change="broadcast_time_disabled_f"
                    >立即發送(測試訊息 限150人)</el-radio>
                  </div>
                  <div>
                    <el-radio
                      v-model="broadcast_radio"
                      label="預約時間"
                      @change="broadcast_time_disabled_f"
                    >預約時間</el-radio>
                  </div>
                  <el-col :span="8">
                    <el-date-picker
                      :disabled="radio_select"
                      type="date"
                      v-model="broadcast_date"
                      style="width: 100%;"
                      placeholder="選擇日期"
                      :picker-options="pickerOptions"
                      value-format="yyyy M d"
                    ></el-date-picker>
                  </el-col>
                  <el-col :span="8">
                    <el-time-select
                      :disabled="radio_select"
                      v-model="broadcast_time"
                      :picker-options="{
                            start: '00:00',
                            step: '00:10',
                            end: '24:00'
                          }"
                      placeholder="選擇時間"
                      style="width: 100%;"
                    ></el-time-select>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="checkPush">確 定</el-button>
                  <el-button @click="broadcastDialogVisible = false">取 消</el-button>
                  <!-- <el-button @click="tttt">ttt</el-button> -->
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>

          <div class="table_container" style="width:601px">
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
              <el-table-column property="name" label="訊息名稱" width="190" align="center"></el-table-column>
              <el-table-column label="創建時間" width="270" align="center">
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
                <i class="el-icon-timer"></i>
                排程清單
              </h1>
            </el-divider>

            <div class="table_container" style="width:831px; ">
              <el-table
                v-loading="loading_Schedule"
                :data="tableScheduleData"
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
                    >{{scope.$index+(paginations_Schedule.pageIndex - 1) * paginations_Schedule.pageSize + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  style="cursor: pointer;"
                  property="msg_name"
                  label="訊息名稱"
                  width="150"
                  align="center"
                ></el-table-column>
                <el-table-column label="集合類型" width="90" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.union == 'false'">交集</span>
                    <span v-else>聯集</span>
                  </template>
                </el-table-column>
                <el-table-column label="受眾標籤(包含)" width="160" align="center">
                  <template slot-scope="scope">
                    <el-tag :key="index" v-for="(tag, index) in scope.row.object.list_yes">{{tag}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="受眾標籤(排除)" width="160" align="center">
                  <template slot-scope="scope">
                    <el-tag
                      type="danger"
                      :key="index"
                      v-for="(tag, index) in scope.row.object.list_no"
                    >{{tag}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="排程時間" width="210" align="center">
                  <template slot-scope="scope">
                    <div
                      style="display: flex; flex-direction: row; justify-content: center; align-items: center;"
                    >
                      <el-tag :type="scope.row.color">
                        <i class="el-icon-alarm-clock"></i>
                      </el-tag>
                      <el-tag :type="scope.row.color">{{scope.row.timing}}</el-tag>
                      <i
                        class="el-icon-error"
                        style="cursor: pointer;"
                        @click="cancel(scope.row.task_id)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-row>
                <el-col :span="24">
                  <div class="pagination">
                    <el-pagination
                      background
                      v-if="paginations_Schedule.total > 0"
                      :page-sizes="paginations_Schedule.pageSizes"
                      :page-size="paginations_Schedule.pageSize"
                      :layout="paginations_Schedule.layout"
                      :total="paginations_Schedule.total"
                      :current-page="paginations_Schedule.pageIndex"
                      @current-change="handleCurrentChange_Schedule"
                      @size-change="handleSizeChange_Schedule"
                    ></el-pagination>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;"
          >
            <el-divider content-position="left">
              <h1 class="contain2">
                <i class="el-icon-s-order"></i>歷史訊息
              </h1>
            </el-divider>
            <div class="table_container" style="width:831px; ">
              <el-table
                v-loading="loading_History"
                :data="tableHistoryData"
                border
                stripe
                highlight-current-row
                header-cell-class-name="table-header-class"
                style="width:100%; cursor: pointer;"
                @row-click="msg_sending_history_open"
              >
                <el-table-column label="序號" width="60" align="center">
                  <template slot-scope="scope">
                    <span
                      style="cursor: pointer;"
                    >{{scope.$index+(paginations_History.pageIndex - 1) * paginations_History.pageSize + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  style="cursor: pointer;"
                  property="name"
                  label="訊息名稱"
                  width="150"
                  align="center"
                ></el-table-column>
                <el-table-column label="集合類型" width="90" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.union == 'false'">交集</span>
                    <span v-else>聯集</span>
                  </template>
                </el-table-column>
                <el-table-column label="受眾標籤(包含)" width="160" align="center">
                  <template slot-scope="scope">
                    <el-tag :key="index" v-for="(tag, index) in scope.row.object.list_yes">{{tag}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="受眾標籤(排除)" width="160" align="center">
                  <template slot-scope="scope">
                    <el-tag
                      type="danger"
                      :key="index"
                      v-for="(tag, index) in scope.row.object.list_no"
                    >{{tag}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="推播時間" width="210" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.event_time }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-row>
                <el-col :span="24">
                  <div class="pagination">
                    <el-pagination
                      background
                      v-if="paginations_History.total > 0"
                      :page-sizes="paginations_History.pageSizes"
                      :page-size="paginations_History.pageSize"
                      :layout="paginations_History.layout"
                      :total="paginations_History.total"
                      :current-page="paginations_History.pageIndex"
                      @current-change="handleCurrentChange_History"
                      @size-change="handleSizeChange_History"
                    ></el-pagination>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <!-- <div class="space"></div> -->
        <div>
          <transition name="slide-fade">
            <div
              class="contain"
              style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;margin-left:50px"
              v-if="show"
            >
              <h1 class="contain4">
                <i class="el-icon-mobile-phone"></i>訊息預覽
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
        <!-- <div class="space"></div> -->

        <!-- dialog -->

            <el-dialog 
            width="50%"
            title="歷史訊息進階分析"
            :visible.sync="dialog_msg_sending_history" 
            :close-on-click-modal="true">
            
            <div class ="msg_sending_history_1">
            <el-form >
            <el-form-item  label="發送目標人數">
            {{send_target_number}}
            </el-form-item>
            <el-form-item  label="發送成功人數">
            {{send_success_number}}
            </el-form-item>
            <el-form-item  label="發送失敗人數">
            {{send_failed_number}}
            </el-form-item>     
            </el-form>
            <Pie-chart 
            :strokeWidth="20"
            :radius="110"
            :transitionDuration="1000"
            :value="send_success_ratio"
            >
            <template v-slot:footer>
              <b>發送成功率</b>
            </template>
            </Pie-chart>
            </div>
            <el-divider ></el-divider>
            
            <div class ="msg_sending_history_1">
            <el-form :label-position="labelPosition" label-width="80px" >
            <el-form-item  label="已讀次數">
            {{send_read_number}}
            </el-form-item>
            </el-form>
            <Pie-chart 
            :strokeWidth="20"
            :radius="55"
            :transitionDuration="1000"
            :value="send_read_ratio"
            >
            <template v-slot:footer>
              <b>已讀率</b>
            </template>
            </Pie-chart>
            <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item  label="點擊次數">
            {{send_click_number}}
            </el-form-item>  
            </el-form>
            <Pie-chart 
            :strokeWidth="20"
            :radius="55"
            :transitionDuration="1000"
            :value="send_click_ratio"
            >
            <template v-slot:footer>
              <b>互動率</b>
            </template>
            </Pie-chart>
            </div>

            </el-dialog>


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
import flipNumber from "./components/FlipNumber";
import axios from "axios";
import PieChart from "./circle/index.vue";
import { getToken } from '@/utils/auth' ; 
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
      //dialog
      dialog_msg_sending_history:false,// 進階訊息開啟或關閉
      labelPosition:"top",

      send_click_number:13951,
      send_read_number:123181,
      send_target_number:12151,
      send_success_number:10511,
      send_failed_number:2011,
      send_success_ratio:90.5,
      send_click_ratio:70.5,
      send_read_ratio:80.5,

      Total_people_number: "0", // 會員總人數
      Send_people_number: "0", //試算的人數
      radio_select: true, // 日期選擇匡是否禁址
      broadcast_radio: "立即發送", //預約的單選radio
      broadcast_radio_union: "true", // 單選filter
      radio_select_filter: true, // 單選filter 是否顯示
      broadcast_time: "", // 預約廣播選擇的時間
      broadcast_date: "", // 預約廣播選擇的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },

      broadcastDialogVisible: false,
      broadcastTableData: [],
      tableData: [],
      tableScheduleData: [],
      tableHistoryData: [],
      PushMsg_id: "",
      AutoMsg_id: "",
      label_list: [],
      options: [], // filter 是的選項種類
      Not_options: [], // filter 不是的選項種類
      options_origin: [], //最完整的標籤型態
      labelsForBroadcast: [], // 標籤是
      Not_labelsForBroadcast: [], // 標籤不是
      loading: true,
      loading_Schedule: true,
      loading_History: true,
      //需要给分页组件传的信息
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      paginations_Schedule: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      paginations_History: {
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
    addLabel,
    flipNumber,
    PieChart
  },
  created() {
    console.log("addlistener msgList componentHandSharkEvent");

    // [註冊監聽事件]
    this.$bus.$on("componentHandSharkEvent", this.comlistener);
    // [註冊監聽事件]
    this.$bus.$on("flexHandSharkEvent", this.flexlistener);
    this.$bus.$on("destroyed", this.destroyedlistener);
  },
  beforeDestroy: function() {
    console.log("beforeDestroy msgList");

    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除 specialEvent 所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    this.$bus.$off("flexHandSharkEvent", this.flexlistener);
    this.$bus.$off("componentHandSharkEvent", this.comlistener);
    this.$bus.$off("destroyed", this.destroyedlistener);
  },
  mounted() {
    this.geMsgList();
    this.getHistoryMsgList();
    this.getScheduleMsgList();
  },
  methods: {
    //開啟進階訊息
    
    msg_sending_history_open(row,event,column){
      let token = getToken('Token');
      axios.post('https://test-backend-dot-flow-263607.appspot.com/advanced_history',
      {req_id:row.req_id},
      { headers: {
      'x-access-token': token
      }
      }
      ).then(response=>(
      this.dialog_msg_sending_history =true,
      this.send_click_number = response.data.click,
      this.send_read_number = response.data.impression,
      this.send_target_number = response.data.total_target,
      this.send_success_number = response.data.delivered,
      this.send_failed_number = response.data.failed,
      this.send_success_ratio = Math.floor(response.data.rate_delivered*100)/100,
      this.send_click_ratio = Math.floor(response.data.rate_click*100)/100,
      this.send_read_ratio = Math.floor(response.data.rate_impression*100)/100
      )
      )

    },

    cancel(id) {
      this.$confirm("確定清除此排程?")
        .then(_ => {
          if (this.tableScheduleData.length == 1) {
            this.paginations_Schedule.pageIndex == 1
              ? 1
              : this.paginations_Schedule.pageIndex--;
          }
          let token = getToken('Token');
          axios({
            method: "post",
            baseURL: this.APIbaseURL,
            url: "/delete_task",
            data: {
              task_id: id
            },
            headers: {
              "Content-Type": "application/json",
             'x-access-token': token
            }
          }).then(response => {
            if (response.status == 200) {
              this.loading_Schedule = true;
              this.getScheduleMsgList();
              this.$message({
                message: response.data.message,
                type: response.data.message == "error" ? "error" : "success"
              });
            }
          });
          done();
        })
        .catch(_ => {});
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
    //判定broadcast 日期選擇公式
    broadcast_time_disabled_f() {
      if (this.broadcast_radio == "立即發送") {
        this.radio_select = true;
      } else {
        this.radio_select = false;
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
        this.$bus.$emit(
          "imageMsgUrlEvent" + event,
          this.messages[event].baseUrl
        );
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
      console.log("receive msgList flexHandSharkEvent " + event + " " + j);
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
      this.destroyedCnt = 0;
      this.lastComLen = this.componentShowList.length;
      console.log("onclick lastComLen = " + this.lastComLen);
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
        this.geMsgList();
        console.log(res);
      });
    },
    geMsgList() {
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
    getHistoryMsgList() {
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/query_msg_history",
        data: {
          limit: this.paginations_History.pageSize,
          page: this.paginations_History.pageIndex
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        console.log(res.data);
        this.loading_History = false;
        this.paginations_History.total = res.data.total;
        this.tableHistoryData = res.data.history;
      });
    },
    getScheduleMsgList() {
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/query_task",
        data: {
          limit: this.paginations_Schedule.pageSize,
          page: this.paginations_Schedule.pageIndex
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        console.log(res.data);
        this.loading_Schedule = false;
        this.paginations_Schedule.total = res.data.total;
        this.tableScheduleData = res.data.data;

        var datetimeNOW = new Date();
        var day;
        var time;
        var diff;
        var i;
        for (i = 0; i < this.tableScheduleData.length; i++) {
          day = this.tableScheduleData[i].timing.split(" ")[0].split("-")[2];
          time = this.tableScheduleData[i].timing.split(" ")[1].split(":");
          diff =
            parseInt(day) * 24 * 60 +
            parseInt(time[0]) * 60 +
            parseInt(time[1]) -
            (datetimeNOW.getDate() * 24 * 60 +
              datetimeNOW.getHours() * 60 +
              datetimeNOW.getMinutes());

          if (diff < 60) {
            this.tableScheduleData[i].color = "danger";
          } else if (diff < 24 * 60) {
            this.tableScheduleData[i].color = "warning";
          } else {
            this.tableScheduleData[i].color = "success";
          }
        }
      });
    },
    sending_number_f() {
      var jsonData = {
        union: this.broadcast_radio_union,
        include: {
          gender: [],
          label_id: []
        },
        exclude: {
          gender: [],
          label_id: []
        }
      };
      jsonData.include.label_id = JSON.parse(
        JSON.stringify(this.labelsForBroadcast)
      );
      jsonData.exclude.label_id = JSON.parse(
        JSON.stringify(this.Not_labelsForBroadcast)
      );
      //交集
      if (this.broadcast_radio_union == "false") {
        //include
        if (
          this.labelsForBroadcast.indexOf("全部") != -1 &&
          this.labelsForBroadcast.length == 1
        ) {
          jsonData.include = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.labelsForBroadcast.indexOf("全部") != -1) {
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("全部"),
              1
            );
          }
          if (this.labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.include.gender.push("男生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("男生"),
              1
            );
          }
          if (this.labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.include.gender.push("女生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("女生"),
              1
            );
          }
        }
        //exclude
        if (
          this.Not_labelsForBroadcast.indexOf("全部") != -1 &&
          this.Not_labelsForBroadcast.length == 1
        ) {
          jsonData.exclude = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.Not_labelsForBroadcast.indexOf("全部") != -1) {
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("全部"),
              1
            );
          }
          if (this.Not_labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.exclude.gender.push("男生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("男生"),
              1
            );
          }
          if (this.Not_labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.include.gender.push("女生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("女生"),
              1
            );
          }
        }
        //聯集
      } else {
        //include
        if (this.labelsForBroadcast.indexOf("全部") != -1) {
          jsonData.include = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.include.gender.push("男生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("男生"),
              1
            );
          }
          if (this.labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.include.gender.push("女生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("女生"),
              1
            );
          }
        }
        //exclude
        if (this.Not_labelsForBroadcast.indexOf("全部") != -1) {
          jsonData.exclude = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.Not_labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.exclude.gender.push("男生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("男生"),
              1
            );
          }
          if (this.Not_labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.exclude.gender.push("女生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("女生"),
              1
            );
          }
        }
      }
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/people_number",
        data: jsonData,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(response => {
        console.log(response);
        if (response.status == 200) {
          this.Send_people_number = response.data.target;
          this.Total_people_number = response.data.total;
        } else {
          this.$message.error("ERROR 701");
        }
      });
    },

    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.loading = true;
      this.paginations.pageSize = pageSize;
      this.geMsgList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.loading = true;
      this.paginations.pageIndex = page;
      this.geMsgList();
    },
    // 每页多少条切换
    handleSizeChange_Schedule(pageSize) {
      this.loading_Schedule = true;
      this.paginations_Schedule.pageSize = pageSize;
      this.getScheduleMsgList();
    },
    // 上下分页
    handleCurrentChange_Schedule(page) {
      this.loading_Schedule = true;
      this.paginations_Schedule.pageIndex = page;
      this.getScheduleMsgList();
    },
    // 每页多少条切换
    handleSizeChange_History(pageSize) {
      this.loading_History = true;
      this.paginations_History.pageSize = pageSize;
      this.getHistoryMsgList();
    },
    // 上下分页
    handleCurrentChange_History(page) {
      this.loading_History = true;
      this.paginations_History.pageIndex = page;
      this.getHistoryMsgList();
    },
    parentGetLeabels(labels) {
      this.label_list = labels;
    },
    arrChange(a, b) {
      for (var i = 0; i < b.length; i++) {
        for (var j = 0; j < a.length; j++) {
          if (a[j].label_id == b[i]) {
            //如果是id相同的，那么a[ j ].id == b[ i ].id
            a.splice(j, 1);
            j = j - 1;
          }
        }
      }
      return a;
    },
    options_change() {
      this.Not_options = JSON.parse(JSON.stringify(this.options_origin));
      this.options = JSON.parse(JSON.stringify(this.options_origin));

      this.Not_options = this.arrChange(
        this.Not_options,
        this.labelsForBroadcast
      );
      console.log("NON_OPTIONS" + this.Not_options);
      this.options = this.arrChange(this.options, this.Not_labelsForBroadcast);
    },
    broadcastOnclick() {
      this.broadcastDialogVisible = true;
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
        this.broadcastTableData = res.data.data;
      });
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/push_msg_tag",
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(response => {
        console.log(response);
        this.options = response.data.data;
        this.options.unshift({ label_id: "全部", label_name: "全部" });
        this.options.unshift({ label_id: "男生", label_name: "男生" });
        this.options.unshift({ label_id: "女生", label_name: "女生" });

        this.Not_options = JSON.parse(JSON.stringify(this.options));

        this.options_origin = JSON.parse(JSON.stringify(this.options));
      });
    },
    checkPush() {
      var datetimeNOW = new Date();
      var broadcast_datetime = this.broadcast_date.split(" ");
      var broadcast_splitTime = this.broadcast_time.split(":");
      var time =
        parseInt(broadcast_splitTime[0]) * 60 +
        parseInt(broadcast_splitTime[1]);
      console.log(broadcast_datetime);

      if (this.PushMsg_id == "") {
        this.$message.error("請選擇推播訊息!!");
      } else if (this.labelsForBroadcast.length == 0) {
        this.$message.error("請選擇推播對象!!");
      } else if (
        this.broadcast_radio == "預約時間" &&
        (this.broadcast_time == "" || this.broadcast_date == "")
      ) {
        this.$message.error("請選擇預約時間!!");
      } else if (
        this.broadcast_radio == "預約時間" &&
        this.broadcast_time != "" &&
        this.broadcast_date != "" &&
        broadcast_datetime[0] == datetimeNOW.getFullYear().toString() &&
        broadcast_datetime[1] == (datetimeNOW.getMonth() + 1).toString() &&
        broadcast_datetime[2] == datetimeNOW.getDate().toString() &&
        time < datetimeNOW.getHours() * 60 + datetimeNOW.getMinutes() + 30
      ) {
        this.$message.error("預約時間錯誤!! 僅能預約30分鐘後");
      } else {
        this.push(broadcast_datetime, broadcast_splitTime);
      }
    },
    push(date, time) {
      console.log("push");
      var jsonData = {
        msg_id: this.PushMsg_id,
        union: this.broadcast_radio_union,
        include: {
          gender: [],
          label_id: []
        },
        exclude: {
          gender: [],
          label_id: []
        }
      };
      jsonData.include.label_id = JSON.parse(
        JSON.stringify(this.labelsForBroadcast)
      );
      jsonData.exclude.label_id = JSON.parse(
        JSON.stringify(this.Not_labelsForBroadcast)
      );
      //交集
      if (this.broadcast_radio_union == "false") {
        //include
        if (
          this.labelsForBroadcast.indexOf("全部") != -1 &&
          this.labelsForBroadcast.length == 1
        ) {
          jsonData.include = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.labelsForBroadcast.indexOf("全部") != -1) {
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("全部"),
              1
            );
          }
          if (this.labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.include.gender.push("男生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("男生"),
              1
            );
          }
          if (this.labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.include.gender.push("女生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("女生"),
              1
            );
          }
        }
        //exclude
        if (
          this.Not_labelsForBroadcast.indexOf("全部") != -1 &&
          this.Not_labelsForBroadcast.length == 1
        ) {
          jsonData.exclude = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.Not_labelsForBroadcast.indexOf("全部") != -1) {
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("全部"),
              1
            );
          }
          if (this.Not_labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.exclude.gender.push("男生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("男生"),
              1
            );
          }
          if (this.Not_labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.include.gender.push("女生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("女生"),
              1
            );
          }
        }
        //聯集
      } else {
        //include
        if (this.labelsForBroadcast.indexOf("全部") != -1) {
          jsonData.include = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.include.gender.push("男生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("男生"),
              1
            );
          }
          if (this.labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.include.gender.push("女生");
            jsonData.include.label_id.splice(
              jsonData.include.label_id.indexOf("女生"),
              1
            );
          }
        }
        //exclude
        if (this.Not_labelsForBroadcast.indexOf("全部") != -1) {
          jsonData.exclude = {
            gender: [],
            label_id: []
          };
        } else {
          if (this.Not_labelsForBroadcast.indexOf("男生") != -1) {
            jsonData.exclude.gender.push("男生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("男生"),
              1
            );
          }
          if (this.Not_labelsForBroadcast.indexOf("女生") != -1) {
            jsonData.exclude.gender.push("女生");
            jsonData.exclude.label_id.splice(
              jsonData.exclude.label_id.indexOf("女生"),
              1
            );
          }
        }
      }

      if (this.broadcast_radio == "預約時間") {
        jsonData.year = parseInt(date[0]);
        jsonData.month = parseInt(date[1]);
        jsonData.day = parseInt(date[2]);
        jsonData.hour = parseInt(time[0]);
        jsonData.minutes = parseInt(time[1]);
        jsonData.second = 0;

        console.log(jsonData);
        let token = getToken('Token');
        axios({
          method: "post",
          baseURL: this.APIbaseURL,
          url: "/create_task",
          data: jsonData,
          headers: {
            "Content-Type": "application/json",
            'x-access-token': token
          }
        }).then(response => {
          console.log(response);
          if (response.status == 200) {
            this.loading_Schedule = true;
            this.getScheduleMsgList();
            this.$message({
              message: response.data.message,
              type: response.data.message == "error" ? "error" : "success"
            });
          } else {
            this.$message.error("ERROR 701");
          }
        });
      } else {
        console.log(jsonData);
        let token = getToken('Token');
        axios({
          method: "post",
          baseURL: this.APIbaseURL,
          url: "/push_msg",
          data: jsonData,
          headers: {
            "Content-Type": "application/json",
           'x-access-token': token
          }
        }).then(response => {
          console.log(response);
          if (response.status == 200) {
            // this.loading_History = true;
            // this.getHistoryMsgList();
            this.$message({
              message: response.data.message,
              type: response.data.message == "error" ? "error" : "success"
            });
          } else {
            this.$message.error("ERROR 702");
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flip_number {
  margin-top: 10px;
}
.fillcontain {
  padding-bottom: 0;
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
  // margin-bottom: 10px;
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
  width: 600px;
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

i {
  font-size: 20px;
}
.el-icon-time {
  font-size: 12px;
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
.primaryButton {
  font-size: 18px;
  font-weight: bold;
}
.pagination {
  padding: 10px 20px;
  text-align: right;
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
.select_filter {
  // border: 1px solid #bdb5b5;
  // padding : 20px ;
  // border-radius: 20px 20px 20px 20px;
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

.msg_sending_history_1{
  font-size:18px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: center;
  justify-content:space-around;
   align-items:center;
}

.msg_sending_history_1 /deep/ .el-form-item__content{
  font-size:18px;
}
.msg_sending_history_1 /deep/ .el-form-item__label{
  font-size:18px;
}
</style>



