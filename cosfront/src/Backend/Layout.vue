<template>
<el-container>
  <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"   background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item style="font-weight:bolder;font-size:x-large;">RUILANYA</el-menu-item>
                <el-submenu  class="fr" index="1">
                  <template slot="title" >欢迎登陆： {{userName}}</template>
                  <el-menu-item index="2-1"><router-link to="/Register" class="rlink" >注册用户</router-link></el-menu-item>
                  <el-menu-item index="2-2"><button @click="logout()"> 退出登录</button></el-menu-item>
                </el-submenu>
         </el-menu>
  </el-header>
  <el-container>
    <el-aside >
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>文章</span>
              </template>
                <el-menu-item index="1-1"><router-link to="/article" class="rlink" >文章添加</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link to="/articleList" class="rlink" >文章展示和修改</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="2" >
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">轮播图</span>
                </template>
                <el-menu-item index="2-1"><router-link to="/addscroll" class="rlink" >轮播图添加</router-link></el-menu-item>
                <el-menu-item index="2-2"><router-link to="/scrollList" class="rlink" >轮播图展示和修改</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span slot="title">官网邮件</span>
                </template>
                <el-menu-item index="3-1"><router-link to="/mail" class="rlink" >邮件列表</router-link></el-menu-item>
            </el-submenu>

          </el-menu>
    </el-aside>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default{
  name: 'App',
  data() {
      return {
        activeIndex: '1',
        userName:'',
      };
    },
  created:function() {
      this.userName=sessionStorage.getItem('userName');
  },
  methods: {
      logout() {
          var vm=this;
          vm.$axios.get('http://localhost:5000/Account/Logout')
          .then(function(response){
              vm.fullscreenLoading=false;
              if(response.data.status==1){
                  vm.$router.push({
                      name:'Home'
                  });
              }else{
                  vm.$message.error(response.data.message);
              }
          }).catch(function(error){
              vm.fullscreenLoading=false;
              vm.$message.error('系统错误，请重试!');
        })
    }
  }
}
</script>

<style>
.el-container{
    position: relative;
    width: 100%;
}
.el-header{
    padding:0;
    z-index: 1000;
}
 .el-main {
    padding-top:80px;
    background-color: #fff;
  }
.el-menu{
    background-color:#000;
  }
.el-menu .fr{
    float:right;

}
.el-submenu__title{
    margin-top:10px;
    font-weight:bold;
    font-size:large;
  }
.el-menu-item {
    font-weight: 600;
    height:90px !important;
    line-height:90px !important;
  }
.el-aside{
    padding-top: 80px;
    width:200px;
    background-color:#545c64;
}
.rlink{
    text-decoration: none;
    color:#fff;
}
 
</style>
