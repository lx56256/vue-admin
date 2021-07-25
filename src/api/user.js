import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function createData(data) {
  return request({
    url: '/pages/createPageData',
    method: 'post',
    data
  })
}

export function modifyData(data) {
  return request({
    url: '/pages/modifyPageData',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/pages/deletePageData',
    method: 'post',
    data
  })
}

export function queryPageData() {
  return request({
    url: '/pages/getQueryPageData',
    method: 'get',
  })
}

export function queryPageDataDetail(param) {
  return request({
    url: '/pages/getQueryPageDetail',
    method: 'get',
    params: param,
  })
}

