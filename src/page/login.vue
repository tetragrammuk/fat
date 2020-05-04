<template>
  	<div class="login_page">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer">
			    <div class='titleArea'>
					<img class="logo" :src="logo" alt="Fl@w" style="width: 20vw;height: 18vw">
					<div class='title'>Line串流管理平台</div>
			   </div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
					<el-form-item prop="username" class="login-item">
            		<span class="loginTips"><icon-svg icon-class="iconuser" /></span>
					<el-input @keyup.enter.native ="submitForm('loginForm')" 
					class="area" 
					type="text" 
					placeholder="帳號" 
					v-model="loginForm.username" 
					></el-input>
					</el-form-item>
					<el-form-item prop="password" class="login-item"> 
					    <span class="loginTips"><icon-svg icon-class="iconLock" /></span>
						<el-input @keyup.enter.native ="submitForm('loginForm')" class="area" type="password" placeholder="密碼" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">Log in</el-button>
				  </el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import logoImg from "@/assets/img/logo.png";
	import { login } from "@/api/user";
	import { setToken } from '@/utils/auth';
	import axios from 'axios';

	export default {
	    data(){
			return {
				logo:logoImg,
				loginForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [
			            { required: true, message: '用戶名沒填捏', trigger: 'blur' },
						{ min: 2, max: 8, message: '2 到 8 位數', trigger: 'blur' }
			        ],
					password: [
						{ required: true, message: '你沒輸入啦', trigger: 'blur' }
					],
				}
			}
		},
		mounted(){
		},
		methods: {
			loginByWechat(){
			},
			showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
		    submitForm(loginForm) {
				console.log(loginForm);
				this.$refs[loginForm].validate((valid) => {
					if (valid) {
						let loginForm = this.loginForm;
						axios.post('https://test-backend-dot-flow-263607.appspot.com/login',
						{loginForm},
						)
                		.then(response =>{
						if(response.data.token){
						console.log(response.data.token);
						setToken("Token",response.data.token);
						this.$router.push({ path: '/' });
						this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
						}
						if(response.data.message){
							this.$message.error(response.data.message);
							console.log('token missing');
						}
						});
						
						// login(userinfo).then(res => {  // 帳號密碼與後台樣要 token and user info.
						// 	let token = res.data.token; 
						// 	setToken("Token",token)  // Save token in cookies
						// 	this.$router.push({ path: '/' })
						// 	this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
						// })
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
 
	.login_page{
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../assets/img/bg9.jpg) no-repeat center center;
		background-size: 100% 100%;
	}
	.form_contianer{
		position: absolute;
		top: 50%;
        left: 50%;
		transform: translate(-50%,-50%);
		background: #fff;
		display:flex;
		flex-direction: column;
		width:30%;
		height:70%;
		border-style:groove;
		border-radius: 5px;
		padding: 20px;
		text-align: center;
		justify-content:center;
		.titleArea{
			display:flex;
			flex-direction: column;
			justify-content: center;
   			align-items: center;
			text-transform: uppercase;
			font-size: 22px;
			width: 100%;
			height : 65%;
			
			.logo{
				width: 100%;
    			margin-right: 10px;
			}
			.title{
				align-self:flex-end;
				font-weight:bold;
				text-align:right;
				font-size: 0.7vw;
				color: #007799;
				font-family:"Microsoft YaHei";
				
			}
		}
	
		.loginForm{
			.submit_btn{
				position: absolute;
				right: 0px;
				margin-bottom:0px;
				width: 30%;
				padding:5px 0;
				font-size: 16px;
			}
			.loginTips{
				position: absolute;
				left: 10px;
				z-index: 20;
				font-size: 18px;
				top: 50%;
				transform: translateY(-50%);
			}
	    }
	}

	.manage_tip{
		margin-bottom:20px;
		.title{
			font-family: cursive;
			font-weight: bold;
			font-size: 26px;
			color:#fff;
		}
		.logo{
			width:80px;
			height:80px;
		}
	}
	
	.tiparea{
		text-align:left;
		font-size: 12px;
		color: #4cbb15;
		padding: 10px 0;
		.tip{
			margin-left: 54px;
		}
	}
	
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
	.loginForm{
		.el-button--primary{
		}
	}
	.sanFangArea{
		border-top: 1px solid #DCDFE6;
		padding: 10px 0;
		display: none;
		.title{
			font-size: 15vw;
			color: #8b9196;
     		margin-top: 5vw;
			margin-bottom: 5vw;
			
		}
		ul{
			li{
				flex:1;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.svg-icon{
					font-size: 24px;
				}
			}
		}
	}
</style>
