<template>
  <div>
    <div class="Left">
      <el-button type="primary" @click="drawer = true" class="add-card-button">添加试题</el-button>
      <el-button type="primary" @click="publish()" class="add-card-button">发布试卷</el-button>
      <el-button type="primary" @click="Export()" class="add-card-button" v-loading.fullscreen.lock="fullscreenLoading">导出为PDF</el-button>
      <el-scrollbar class="scrollbar">
        <el-card class="box-card" v-for="(card, index) in cards" :key="index">
          <div slot="header" class="clearfix">
            <span>{{ card.title }}</span>
            <el-button style="float: right; padding: 3px 0; color:#F56C6C" type="text" @click="deleteCard(index)">删除</el-button>
          </div>
          <div v-for="o in card.items" :key="o" class="text item">
            {{o }}
          </div>
        </el-card>
      </el-scrollbar>
    </div>
    <div class="Right">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="题号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="sco"
            label="分值"
            width="180">
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
        title="题目选择"
        :visible.sync="drawer"
        :direction="direction"
        size=820px>
      <el-table
          ref="multipleTable"
          :data="probs"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="80"
            show-overflow-tooltip>

        </el-table-column>
        <el-table-column
            prop="Question"
            label="题干"
            width="120"
            show-overflow-tooltip>

        </el-table-column>
        <el-table-column
            prop="OptionA"
            label="选项A"
            width="120"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="OptionB"
            label="选项B"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="OptionC"
            label="选项C"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="OptionD"
            label="选项D"
            show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin: 20px">
        <el-button @click="toggleSelection()" type="danger">取消选择</el-button>
        <el-button type="primary" @click="handleAddCard">添加试题</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullscreenLoading: false,
      probs: [],
      drawer: false,
      direction: 'rtl',
      cards: [],
      cardIds:[],
      exam_id:'',
      exam_name: '',
      tableData: [{
        id: '第一题',
        sco: '3'
      }, {

        id: '第二题',
        sco: '3'
      }, {

        id: '第三题',
        sco: '3'
      }]
    };
  },
  methods: {
    deleteCard(index) {
      this.cards.splice(index, 1);
      this.cardIds.splice(index,1);
    },//删除卡片
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },//清空选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getList(){
      console.log("生成数据");
      const params = new URLSearchParams();
      params.append('method', 'SELECT_QUESTION');
      axios.post('http://localhost/PrimaryChinese/SelectServlet',params.toString()).then(response => {
        // 处理响应数据
        var jsonArray = response.data;
        var jsonString  = JSON.stringify(jsonArray);
        var jsObj = JSON.parse(jsonString);
        console.log(jsonString);
        this.probs = Object.values(jsObj);
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
    handleAddCard() {
      const selectedRows = this.$refs.multipleTable.selection; // 获取选中的行数据
      selectedRows.forEach(row => {
        const card = {
          title: row.Question, // 使用题干作为卡片的标题，你也可以根据需求修改
          items: [row.OptionA, row.OptionB, row.OptionC, row.OptionD] // 将选项作为卡片的内容，你也可以根据需求修改
        };
        const cardId = {
          id: row.id
        };
        this.cards.push(card); // 将卡片添加到cards数组中
        this.cardIds.push(cardId);
      });

      // 关闭抽屉
      this.$refs.multipleTable.clearSelection();
      this.drawer = false;
    },
    publish(){
      //当用户点击发送的时候，应该发送一个这样的JSON对象去进行解析
      //考试的编号，名称以及考试的时间
      //其次是考试要用到的试题
      //在后台对这次考试进行解析
      //首先对考试表进行插入,然后插入考试-试题表
      console.log("开始提交");
      var IdArray = JSON.stringify(this.cardIds);
      console.log(IdArray.toString());

      const params = new URLSearchParams();
      params.append('exam_id', this.exam_id);
      params.append('exam_name', this.exam_name);
      params.append('IdArray',IdArray.toString());
      axios.post('http://localhost/PrimaryChinese/ExamManagerServlet',params.toString()).then(response => {

      })
          /* eslint-disable */
          .catch(error => {
            // 处理错误
            console.log("发生错误");
          });
    },
    Export(){
      console.log("开始提交");
      var IdArray = JSON.stringify(this.cardIds);
      console.log(IdArray.toString());

      const params = new URLSearchParams();
      params.append('exam_id', this.exam_id);
      params.append('exam_name', this.exam_name);
      params.append('IdArray',IdArray.toString());
      axios.post('http://localhost/PrimaryChinese/PDFServlet',params.toString()).then(response => {
        // 在响应的.then()回调函数中获取返回的路径
        const path = response.data;
        console.log(path);
        // 进行页面跳转
        window.open(path, '_blank');
      })
          /* eslint-disable */
          .catch(error => {
            // 处理错误
            console.log("发生错误");
          });
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 5000);
    },

  },
  mounted() {
    this.exam_id = this.$route.query.exam_id;
    this.exam_name = this.$route.query.exam_name;
    this.getList();
  }
};
</script>

<style scoped>
.add-card-button {
  margin-bottom: 10px;
}

.scrollbar {
  max-width: 650px;
  height: 638px; /* 可根据需要调整容器的高度 */
  overflow-y: auto;
  overflow-x: hidden;
}

.scrollbar::-webkit-scrollbar {
  width: 8px; /* 设置滚动条宽度 */
}

.scrollbar::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 设置滚动条背景色 */
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #66ccff; /* 设置滚动条滑块颜色 */
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 设置滚动条滑块悬停时颜色 */
}
.Left{
  height: 638px;
  width: 700px;
  float: left;
}
.Right{
  height: 638px;
  width: 450px;
  float: right;
}
.box-card {
  text-align: left;
  margin-bottom: 20px;
  width: 600px;
}
</style>