import Cookie from "js-cookie";

export default {
    state: {
        isCollapse:false,//控制菜单是否展开
        tabsList:[
            {
                path: '/',
                name: 'home',
                label:'首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ]//面包屑
    },
    mutations:{
        //修改菜单展开收起
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //修改面包屑
        selectMenu(state,val){
            console.log(val,'val')
            //判断添加的数据是否为首页
            if(val.name !=='home'){
                const index=state.tabsList.findIndex( item =>{return (item.name===val.name)})
                //如果不存在
                if(index===-1){
                    state.tabsList.push(val)
                }
            }
        },
        //设置menu数据
        setMenu(state,val){
            state.menu=val
            Cookie.set('menu',JSON.stringify(val))
        }

    }
}