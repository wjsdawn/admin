import request from '@/utils/request'

export function getCenter(params) {
  return request({
    url: '/vue-admin/lingang-south/List',
    method: 'post',
    params
  })
}
