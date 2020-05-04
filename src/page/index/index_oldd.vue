<template>
		<section class="data_section" ref="data_section"> 
				<transition mode="in-out">
				<el-row :gutter="2" type="flex" justify="space-around" flex-wrap="nowrap" v-show="cardshow" >				
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
			<!-- 觸擊與 會員成長圖 -->
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="12" >
					<div>
					<el-link class="chart_title" icon="el-icon-s-promotion">觸擊分析</el-link>
					</div>
					<div class ="chart_style">
					<div class ="timepicker">
					<el-button @click="days7"   icon="el-icon-date" size="medium">last 7 days</el-button>
					<el-button @click="days30"  icon="el-icon-date"size="medium">last 30 days</el-button>
					<el-date-picker
					style="margin-left:10px"
					v-model="daterange"
					type="daterange"
					start-placeholder="Start time"
					end-placeholder="End time"
					value-format="yyyy-MM-dd"
					@change="startend"
					:picker-options="pickerOptions"
					>
					</el-date-picker>
					</div>
					<bar-chart type="barChart"  
					:bardate="bar_date" 
					:barLBUC="bar_LBUC"
					:barMS="bar_MS"
					:barST="bar_ST"
					>
					</bar-chart>
					</div>
				</el-col>
				<el-col :span="12" >
					<div>
					<el-link class="chart_title" icon="el-icon-s-custom">會員成長趨勢</el-link>
					</div>
					<div class ="chart_style">
					<div class ="timepicker">
					<el-button @click="days7_people"  icon="el-icon-date" size="medium">last 7 days</el-button>
					<el-button @click="days30_people"  icon="el-icon-date"size="medium">last 30 days</el-button>
					<el-date-picker
					style="margin-left:10px"
					v-model="daterange_people"
					type="daterange"
					start-placeholder="Start time"
					end-placeholder="End time"
					value-format="yyyy-MM-dd"
					@change="startend"
					:picker-options="pickerOptions"
					>
					</el-date-picker>
					</div>
					<bar-chart-people type="barChart"  
					:bardate="bar_date" 
					:barnewsub="bar_newsub" 
					:barDS="bar_DS"
					>
					</bar-chart-people>
					</div>
				</el-col>
			</el-row>
			<!-- 地域與性別年齡分析 -->
			<el-row :gutter="10" class="row_list order_list">
				<div>
					<el-link class="chart_title_age" icon="el-icon-view">地域性-年齡-性別</el-link>
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
	import barChart from 'cps/echarts/barChart' // 用户投资类型 柱状图
	import barChartPeople from 'cps/echarts/barChartPeople' // 用户投资类型 柱状图
	import taiwanpeople from 'cps/echarts/taiwanpeople' // 用户投资类型 柱状图
	import barChartGender from 'cps/echarts/barChartGender'
	import axios from 'axios';

    export default {
    	data(){
    		return {
				bar_age:['0-18歲','19-24歲','25-30歲','31-40歲','41-50歲','51-60歲','41-50歲','51-60歲','61-70歲','70-100歲'],
				bar_female:[3521,5642,7552,8524,7522,3542,2105,1152,524,35],
				bar_male:[2741,7541,8554,5524,3424,6452,7415,545,254,60],
				//今天以後不能選
				pickerOptions: {
				disabledDate(time) {
				return time.getTime() > Date.now();
				}
				},	
			  // card show
			  cardshow:false,

			  daterange:[],
			  daterange_people:[],
			  //日期
			  bar_date:[],
			  bar_date7:[],
			  bar_date30:[],
			  bar_datetotal:[],
			  bar_date_startend:[],
			  //新增人數
			  bar_newsub:[],
			  bar_newsub7:[],
			  bar_newsub30:[],
			  bar_newsubtotal:[],
			  bar_newsub_startend:[],
			  //bot使用次數
			  bar_LBUC:[],
			  bar_LBUC7:[],
			  bar_LBUC30:[],
			  bar_LBUCtotal:[],
			  bar_LBUC_startend:[],
			  //送出的訊息數
			  bar_MS:[],
			  bar_MS7:[],
			  bar_MS30:[],
			  bar_MStotal:[],
			  bar_MS_startend:[],
			  //觸擊訊息數
			  bar_ST:[],
			  bar_ST7:[],
			  bar_ST30:[],
			  bar_STtotal:[],
			  bar_ST_startend:[],
			  //退訂
			  bar_DS:[],
			  bar_DS7:[],
			  bar_DS30:[],
			  bar_DStotal:[],
			  bar_DS_startend:[],

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
		   barChart,
		   barChartPeople,
		   barChartGender,
		},	
		created(){

		},
    	mounted(){
			this.vshow(),
			axios.post('https://service1-dot-flow-263607.appspot.com/json_entry', 
                {type: "Totalsub"},
                )
                .then(response =>(
					this.Totalsub = response.data.Totalsub,
					this.Newsub = response.data.Newsub,
					this.LBUC = response.data.LBUC,
					this.MS = response.data.MS,
					this.ST = response.data.ST,
					this.DS = response.data.DS
					))
            ;
            axios.post('https://service1-dot-flow-263607.appspot.com/json_entry2', 
            {type: "barchart"},
            )
            .then(response =>(
					this.bar_date = response.data.DATE,
					this.bar_date30 = this.bar_date.slice(this.bar_date.length-30,this.bar_date.length),
					this.bar_date7 = this.bar_date.slice(this.bar_date.length-7,this.bar_date.length),
					this.bar_datetotal = this.bar_date.slice(0,this.bar_date.length),
					console.log("datetotal"+this.bar_datetotal),
					this.bar_newsub = response.data.Newsub,
					this.bar_newsub30 = this.bar_newsub.slice(this.bar_date.length-30,this.bar_date.length),
					this.bar_newsub7 = this.bar_newsub.slice(this.bar_date.length-7,this.bar_date.length),
					this.bar_newsubtotal = this.bar_newsub.slice(0,this.bar_date.length),

					this.bar_LBUC = response.data.LBUC,
					this.bar_LBUC30 = this.bar_LBUC.slice(this.bar_date.length-30,this.bar_date.length),
					this.bar_LBUC7 = this.bar_LBUC.slice(this.bar_date.length-7,this.bar_date.length),
					this.bar_LBUCtotal = this.bar_LBUC.slice(0,this.bar_date.length),

					this.bar_MS= response.data.MS,
					this.bar_MS30 = this.bar_MS.slice(this.bar_date.length-30,this.bar_date.length),
					this.bar_MS7 = this.bar_MS.slice(this.bar_date.length-7,this.bar_date.length),
					this.bar_MStotal = this.bar_MS.slice(0,this.bar_date.length),

					this.bar_ST = response.data.ST,
					this.bar_ST30 = this.bar_ST.slice(this.bar_date.length-30,this.bar_date.length),
					this.bar_ST7 = this.bar_ST.slice(this.bar_date.length-7,this.bar_date.length),
					this.bar_STtotal = this.bar_ST.slice(0,this.bar_date.length),

					this.bar_DS = response.data.DS,
					this.bar_DS30 = this.bar_DS.slice(this.bar_date.length-30,this.bar_date.length),
					this.bar_DS7 = this.bar_DS.slice(this.bar_date.length-7,this.bar_date.length),
					this.bar_DStotal = this.bar_DS.slice(0,this.bar_date.length)

					))             
            ;



		},
    	methods: {
			vshow(){
			// if(this.cardshow == false){
			 this.cardshow = true//}
			 //else{ this.cardshow = false}
			},
			
			days7 : function(){
				this.daterange=[]
				this.bar_date = this.bar_date7 	
				// this.bar_newsub = this.bar_newsub7
				this.bar_LBUC = this.bar_LBUC7
				this.bar_MS = this.bar_MS7
				this.bar_ST = this.bar_ST7
				// this.bar_DS = this.bar_DS7	
			},
			days7_people : function(){
				this.daterange=[]
				this.bar_date = this.bar_date7 	
				this.bar_newsub = this.bar_newsub7
				this.bar_DS = this.bar_DS7	
			},
			days30 : function(){
				this.daterange=[]
				console.log("day30+++"+this.bardate30)
				this.bar_date = this.bar_date30 	
				this.bar_newsub = this.bar_newsub30	
				this.bar_LBUC = this.bar_LBUC30
				this.bar_MS = this.bar_MS30
				this.bar_ST = this.bar_ST30
				this.bar_DS = this.bar_DS30
			},
			days30_people : function(){
				this.daterange=[]
				this.bar_date = this.bar_date30 	
				this.bar_newsub = this.bar_newsub30	
				this.bar_DS = this.bar_DS30
			},
			startend : function(){
				this.bar_date_startend = this.bar_datetotal.slice(this.bar_datetotal.indexOf(this.daterange[0]),this.bar_datetotal.indexOf(this.daterange[1])+1)
				this.bar_LBUC_startend = this.bar_LBUCtotal.slice(this.bar_datetotal.indexOf(this.daterange[0]),this.bar_datetotal.indexOf(this.daterange[1])+1)
				this.bar_MS_startend = this.bar_MStotal.slice(this.bar_datetotal.indexOf(this.daterange[0]),this.bar_datetotal.indexOf(this.daterange[1])+1)
				this.bar_ST_startend = this.bar_STtotal.slice(this.bar_datetotal.indexOf(this.daterange[0]),this.bar_datetotal.indexOf(this.daterange[1])+1)
				this.bar_DS_startend = this.bar_DStotal.slice(this.bar_datetotal.indexOf(this.daterange[0]),this.bar_datetotal.indexOf(this.daterange[1])+1)
				this.bar_newsub_startend = this.bar_newsubtotal.slice(this.bar_datetotal.indexOf(this.daterange[0]),this.bar_datetotal.indexOf(this.daterange[1])+1)
				this.bar_date = this.bar_date_startend 	
				this.bar_LBUC = this.bar_LBUC_startend
				this.bar_MS = this.bar_MS_startend
				this.bar_ST = this.bar_ST_startend
				this.bar_DS = this.bar_DS_startend
				this.bar_newsub = this.bar_newsub_startend
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
		border:0.01vw solid silver;
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
	.chart_style_area
	{
		display:flex;
		border:0.01vw solid silver;
		height:100%;
		width:100%;
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
	.v-enter { opacity: 0; }
	.v-enter-active  { transition: opacity 3.5s }//文字浮出時間
	.v-enter-to { opacity: 1; }
	.data_section{
		margin: 0.5vw;
		margin-top:1vw;
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
			border:0.01vw solid silver;
			background: #fff;
			box-shadow: 0.2px 0.2px 3px 0.1px ;
			border-radius:10px;
			padding: 1vw;
			color:#000000;
			background-color:#fff;
			// font-weight: bold;
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
				// font-weight: bold;
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

