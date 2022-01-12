import request from '@/utils/request'

export function getCenterList(params) {
  return request({
    url: '/vue-admin-template/center-area/List',
    method: 'post',
    params
  })
}
