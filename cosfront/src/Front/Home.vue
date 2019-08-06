<template>
  <div id="Home">
       <el-row>
           <el-col :span="24">
               <div class="block">
                    <el-carousel height="600px" >
                        <el-carousel-item v-for="items in scrollPicList" v-bind:key="items['id']" >
                            <h3 class="small">
                                <el-image
                                    :src="items['imgUrl']"
                                    :fit="fill">
                                </el-image>
                            </h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
           </el-col>
       </el-row>
       <el-row :gutter="20">
          <el-col v-for="item in articleItems" v-bind:key="item" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <router-link  :to="{name:'Detail',params:{aName:item['articleName'],asideName:item['articleSideName'],aContent:item['articleContext'],aImg:item['articleImgUrl'],atime:item['articleCreateDate']}}" style="text-decoration:none">
                <div class="itemblock">
                    <h3>{{item['articleName']}}</h3>
                    <span>{{item['articleSideName']}}</span>
                    <p>{{item['articleContext'].substring(0,90)+"..."}}</p>
                </div>
              </router-link>
          </el-col>
       </el-row>
       <el-row :gutter="20">
           <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
               <div class="rich">
                    <el-image
                         style="height:450px;"
                        :src="richArticle['articleImgUrl']"
                        :fit="fill">
                    </el-image>
              </div>
           </el-col>
           <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
               <el-row  v-for="desc in desclists" v-bind:key="desc['id']" >
                   <el-col :span="8" class="list">
                        <el-image
                            style="height:130px;"
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
.block{
      background-color:#fff;
  }
.small {
     width:100%;
  }
  .itemblock{
      height:150px;
      margin-top:5px;
      border-style:outset;
      border-color:#fff;
  }
  .rich{
      height:450px;
      margin-top:5px;
      border-style:outset;
  }
  .list{
      height:140px;
      margin-top:5px;
      border-style:outset;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
<script>
export default {
  name: 'Home',
   data () {
       return{
           scrollPicList:[],
           articleItems:[],
           richArticle:[],
           desclists:[],
       };
    },
     created:function(){
        var vm=this;
        vm.$axios.all([vm.GetSrcList(), vm.GetArticleList(),vm.GetRich(),vm.GetRichArticleList()])
        .then(vm.$axios.spread(function (a,b,c,d) {
          vm.scrollPicList=a.data.data;
          vm.articleItems=b.data.data;
          vm.richArticle=c.data.data;
          vm.desclists=d.data.data;
        })).catch(function (error){
        vm.$message.error(a.data.message);
      });         
    },
    methods: {
        GetSrcList(){
         var vm=this;
         return  vm.$axios.post('http://localhost:5000/ScrollPic/GetPics',{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
      },
       GetArticleList(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('type','首页');
          return vm.$axios.post('http://localhost:5000/Articles/GetArticleList', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
      },
       GetRich(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('type','首页');
          return  vm.$axios.post('http://localhost:5000/Articles/GetRichArticle', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})

      },
      GetRichArticleList(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('type','首页');
          return vm.$axios.post('http://localhost:5000/RichArticle/GetRichList', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
      },
    }
}
</script>
