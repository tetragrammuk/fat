<template>
  <div :id="id" style=" height: 500px;"></div>
</template>

<script>
	import echarts from 'echarts'
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        name:'pieChartGender',
        props: { 
			piegender:{type:Array},
			pienumber:{type:Array}
               },
        data(){
            return {
				 id:'pieChartGender',
                 myChart:null,
            }
        },
        mounted(){
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
					this.myChart.setOption(this.initOption(this.piegender,this.pienumber));
					console.log('看我一下啦'+this.piegender);
					console.log('看我一下啦'+this.pienumber);
		},
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
			 loadChart(){        
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
					this.myChart.setOption(this.initOption(this.piegender,this.pienumber));
            },
         	initOption(piegender,pienumber){
			
				let data = {
					  title : {
						x:'left'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : ({d}%)"
					},
					color:['#473792','#8861A7','#444444']
					,
					legend: {
						orient: 'vertical',
						left: 'center',
						data: piegender
					},
					series : [
						{
							
							type: 'pie',
							radius : '80%',
                            center: ['50%', '50%'],
							data:pienumber,
							itemStyle: {
 								normal:{ 
								    label:{ 
										show: true, 
										position:'inner',
										formatter: '{b} : ({d}%)' 
									}, 
								 textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 16    //文字的字体大小
                            	    }
								},
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
				return data;
			},
        },
        watch: {
        pienumber:{ 
              handler(val,oldVal) 
              { 
                console.log("watch"+this.pienumber)
                this.loadChart()
              }
		}
		}
    }
</script>

<style lang="less">
</style>
