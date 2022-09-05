# Anime



### 根据名称获取动漫列表

#### 基本信息

**Path：** /api/search

**Method：** GET

**实例：** /api/search/史莱姆?page=1

#### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**Body**

| 名称 | 类型   | 是否必须 | 默认值 | 备注        | 其他信息                          |
| ---- | ------ | -------- | ------ | ----------- | --------------------------------- |
| name | string | 是       |        | 动漫名称    |                                   |
| page | number | 是       | 0      | 分页-第几页 | 无分页-大小参数，默认分页大小为20 |

**返回数据**

```typescript
{
  /** 状态码 */
  code: number
  /** 状态文字 */
  message: string
  /** 数据 */
  data: {
    /** 当前返回页数 */
    pageindex: number
    /** 总页数 */
    pagetotal: number
    /** 动漫列表 */
    results: {
      /** 分类列表 */
      category: string
      /** 封面 */
      cover: string
      /** 首发时间 */
      date: string
      /** 介绍 */
      description: string
      /** 动漫id */
      id: string
      /** 动漫状态（更新、完结...） */
      season: string
      /** 动漫名称 */
      title: string
    }[]
  }
}
```



### 动漫筛选

#### 基本信息

**Path：** /api/filter

**Method：** GET

#### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**Body**

| 名称     | 类型   | 是否必须 | 默认值 | 备注         | 其他信息                             |
| -------- | ------ | -------- | ------ | ------------ | ------------------------------------ |
| type     | number | 否       |        | 分类         | 值来自于接口 api/getConfig           |
| category | string | 否       |        | 类型         | 值来自于接口 api/getConfig           |
| order    | string | 否       |        | 排序         | 更新时间-time 评分-score 总排行-hits |
| letter   | string | 否       |        | 首字母，如A  | 全部-0                               |
| year     | number | 否       |        | 年份，如2020 | 全部-不带此参数                      |
| page     | number | 是       | 0      | 分页-第几页  | 无分页-大小参数，默认分页大小为20    |

**返回数据**

```typescript
{
  /** 状态码 */
  code: number
  /** 状态文字 */
  message: string
  /** 数据 */
  data: {
    /** 当前返回页数 */
    total_page: number
    /** 总页数 */
    total: number
    /** 动漫列表 */
    results: {
      /** 封面 */
      cover: string
      /** 动漫id */
      id: string
      /** 动漫状态（更新、完结...） */
      season: string
      /** 动漫名称 */
      title: string
    }[]
  }
}
```



### 获取动漫详情

#### 基本信息

**Path：** /api/search

**Method：** GET

**实例：** api/getAnime/1829

**注意：** 返回参数里的`playlist`，其集信息`title`对应的`value`为当前集在集列表的索引下标（因为此接口和api/getVideo有关联）

#### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**Body**

| 名称 | 类型   | 是否必须 | 默认值 | 备注   | 其他信息 |
| ---- | ------ | -------- | ------ | ------ | -------- |
| id   | string | 是       |        | 动漫id |          |

**返回数据**

```typescript
{
  /** 状态码 */
  code: number
  /** 状态文字 */
  message: string
  /** 数据 */
  data: {
    /** 声优名字列表 */
    actors: string[]
    /** 分类列表 */
    categories: string[]
    /** 封面 */
    cover: string
    /**首发时间 */
    first_date: string
    /** 语言 */
    lang: string
    /** 作者 */
    master: string
    /** 播放列表 */
    playlist: {
      /** 播放源id-集列表 */
      [prop: number]: {
        /** 注意：此选项暂时无用 */
        link: string
        /** 当前集名称 */
        title: string
      }[]
    }
    /** 分数 */
    rank: string
    /** 发布国家 */
    region: string
    /** 动漫状态（更新、完结...） */
    season: string
    /** 动漫名称 */
    title: string
  }
}
```



### 获取视频地址集

#### 基本信息

**Path：** /api/getVideo

**Method：** GET

**实例：** api/getVideo/1829

**注意：** 此接口返回数据与 `/api/search`接口返回的`playlist`关联

#### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**Body**

| 名称 | 类型   | 是否必须 | 默认值 | 备注   | 其他信息 |
| ---- | ------ | -------- | ------ | ------ | -------- |
| id   | string | 是       |        | 动漫id |          |

**返回数据**

```typescript
{
  /** 状态码 */
  code: number
  /** 状态文字 */
  message: string
  /** 数据 */
  data: {
    /** 播放源id-地址列表 */
    [prop: number]: string[]
  }
}
```



### 获取动漫配置

#### 基本信息

**Path：** /api/getConfig

**Method：** GET

#### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**返回数据**

```typescript
{
  /** 状态码 */
  code: number
  /** 状态文字 */
  message: string
  /** 数据 */
  data: {
    /** 动漫筛选-条件 */
    filtersConfig: {
      /** 分类-名称 */
      name: string
      /** 分类-id */
      id: number
      /** 分类-类型列表 */
      categories: {
        /** 类型-名称 */
        classname: string
        /** 类型-id */
        classid: string
      }[]
    }[]
  }
}
```



### 获取混合列表

#### 基本信息

**Path：** /api/getIndex

**Method：** GET

**接口描述：** 列表如下： 热门、最新更新、轮播、每周更新列表、番外、完结日漫、国漫

#### 请求参数

**Headers**

| 参数名称     | 参数值           | 是否必须 | 示例 | 备注 |
| ------------ | ---------------- | -------- | ---- | ---- |
| Content-Type | application/json | 是       |      |      |

**返回数据**

```typescript
{
  /** 状态码 */
  code: number
  /** 状态文字 */
  message: string
  /** 数据 */
  data: {
    /** 轮播 */
    banner: {
      /** 封面 */
      cover: string
      /** 动漫id */
      id: string
      /** 动漫名称 */
      title: string
    }[]
    /** 国漫 */
    chinese_comic: {
      /** 封面 */
      cover: string
      /** 动漫id */
      id: string
      /** 动漫状态（更新、完结...） */
      season: string
      /** 动漫名称 */
      title: string
    }[]
    /** 热门动漫 */
    hots: {
      results: {
        /** 封面 */
        cover: string
        /** 动漫id */
        id: string
        /** 动漫状态（更新、完结...） */
        season: string
        /** 动漫名称 */
        title: string
        /** 首发时间 */
        date: string
        /** 介绍 */
        description: string
      }[]
    }
    /** 完结日漫 */
    japancomic: {
      /** 封面 */
      cover: string
      /** 动漫id */
      id: string
      /** 动漫状态（更新、完结...） */
      season: string
      /** 动漫名称 */
      title: string
    }[]
    /** 最新更新 */
    latest: {
      /** 封面 */
      cover: string
      /** 动漫id */
      id: string
      /** 动漫状态（更新、完结...） */
      season: string
      /** 动漫名称 */
      title: string
    }[]
    /** 周更新列表 */
    perweek: {
      /** 周几（0-6）-更新的动漫列表 */
      [prop: number]: {
        /** 动漫id */
        id: string
        /** 动漫状态（更新、完结...） */
        season: string
        /** 动漫名称 */
        title: string
      }[]
    }
    /** 推荐动漫番外 */
    theatre_comic: {
      /** 封面 */
      cover: string
      /** 动漫id */
      id: string
      /** 动漫状态（更新、完结...） */
      season: string
      /** 动漫名称 */
      title: string
    }[]
  }
}
```

