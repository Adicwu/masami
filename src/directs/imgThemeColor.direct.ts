// import { DirectiveBinding, ObjectDirective } from 'vue'
// import { readImgThemeColor } from '@/utils/reader/img'
// /**
//  * 颜色主题获取设置
//  * @pamam 图片地址，如果不传，则默认使用绑定节点的src属性
//  * @result 如果读取成功，则在其绑点节点生成--theme-color变量；失败不进行操作
//  */
// export default {
//   async mounted(el: HTMLImageElement, binding: DirectiveBinding) {
//     const src = binding.value ? binding.value : el.src
//     if (!src) return
//     const rgb = await readImgThemeColor(src)
//     el.style.setProperty('--theme-color', rgb)
//   }
// } as ObjectDirective
