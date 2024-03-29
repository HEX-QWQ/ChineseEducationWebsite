import Mock from 'mockjs'

let List = []
export default{
    getStatisticalData:() =>{
        //Mocl.Ramdom.float 产生随机数100-8000 保留小数 最小最大0位
        for(let i=0;i<7;i++){
            List.push(
                Mock.mock({
                    古诗:Mock.Random.float(100,8000,0,0),
                    文言文:Mock.Random.float(100,8000,0,0),
                    阅读:Mock.Random.float(100,8000,0,0),
                    成语:Mock.Random.float(100,8000,0,0),
                    作文:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        return {
            code:2000,
            data:{
                //饼图
                videoData:[
                    {
                       name:'古诗',
                       value:2999,
                    },
                    {
                        name:'文言文',
                        value:999,
                    },
                    {
                        name:'阅读',
                        value:299,
                    },
                    {
                        name:'成语',
                        value:3999,
                    },
                    {
                        name:'作文',
                        value: 399,
                    },
                       
                ],
                 //柱状图 
                userData:[
                    {
                        data:'周一',
                        new:1,
                        active:200
                    },
                    {
                        data:'周二',
                        new:2,
                        active:200
                    },
                    {
                        data:'周三',
                        new:3,
                        active:300
                    },
                    {
                        data:'周四',
                        new:4,
                        active:400
                    },
                    {
                        data:'周五',
                        new:5,
                        active:500
                    },
                    {
                        data:'周六',
                        new:6,
                        active:600
                    },
                    {
                        data:'周日',
                        new:7,
                        active:700
                    },
                ],
                //折线图
                orderData:{
                    data:['1','2','3','4','5','6','7'],
                    data:List
                },
                tableData:[
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
                ]

            }
        }
    }
}