<template>
		<section class="data_section" ref="data_section"> 
				<transition mode="in-out">
				<el-row :gutter="30" type="flex" justify="space-around" flex-wrap="nowrap" v-show="cardshow" >				
							<el-col :span="4.8" >
								<div  class="data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor" >&ensp;&ensp;&ensp;會員總人數&ensp;&ensp;&ensp;</p>
										<p class="number">{{Totalsub}}<span class="perTitle">(人)</span></p>
									</div>
									<div class="rightItem">
										<i class="el-icon-user"></i>
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
										<i class="el-icon-chat-dot-square"></i>
									</div> 
								</div>
							</el-col>
							<el-col :span="4.8">
								<div class="keleBgColor data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">活躍會員-(近七天)</p>
										<p class="number">{{ST}}<span class="perTitle">(次)</span></p>
										<p class="cardText"></p>
									</div>
									<div class="rightItem">
										<i class="el-icon-bell"></i>
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
					<el-button @click="use_chart_post('過去7天')"  icon="el-icon-date" size="medium">近7天</el-button>
					<el-button @click="use_chart_post('過去30天')"  icon="el-icon-date"size="medium">近30天</el-button>
					<el-date-picker
					style="margin-left:10px"
					v-model="daterange_use"
					type="daterange"
					start-placeholder="開始日期"
					end-placeholder="結束日期"
					value-format="yyyy-MM-dd"
					@change="use_chart_post('自訂')"
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
					<el-button @click="people_chart_post('過去7天')"  icon="el-icon-date" size="medium">近7天</el-button>
					<el-button @click="people_chart_post('過去30天')"  icon="el-icon-date"size="medium">近30天</el-button>
					<el-date-picker
					style="margin-left:10px"
					v-model="daterange_people"
					type="daterange"
					start-placeholder="開始日期"
					end-placeholder="結束日期"
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
					<el-link class="chart_title" icon="el-icon-view">年齡-性別-地域</el-link>
				</div>
				<div class ="chart_style_area orderArea orderbarArea">
				<el-col :span="10" >
					<bar-chart-gender 
					:barage="bar_age" 
					:barmale="bar_male" 
					>
					</bar-chart-gender>
				</el-col>
				<el-col :span="4" >
					<pie-chart-gender
					:piegender="pie_gender" 
					:pienumber="pie_number" 
					>
					</pie-chart-gender>
				</el-col>
				<el-col :span="10" >
					<taiwanpeople
					:maplocation="map_location"
					>
					</taiwanpeople>
				</el-col>
				</div>
			</el-row>

		</section>
</template>

<script>
	import echarts from 'echarts'
	import barChart from 'cps/echarts/barChart' 
	import barChartUse from 'cps/echarts/barChartUse' 
	import barChartPeople from 'cps/echarts/barChartPeople' 
	import taiwanpeople from 'cps/echarts/taiwanpeople' 
	import barChartGender from 'cps/echarts/barChartGender'
	import pieChartGender from 'cps/echarts/pieChartGender'
	import axios from 'axios';
	import { getToken } from '@/utils/auth' ; 

    export default {
    	data(){
    		return {
				//性別比
				pie_gender:['男生','女生','不明'],
				pie_number:[						
				{value:80, name:'男生'},
				{value:10, name:'女生'},
				{value:10, name:'不明'}],
				//年齡用DATA
				bar_age:['20-24歲','25-29歲','30-35歲','36-40歲'],
				bar_male:['2741','7541','8554','5524'],
				//map location
				map_location:[],
			  // card show
			  cardshow:false,
			  //選擇的時間區間 BAR CHART
			  daterange_people:[],
			  daterange_use:[],
			  date_type:'過去7天',
			  //今天之後不能選 DATE PICKER
			  pickerOptions: {
				disabledDate(time) {
				return time.getTime() > (Date.now()+86400000);
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
			  Totalsub:'0',//總會員數
			  Newsub:'0',//新增會員_近七天
			  LBUC:'0',//機器人使用次數
			  MS:'0',//訊息傳送
			  ST:'0',
			  DS:'0',//退訂會員_近七天
    		}
    	},
    	components: {
		   taiwanpeople,
		   barChartPeople,
		   barChartUse,
		   barChartGender,
		   pieChartGender
		},	
		created(){

		},
    	mounted(){
			//觸發頂部卡片資訊
			this.vshow(),
			this.card_post(),
			this.people_chart_post('過去7天'),
			this.use_chart_post('過去7天'),
			this.age_chart_post()
			// this.age_chart_post()
			
		},
    	methods: {
			//觸發頂部卡片資訊
			vshow(){
			 this.cardshow = true
			},
			card_post(){
			let token = getToken('Token');
			axios.post('https://test-backend-dot-flow-263607.appspot.com/Total_sub',
				{type: "Totalsub"},
				{ headers: {
				'x-access-token': token
				}
				}
                )
                .then(response =>(
					this.Totalsub = response.data.follower,
					this.Newsub = response.data.friend_in_7,
					this.MS = response.data.multicast,
					this.ST = response.data.touch_in_7,
					this.DS = response.data.unfriend_in_7
					))
            ;},
			//跟後端要 people chart data
			people_chart_post(date){
			let token = getToken('Token');
			if(date!=='自訂'){this.daterange_people=[]};
			this.date_type=date;
			axios.post('https://test-backend-dot-flow-263607.appspot.com/barchart', 
			{type: "barchart", // people chart responed  新增與退出人數
			 date_type:this.date_type,// 判斷是  過去七天/過去三十天/自訂
			 date_range:this.daterange_people// ["begin_time","end_time"]  if 過去七天/過去三十天 = 空矩陣
			},
			{ headers: {
				'x-access-token': token
			   }
			})
            .then(response =>(
					this.bar_date_people = response.data.cur_date, // list [ "yyyy-mm-dd", "yyyy-mm-dd" ..]
					this.bar_newsub = response.data.new_sub, // list [ "xx", "xx" ..]
					this.bar_DS = response.data.de_sub,// list [ "xx", "xx" ..]
					console.log(response.data.new_sub)
					));
			},
			//跟後端要  使用率 chart data
			use_chart_post(date){
			let token = getToken('Token');
			if(date!=='自訂'){this.daterange_use=[]};
			this.date_type=date;
			axios.post('https://test-backend-dot-flow-263607.appspot.com/barchart', 
			{type: "barchart", // LINE BOT 使用次數 / 訊息出發次數 / 訂閱刺數
			 date_type:this.date_type,// 判斷是  過去七天/過去三十天/自訂
			 date_range:this.daterange_use// ["begin_time","end_time"]  if 過去七天/過去三十天 = 空矩陣
			},
			{ headers: {
				'x-access-token': token
			   }
			})
            .then(response =>(
					
					this.bar_date_use = response.data.cur_date, // list [ "yyyy-mm-dd", "yyyy-mm-dd" ..]
					this.bar_LBUC = response.data.autoreply,// list [ "xx", "xx" ..]
					this.bar_MS= response.data.multicast,// list [ "xx", "xx" ..]
					this.bar_ST = response.data.touch_today// list [ "xx", "xx" ..]
					));
			},
			//跟後端要  age/gender/location chart data
		    age_chart_post(){
			let token = getToken('Token');
			axios.post('https://test-backend-dot-flow-263607.appspot.com/demographic',
			{type: "demographic"},
			{ headers: {
				'x-access-token': token
			   }
			})
            .then(response =>(
					this.bar_age = response.data.data_age.age, // list [ "yyyy-mm-dd", "yyyy-mm-dd" ..]
					this.bar_male= response.data.data_age.percentage,// list [ "xx", "xx" ..]
					this.pie_number = response.data.data_gender,
					this.map_location= response.data.data_area,
					console.log('開始print chart data'),					
					console.log(this.bar_age),
					console.log(this.bar_male),
					console.log(this.pie_number),
					console.log(this.map_location)
					));
			},





    	}
    }
</script>

<style lang="less" scoped>
	.data_section/deep/.order_list/deep/.orderbarArea[data-v-b145f1a4]{
			border:0px solid silver;
			background: #fff;
			box-shadow: 0.2px 0.2px 3px 0.1px ;
	}
	.data_section/deep/.el-divider--horizontal{
		margin: 15px
	}
	.chart_title{
		font-size:20px;
		margin-left:0.3vw;
		margin-bottom:0.7vw;
		margin-top:0.7vw
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
	.chart_style_area{
		display: flex ;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content:center;
		align-items:center;
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
			color:#4F4F4F;
			background-color:#fff;
			font-family:"Arial";
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
				color:#4F4F4F;
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

