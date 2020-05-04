<template>
    <div :id="id" style=" height: 500px;">
    </div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json"
    import axios from 'axios';
    export default {
        name:'barChartGender',
        props: { 
                 barage:{type:Array},
                 barmale:{type:Array}
               },
        data(){
            return {
                 id:'barChartGender',
                 myChart:null,

            }
        },
        mounted(){
            console.log('hi'+this.barage),
            echarts.registerTheme('westeros', echartsTheme),
            this.myChart = echarts.init(document.getElementById(this.id),'westeros'),
            this.myChart.setOption(this.initOption(this.barage,this.barmale))
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
                this.myChart.setOption(this.initOption(this.barage,this.barmale))
            },      
            loadChart(){

                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros')
                    this.myChart.setOption(this.initOption(this.barage,this.barmale))
 
            },
         	initOption(barage,barmale){
                let option = {       
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['人數百分比']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : barage
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [

                        {
                            name:'人數百分比',
                            type:'bar',
                            data:barmale,
                            smooth : false,
                            itemStyle:{
                            color : '#008080'
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
            barmale:{ 
              handler(val,oldVal) 
              { 
                console.log("watch"+this.barmale)
                this.changebar()
              }
     
            }
            
        }
    }
</script>

<style lang="less">

</style>
