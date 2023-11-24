const fs = require('fs')
const path = require('path')

const packagePath = path.join(__dirname, '..', 'package.json')
const packageConfig = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))

packageConfig.main = './dist/entry.js'

fs.writeFileSync(packagePath, JSON.stringify(packageConfig, null, 2))

const entryPath = path.join(__dirname, '.', 'entry.js')
const targetPath = path.resolve(__dirname, '..', packageConfig.main)

fs.copyFileSync(entryPath, targetPath)
