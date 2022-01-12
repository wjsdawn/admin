import request from '@/utils/request'

export function getLingangSouthList(params) {
  return request({
    url: '/vue-admin-template/lingang-south/List',
    method: 'post',
    params
  })
}
