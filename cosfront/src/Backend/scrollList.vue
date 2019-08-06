<template>
  <div id="srcollList">
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="轮播图列表" name="first">
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
                   label="id"
                   v-if="false">
                  </el-table-column>
                  <el-table-column
                    prop="imgSubmitDate"
                    label="日期"
                    sortable
                    >
                  </el-table-column>
                  <el-table-column
                    prop="picName"
                    label="轮播图名称"
                    sortable
                    >
                  </el-table-column>
                  <el-table-column
                    prop="imgUrl"
                    label="轮播图图片">
                    <template   slot-scope="scope">  
                        <el-image
                          :src="scope.row.imgUrl"
                          >
                        </el-image>          
                    </template>  
                  </el-table-column>
                  <el-table-column
                    prop="userName"
                    label="上传用户"
                    >
                  </el-table-column>
                  <el-table-column label="操作">
                  <template slot-scope="scope">
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
                :total="Total"
                @size-change="handleSizeChange"
                @current-change="handleCurrent"
                :current-page="CurrentPage"
                :page-sizes="[10, 20, 30, 40]" :page-size="PageSize">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
     </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'srcollList',
   data () {
    return {
        activeName: 'first',
        tableData: [],
        Total:20,
        CurrentPage:1,
        PageSize:10,
      }
    },
  created:function(){
     this.GetSrcList();
  },
    methods: {
      handleClick (tab,event) {
        //console.log(tab, event);
      },
      handleSizeChange(val){
        this.PageSize=val;
        this.GetSrcList();
      },
      handleCurrent(val){
        this.CurrentPage=val;
        this.GetSrcList();
      },
      GetSrcList(){
         var vm=this;
         var parmas = new URLSearchParams();
         parmas.append('Index',this.aCurrentPage)
         parmas.append('Size',this.aPageSize)
         vm.$axios.post('http://localhost:5000/ScrollPic/GetPics',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.Total=response.data.total;
            vm.tableData=response.data.data;
          }
        })
        .catch(function (error) {
           vm.$message.error(response.data.message);
        });
      },
      handleDelete(index,row){
        var vm=this;
        var parmas = new URLSearchParams();
        parmas.append("id",row.id);
         vm.$axios.post('http://localhost:5000/ScrollPic/DeletePic',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
           vm.$router.go(0);
          }
        })
        .catch(function (error) {
           vm.$message.error(response.data.message);
        });

      }
    }
}
</script>
