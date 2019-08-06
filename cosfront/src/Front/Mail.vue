<template>
  <div id="FMail" >
        <el-row>
            <el-col :xs="20" :sm="20" :md="6" :lg="8" :xl="8" :offset="2">
                <el-row>
                   <el-col style="text-align:left;">
                        <h4>地址</h4>
                        <span>中国 江苏省 常熟市</span>
                        <span>邮箱：215500 </span>
                        <ul style="list-style:none">
                            <li>固定电话 :0512-52567270</li>
                            <li>手机 :18994407668</li>
                            <li>手机 :15962317511</li>
                            <li><a href="mailto:2386087177@qq.com" style="text-decoration:none;color:#000">contact 2386087177@qq.com</a></li>
                        </ul>
                   </el-col>
                </el-row>
            </el-col>
            <el-col :xs="20" :sm="20" :md="16" :lg="12" :xl="12" >
                <el-form :model="ruleForm"  :rules="rules" :label-position="left" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="姓名" prop="Name">
                               <el-input type="Name" v-model="ruleForm.Name" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮箱" prop="Email">
                                <el-input type="Email" v-model="ruleForm.Email" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="电话" prop="Phone">
                                <el-input  v-model.number="ruleForm.Phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="信息" prop="Infos">
                                <el-input type="textarea" v-model.number="ruleForm.Infos"  :rows="5"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                         </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20" :offset="2">
                <template>
                  <baidu-map class="bm-view" ak="LEC1NI7PdI4wk7bHSVvnZ2y8qSdzuhGC&s=1" center="常熟" :scroll-wheel-zoom="true">
                        <bm-marker :position="{lng:120.7458381868 , lat: 31.6816030704}"  animation="BMAP_ANIMATION_BOUNCE">
                          <bm-label content="苏州瑞兰雅" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                        </bm-marker>
                         <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                         <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                         <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                 </baidu-map>
                </template>
            </el-col>
        </el-row>
  </div>
</template>
<style>
.bm-view {
  width: 100%;
  height: 600px;
}
</style>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmLabel from 'vue-baidu-map/components/overlays/Label'
export default {
  name: 'FMail',
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmGeolocation,
    BmMarker,
    BmLabel
  },
   data () {
       return{
        ruleForm: {
          Name: '',
          Email: '',
          Phone: '',
          Infos: ''
        },
        rules: {
          Name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          Phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {type: 'number', message: '请输入正确手机号', trigger: 'blur'}
          ],
          Email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email' , message: '请输入正确邮箱', trigger: 'blur' }
          ],
          Infos: [
              { required: true, message: '请输入信息', trigger: 'blur' }
          ]
        }
       };
    },
    methods: {
        submitForm:function(){
            var vm=this;
            var parmas = new URLSearchParams();
            parmas.append('Name',this.ruleForm.Name);
            parmas.append('Email',this.ruleForm.Email);
            parmas.append('Phone',this.ruleForm.Phone);
            parmas.append('Infos',this.ruleForm.Infos);
            vm.$axios.post('http://localhost:5000/Mail/AddMessage', parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
            .then(function (response) {
            if(response.data.status==1){
                vm.$message({message:response.data.message,type:'success'});
            }
            })
            .catch(function (error) {
            vm.$message.error(response.data.message);
            });
        }
    }
}
</script>
