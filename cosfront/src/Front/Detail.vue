<template>
    <div id='Detail'>
      <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :offset="8">
             <h3>{{Name}}</h3>
          </el-col>
      </el-row>
      <el-row>
         <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :offset="8">
              <h4>{{SideName}}</h4>
         </el-col>
      </el-row>
      <el-row>
          <el-col :xs="22" :sm="20" :md="20" :lg="16" :xl="16" :offset="4">
                <el-image
                    :src="Img"
                    :fit="fill">
                </el-image>
                <p>              
                    {{Content}}
                </p>
                <span style="float:right;">上传时间：{{Time}}</span>
          </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
 name:'Detail',
 data(){
     return{
         Name:'',
         SideName:'',
         Content:'',
         Img:'',
         Time:''
     };   
 },
 created:function(){
     this.Name=this.$route.params.aName;
     this.SideName=this.$route.params.asideName;
     this.Content=this.$route.params.aContent;
     this.Img=this.$route.params.aImg;
     this.Time=this.$route.params.atime;
 },
 methods: {

 }
}
</script>

