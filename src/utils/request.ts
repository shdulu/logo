import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { removeToken } from '@/utils/auth'
// import router from '@/router'
import config from '@/config'
// import { Spin } from 'view-design'
// import errorHandle from './error-handle'

const requestFail = (res: AxiosResponse) => {
  const errStr = '网络繁忙！'
  if (res.data.code) {
    switch (res.data.code) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        // router.replace({
        //   path: '/401',
        // })
        removeToken()
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        // 清除token
        // store.commit('loginSuccess', null);
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        // router.replace({
        //   path: '/403',
        // })
        removeToken()
        break
      // 404请求不存在
      case 404:
        break
    }
  }
  console.error({
    code: res.data.errcode || res.data.code,
    msg: res.data.errMsg || errStr
  })
  if (typeof res.data.errMsg === 'object') {
    res.data.errMsg = '服务器错误'
  }
  return null
}

class HttpRequest {
  queue: any // 请求url集合
  constructor() {
    this.queue = {}
  }
  destroy(url: string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  getInsideConfig() {
    const configParams = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      baseURL:
        process.env.NODE_ENV === 'development'
          ? config.baseUrl.dev
          : config.baseUrl.pro,
      withCredentials: true,
      timeout: 50000
    }
    return configParams
  }
  interceptors(instance: any, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Do something before request is sent
        if (!Object.keys(this.queue).length) {
          // Spin.show()
        }
        if (url) {
          this.queue[url] = true
        }
        return config
      },
      (error: any) => {
        // Do something with request error
        console.error(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (url) {
          this.destroy(url)
        }
        const { data, status } = response

        if (status === 200 && data.code === 200) {
          return data
        }
        // 失败回调
        return requestFail(response) // 失败回调
      },
      (error: any) => {
        if (url) {
          this.destroy(url)
        }
        // errorHandle(error)
        console.error(error)
      }
    )
  }
  async request(options: AxiosRequestConfig) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    await this.interceptors(instance, options.url)
    return instance(newOptions)
  }
  get(url: string, config?: any) {
    const options = Object.assign(
      {
        method: 'GET',
        url: url
      },
      config
    )
    return this.request(options)
  }
  post(url: string, data: any) {
    return this.request({
      method: 'POST',
      url,
      data
    })
  }
}

export default HttpRequest
