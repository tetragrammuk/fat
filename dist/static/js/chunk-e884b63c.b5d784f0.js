(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e884b63c"],{"03d5":function(e,t,s){"use strict";var a=s("4d2e"),i=s.n(a);i.a},"1d57":function(e,t,s){"use strict";var a=s("3c1d"),i=s.n(a);i.a},"3c1d":function(e,t,s){},"3d17":function(e,t,s){},"4d2e":function(e,t,s){},"518e":function(e,t,s){},"6bcf":function(e,t,s){"use strict";var a=s("518e"),i=s.n(a);i.a},b41d:function(e,t,s){"use strict";var a=s("3d17"),i=s.n(a);i.a},cc41:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"fillcontain"},[s("div",{staticClass:"contain",staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"flex-start"}},[s("div",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"flex-start","align-items":"flex-start"}},[s("div",{staticClass:"contain",staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"flex-start"}},[s("div",{staticClass:"contain3"},[s("el-divider",{attrs:{"content-position":"left"}},[s("h1",[s("i",{staticClass:"el-icon-chat-dot-round"}),e._v("訊息清單\n            ")])]),s("el-button",{staticClass:"primaryButton",attrs:{icon:"el-icon-s-promotion",type:"primary",round:"",size:"medium"},on:{click:e.broadcastOnclick}},[e._v("廣播推送")]),s("el-dialog",{attrs:{title:"推送分眾廣播",visible:e.broadcastDialogVisible,width:"40%"},on:{"update:visible":function(t){e.broadcastDialogVisible=t}}},[s("el-form",{ref:"form",attrs:{model:e.form,"label-width":"200px",rules:e.rules}},[s("el-form-item",{attrs:{label:"訊息腳本",prop:"row_email"}},[s("el-col",{attrs:{span:20}},[s("el-select",{attrs:{size:"medium",placeholder:"請選擇訊息"},model:{value:e.PushMsg_id,callback:function(t){e.PushMsg_id=t},expression:"PushMsg_id"}},e._l(e.broadcastTableData,function(e){return s("el-option",{key:e.msg_id,attrs:{label:e.name,value:e.msg_id}})}),1)],1)],1),s("el-divider"),s("el-form-item",{attrs:{label:"發送對象",prop:"row_phone"}},[s("el-col",{attrs:{span:20}},[s("div",[s("el-radio",{attrs:{label:"true"},model:{value:e.broadcast_radio_union,callback:function(t){e.broadcast_radio_union=t},expression:"broadcast_radio_union"}},[e._v("符合任意條件(聯集)")])],1),s("div",[s("el-radio",{attrs:{label:"false"},model:{value:e.broadcast_radio_union,callback:function(t){e.broadcast_radio_union=t},expression:"broadcast_radio_union"}},[e._v("同時滿足條件(交集)")]),s("div",{staticClass:"select_filter"},[s("div",[e._v("包含標籤:")]),s("el-select",{attrs:{multiple:"",size:"medium",placeholder:"請選擇標籤"},on:{change:e.options_change},model:{value:e.labelsForBroadcast,callback:function(t){e.labelsForBroadcast=t},expression:"labelsForBroadcast"}},e._l(e.options,function(e){return s("el-option",{key:e.label_id,attrs:{label:e.label_name,value:e.label_id}})}),1),s("div",[e._v("排除標籤:")]),s("el-select",{attrs:{multiple:"",size:"medium",placeholder:"請選擇標籤"},on:{change:e.options_change},model:{value:e.Not_labelsForBroadcast,callback:function(t){e.Not_labelsForBroadcast=t},expression:"Not_labelsForBroadcast"}},e._l(e.Not_options,function(e){return s("el-option",{key:e.label_id,attrs:{label:e.label_name,value:e.label_id}})}),1)],1)],1)])],1),s("el-form-item",{attrs:{label:"發送人數試算"}},[s("el-button",{on:{click:e.sending_number_f}},[e._v("點我試算")]),s("flip-number",{staticClass:"flip_number",attrs:{value:e.Send_people_number,speed:200}})],1),s("el-form-item",{attrs:{label:"會員總人數"}},[s("flip-number",{staticClass:"flip_number",attrs:{value:e.Total_people_number,speed:200}})],1),s("el-divider"),s("el-form-item",{attrs:{label:"發送時間",prop:"row_jointime"}},[s("div",[s("el-radio",{attrs:{label:"立即發送"},on:{change:e.broadcast_time_disabled_f},model:{value:e.broadcast_radio,callback:function(t){e.broadcast_radio=t},expression:"broadcast_radio"}},[e._v("立即發送(測試訊息 限150人)")])],1),s("div",[s("el-radio",{attrs:{label:"預約時間"},on:{change:e.broadcast_time_disabled_f},model:{value:e.broadcast_radio,callback:function(t){e.broadcast_radio=t},expression:"broadcast_radio"}},[e._v("預約時間")])],1),s("el-col",{attrs:{span:8}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{disabled:e.radio_select,type:"date",placeholder:"選擇日期","picker-options":e.pickerOptions,"value-format":"yyyy M d"},model:{value:e.broadcast_date,callback:function(t){e.broadcast_date=t},expression:"broadcast_date"}})],1),s("el-col",{attrs:{span:8}},[s("el-time-select",{staticStyle:{width:"100%"},attrs:{disabled:e.radio_select,"picker-options":{start:"00:00",step:"00:10",end:"24:00"},placeholder:"選擇時間"},model:{value:e.broadcast_time,callback:function(t){e.broadcast_time=t},expression:"broadcast_time"}})],1)],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.checkPush}},[e._v("確 定")]),s("el-button",{on:{click:function(t){e.broadcastDialogVisible=!1}}},[e._v("取 消")])],1)],1)],1)],1),s("div",{staticClass:"table_container",staticStyle:{width:"601px"}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%",cursor:"pointer"},attrs:{data:e.tableData,border:"",stripe:"","highlight-current-row":"","header-cell-class-name":"table-header-class"},on:{"row-click":e.onclick}},[s("el-table-column",{attrs:{label:"序號",width:"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{cursor:"pointer"}},[e._v(e._s(t.$index+(e.paginations.pageIndex-1)*e.paginations.pageSize+1))])]}}])}),s("el-table-column",{attrs:{property:"name",label:"訊息名稱",width:"190",align:"center"}}),s("el-table-column",{attrs:{label:"創建時間",width:"270",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("i",{staticClass:"el-icon-time"}),s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.event_time))])]}}])}),s("el-table-column",{attrs:{label:"刪除",width:"80",align:"center"}},[[s("span",{staticStyle:{cursor:"pointer"}},[s("i",{staticClass:"el-icon-delete"})])]],2)],1),s("el-row",[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"pagination"},[e.paginations.total>0?s("el-pagination",{attrs:{background:"","page-sizes":e.paginations.pageSizes,"page-size":e.paginations.pageSize,layout:e.paginations.layout,total:e.paginations.total,"current-page":e.paginations.pageIndex},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}}):e._e()],1)])],1)],1),s("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"flex-start"}},[s("el-divider",{attrs:{"content-position":"left"}},[s("h1",{staticClass:"contain2"},[s("i",{staticClass:"el-icon-timer"}),e._v("\n              排程清單\n            ")])]),s("div",{staticClass:"table_container",staticStyle:{width:"831px"}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading_Schedule,expression:"loading_Schedule"}],staticStyle:{width:"100%"},attrs:{data:e.tableScheduleData,border:"",stripe:"","highlight-current-row":"","header-cell-class-name":"table-header-class"}},[s("el-table-column",{attrs:{label:"序號",width:"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{cursor:"pointer"}},[e._v(e._s(t.$index+(e.paginations_Schedule.pageIndex-1)*e.paginations_Schedule.pageSize+1))])]}}])}),s("el-table-column",{staticStyle:{cursor:"pointer"},attrs:{property:"msg_name",label:"訊息名稱",width:"150",align:"center"}}),s("el-table-column",{attrs:{label:"集合類型",width:"90",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["false"==t.row.union?s("span",[e._v("交集")]):s("span",[e._v("聯集")])]}}])}),s("el-table-column",{attrs:{label:"受眾標籤(包含)",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.object.list_yes,function(t,a){return s("el-tag",{key:a},[e._v(e._s(t))])})}}])}),s("el-table-column",{attrs:{label:"受眾標籤(排除)",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.object.list_no,function(t,a){return s("el-tag",{key:a,attrs:{type:"danger"}},[e._v(e._s(t))])})}}])}),s("el-table-column",{attrs:{label:"排程時間",width:"210",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("div",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"center","align-items":"center"}},[s("el-tag",{attrs:{type:t.row.color}},[s("i",{staticClass:"el-icon-alarm-clock"})]),s("el-tag",{attrs:{type:t.row.color}},[e._v(e._s(t.row.timing))]),s("i",{staticClass:"el-icon-error",staticStyle:{cursor:"pointer"},on:{click:function(s){return e.cancel(t.row.task_id)}}})],1)]}}])})],1),s("el-row",[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"pagination"},[e.paginations_Schedule.total>0?s("el-pagination",{attrs:{background:"","page-sizes":e.paginations_Schedule.pageSizes,"page-size":e.paginations_Schedule.pageSize,layout:e.paginations_Schedule.layout,total:e.paginations_Schedule.total,"current-page":e.paginations_Schedule.pageIndex},on:{"current-change":e.handleCurrentChange_Schedule,"size-change":e.handleSizeChange_Schedule}}):e._e()],1)])],1)],1)],1),s("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"flex-start"}},[s("el-divider",{attrs:{"content-position":"left"}},[s("h1",{staticClass:"contain2"},[s("i",{staticClass:"el-icon-s-order"}),e._v("歷史訊息\n            ")])]),s("div",{staticClass:"table_container",staticStyle:{width:"831px"}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading_History,expression:"loading_History"}],staticStyle:{width:"100%",cursor:"pointer"},attrs:{data:e.tableHistoryData,border:"",stripe:"","highlight-current-row":"","header-cell-class-name":"table-header-class"},on:{"row-click":e.msg_sending_history_open}},[s("el-table-column",{attrs:{label:"序號",width:"60",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{cursor:"pointer"}},[e._v(e._s(t.$index+(e.paginations_History.pageIndex-1)*e.paginations_History.pageSize+1))])]}}])}),s("el-table-column",{staticStyle:{cursor:"pointer"},attrs:{property:"name",label:"訊息名稱",width:"150",align:"center"}}),s("el-table-column",{attrs:{label:"集合類型",width:"90",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["false"==t.row.union?s("span",[e._v("交集")]):s("span",[e._v("聯集")])]}}])}),s("el-table-column",{attrs:{label:"受眾標籤(包含)",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.object.list_yes,function(t,a){return s("el-tag",{key:a},[e._v(e._s(t))])})}}])}),s("el-table-column",{attrs:{label:"受眾標籤(排除)",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.object.list_no,function(t,a){return s("el-tag",{key:a,attrs:{type:"danger"}},[e._v(e._s(t))])})}}])}),s("el-table-column",{attrs:{label:"推播時間",width:"210",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("i",{staticClass:"el-icon-time"}),s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.event_time))])]}}])})],1),s("el-row",[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"pagination"},[e.paginations_History.total>0?s("el-pagination",{attrs:{background:"","page-sizes":e.paginations_History.pageSizes,"page-size":e.paginations_History.pageSize,layout:e.paginations_History.layout,total:e.paginations_History.total,"current-page":e.paginations_History.pageIndex},on:{"current-change":e.handleCurrentChange_History,"size-change":e.handleSizeChange_History}}):e._e()],1)])],1)],1)],1)]),s("div",[s("transition",{attrs:{name:"slide-fade"}},[e.show?s("div",{staticClass:"contain",staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-start","align-items":"center","margin-left":"50px"}},[s("h1",{staticClass:"contain4"},[s("i",{staticClass:"el-icon-mobile-phone"}),e._v("訊息預覽\n            ")]),s("div",{staticClass:"phone",attrs:{id:"1"}},[s("div",{staticClass:"screen"},[s("div",{staticClass:"hair",staticStyle:{display:"flex","flex-direction":"row","justify-content":"center"}},[s("div",{staticClass:"air"})]),s("el-scrollbar",[s("div",{staticStyle:{height:"530px",display:"flex","flex-direction":"column","flex-wrap":"nowrap","align-items":"flex-start"}},e._l(e.componentShowList,function(e){return s("div",{key:e.id,staticStyle:{display:"flex","justify-content":"space-between","align-items":"flex-start",padding:"10px"}},[s(e.text,{ref:"componentShowList",refInFor:!0,tag:"component",attrs:{showID:e.id}})],1)}),0)])],1)])]):e._e()])],1),s("el-dialog",{attrs:{width:"50%",title:"歷史訊息進階分析",visible:e.dialog_msg_sending_history,"close-on-click-modal":!0},on:{"update:visible":function(t){e.dialog_msg_sending_history=t}}},[s("div",{staticClass:"msg_sending_history_1"},[s("el-form",[s("el-form-item",{attrs:{label:"發送目標人數"}},[e._v("\n          "+e._s(e.send_target_number)+"\n          ")]),s("el-form-item",{attrs:{label:"發送成功人數"}},[e._v("\n          "+e._s(e.send_success_number)+"\n          ")]),s("el-form-item",{attrs:{label:"發送失敗人數"}},[e._v("\n          "+e._s(e.send_failed_number)+"\n          ")])],1),s("Pie-chart",{attrs:{strokeWidth:20,radius:110,transitionDuration:1e3,value:e.send_success_ratio},scopedSlots:e._u([{key:"footer",fn:function(){return[s("b",[e._v("發送成功率")])]},proxy:!0}])})],1),s("el-divider"),s("div",{staticClass:"msg_sending_history_1"},[s("el-form",{attrs:{"label-position":e.labelPosition,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"已讀次數"}},[e._v("\n          "+e._s(e.send_read_number)+"\n          ")])],1),s("Pie-chart",{attrs:{strokeWidth:20,radius:55,transitionDuration:1e3,value:e.send_read_ratio},scopedSlots:e._u([{key:"footer",fn:function(){return[s("b",[e._v("已讀率")])]},proxy:!0}])}),s("el-form",{attrs:{"label-position":e.labelPosition,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"點擊次數"}},[e._v("\n          "+e._s(e.send_click_number)+"\n          ")])],1),s("Pie-chart",{attrs:{strokeWidth:20,radius:55,transitionDuration:1e3,value:e.send_click_ratio},scopedSlots:e._u([{key:"footer",fn:function(){return[s("b",[e._v("互動率")])]},proxy:!0}])})],1)],1)],1)])])},i=[],n=(s("6b54"),s("28a5"),s("7413")),o=s("6d02"),l=s("8842"),r=s("985b"),c=s("c3f0"),d=s("833b"),u=s("53c8"),h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"flip-number"},[e._l(e.numbersSplitted,function(t,a){return["number"===typeof t?[s("flip-number-item",{key:a,staticClass:"loop-item",attrs:{value:t,speed:e.speed}})]:[s("div",{key:a,staticClass:"loop-item sign"},[e._v(e._s(t))])]]})],2)},p=[],g=(s("c5f6"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"flip-number-item"},[s("div",{staticClass:"flip",class:e.animationClass},[s("div",{staticClass:"digital front",class:"number"+e.frontCount}),s("div",{staticClass:"digital back",class:"number"+e.backCount})])])}),_=[],b=(s("96cf"),s("3b8d")),f={name:"FlipNumberItem",props:["value","speed"],data:function(){return{frontCount:0,backCount:this.value,animationClass:"",isFlipping:!1}},watch:{value:function(e,t){e<t?this.flipUp(e,t):e>t&&this.flipDown(e,t)}},methods:{flipDown:function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(t,s){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!(t>s)){e.next=6;break}return e.next=3,this.flipDownOne(s);case 3:s++,e.next=0;break;case 6:case"end":return e.stop()}},e,this)}));function t(t,s){return e.apply(this,arguments)}return t}(),flipUp:function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(t,s){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!(t<s)){e.next=6;break}return e.next=3,this.flipUpOne(s);case 3:s--,e.next=0;break;case 6:case"end":return e.stop()}},e,this)}));function t(t,s){return e.apply(this,arguments)}return t}(),flipDownOne:function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.isFlipping){e.next=2;break}return e.abrupt("return",!1);case 2:return this.frontCount=t,this.backCount=this.frontCount>=9?0:this.frontCount+1,this.animationClass="down go",this.isFlipping=!0,e.next=8,this.resetClass("down");case 8:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),flipUpOne:function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.isFlipping){e.next=2;break}return e.abrupt("return",!1);case 2:return this.frontCount=t,this.backCount=this.frontCount<=0?9:this.frontCount-1,this.animationClass="up go",this.isFlipping=!0,e.next=8,this.resetClass("up");case 8:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),resetClass:function(e){var t=this;return new Promise(function(s,a){setTimeout(function(){t.animationClass=e,t.isFlipping=!1,t.frontCount=t.backCount,setTimeout(function(){s()},0)},t.speed)})}}},m=f,x=(s("03d5"),s("2877")),v=Object(x["a"])(m,g,_,!1,null,"76c4dd7c",null),y=v.exports,S={name:"FlipNumber",components:{FlipNumberItem:y},props:{value:{type:String,required:!0,default:"0"},speed:{type:[Number,String],default:200}},data:function(){var e=1*this.speed;return isNaN(e)?(console.error("the prop speed is not a number"),e=200):e=e<200?200:e,{numbersSplitted:[],interval:e}},created:function(){this.splitValue()},watch:{value:function(){this.splitValue()}},methods:{splitValue:function(){if(this.numbersSplitted=[],isNaN(Number(this.value)))return console.error("the prop must be a number");for(var e=this.value.toString().split(""),t=0;t<e.length;t++){var s=e[t];isNaN(Number(s))?this.numbersSplitted.push(s):this.numbersSplitted.push(Number(s))}}}},w=S,k=(s("1d57"),Object(x["a"])(w,h,p,!1,null,"2c7df298",null)),C=k.exports,O=s("cebe"),N=s.n(O),L=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"vue-circular-progress"},[s("div",{staticClass:"circle"},[s("svg",{staticClass:"circle__svg",attrs:{width:e.circleSize,height:e.circleSize}},[s("circle",{staticClass:"circle__progress circle__progress--path",style:{"stroke-width":e.strokeWidth,stroke:e.strokeColor},attrs:{cx:e.centralP,cy:e.centralP,r:e.radius}}),s("circle",{staticClass:"circle__progress circle__progress--fill",style:e.fileStyl,attrs:{cx:e.centralP,cy:e.centralP,r:e.radius}})]),s("div",{staticClass:"percent"},[e._t("default",[s("span",{staticClass:"percent__int"},[e._v(e._s(e.int))]),s("span",{staticClass:"dot"},[e._v(".")]),s("span",{staticClass:"percent__dec"},[e._v(e._s(e.dec))]),s("span",{staticClass:"percent_sign"},[e._v("%")])])],2)]),e._t("footer")],2)},I=[],F=s("768b"),$=(s("ee1d"),{props:{strokeWidth:{type:Number,default:4},radius:{type:Number,default:38},transitionDuration:{type:Number,default:1e3},strokeColor:{type:String,default:"#0000CC"},value:{validator:function(e){return!Number.isNaN(Number(e))&&Number(e)<=100},default:"0.0"}},data:function(){return{offset:"",int:0,dec:"00"}},computed:{circumference:function(){return this.radius*Math.PI*2},fileStyl:function(){return{strokeDashoffset:this.offset,"--initialStroke":this.circumference,"--transitionDuration":"".concat(this.transitionDuration,"ms"),"stroke-width":this.strokeWidth,stroke:this.strokeColor}},circleSize:function(){return 2*(this.radius+this.strokeWidth)},centralP:function(){return this.circleSize/2}},methods:{increaseNumber:function(e,t){var s=this;if(0!=e){var a=parseInt(this.findClosestNumber(this.transitionDuration/10,e)),i=this.transitionDuration/a,n=0,o="".concat(t,"Interval");this[o]=setInterval(function(){var i=e.toString().length-a.toString().length;s[t]=0==i?n:10*n*i,n===a&&(s[t]=e,window.clearInterval(s[o])),n++},i)}},findClosestNumber:function(e,t){return t<=e?t:this.findClosestNumber(e,t/10)},countNumber:function(e){var t=this;if(this.offset="",this.initTimeoutHandler=setTimeout(function(){t.offset=t.circumference*(100-e)/100},100),!this.$slots.default){var s=e.toString().split("."),a=Object(F["a"])(s,2),i=a[0],n=a[1],o=[Number(i),Number(n)];i=o[0],n=o[1],this.increaseNumber(i,"int"),this.increaseNumber(Number.isNaN(n)?0:n,"dec")}},clearHandlers:function(){this.initTimeoutHandler&&clearTimeout(this.initTimeoutHandler),this.intInterval&&clearInterval(this.intInterval),this.decInterval&&clearInterval(this.decInterval)}},watch:{value:{handler:function(e){var t=Number(e);Number.isNaN(t)||0==t||(this.clearHandlers(),this.countNumber(e))},immediate:!0}},beforeDestroy:function(){this.clearHandlers()}}),B=$,T=(s("6bcf"),Object(x["a"])(B,L,I,!1,null,null,null)),z=T.exports,D=s("5f87"),j={data:function(){var e=function(e,t,s){return t?s():s(new Error("請輸入關鍵字，最多20字"))};return{dialog_msg_sending_history:!1,labelPosition:"top",send_click_number:13951,send_read_number:123181,send_target_number:12151,send_success_number:10511,send_failed_number:2011,send_success_ratio:90.5,send_click_ratio:70.5,send_read_ratio:80.5,Total_people_number:"0",Send_people_number:"0",radio_select:!0,broadcast_radio:"立即發送",broadcast_radio_union:"true",radio_select_filter:!0,broadcast_time:"",broadcast_date:"",pickerOptions:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}},broadcastDialogVisible:!1,broadcastTableData:[],tableData:[],tableScheduleData:[],tableHistoryData:[],PushMsg_id:"",AutoMsg_id:"",label_list:[],options:[],Not_options:[],options_origin:[],labelsForBroadcast:[],Not_labelsForBroadcast:[],loading:!0,loading_Schedule:!0,loading_History:!0,paginations:{total:0,pageIndex:1,pageSize:20,pageSizes:[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper"},paginations_Schedule:{total:0,pageIndex:1,pageSize:20,pageSizes:[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper"},paginations_History:{total:0,pageIndex:1,pageSize:20,pageSizes:[5,10,15,20],layout:"total, sizes, prev, pager, next, jumper"},APIbaseURL:"https://test-backend-dot-flow-263607.appspot.com",show:!1,componentShowList:[],flexList:[1],buttonTexts:[],messages:[],currentMsg_id:"",destroyedCnt:0,lastComLen:0,form:{keyword:""},rules:{keyword:[{validator:e,trigger:"blur"}]}}},components:{showVideo:n["a"],showImage:o["a"],showImageMsg:l["a"],showImageOnly:r["a"],showText:c["a"],showMultiFlex:d["a"],addLabel:u["a"],flipNumber:C,PieChart:z},created:function(){console.log("addlistener msgList componentHandSharkEvent"),this.$bus.$on("componentHandSharkEvent",this.comlistener),this.$bus.$on("flexHandSharkEvent",this.flexlistener),this.$bus.$on("destroyed",this.destroyedlistener)},beforeDestroy:function(){console.log("beforeDestroy msgList"),this.$bus.$off("flexHandSharkEvent",this.flexlistener),this.$bus.$off("componentHandSharkEvent",this.comlistener),this.$bus.$off("destroyed",this.destroyedlistener)},mounted:function(){this.geMsgList(),this.getHistoryMsgList(),this.getScheduleMsgList()},methods:{msg_sending_history_open:function(e,t,s){var a=this,i=Object(D["a"])("Token");N.a.post("https://test-backend-dot-flow-263607.appspot.com/advanced_history",{req_id:e.req_id},{headers:{"x-access-token":i}}).then(function(e){return a.dialog_msg_sending_history=!0,a.send_click_number=e.data.click,a.send_read_number=e.data.impression,a.send_target_number=e.data.total_target,a.send_success_number=e.data.delivered,a.send_failed_number=e.data.failed,a.send_success_ratio=Math.floor(100*e.data.rate_delivered)/100,a.send_click_ratio=Math.floor(100*e.data.rate_click)/100,a.send_read_ratio=Math.floor(100*e.data.rate_impression)/100})},cancel:function(e){var t=this;this.$confirm("確定清除此排程?").then(function(s){1==t.tableScheduleData.length&&(1==t.paginations_Schedule.pageIndex||t.paginations_Schedule.pageIndex--);var a=Object(D["a"])("Token");N()({method:"post",baseURL:t.APIbaseURL,url:"/delete_task",data:{task_id:e},headers:{"Content-Type":"application/json","x-access-token":a}}).then(function(e){200==e.status&&(t.loading_Schedule=!0,t.getScheduleMsgList(),t.$message({message:e.data.message,type:"error"==e.data.message?"error":"success"}))}),done()}).catch(function(e){})},destroyedlistener:function(e){console.log("destroyed ID "+e),this.destroyedCnt++,console.log("destroyedCnt = "+this.destroyedCnt+" lastComLen = "+this.lastComLen),this.destroyedCnt==this.lastComLen&&(this.rebuildShow(),this.destroyedCnt=0)},broadcast_time_disabled_f:function(){"立即發送"==this.broadcast_radio?this.radio_select=!0:this.radio_select=!1},comlistener:function(e){if(console.log("receive msgList componentHandSharkEvent "+e),"flex"==this.messages[e].type){if(this.flexList=[1],"carousel"==this.messages[e].contents.type){var t;for(t=1;t<this.messages[e].contents.contents.length;t++)this.flexList.push(t+1);this.$bus.$emit("specialEvent"+e,e,this.flexList)}}else"imagemap"==this.messages[e].type?this.$bus.$emit("imageMsgUrlEvent"+e,this.messages[e].baseUrl):"image"==this.messages[e].type?this.$bus.$emit("imageUrlEvent"+e,this.messages[e].originalContentUrl):"video"==this.messages[e].type?(this.$bus.$emit("videoUrlEvent"+e,this.messages[e].originalContentUrl),this.$bus.$emit("vedioPreviewUrlEvent"+e,this.messages[e].previewImageUrl)):"text"==this.messages[e].type&&this.$bus.$emit("textEvent"+e,this.messages[e].htmlStr)},flexlistener:function(e,t){if(console.log("receive msgList flexHandSharkEvent "+e+" "+t),"carousel"==this.messages[e].contents.type){for(this.$bus.$emit("imageUrlEvent"+e+"_"+(t+1),this.messages[e].contents.contents[t].hero.url),this.$bus.$emit("flexTitleEvent"+e+"_"+(t+1),this.messages[e].contents.contents[t].body.contents[0].text),this.$bus.$emit("flexTextEvent"+e+"_"+(t+1),this.messages[e].contents.contents[t].body.contents[1].text),console.log("ssssssssssss "+t),this.buttonTexts=[],s=0;s<this.messages[e].contents.contents[t].footer.contents.length;s++)this.buttonTexts.push(this.messages[e].contents.contents[t].footer.contents[s].action.label);this.$bus.$emit("showButtonsTextEvevt"+e+"_"+(t+1),this.buttonTexts)}else{var s;for(this.$bus.$emit("imageUrlEvent"+e+"_"+(t+1),this.messages[e].contents.hero.url),this.$bus.$emit("flexTitleEvent"+e+"_"+(t+1),this.messages[e].contents.body.contents[0].text),this.$bus.$emit("flexTextEvent"+e+"_"+(t+1),this.messages[e].contents.body.contents[1].text),console.log("ssssssssssss "+t),this.buttonTexts=[],s=0;s<this.messages[e].contents.footer.contents.length;s++)this.buttonTexts.push(this.messages[e].contents.footer.contents[s].action.label);this.$bus.$emit("showButtonsTextEvevt"+e+"_"+(t+1),this.buttonTexts)}},onclick:function(e,t){var s=this;(this.destroyedCnt=0,this.lastComLen=this.componentShowList.length,console.log("onclick lastComLen = "+this.lastComLen),this.messages=e.content,console.log("msgCnt "+this.messages.length),console.log(this.messages),this.currentMsg_id=e.msg_id,"刪除"!=t.label)?(this.show=!0,console.log(this.componentShowList.length),this.componentShowList.length?this.componentShowList=[]:this.rebuildShow()):this.$confirm("如自動回覆或歡迎訊息有此訊息也將一併被刪除！").then(function(t){console.log("deleteMsg "+e.msg_id),s.deleteMsg(e.msg_id),s.componentShowList=[],s.lastComLen=0,done()}).catch(function(e){})},rebuildShow:function(){var e;for(console.log("rebuildShow"),e=0;e<this.messages.length;e++)"flex"==this.messages[e].type?this.componentShowList.push({text:"showMultiFlex",id:e}):"imagemap"==this.messages[e].type?this.componentShowList.push({text:"showImageMsg",id:e}):"image"==this.messages[e].type?this.componentShowList.push({text:"showImageOnly",id:e}):"text"==this.messages[e].type?this.componentShowList.push({text:"showText",id:e}):"video"==this.messages[e].type&&this.componentShowList.push({text:"showVideo",id:e})},deleteMsg:function(e){var t=this;this.loading=!0,1==this.tableData.length&&(1==this.paginations.pageIndex||this.paginations.pageIndex--);var s=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/delete_msg",data:{msg_id:e},headers:{"Content-Type":"application/json","x-access-token":s}}).then(function(e){t.geMsgList(),console.log(e)})},geMsgList:function(){var e=this,t=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/query_msg",data:{limit:this.paginations.pageSize,page:this.paginations.pageIndex},headers:{"Content-Type":"application/json","x-access-token":t}}).then(function(t){console.log(t.data),console.log(t.data.data.length),console.log(t.data.data),e.loading=!1,e.paginations.total=t.data.total,e.tableData=t.data.data})},getHistoryMsgList:function(){var e=this,t=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/query_msg_history",data:{limit:this.paginations_History.pageSize,page:this.paginations_History.pageIndex},headers:{"Content-Type":"application/json","x-access-token":t}}).then(function(t){console.log(t.data),e.loading_History=!1,e.paginations_History.total=t.data.total,e.tableHistoryData=t.data.history})},getScheduleMsgList:function(){var e=this,t=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/query_task",data:{limit:this.paginations_Schedule.pageSize,page:this.paginations_Schedule.pageIndex},headers:{"Content-Type":"application/json","x-access-token":t}}).then(function(t){console.log(t.data),e.loading_Schedule=!1,e.paginations_Schedule.total=t.data.total,e.tableScheduleData=t.data.data;var s,a,i,n,o=new Date;for(n=0;n<e.tableScheduleData.length;n++)s=e.tableScheduleData[n].timing.split(" ")[0].split("-")[2],a=e.tableScheduleData[n].timing.split(" ")[1].split(":"),i=24*parseInt(s)*60+60*parseInt(a[0])+parseInt(a[1])-(24*o.getDate()*60+60*o.getHours()+o.getMinutes()),e.tableScheduleData[n].color=i<60?"danger":i<1440?"warning":"success"})},sending_number_f:function(){var e=this,t={union:this.broadcast_radio_union,include:{gender:[],label_id:[]},exclude:{gender:[],label_id:[]}};t.include.label_id=JSON.parse(JSON.stringify(this.labelsForBroadcast)),t.exclude.label_id=JSON.parse(JSON.stringify(this.Not_labelsForBroadcast)),"false"==this.broadcast_radio_union?(-1!=this.labelsForBroadcast.indexOf("全部")&&1==this.labelsForBroadcast.length?t.include={gender:[],label_id:[]}:(-1!=this.labelsForBroadcast.indexOf("全部")&&t.include.label_id.splice(t.include.label_id.indexOf("全部"),1),-1!=this.labelsForBroadcast.indexOf("男生")&&(t.include.gender.push("男生"),t.include.label_id.splice(t.include.label_id.indexOf("男生"),1)),-1!=this.labelsForBroadcast.indexOf("女生")&&(t.include.gender.push("女生"),t.include.label_id.splice(t.include.label_id.indexOf("女生"),1))),-1!=this.Not_labelsForBroadcast.indexOf("全部")&&1==this.Not_labelsForBroadcast.length?t.exclude={gender:[],label_id:[]}:(-1!=this.Not_labelsForBroadcast.indexOf("全部")&&t.exclude.label_id.splice(t.exclude.label_id.indexOf("全部"),1),-1!=this.Not_labelsForBroadcast.indexOf("男生")&&(t.exclude.gender.push("男生"),t.exclude.label_id.splice(t.exclude.label_id.indexOf("男生"),1)),-1!=this.Not_labelsForBroadcast.indexOf("女生")&&(t.include.gender.push("女生"),t.exclude.label_id.splice(t.exclude.label_id.indexOf("女生"),1)))):(-1!=this.labelsForBroadcast.indexOf("全部")?t.include={gender:[],label_id:[]}:(-1!=this.labelsForBroadcast.indexOf("男生")&&(t.include.gender.push("男生"),t.include.label_id.splice(t.include.label_id.indexOf("男生"),1)),-1!=this.labelsForBroadcast.indexOf("女生")&&(t.include.gender.push("女生"),t.include.label_id.splice(t.include.label_id.indexOf("女生"),1))),-1!=this.Not_labelsForBroadcast.indexOf("全部")?t.exclude={gender:[],label_id:[]}:(-1!=this.Not_labelsForBroadcast.indexOf("男生")&&(t.exclude.gender.push("男生"),t.exclude.label_id.splice(t.exclude.label_id.indexOf("男生"),1)),-1!=this.Not_labelsForBroadcast.indexOf("女生")&&(t.exclude.gender.push("女生"),t.exclude.label_id.splice(t.exclude.label_id.indexOf("女生"),1))));var s=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/people_number",data:t,headers:{"Content-Type":"application/json","x-access-token":s}}).then(function(t){console.log(t),200==t.status?(e.Send_people_number=t.data.target,e.Total_people_number=t.data.total):e.$message.error("ERROR 701")})},handleSizeChange:function(e){this.loading=!0,this.paginations.pageSize=e,this.geMsgList()},handleCurrentChange:function(e){this.loading=!0,this.paginations.pageIndex=e,this.geMsgList()},handleSizeChange_Schedule:function(e){this.loading_Schedule=!0,this.paginations_Schedule.pageSize=e,this.getScheduleMsgList()},handleCurrentChange_Schedule:function(e){this.loading_Schedule=!0,this.paginations_Schedule.pageIndex=e,this.getScheduleMsgList()},handleSizeChange_History:function(e){this.loading_History=!0,this.paginations_History.pageSize=e,this.getHistoryMsgList()},handleCurrentChange_History:function(e){this.loading_History=!0,this.paginations_History.pageIndex=e,this.getHistoryMsgList()},parentGetLeabels:function(e){this.label_list=e},arrChange:function(e,t){for(var s=0;s<t.length;s++)for(var a=0;a<e.length;a++)e[a].label_id==t[s]&&(e.splice(a,1),a-=1);return e},options_change:function(){this.Not_options=JSON.parse(JSON.stringify(this.options_origin)),this.options=JSON.parse(JSON.stringify(this.options_origin)),this.Not_options=this.arrChange(this.Not_options,this.labelsForBroadcast),console.log("NON_OPTIONS"+this.Not_options),this.options=this.arrChange(this.options,this.Not_labelsForBroadcast)},broadcastOnclick:function(){var e=this;this.broadcastDialogVisible=!0;var t=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/query_msg",data:{limit:999999,page:1},headers:{"Content-Type":"application/json","x-access-token":t}}).then(function(t){e.broadcastTableData=t.data.data}),N()({method:"post",baseURL:this.APIbaseURL,url:"/push_msg_tag",headers:{"Content-Type":"application/json","x-access-token":t}}).then(function(t){console.log(t),e.options=t.data.data,e.options.unshift({label_id:"全部",label_name:"全部"}),e.options.unshift({label_id:"男生",label_name:"男生"}),e.options.unshift({label_id:"女生",label_name:"女生"}),e.Not_options=JSON.parse(JSON.stringify(e.options)),e.options_origin=JSON.parse(JSON.stringify(e.options))})},checkPush:function(){var e=new Date,t=this.broadcast_date.split(" "),s=this.broadcast_time.split(":"),a=60*parseInt(s[0])+parseInt(s[1]);console.log(t),""==this.PushMsg_id?this.$message.error("請選擇推播訊息!!"):0==this.labelsForBroadcast.length?this.$message.error("請選擇推播對象!!"):"預約時間"!=this.broadcast_radio||""!=this.broadcast_time&&""!=this.broadcast_date?"預約時間"==this.broadcast_radio&&""!=this.broadcast_time&&""!=this.broadcast_date&&t[0]==e.getFullYear().toString()&&t[1]==(e.getMonth()+1).toString()&&t[2]==e.getDate().toString()&&a<60*e.getHours()+e.getMinutes()+30?this.$message.error("預約時間錯誤!! 僅能預約30分鐘後"):this.push(t,s):this.$message.error("請選擇預約時間!!")},push:function(e,t){var s=this;console.log("push");var a={msg_id:this.PushMsg_id,union:this.broadcast_radio_union,include:{gender:[],label_id:[]},exclude:{gender:[],label_id:[]}};if(a.include.label_id=JSON.parse(JSON.stringify(this.labelsForBroadcast)),a.exclude.label_id=JSON.parse(JSON.stringify(this.Not_labelsForBroadcast)),"false"==this.broadcast_radio_union?(-1!=this.labelsForBroadcast.indexOf("全部")&&1==this.labelsForBroadcast.length?a.include={gender:[],label_id:[]}:(-1!=this.labelsForBroadcast.indexOf("全部")&&a.include.label_id.splice(a.include.label_id.indexOf("全部"),1),-1!=this.labelsForBroadcast.indexOf("男生")&&(a.include.gender.push("男生"),a.include.label_id.splice(a.include.label_id.indexOf("男生"),1)),-1!=this.labelsForBroadcast.indexOf("女生")&&(a.include.gender.push("女生"),a.include.label_id.splice(a.include.label_id.indexOf("女生"),1))),-1!=this.Not_labelsForBroadcast.indexOf("全部")&&1==this.Not_labelsForBroadcast.length?a.exclude={gender:[],label_id:[]}:(-1!=this.Not_labelsForBroadcast.indexOf("全部")&&a.exclude.label_id.splice(a.exclude.label_id.indexOf("全部"),1),-1!=this.Not_labelsForBroadcast.indexOf("男生")&&(a.exclude.gender.push("男生"),a.exclude.label_id.splice(a.exclude.label_id.indexOf("男生"),1)),-1!=this.Not_labelsForBroadcast.indexOf("女生")&&(a.include.gender.push("女生"),a.exclude.label_id.splice(a.exclude.label_id.indexOf("女生"),1)))):(-1!=this.labelsForBroadcast.indexOf("全部")?a.include={gender:[],label_id:[]}:(-1!=this.labelsForBroadcast.indexOf("男生")&&(a.include.gender.push("男生"),a.include.label_id.splice(a.include.label_id.indexOf("男生"),1)),-1!=this.labelsForBroadcast.indexOf("女生")&&(a.include.gender.push("女生"),a.include.label_id.splice(a.include.label_id.indexOf("女生"),1))),-1!=this.Not_labelsForBroadcast.indexOf("全部")?a.exclude={gender:[],label_id:[]}:(-1!=this.Not_labelsForBroadcast.indexOf("男生")&&(a.exclude.gender.push("男生"),a.exclude.label_id.splice(a.exclude.label_id.indexOf("男生"),1)),-1!=this.Not_labelsForBroadcast.indexOf("女生")&&(a.exclude.gender.push("女生"),a.exclude.label_id.splice(a.exclude.label_id.indexOf("女生"),1)))),"預約時間"==this.broadcast_radio){a.year=parseInt(e[0]),a.month=parseInt(e[1]),a.day=parseInt(e[2]),a.hour=parseInt(t[0]),a.minutes=parseInt(t[1]),a.second=0,console.log(a);var i=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/create_task",data:a,headers:{"Content-Type":"application/json","x-access-token":i}}).then(function(e){console.log(e),200==e.status?(s.loading_Schedule=!0,s.getScheduleMsgList(),s.$message({message:e.data.message,type:"error"==e.data.message?"error":"success"})):s.$message.error("ERROR 701")})}else{console.log(a);var n=Object(D["a"])("Token");N()({method:"post",baseURL:this.APIbaseURL,url:"/push_msg",data:a,headers:{"Content-Type":"application/json","x-access-token":n}}).then(function(e){console.log(e),200==e.status?s.$message({message:e.data.message,type:"error"==e.data.message?"error":"success"}):s.$message.error("ERROR 702")})}}}},H=j,M=(s("b41d"),Object(x["a"])(H,a,i,!1,null,"d2fae99a",null));t["default"]=M.exports}}]);