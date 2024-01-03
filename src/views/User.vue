<template>
    <div class="manage">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="sname">
                    <el-input placeholder="请输入姓名" v-model="form.sname"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="account">
                    <el-input placeholder="请输入账号" v-model="form.account" :disabled="isAccountDisabled"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input placeholder="请输入密码" v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nick">
                    <el-input placeholder="请输入昵称" v-model="form.nick"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="学习时间" prop="time">
                    <el-input placeholder="请输入学习时间" v-model="form.time"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                +新增
            </el-button>  
            <el-form :inline="true" :model="userForm" >
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="userForm.sname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>     
        </div>
        <div class="common-table">
          <el-table
              stripe
              height="100%"
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="sname"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="account"
                label="账号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="pwd"
                label="密码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="birthday"
                label="生日"
                width="180">
            </el-table-column>

            <el-table-column
                label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
            <div class="pager">
                <el-pagination
                layout="prev, pager, next"
                :total="total"
                @current-change="handlePage">
            </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {addUser, delUser, editUser} from '../api'

export default{
        data(){
            return{
                dialogVisible:false,
                form:{
                    sname:'',
                    birthday:'',
                    account:'',
                    pwd:'',
                    nick:'',
                    time:''

                },
                rules:{
                    sname:[
                        {
                            required: true, message: '请输入姓名',
                        }
                    ],
                    birthday:[
                        {
                            required: true, message: '请输入出生日期',
                        }
                    ],
                    account:[
                        {
                            required: true, message: '请输入账号',
                        }
                    ],
                    pwd:[
                        {
                            required: true, message: '请输入密码',
                        }
                    ],
                    nick:[
                        {
                            required: true, message: '请输入昵称',
                        }
                    ],
                    time:[
                        {
                            required: true, message: '请输入学习时间',
                        }
                    ],
                    
                },
                tableData:[],
                modalType: 0,//0表示新增 1表示编辑
                isAccountDisabled: true,
                total:0,//当前总条数
                pageData:{
                    page:1,
                    limit:10
                },
                userForm:{
                    sname:''
                },
            }
        },
        methods:{
            submit(){
              console.log("我在执行");
               this.$refs.form.validate((valid)=>{
                    if(valid){
                        //后续对表单数据的处理
                        if(this.modalType===0){

                            addUser(this.form).then(()=>{
                                //重新获取列表结果
                                this.getList()
                            })
                        }else{
                            editUser(this.form).then(()=>{
                                //重新获取列表结果
                                this.getList()
                            })
                            
                        }
                        console.log(this.form,'form')
                        //清空表单
                        this.$refs.form.resetFields()
                        //关闭弹窗
                        
                        this.dialogVisible=false

                    }

               }) 
            },
            //弹窗关闭时
            handleClose(){
                this.$refs.form.resetFields()
                this.dialogVisible=false
            },
            //点击按钮
            cancel(){
                this.handleClose()
            },
            handleEdit(row){
                this.modalType=1
                this.isAccountDisabled = true;
                this.dialogVisible=true
                //需要对当前数据进行深拷贝
                this.form=JSON.parse(JSON.stringify(row))
                 
            },
          handleDelete(row,index){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log("开始执行删除操作");
              delUser(row,index).then(()=>{
                //重新获取列表结果
                console.log("重新获取列表");
                this.getList();
              }).catch(error => {
                    // 处理错误
                    console.log(error);
                  });
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
            //获取列表数据
            getList(){
              console.log("生成数据");
              const params = new URLSearchParams();
              params.append('method', 'ALL_STUDENTS');
              axios.post('http://localhost/PrimaryChinese/SelectServlet',params.toString()).then(response => {
                // 处理响应数据
                var jsonArray = response.data;
                var jsonString  = JSON.stringify(jsonArray);
                var jsObj = JSON.parse(jsonString);
                console.log(jsonString);
                this.tableData = Object.values(jsObj);
                console.log(this.tableData);
                this.total = this.tableData.length;
                console.log(this.total);
              })
                  /* eslint-disable */
                  .catch(error => {
                    // 处理错误
                    console.log("发生错误");
                  });
            },
            handleAdd(){
                this.modalType=0
                this.isAccountDisabled = false;
                this.dialogVisible=true
            },
            handlePage(val){
                //选择页码的回调
                this.pageData.page=val
                this.getList()
            },
            onSubmit(){
                this.pageData.page=1
                this.getList()
             
            },
        },
        mounted(){
            this.getList()
        }
    }
</script>

<style lang="less" scoped>
.manage{
    height: 90%;
    .common-table{
        height: calc(100% - 62px);
        position: relative;
        .pager{
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center ;
    }
}
</style>