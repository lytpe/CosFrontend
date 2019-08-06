<template>
  <div id="articleList">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="普通文章列表" name="first">
       <el-row>
        <el-col :span="22" :offset="1">
            <el-table
              :data="tableData"
              border
              stripe
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="id"
                label="Id"
                v-if="false">
              </el-table-column>
              <el-table-column
                prop="articleCreateDate"
                label="日期"
                sortable
                width="100">
              </el-table-column>
              <el-table-column
                prop="articleName"
                label="文章标题"
                width="120">
              </el-table-column>
              <el-table-column
                prop="articleSideName"
                label="文章副标题"
                width="200">
              </el-table-column>
              <el-table-column
                prop="articleContext"
                label="文章内容">
              </el-table-column>
              <el-table-column
                prop="articleImgUrl"
                label="文章图片"
                width="100">
                 <template   slot-scope="scopes">  
                    <el-image
                      :src="scopes.row.articleImgUrl"
                      >
                    </el-image>          
                 </template>     
              </el-table-column>
              <el-table-column
                prop="type"
                label="所属区域"
                width="100"
                :filters='[{ text: "首页", value: "首页" }, { text: "关于我们", value: "关于我们" }]'
                :filter-method="filterTag">
              </el-table-column>
              <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="14">
          <el-pagination
             background
             layout="prev, pager, next, sizes, total" 
             :total="aTotal"
             @size-change="ahandleSizeChange"
             @current-change="ahandleCurrent"
             :current-page="aCurrentPage"
             :page-sizes="[10, 20, 30, 40]" :page-size="aPageSize">
          </el-pagination>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="图文文章列表" name="second">
      <el-row>
        <el-col :span="20" :offset="2">
            <el-table
              :data="tableDatas"
              border
              stripe
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="id"
                label="Id"
                width="55">
              </el-table-column>
              <el-table-column
                prop="articleCreateDate"
                label="日期"
                width="180"
                sortable>
              </el-table-column>
              <el-table-column
                prop="articleContext"
                label="图文内容"
                width="550">
              </el-table-column>
              <el-table-column
                prop="articleImgUrl"
                label="图文图片"
                width="100">
                  <template   slot-scope="scope">  
                    <el-image
                      :src="scope.row.articleImgUrl"
                      >
                    </el-image>          
                 </template>     
              </el-table-column>
              <el-table-column
                prop="type"
                label="所属区域"
                width="100"
                :filters="[{ text: '首页', value: '首页' }, { text: '关于我们', value: '关于我们' }]"
                :filter-method="filterTag">
              </el-table-column>
              <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handlePaEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handlePaDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="14">
            <el-pagination
             background
             layout="prev, pager, next, sizes, total" 
             :total="rTotal"
             @size-change="rhandleSizeChange"
             @current-change="rhandleCurrent"
             :current-page="rCurrentPage"
             :page-sizes="[10, 20, 30, 40]" :page-size="aPageSize">
          </el-pagination>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>

    <el-dialog title="修改文章" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="编号" :label-width="formLabelWidth">
            <el-input v-model="form.Id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="文章标题" :label-width="formLabelWidth">
            <el-input v-model="form.tname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章副标题" :label-width="formLabelWidth">
            <el-input v-model="form.tsname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章内容" :label-width="formLabelWidth">
            <el-input v-model="form.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章区域" :label-width="formLabelWidth">
            <el-select v-model="form.area" placeholder="请选择活动区域">
              <el-option label="首页" value="首页"></el-option>
              <el-option label="关于我们" value="关于我们"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditArticle()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改图文" :visible.sync="dialogFormVisible2">
      <el-form :model="paform">
        <el-form-item label="编号" :label-width="formLabelWidth">
            <el-input v-model="paform.Id" autocomplete="off" disabled></el-input>
          </el-form-item>
        <el-form-item label="图文内容" :label-width="formLabelWidth">
          <el-input v-model="paform.pacontent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图文区域" :label-width="formLabelWidth">
          <el-select v-model="paform.paarea" placeholder="请选择活动区域">
            <el-option label="首页" value="首页"></el-option>
            <el-option label="关于我们" value="关于我们"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="EditRichArticle()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'articleList',
  data() {
      return {
        activeName: 'first',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogFormVisible2:false,
        tableData:[],
        tableDatas: [],
        form: {
          Id:'',
          tname: '',
          tsname: '',
          content:'',
          area:''
        },
        paform:{
          Id:'',
          pacontent:'',
          paarea:''
        },
        multipleSelection: [],
        //两个列表分别的分页变量
        aTotal:20,
        aCurrentPage:1,
        aPageSize:10,

        rTotal:20,
        rCurrentPage:1,
        rPageSize:10,
      }
    },
  created:function(){
     this.GetArticleList();
     this.GetRichArticleList();
  },
  methods: {
    ahandleSizeChange(val){
      this.aPageSize = val;
      this.GetArticleList();
    },
    ahandleCurrent(val){
       this.aCurrentPage = val;
       this.GetArticleList();
    },
    rhandleSizeChange(val){
       this.rPageSize=val;
       this.GetRichArticleList();
    },
    rhandleCurrent(val){
      this.rCurrentPage=val;
      this.GetRichArticleList();
    },
      GetArticleList(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('Index',this.aCurrentPage)
          parmas.append('Size',this.aPageSize)
         vm.$axios.post('http://localhost:5000/Articles/GetArticlesList', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.aTotal=response.data.total;
            vm.tableData=response.data.data;
          }
        })
        .catch(function (error) {
           vm.$message(response.data.message);
        });
      },
      GetRichArticleList(){
          var vm=this;
          var parmas = new URLSearchParams();
          parmas.append('Index',this.rCurrentPage)
          parmas.append('Size',this.rPageSize)
         vm.$axios.get('http://localhost:5000/RichArticle/GetRichArticleList',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.rTotal=response.data.total;
            vm.tableDatas=response.data.data;
          }
        })
        .catch(function (error) {
           vm.$message(response.data.message);
        });

      },


      handleClick(tab, event) {
        //console.log(tab, event);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.form.Id=row.id;
        this.form.tname=row.articleName;
        this.form.tsname=row.articleSideName;
        this.form.content=row.articleContext;
        this.form.area=row.type;
      },
      handleDelete(index, row) {
        //console.log(index, row);
      },
      EditArticle(){
        this.dialogFormVisible = false;
        var vm=this;
        var date=new Date();
        var parmas = new URLSearchParams();
        parmas.append("Id",vm.form.Id);
        parmas.append("ArticleName",vm.form.tname);
        parmas.append("ArticleSideName",vm.form.tsname);
        parmas.append('type',vm.form.area)
        parmas.append('ArticleContext',vm.form.content)
        parmas.append('ArticleUpdateDate',date.toLocaleString())
        parmas.append('UserName',"1")
        vm.$axios.post('http://localhost:5000/Articles/UpdateArticle', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.$message(response.data.message);
          }
          vm.$router.go(0)
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      handlePaEdit(index, row) {
        this.dialogFormVisible2=true;
        this.paform.Id=row.id;
        this.paform.pacontent=row.articleContext;
        this.paform.paarea=row.type;
      },
      EditRichArticle(){
        this.dialogFormVisible2 = false
        var vm=this;
        var date=new Date();
        var parmas = new URLSearchParams();
        parmas.append("Id",vm.paform.Id);
        parmas.append('type',vm.paform.paarea)
        parmas.append('ArticleContext',vm.paform.pacontent)
        parmas.append('ArticleUpdateDate',date.toLocaleString())
        parmas.append('UserName',"1")
        vm.$axios.post('http://localhost:5000/RichArticle/UpdateRichArticle', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.$message(response.data.message);
          }
          vm.$router.go(0);
          vm.activeName="second";
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      handlePaDelete(index, row) {
        //console.log(index, row);
      },
      filterTag(value, row) {
        return row.area === value;
      },
    }
}
</script>
