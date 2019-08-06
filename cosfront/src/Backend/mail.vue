<template>
  <div id="mail">
 <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="邮件列表" name="first">
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
                    prop="submitDate"
                    label="邮件日期"
                    sortable
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="邮件人姓名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    label="邮件人邮箱"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="邮件人电话"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="infos"
                    label="邮件人信息">
                  </el-table-column>
                  <el-table-column label="操作"
                   width="120">
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
  name: 'mail',
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
     this.GetMailList();
    },
    methods: {
      handleClick (tab,event) {
        //console.log(tab, event);
      },
      handleSizeChange(val){
        this.PageSize=val;
        this.GetMailList();
      },
      handleCurrent(val){
        this.CurrentPage=val;
        this.GetMailList();
      },
      handleDelete(index, row) {
         var vm=this;
         var parmas = new URLSearchParams();
         parmas.append("id",row.id);
         vm.$axios.post('http://localhost:5000/Mail/DeleteMessage',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            vm.$message(response.data.message);
            vm.$router.go(0);
          }
        })
        .catch(function (error) {
           vm.$message.error(response.data.message);
        });
      },
      GetMailList(){
         var vm=this;
         var parmas = new URLSearchParams();
         parmas.append('Index',this.aCurrentPage)
         parmas.append('Size',this.aPageSize)
         vm.$axios.post('http://localhost:5000/Mail/ShowMessageList',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
        .then(function (response) {
          if(response.data.status==1){
            console.log(response.data);
            vm.Total=response.data.total;
            vm.tableData=response.data.data;
          }
        })
        .catch(function (error) {
           vm.$message.error(response.data.message);
        });
      }
    }
}
</script>
