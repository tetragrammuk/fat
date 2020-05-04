<template>
   <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
        <div class="menu_page_top rflex">
            <img :class='["logo",{"closeLogo":!sidebar.opened}]' :src="logo" alt="Fl@W" >
            <span class='title' v-show="sidebar.opened"><i>Admin</i></span>
        </div>
        <div class="menu_page_bottom is-scroll-left">
            <el-menu 
                mode="vertical"
                theme="dark" 
                :show-timeout="200"
                :default-active="$route.path" 
                :collapse="isCollapse"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{width:sidebar.width+'px'}"
                >
                    <template v-for="(item,index) in permission_routers">
                        <!--表示 有一级菜单-->
                        <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                            <el-menu-item class="dropItem" 
                                :index="item.path+'/'+item.children[0].path"
                                >
                                <i class="icon" :class="item.meta.icon"></i>
                                <!-- <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" /> -->
                                <span v-if="item.meta.title" slot="title">{{ $t(`${item.name}`)}}</span> 
                            </el-menu-item>
                        </router-link>

                        <!--表示 有二级或者多级菜单 -->
                        <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"  :index="item.path" :key="index">
                            <template slot="title">
                                <i class="icon" :class="item.meta.icon"></i>
                                <!-- <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" /> -->
                                <span v-if="item.meta.title" slot="title">{{ $t(`${item.name}`)}}</span>
                            </template>
                            <!--直接定位到子路由上，子路由也可以实现导航功能-->
                            <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                                <el-menu-item 
                                    v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                                    :index="getIindex(citem,item,cindex)">
                                    <span slot="title"> {{ $t(`${citem.name}`)}}</span>
                                </el-menu-item> 
                            </router-link>
                        </el-submenu>
                    </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mUtils from "@/utils/mUtils";
import logoImg from "@/assets/img/logo.png";


export default {
  name: "left-Menu",
  data() {
    return {
       menuObj:{
         bgColor:'#fff',
         textColor:'#0B0C0E',
         activeTextColor:'#4A5BF2',
       },
       logo:logoImg
    };
  },
  computed:{
      ...mapGetters([
        'permission_routers',
        'isCollapse',
        'sidebar',
        'menuIndex'
      ]),
  },
  created(){
  },
  mounted(){
  },
  methods: {
    getIindex(citem,item,cindex){
      return (citem.meta.titleList)?item.path+'/'+citem.path+'/'+citem.meta.titleList[0].path:item.path+'/'+citem.path;
    }
  }
};
</script>


<style lang="less" scoped>
  @left-bgColor:#2f4f4f;  // 左侧菜单背景颜色;
  @icon-link:#FF6C60;
    .menu_left{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
    }
    .menu_page_top{
        background: #21232B;
        width:100%;
        height: 60px;
        align-items: center;
        justify-content: space-around;
        // text-transform: uppercase;
        box-sizing: border-box;
        //box-shadow:0px 2px 50px 0px rgba(230,224,224,0.5);
        .logo {
            // margin-left:5px;
            height: 50px;
            width: 60px;
            vertical-align: middle;
            display: inline-block;
        }
        .closeLogo{
            width:30px;
            height:30px;
        }
        .title{
            margin-right:30px;
            font-size: 20px;
            i{
                color:#f0f8ff;
            }
        }
    }
  .menu_page_bottom {
      width:100%;
      overflow-y: hidden;
      overflow-x: hidden;
      flex:1;
      
      z-index: 10;
      box-shadow: 0.2px 0.2px 3px 0.1px ;
  }
.icon{
    font-size: 24px;
    color:#363636;
    margin: 5px;
    margin-bottom: 10px;
    margin-left:15px;
}
  .menu_page_bottom /deep/.el-menu .dropItem{
  }
  .menu_page_bottom /deep/.el-menu /deep/ .dropItem /deep/.svg-icon {
      margin-left:15px;
  }
  .el-submenu .svg-icon{
      margin-left:15px;
  }
</style>
