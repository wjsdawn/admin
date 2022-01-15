const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    property: '@ctitle'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/property/List',
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
