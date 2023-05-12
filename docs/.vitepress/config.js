/**
 * @Date         : 2020-10-14 15:53:33
 * @Description  : vueperss config
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-10-16 15:02:53
 */

import { defineConfig } from 'vitepress';
import getSliderbar from './sidebar'
const path = require('path')

const dirPath = path.resolve(__filename, '../../note')

const config = {
  title: "Qzr's Note",
  outDir: '../../dist',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Note', link: '/note/README.md' },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/HoldSworder" }],
    lastUpdatedText: "最近更新时间",
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebar: {
      '/note/': getSliderbar(dirPath)
    },
  },
  lastUpdated: true,  // 开启最近更新时间
}

export default defineConfig(config)