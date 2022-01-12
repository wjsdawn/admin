import request from '@/utils/request'

export function getNongList(params) {
  return request({
    url: '/vue-admin-template/nong-area/List',
    method: 'post',
    params
  })
}
