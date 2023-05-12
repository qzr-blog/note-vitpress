const path = require('path')
const fs = require('fs')

function getSliderbar(originPath) {
  if (!fs.existsSync(originPath)) return

  const res = []
  const dirData = fs.readdirSync(originPath)

  for (const item of dirData) {
    const childPath = path.resolve(originPath, item)
    // if(filterFile(childPath, item)) return

    const childStats = fs.statSync(childPath)

    if (childStats.isDirectory()) {
      const fildDir = isFileDir(childPath) // 命中子文件没有文件夹情况 返回文件夹下唯一md文件
      if (fildDir !== '' && fildDir) {
        isFileHandle(fildDir, res)
      } else {
        const children = getSliderbar(childPath)

        if (children.length !== 0) {
          let target = {
            text: item,
            sidebarDepth: 0,
            items: children,
            collapsible: true,  // 菜单是否为可折叠的 
            collapsed: true,  // 是否默认折叠
          }

          const dirLink = getDirLink(childPath)
          if(dirLink) {
            target.link = '/' + dirLink
          }

          res.push(target)
        }
      }
    }

    if (childStats.isFile() && childPath.slice(-2) === 'md') {
      // isFileHandle(childPath, res)
    }
  }

  return res
}

function isFileHandle(childPath, res) {
  const extName = childPath.slice(-2)
  let noteName = ''

  if (extName !== 'md') return

  if (!fs.existsSync(childPath)) return

  let mdPath = childPath.slice(childPath.indexOf('docs') + 5).replace(/\\/g, '/')

  const fileName = mdPath.split('/').slice(-1)[0]

  const mdPathArr = mdPath.split('/')

  if (fileName === 'README.md' || fileName === 'readme.md') {
    noteName = mdPathArr[mdPathArr.length - 2]
  } else {
    noteName = mdPathArr[mdPathArr.length - 1].slice(0, -3)
  }

  res.push({
    link: '/' + mdPath,
    text: noteName,
  })
}

function isFileDir(dirPath) {
  if (!fs.existsSync(dirPath)) return

  const dirData = fs.readdirSync(dirPath)
  let mdFile = ''

  for (const item of dirData) {
    const childPath = path.resolve(dirPath, item)
    const stats = fs.statSync(childPath)

    if (stats.isDirectory()) {
      return false
    }

    if (item.slice(-2) === 'md') {
      mdFile = childPath
    }
  }

  return mdFile
}

function getDirLink(dirPath) {
  if (!fs.existsSync(dirPath)) return

  const dirData = fs.readdirSync(dirPath)
  for (const item of dirData) {
    const childPath = path.resolve(dirPath, item)
    const stats = fs.statSync(childPath)

    if (item.slice(-2) === 'md') {
      return childPath
    }
  }
}

function filterFile(dirItemPath, dirItem) {
  if (!fs.existsSync(dirItemPath)) return false
  const stat = fs.statSync(dirItemPath)

  if(stat.isDirectory()) return false

  if(stat.isFile()) {
    return !(/.md/g.test(dirItem))
  }

  return false
}

export default getSliderbar