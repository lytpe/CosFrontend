<template>
  <div id="scroll">
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="轮播图添加" name="first">
     <el-row>
        <el-col :span="14" :offset="5">
            <el-form ref="form" :model="form" label-width="160px">
            <el-form-item label="轮播图名称">
              <el-col :span="11">
              <el-input v-model="form.name"
              placeholder="请输入轮播图名称"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="添加时间">
              <el-col :span="11">
                <el-date-picker
                  v-model="form.date"
                  type="datetime"
                  placeholder="选择日期时间" style="float:left;">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="轮播图上传">
              <el-col :span="12">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="http://localhost:5000/ScrollPic/AddPicture"
                      :limit="1"
                      :on-success="uploadSuccess"
                      :on-error="uploadError"
                      :before-remove="beforeRemove">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
               </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-tab-pane>
      <el-tab-pane label="多轮播图添加" name="second">
     <el-row>
        <el-col :span="14" :offset="5">
            <el-form ref="forms" :model="forms" label-width="160px">
            <el-form-item label="轮播图列表名">
              <el-col :span="11">
              <el-input v-model="forms.names"
              placeholder="请输入轮播图名称"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="列表添加时间">
              <el-col :span="11">
                <el-date-picker
                  v-model="forms.dates"
                  type="datetime"
                  placeholder="选择日期时间" style="float:left;">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="轮播图列表上传">
              <el-col :span="12">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="http://localhost:5000/ScrollPic/AddPicture"
                      :on-success="uploadListSuccess"
                      :on-error="uploadListError"
                      :before-remove="beforeListRemove"
                       multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
               </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmits">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'addscroll',
   data () {
    return {
        activeName: 'first',
        form: {
          name: '',
          date: ''
        },
        forms:{
          names: '',
          dates: ''
        },
        fileList:[],
        fileName:[],
        fileLists:[],
      }
    },
    methods: {
      handleClick (tab,event) {
       // console.log(tab, event);
      },
       //单轮播图上传
      uploadSuccess(response,file,fileList){
        this.fileList.push("http://localhost:5000/images/"+file.name);
        this.$message({message:'图片上传成功',type:'success'})
      },
      //单轮播图上传失败
      uploadError(err,file,fileList){
           this.$message.error('图片上传失败')
      },
      beforeRemove(file,fileLists){
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      onSubmit () {
        var vm=this;
        var parmas = new URLSearchParams();
        parmas.append('PicName',this.form.name);
        parmas.append('ImgUrl',this.fileList)
        parmas.append('ImgSubmitDate',this.form.date)
        parmas.append('UserName',sessionStorage.getItem('userName'))
        vm.$axios.post('http://localhost:5000/ScrollPic/AddPic', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.$message({message:response.data.message,type:'success'});
          }
        })
        .catch(function (error) {
          vm.$message.error(error);
        });
      },
        //轮播图列表上传成功
      uploadListSuccess(response,file,fileList){
        this.fileLists.push("http://localhost:5000/images/"+file.name);
        this.$message({message:'图片上传成功',type:'success'})
      },
      //轮播图列表上传失败
      uploadListError(err,file,fileList){
           this.$message.error('图片上传失败')
      },
      beforeListRemove(file,fileLists){
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      onSubmits () {
        var vm=this;
         vm.fileName=vm.forms.names.split(" ");
         var list=new Array();
         for(var i=0;i<this.fileName.length;i++){
            var obj=new Object();
            obj.PicName=this.fileName[i];
            obj.ImgUrl=this.fileLists[i];
            obj.ImgSubmitDate=this.forms.dates;
            obj.UserName=sessionStorage.getItem('userName');
            list.push(obj);
         }
         var parmas = new URLSearchParams();
         parmas.append('data',JSON.stringify(list))
        vm.$axios.post('http://localhost:5000/ScrollPic/AddPicList',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.$message({message:response.data.message,type:'success'});
          }
        })
        .catch(function (error) {
          vm.$message.error(error);
        });
      }
    }
}
</script>
