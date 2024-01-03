<template>
    <div class="header-container">
        <div class="l-content">
            <el-button  style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu" circle size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" >
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }" >{{item.label}}
                </el-breadcrumb-item>
                
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    
                   <img class="user" :src="getImageSrc()" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                    
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex';

    export default{
        data(){
            return{
                
            }
        },
        methods:
        {
            handleMenu(){
                this.$store.commit("collapseMenu")
            },
            handleClick(command){
                if(command==='cancel'){
                    console.log('登出')
                    //清除Cookie中的token
                    Cookie.remove('token')
                    //跳转登录页面
                    this.$router.push('/login')
                }
                
            },
          getImageSrc() {
            return this.selectPer ? "picture/user1.png" : "picture/user2.png"; // 根据条件选择不同的图片 URL
          }

        },
        computed:{
            ...mapState({
                tags:state=>state.tab.tabsList
            }),
          selectPer(){
            if(this.$route.query.username==='admin'){
              return true;
            }else{
              return false;
            }
          },

        }
    }
</script>
<style scoped>
.header-container{
  padding: 0 20px;
  background-color: #778899;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
.text{
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
.r-content{
.user{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
}
.l-content{
  display: flex;
  align-items: center;
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #ffffff !important;
}
}

}

</style>
