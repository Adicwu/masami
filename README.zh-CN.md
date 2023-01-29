<p align="center">
    <img alt="logo" src="https://api.adicw.cn/static/logo/comic-pc.png" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Masami</h1>

<p align="center">一个仅供学习自用的PC端动漫视频网站</p>

---

## 构建

建议使用 `yarn` 或 `pnpm` 进行依赖安装，下面以 `yarn` 举例：

```bash
yarn            # install
yarn run dev    # dev
yarn run build  # build
```

## 技术栈

- 👆 Vue3 + Pinia
- 🌍 Vite
- 💪 TypeScript
- 🍭 Less
- 📖 VideoJs
- 🌷 ElementPlus
- 🍀 Iconfont

## 功能

- 首页推荐（热门、更新、新番动态、其他推荐）
- 搜索
- 多源播放
- 记录（历史、进度、追番）
- 自定义主题
- 可变动数据源
- pixiv 图片搜索

## 播放器功能

- 播放暂停、下一集、倍数播放、快进快退、音量控制、网页全屏与全屏、画中画、进度（展示、切换、拖拽、实时进度选择画面小图、已缓冲刻度展示）、缓冲展示、视频状态信息提示、键盘交互控制

## 特色组件

- 实体拖拽
- 瀑布流虚拟列表
- 多组件缓存
- CURD 列表动画
- 各种动画组件

## 浏览器支持

此项目使用了过多新特性，且暂未做兼容性处理
建议使用最新版的 chrome 内核的浏览器，如`Chrome`、`Edge`

## 使用指南

> 注意，由于此网站的接口数据是爬虫抓取的，所以暂不提供接口，需自己搭建或寻找接口；本指南只提供接口格式，如下

[后端接口文档](https://gitee.com/adicwu/comic-pc/wikis/pages)

1. 进入`src/api/index.ts`文件下
2. 将其内部方法更换为自己的后端接口，要求：只改变方法体，遵从`传入参数`和`返回参数`的格式

## 浏览

- [在线地址](http://comic.adicw.cn/)

## 核心成员

| [![Adicwu](https://avatars.githubusercontent.com/u/40051597?s=80)](https://github.com/Adicwu/) | [![Loid](https://avatars.githubusercontent.com/u/19285429?s=80&v=4)](https://github.com/1oid/) |
| :--------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: |
|                              [AdicWu](https://github.com/Adicwu)                               |                                [Loid](https://github.com/1oid)                                 |

## 实图展示

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6448089fcb44889a08e8ec50594deea~tplv-k3u1fbpfcp-watermark.image?)

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d9fe45a7d9648739261ed74f2251988~tplv-k3u1fbpfcp-watermark.image?)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a72485c459ad40a697b5de7e78d1cf4a~tplv-k3u1fbpfcp-watermark.image?)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a518e8edb354d83bb261ec01715ce3a~tplv-k3u1fbpfcp-watermark.image?)

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d259568c5b14a28a8ddce6cdc557106~tplv-k3u1fbpfcp-watermark.image?)
