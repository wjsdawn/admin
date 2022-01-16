module.exports = [
  {
    url: 'http://localhost:9528/dev-api/vue-admin-template/project/upload',
    type: 'post',
    response: config => {
      const items = {}
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
