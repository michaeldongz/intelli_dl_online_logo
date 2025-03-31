import { post, get } from '@/utils/request'

// 接口返回数据类型定义
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 用户信息接口
export interface UserInfo {
  id: string
  email: string
  nickName: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// 登录返回数据接口
export interface LoginResult {
  token: string
  userInfo: UserInfo
}

/**
 * 发送邮箱验证码
 * @param email 邮箱地址
 */
export const sendEmailCode = (email: string): Promise<ApiResponse> => {
  return post<ApiResponse>('/code/send', { email })
}

/**
 * 用户注册
 * @param params 注册参数
 */
export const register = (params: {
  email: string
  password: string
  code: string
  nickName: string
}): Promise<ApiResponse> => {
  return post<ApiResponse>('/user/register', params)
}

/**
 * 用户登录
 * @param params 登录参数
 */
export const login = (params: {
  email: string
  password: string
}): Promise<ApiResponse<LoginResult>> => {
  return post<ApiResponse<LoginResult>>('/user/login', params)
}

/**
 * 获取用户信息
 */
export const getUserInfo = (): Promise<ApiResponse<UserInfo>> => {
  return get<ApiResponse<UserInfo>>('/user/info')
}