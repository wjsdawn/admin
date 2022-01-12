import request from '@/utils/request'

export function getScienceList(params) {
  return request({
    url: '/vue-admin-template/science-area/List',
    method: 'post',
    params
  })
}
