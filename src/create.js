// create 的所有逻辑
// 创建一个项目 拉去项目 让用户选择并安装

// 可能还需要用户配置一些数据，来渲染我们的项目
const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')
const { downloadDirectory } = require('./constant')
let downloadGitRepo = require('download-git-repo')
let ncp = require('ncp')
const { promisify } = require('util')
const path = require('path')

downloadGitRepo = promisify(downloadGitRepo)
ncp = promisify(ncp)
// 封装loading效果
const waitFnLoading = (fn, message) => async (...args) {
    const spinner = ora(message)
    spinner.start()
    let result = await fn(...args)
    spinner.succeed()
    return result
}
const download = (repo, tag) => {
    const api = `zhucli/${repo}`
    // 
    let dest = `${downloadDirectory}/${repo}` 
    await  downloadGitRepo(api, dist)
    return dest
}

const fetchRepoList = async () => {
    let { data } = await axios.get('')
    return data

module.exports =async projectName => {
    // 1.获取项目的所有模板
   let repos = await waitFnLoading(fetchRepoList, 'fetching template ...')()
    repos = repos.map(v => v.name)
    const {repo} = await Inquirer.prompt({
        name: 'repo',
        type: 'list',
        message: 'please choise a template project',
        choices: repos
    })
    // 1.简单的模板
    let result = await waitFnLoading(download(repo), 'download')
    // 拷贝
    // 判断是否存在项目名字 若存在则提示

    await ncp(result, path.resolve(projectName))
    // 2.复杂的模板

}