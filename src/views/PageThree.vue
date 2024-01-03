<template>
  <div style="height: 100%">
    <div class="manage">
      <el-dialog
          title="新建考试"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose"
          modal="false">
        <!-- 资源的表单信息 -->
        <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px" >
          <el-form-item label="编 号" prop="exam_id">
            <el-input placeholder="请输入资源Id" v-model="form.exam_id"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="标  题" prop="exam_name" style="">
            <el-input placeholder="请输入资源标题" v-model="form.exam_name"></el-input>
          </el-form-item>

          <el-form-item label="考试时间">
            <el-time-picker
                style="margin-right: 20px"
                v-model="value1"
                placeholder="开始时间">
            </el-time-picker>

            <el-time-picker
                arrow-control
                v-model="value2"
                placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="submit">开始新建考试</el-button>
                </span>
      </el-dialog>
      <!--前面这一部分是选择框的代码，下面开始实现主体内容-->
      <!--主要的实现为在点击上面的选择框时调用this.getList,更新表单内容-->
      <div class="manage-header">
        <el-button @click="handleAdd" type="primary">
          +新建考试
        </el-button>
        <el-form :inline="true" :model="userForm" class="select">
          <el-form-item>
            <el-input placeholder="请输入资源Id" v-model="userForm.Id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="common-table">
        <el-table
            stripe
            height="90%"
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="exam_id"
              label="考试编号">
          </el-table-column>
          <el-table-column
              prop="exam_name"
              label="考试名称">
          </el-table-column>
          <el-table-column
              prop="exam_date"
              label="考试时间">
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
  </div>

</template>
<script>
import {addText, addUser, delText, editText, editUser} from '../api'
import axios from "axios";
export default {
  data() {
    return {
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40),
      activeName: 'composition',
      dialogVisible:false,
      form:{
        exam_id:'',
        Title:'',
        Type:'',
      },
      rules:{
        exam_id:[
          {
            required: true, message: '请输入资源Id',
          }
        ],
        exam_name:[
          {
            required: true, message: '请输入资源标题',
          }
        ],
        Type:[
          {
            required: true, message: '请输入资源种类',
          }
        ],
      },
      tableData:[],
      modalType: 0,//0表示新增 1表示编辑
      total:0,//当前总条数
      pageData:{
        page:1,
        limit:10
      },
      userForm:{
        exam_id:''
      },
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.activeName = tab.name;
      this.getList();

      //更新列表
    },
    submit(){
      console.log("我在执行");
      this.$refs.form.validate((valid)=>{
        if(valid){
          //console.log(this.form,'form')
          //清空表单
          //跳转
          console.log(this.form.exam_id);
          this.$router.push({
            path: '/Test',
            query: {
              exam_id: this.form.exam_id,
              exam_name: this.form.exam_name
            }
          });
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
      this.dialogVisible=true
      //需要对当前数据进行深拷贝
      this.form=JSON.parse(JSON.stringify(row))

    },
    handleDelete(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        delText({id:row.id}).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          //重新获取列表
          this.getList();
        })

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
      params.append('method', "SELECT_EXAM");
      axios.post('http://localhost/PrimaryChinese/SelectServlet',params.toString()).then(response => {
        // 处理响应数据
        var jsonArray = response.data;
        var jsonString  = JSON.stringify(jsonArray);
        var jsObj = JSON.parse(jsonString);
        console.log(jsonString);
        this.tableData = Object.values(jsObj);
        console.log(this.tableData);


      })
          /* eslint-disable */
          .catch(error => {
            // 处理错误
            console.log("发生错误");
          });
    },
    handleAdd(){
      this.modalType=0
      this.dialogVisible=true
    },
    handlePage(val){
      //选择页码的回调
      this.pageData.page=val
      this.getList(this.activeName);
    },
    onSubmit(){
      this.pageData.page=1
      this.getList(this.activeName);

    },
  },
  mounted(){
    this.getList(this.activeName);
  }
};
</script>
<style>
.manage {
  height: 90%;
}
.common-table {
  height: calc(100% - 62px);
  position: relative;
}
.pager {
  position: absolute;
  bottom: 0;
  right: 20px;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select {
  margin-top: 23px;
}
</style>
