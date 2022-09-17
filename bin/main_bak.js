#!/usr/bin/env node

const process = require("process");
const lib = require('create-xiaoshitou-lib');

let [command, option, ...params] = process.argv.slice(2)

if (command) {
    if (typeof lib[command] === 'function') {
        lib[command](dealOption(option), params);
    } else if (typeof lib[dealCommand(command)] !== 'undefined') {
        console.log(lib[dealCommand(command)]);
    } else {
        console.log('无效的命令 + 1');
    }
} else {
    console.log('请输入命令');
}

function dealOption(option) {
    if (!option) {
        return '';
    }
    return option.replace(/^\-+/g, '');
}

function dealCommand(command) {
    if (/^\-+/g.test(command)) {
        return command.replace(/^\-+/g, '');
    }

    return command;
}