import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
const CancelToken = axios.CancelToken
// import { getToken } from '@/utils/auth'
// import store from '@/store'
// import { Message, Modal } from 'view-design'
const pending: any = {}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

function removePending(key: string, isRequest = false) {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something before request is sent
    const key = config.url + '&' + config.method
    removePending(key, true)
    config.cancelToken = new CancelToken((cancel: any) => {
      pending[key] = cancel
    })
    // if (store.getters.token) {
    //   config.headers.common['Authorization'] = 'Bearer ' + getToken()
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const key = response.config.url + '&' + response.config.method
    removePending(key)
    const res = response.data
    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0) {
      // Message.error({
      //   content: res.message || 'Error',
      //   duration: 5,
      // })
      // 508: Illegal token; 512: Other clients logged in; 514: Token expired;
      if (res.code === 508 || res.code === 512 || res.code === 514) {
        // to re-login
        // Modal.confirm({
        //   title: '确认登出',
        //   content:
        //     'You have been logged out, you can cancel to stay on this page, or log in again',
        //   okText: '重新登录',
        //   cancelText: '取消',
        //   onOk: () => {
        //     store.dispatch('user/resetToken').then(() => {
        //       location.reload()
        //     })
        //   },
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    // Message.error({
    //   content: error.message,
    //   duration: 5,
    // })
    return Promise.reject(error)
  }
)

export default service
