<template>
    <div class="fillcontain">
        <div style=" height: 500px; weight:800px" ref="fillcontainer">
           <div id="fundPosition" class="echartsPosition"></div> 
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import 'cps/echarts/theme/shine.js';
    import '../../assets/taiwan.js';

    export default {
        props: { 
			maplocation:{type:Array}
        },
        data(){
          return {
            chart:null
          }
        },
       methods: {
          randomData() {
             return Math.round(Math.random()*1000000);
          },
          drawMap (id,maplocation) {
            // echarts.init(),初始化数据      
            if ( this.chart &&  this.chart.dispose) { 
               this.chart.dispose(); 
            }   
            this.chart = echarts.init(document.getElementById(id),'shine');
            this.chart.setOption({
                title: {
                    text: '會員分布比例',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                // legend: {
                //     orient: 'vertical',
                //     left: 'left',
                //     data:['总投资额']
                // },
                visualMap: {
                    min: 0,
                    max: 100,
                    left: '20%',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: false,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    // feature: {
                    //     dataView: {
                    //     readOnly: false,
                    //     title:'數劇圖',
                    //     lang:['人數分布數劇','關閉','刷新']
                    //     },
                    //     saveAsImage: {
                    //     title:'下載'
                    //     }
                    // }
                },
                series: [
                    {
                        name: '會員分布比例',
                        type: 'map',
                        mapType: 'taiwan',
                        roam: false,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:maplocation
                    }
                ]
            });
          }
        },
        watch:{
            maplocation:{
              handler(val,oldVal) 
              { 
                this.drawMap('fundPosition',this.maplocation)
              }
            }
        },
        mounted(){
              this.$nextTick(function() {
                // this.$refs.fillcontainer.style.height = (document.body.clientHeight - 400)+'px'
                this.drawMap('fundPosition',this.maplocation);
                var that = this;
                var resizeTimer = null;
                // 保证页面在放大或缩小时，也能够动态的显示数据
                // window.onresize = function() {
                //   if (resizeTimer) clearTimeout(resizeTimer);
                //   resizeTimer = setTimeout(function() {
                //     that.$refs.fillcontainer.style.height = (document.body.clientHeight - 400)+'px'
                //     that.drawMap('fundPosition');
                //   }, 100);
                // }
            })
        }

    }
</script>

<style lang="less" scoped>
.fillcontainer{
	width:100%;
}
.fillcontain /deep/.echartsPosition{
    -webkit-box-shadow : 0 0 0 ;
}
   
</style>


