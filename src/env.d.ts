/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>

  export default component
}

/**
 * 对象值类型
 */
declare type ValueOf<T> = T[keyof T]

/**
 * 动漫id
 */
declare type ComicId = string | number

/**
 * 检出promise返回值类型 Awaited
 */
// declare type PickPromiseResult<T> = T extends Promise<infer U> ? U : never

/**
 * 检出promise异步函数的返回值类型
 */
declare type PickPromiseFnResult<T> = Awaited<ReturnType<T>>
