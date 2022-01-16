const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    id: '@id',
    'area|1': ['中心城区', '科技城区', '农旅融合区', '临港经济发展区东区', '临港经济发展区南区', '临港经济发展区西区'],
    'status|1': ['审核通过', '待审核', '审核不通过'],
    'property|1-5': ['@ctitle'],
    project: '@title',
    principal: '@cname',
    display_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/project/List',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
