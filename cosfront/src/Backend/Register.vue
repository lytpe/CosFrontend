<template>
  <div id="Register" v-loading.fullscreen.lock="fullscreenLoading">
       <div class="content">
            <div class="title">用户注册</div>
            <el-card class="box-card wp" @keyup.enter.native="submitForm('registerform')">
                <el-form  :model="registerform" :rules="rules" ref="registerform" >
                    <el-form-item  prop="userName" class="mt10 right">
                        <el-col :span="7" >
                           <span style="font-size:large;" class="mt10 right">用户名：</span>
                       </el-col>
                         <el-col :offset="1" :span="16">
                        <el-input v-model="registerform.userName" placeholder="请填写用户名"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item  prop="passWord" class="mt10 right">
                        <el-col :span="7">
                            <span style="font-size:large;" class="mt10 right">密码：</span>
                       </el-col>
                         <el-col :offset="1" :span="16">
                        <el-input v-model="registerform.passWord" placeholder="请填写密码" show-password></el-input>
                         </el-col>
                    </el-form-item>
                      <el-form-item prop="checkpassWord" class="mt10 right" >
                        <el-col :span="7">
                            <span style="font-size:large;" class="mt10 right">确认密码：</span>
                       </el-col>
                         <el-col :offset="1" :span="16">
                        <el-input type="password" v-model="registerform.checkpassWord" placeholder="请填写密码" autocomplete="off"></el-input>
                         </el-col>
                      </el-form-item>
                    <el-form-item class="center mt10">
                       <el-button type="primary" class="wp" @click="submitForm('registerform')">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
  </div>
</template>
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        .hp {
            height: 100%;
        }

        .wp {
            width: 100%;
        }

        .right {
            text-align: right;
        }

        .mt10 {
            margin-top: 10px;
        }

        .center {
            text-align: center;
        }

        #Register {
            width: 100%;
            height: 100%;
            background: url(../images/login.jpg)  fixed center;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .content {
            width: 460px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .title {
            font-size: 28px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 40px;
        }

        .mt10 {
            margin-top: 10px;
        }
    </style>
<script>
export default {
  name: 'Register',
   data () {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerform.passWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
       return{
            fullscreenLoading: false,
            registerform:{
                userName:'',
                passWord:'',
                checkpassWord:''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                passWord: [
                    {  required: true, message: '请输入密码', trigger: 'blur'  },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                checkpassWord:[
                    {validator: validatePass , trigger: 'blur'}
                ]
            }
       };
    },
    methods: {
        //账号密码为 tpe Ting#123
            submitForm(formName) {
                var vm=this;
                vm.fullscreenLoading = true;
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        var parmas = new URLSearchParams();
                        parmas.append("username",vm.registerform.userName);
                        parmas.append("password",vm.registerform.passWord);
                        parmas.append("confirmpassword",vm.registerform.checkpassWord);
                        vm.$axios.post('http://localhost:5000/Account/Register',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
                        .then(function(response){
                            vm.fullscreenLoading=false;
                            if(response.data.status==1){
                                sessionStorage.setItem('userName', response.data.data);
                                vm.$message({
                                    message:"注册成功",
                                    type:'success'
                                });
                                 vm.$router.push({
                                    name:'Article'
                                });
                            }else{
                                vm.$message.error(response.data.message);
                            }
                        }).catch(function(error){
                            vm.fullscreenLoading=false;
                            vm.$message.error('系统错误，请重试！');
                        });
                    } else {
                        vm.fullscreenLoading = false;
                    }
                });
           }
     }
}
</script>
