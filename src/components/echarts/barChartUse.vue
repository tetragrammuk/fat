<template>
    <div :id="id" class="orderArea orderbarArea">
    </div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json"
    import axios from 'axios';
    export default {
        name:'barChart',
        props: { 
                 bardate:{type:Array},
                 barLBUC:{type:Array},
                 barMS:{type:Array},
                 barST:{type:Array}
               },
        data(){
            return {
                 id:'barChart',
                 myChart:null,

            }
        },
        mounted(){
            
        },
        beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
            changebar(){
                echarts.registerTheme('westeros', echartsTheme)
                this.myChart = echarts.init(document.getElementById(this.id),'westeros')
                this.myChart.setOption(this.initOption(this.bardate,this.barLBUC,this.barMS,this.barST))
            },      
            loadChart(){
                console.log("loading chart"+this.date)
                //this.$nextTick((datatime123) => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros')
                    this.myChart.setOption(this.initOption(this.bardate,this.barLBUC,this.barMS,this.barST))
                    console.log("loading chart"+this.date)
                //})
            },
         	initOption(date,LBUC,MS,ST){
                let option = {
                    
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['Line Bot Useage Counters','Messange Sending','Subscribers touching']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : date
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'Line Bot Useage Counters',
                            type:'line',
                            data:LBUC,
                            smooth : false,
                            itemStyle:{
                            color : 'rgb(102, 110, 212)'
                            },
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'Messange Sending',
                            type:'line',
                            data:MS,
                            smooth : false,
                            itemStyle:{
                            color : '#69969c'
                            },
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'Subscribers touching',
                            type:'line',
                            data:ST,
                            smooth : false,
                            itemStyle:{
                            color : '#67b6ab'
                            },
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        }

                    ]
                };
				return option;
			},
        },
        watch: {   
            bardate:{ 
              handler(val,oldVal) 
              { 
                console.log("watch"+this.bardate)
                this.changebar()
              }
     
            }
        }
    }
</script>

<style lang="less">

</style>
