// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import axios, { AxiosRequestConfig } from 'axios';
// import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiBaseUrl } from './env'

// 创建axios实例
const service = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000
})

// Token在localStorage中的key
const TOKEN_KEY = 'auth_token'
// Token过期时间（24小时）
const TOKEN_EXPIRE_TIME = 24 * 60 * 60 * 1000

// 获取token
export const getToken = (): string | null => {
  const tokenData = localStorage.getItem(TOKEN_KEY)
  if (!tokenData) return null

  try {
    const { token, expireTime } = JSON.parse(tokenData)
    // 检查token是否过期
    if (new Date().getTime() > expireTime) {
      // 如果过期，清除token
      removeToken()
      return null
    }
    return token
  } catch (error) {
    removeToken()
    return null
  }
}

// 设置token，并设置过期时间
export const setToken = (token: string): void => {
  const expireTime = new Date().getTime() + TOKEN_EXPIRE_TIME
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expireTime }))
}

// 移除token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 如果有token，添加到请求头
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 如果响应成功，直接返回数据
    return res
  },
  (error) => {
    console.error('响应错误:', error)
    // 处理401未授权错误
    if (error.response && error.response.status === 401) {
      // 清除token
      removeToken()
      // 可以在这里添加重定向到登录页的逻辑
    }
    return Promise.reject(error)
  }
)

// 封装GET请求
export const get = <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.get(url, { params, ...config })
}

// 封装POST请求
export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.post(url, data, config)
}

// 封装PUT请求
export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.put(url, data, config)
}

// 封装DELETE请求
export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return service.delete(url, config)
}

export default service