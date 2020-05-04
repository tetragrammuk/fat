<template>
    <div :id="id" class="orderArea orderbarArea">
    </div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json"
    import axios from 'axios';
    export default {
        name:'barChartPeople',
        props: { 
                 bardate:{type:Array},
                 barnewsub:{type:Array},
                 barDS:{type:Array}
               },
        data(){
            return {
                 id:'barChartPeople',
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
                this.myChart.setOption(this.initOption(this.bardate,this.barnewsub,this.barDS))
            },      
            loadChart(){
                console.log("loading chart"+this.date)
                //this.$nextTick((datatime123) => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros')
                    this.myChart.setOption(this.initOption(this.bardate,this.barnewsub,this.barDS))
                    console.log("loading chart"+this.date)
                //})
            },
         	initOption(date,newsub,DS){
                let option = {       
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['New subscribers','Decreased Subscribers']
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
                            name:'New subscribers',
                            type:'bar',
                            data:newsub,
                            //smooth : false,
                            itemStyle:{
                            color : '#00BBFF'
                            },
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'Decreased Subscribers',
                            type:'bar',
                            data:DS,
                            smooth : false,
                            itemStyle:{
                            color : '#666666'
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
