export type TProxy = 'warning' | 'info'
export type IPrefix = keyof typeof domain.real

export type IPathName<
  T extends string,
  K extends string,
> = T extends `/${K}${infer R}` ? `/${K}${R}` : never

export type IHref<T extends string> = T extends `https://${infer R}`
  ? `https://${R}`
  : T extends `http://${infer R}`
  ? `http://${R}`
  : never

export interface IRequestResponse {
  code: string
  header?: Record<string, any>
  data: any
  message?: string
}

/************************************************** */
/** 上半部分类型，下半部分逻辑 */
/************************************************** */

const domain = {
  real: {
    box: 'http://rap2api.taobao.org/app/mock/xxx',
  },
  pre: {
    box: 'http://rap2api.taobao.org/app/mock/xxx',
  },
  stable: {
    box: 'http://rap2api.taobao.org/app/mock/xxx',
  },
  dev: {
    box: 'http://rap2api.taobao.org/app/mock/xxx',
  },
}

export default domain