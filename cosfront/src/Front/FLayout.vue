<template>
  <div class="flayout">
   <el-container >
    <el-header>
        <el-menu :default-active="activeIndex"  mode="horizontal">
          <el-menu-item><span class="alink" style="font-weight:bolder;font-size:x-large;">RUILANYA</span></el-menu-item>
          <el-menu-item index="3" class="hr"><router-link to="/FMail" class="alink">联系</router-link></el-menu-item>
          <el-menu-item index="2" class="hr"><router-link to="/About" class="alink" >关于我们</router-link></el-menu-item>
          <el-menu-item index="1" class="hr"><router-link to="/Home"  class="alink">首页</router-link></el-menu-item>
        </el-menu>
    </el-header>
    <el-main>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 Detail！ -->
      </router-view>
    </el-main>
    <el-footer>
        <el-row >
            <el-col :span="8"> 电话: 0512-52567270 </el-col>
            <el-col :span="8"><router-link to="/Home" class="alink">首页</router-link></el-col>
            <el-col :span="8"><p><a href="http://www.beian.miit.gov.cn/" class="alink">苏ICP备19010107号-2</a></p></el-col>
        </el-row>
        <el-row >
            <el-col :span="8"><a href="mailto:2386087177@qq.com" class="alink">contact 2386087177@qq.com</a></el-col>
            <el-col :span="8"><router-link to="/About" class="alink">关于</router-link></el-col>
            <el-col :span="8"><router-link to="/Login" class="alink">苏州瑞兰雅化妆品有限公司</router-link> All rights</el-col>
        </el-row>
        <el-row >
            <el-col :span="8"><p>常熟市黄河路777号佳和广场</p></el-col>
            <el-col :span="8"><p><router-link to="/FMail" class="alink">邮箱</router-link></p></el-col>
            <el-col :span="8"><p>Copyright &copy; 2019.</p></el-col>
        </el-row>
    </el-footer>
  </el-container>
  </div>
</template>

<script>
export default{
  name: 'flayout',
  data() {
      return {
          activeIndex: '1',
      };
    },
  created:function() {
      
  },
  methods: {
    }
}
</script>
<style>
  html, body, .flayout, .el-container{
    height:100%;
   }
  .el-header{
    background-color: #000;
    text-align: center;
    height: 100px !important;
  }
  .el-header  .hr{
      float:right;
  }
  .el-menu{
    background-color:#000;
  }
  .el-menu-item{
    font-weight: 700;
    height:100px !important;
    line-height:100px !important;
  }
  .el-main {
    background-color: #fff;
    text-align: center;
    line-height: auto;
    padding-top:10px;
  }
  .el-footer{
    background-color: #000;
    color:#fff;
    text-align: center;
    height:100px !important;
    position: relative;
  }
  .alink{
    text-decoration:none;
    color:#fff !important;
  }
  p {
    text-align:center;
  }
</style>
