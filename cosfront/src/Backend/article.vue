<template>
  <div id="Article">
  <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="普通文章" name="first">
       <el-row>
        <el-col :span="16" :offset="4">
            <el-form ref="form" :model="form" label-width="160px">

            <el-form-item label="文章标题">
              <el-col :span="12">
                  <el-input v-model="form.name"
                  placeholder="选择输入文章标题"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="文章所属页面">
              <el-col :span="12">
                <el-select v-model="form.region" placeholder="请选择文章所属页面" style="float:left;">
                  <el-option label="首页" value="首页"></el-option>
                  <el-option label="关于我们" value="关于我们"></el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="文章创建时间">
              <el-col :span="12">
                <el-date-picker
                  v-model="form.date"
                  type="datetime"
                  placeholder="选择日期时间" style="float:left;">
                </el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="文章副标题">
              <el-col :span="12">
                <el-input v-model="form.sname"
                placeholder="请输入文章副标题"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="文章内容">
              <el-col :span="18">
              <el-input type="textarea" 
                v-model="form.content"
                :autosize="{ minRows: 4, maxRows: 8}"  
                 placeholder="请输入内容"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="文章图片">
              <el-col :span="12">
                <el-upload
                  class="upload-demo"
                  drag
                  action="http://localhost:5000/RichArticle/AddPicList"
                  :before-remove="beforeArticleRemove"
                  :on-success="uploadArticleSuccess"
                  :on-error="uploadArticleError"
                   multiple>
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
    <el-tab-pane label="图文文章" name="second">
        <el-row>
        <el-col :span="16" :offset="4">
            <el-form ref="form" :model="forms" label-width="160px">
                  <el-form-item label="图文所属页面">
                    <el-col :span="12">
                      <el-select v-model="forms.regions" placeholder="请选择文章所属页面" style="float:left;">
                        <el-option label="首页" value="首页"></el-option>
                        <el-option label="关于我们" value="关于我们"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <el-col :span="12">
                      <el-date-picker
                        v-model="forms.dates"
                        type="datetime"
                        placeholder="选择日期时间" style="float:left;">
                      </el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="图文内容">
                    <el-col :span="18">
                    <el-input type="textarea"
                      :autosize="{ minRows: 4, maxRows: 8}"  
                      v-model="forms.descs" 
                      placeholder="请输入图文内容"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="图文图片">
                    <el-col :span="12">
                      <el-upload
                          class="upload-demo"
                          drag
                          action="http://localhost:5000/RichArticle/AddPicList"
                          :on-success="uploadRichSuccess"
                          :on-error="uploadRichError"
                          :before-remove="beforeRichRemove"
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
  name: 'Article',
  data () {
    return {
        activeName: 'first',
        form: {
          name: '',
          region: '',
          date: '',
          sname:'',
          content: ''
        },
        forms: {
          regions: '',
          dates: '',
          descs: ''
        },
        filelist:[],
        fileLists:[]
      }
    },
    methods: {
       //普通文章图片上传成功
      uploadArticleSuccess(response, file, fileList) {
        this.filelist.push("http://localhost:5000/images/"+file.name);
        this.$message({message:'图片上传成功',type:'success'})
      },
      //普通文章图片上传失败
      uploadArticleError(err, file, fileList) {
         this.$message.error('图片上传失败')
      },
      //富文章图片上传成功
      uploadRichSuccess(response,file,fileList){
        this.fileLists.push("http://localhost:5000/images/"+file.name);
        this.$message({message:'图片上传成功',type:'success'})
      },
      //富文章图片上传失败
      uploadRichError(err,file,fileList){
           this.$message.error('图片上传失败')
      },
      onSubmit () {
        var vm=this;
        var parmas = new URLSearchParams();
        parmas.append('ArticleName',this.form.name);
        parmas.append('type',this.form.region)
        parmas.append('ArticleSideName',this.form.sname)
        parmas.append('ArticleContext',this.form.content)
        parmas.append('ArticleCreateDate',this.form.date)
        parmas.append('ArticleUpdateDate',this.form.date)
        parmas.append('ArticleImgUrl',this.filelist)
        parmas.append('UserName',sessionStorage.getItem('userName'))
        vm.$axios.post('http://localhost:5000/Articles/AddArticle', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.$message({message:response.data.message,type:'success'});
          }
        })
        .catch(function (error) {
          vm.$message.error(error);
        });
      },
      onSubmits () {
        var vm=this;
        var parmas = new URLSearchParams();
        parmas.append('type',this.form.regions)
        parmas.append('ArticleContext',this.forms.descs)
        parmas.append('ArticleCreateDate',this.forms.dates)
        parmas.append('ArticleUpdateDate',this.forms.dates)
        parmas.append('ArticleImgUrl',this.fileLists.join(";"))
        parmas.append('UserName',sessionStorage.getItem('userName'))
        vm.$axios.post('http://localhost:5000/RichArticle/AddRichArticle', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.$message({message:response.data.message,type:'success'});
          }
        })
        .catch(function (error) {
          vm.$message.error(error);
        });
      },
       beforeArticleRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeRichRemove(file,fileLists){
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
}
</script>
