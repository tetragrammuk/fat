<template>
  <div class="outer">
	  HI
  </div>
</template>

<script>

	import axios from 'axios';
	import Router from 'vue-router'

    export default {
    	data(){
    		return {

    		}
    	},
    	components: {

		},	
		created(){

		},
    	mounted(){
			this.openURL()
		},
    	methods: {
			openURL(){
				  window.open(
					  "https://test-platform-dot-flow-263607.appspot.com/permission/userManager/userList"
					  ,"_blank"),
				 this.$router.push({ path: '/index/index' })
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

