(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-990f1a56"],{3846:function(t,e,s){s("9e1e")&&"g"!=/./g.flags&&s("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:s("0bfb")})},"62a1":function(t,e,s){},"6b54":function(t,e,s){"use strict";s("3846");var a=s("cb7c"),i=s("0bfb"),o=s("9e1e"),n="toString",l=/./[n],c=function(t){s("2aba")(RegExp.prototype,n,t,!0)};s("79e5")(function(){return"/a/b"!=l.call({source:"a",flags:"b"})})?c(function(){var t=a(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)}):l.name!=n&&c(function(){return l.call(this)})},"8c15":function(t,e,s){"use strict";var a=s("62a1"),i=s.n(a);i.a},a9a6:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"fillcontain"},[s("div",{staticClass:"contain",staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"flex-start"}},[s("div",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"flex-start","align-items":"flex-start"}},[s("div",{staticClass:"contain",staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"flex-start"}},[s("div",{staticClass:"contain3"},[s("el-divider",{attrs:{"content-position":"left"}},[s("h1",[s("i",{staticClass:"el-icon-chat-dot-round"}),t._v("訊息清單\n            ")])]),s("el-button",{staticClass:"primaryButton",attrs:{type:"primary",size:"medium",round:"",icon:"el-icon-share"},on:{click:t.autoReplyOnclick}},[t._v("自動回覆")]),s("el-dialog",{attrs:{title:"設定自動回覆",visible:t.autoReplyDialogVisible,width:"25%","before-close":t.handleClose},on:{"update:visible":function(e){t.autoReplyDialogVisible=e}}},[s("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"space-between","align-items":"flex-start"}},[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"150px",rules:t.rules}},[s("el-form-item",{attrs:{label:"訊息腳本"}},[s("el-col",{attrs:{span:20}},[s("el-select",{attrs:{size:"medium",placeholder:"請選擇訊息"},model:{value:t.AutoMsg_id,callback:function(e){t.AutoMsg_id=e},expression:"AutoMsg_id"}},t._l(t.autoReplyTableData,function(t){return s("el-option",{key:t.msg_id,attrs:{label:t.name,value:t.msg_id}})}),1)],1)],1),s("el-form-item",{attrs:{label:"關鍵字",prop:"keyword"}},[s("el-col",{attrs:{span:20}},[s("el-input",{attrs:{disabled:t.welcome_radio,placeholder:"請輸入關鍵字",maxlength:"20","show-word-limit":""},model:{value:t.form.keyword,callback:function(e){t.$set(t.form,"keyword",e)},expression:"form.keyword"}})],1)],1),s("el-form-item",{attrs:{label:""}},[s("add-label",{on:{transferLabels:t.parentGetLeabels}})],1)],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.autoReplyDialogVisible=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.checkReply}},[t._v("確 定")])],1)])],1),s("div",{staticClass:"table_container",staticStyle:{width:"800px"}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%",cursor:"pointer"},attrs:{data:t.tableData,border:"",stripe:"","highlight-current-row":"","header-cell-class-name":"table-header-class"},on:{"row-click":t.onclick}},[s("el-table-column",{attrs:{label:"序號",width:"60",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticStyle:{cursor:"pointer"}},[t._v(t._s(e.$index+(t.paginations.pageIndex-1)*t.paginations.pageSize+1))])]}}])}),s("el-table-column",{staticStyle:{cursor:"pointer"},attrs:{label:"訊息名稱",width:"428",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"此訊息為歡迎訊息",placement:"left"}},[t.welcome_msg==e.row.msg_id?s("i",{staticClass:"el-icon-s-home",staticStyle:{"margin-right":"5px"}}):t._e()]),s("span",{staticStyle:{"margin-left":"0"}},[t._v(t._s(e.row.name))])]}}])}),s("el-table-column",{attrs:{label:"創建時間",width:"230",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("i",{staticClass:"el-icon-time"}),s("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.event_time))])]}}])}),s("el-table-column",{attrs:{label:"刪除",width:"80",align:"center"}},[[s("span",{staticStyle:{cursor:"pointer"}},[s("i",{staticClass:"el-icon-delete"})])]],2)],1),s("el-row",[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"pagination"},[t.paginations.total>0?s("el-pagination",{attrs:{background:"","page-sizes":t.paginations.pageSizes,"page-size":t.paginations.pageSize,layout:t.paginations.layout,total:t.paginations.total,"current-page":t.paginations.pageIndex},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}}):t._e()],1)])],1)],1),s("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"flex-start"}},[s("el-divider",{attrs:{"content-position":"left"}},[s("h1",{staticClass:"contain2"},[s("i",{staticClass:"el-icon-setting"}),t._v("歷史設定\n            ")])]),s("div",{staticClass:"table_container",staticStyle:{width:"800px"}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingAuto,expression:"loadingAuto"}],staticStyle:{width:"100%",cursor:"pointer"},attrs:{data:t.tableAutoData,border:"",stripe:"","highlight-current-row":"","header-cell-class-name":"table-header-class"},on:{"row-click":t.onclickAuto}},[s("el-table-column",{attrs:{label:"序號",width:"60",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticStyle:{cursor:"pointer"}},[t._v(t._s(e.$index+(t.paginations_Auto.pageIndex-1)*t.paginations_Auto.pageSize+1))])]}}])}),s("el-table-column",{staticStyle:{cursor:"pointer"},attrs:{property:"msg_name",label:"訊息名稱",width:"198",align:"center"}}),s("el-table-column",{attrs:{property:"keyword",label:"關鍵字",width:"150",align:"center"}}),s("el-table-column",{attrs:{label:"標籤",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.label_list,function(e,a){return s("el-tag",{key:a},[t._v(t._s(e))])})}}])}),s("el-table-column",{attrs:{label:"創建時間",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("i",{staticClass:"el-icon-time"}),s("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.event_time))])]}}])}),s("el-table-column",{attrs:{label:"刪除",width:"60",align:"center"}},[[s("span",{staticStyle:{cursor:"pointer"}},[s("i",{staticClass:"el-icon-delete"})])]],2)],1),s("el-row",[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"pagination"},[t.paginations_Auto.total>0?s("el-pagination",{attrs:{background:"","page-sizes":t.paginations_Auto.pageSizes,"page-size":t.paginations_Auto.pageSize,layout:t.paginations_Auto.layout,total:t.paginations_Auto.total,"current-page":t.paginations_Auto.pageIndex},on:{"current-change":t.handleCurrentChange_Auto,"size-change":t.handleSizeChange_Auto}}):t._e()],1)])],1)],1)],1)]),s("div",{staticStyle:{"margin-left":"150px"}},[s("transition",{attrs:{name:"slide-fade"}},[t.show?s("div",{staticClass:"contain",staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"center"}},[s("h1",{staticClass:"contain4"},[s("i",{staticClass:"el-icon-mobile"}),t._v("訊息預覽\n            ")]),s("div",{staticClass:"phone",attrs:{id:"1"}},[s("div",{staticClass:"screen"},[s("div",{staticClass:"hair",staticStyle:{display:"flex","flex-direction":"row","justify-content":"center"}},[s("div",{staticClass:"air"})]),s("el-scrollbar",[s("div",{staticStyle:{height:"530px",display:"flex","flex-direction":"column","flex-wrap":"nowrap","align-items":"flex-start"}},t._l(t.componentShowList,function(t){return s("div",{key:t.id,staticStyle:{display:"flex","justify-content":"space-between","align-items":"flex-start",padding:"10px"}},[s(t.text,{ref:"componentShowList",refInFor:!0,tag:"component",attrs:{showID:t.id}})],1)}),0)])],1)])]):t._e()])],1)])])])},i=[],o=s("7413"),n=s("6d02"),l=s("8842"),c=s("985b"),r=s("c3f0"),g=s("833b"),h=s("53c8"),d=s("cebe"),u=s.n(d),p=s("5f87"),m={data:function(){var t=this,e=function(e,s,a){return s||0!=t.welcome_radio?a():a(new Error("請輸入關鍵字，最多20字"))};return{welcome_msg:"",welcome_radio:!1,autoReplyDialogVisible:!1,autoReplyTableData:[],AutoMsg_id:"",label_list:[],tableData:[],tableAutoData:[],loading:!0,loadingAuto:!0,paginations:{total:0,pageIndex:1,pageSize:20,pageSizes:[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper"},paginations_Auto:{total:0,pageIndex:1,pageSize:20,pageSizes:[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper"},APIbaseURL:"https://test-backend-dot-flow-263607.appspot.com",show:!1,componentShowList:[],flexList:[1],buttonTexts:[],messages:[],currentMsg_id:"",destroyedCnt:0,lastComLen:0,form:{keyword:""},rules:{keyword:[{validator:e,trigger:"blur"}]}}},components:{showVideo:o["a"],showImage:n["a"],showImageMsg:l["a"],showImageOnly:c["a"],showText:r["a"],showMultiFlex:g["a"],addLabel:h["a"]},created:function(){console.log("addlistener autoList componentHandSharkEvent"),this.$bus.$on("componentHandSharkEvent",this.comlistener),this.$bus.$on("flexHandSharkEvent",this.flexlistener),this.$bus.$on("destroyed",this.destroyedlistener)},beforeDestroy:function(){console.log("beforeDestroy autoList"),this.$bus.$off("flexHandSharkEvent",this.flexlistener),this.$bus.$off("componentHandSharkEvent",this.comlistener),this.$bus.$off("destroyed",this.destroyedlistener)},mounted:function(){this.getMsgList(),this.getAutoList()},methods:{autoReplyOnclick:function(){var t=this;this.autoReplyDialogVisible=!0;var e=Object(p["a"])("Token");u()({method:"post",baseURL:this.APIbaseURL,url:"/query_msg",data:{limit:999999,page:1},headers:{"Content-Type":"application/json","x-access-token":e}}).then(function(e){t.autoReplyTableData=e.data.data})},welcome_radio_f:function(){this.$refs.form.resetFields()},destroyedlistener:function(t){console.log("destroyed ID "+t),this.destroyedCnt++,console.log("destroyedCnt = "+this.destroyedCnt+" lastComLen = "+this.lastComLen),this.destroyedCnt==this.lastComLen&&(this.rebuildShow(),this.destroyedCnt=0)},comlistener:function(t){if(console.log("receive autoList componentHandSharkEvent "+t),"flex"==this.messages[t].type){if(this.flexList=[1],"carousel"==this.messages[t].contents.type){var e;for(e=1;e<this.messages[t].contents.contents.length;e++)this.flexList.push(e+1);this.$bus.$emit("specialEvent"+t,t,this.flexList)}}else if("imagemap"==this.messages[t].type){var s=this.messages[t].baseUrl+"/"+this.messages[t].baseSize.height;this.$bus.$emit("imageMsgUrlEvent"+t,s)}else"image"==this.messages[t].type?this.$bus.$emit("imageUrlEvent"+t,this.messages[t].originalContentUrl):"video"==this.messages[t].type?(this.$bus.$emit("videoUrlEvent"+t,this.messages[t].originalContentUrl),this.$bus.$emit("vedioPreviewUrlEvent"+t,this.messages[t].previewImageUrl)):"text"==this.messages[t].type&&this.$bus.$emit("textEvent"+t,this.messages[t].htmlStr)},flexlistener:function(t,e){if(console.log("receive autoList flexHandSharkEvent "+t+" "+e),"carousel"==this.messages[t].contents.type){for(this.$bus.$emit("imageUrlEvent"+t+"_"+(e+1),this.messages[t].contents.contents[e].hero.url),this.$bus.$emit("flexTitleEvent"+t+"_"+(e+1),this.messages[t].contents.contents[e].body.contents[0].text),this.$bus.$emit("flexTextEvent"+t+"_"+(e+1),this.messages[t].contents.contents[e].body.contents[1].text),console.log("ssssssssssss "+e),this.buttonTexts=[],s=0;s<this.messages[t].contents.contents[e].footer.contents.length;s++)this.buttonTexts.push(this.messages[t].contents.contents[e].footer.contents[s].action.label);this.$bus.$emit("showButtonsTextEvevt"+t+"_"+(e+1),this.buttonTexts)}else{var s;for(this.$bus.$emit("imageUrlEvent"+t+"_"+(e+1),this.messages[t].contents.hero.url),this.$bus.$emit("flexTitleEvent"+t+"_"+(e+1),this.messages[t].contents.body.contents[0].text),this.$bus.$emit("flexTextEvent"+t+"_"+(e+1),this.messages[t].contents.body.contents[1].text),console.log("ssssssssssss "+e),this.buttonTexts=[],s=0;s<this.messages[t].contents.footer.contents.length;s++)this.buttonTexts.push(this.messages[t].contents.footer.contents[s].action.label);this.$bus.$emit("showButtonsTextEvevt"+t+"_"+(e+1),this.buttonTexts)}},onclickAuto:function(t,e){(this.destroyedCnt=0,this.lastComLen=this.componentShowList.length,console.log(e.label),console.log(t),this.messages=t.content,console.log("msgCnt "+this.messages.length),console.log(this.messages),this.currentMsg_id=t.msg_id,"刪除"!=e.label)?(this.show=!0,console.log(this.componentShowList.length),this.componentShowList.length?this.componentShowList=[]:this.rebuildShow()):(console.log("deleteAutoReply "+t.reply_id),this.deleteAuto(t.reply_id),this.componentShowList=[],this.lastComLen=0)},onclick:function(t,e){var s=this;(this.destroyedCnt=0,this.lastComLen=this.componentShowList.length,console.log(e.label),console.log(t),this.messages=t.content,console.log("msgCnt "+this.messages.length),console.log(this.messages),this.currentMsg_id=t.msg_id,"刪除"!=e.label)?(this.show=!0,console.log(this.componentShowList.length),this.componentShowList.length?this.componentShowList=[]:this.rebuildShow()):this.$confirm("如自動回覆或歡迎訊息有此訊息也將一併被刪除！").then(function(e){console.log("deleteMsg "+t.msg_id),s.deleteMsg(t.msg_id),s.componentShowList=[],s.lastComLen=0,done()}).catch(function(t){})},rebuildShow:function(){var t;for(console.log("rebuildShow"),t=0;t<this.messages.length;t++)"flex"==this.messages[t].type?this.componentShowList.push({text:"showMultiFlex",id:t}):"imagemap"==this.messages[t].type?this.componentShowList.push({text:"showImageMsg",id:t}):"image"==this.messages[t].type?this.componentShowList.push({text:"showImageOnly",id:t}):"text"==this.messages[t].type?this.componentShowList.push({text:"showText",id:t}):"video"==this.messages[t].type&&this.componentShowList.push({text:"showVideo",id:t})},deleteAuto:function(t){var e=this;this.loadingAuto=!0;var s=Object(p["a"])("Token");1==this.tableData.length&&(1==this.paginations_Auto.pageIndex||this.paginations_Auto.pageIndex--),u()({method:"post",baseURL:this.APIbaseURL,url:"/delete_auto",data:{reply_id:t},headers:{"Content-Type":"application/json","x-access-token":s}}).then(function(t){e.getAutoList(),console.log(t)})},deleteMsg:function(t){var e=this;this.loading=!0;var s=Object(p["a"])("Token");1==this.tableData.length&&(1==this.paginations.pageIndex||this.paginations.pageIndex--),u()({method:"post",baseURL:this.APIbaseURL,url:"/delete_msg",data:{msg_id:t},headers:{"Content-Type":"application/json","x-access-token":s}}).then(function(t){e.getMsgList(),console.log(t)})},getAutoList:function(){var t=this,e=Object(p["a"])("Token");u()({method:"post",baseURL:this.APIbaseURL,url:"/query_auto",data:{limit:this.paginations_Auto.pageSize,page:this.paginations_Auto.pageIndex},headers:{"Content-Type":"application/json","x-access-token":e}}).then(function(e){console.log(e.data.data.length),console.log(e.data.data),t.loadingAuto=!1,t.paginations_Auto.total=e.data.total,t.tableAutoData=e.data.data})},getMsgList:function(){var t=this,e=Object(p["a"])("Token");u()({method:"post",baseURL:this.APIbaseURL,url:"/query_msg",data:{limit:this.paginations.pageSize,page:this.paginations.pageIndex},headers:{"Content-Type":"application/json","x-access-token":e}}).then(function(e){if(t.loading=!1,t.paginations.total=e.data.total,t.tableData=e.data.data,t.welcome_msg=e.data.welcome,t.welcome_msg){var s,a;for(s=0;s<t.tableData.length;s++)if(t.tableData[s].msg_id==t.welcome_msg){a=s;break}var i=t.tableData.splice(a,1);t.tableData.unshift(i[0])}})},handleSizeChange:function(t){this.loading=!0,this.paginations.pageSize=t,this.getMsgList()},handleCurrentChange:function(t){this.loading=!0,this.paginations.pageIndex=t,this.getMsgList()},handleSizeChange_Auto:function(t){this.loadingAuto=!0,this.paginations_Auto.pageSize=t,this.getAutoList()},handleCurrentChange_Auto:function(t){this.loadingAuto=!0,this.paginations_Auto.pageIndex=t,this.getAutoList()},handleClose:function(t){this.$confirm("設定並未儲存").then(function(e){t()}).catch(function(t){})},parentGetLeabels:function(t){this.label_list=t},checkReply:function(){var t=this;this.$refs["form"].validate(function(e){return e?(console.log("success"),t.setAutoReply(),t.autoReplyDialogVisible=!1,!0):(t.$message({message:"關鍵字不得為空!!",type:"warning"}),console.log("form fail"),!1)})},setAutoReply:function(){var t=this;console.log("post set auto");var e={keyword:this.form.keyword,msg_id:this.AutoMsg_id,label_list:this.label_list};console.log(e);var s=Object(p["a"])("Token");u()({method:"post",baseURL:this.APIbaseURL,url:"/auto_reply",data:e,headers:{"Content-Type":"application/json","x-access-token":s}}).then(function(e){console.log(e),t.welcome_radio?(t.loading=!0,t.getMsgList()):(t.loadingAuto=!0,t.getAutoList()),"upload completed"==e.data.message?t.$message({message:"Upload completed !",type:"success"}):"keyword has been exist!"==e.data.message?t.$message({message:"Keyword has been existed !",type:"warning"}):t.$message.error("Fail !")})}}},f=m,b=(s("8c15"),s("2877")),y=Object(b["a"])(f,a,i,!1,null,"acd4c27c",null);e["default"]=y.exports}}]);