import request from '@/utils/request'

export function index() {
    return request({
        url: '/',
        method: 'get',
    })
}