import { dfGetax, postax } from '@/common/request/index'
import { ApiFormat } from './api.type'

export async function login(params: { name: string; password: string }) {
  try {
    const { data } = await postax<ApiFormat<{ token: string }>>(
      '/api/login',
      params
    )
    return data?.data?.token || ''
  } catch {
    return ''
  }
}
