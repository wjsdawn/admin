const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    area: '科技城新区',
    'status|1': ['审核通过', '审核中', '审核不通过'],
    property:'@name',
    project: '@title',
    principal: '@cname',
    display_time: '@datetime',
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/science-area/List',
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
