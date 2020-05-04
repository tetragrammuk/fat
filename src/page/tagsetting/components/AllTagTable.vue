<template>
    
    <div class="fillcontain">
        <div class="contain">
            <!-- 字母篩選器 -->
            <div class="key_button">
            <div class="keyword">
                    <el-input placeholder="請輸入關鍵字" v-model="search_input" >
                        <el-button slot="append" icon="el-icon-search" @click="filterpost"></el-button>
                    </el-input>
                    <el-button 
            </div>  
             <div class="newbutton">
                    <el-button
                     type="primary"
                     icon="el-icon-plus" 
                     @click="dialogFormVisible_add=true">新增標籤</el-button>
            </div>   
            </div>
            <div class="keyword_2">
                    <el-select v-model="input_type" >
                        <el-option label="會員人數 >" value="bigger"></el-option>
                        <el-option label="會員人數 <" value="small"></el-option>
                    </el-select>
                    <el-input placeholder="請輸入次數" v-model="input_number">
                    <el-button slot="append" icon="el-icon-search" @click="filterpost"></el-button>
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
                   property="label_name"
                   label="標籤"
                   align='center'
                   sortable
                   >
                </el-table-column>
                <el-table-column
                   property="label_people_number"
                   label="會員數"
                   align='left'
                   width='300px'
                   sortable>
                </el-table-column>
                <el-table-column
                   property="label_period"
                   label="有效天數"
                   align='left'
                   width='300px'
                   sortable>
                </el-table-column>
                <el-table-column
                   property="phone"
                   label=""
                   align='left'
                   width='200px'>
                    <template slot-scope="scope">
                    <el-button  icon="el-icon-edit" @click="handle_click(scope.row)"></el-button>
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
            <el-dialog 
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
            </el-dialog>
            <!-- 新增dialog -->
            <el-dialog 
            width="40%"
            title="新增標籤"
            :visible.sync="dialogFormVisible_add" 
            @close="dialog_close_add" 
            :close-on-click-modal="false">
                <el-divider></el-divider>
                <el-form ref="form_add" :model="add_form" :label-position="label_position" :rules="rules">
                    <div style="font-size:22px;margin-bottom:0.5vw"> 標籤名稱 </div>
                    <el-form-item  :label-width="formLabelWidth" prop="row_tag_add">
                        <div class="dialog_input_tagname"><el-input v-model="add_form.row_tag" autocomplete="off"></el-input></div>
                    </el-form-item>
                    <div style="font-size:22px;margin-bottom:0.5vw"> 有效期限 </div>
                    <el-form-item :label-width="formLabelWidth">
                        <div><el-radio v-model="add_form.row_radio" label="永久" @change="time_input_disabled_f_add">永久</el-radio></div>
                        <div><el-radio v-model="add_form.row_radio" label="有效天數"@change="time_input_disabled_f_add">有效天數</el-radio></div>
                            <div class="dialog_input"><el-input v-model="add_form.row_time" autocomplete="off" :disabled="time_input_disabled_add">
                                <template slot="append">天</template></el-input>
                            </div>
                        <div style="font-size:16px;margin-bottom:0.5vw;color:#909399"><i class="el-icon-s-opportunity"></i>{{add_form_time_select}}</div>
                    </el-form-item>
                </el-form>
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
                    if(value !=this.fix_form.row_tag_begin){
                    console.log('rule生效');
                    return callback(new Error('有修改 : 按下確定才完成變更'));
                    }
                };
            return {
                //filter
                input_number:'',
                input_type:"bigger",
                //新增-彈出匡是否存在
                dialogFormVisible_add:false,
                //新增-彈出匡的 from物
                add_form:{
                    row_id:'',
                    row_tag:'',
                    row_tag_begin:'',//修改判斷與最初是否有改變
                    row_time:'0',
                    row_time_begin:'',//修改判斷與最初是否有改變
                    row_radio:'永久'//修改-彈出匡的 input時間判斷是否可修改
                },
                //新增-彈出匡 input時間匡的敘述
                add_form_time_select:'標籤會永久存在會員資料裡',
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
                    row_tag:[{validator:tag_check,trigger:'blur'}],
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
                tipVisibles:[],//多數個popover按鈕 需要判別是誰的
                search_input:'',//字母篩選選擇棄綁定
                select_keyword:'name',//預設字母選擇器
            }
        },
        created(){
        },
        mounted(){
            this.filterpost();
        },
        methods: {
           onExportExcel() {
                    const excel = this.exportExcel(document.getElementById('table'), 'Tag_data.xlsx')
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
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/label_display', 
                        {  type:"all",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            search_input: this.search_input, // 搜尋欄關鍵字
                            filter_type: this.input_type, // 是大於還是小於
                            filter_number: this.input_number, // 搜尋數字
                            fixed_label_id:this.fix_form.row_id,// 附上修改的label_name                          
                            fixed_label_name:this.fix_form.row_tag,// 附上修改的label_name
                            fixed_label_period:this.fix_form.row_time,// 附上修改的label 是永久或 有效期限
                            fixed_label_radio:this.fix_form.row_radio,// 附上修改的label 的 有效天數
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total_tag_number,//總共有幾個
                            this.tableData = response.data.tag_data, // feedback 會員data
                            this.$emit('childevent',this.paginations.total),
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
                                    axios.post('https://test-backend-dot-flow-263607.appspot.com/label_display', 
                                            {  type:"all",
                                                limit: this.paginations.pageSize, // 一頁有幾條
                                                page: this.paginations.pageIndex,  // 第幾頁
                                                search_input: this.search_input, // 搜尋欄關鍵字
                                                filter_type: this.input_type, // 是大於還是小於
                                                filter_number: this.input_number, // 搜尋數字
                                                fixed_label_id:this.fix_form.row_id,// 附上修改的label_name                          
                                                fixed_label_name:this.fix_form.row_tag,// 附上修改的label_name
                                                fixed_label_period:this.fix_form.row_time,// 附上修改的label 是永久或 有效期限
                                                fixed_label_radio:this.fix_form.row_radio,// 附上修改的label 的 有效天數
                                            },
                                            { headers: {
                                            'x-access-token': token
                                            }
                                            }
                                            )
                                            .then(response =>(
                                                this.loading = false,
                                                this.paginations.total = response.data.total_tag_number,//總共有幾個
                                                this.tableData = response.data.tag_data, // feedback 會員data
                                                this.$emit('childevent',this.paginations.total)
                                            )) ;
                            return wbout
                          })
                    )) ; 
            },





            //標籤新增觸發
            add_new_label(){
                this.dialogFormVisible_add = false;
                console.log(this.add_form.row_tag);
                console.log(this.add_form.row_time);
                console.log(this.add_form.row_radio);
                let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/label_create', 
                        {   type:"all",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            search_input: this.search_input, // 搜尋欄關鍵字
                            create_label_name:this.add_form.row_tag,// 附上新增的label_name
                            create_label_period:this.add_form.row_time,// 附上新增的label 是永久或 有效期限
                            create_label_radio:this.add_form.row_radio// 附上新增的label 的 有效天數
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total_tag_number,//總共有幾頁
                            this.tableData = response.data.tag_data, // feedback 會員data
                            //歸0
                            this.add_form.row_tag='',
                            this.add_form.row_time='0',
                            this.add_form.row_radio='永久',
                            this.time_input_disabled_add=true
                            
                        ));
            },
            //新增dialog關閉時重置
            dialog_close_add(){
                this.$refs.form_add.resetFields();
                //歸0
                this.add_form.row_tag='',
                this.add_form.row_time='0',
                this.add_form.row_radio='永久'
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
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/label_delete', 
                        {   type:"all",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            search_input: this.search_input, // 搜尋欄關鍵字
                            delete_label_id:row.label_id// 附上刪除label_token
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total_tag_number,//總共有幾頁
                            this.tableData = response.data.tag_data, // feedback 會員data
                            this.$emit('childevent',this.paginations.total)
                        ));
            },
            //表格內修改觸發觸發
            handle_click_fixed(row){
                     this.dialogFormVisible = false;
                     let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/filter', 
                        {   type:"all",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            search_input: this.search_input, // 搜尋欄關鍵字
                            filter_type: this.input_type, // 是大於還是小於
                            filter_number: this.input_number, // 搜尋數字 
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
                            this.paginations.total = response.data.total_tag_number,//總共有幾頁
                            this.tableData = response.data.tag_data, // feedback 會員data
                            this.$emit('childevent',this.paginations.total)
                        ));
            },
            //新增彈出匡的radio改變時觸發
            time_input_disabled_f_add(){
                if(this.add_form.row_radio=="永久"){
                    this.time_input_disabled_add=true,
                    this.add_form_time_select='標籤會永久存在會員資料裡'
                    this.add_form.row_time='0'
                }
                if(this.add_form.row_radio=="有效天數"){
                    this.time_input_disabled_add=false,
                    this.add_form_time_select='標籤會在設定的天數後自動移除'
                }
            },
            //修改彈出匡的radio改變時觸發
            time_input_disabled_f(){
                console.log(this.fix_form.row_radio)
                if(this.fix_form.row_radio=="永久"){
                    this.time_input_disabled=true,
                    this.fix_form_time_select='標籤會永久存在會員資料裡',
                    this.fix_form.row_time='0'
                }
                if(this.fix_form.row_radio=="有效天數"){
                    console.log(this.fix_form.row_radio),
                    this.time_input_disabled=false,
                    this.fix_form_time_select='標籤會在設定的天數後自動移除'
                }

            },
            //修改表格的取消
            fixed_click_cancel(){
                this.time_input_disabled_f;
                this.dialogFormVisible=false;
                this.fix_form.row_id='';
            },  
            //新增表格的取消
            add_click_cancel(){
                this.time_input_disabled_add=true,
                this.add_form_time_select='標籤會永久存在會員資料裡'
                this.add_form.row_time='0'
                this.dialogFormVisible_add=false;
            },
            //Post filter data to serve
            filterpost(){
                    this.dialogFormVisible = false;
                    let token = getToken('Token');
                    axios.post('https://test-backend-dot-flow-263607.appspot.com/label_display', 
                        {   type:"all",
                            limit: this.paginations.pageSize, // 一頁有幾條
                            page: this.paginations.pageIndex,  // 第幾頁
                            search_input: this.search_input, // 搜尋欄關鍵字
                            filter_type: this.input_type, // 是大於還是小於
                            filter_number: this.input_number, // 搜尋數字
                            fixed_label_id:this.fix_form.row_id,// 附上修改的label_name                          
                            fixed_label_name:this.fix_form.row_tag,// 附上修改的label_name
                            fixed_label_period:this.fix_form.row_time,// 附上修改的label 是永久或 有效期限
                            fixed_label_radio:this.fix_form.row_radio,// 附上修改的label 的 有效天數
                        },
                        { headers: {
                        'x-access-token': token
                        }
                        }
                        )
                        .then(response =>(
                            this.loading = false,
                            this.paginations.total = response.data.total_tag_number,//總共有幾個
                            this.tableData = response.data.tag_data, // feedback 會員data
                            this.$emit('childevent',this.paginations.total)
                        ))
                    ;
                    console.log('see me la')
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
        width: 50% ;
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

    .keyword_2 /deep/.el-input{
        font-size: 18px !important ;
        width : 200px;
        margin-left : 0 px;
    }
    .keyword_2{
        display: flex;
        flex-direction: row ;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top : 10px;
        margin-bottom : 10px;
        margin-left : 0 px;
        margin-right : 0 px;
    } 
    .keyword_2/deep/.el-select/deep/.el-input{
        width : 150px;
    } 

    .keyword /deep/.el-input{
        font-size: 18px !important ;
        width : 350px;
        margin-left : 0 px;
    }
    .keyword{
        display: flex;
        flex-direction: row ;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top : 10px;
        margin-bottom : 10px;
        margin-left : 0 px;
        margin-right : 0 px;
    } 
    .keyword/deep/.el-select/deep/.el-input{
        width : 150px;
    } 

</style>



