import request from '@/utils/request'

export function getLingangWestList(params) {
  return request({
    url: '/vue-admin-template/lingang-west/List',
    method: 'post',
    params
  })
}
