import request from '@/utils/request'

export function getCenter(params) {
  return request({
    url: '/vue-admin/science-area/List',
    method: 'post',
    params
  })
}
