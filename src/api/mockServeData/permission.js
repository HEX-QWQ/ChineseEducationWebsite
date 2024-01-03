import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '资源管理',
              icon: 'video-play',
              url: 'Mall.vue'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User.vue'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiao' && password === 'xiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              label: '班级管理',
              icon: 's-flag',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '成员管理',
                  icon: 's-custom',
                  url: 'PageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '考试管理',
                  icon: 'edit',
                  url: 'PageTwo.vue'
                },
                {
                  path: '/page3',
                  name: 'page3',
                  label: '新建考试',
                  icon: 'edit',
                  url: 'PageThree.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
