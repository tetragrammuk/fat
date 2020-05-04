<template>
    
    <div class="fillcontain">
        <div class="contain">
            <!-- 字母篩選器 -->
            <div class="keyword">
                    <el-select v-model="select_keyword" >
                        <el-option label="會員名稱" value="name"></el-option>
                        <el-option label="電話" value="phone"></el-option>
                        <el-option label="電子信箱" value="email"></el-option>
                        <el-option label="Line_userID" value="user_id"></el-option>
                    </el-select>
                    <el-input placeholder="請輸入關鍵字" v-model="search_input">
                        <el-button slot="append" icon="el-icon-search" @click="filterpost"></el-button>
                    </el-input>
            </div>   
            <div class ="filter">
            <!-- 1st filter -->
            <div class="filter_1st" v-if="filterslec_count ==0">
                <el-dropdown @command="filter_command_2">
                <el-button-group>
                    <el-button icon="el-icon-view" style="font-size:18px">篩選資料</el-button>
                </el-button-group >
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="標籤" class="drop_font">標籤</el-dropdown-item>
                    <!-- <el-dropdown-item command="加入時間" class="drop_font">加入時間</el-dropdown-item> -->
                    <el-dropdown-item command="性別" class="drop_font">性別</el-dropdown-item>
                    <el-dropdown-item command="電子信箱" class="drop_font">電子信箱</el-dropdown-item>
                    <el-dropdown-item command="電話號碼" class="drop_font">電話號碼</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- 部份篩選/全部篩選 -->
            <div v-if="filterslec_count !==0" class="filter_button" >
                <el-dropdown  trigger ="click" @command="filter_condition_select($event)" >
                <el-button-group>
                    <el-button icon="el-icon-view" type="info" style="font-size:18px">{{filter_select}}</el-button>
                </el-button-group >
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  command="符合所有篩選條件"class="drop_font">符合所有篩選條件</el-dropdown-item>
                    <el-dropdown-item  command="符合任何篩選條件"class="drop_font">符合任何篩選條件</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div> 
            <!-- 時間篩選button -->
            <div v-if="filterslec_count !==0" class="filter_button">
                <el-popover
                placement="bottom-start"
                width="400"
                v-model="time_popo_visible">
                <div style="text-align: left; font-size: 20px">
                    <div>
                        <el-radio v-model="radio_time" label="不限時間" @change="time_area_f">不限時間</el-radio>
                    </div>
                    <div>
                        <el-radio v-model="radio_time" label="過去" @change="time_area_f" >過去</el-radio>
                        <div class ="pasttime">
                            <el-select v-if="past_time_area===true" v-model="select_past_time" placeholder="請選擇" clearable @change="past_time_slec_f">
                            <el-option 
                            v-for="item in past_times"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div>
                        <el-radio  v-model="radio_time" label="自訂" @change="time_area_f" >自訂</el-radio>
                        <el-date-picker v-if="define_time_area===true"
                        style="margin-left:10px"
                        v-model="daterange"
                        type="daterange"
                        start-placeholder="Start time"
                        end-placeholder="End time"
                        value-format="yyyy-MM-dd"
                        @change="define_time_f"
                        :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </div>
                    <el-divider></el-divider>
                    <div style="text-align: right; margin: 0">
                        <el-button type="primary" size="mini" @click="time_popo_visible_f" style="font-size:20px">完成</el-button>
                    </div>
                </div>
                    <el-button slot="reference" icon="el-icon-view" type="info" style="font-size:18px">{{radio_time}} {{time_select}}</el-button>
                </el-popover>
            </div>
            <el-divider direction="vertical"></el-divider>
            <!-- 性別 filter -->
            <div v-if="filterslec_count !==0" class="filter_button" v-for="(male,index) in male_counts" >
                <el-dropdown  trigger ="click" @command="male_command(index, $event)">
                <el-button-group>
                    <el-button type="primary" style="font-size:18px">性別 是 {{male.male}}</el-button>
                    <el-button type="primary" icon="el-icon-close" style="font-size:18px" @click="deletemalebutton(index)"></el-button>
                </el-button-group >
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="男生" class="drop_font">男生</el-dropdown-item>
                    <el-dropdown-item command="女生" class="drop_font">女生</el-dropdown-item>
                    
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- tag button -->
            <div v-if="filterslec_count !==0" class="filter_button" v-for="(tag,index) in tag_counts" >
                <el-popover
                placement="bottom-start"
                width="400"
                v-model="tipVisibles[index]">
                <div style="text-align: left; font-size: 20px">
                    <p>調整時間區間對此條件無效</p>
                    <div>
                        <el-radio v-model="radio_tag[index]" label="是" >是</el-radio>
                        <div>
                        <el-select  size="large" v-if="radio_tag[index]==='是'" v-model="select_tags[index]" multiple placeholder="請選擇標籤" @change="tagselect_f(index,$event)" >
                        <el-option
                            style="font-size:20px"
                            v-for="(item, index) in tags"
                            :key="index"
                            :label="item.label"
                            :value="index">
                        </el-option>
                        </el-select>
                        </div>
                    </div>
                    <div>
                        <el-radio v-model="radio_tag[index]" label="不是">不是</el-radio>
                        <div>
                        <el-select size="large" v-if="radio_tag[index]==='不是'" v-model="select_tags[index]" multiple placeholder="請選擇標籤"@change="tagselect_f(index,$event)">
                        <el-option
                            style="font-size:20px"
                            v-for="(item, index) in tags"
                            :key="index"
                            :label="item.label"
                            :value="index">
                        </el-option>
                        </el-select>
                        </div>
                    </div>
                </div>
                <el-divider></el-divider>
                <div style="text-align: right; margin: 0">
                    <el-button type="primary" size="mini" @click="tipVisibles_f(index)" style="font-size:20px">完成</el-button>
                </div>
                <el-button-group slot="reference" >
                    <el-button type="primary" style="font-size:18px">標籤 {{radio_tag[index]}} {{tag_counts[index].label.toString()}}</el-button>
                    <el-button type="primary" icon="el-icon-close" style="font-size:18px" @click="deletetagbutton(index)"></el-button>
                </el-button-group >
                </el-popover>
            </div>
            <!-- {{form.row_label_id}} -->
            <!-- radio_time: {{radio_time}}
            time_select:
            {{time_select}}
            datarange:
            {{daterange}}
            {{phone_counts}}
            {{email_counts}}
            {{male_counts}} -->
             <!-- label_dummy={{radio_tag}}  label_id={{tag_counts}} -->
            <!-- jointime button
            <div v-if="filterslec_count !==0" class="filter_button" v-for="(jointime,index) in jointime_counts" >
                <el-button-group>
                    <el-button type="primary" style="font-size:18px">加入時間 {{jointime.jointime}}</el-button>
                    <el-button type="primary" icon="el-icon-close" style="font-size:18px" @click="deletejointimebutton(index)"></el-button>
                </el-button-group >
            </div>
            <!-- email button -->
            <div v-if="filterslec_count !==0" class="filter_button" v-for="(email,index) in email_counts" >
                <el-dropdown  trigger ="click" @command="email_command(index, $event)">
                <el-button-group>
                    <el-button type="primary" style="font-size:18px">電子信箱 {{email.email}}</el-button>
                    <el-button type="primary" icon="el-icon-close" style="font-size:18px" @click="deleteemailbutton(index)"></el-button>
                </el-button-group >
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="有資料" class="drop_font">有資料</el-dropdown-item>
                    <el-dropdown-item command="沒資料" class="drop_font">沒資料</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- phone button -->
            <div v-if="filterslec_count !==0" class="filter_button" v-for="(phone,index) in phone_counts" >
                <el-dropdown  trigger ="click" @command="phone_command(index, $event)">
                <el-button-group>
                    <el-button type="primary" style="font-size:18px">電話號碼 {{phone.phone}}</el-button>
                    <el-button type="primary" icon="el-icon-close" style="font-size:18px" @click="deletephonebutton(index)"></el-button>
                </el-button-group >
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="有資料" class="drop_font">有資料</el-dropdown-item>
                    <el-dropdown-item command="沒資料" class="drop_font">沒資料</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                </el-dropdown>
            </div>
            <!-- Filter button -->
            <div class="filter_button" v-if="filterslec_count !==0">
                <el-dropdown  @command="filter_command" >
                <el-button-group>
                    <el-button icon="el-icon-plus" style="font-size:18px;"> 新增篩選</el-button>
                </el-button-group >
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="標籤" class="drop_font">標籤</el-dropdown-item>
                    <!-- <el-dropdown-item command="加入時間" class="drop_font">加入時間</el-dropdown-item> -->
                    <el-dropdown-item command="性別" class="drop_font">性別</el-dropdown-item>
                    <el-dropdown-item command="電子信箱" class="drop_font">電子信箱</el-dropdown-item>
                    <el-dropdown-item command="電話號碼" class="drop_font">電話號碼</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- 執行篩選button -->
            <div class="filter_button">
            <el-button @click="filterpost" v-if="filterslec_count !==0" style="margin-left:20px;font-size:18px" type="primary" >
                執行篩選<i class="el-icon-search el-icon--right"></i>
            </el-button>
            </div>
          </div>
          <!-- filter & talbe分隔處 -->
          <el-divider ></i></el-divider>
          <el-button type="primary" @click="onExportExcel" style="margin-bottom:1vw;font-size:18px">導出excel</el-button>
          <div class="table_container">
            <el-table
                 id="table"
                 @row-click="draweropen"
                 @cell-mouse-enter="mouse_change"
                 v-loading="table_loading"
                 :data="tableData"
                 height
                 highlight-current-row
                 header-cell-class-name="table-header-class"
                 style="width:100%">
                <el-table-column
                   label="#"
                   width="60"
                   align='center'>
                <template slot-scope="scope">
                <span>{{scope.$index+(paginations.pageIndex - 1) * paginations.pageSize + 1}} </span>
                </template>
                </el-table-column>
                <el-table-column
                   property="picture"
                   label="頭像"
                   width="140"
                   align='center'
                   >
                <template slot-scope="scope">
                <img  :src="scope.row.picture" style="width: 50px;height: 50px">
                </template>
                </el-table-column>
                <el-table-column 
                   property="name"
                   label="姓名"
                   width="140"
                   align='center'
                   sortable
                   >
                </el-table-column>
                <el-table-column
                   property="email"
                   label="email"
                   align='center'
                   width="250"
                   sortable>
                </el-table-column>
                <el-table-column
                   property="phone"
                   label="phone"
                   align='center'
                   width="200"
                   sortable>
                </el-table-column>
                <el-table-column
                   property="gender"
                   label="性別"
                   width="100"
                   align='center'>
                </el-table-column> 
                 <el-table-column
                   property="jointime"
                   label="加入時間"
                   width="150"
                   align='center'
                   sortable>
                    <template slot-scope="scope">
                    <el-date-picker type="date" readonly="true" v-model="scope.row.jointime" style="width: 100%;"></el-date-picker>
                    </template>
                </el-table-column> 
                  <!-- <el-table-column
                   property="label_id"
                   label="標籤"
                   
                   align='center'>
                </el-table-column> 
     -->
                <el-table-column label="標籤"  align="center">
                  <template slot-scope="scope">
                    <el-tag :key="index" v-for="(tag, index) in scope.row.label_id">{{tag}}</el-tag>
                  </template>
                </el-table-column>
            </el-table>
           <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        共{{paginations.total}}條
                        <el-pagination
                            background
                            v-if='paginations.total > 0'
                            :page-sizes="paginations.pageSizes"
                            :page-size="paginations.pageSize"
                            :layout="paginations.layout"
                            :total="paginations.total"
                            :current-page='paginations.pageIndex'
                            @current-change='handleCurrentChange'
                            @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
          </div>
        </div>
        <!-- Drawer area -->
            <el-drawer
            title="個人資訊"
            :visible.sync="drawer"
            size='40%'
            :before-close="Sumbit_drawer_fixed"
            ref="drawer"
            >
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                    <el-form-item label="Line頭像">
                        <el-col :span="10">
                        <img  :src="form.row_picture" style="width: 5vw;height: 5vw">
                        </el-col>
                    </el-form-item>
                    <el-form-item label="姓名" >
                        <el-col :span="5">
                        <el-button >{{form.row_name}}</el-button>
                        </el-col>
                        <el-col :span="10">
                        性別 &nbsp  
                        <el-button >{{form.row_gender}}</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Line_User_ID">
                        <el-col :span="15">
                       <el-button >{{form.row_userid}}</el-button>
                        </el-col>
                    </el-form-item>
                    <!-- 分割線 -->
                    <el-divider></el-divider> 
                    <el-form-item label="電子信箱" prop="row_email">
                        <el-col :span="15">
                        <el-input v-model="form.row_email"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="地址" prop="row_address">
                        <el-col :span="15">
                        <el-input v-model="form.row_address"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="電話號碼" prop="row_phone">
                        <el-col :span="15">
                        <el-input v-model="form.row_phone"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="加入時間" prop="row_jointime">
                        <el-col :span="15">
                        <el-date-picker type="date" v-model="form.row_jointime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="標籤">
                        <el-col :span="15">
                        <el-tag
                        v-for="tag in form.row_label_id"
                         >
                        {{tag}}
                        </el-tag>
                        </el-col>
                    </el-form-item>
                    <!-- 新增標簽 in抽替 -->
                        <!-- <el-popover
                        placement="bottom-end"
                        width="400"
                        v-model="addnewtag_drawer">
                        <div style="text-align: left; font-size: 16px">
                            <p>標籤</p>
                                <div>
                                <el-select no-data-text="無標籤" size="large" v-model="select_tags_drawer" multiple placeholder="請選擇標籤"  >
                                <el-option
                                    style="font-size:20px"
                                    v-for="item in tags_drawer"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                                </div>
                        </div>
                        <el-divider></el-divider>
                        <div style="text-align: right; margin: 0">
                            <el-button type="primary" size="mini" 
                            @click="select_tags_drawer_f" 
                            style="font-size:20px">完成</el-button>
                        </div>
                        <el-button-group slot="reference" >
                            <el-button type="text" icon="el-icon-plus" style="font-size:14px;margin-left:25vw">新增標籤</el-button>
                        </el-button-group >
                        </el-popover>
                    <el-form-item label="VIP監聽">
                        <el-switch v-model="form.watch"></el-switch>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button  type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '確認修改' }}</el-button>
                        <el-button style="margin-left:2vw"@click="cancelForm">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>
    </div>
</template>

<script>
    import { getUserList } from "@/api/user";
    import FileSaver from 'file-saver'
    import { getToken } from '@/utils/auth' ; 
    import XLSX from 'xlsx'
    import axios from 'axios';
    export default {
        data(){   
                //抽屜裡的form rule  
                var row_phone_check=(rule,value,callback)=>{
                    if(value !=this.form.row_phone_begin){
                    console.log('rule生效');
                    this.confirm_flag=true;
                    return callback(new Error('有修改 : 按下確定才完成變更'));
                    }
                };
                var row_address_check=(rule,value,callback)=>{
                    if(value !=this.form.row_address_begin){
                    console.log('rule生效');
                    this.confirm_flag=true;
                    return callback(new Error('有修改 : 按下確定才完成變更'));
                    }
                };
                var row_email_check=(rule,value,callback)=>{
                    if(value !=this.form.row_email_begin){
                    console.log('rule生效');
                    this.confirm_flag=true;
                    return callback(new Error('有修改 : 按下確定才完成變更'));
                    }
                };
                var row_birth_check=(rule,value,callback)=>{
                    if(value !=this.form.row_birth_begin){
                    console.log('rule生效');
                    this.confirm_flag=true;
                    return callback(new Error('有修改 : 按下確定才完成變更'));
                    }
                };
                var row_jointime_check=(rule,value,callback)=>{
                    if(value !=this.form.row_jointime_begin){
                    console.log('rule生效');
                    this.confirm_flag=true;
                    return callback(new Error('有修改 : 按下確定才完成變更'));
                    }
                };
            return {
                //抽替資訊
                confirm_flag:false,// 當資訊有修改時_彈出修改視窗
                timer: null,
                table_loading:true,
                dialog:false,
                select_array:[],//抽屜新增的標籤
                addnewtag_drawer:false, // 抽替新增標籤內建開關
                select_tags_drawer:[],//抽替新增標籤
                drawer:false,//抽替開關
                form:{
                row_userid:'',
                row_birth:'',
                row_birth_begin:'',
                row_name:'',
                row_name_begin:'',
                row_email:'',
                row_email_begin:'',
                row_jointime:'',
                row_jointime_begin:'',
                row_picture:'',
                row_label_id:[],//標簽
                row_address:'',
                row_address_begin:'',
                row_phone:'',
                row_phone_begin:'',
                row_gender:'',
                watch:false,
                },
                //抽屜裡的form rule
                rules:{
                    row_phone:[{validator:row_phone_check,trigger:'blur'}],
                    row_email:[{validator:row_email_check,trigger:'blur'}],
                    row_address:[{validator:row_address_check,trigger:'blur'}],
                    row_jointime:[{validator:row_jointime_check,trigger:'blur'}],
                    row_birth:[{validator:row_birth_check,trigger:'blur'}],
                },
              //表格資訊
                tableData: [],
                loading:false,
              //需要给分页组件传的信息
                paginations: {
                    total: 0,        // 总数
                    pageIndex: 1,  // 当前位于哪页
                    pageSize: 20,   // 1页显示多少条
                    pageSize_begin:20,
                    pageSizes: [5, 10, 15, 20],  //每页显示多少条
                    layout: "sizes, prev, pager, next, jumper"   // 翻页属性
                },
                //字母選擇器
                keyword_select_data:[ {
                value: '會員名稱',
                label: '會員名稱'
                }, {
                value: '標籤',
                label: '標籤',
                }, {
                value: '性別',
                label: '性別'
                }, {
                value: '電子信箱',
                label: '電子信箱'
                }, {
                value: '電話號碼',
                label: '電話號碼'
                }],

                //自訂義時間
                daterange:[],
                // 時間篩選的過去select
                select_past_time:'',
                past_times: [{
                value: '7天',
                label: '7天',
                }, {
                value: '15天',
                label: '15天'
                }, {
                value: '30天',
                label: '30天'
                }, {
                value: '90天',
                label: '490天'
                }],
                value: '',// 1st fileter
                filterslec_count:0, //觸發button value
                male_counts:[],// 性別篩選button
                tag_counts:[],
                email_counts:[],
                phone_counts:[],
                jointime_counts:[],
                time_select:'', // 時間區間 選擇button
                filter_select:'符合所有篩選條件',// 或 / and 選擇button
                radio_time:'不限時間',
                radio_tag:[], // tag內 是與否 單選用
                tags: [{
                value: '很魚',
                label: '很魚'
                }],
                tags_drawer: [{
                value: '很魚',
                label: '很魚'
                }],
                select_tags:[],//多數個多選按鈕 需要判別是誰的
                tipVisibles:[],//多數個popover按鈕 需要判別是誰的
                time_popo_visible:false,
                past_time_area:false,
                define_time_area:false,
                search_input:'',//字母篩選選擇棄綁定
                select_keyword:'name',//預設字母選擇器
            }
        },
        created(){
        },
        mounted(){
            this.filterpost();
            //this.getUserList();
        },
        methods: {
                // 导出表格
            onExportExcel() {
                    const excel = this.exportExcel(document.getElementById('table'), 'Member_data.xlsx')
                    this.$message({
                        message:'成功下載!',
                        center:true,
                        type: 'success'
                        }) 
            },
                /**
                * 导出表格为excel格式
                * @param { DOM } ele            // document.getElementById('table')
                * @param { string } fileName    // test.xlsx
                */
            exportExcel (ele, fileName) {
                    this.paginations.pageSize=this.paginations.total;
                    this.paginations.pageIndex =1;
                    let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/filter', 
                        {   type:"filter",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            filter_select: this.filter_select,// 部分符合或全部符合
                            time_select: this.time_select, // 過去時間選擇
                            time_range:this.daterange,//自訂時間
                            radio_time: this.radio_time, //時間區間選擇種類
                            select_keyword: this.select_keyword, // 搜尋欄關鍵字種類
                            search_input: this.search_input, // 搜尋欄關鍵字
                            gender: this.male_counts, // 性別
                            email: this.email_counts, // mail
                            phone: this.phone_counts, // phone 
                            jointime: this.jointime_counts, // join time
                            label_id: this.tag_counts, // tag
                            label_dummy:this.radio_tag,// tag if
                            data_fixed:
                            {
                                name:this.form.row_name,
                                userid:this.form.row_userid,
                                labelid:'',
                                address:this.form.row_address,
                                phone:this.form.phone,
                                email:this.form.row_email,
                            },
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }

                        )
                        .then(response =>(
                            this.table_loading = false,
                            this.paginations.total = response.data.total,//會員總數
                            this.tableData = response.data.member_data, // feedback 會員data
                            this.tags = response.data.tags,//總共有哪些labels
                            this.tags_drawer = response.data.tags,//總共有哪些labels for drawer
                            console.log(response.data.total),
                            console.log(response.data.tags),
                            this.$nextTick(function(){
                            console.log('next tick')
                            const wb = XLSX.utils.table_to_book(ele)
                            const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                            try {
                                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName)       
                            } catch (e) { 
                                if (typeof console !== 'undefined') console.log(e, wbout) 
                            }
                            this.paginations.pageSize=this.paginations.pageSize_begin;
                            console.log(this.paginations.pageSize)
                            let token = getToken('Token');
                                    axios.post('https://test-backend-dot-flow-263607.appspot.com/filter', 
                                            {   type:"filter",
                                                limit: this.paginations.pageSize, // 一頁有幾條
                                                page: this.paginations.pageIndex,  // 第幾頁
                                                filter_select: this.filter_select,// 部分符合或全部符合
                                                time_select: this.time_select, // 過去時間選擇
                                                time_range:this.daterange,//自訂時間
                                                radio_time: this.radio_time, //時間區間選擇種類
                                                select_keyword: this.select_keyword, // 搜尋欄關鍵字種類
                                                search_input: this.search_input, // 搜尋欄關鍵字
                                                gender: this.male_counts, // 性別
                                                email: this.email_counts, // mail
                                                phone: this.phone_counts, // phone 
                                                jointime: this.jointime_counts, // join time
                                                label_id: this.tag_counts, // tag
                                                label_dummy:this.radio_tag,// tag if
                                                data_fixed:
                                                {
                                                    name:this.form.row_name,
                                                    userid:this.form.row_userid,
                                                    labelid:'',
                                                    address:this.form.row_address,
                                                    phone:this.form.phone,
                                                    email:this.form.row_email,
                                                },
                                            },
                                            { headers: {
                                            'x-access-token': token
                                            }
                                            }
                                            )
                                            .then(response =>(
                                                this.loading=false,
                                                this.table_loading = false,
                                                this.paginations.total = response.data.total,//總共有幾個人
                                                this.tableData = response.data.member_data, // feedback 會員data
                                                this.tags = response.data.tags,//總共有哪些labels
                                                this.tags_drawer = response.data.tags,//總共有哪些labels for drawer
                                                console.log(response.data.total),
                                                console.log(response.data.tags)
                                            )) ;
                            return wbout
                            })
                    )) ;
            },
            //Updated Drawer data.
            Sumbit_drawer_fixed(done){
            if(this.confirm_flag==false){
                this.select_tags_drawer=''// 標籤選擇歸0
                this.tags_drawer=this.tags //回歸原本標籤
                this.form.row_phone=''//電話歸0
                this.form.row_userid=''// 會員關鍵key 歸0
                this.$refs.form.resetFields();
                this.loading = false;
                this.drawer = false;
             }  
            if (this.loading) {
                        return;
                    }
            if (this.confirm_flag==true) {
                    this.$confirm('確定要修改個人資料嗎?')
                        .then(_ => {
                        console.log(this.form.row_userid);
                        let token = getToken('Token');
                        axios.post('https://test-backend-dot-flow-263607.appspot.com/filter', 
                        {   type:"filter",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            filter_select: this.filter_select,// 部分符合或全部符合
                            time_select: this.time_select, // 過去時間選擇
                            time_range:this.daterange,//自訂時間
                            radio_time: this.radio_time, //時間區間選擇種類
                            select_keyword: this.select_keyword, // 搜尋欄關鍵字種類
                            search_input: this.search_input, // 搜尋欄關鍵字
                            gender: this.male_counts, // 性別
                            email: this.email_counts, // mail
                            phone: this.phone_counts, // phone 
                            jointime: this.jointime_counts, // join time
                            label_id: this.tag_counts, // tag
                            label_dummy:this.radio_tag,// tag if
                            data_fixed:
                            {
                                name:this.form.row_name,
                                userid:this.form.row_userid,
                                labelid:'',
                                address:this.form.row_address,
                                phone:this.form.row_phone,
                                email:this.form.row_email,
                            },
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total,//總共有幾個人
                            this.tableData = response.data.member_data, // feedback 會員data
                            this.tags = response.data.tags,//總共有哪些labels
                            this.tags_drawer = response.data.tags//總共有哪些labels for drawer
                            // console.log(response.data.total),
                            // console.log(response.data.tags)
                        )) ;
                        this.loading = true;
                        this.form.row_userid='';// 會員關鍵key 歸0
                        this.timer = setTimeout(() => {
                            done();
                            // 动画关闭需要一定的时间
                            this.$refs.form.resetFields();// reset 修改提示
                            setTimeout(() => { 
                            this.loading = false;
                            }, 400);
                        }, 500);
                        })
                        .catch(_ => {});
            }
            }, 
            cancelForm() {
                this.select_tags_drawer=''// 標籤選擇歸0
                this.form.row_userid=''// 會員關鍵key 歸0
                this.tags_drawer=this.tags //回歸原本標籤
                this.loading = false;
                this.drawer = false;
                this.$refs.form.resetFields();// reset 修改提示
                clearTimeout(this.timer);
            },
            //drawer內標籤新增後回傳資料
            select_tags_drawer_f(){
                this.confirm_flag=true;
                this.addnewtag_drawer=false; 
                this.form.row_label_id=this.form.row_label_id.concat(this.select_tags_drawer);
                //以下為 選過的標籤不會在出現在選項裡
                var row_label=this.form.row_label_id;
                // this.tags_drawer = this.tags_drawer.filter(function(item){
                //             return  row_label.every(function(item1){
                //                 return item.label != item1;
                //             })
                // });
                this.select_tags_drawer='';// 標籤選擇歸0
            },
            //Post filter data to serve
            filterpost(){
                    this.table_loading = true;
                    let token = getToken('Token')
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/filter', 
                    
                        {   type:"filter",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            filter_select: this.filter_select,// 部分符合或全部符合
                            time_select: this.time_select, // 過去時間選擇
                            time_range:this.daterange,//自訂時間
                            radio_time: this.radio_time, //時間區間選擇種類
                            select_keyword: this.select_keyword, // 搜尋欄關鍵字種類
                            search_input: this.search_input, // 搜尋欄關鍵字
                            gender: this.male_counts, // 性別
                            email: this.email_counts, // mail
                            phone: this.phone_counts, // phone 
                            jointime: this.jointime_counts, // join time
                            label_id: this.tag_counts, // tag
                            label_dummy:this.radio_tag,// tag if
                            data_fixed:
                            {
                                name:this.form.row_name,
                                userid:this.form.row_userid,
                                labelid:'',
                                address:this.form.row_address,
                                phone:this.form.row_phone,
                                email:this.form.row_email,
                            },
          
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading=false,
                            this.table_loading = false,
                            this.paginations.total = response.data.total,//總共有幾頁
                            this.tableData = response.data.member_data, // feedback 會員data
                            this.tags = response.data.tags,//總共有哪些labels
                            this.tags_drawer = response.data.tags//總共有哪些labels for drawer
                            // console.log(response.data.total),
                            // console.log(response.data.tags)
                        ))
                    ;
            },
            // 自訂義時 間回傳到button上
            define_time_f(){
                this.time_select = this.daterange[0] +' 到 '+ this.daterange[1]
            },
            //關掉time popo
            time_popo_visible_f(){
            this.time_popo_visible=false
            },
            //time area show with radio
            time_area_f(label){
                if(label=="不限時間"){
                this.past_time_area=false
                this.define_time_area=false
                this.time_select=''
                }
                if(label=="過去"){
                this.past_time_area=true
                this.define_time_area=false
                this.time_select=''
                }
                if(label=="自訂"){
                this.past_time_area=false
                this.define_time_area=true
                this.time_select=''
                }
            },
            //部分/全部篩選紐
            filter_condition_select(command){
                console.log(command)
                if(command=="符合所有篩選條件"){
                    this.filter_select = command
                }
                if(command=="符合任何篩選條件"){
                    this.filter_select = command
                }
            },
            past_time_slec_f(value){
                this.time_select=value
            },    
            //1st filter
            filterslec(value){
                if(value =="性別"){
                this.male_counts.push({male:''})
                }
                if(value =="標籤"){
                this.tag_counts.push({tag:'',label:''})
                }
                if(value =="加入時間"){
                console.log('加入時間觸發');
                this.jointime_counts.push({jointime:''})
                }
                if(value =="電子信箱"){
                this.email_counts.push({email:''})
                }
                if(value =="電話號碼"){
                this.phone_counts.push({phone:''})
                }
                this.filterslec_count= this.filterslec_count+1
                this.value = ""
                console.log(this.filterslec_count)
            },
            // 多個popover的取消
            tipVisibles_f(index){
                this.tipVisibles.splice(index, 1,false)
            },
            // tag button 選中後回傳 生成
            tagselect_f(index,select_tags){
                console.log('see me'+select_tags)
                var obj = {tag:[],label:[]};
                var i;
                for(i = 0;i < select_tags.length;i++){
                    obj.tag[i] = this.tags[select_tags[i]].value;
                    obj.label[i] = this.tags[select_tags[i]].label;
                }
                this.tag_counts.splice(index,1,obj)
                console.log(this.tag_counts[index].label+"see memememeemememem")
                console.log(this.tag_counts[index].tag+"see memememeemememem2222")
            },
            // 性別篩選button 生成
            male_command(index,command){
                console.log(command)
                console.log(index)
                var obj = {}
                obj.male = command
                console.log(obj)
                this.male_counts.splice(index,1,obj)
            },
            //phone button 生成
            phone_command(index, command){
                console.log(command)
                console.log(index)
                var obj = {}
                obj.phone = command
                this.phone_counts.splice(index,1,obj)
            },            
            //e-mail button 生成
            email_command(index, command){
                console.log(command)
                console.log(index)
                var obj = {}
                obj.email = command
                this.email_counts.splice(index,1,obj)
            },
            //2nd filter button
            filter_command(command){
                console.log("2nd filter"+command)
                if(command =="性別"){
                    
                    this.male_counts.push({male:''})
                }
                if(command =="電子信箱"){
                    this.email_counts.push({email:''})
                }
                if(command =="標籤"){
                    this.tag_counts.push({tag:'',label:''})
                }
                if(command =="電話號碼"){
                    this.phone_counts.push({phone:''})
                }
                if(command =="加入時間"){
                    this.jointime_counts.push({jointime:''})
                }
                this.filterslec_count= this.filterslec_count+1                      
            },
            //1st filter
            filter_command_2(command){
                if(command =="性別"){
                    this.male_counts.push({male:''})
                }
                if(command =="電子信箱"){
                    this.email_counts.push({email:''})
                }
                if(command =="標籤"){
                    this.tag_counts.push({tag:'',label:''})

                }
                if(command =="電話號碼"){
                    this.phone_counts.push({phone:''})
                }
                if(command =="加入時間"){
                    this.jointime_counts.push({jointime:''})
                }
                this.filterslec_count= this.filterslec_count+1                      
            },
            //Delete phone button
            deletephonebutton(index){
                this.phone_counts.splice(index,1);
                this.filterslec_count= this.filterslec_count-1;
            },           
            //Delete male button
            deletemalebutton(index){
                this.male_counts.splice(index,1);
                this.filterslec_count= this.filterslec_count-1;
            },
            //Delete email button
            deleteemailbutton(index){
                this.email_counts.splice(index,1);
                this.filterslec_count= this.filterslec_count-1;
            },
            //Delete join button
            deletejointimebutton(index){
                this.jointime_counts.splice(index,1);
                this.filterslec_count= this.filterslec_count-1;
            },
            //Delete tag button
            deletetagbutton(index){
                
                this.select_tags.splice(index,1);
                this.radio_tag.splice(index,1);
                this.tag_counts.splice(index,1);
                this.filterslec_count= this.filterslec_count-1;
                console.log( this.filterslec_count);
            },
            //抽替關閉
            // drawer_close_f(){
            //  this.select_tags_drawer=''// 標籤選擇歸0
            //  this.tags_drawer=this.tags //回歸原本標籤
            // },
            //抽替打開
            draweropen(row,event,column) {  
                    console.log(row);
                    this.confirm_flag=false;//起始化 修改期標
                    this.drawer=true; 
                    this.form.row_userid = row.user_id;
                    this.form.row_name = row.name;
                    this.form.row_name_begin = row.name;
                    this.form.row_email = row.email; 
                    this.form.row_email_begin = row.email;
                     console.log('變前'+this.form.row_phone);
                    this.form.row_phone = row.phone; 
                    this.form.row_phone_begin = row.phone;// 用此判斷是否修改row_phone
                    console.log('變後'+this.form.row_phone);
                    this.form.row_address = row.address;  //待加入 
                    this.form.row_address_begin = row.address;
                    //this.form.row_label_id.push(row.label_id); // if 回傳資料改變 此型態跟著改變
                    // this.form.row_label_id =  Array.from(row.label_id); // 標籤
                    // console.log('begin'+row.label_id);
                    this.form.row_label_id =  row.label_id; 
                    // this.form.row_label_id = this.form.row_label_id.join("");
                    // console.log("trim前"+this.form.row_label_id);
                    // this.form.row_label_id = this.form.row_label_id. replace(/\s*/g,"");
                    // console.log("trim後"+this.form.row_label_id);
                    // if(this.form.row_label_id!=""){
                    // this.form.row_label_id =  this.form.row_label_id.split(",");
                    // };
                    // console.log("去掉鬥號後"+this.form.row_label_id);
                    this.form.row_picture = row.picture;   
                    this.form.row_jointime = row.jointime; 
                    this.form.row_jointime_begin = row.jointime; 
                    this.form.row_gender = row.gender;  
                    //以下為  已選標籤 不會出現在 drawer標籤裡
                    var row_label=[]; 
                    row_label=this.form.row_label_id;
                    // console.log("換看我一下"+row_label);
                    // this.tags_drawer = this.tags_drawer.filter(function(item){
                    //         return  row_label.every(function(item1){
                    //             // console.log(item.label+"等於嗎"+item1);
                    //             return item.label != item1;
                                
                    //         })
                    // });

 
            },
            //API call member data.
            getUserList(){
                let para = {
                    limit:this.paginations.pageSize,
                    page:this.paginations.pageIndex
                }
                getUserList(para).then(res => {
                    this.loading = false;
                    this.paginations.total = res.data.total;
                    this.tableData = res.data.userList;
                })
            },
            // 每页多少条切换
            handleSizeChange(pageSize) {
               this.table_loading = true;
               this.paginations.pageSize = pageSize;
               this.paginations.pageSize_begin = pageSize;
               this.filterpost();
            },
            // 上下分页
            handleCurrentChange(page) {
               this.table_loading = true;
               this.paginations.pageIndex = page;
               this.filterpost();
            },
            mouse_change(){
                var fillcontain = document.querySelector('.table_container');
                fillcontain.style.cursor="pointer"
            }
        },
    }
</script>

<style lang="less" scoped>
    //表格CSS
    .fillcontain/deep/.el-table th>.cell {
        font-family:Microsoft JhengHei;
        font-size: 15px;
    }
    .fillcontain/deep/.el-table th {
        background-color:#F0F8FF !important;
        
    }

    .el-message__content{
        font-size:20px;
    }
    //篩選CSS
    .el-dropdown-link {
        font-family:Microsoft JhengHei;
        font-size: 18px;
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-plus {
        font-size: 18px;
    }
    //全部篩選紐都有的class
    .filter_button {
        font-size: 18px;
        margin-left : 10px;
        margin-bottom : 10px;
    }
    //表格CSS
    .fillcontain{
        padding-bottom: 0;
    }
    .contain{
        //background: #fff;
        padding: 10px;
        margin-bottom: 20px;
       
    }
   .pagination{
       display:flex;
        flex-direction: row ;
        flex-wrap: wrap;
       padding: 10px 20px;
       text-align: center;
   }
   .pagination/deep/.el-pagination {
       display:flex;
   }
    .filter{
        display: flex;
        flex-direction: row ;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center ;
        .filter2{
        margin-top: 3px;
        align-self: baseline ;
        }
    }
    .drop_font{
        padding: 10px 20px;
        font-size: 20px;
    }
    //輸入匡的預設字大小 1st filter
    .filter_1st .el-select/deep/ .el-input{
        text-align: center;
        font-size: 18px !important ;
        width : 50%;
    }
    //輸入匡的預設字大小 篩選內的
    .el-select/deep/ .el-input{
        text-align: center;
        font-size: 18px !important ;
        width : 100%;
    }
    //標籤的下拉 是與 不是 的大小
    .el-radio/deep/ .el-radio__label { 
       font-size: 18px;
    }
    //
    .pasttime/deep/.el-select{
        text-align: center;
        font-size: 18px !important ;
        width : 40%;
    }
    //字母選擇框的css
    .keyword /deep/.el-input{
        font-size: 18px !important ;
        width : 30%;
        margin-left : 0 px;
    }
    .keyword{
        display: flex;
        flex-direction: row ;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom : 20px;
        margin-left : 0 px;
        margin-right : 0 px;
    } 
    .keyword/deep/.el-select/deep/.el-input{
        width : 150px;
    } 

</style>



