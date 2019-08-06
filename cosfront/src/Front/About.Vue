<template>
  <div id="About" >
      <el-row :gutter="20">
          <el-col v-for="item in articleItems" v-bind:key="item['id']"  :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <router-link :to="{name:'Detail',params:{aName:item['articleName'],asideName:item['articleSideName'],aContent:item['articleContext'],aImg:item['articleImgUrl'],atime:item['articleCreateDate']}}" style="text-decoration:none">
              <div class="itemblock">
                 <h3>{{item['articleName']}}</h3>
                 <span>{{item['articleSideName']}}</span>
                 <p>{{item['articleContext'].substring(0,80)+"..."}}</p>
              </div>
            </router-link>
          </el-col>
       </el-row>
        <el-row :gutter="20">
           <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
               <div class="rich">
                  <el-image
                       style="height:600px;"
                      :src="richArticle['articleImgUrl']"
                      :fit="fill">
                  </el-image>
              </div>
           </el-col>
           <el-col  :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
               <el-row  v-for="desc in desclists" v-bind:key="desc['id']" >
                   <el-col :span="8" class="list">
                        <el-image
                            style="height:190px;"
                            :src="desc['articleImgUrl']"
                            :fit="fill">
                        </el-image>
                   </el-col>
                   <el-col :span="16" class="list">
                      {{desc['articleContext']}}
                   </el-col>
               </el-row>
           </el-col>
       </el-row>
  </div>
</template>
<style>
   #About{
     height:100%;
   }
  .itemblock{
      height:200px;
      margin-top:5px;
      border-style:outset;
      border-color:#fff;
  }
  .rich{
      height:600px;
      margin-top:5px;
      border-style:outset;
  }
  .list{
      height:190px;
      margin-top:10px;
      border-style:outset;
  }
</style>
<script>
export default {
  name: 'About',
   data () {
       return{
         richArticle:[],
         articleItems:[],
         desclists:[]
         
       };
    },
     created:function(){
      var vm=this;
      vm.$axios.all([this.GetArticleList(), this.GetRich(),this.GetRichArticleList()])
      .then(vm.$axios.spread(function (a,b,c) {
         vm.articleItems=a.data.data;
         vm.richArticle=b.data.data;
         vm.desclists=c.data.data;
      })).catch(function (error){
        vm.$message.error(a.data.message);
      });
    },
    methods: {
       GetArticleList(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('type','关于我们');
          return  vm.$axios.post('http://localhost:5000/Articles/GetArticleList', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
      },
       GetRich(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('type','关于我们');
          return  vm.$axios.post('http://localhost:5000/Articles/GetRichArticle', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
      },
      GetRichArticleList(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('type','关于我们');
          return vm.$axios.post('http://localhost:5000/RichArticle/GetRichList', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
      },
    }
}
</script>
