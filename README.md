[![npm][npm-image]][npm-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/pmnps-plugin.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/pmnps-plugin
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

# pmnps-plugin

`pmnps` is a monorepo tool, it uses `npm workspaces` to manage packages and platforms. This project is created to define plugin interfaces to `pmnps`.

## Install

```
$ npm install pmnps-plugin --save-dev
```

## How to define a plugin

In `pmnps@2.0.0`, it will open `refresh action` for plugins, so, we can add a plugin to it.

```typescript
import {Project,Tools} from 'pmnps-plugin';

export default (proj:Project,tool:Tools)=>{
    return {
        // declare which action you want add plugin to.
        refresh: {
            // run before `refresh action`
            async before(){
                const {
                    // package.json object in root
                    root:rootPackageJson,
                    // package.json objects in every package, it is an array.
                    packages:packagePackageJsons,
                    // package.json objects in every platforms, it is an array.
                    platforms:platformPackageJsons
                } = await proj.packageJsons();
                // do things......
                tool.message.warn('Something is in danger');
                tool.message.info('Every thing is ok');
                return true; // return false will stop the action
            },
            // run after `refresh action`
            async after(){
                const {
                    root:rootPackageJson,
                    packages:packagePackageJsons,
                    platforms:platformPackageJsons
                } = await proj.packageJsons();
                // do things......
                tool.message.warn('Something is in danger');
                tool.message.info('Every thing is ok');
                return true; // return false will stop the action
            }
        }
    }
}
```

## How to use plugin

Config the `.pmnpsrc.json` file.

```
{
    "workspace":"workspace",
    "git":true,
    "lock":true,
    "plugins":[
        "my-pmnps-plugin"
    ]
}
```

## Finally

This document is not a complete one, we will complete it at `pmnps@2.1.0`.


