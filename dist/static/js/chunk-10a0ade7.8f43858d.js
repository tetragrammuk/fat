(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10a0ade7"],{"2b77":function(t,e,s){},"73fb":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login_page"},[s("transition",{attrs:{name:"form-fade",mode:"in-out"}},[s("section",{staticClass:"form_contianer"},[s("div",{staticClass:"titleArea"},[s("img",{staticClass:"logo",staticStyle:{width:"20vw",height:"18vw"},attrs:{src:t.logo,alt:"Fl@w"}}),s("div",{staticClass:"title"},[t._v("Line串流管理平台")])]),s("el-form",{ref:"loginForm",staticClass:"loginForm",attrs:{model:t.loginForm,rules:t.rules}},[s("el-form-item",{staticClass:"login-item",attrs:{prop:"username"}},[s("span",{staticClass:"loginTips"},[s("icon-svg",{attrs:{"icon-class":"iconuser"}})],1),s("el-input",{staticClass:"area",attrs:{type:"text",placeholder:"帳號"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitForm("loginForm")}},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),s("el-form-item",{staticClass:"login-item",attrs:{prop:"password"}},[s("span",{staticClass:"loginTips"},[s("icon-svg",{attrs:{"icon-class":"iconLock"}})],1),s("el-input",{staticClass:"area",attrs:{type:"password",placeholder:"密碼"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitForm("loginForm")}},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}})],1),s("el-form-item",[s("el-button",{staticClass:"submit_btn",attrs:{type:"primary"},on:{click:function(e){return t.submitForm("loginForm")}}},[t._v("Log in")])],1)],1)],1)])],1)},n=[],a=s("4ffd"),i=s.n(a),r=(s("c24f"),s("5f87")),l=s("cebe"),c=s.n(l),m={data:function(){return{logo:i.a,loginForm:{username:"",password:""},rules:{username:[{required:!0,message:"用戶名沒填捏",trigger:"blur"},{min:2,max:8,message:"2 到 8 位數",trigger:"blur"}],password:[{required:!0,message:"你沒輸入啦",trigger:"blur"}]}}},mounted:function(){},methods:{loginByWechat:function(){},showMessage:function(t,e){this.$message({type:t,message:e})},submitForm:function(t){var e=this;console.log(t),this.$refs[t].validate(function(t){if(t){var s=e.loginForm;c.a.post("https://test-backend-dot-flow-263607.appspot.com/login",{loginForm:s}).then(function(t){t.data.token&&(console.log(t.data.token),Object(r["c"])("Token",t.data.token),e.$router.push({path:"/"}),e.$store.dispatch("initLeftMenu")),t.data.message&&(e.$message.error(t.data.message),console.log("token missing"))})}})}}},u=m,g=(s("b507"),s("2877")),p=Object(g["a"])(u,o,n,!1,null,"6f2848c8",null);e["default"]=p.exports},b507:function(t,e,s){"use strict";var o=s("2b77"),n=s.n(o);n.a}}]);