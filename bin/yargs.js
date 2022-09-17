#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers")
const dedent = require('dedent');

const pkg = require("../package.json");

const context = {
    cliVersion: pkg.version,
}

yargs()
.usage('Usage: first-cli [commend] <options>')
.demandCommand(1, '[commend] 缺失， 输入 --help 查询')
.strict()
.recommendCommands()
.fail((err, msg) => {
    
    console.log('fail: ', err, msg)
})
.alias('h', 'help')
.alias('v', 'version')
.wrap(yargs(hideBin(process.argv)).terminalWidth())  // 返回当前控制台的宽度
.epilogue('感谢使用小石头牌脚手架')
.options({
    debug: {
        type: 'boolean',
        describe: '启动 debug 模式',
        alias: 'D'
    }
})
.option('registry', {
    type: 'string',
    describe: '注册',
    alias: 'R'
})
.group(['debug'], '开发调试：')
.command('init [name]', '创建一个新项目', yargs => {
    yargs.option('name', {
        type: 'string',
        describe: '项目名称',
        default: '小石头',
        alias: 'n'
    });
}, argv => {
    console.log('argv: ', argv)
})
.command({
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: '项目列表',
    builder: yargs => {},
    handler: argv => { console.log('list argv: ', argv)},
})
.parse(process.argv.slice(2), context);