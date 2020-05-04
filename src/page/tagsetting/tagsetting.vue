<template>
  <div class="outer">
  <el-tabs v-model="Active" @tab-click="handleClick">
	<el-tab-pane label="標籤管理" name="TAG">
		<el-tabs v-model="Tag_active" @tab-click="handleClick" >
		<el-tab-pane  name="All">	
		<span slot="label"> 全部( {{all_tag}} )</span>	
		<All-tag-table v-if="All==true" v-on:childevent="show_all_total">
		</All-tag-table>
		</el-tab-pane>
		<el-tab-pane name="Forever">	
		<span slot="label"> 永久( {{forever_tag}} )</span>	
		<Forever-tag-table v-if="Forever==true" v-on:childevent="show_forever_total">
		</Forever-tag-table>	
		</el-tab-pane>
		<el-tab-pane name="Temp">	
		<span slot="label"> 時效性( {{temp_tag}} )</span>	
		<Temp-tag-table v-if="Temp==true" v-on:childevent="show_temp_total">
		</Temp-tag-table>		
		</el-tab-pane>
		</el-tabs>
	</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>

	import axios from 'axios';
	import AllTagTable from "./components/AllTagTable";
	import ForeverTagTable from "./components/ForeverTagTable";
	import TempTagTable from "./components/TempTagTable";

    export default {
    	data(){
    		return {
				Active: 'TAG',// 最外層的標嵌頁觸發
				Tag_active:'All', // 標傔內的"全部"頁面
				//記算標籤種類有幾種
				all_tag:'',
				temp_tag:'',
				forever_tag:'',
				//Tab切換時刷新
				Forever:true,
				All:true,
				Temp:true

    		}
    	},
    	components: {
			AllTagTable,// all tags table
			ForeverTagTable,
			TempTagTable

		},	
		created(){

		},
    	mounted(){


		},
    	methods: {
			show_all_total(all_tag){
				console.log('see me'+all_tag);
				this.all_tag = all_tag;
			},
			show_forever_total(forever_tag){
				this.forever_tag = forever_tag;
			},
			show_temp_total(temp_tag){
				this.temp_tag = temp_tag;
			},

			handleClick(tab, event) {
			    if (tab.name == 'All') {
						this.All = true
						this.Forever = false
						this.Temp = false
				}
				if (tab.name == 'Forever') {
						this.All = false
						this.Forever = true
						this.Temp = false
				}
			    if (tab.name == 'Temp') {
						this.All = false
						this.Forever = false
						this.Temp = true
				}
			}

    	}
    }
</script>

<style lang="less" scoped>
	.outer{
		margin-left:2vw;
		margin-top:1vw;
		font-size:18px;
	}
	//tabs font
	.outer/deep/.el-tabs__item{
	font-size:18px;
	}
	//tabs
	.outer/deep/.el-tabs__nav {
    margin-left: 50px;
	}
	//tabs__nav
	.outer/deep/.el-tabs__nav-wrap::after {
    width: 30%;
	}

	

</style>

