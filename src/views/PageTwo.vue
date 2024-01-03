<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2023-7-7</span></p>
          <p>上次登录地点：<span>长沙</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 350px;">
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
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 230px">
        <!--折线图-->
        <div>用户访问量</div>
        <div id="echarts1" style="height: 230px;">
        </div>

      </el-card>
      <div class="graph">
        <el-card style="height: 200px">
          <div>用户反馈</div>
          <div id="echarts2" style="height:200px">
          </div>
        </el-card>
        <el-card style="height: 200px">
          <div>资源占比</div>
          <div id="echarts3" style="height:160px">
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
export default{
  data(){
    return{
      tableData: [
        {
          name:'钟1',
          today:'1',
          month:'10',
          total:'100'
        },
        {
          name:'钟2',
          today:'2',
          month:'20',
          total:'200'
        },
        {
          name:'钟3',
          today:'3',
          month:'30',
          total:'300'
        },
        {
          name:'钟4',
          today:'4',
          month:'40',
          total:'400'
        },
        {
          name:'钟5',
          today:'5',
          month:'50',
          total:'500'
        },
      ],
      tableLabel:{
        name:'用户',
        today:'今日学习',
        month:'本月学习',
        total:'总共'
      },
      countData:[
        {
          name: '今日最佳学生',
          value:'钟1',
          icon:'trophy',
          color:'#2ec7c9'
        }, {
          name: '本月最佳学生',
          value:'钟2',
          icon:'trophy',
          color:'#ffb980'
        }, {
          name: '历史最佳学生',
          value:'钟3',
          icon:'trophy',
          color:'#5ab1ef'
        },{
          name: '今日学习次数',
          value:'3',
          icon:'trophy',
          color:'#2ec7c9'
        }, {
          name: '本月学习次数',
          value:'30',
          icon:'trophy',
          color:'#ffb980'
        }, {
          name: '历史学习次数',
          value:'300',
          icon:'trophy',
          color:'#5ab1ef'
        }
      ],

    }
  },
  mounted(){
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
    const option3={
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: '古诗'
            },
            {
              value: 234,
              name: '阅读'
            },
            {
              value: 234,
              name: '文化'
            },{
              value: 234,
              name: '作文'
            },
          ]
        }
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      color:[
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",

      ],
    }
    myChart3.setOption(option3)
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
      text-align: center;
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
    width: 48%;
  }
}
</style>