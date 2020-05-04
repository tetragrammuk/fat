<template>
		<section class="data_section" ref="data_section"> 
				<transition mode="in-out">
				<el-row :gutter="30" type="flex" justify="space-around" flex-wrap="nowrap" v-show="cardshow" >				
							<el-col :span="4.8" >
								<div  class="data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor" >會員總人數</p>
										<p class="number">{{Totalsub}}<span class="perTitle">(人)</span></p>
									</div>
									<div class="rightItem">
										<i class="el-icon-user-solid"></i>
									</div>
								</div>
							</el-col>	
							<el-col :span="4.8">
								<div class="data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">會員加入-(近七天)</p>
										<p class="number" >{{Newsub}}<span class="perTitle">(人)</span></p>
										<p class="cardText"></p>
									</div>
									<div class="rightItem">
										<i class="el-icon-user"></i>
									</div>
								</div>
							</el-col>
							<el-col :span="4.8">
								<div class="likeBgcolor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">傳送訊息-(近七天)</p>
										<p class="number">{{MS}}<span class="perTitle">(封)</span></p>
										<p class="cardText"></p>
									</div>
									<div class="rightItem">
										<i class="el-icon-s-promotion"></i>
									</div> 
								</div>
							</el-col>
							<el-col :span="4.8">
								<div class="keleBgColor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">會員觸擊-(近七天)</p>
										<p class="number">{{ST}}<span class="perTitle">(次)</span></p>
										<p class="cardText"></p>
									</div>
									<div class="rightItem">
										<i class="el-icon-message-solid"></i>
									</div> 
								</div>
							</el-col>
							<el-col :span="4.8">
								<div class="linkBgColor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">會員退訂-(近七天)</p>
										<p class="number">{{DS}}<span class="perTitle">(人)</span></p>
										<p class="cardText"></p>
									</div>
									<div class="rightItem">
										<i class="el-icon-delete"></i>
									</div> 
								</div>
							</el-col>
				</el-row>
				</transition>
				<el-divider></el-divider>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="12" >
					<div>
					<el-link class="chart_title" icon="el-icon-s-promotion">觸擊分析</el-link>
					</div>
					<el-button @click="people_chart_use('過去七天')"  icon="el-icon-date" size="medium">last 7 days</el-button>
					<el-button @click="people_chart_use('過去三十天')"  icon="el-icon-date"size="medium">last 30 days</el-button>
					<el-date-picker
					style="margin-left:10px"
					v-model="daterange_use"
					type="daterange"
					start-placeholder="Start time"
					end-placeholder="End time"
					value-format="yyyy-MM-dd"
					@change="people_chart_use('自訂')"
					:picker-options="pickerOptions"
					:default-time="['00:00:00', '23:59:59']">
					</el-date-picker>
					<bar-chart-use type="barChart"  
					:bardate="bar_date_use" 
					:barLBUC="bar_LBUC"
					:barMS="bar_MS"
					:barST="bar_ST"
					>
					</bar-chart-use>
				</el-col>
				<el-col :span="12" >
					<div>
					<el-link class="chart_title" icon="el-icon-s-custom">會員成長趨勢</el-link>
					</div>
					<el-button @click="people_chart_post('過去七天')"  icon="el-icon-date" size="medium">last 7 days</el-button>
					<el-button @click="people_chart_post('過去三十天')"  icon="el-icon-date"size="medium">last 30 days</el-button>
					<el-date-picker
					style="margin-left:10px"
					v-model="daterange_people"
					type="daterange"
					start-placeholder="Start time"
					end-placeholder="End time"
					value-format="yyyy-MM-dd"
					@change="people_chart_post('自訂')"
					:picker-options="pickerOptions"
					:default-time="['00:00:00', '23:59:59']">
					</el-date-picker>
					<bar-chart-people type="barChart"  
					:bardate="bar_date_people" 
					:barnewsub="bar_newsub" 
					:barDS="bar_DS"
					>
					</bar-chart-people>
				</el-col>
			</el-row>
			<!-- 地域與性別年齡分析 -->
			<el-row :gutter="10" class="row_list order_list">
				<div>
					<el-link class="chart_title" icon="el-icon-view">地域性-年齡-性別</el-link>
				</div>
				<div class ="chart_style_area">
				<el-col :span="10">
					<taiwanpeople >
					</taiwanpeople>
				</el-col>
				<el-col :span="14" >
					<bar-chart-gender type="barChart"  
					:barage="bar_age" 
					:barmale="bar_male" 
					:barfemale="bar_female"
					>
					</bar-chart-gender>
				</el-col>
				</div>
			</el-row>

		</section>
</template>

<script>
	import echarts from 'echarts'
	import barChart from 'cps/echarts/barChart' 
	import barChartPeople from 'cps/echarts/barChartPeople' 
	import taiwanpeople from 'cps/echarts/taiwanpeople' 
	import barChartGender from 'cps/echarts/barChartGender'
	import axios from 'axios';

    export default {
    	data(){
    		return {
			  //年齡用DATA

				bar_age:['0-18歲','19-24歲','25-30歲','31-40歲','41-50歲','51-60歲','41-50歲','51-60歲','61-70歲','70-100歲'],
				bar_female:['3521','5642','7552','8524','7522','3542','2105','1152','524','35'],
				bar_male:['2741','7541','8554','5524','3424','6452','7415','545','254','60'],

			  // card show
			  cardshow:false,
			  //選擇的時間區間 BAR CHART
			  daterange_people:[],
			  daterange_use:[],
			  date_type:'過去七天',
			  //今天之後不能選 DATE PICKER
			  pickerOptions: {
				disabledDate(time) {
				return time.getTime() > Date.now();
				}
			  },	
			  //日期
			  bar_date_people:[],
			  bar_date_use:[],
			  //新增人數
			  bar_newsub:[],
			  //bot使用次數
			  bar_LBUC:[],
			  //送出的訊息數
			  bar_MS:[],
			  //觸擊訊息數
			  bar_ST:[],
			  //退訂
			  bar_DS:[],

			  //頂部資訊卡
			  Totalsub:'0',
			  Newsub:'0',
			  LBUC:'0',
			  MS:'0',
			  ST:'0',
			  DS:'0',
    		}
    	},
    	components: {
		   taiwanpeople,
		   barChartPeople,
		   barChartUse,
		},	
		created(){

		},
    	mounted(){
			//觸發頂部卡片資訊
			this.vshow(),
			this.people_chart_post('過去七天'),
			this.use_chart_post('過去七天'),
			this.age_chart_post()
		},
    	methods: {
			//觸發頂部卡片資訊
			vshow(){
			 this.cardshow = true
			},
			//跟後端要 people chart data
			people_chart_post(date){
			if(date!=='自訂'){this.daterange_people=[]};
			this.date_type=date;
			axios.post('https://service1-dot-flow-263607.appspot.com/json_entry2', 
			{type: "people_chart", // people chart responed  新增與退出人數
			 date_type:this.date_type,// 判斷是  過去七天/過去三十天/自訂
			 date_range:this.daterange_people// ["begin_time","end_time"]  if 過去七天/過去三十天 = 空矩陣
			},)
            .then(response =>(
					this.bar_date_people = response.data.DATE, // list [ "yyyy-mm-dd", "yyyy-mm-dd" ..]
					this.bar_newsub = response.data.Newsub, // list [ "xx", "xx" ..]
					this.bar_DS = response.data.DS// list [ "xx", "xx" ..]
					));
			},
			//跟後端要  使用率 chart data
			use_chart_post(date){
			if(date!=='自訂'){this.daterange_use=[]};
			this.date_type=date;
			axios.post('https://service1-dot-flow-263607.appspot.com/json_entry2', 
			{type: "use_chart", // LINE BOT 使用次數 / 訊息出發次數 / 訂閱刺數
			 date_type:this.date_type,// 判斷是  過去七天/過去三十天/自訂
			 date_range:this.daterange_use// ["begin_time","end_time"]  if 過去七天/過去三十天 = 空矩陣
			},)
            .then(response =>(
					this.bar_date_use = response.data.DATE, // list [ "yyyy-mm-dd", "yyyy-mm-dd" ..]
					this.bar_LBUC = response.data.LBUC,// list [ "xx", "xx" ..]
					this.bar_MS= response.data.MS,// list [ "xx", "xx" ..]
					this.bar_ST = response.data.ST// list [ "xx", "xx" ..]
					));
			},
			//跟後端要  age/gender chart data
		    age_chart_post(){
			axios.post('https://service1-dot-flow-263607.appspot.com/json_entry2', 
			{type: "age_chart", // LINE BOT 使用次數 / 訊息出發次數 / 訂閱刺數
			},)
            .then(response =>(
					this.bar_age = response.data.age, // list [ "yyyy-mm-dd", "yyyy-mm-dd" ..]
					this.bar_female = response.data.female,// list [ "xx", "xx" ..]
					this.bar_male= response.data.male// list [ "xx", "xx" ..]
					));
			},
    	}
    }
</script>

<style lang="less" scoped>
	.chart_title{
		font-size:25px;
		margin-left:0.3vw;
		margin-bottom:0.7vw
	}
	.chart_title_age{
		font-size:25px;
		margin-left:0.3vw;
		margin-bottom:0.7vw;
		margin-top:0.9vw
	}
	.chart_style{
		display:block;
		border:1px solid silver;
		background: #fff;
		box-shadow: 0.2px 0.2px 3px 0.1px ;
		border-radius:10px;
		.timepicker{
		margin-top:0.5vw;
		display: flex ;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content:center;
		align-items:center;
		}
	}
    .investor{
	}
	.v-enter { opacity: 0; }
	.v-enter-active  { transition: opacity 3.5s }//文字浮出時間
	.v-enter-to { opacity: 1; }
	.data_section{
		margin: 0.5vw;
		border-radius: 2px;
		.row_list{
			.row_base{
				width :100%;
				padding: 1vw;
				height: 100%;		
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 100%;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 500px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 1.2vw;
			border:1px solid silver;
			background: #fff;
			box-shadow: 0.2px 0.2px 3px 0.1px ;
			border-radius:10px;
			padding: 1vw;
			color:#000000;
			background-color:#fff;
			font-weight: bold;
			width: 100%;
			height: 100%;
			.leftItem{
				align-items: start;
				justify-content: space-evenly;
				text-align: left;
			}
			.rightItem{
				margin:1vw;
				font-size: 2vw;
				width:0.5vw;
				display: flex;
				align-items: flex-start;
				justify-content: start;
			}
		    .number{
				background: #fff;
				color:#000000;
				font-size: 2vw;
				justify-content: center;
				font-weight: bold;
				margin-left: 2.5vw;
				.perTitle{
					font-size: 1.2vw;
   				    margin-left: 0.5vw;
				}
			}
		}
		.pay{
			.leftItem{
				//justify-content: flex-start;
			}
		}
     
	}

</style>

