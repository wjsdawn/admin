import request from '@/utils/request'

export function getLingangEastList(params) {
  return request({
    url: '/vue-admin-template/lingang-east/List',
    method: 'post',
    params
  })
}
