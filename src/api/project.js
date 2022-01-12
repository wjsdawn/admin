import request from '@/utils/request'

export function getProject(params) {
  return request({
    url: 'vue-admin-template/project/List',
    method: 'post',
    params
  })
}
