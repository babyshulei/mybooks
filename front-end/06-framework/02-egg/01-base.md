# 基础功能

参见：<https://eggjs.org/zh-cn/intro/index.html>

## 目录结构

参见：<https://eggjs.org/zh-cn/basics/structure.html>

- `app/router.js` 用于配置 URL 路由规则，具体参见 [Router](https://eggjs.org/zh-cn/basics/router.html)。
- `app/controller/**` 用于解析用户的输入，处理后返回相应的结果，具体参见 [Controller](https://eggjs.org/zh-cn/basics/controller.html)。
- `app/service/**` 用于编写业务逻辑层，可选，建议使用，具体参见 [Service](https://eggjs.org/zh-cn/basics/service.html)。
- `app/middleware/**` 用于编写中间件，可选，具体参见 [Middleware](https://eggjs.org/zh-cn/basics/middleware.html)。
- `app/extend/**` 用于框架的扩展，可选，具体参见[框架扩展](https://eggjs.org/zh-cn/basics/extend.html)。
- `config/config.{env}.js` 用于编写配置文件，具体参见[配置](https://eggjs.org/zh-cn/basics/config.html)。
- `config/plugin.js` 用于配置需要加载的插件，具体参见[插件](https://eggjs.org/zh-cn/basics/plugin.html)。
- .......



## 定时任务

所有的定时任务都统一存放在 `app/schedule` 目录下，每一个文件都是一个独立的定时任务，可以配置定时任务的属性和要执行的方法。

demo：

```js
'use strict';

const moment = require('moment');
module.exports = {
    schedule: {
        interval: '60m', // 60分钟间隔
        type: 'worker' // 指定一个 worker 执行
    },
    async task(ctx) {
        ctx.helper.getExpData(ctx, [ moment().subtract(1, 'days').format('YYYYMMDD') ]);
    }
};
```

### 任务

- `task` 或 `subscribe` 同时支持 `generator function` 和 `async function`。
- `task` 的入参为 `ctx`，匿名的 Context 实例，可以通过它调用 `service` 等。

### 定时方式

定时任务可以指定 interval 或者 cron 两种不同的定时方式。

- interval：每间隔指定的时间执行一次任务。可赋值为数字类型、字符类型。

  - 数字类型，单位为毫秒数。
  - 字符类型，会通过 [ms](https://github.com/zeit/ms) 转换成毫秒数。如 5s, 10m, 1h, 2d

- cron：`schedule.cron` 参数来配置定时任务的执行时机，定时任务将会按照 cron 表达式在特定的时间点执行。cron 表达式通过 [cron-parser](https://github.com/harrisiirak/cron-parser) 进行解析。

  - 格式：`'* * * * * *'`。分别对应：second, minite, hour, day, month, week。

    例如：`cron: '* * 9/21 * * *'`表示任务在9/21时执行。

### 类型

框架提供的定时任务默认支持两种类型，worker 和 all。worker 和 all 都支持上面的两种定时方式，只是当到执行时机时，会执行定时任务的 worker 不同：

- `worker` 类型：每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的。
- `all` 类型：每台机器上的每个 worker 都会执行这个定时任务。

### 其他参数

除了刚才介绍到的几个参数之外，定时任务还支持这些参数：

- `cronOptions`: 配置 cron 的时区等，参见 [cron-parser](https://github.com/harrisiirak/cron-parser#options) 文档
- `immediate`：配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
- `disable`：配置该参数为 true 时，这个定时任务不会被启动。
- `env`：数组，仅在指定的环境下才启动该定时任务。

### 执行日志

执行日志会输出到 `${appInfo.root}/logs/{app_name}/egg-schedule.log`，默认不会输出到控制台，可以通过 `config.customLogger.scheduleLogger` 来自定义。

