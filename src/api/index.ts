import { getax } from '@/common/request/index'
import { getVal } from '@sorarain/utils'
import * as FnReturns from './type'
import * as ApiType from './api.type'
import { newError, badRequestNotify } from './utils'

export * from './type'
export * from './pixiv'

/**
 * 根据名称获取动漫列表
 * @param param
 * @returns
 */
export async function searchComic(param: {
  name: string
  page: number
}): Promise<FnReturns.SearchComicReturn> {
  try {
    const {
      data: {
        data: { results, pagetotal }
      }
    } = await getax<ApiType.Search>(
      `api/search/${param.name}?page=${param.page}`
    )
    if (results instanceof Array) {
      return {
        data: results,
        total: (pagetotal || 0) * 20
      }
    } else {
      throw newError()
    }
  } catch {
    badRequestNotify('api/search')
    return {
      data: [],
      total: 0
    }
  }
}

/**
 * 动漫筛选
 * @param param
 * @returns
 */
export async function filterComic(param: {
  /** 分类 */
  type?: number
  /** 类型 */
  category?: string
  /** 排序 */
  order?: string
  /** 字母 */
  letter?: string
  /** 年份 */
  year?: number
  page: number
}): Promise<FnReturns.FilterComicReturn> {
  try {
    const api = Object.entries(param).reduce((total, [k, v]) => {
      return v !== '' ? `${total}&${k}=${v}` : total
    }, 'api/filter?')

    const { data } = await getax<ApiType.Filter>(api)
    return {
      data: getVal(() => data.data.results, []).map((item) => ({
        cover: item.cover,
        id: item.id,
        season: item.season,
        title: item.title
      })),
      total: data?.data?.total || 0
    }
  } catch {
    badRequestNotify('api/filter')
    return {
      data: [],
      total: 0
    }
  }
}

/**
 * 获取动漫详情
 * @param id
 * @returns
 */
export async function getComicMain(
  id: number | string
): Promise<FnReturns.GetComicMainReturn | null> {
  try {
    const {
      data: { data }
    } = await getax<ApiType.GetAnime>(`api/getAnime/${id}`)

    const playlist = new Map()
    Object.entries(data.playlist || {}).forEach(([k, v]) => {
      playlist.set(
        k,
        v.map((item, index) => ({
          name: String(item.title),
          value: index
        }))
      )
    })

    return {
      playlist,
      title: data.title,
      season: data.season || '未知',
      region: data.region || '未知',
      rank: data.rank || '',
      master: data.master || '未知',
      lang: data.lang || '未知',
      firstDate: data.first_date || '未知',
      cover: data.cover || '',
      voiceActors: data.actors || [],
      cates: data.categories || []
    }
  } catch {
    badRequestNotify('api/getAnime')
    return null
  }
}

/**
 * 获取视频地址集
 * @param key
 * @returns
 */
export async function getVideoUrl(
  key: string | number
): Promise<FnReturns.GetVideoUrlReturn> {
  try {
    const {
      data: { data }
    } = await await getax<ApiType.GetVideo>(`api/getVideo/${key}`)
    return Object.entries(data).map(([k, v]) => ({
      key: k,
      value: (v instanceof Array ? v : []).map((url) =>
        url.replaceAll("'", '').split('?url=').pop()
      ) as string[]
    }))
  } catch (e) {
    badRequestNotify('api/getVideo')
    console.error(e)
    return []
  }
}

/**
 * 获取混合列表（热门、最新更新、轮播、每周更新列表、番外、完结日漫、国漫）
 * @returns
 */
export async function getHomeMixData(): Promise<FnReturns.GetHomeMixData | null> {
  try {
    const { data } = await getax<ApiType.GetIndex>('api/getIndex')
    const listFormat = (list: any[]) =>
      list.slice(0, 10).map((item) => ({
        cover: item.cover,
        id: item.id,
        season: item.season,
        title: item.title
      }))
    return {
      hots: getVal(() => data.data.hots.results, []).map((item) => ({
        cover: item.cover,
        id: item.id,
        season: item.season,
        title: item.title
      })),
      latest: listFormat(getVal(() => data.data.latest, [])),
      banner: getVal(() => data.data.banner, []).map((item) => ({
        cover: item.cover,
        id: item.id || '-1',
        title: item.title || '未知'
      })),
      perweek: Object.entries(getVal(() => data.data.perweek, {})).map(
        ([k, v]) => ({
          name: `周${['一', '二', '三', '四', '五', '六', '日'][+k]}`,
          key: k,
          value: (v || []).map((e) => ({
            id: e.id,
            season: e.season || '未知',
            title: e.title || '未知'
          }))
        })
      ),
      tv: listFormat(getVal(() => data.data.theatre_comic, [])),
      endJp: listFormat(getVal(() => data.data.japancomic, [])),
      cn: listFormat(getVal(() => data.data.chinese_comic, []))
    }
    // return
  } catch (e) {
    badRequestNotify('api/getIndex')
    console.error(e)
    return null
  }
}

/**
 * 获取动漫筛选条件
 * @returns
 */
export async function getComicFilterConfig(): Promise<FnReturns.GetComicFilterConfig> {
  try {
    const { data } = await getax<ApiType.GetConfig>('api/getConfig')
    return getVal(() => data.data.filtersConfig, []).map((item) => ({
      id: item.id,
      name: item.name,
      value: (item.categories || []).map((key) => ({
        name: key.classname,
        value: key.classid
      }))
    }))
  } catch {
    badRequestNotify('api/getConfig')
    return []
  }
}
