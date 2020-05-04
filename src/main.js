import Vue from 'vue'
import eventBus from './eventBus'
import App from './App'
import router from './router'
import store from './store/'
import locale from 'element-ui/lib/locale/lang/zh-TW';
Vue.use(ElementUI, { size: 'mini', locale});
import 'vuetify/dist/vuetify.min.css';
import 'font-awesome/css/font-awesome.css';
import Vuetify from 'vuetify';
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'

import 'vue-blu/dist/css/vue-blu.min.css'
Vue.use(ElementUI, { size: 'mini'});
Vue.use(Vuetify);
Vue.config.productionTip = false
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' // iconSvg

import '@/permission' // permission control

import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";
// 分享功能集合
import { shareConfig } from './utils/share';
Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;



new Vue({
  data(){
    return{
      bus:eventBus
    }
  },
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
