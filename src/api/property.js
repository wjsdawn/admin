import request from '@/utils/request'

export function getProperty(params) {
  return request({
    url: 'vue-admin-template/property/List',
    method: 'post',
    params
  })
}
