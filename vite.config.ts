import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import ElementPlus from 'unplugin-element-plus/vite'

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
    })
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
    terserOptions: {
      // 生产环境下移除console debugger
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
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
