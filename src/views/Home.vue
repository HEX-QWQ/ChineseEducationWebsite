<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img  :src="getImageSrc()" alt="">
          <div class="userinfo">
            <p class="name">{{ selectPer ?'Admin' :'Xiao'}}</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2023-7-13</span></p>
          <p>上次登录地点：<span>长沙</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 350px;">
        <div style="text-align: center; font-family: serif; font-weight: bold;">{{ selectPer ?'用户学习时间' :'学生学习时间'}}(单位:min)</div>
        <el-table
            stripe
            :data="tableData"
            style="width: 100%">
          <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val"/>
        </el-table>

      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="na">{{ item.value }}</p>
            <p class="desc" style="margin-left:0px;">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 230px">
        <!--折线图-->
        <div style="text-align: center; font-family: serif; font-weight: bold;  font-size: 20px;">{{ selectPer ?'用户学习相应模块的次数' :'学生学习相应模块的次数'}}</div>
        <div id="echarts1" style="height: 230px;">
        </div>

      </el-card>
      <div class="graph">
        <el-card style="height: 200px">
          <div style="text-align: center; font-family: serif; font-weight: bold;">{{ selectPer ?'用户数量反馈' :'学生数量反馈'}}</div>
          <div id="echarts2" style="height:200px">
          </div>
        </el-card>
        <el-card style="height: 200px">
          <div style="text-align: center; font-family: serif; font-weight: bold;">资料在app资源中所占比例</div>
          <div id="echarts3" style="height:160px ;">
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
import { mapGetters } from 'vuex';
export default{
  data(){
    return{
      tableData: [
        {
          name:'叶寒',
          today:'8',
          month:'20',
          total:'100'
        },
        {
          name:'唐灵梦',
          today:'10',
          month:'18',
          total:'80'
        },
        {
          name:'胡言',
          today:'24',
          month:'35',
          total:'99'
        },
        {
          name:'秦雅',
          today:'6',
          month:'10',
          total:'68'
        },
        {
          name:'顾青',
          today:'19',
          month:'40',
          total:'77'
        },
      ],
      tableLabel:{
        name:'名称',
        today:'今日学习',
        month:'本月学习',
        total:'总共'
      },
      countData:[
        {
          name: '今日最佳',
          value:'胡言',
          icon:'trophy',
          color:'#2ec7c9'
        }, {
          name: '本月最佳',
          value:'顾青',
          icon:'trophy',
          color:'#ffb980'
        }, {
          name: '历史最佳',
          value:'叶寒',
          icon:'trophy',
          color:'#5ab1ef'
        },{
          name: '今日学习时间(单位:min)',
          value:'24',
          icon:'trophy',
          color:'#2ec7c9'
        }, {
          name: '本月学习时间(单位:min)',
          value:'40',
          icon:'trophy',
          color:'#ffb980'
        }, {
          name: '历史学习时间(单位:min)',
          value:'100',
          icon:'trophy',
          color:'#5ab1ef'
        }
      ],

    }
  },
  mounted(){
    //折线图
    var myChart1 = echarts.init(document.getElementById('echarts1'));
    var option1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {},
      legend: {
        data: ['文言文', '阅读', '古诗', '成语', '作文']
      },
      series: [
        {
          name:'文言文',
          data: [100, 220, 280, 430, 490,50, 40],
          type: 'line',
          stack: 'x'
        },
        {
          name:'阅读',
          data: [50, 40, 30, 50, 100, 220, 280],
          type: 'line',
          stack: 'x'
        },
        {
          name:'古诗',
          data: [200, 220, 36, 430, 490,60, 40],
          type: 'line',
          stack: 'x'
        },
        {
          name:'成语',
          data: [150, 220, 280, 65, 490,50, 400],
          type: 'line',
          stack: 'x'
        },
        {
          name:'作文',
          data: [800, 220, 280, 430, 95,50, 40 ],
          type: 'line',
          stack: 'x'
        },
      ]
    };
    myChart1.setOption(option1)
    //柱状图
    var myChart2 = echarts.init(document.getElementById('echarts2'));
    var option2 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      legend: {
        data: ['新增用户', '活跃用户']
      },
      yAxis: {},
      series: [
        {
          name:'新增用户',
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
        },
        {
          name:'活跃用户',
          type: 'bar',
          data: [26, 24, 18, 22, 23, 20, 27]
        }
      ]
    };
    myChart2.setOption(option2)

    //饼图
    var myChart3 = echarts.init(document.getElementById('echarts3'));
    const option3 = {
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 300,
              name: '经典故事'
            },
            {
              value: 200,
              name: '阅读理解'
            },
            {
              value: 100,
              name: '文化故事'
            },
            {
              value: 400,
              name: '优秀作文'
            },
          ],
          label: {
            formatter: '{b}{d}%',

          }
        }
      ],
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          let percent = params.percent.toFixed(1);
          return params.name + ': ' + params.value + ' (' + percent + '%)';
        }
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
    }
    myChart3.setOption(option3);
  },
  computed:{
    selectPer(){
      if(this.$route.query.username==='admin'){
        return true;
      }
      if(this.$route.query.username==='xiao'){
        return false;
      }
    },
  },
  methods: {
    getImageSrc() {
      return this.selectPer ? "picture/user1.png" : "picture/user2.png"; // 根据条件选择不同的图片 URL
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom:20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img{
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999999;
    }
  }
}
.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;

  }
  .detail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .na{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999;
    }
  }
  .el-card{
    width: 30%;
    margin-bottom: 20px;

  }

}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 49%;
  }
}
</style>