<template>
    
    <div class="fillcontain">
        <div class="contain">
            <!-- 新增追蹤連結 -->
             <div class="newbutton">
                    <el-button
                     type="primary"
                     icon="el-icon-plus" 
                     @click="dialogFormVisible_add=true">新增官方好友追蹤連結</el-button>
            </div>   
            <div class="keyword">
                    <el-select v-model="select_keyword" >
                        <el-option label="品牌" value="logo"></el-option>
                        <el-option label="發布渠道" value="announce"></el-option>
                        <el-option label="版位" value="position"></el-option>
                        <el-option label="活動名稱" value="activity"></el-option>
                    </el-select>
                    <el-input placeholder="請輸入關鍵字" v-model="input_keyword">
                        <el-button slot="append" icon="el-icon-search" @click="filter_number_post"></el-button>
                    </el-input>
            </div>  
            <!-- FILTER FOR NUMBER -->
             <div class="keyword">
                    <el-select v-model="input_type" >
                        <el-option label="點擊流量 >" value="bigger"></el-option>
                        <el-option label="點擊流量 <" value="small"></el-option>
                    </el-select>
                    <el-input placeholder="請輸入次數" v-model="input_number">
                    <el-button slot="append" icon="el-icon-search" @click="filter_number_post"></el-button>
                    </el-input>
            </div>  
          <el-button type="primary" @click="onExportExcel" style="margin-bottom:1vw;font-size:18px">導出excel</el-button>
  

          <!-- filter & talbe分隔處 -->
          <el-divider ></i></el-divider>
          <div class="table_container">
            <el-table
                 id="table"
                 v-loading="loading"
                 :data="tableData"
                 row-style="height:80px"
                 style="width:100%"
                 empty-text="目前沒有數劇哦~">
                <el-table-column 
                   property="logo"
                   label="品牌"
                   align='center'
                   width='200px'
                   sortable
                   >
                </el-table-column>
                <el-table-column
                   property="announce"
                   label="發布渠道"
                   align='left'
                   width='170px'
                   sortable>
                </el-table-column>
                <el-table-column
                   property="position"
                   label="版位"
                   align='left'
                   width='170px'
                   sortable>
                </el-table-column>
                <el-table-column
                   property="activity"
                   label="活動名稱"
                   align='left'
                   width='170px'
                   sortable>
                </el-table-column>
                <el-table-column
                   property="click"
                   label="點擊流量"
                   align='center'
                   width='170px'
                   sortable>
                </el-table-column>
                <el-table-column
                   property="qrcode"
                   label="QR Code"
                   align='center'
                   width='170px'
                   sortable>
                <template slot-scope="scope">
                <!-- <el-button  icon="el-icon-document-copy"@click="download_pic(scope.row)"></el-button> -->
                <img  :src="scope.row.qrcode" style="width: 50px;height: 50px">
                </template>
                </el-table-column>
                <el-table-column
                   property="url"
                   label="URL"
                   align='center'
                   width='450px'
                   sortable 
                   >
                    <template slot-scope="scope">
                    <el-button  icon="el-icon-document-copy"@click="copy_text(scope.row)"></el-button>
                    <div>{{scope.row.url}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                   property="phone"
                   label=""
                   align='center'
                   >
                    <template slot-scope="scope">
                    <!-- <el-button  icon="el-icon-edit" @click="handle_click(scope.row)"></el-button> -->
                    <el-button  icon="el-icon-delete"@click="handle_click_delete(scope.row)" ></el-button>
                    </template>
                </el-table-column>
                
            </el-table>
           <el-row>
                <el-col :span="24">
                    <div class="pagination">
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
            <!-- 編輯dialog -->
            <!-- <el-dialog 
            width="40%"
            title="標籤編輯"
            :visible.sync="dialogFormVisible" 
            @close="dialog_close" 
            :close-on-click-modal="false">
                <el-divider></el-divider>
                <el-form ref="form" :model="fix_form" :label-position="label_position" :rules="rules">
                    <div style="font-size:22px;margin-bottom:0.5vw"> 標籤名稱 </div>
                    <div style="font-size:16px;margin-bottom:0.5vw;color:#909399"> 更改標籤名稱只會同步更改會員身上的標籤，注意!!透過連結、點擊設定的標籤不會同步更動 </div>
                    <el-form-item  :label-width="formLabelWidth" prop="row_tag">
                        <div class="dialog_input_tagname"><el-input v-model="fix_form.row_tag" autocomplete="off"></el-input></div>
                    </el-form-item>
                    <div style="font-size:22px;margin-bottom:0.5vw"> 有效期限 </div>
                    <el-form-item :label-width="formLabelWidth">
                        <div><el-radio v-model="fix_form.row_radio" label="永久" @change="time_input_disabled_f">永久</el-radio></div>
                        <div><el-radio v-model="fix_form.row_radio" label="有效天數"@change="time_input_disabled_f">有效天數</el-radio></div>
                            <div class="dialog_input"><el-input v-model="fix_form.row_time" autocomplete="off" :disabled="time_input_disabled">
                                <template slot="append">天</template></el-input>
                            </div>
                        <div style="font-size:16px;margin-bottom:0.5vw;color:#909399"><i class="el-icon-s-opportunity"></i>{{fix_form_time_select}}</div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="large" @click="fixed_click_cancel">取 消</el-button>
                    <el-button size="large" type="primary" @click="filterpost">確 定</el-button>
                </div>
            </el-dialog> -->
            <!-- 新增dialog -->
            <el-dialog 
            width="30%"
            title="新增官方好友追蹤連結"
            :visible.sync="dialogFormVisible_add" 
            @close="dialog_close_add" 
            :close-on-click-modal="false">
                <el-divider></el-divider>
                <el-form ref="form_add" :model="add_form"  :rules="rules">

                    <el-form-item  :label-width="formLabelWidth" prop="logo" label="品牌">
                        <div class="dialog_input_tagname"><el-input v-model="add_form.logo" autocomplete="off"></el-input></div>
                    </el-form-item>
                    <!-- <el-form-item  :label-width="formLabelWidth" prop="row_tag_add" label="發布渠道">
                        <el-select v-model="add_form.fabu" placeholder="選擇發布渠道">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item  :label-width="formLabelWidth" prop="fabu" label="發布渠道">
                        <div class="dialog_input_tagname"><el-input v-model="add_form.fabu" autocomplete="off"></el-input></div>
                    </el-form-item>
                    <el-form-item  :label-width="formLabelWidth" prop="pos" label="版位">
                        <div class="dialog_input_tagname"><el-input v-model="add_form.pos" autocomplete="off"></el-input></div>
                    </el-form-item>
                    <el-form-item  :label-width="formLabelWidth" prop="describe" label="活動名稱">
                        <div class="dialog_input_tagname"><el-input
                         v-model="add_form.describe" 
                         autocomplete="off"
                         type="textarea"
                         :rows="4">
                            </el-input></div>
                    </el-form-item>
 
                </el-form>
                <div class="ps">
                <el-button type="warning" plain>一但創立後即無法修改此追蹤連結</el-button>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button size="large" @click="add_click_cancel">取 消</el-button>
                    <el-button size="large" type="primary" @click="add_new_label">確 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import axios from 'axios';
	import { getToken } from '@/utils/auth' ; 
    export default {
        data(){   
                //dialog裡的form rule  
                var tag_check=(rule,value,callback)=>{
                    if (!value) {
                        return callback();
                    }
                    if (value) {
                                var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}$/; // 中英文、数字、下划线!
                                if (!reg.test(value)) {
                                    callback(new Error('1 到 20 個字元，僅可為中英文、数字、下底線!'));
                                } else {
                                    callback();
                                }
                           ;
                    }
                };
            return {
                //filter
                select_keyword:'logo',
                input_keyword:'',
                input_number:'',
                input_type:"bigger",
                //新增-彈出匡是否存在
                dialogFormVisible_add:false,
                //新增-彈出匡的 from物
                add_form:{
                    logo:'',
                    fabu:'',
                    pos:'',
                    describe:''
                },
                //發布渠道的選擇
                options: [{
                value: 'website',
                label: 'website'
                }, {
                value: 'Line',
                label: 'Line'
                }, {
                value: 'Facebook',
                label: 'Facebook'
                }, {
                value: 'Instagram',
                label: 'Instagram'
                },{
                value: 'btl',
                label: 'btl'
                }],

                //新增-彈出匡的 input時間判斷是否可修改
                time_input_disabled_add:true,
                //修改-彈出匡是否存在
                dialogFormVisible:false,
                //修改-彈出匡的 labe 寬度
                label_position:'top',
                formLabelWidth:'120px',
                //修改-彈出匡的 from物
                fix_form:{
                    row_id:'',
                    row_tag:'',
                    row_tag_begin:'',//修改判斷與最初是否有改變
                    row_time:'',
                    row_time_begin:'',//修改判斷與最初是否有改變
                    row_radio:''//修改-彈出匡的 input時間判斷是否可修改
                },
                //input時間匡的敘述
                fix_form_time_select:'標籤會永久存在會員資料裡',
                //修改-彈出匡的 input時間判斷是否可修改
                time_input_disabled:true,
                //抽屜裡的form rule
                rules:{
                    logo:[ { required: true, message: '请填寫品牌名稱', trigger: 'blur' },
                    { min: 1, max: 10, message: '長度請介於 1 到 10 個字元', trigger: 'blur' }],
                    fabu:[ { required: true, message: '请填寫發布渠道', trigger: 'blur' },
                    { min: 1, max: 10, message: '長度請介於 1 到 10 個字元', trigger: 'blur' }],
                    pos:[{ required: true, message: '请填寫版面位置', trigger: 'blur' },
                    { min: 1, max: 10, message: '長度請介於 1 到 10 個字元', trigger: 'blur' }],
                    describe:[{required: true ,validator:tag_check,trigger:'blur'}],
                },
              //表格資訊
                tableData: [],
                loading:true,
              //需要给分页组件传的信息
                paginations: {
                    total: 0,        // 总数
                    pageIndex: 1,  // 当前位于哪页
                    pageSize: 50,   // 1页显示多少条
                    pageSize_begin:50,
                    pageSizes: [5, 10, 15, 20,50],  //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
                },
                select_tags:[],//多數個多選按鈕 需要判別是誰的
                tipVisibles:[]//多數個popover按鈕 需要判別是誰的
            }
        },
        created(){
        },
        mounted(){
            this.filterpost();
        },
        methods: {
            onExportExcel() {
                    const excel = this.exportExcel(document.getElementById('table'), 'URL_data.xlsx')
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
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/line_add_display', 
                        {   
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            filter_type: this.input_type, // 是大於還是小於
                            filter_number: this.input_number, // 搜尋數字
                            select_keyword: this.select_keyword, // 是哪個品項
                            filter_keyword: this.input_keyword // 搜尋關鍵字
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total,//總共有幾頁
                            this.tableData = response.data.data, // feedback 會員data
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
                                    axios.post('https://test-backend-dot-flow-263607.appspot.com/line_add_display', 
                                            {   
                                                limit: this.paginations.pageSize, // 一頁有幾條
                                                page: this.paginations.pageIndex,  // 第幾頁
                                                filter_type: this.input_type, // 是大於還是小於
                                                filter_number: this.input_number, // 搜尋數字
                                                select_keyword: this.select_keyword, // 是哪個品項
                                                filter_keyword: this.input_keyword // 搜尋關鍵字
                                            },
                                            { headers: {
                                            'x-access-token': token
                                            }
                                            }

                                            )
                                            .then(response =>(
                                                this.loading = false,
                                                this.paginations.total = response.data.total,//總共有幾頁
                                                this.tableData = response.data.data // feedback 會員data
                                            )) ;
                            return wbout
                            })
                    )) ;
            },


            // download_pic(row){
            //     let myCanvas = row.getElementsByTagName('canvas');
            //     let data = myCanvas.toDataURL("image/png");
            //     FileSaver.saveAs(data, "二維碼")
            // },
            copy_text(row){
                console.log(row);  //每一行的数据
 
                var oInput = document.createElement('input');     //创建一个隐藏input（重要！）
                oInput.value = row.url;    //赋值
                console.log(oInput.value);
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display='none';
                    this.$message({
                    message: '複製成功',
                    type: 'success'
                    });

            },
            //新增觸發
            add_new_label(){
                this.$refs.form_add.validate((valid)=>{
                    if(valid){
                    this.dialogFormVisible_add = false;
                    let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/line_add_create', 
                        {   
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            logo:this.add_form.logo,
                            announce:this.add_form.fabu,
                            position:this.add_form.pos,
                            activity:this.add_form.describe
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total,//總共有幾頁
                            this.tableData = response.data.data, // feedback 會員data
                            //歸0
                            this.add_form.logo='',
                            this.add_form.fabu='',
                            this.add_form.pos='',
                            this.add_form.describe=''
                            
                    ));
                    } else{
                        return false;
                    }
                })
            },
            add_click_cancel(){
                this.dialogFormVisible_add = false;
                            this.add_form.logo='',
                            this.add_form.fabu='',
                            this.add_form.pos='',
                            this.add_form.describe=''
            },
            //新增dialog關閉時重置
            dialog_close_add(){
                this.$refs.form_add.resetFields();
                //歸0
                this.add_form.logo='',
                this.add_form.fabu='',
                this.add_form.pos='',
                this.add_form.describe=''
            },
            //dialog關閉時重置
            dialog_close(){
                this.$refs.form.resetFields();
            },
            //表格內fixed扭觸發
            handle_click(row){
                this.dialogFormVisible=true;
                this.fix_form.row_tag=row.label_name; // 需在跟吉米修改
                this.fix_form.row_tag_begin=row.label_name; 
                this.fix_form.row_time=row.label_period; // 需在跟吉米修改
                this.fix_form.row_time_begin=row.label_period; 
                this.fix_form.row_radio=row.label_radio;
                this.fix_form.row_id=row.label_id;
                console.log(row.label_radio);
                if(this.fix_form.row_radio=="永久"){
                    this.time_input_disabled=true,
                    this.fix_form_time_select='標籤會永久存在會員資料裡',
                    this.fix_form.row_time='0'
                };
                if(this.fix_form.row_radio=="有效天數"){
                    console.log(this.fix_form.row_radio),
                    this.time_input_disabled=false,
                    this.fix_form_time_select='標籤會在設定的天數後自動移除'
                }
                // this.fix_form.radio=row.time; 
            },
            //表格內delete扭觸發
            handle_click_delete(row){

                        if (this.tableData.length == 1) {
                            this.paginations.pageIndex == 1 ? 1 : this.paginations.pageIndex--;
                        }
                        let token = getToken('Token');
                        axios.post('https://test-backend-dot-flow-263607.appspot.com/line_add_delete', 
                        {   
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            url_id:row.url_id// 附上刪除label_token
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total,//總共有幾條
                            this.tableData = response.data.data // feedback data
                        ));
            },
            //表格內修改觸發觸發
            handle_click_fixed(row){
                     this.dialogFormVisible = false;
                     let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/filter', 
                        {   
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            search_input: this.search_input, // 搜尋欄關鍵字
                            fixed_label_id:this.fix_form.row_id,// 附上修改的label_name                          
                            fixed_label_name:this.fix_form.row_tag,// 附上修改的label_name
                            fixed_label_period:this.fix_form.row_time,// 附上修改的label 是永久或 有效期限
                            fixed_label_radio:this.fix_form.row_radio// 附上修改的label 的 有效天數
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total_link_number,//總共有幾頁
                            this.tableData = response.data.link_data // feedback 會員data
                        ));
            },
            //Post filter data to serve
            filterpost(){
                    this.dialogFormVisible = false;
                    let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/line_add_display', 
                        {   
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            filter_type: this.input_type, // 是大於還是小於
                            filter_number: this.input_number, // 搜尋數字
                            select_keyword: this.select_keyword, // 是哪個品項
                            filter_keyword: this.input_keyword // 搜尋關鍵字
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total,//總共有幾頁
                            this.tableData = response.data.data // feedback 會員data
                        ))
                    ;
                    console.log('see me la')
            },
            filter_number_post(){
                      let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/line_add_display', 
                        {   
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            filter_type: this.input_type, // 是大於還是小於
                            filter_number: this.input_number, // 搜尋數字
                            select_keyword: this.select_keyword, // 是哪個品項
                            filter_keyword: this.input_keyword // 搜尋關鍵字
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total,//總共有幾頁
                            this.tableData = response.data.data // feedback 會員data
                        ))
                    ;
            },
            // 每页多少条切换
            handleSizeChange(pageSize) {
               this.loading=true;
               this.paginations.pageSize = pageSize;
               this.paginations.pageSize_begin = pageSize;
               this.filterpost();
            },
            // 上下分页
            handleCurrentChange(page) {
                this.loading=true;
               this.paginations.pageIndex = page;
               this.filterpost();
            }
        },
    }
</script>

<style lang="less" scoped>
    // 附駐
    .ps/deep/.el-button--mini{
        margin-left:70px;
        font-size: 20px;
        
    }
    //新增標籤扭 - 
    .key_button{
        display:flex;
        flex-wrap:nowrap;
        justify-content:space-between;
    }
    .newbutton /deep/.el-button--mini{
     font-size: 20px;
     margin-right:3vw;
    }
    .fillcontain{
        font-family:Microsoft JhengHei;
    }
    //dialog input
    .fillcontain/deep/.el-form-item__label{
    padding-top: 3px;
    font-size: 20px;
    }
    .fillcontain/deep/.el-radio__label {
    font-size: 18px;
    padding-left: 10px;
    }
    .fillcontain/deep/.el-dialog {
    border-radius: 15px;
    }
    .fillcontain/deep/.el-dialog__title {
    line-height: 0px;
    font-size: 24px;
    }
    .fillcontain/deep/.el-dialog__body {
    padding: 0px 20px;
    color: #606266;
    word-break: break-all;
    }
    .dialog_input_tagname /deep/.el-input__inner{
        width: 80% ;
    }
    .dialog_input_tagname /deep/.el-textarea__inner{
        width: 80% ;
    }
    .dialog_input_tagname /deep/.el-select{
        width: 80% ;
    }
    .dialog_input /deep/.el-input-group{
        width: 25% ;
    }
    .dialog_input{
        margin-top:0.5vw;
    }
	//search input icon color
	.fillcontain /deep/.el-input-group__append button.el-button{
	border-color: white;
    background-color: white;
	}
    //input匡的高度
    .fillcontain/deep/.el-input__inner {
        height: 40px!important ;
    }
    //table字體
    .el-table/deep/ .cell {
        font-size:16px;
        font-family:Microsoft JhengHei;
    }
    //表頭顏色
    .fillcontain /deep/.el-table th {
    background-color: #fff !important;
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
    .contain{
        //background: #fff;
        padding: 0px;
        margin-bottom: 20px;
       
    }
   .pagination{
       padding: 10px 20px;
       text-align: center;
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
    //字母選擇框的css
    .keyword /deep/.el-input{
        font-size: 18px !important ;
        width : 30vw;
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
    .fillcontain/deep/.pagination /deep/.el-input__inner{
            height: 30px !important ;
    }
    //表格內icon大小
    .table_container/deep/.el-button--mini{
    font-size: 20px;
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
    .keyword /deep/.el-input{
        font-size: 18px !important ;
        width : 15%;
        margin-left : 0 px;
    }
    .keyword{
        display: flex;
        flex-direction: row ;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top : 20px;
        margin-bottom : 20px;
        margin-left : 0 px;
        margin-right : 0 px;
    } 
    .keyword/deep/.el-select/deep/.el-input{
        width : 150px;
    } 
</style>



