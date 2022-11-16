import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import viteImportToCdn from 'vite-plugin-cdn-import'
import ElementPlus from 'unplugin-element-plus/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  assetsInclude: ['**/*.moc', '**/*.mtn'],
  plugins: [
    vue(),
    ElementPlus(),
    // 代码压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // 生成环境，依赖抽离为cdn
    viteImportToCdn({
      modules: [
        {
          name: 'video.js',
          var: 'videojs',
          path: 'https://cdn.bootcdn.net/ajax/libs/video.js/7.21.0/video.min.js'
        },
        {
          name: 'moment',
          var: 'moment',
          path: 'https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.4/moment.min.js'
        }
      ]
    }),
    // 打包结果分析（会在打包成功后，根目录生成stats.html文件）
    visualizer()
  ],
  resolve: {
    // 路径别名配置
    alias: {
      '~styles': path.resolve('./src/assets/css'),
      static: path.resolve('./src/assets'),
      '@apis': path.resolve('./src/api'),
      '@comps': path.resolve('./src/components'),
      '@': path.resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      // 全局less配置
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            'src/assets/css/util.less'
          )}";`
        },
        javascriptEnabled: true
      }
    },
    // 用于解决 warning: "@charset" must be the first rule in the file
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove()
              }
            }
          }
        }
      ]
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        main: path.resolve(__dirname, 'main.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        }
      }
    }
  },
  server: {
    port: 1007
  }
})
