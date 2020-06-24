# Elastic APM

## 介绍

APM: Application Performance Monitoring

### 基本组件

构成：

- APM agents
- APM Server
- Elasticsearch
- Kibana APM UI

![1590733869865](C:/Users/94046/Desktop/learn/%E6%97%A5%E5%BF%97%E7%9B%91%E6%8E%A7/images/APM.png)

### APM

#### 事件（event）

APM agent从其已监测的应用程序中捕获不同类型的信息，称为事件。事件可以是Errors，Spans或Transactions。然后将这些事件流式传输到APM server，由server验证并处理事件。

- Errors 包含捕获的错误或异常的相关信息。
- Spans包含已执行的特定代码路径的相关信息。它们从活动的开始到结束进行测量，并且可以与其他跨度建立父/子关系。
- Transactions是一种特殊的跨度，具有与之关联的额外元数据。您可以将Transactions视为您在服务中衡量的最高级别的工作。例如，提供HTTP请求或运行特定的后台作业。



## 项目引入

### vue

安装 @elastic/apm-rum-vue 插件，在main.js里面初始化apm，在组件中可以使用apm实例。

参考：<https://www.elastic.co/guide/en/apm/agent/rum-js/master/vue-integration.html>

### egg

```bash
npm install elastic-apm-node --save
```

在app.js初始化apm。config 添加 usePathAsTransactionName: true，解决egg的path解析不了的问题。

参考：

<https://www.elastic.co/guide/en/apm/agent/nodejs/current/koa.html>

loader顺序：<https://eggjs.org/zh-cn/advanced/loader.html>

demo：<https://code.yeezon.com/zen/egg-apm>



## 自定义上报

### 错误捕获

```js
apm.captureError(error[, options][, callback])
```

参见：<https://www.elastic.co/guide/en/apm/agent/nodejs/master/agent-api.html#apm-capture-error>

#### egg自动捕获

在打印错误日志时进行捕获

```js
const { Transport } = require('egg-logger');

class ApmErrorTransport extends Transport {
    constructor(options, apm) {
        super(options);
        this.apm = apm;
    }

    log(_level, args) {
        if (!args[0]) {
            return;
        }
        this.apm.captureError(args[0]); // 上传到apm
    }
};

app.beforeStart(async () => {
    // 将APM实例挂载到application对象上面。可用于内部手动上报日志。
    app.apm = apm;
    // 设置错误日志的传输通道。所有logger.error的错误，都会发送到APM上面。
    app.getLogger('errorLogger').set('apmError', new ApmErrorTransport({ level: 'ERROR' }, apm));
});
```



### 自定义transactions

```js
var trans = apm.startTransaction(name, type);

// ...
callback((err) => {
    trans.result = err ? 'error' : 'success';
});

trans.end();
```

node端：

<https://www.elastic.co/guide/en/apm/agent/nodejs/master/custom-transactions.html>

<https://www.elastic.co/guide/en/apm/agent/nodejs/master/transaction-api.html>

rum端（前端）：

<https://www.elastic.co/guide/en/apm/agent/rum-js/master/custom-transactions.html>

<https://www.elastic.co/guide/en/apm/agent/rum-js/master/transaction-api.html>



### 自定义spans

```js
var span = apm.startSpan('receiving body');

// ...

if (span) span.end();
```

node端：

<https://www.elastic.co/guide/en/apm/agent/nodejs/master/custom-spans.html>

<https://www.elastic.co/guide/en/apm/agent/nodejs/master/span-api.html>

rum端（前端）：

<https://www.elastic.co/guide/en/apm/agent/rum-js/master/agent-api.html#apm-start-span>

<https://www.elastic.co/guide/en/apm/agent/rum-js/master/span-api.html>

![1592570212053](..\images\custom-apm.png)

## 参考链接

[介绍](https://www.elastic.co/guide/en/apm/index.html)

<https://www.elastic.co/cn/apm>

[与Elastic APM 集成的问题· Issue #2706 · eggjs/egg · GitHub](https://github.com/eggjs/egg/issues/2706)

[elastic-apm-node 扩展篇—— Egg | Claude's Blog](http://claude-ray.com/2019/07/12/elastic-apm-node-egg/)

[最佳日志实践（v2.0）](https://zhuanlan.zhihu.com/p/27363484)

[[RFC] egg-opentracing](https://github.com/eggjs/egg/issues/39)

[如何更优雅的使用egg的日志体系？](https://github.com/eggjs/egg/issues/2006)

[史上最强egg框架的error处理机制_网络_process的博客-CSDN ...](https://blog.csdn.net/qq_33589252/article/details/84350064)

[elasticsearch APM功能全解 一](https://blog.csdn.net/u013613428/article/details/86667240)

[webpack config sourcemap](https://www.webpackjs.com/configuration/devtool/)

[javascript - 如何让webpack能够生成sourcemap，从而方便调试 ...](https://segmentfault.com/q/1010000008889633)

[使用Elastic APM做应用性能监控](https://cloud.tencent.com/developer/article/1543781)

