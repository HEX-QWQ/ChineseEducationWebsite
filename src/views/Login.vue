<template>
  <div class="login">
    <el-form ref="form" label-width="70px" :model="form" :rules="rules" class="login-container" :inline="true">
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" prop="username" >
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default{
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {   required:true,message:'请输入用户名',trigger:'blur' }
                ],
                password:[
                    {
                        required:true,message:'请输入密码',trigger:'blur'
                    }
                ]
            }
        }
    },
    methods:{
        submit(){
            // //Token信息
            // const token =Mock.Random.guid()


            //校通过
            this.$refs.form.validate((valid)=>{
                if(valid){
                    getMenu(this.form).then(({data})=>{
                        console.log(data)
                        if(data.code===20000){
                            //将信息存入cookie用于不同页面的通信
                            Cookie.set('token',data.data.token)
                          //获取菜单数据,存入store
                          this.$store.commit('setMenu',data.data.menu)
                          //跳转
                          this.$router.push({
                            path: '/Home',
                            query: {
                              username: this.form.username
                            }
                          });

                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../assets/images/login.png");
  position: absolute;
  .login-container{
    text-align: center;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    box-sizing: border-box;
    .el-input{
      width: 198px;
    }
    .login-title{
      text-align: center;
      margin-bottom: 40px;
      color: #505458;
    }


  }
}

</style>