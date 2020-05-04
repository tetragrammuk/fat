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
            <!-- <el-button
              class="primaryButton"
              type="primary"
              size="medium"
              round
              @click="autoReplyOnclick"
              icon="el-icon-share"
            >自動回覆</el-button> -->
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
                  <el-form-item label="是否為歡迎訊息">
                    <el-radio v-model="welcome_radio" :label="true" @change="welcome_radio_f">是</el-radio>
                    <el-radio v-model="welcome_radio" :label="false">否</el-radio>
                  </el-form-item>
                  <el-button
                    style="margin-left:50px"
                    size="large"
                    type="info"
                    plain
                  >歡 迎 訊 息 會 覆 蓋 掉 原 本 的，請 再 三 確 認</el-button>
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
            <div class="contain3">
              <el-divider content-position="left">
                <h1 class="contain2">
                  <i class="el-icon-setting"></i>歡迎訊息設定
                </h1>
              </el-divider>
                <el-button
                  class="primaryButton"
                  type="primary"
                  size="medium"
                  round
                  @click="welcome_setting"
                  icon="el-icon-share"
                >變更設定</el-button>
            </div>
            <div class="table_container" style="width:800px;">
                <div class="welcome_hint" > 
                  <el-button type="info" plain>
                  <div style="margin-top:5px;margin-bottom:10px;">在此設定-新會員-加入時的歡迎訊息 </div>
                  <div style="margin-top:10px;margin-bottom:5px;">請注意 -第二天開始後- 的訊息會納入Line計費</div></el-button>
                </div>
                <el-form label-position="center" ref="welcome" label-width="300px" class="demo-ruleForm" :rules="rules" :model="welcome">
                 
                  <el-form-item label="每日發布訊息時間" prop="time" >
                      <el-time-select
                        v-model="welcome.time"
                        :picker-options="{
                          start: '00:00',
                          step: '00:10',
                          end: '24:00'
                        }"
                        placeholder="選擇時間">
                      </el-time-select>
                  </el-form-item>
                
                  <el-form-item label="(會員加入即發出)-第一天" prop="day1" >
                      <el-select v-model="welcome.day1" size="large" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                      <el-switch
                        ref="active1"
                        class="switch"
                        v-model="welcome.active1"
                        active-value="true"
                        inactive-value="false"
                        active-text="啟用"
                        inactive-text="取消">
                      </el-switch>
                  </el-form-item>
                  <el-form-item label="第二天" prop="day2">
                      <el-select v-model="welcome.day2" size="large" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                      <el-switch
                        ref="active2"
                        class="switch"
                        v-model="welcome.active2"
                        active-value="true"
                        inactive-value="false"
                        active-text="啟用"
                        inactive-text="取消">
                      </el-switch>
                  </el-form-item>
                  <el-form-item label="第三天" prop="day3">
                      <el-select v-model="welcome.day3" size="large" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                      <el-switch
                        ref="active3"
                        class="switch"
                        active-value="true"
                        inactive-value="false"
                        v-model="welcome.active3"
                        active-text="啟用"
                        inactive-text="取消">
                      </el-switch>
                  </el-form-item>
                  <el-form-item label="第四天" prop="day4">
                      <el-select v-model="welcome.day4" size="large" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                      <el-switch
                        ref="active4"
                        class="switch"
                        active-value="true"
                        inactive-value="false"
                        v-model="welcome.active4"
                        active-text="啟用"
                        inactive-text="取消">
                      </el-switch>
                  </el-form-item>
                  <el-form-item label="第五天" prop="day5">
                      <el-select v-model="welcome.day5" size="large" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                      <el-switch
                        ref="active5"
                        class="switch"
                        active-value="true"
                        inactive-value="false"
                        v-model="welcome.active5"
                        active-text="啟用"
                        inactive-text="取消">
                      </el-switch>
                  </el-form-item>
                  <el-form-item label="第六天" prop="day6">
                      <el-select v-model="welcome.day6" size="large" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                      <el-switch
                        ref="active6"
                        class="switch"
                        active-value="true"
                        inactive-value="false"
                        v-model="welcome.active6"
                        active-text="啟用"
                        inactive-text="取消">
                      </el-switch>
                  </el-form-item>
                  <el-form-item label="第七天" prop="day7">
                      <el-select v-model="welcome.day7" size="large" placeholder="請選擇訊息">
                        <el-option
                          v-for="item in autoReplyTableData"
                          :key="item.msg_id"
                          :label="item.name"
                          :value="item.msg_id"
                        ></el-option>
                      </el-select>
                      <el-switch
                        ref="active7"
                        class="switch"
                        active-value="true"
                        inactive-value="false"
                        v-model="welcome.active7"
                        active-text="啟用"
                        inactive-text="取消">
                      </el-switch>
                  </el-form-item>
                </el-form>
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
        //welcome 設定 rule  
      var day1_check=(rule,value,callback)=>{

          let active1 = this.$refs.active1.value;
          console.log("下面是active1")
          console.log(active1)
          console.log('ativeSDFFSD='+this.welcome.active1_begin)
          if(active1 != this.welcome.active1_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));  
          }
          if(value !=this.welcome.day1_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };
      var day2_check=(rule,value,callback)=>{
        
          let active2 = this.$refs.active2.value;
          console.log('ative='+active2)

          if(active2 != this.welcome.active2_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));  
          }
          if(value !=this.welcome.day2_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };
      var day3_check=(rule,value,callback)=>{
        
          let active3 = this.$refs.active3.value;
          console.log('ative='+active3)

          if(active3 != this.welcome.active3_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));  
          }
          if(value !=this.welcome.day3_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };
      var day4_check=(rule,value,callback)=>{
        
          let active4 = this.$refs.active4.value;
          console.log('ative='+active4)

          if(active4 != this.welcome.active4_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));  
          }
          if(value !=this.welcome.day4_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };
      var day5_check=(rule,value,callback)=>{
        
          let active5 = this.$refs.active5.value;
          console.log('ative='+active5)
          console.log('welcome.active5_begin='+this.welcome.active5_begin)

          if(active5 != this.welcome.active5_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));  
          }
          if(value !=this.welcome.day5_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };
      var day6_check=(rule,value,callback)=>{
        
          let active6 = this.$refs.active6.value;
          console.log('ative='+active6)

          if(active6 != this.welcome.active6_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));  
          }
          if(value !=this.welcome.day6_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };
      var day7_check=(rule,value,callback)=>{
        
          let active7 = this.$refs.active7.value;
          console.log('ative='+active7)

          if(active7 != this.welcome.active7_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));  
          }
          if(value !=this.welcome.day7_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };

      var time_check=(rule,value,callback)=>{
        
          if(value !=this.welcome.time_begin){
          console.log('rule生效');
          return callback(new Error('有修改 : 按下確定才完成變更'));
          }
      };



    var keywordCheck = (rule, value, callback) => {
      if (!value && this.welcome_radio == false) {
        return callback(new Error("請輸入關鍵字，最多20字"));
      } else {
        return callback();
      }
    };
    return {
      welcome:{
        time:'',
        day1:"",
        active1:"true",
        day2:"",
        active2:"",
        day3:"",
        active3:"",
        day4:"",
        active4:"",
        day5:"",
        active5:"",
        day6:"",
        active6:"",
        day7:"",
        active7:"",

        time_begin:'',
        day1_begin:"",
        active1_begin:"",
        day2_begin:"",
        active2_begin:"",
        day3_begin:"",
        active3_begin:"",
        day4_begin:"",
        active4_begin:"",
        day5_begin:"",
        active5_begin:"",
        day6_begin:"",
        active6_begin:"",
        day7_begin:"",
        active7_begin:""
      },
      welcome_msg:'',
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
        // keyword: [{ validator: keywordCheck, trigger: "blur" }],
        day1:[{validator:day1_check,trigger:'change'}],
        day2:[{validator:day2_check,trigger:'change'}],
        day3:[{validator:day3_check,trigger:'change'}],
        day4:[{validator:day4_check,trigger:'change'}],
        day5:[{validator:day5_check,trigger:'change'}],
        day6:[{validator:day6_check,trigger:'change'}],
        day7:[{validator:day7_check,trigger:'change'}],
        time:[{validator:time_check,trigger:'change'}]
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
    this.Listget();// 一掛載就拿訊息清單
    this.Welcomeget();// 一掛載就拿歡迎設定
  },
  methods: {
    welcome_setting(){
        let token = getToken('Token');
        this.$confirm('是否變更設定', '提示', {
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('before'+this.welcome.active1)

          if(this.welcome.active1 == "true"){
            this.welcome.active1 = "1"
          }else{ this.welcome.active1 = "0" };

          if(this.welcome.active2 == "true"){
            this.welcome.active2 = "1"
          }else{ this.welcome.active2 = "0" };

          if(this.welcome.active3 == "true"){
            this.welcome.active3 = "1"
          }else{ this.welcome.active3 = "0" };

          if(this.welcome.active4 == "true"){
            this.welcome.active4 = "1"
          }else{ this.welcome.active4 = "0" };

          if(this.welcome.active5 == "true"){
            this.welcome.active5 = "1"
          }else{ this.welcome.active5 = "0" };

          if(this.welcome.active6 == "true"){
            this.welcome.active6 = "1"
          }else{ this.welcome.active6 = "0" };

          if(this.welcome.active7 == "true"){
            this.welcome.active7 = "1"
          }else{ this.welcome.active7 = "0" };

          axios({
            method: "post",
            baseURL: this.APIbaseURL,
            url: "/set_welcome",
            data: {
              welcome_msg_day1:this.welcome.day1,
              welcome_msg_day2:this.welcome.day2,
              welcome_msg_day3:this.welcome.day3,
              welcome_msg_day4:this.welcome.day4,
              welcome_msg_day5:this.welcome.day5,
              welcome_msg_day6:this.welcome.day6,
              welcome_msg_day7:this.welcome.day7,
              welcome_msg_active1:this.welcome.active1,
              welcome_msg_active2:this.welcome.active2,
              welcome_msg_active3:this.welcome.active3,
              welcome_msg_active4:this.welcome.active4,
              welcome_msg_active5:this.welcome.active5,
              welcome_msg_active6:this.welcome.active6,
              welcome_msg_active7:this.welcome.active7,
              timing:this.welcome.time
            },
            headers: {
              "Content-Type": "application/json",
              'x-access-token': token
            }
          }).then(res => {
              
              if(res.data.message == "success"){
              this.Welcomeget();
              this.$refs.welcome.resetFields();
              this.$message({
              type: 'success',
              message: '成功變更!'
              });}
              else{
              this.$message({
              type: 'info',
              message: '變更失敗!!'
              })}
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '變更取消!!'
          });          
        });
    },
    Welcomeget(){
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/query_welcome",
        data: {
          type:"welcomemsg"
        },
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(res => {
        
        this.welcome.time_begin=res.data.timing,
        this.welcome.day1_begin=res.data.response.day1.msg_id,
        this.welcome.active1_begin=res.data.response.day1.active,
        console.log('是welcome.active1_begin'+this.welcome.active1_begin),
        this.welcome.day2_begin=res.data.response.day2.msg_id,
        this.welcome.active2_begin=res.data.response.day2.active,
        this.welcome.day3_begin=res.data.response.day3.msg_id,
        this.welcome.active3_begin=res.data.response.day3.active,
        this.welcome.day4_begin=res.data.response.day4.msg_id,
        this.welcome.active4_begin=res.data.response.day4.active,
        this.welcome.day5_begin=res.data.response.day5.msg_id,
        this.welcome.active5_begin=res.data.response.day5.active,
        this.welcome.day6_begin=res.data.response.day6.msg_id,
        this.welcome.active6_begin=res.data.response.day6.active,
        this.welcome.day7_begin=res.data.response.day7.msg_id,
        this.welcome.active7_begin=res.data.response.day7.active,
        
        this.welcome.day1=res.data.response.day1.msg_id,
        this.welcome.active1 = "true";
        this.welcome.active1 = res.data.response.day1.active,
        console.log('我是response.day1.active'+res.data.response.day1.active),
        console.log('我是welcome.active1'+this.welcome.active1),
        this.welcome.day2=res.data.response.day2.msg_id,
        this.welcome.active2=res.data.response.day2.active,
        this.welcome.day3=res.data.response.day3.msg_id,
        this.welcome.active3=res.data.response.day3.active,
        this.welcome.day4=res.data.response.day4.msg_id,
        this.welcome.active4=res.data.response.day4.active,
        this.welcome.day5=res.data.response.day5.msg_id,
        this.welcome.active5=res.data.response.day5.active,
        this.welcome.day6=res.data.response.day6.msg_id,
        this.welcome.active6=res.data.response.day6.active,
        this.welcome.day7=res.data.response.day7.msg_id,
        this.welcome.active7=res.data.response.day7.active,
        this.welcome.time=res.data.timing


      });

    },
    Listget(){
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
        // this.welcome_msg = res.data.welcome;
        // if (this.welcome_msg) {
        //   var i, which;
        //   for (i = 0; i < this.tableData.length; i++) {
        //     if (this.tableData[i].msg_id == this.welcome_msg) {
        //       which = i;
        //       break;
        //     }
        //   }
        //   var tmp = this.tableData.splice(which, 1);
        //   this.tableData.unshift(tmp[0]);
        // }
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
        welcome_msg: this.welcome_radio ? 1 : 0
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
.table_container /deep/.el-form-item__label{
  margin-top:0.5%;
  font-size: 18px;
  
}
.switch{
  margin-left:5%;
}
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
.pagination /deep/.el-pagination {
  display: flex;
}
.table_container {
  margin-bottom: 10px;
  margin-top: 20px;
}
.welcome_hint /deep/.el-button--info.is-plain{
   font-size:20px;
   margin-bottom: 3.5%;
   margin-left:20%;
}
.demo-ruleForm /deep/.el-date-editor.el-input{
      font-size: 18px;
      margin-top:0.75%;
}

.table_container /deep/.el-form-item__error {
  margin-top: 3px;
}
.el-form-item--mini.el-form-item{
  margin-bottom:25px;
}

</style>



