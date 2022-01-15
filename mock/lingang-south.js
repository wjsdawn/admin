const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    area: '临港经济发展区南区',
    'status|1': ['审核通过', '待审核', '审核不通过'],
    property: '@ctitle',
    project: '@title',
    principal: '@cname',
    display_time: '@datetime',
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/lingang-south/List',
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
