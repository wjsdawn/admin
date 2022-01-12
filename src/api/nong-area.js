import request from '@/utils/request'

export function getCenter(params) {
  return request({
    url: '/vue-admin/nong-area/List',
    method: 'post',
    params
  })
}
