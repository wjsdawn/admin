const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    'area|1': ['中心城区','科技城区','农旅融合社','临港东区','临港南区','临港西区'],
    property: '@ctitle',
    project: '@title'
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
