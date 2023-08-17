/**
 * @Date         : 2020-10-14 15:53:33
 * @Description  : vueperss config
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2023-08-17 11:03:34
 */

import { defineConfig } from 'vitepress';
import getSliderbar from './sidebar'
import path from 'path'

const dirPath = path.resolve(__filename, '../../note')

export default defineConfig({
  title: "Qzr's Note",
  description: 'Just playing around.',
  outDir: '../dist',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Note', link: '/note/README.html' },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/HoldSworder" }],
    lastUpdatedText: "最近更新时间",
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebar: getSliderbar(dirPath),
    search: {
      provider: 'local'
    },
    editLink: {
			pattern: 'https://github.com/HoldSworder/note/',
			text: '在 GitHub 查看此页面',
		},
  },
  lastUpdated: true,  // 开启最近更新时间
})