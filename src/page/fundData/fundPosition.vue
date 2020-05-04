<template>
    <div class="fillcontain">
        <div class="fillcontainer" ref="fillcontainer">
           <div id="fundPosition" class="echartsPosition"></div> 
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import '../../../node_modules/echarts/theme/roma.js';
    import '../../assets/taiwan.js';

    export default {
        data(){
          return {
            chart:null
          }
        },
       methods: {
          randomData() {
             return Math.round(Math.random()*1000000);
          },
          drawMap (id) {
            // echarts.init(),初始化数据      
            if ( this.chart &&  this.chart.dispose) { 
               this.chart.dispose(); 
            }   
            this.chart = echarts.init(document.getElementById(id),'roma');
            this.chart.setOption({
                title: {
                    text: '會員全台分布狀況',
                    subtext: '單位/人',
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
                    max: 1200000,
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '會員總人數',
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
                        data:[
                            {name: '高雄',value: this.randomData() },
                            {name: '屏東',value: this.randomData() },
                            {name: '台南',value: this.randomData() },
                            {name: '台中',value: this.randomData() },
                            {name: '新北',value: this.randomData() },
                            {name: '台北',value: this.randomData() },
                            {name: '金門',value: this.randomData() },
                            {name: '澎湖',value: this.randomData() },
                            {name: '宜蘭',value: this.randomData() },
                            {name: '花蓮',value: this.randomData() },
                            {name: '台東',value: this.randomData() },
                            {name: '嘉義',value: this.randomData() },
                            {name: '雲林',value: this.randomData() },
                            {name: '南投',value: this.randomData() },
                            {name: '苗栗',value: this.randomData() },
                            {name: '新竹',value: this.randomData() },
                            {name: '彰化',value: this.randomData() },
                            {name: '桃園',value: this.randomData() },

    
                        ]
                    }
                ]
            });
          }
        },
        mounted(){
              this.$nextTick(function() {
                this.$refs.fillcontainer.style.height = (document.body.clientHeight - 500)+'px'
                this.drawMap('fundPosition');
                var that = this;
                var resizeTimer = null;
                // 保证页面在放大或缩小时，也能够动态的显示数据
                window.onresize = function() {
                  if (resizeTimer) clearTimeout(resizeTimer);
                  resizeTimer = setTimeout(function() {
                    that.$refs.fillcontainer.style.height = (document.body.clientHeight - 500)+'px'
                    that.drawMap('fundPosition');
                  }, 100);
                }
            })
        }

    }
</script>

<style lang="less" scoped>
.fillcontainer{
}
   
</style>


