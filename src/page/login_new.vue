<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img :src="logo" alt="FL@W Admin" width="180" height="180">
                  <h1 class="flex my-4 primary--text">Vue Admin Template</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="loginForm.username"
                    :error="error"
                    :rules="[rules.username]"/>
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.password]"
                    v-model="loginForm.password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="submitForm" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="showResult"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
	import logoImg from "@/assets/img/logo.png";
	import { login } from "@/api/user";
  import { setToken } from '@/utils/auth'
export default {
  data() {
			return {
				logo:logoImg,
				loginForm: {
					username: 'admin',
					password: '123456'
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

  methods: {
			showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
		    submitForm(loginForm) {
				this.$refs[loginForm].validate((valid) => {
					if (valid) {
						let userinfo = this.loginForm;
						login(userinfo).then(res => {  // 帳號密碼與後台樣要 token and user info.
							let userList = res.data.userList; 
							setToken("Token",userList.token)  // Save token in cookies
							this.$router.push({ path: '/' })
							this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
						})
					}
				});
			}
  }
}
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
