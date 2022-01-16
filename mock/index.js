const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')
const center_area_list = require('./center-area')
const nong_area_list = require('./nong-area')
const science_area_list = require('./science-area')
const lingang_east_list = require('./lingang-east')
const lingang_south_list = require('./lingang-south')
const lingang_west_list = require('./lingang-west')
const property_list = require('./property')
const project_list = require('./project')
const project_upload = require('./project-upload')

const mocks = [
  ...user,
  ...table,
  ...center_area_list,
  ...nong_area_list,
  ...science_area_list,
  ...lingang_east_list,
  ...lingang_south_list,
  ...lingang_west_list,
  ...property_list,
  ...project_list,
  // ...project_upload
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

