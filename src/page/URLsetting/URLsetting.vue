<template>
  <div class="outer">
  <el-tabs v-model="Active" @tab-click="handleClick">
	<el-tab-pane label="追蹤連結管理" name="TAG">
		<All-tag-table >
		</All-tag-table>
	</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>

	import axios from 'axios';
	import AllTagTable from "./components/AllTagTable";

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
			AllTagTable// all tags table

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

