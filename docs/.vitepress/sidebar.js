import path from 'path'
import fs from 'fs'

const BasePath = path.resolve(__filename, '../../')
/**
 * 递归将文件夹转化为树结构
 * @param {string} originPath
 * @returns {object} sliderbar树结构
 */
function getSliderbar(originPath) {
  if (!fs.existsSync(originPath)) return

  const res = []
  const dirData = fs.readdirSync(originPath)

  for (const item of dirData) {
    const childPath = path.resolve(originPath, item)
    if (filterFile(childPath, item)) continue

    const childStats = fs.statSync(childPath)

    if (childStats.isDirectory()) { // 判断是否是文件
      const children = getSliderbar(childPath)
      if (!fs.existsSync(childPath)) return
      const dirData = fs.readdirSync(childPath)
      
      if (dirData.length === 1 && dirData[0]) { // 文件夹下只有一个文件的情况
        const fileName = dirData[0]
        if (/read/i.test(fileName) && /md/i.test(fileName)) {
          const filePathArr = childPath.replace(/\\/g, '/').split('/')
          const name = filePathArr[filePathArr.length - 1]
          res.push({
            text: name,
            link: exportPath('/' + childPath + '/' + fileName),
          })
        }
      }
      
      if (dirData.length !== 1) { // 文件夹有多个文件 如果有README.md文件 就给文件夹link
        // console.log(dirData)
        if (children.length !== 0) {
          let target = {
            text: item,
            sidebarDepth: 0,
            items: children,
            collapsible: true, // 菜单是否为可折叠的
            collapsed: true, // 是否默认折叠
          }

          const dirLink = dirData.find((item) => item === 'README.md')
          if (dirLink) {
            target.link = exportPath('/' + childPath + '/README.md')
          }

          res.push(target)
        }else {
          res.push({
            link: exportPath('/' + childPath + '/README.md'),
            text: item,
          })
        }
      }
    }

    if (childStats.isFile()) {  // 普通md文件 非README情况
      const filePath = childPath.slice(childPath.indexOf('docs') + 5).replace(/\\/g, '/')
      const filePathArr = filePath.split('/')
      const fileName = filePathArr[filePathArr.length - 1]

      if (!(/read/i.test(fileName) && /md/i.test(fileName))) {
        res.push({
          link: '/' + filePath,
          text: fileName.replace('.md', ''),
        })
      }
    }
  }

  return res
}

/**
 * 过滤非.md文件
 * @param {string} dirItemPath
 * @param {string} dirItem
 * @returns {boolean}
 */
function filterFile(dirItemPath, dirItem) {
  if (!fs.existsSync(dirItemPath)) return false
  const stat = fs.statSync(dirItemPath)

  if (stat.isDirectory()) return false

  if (stat.isFile()) {
    return !/.md/g.test(dirItem)
  }

  return false
}

function exportPath(pathStr) {
  return path.relative(BasePath, pathStr)
}

export default getSliderbar
