<template>
  <div id="Login" v-loading.fullscreen.lock="fullscreenLoading">
       <div class="content">
            <div class="title">后台管理系统登录</div>
            <el-card class="box-card wp" @keyup.enter.native="submitForm('loginform')">
                <el-form  :model="loginform" :rules="rules" ref="loginform" >
                    <el-form-item  prop="userName" class="mt10 right">
                        <el-col :span="5" >
                           <span style="font-size:large;" class="mt10 right">用户名：</span>
                       </el-col>
                         <el-col :offset="1" :span="16">
                        <el-input v-model="loginform.userName" placeholder="请填写用户名"></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item  prop="passWord" class="mt10 right">
                        <el-col :span="5">
                            <span style="font-size:large;" class="mt10 right">密码：</span>
                       </el-col>
                         <el-col :offset="1" :span="16">
                        <el-input v-model="loginform.passWord" placeholder="请填写密码" show-password></el-input>
                         </el-col>
                    </el-form-item>
                    <el-form-item class="center mt10">
                       <el-button type="primary" class="wp" @click="submitForm('loginform')">登录</el-button>
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

        #Login {
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
  name: 'Login',
  data () {
    return{
        fullscreenLoading: false,
        loginform:{
            userName:'',
            passWord:''
        },
        rules: {
            userName: [
                { required: true, message: '请输入登录名', trigger: 'blur' },
                { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
            ],
            passWord: [
                {  required: true, message: '请输入密码', trigger: 'blur'  },
                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ]
        }
       };
    },
     created:function(){
    },
  methods: {
            submitForm(formName) {
                var vm=this;
                vm.fullscreenLoading = true;
                vm.$refs[formName].validate((valid) => {
                if (valid) {
                   var parmas = new URLSearchParams();
                        parmas.append("username",vm.loginform.userName);
                        parmas.append("password",vm.loginform.passWord);
                        vm.$axios.post('http://localhost:5000/Account/Login',parmas,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
                        .then(function(response){
                            vm.fullscreenLoading=false;
                            if(response.data.status==1){
                                sessionStorage.setItem('userName', response.data.data);
                                vm.$message({
                                    message:"登录成功",
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
                            vm.$message.error('系统错误，请重试!');
                        });
                } else {
                    vm.fullscreenLoading = false;
                }
                });
           }
    }
}
</script>
