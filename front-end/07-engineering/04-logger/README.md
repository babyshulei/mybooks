# 日志监控

>  日志是系统的脉象，监控就是望闻问切。

为什么需要日志监控？

- 线上异常记录及统计
- 了解线上系统的运行状态
- 快速定位线上问题
- 对潜在问题进行预警，对已暴露问题及时报警
- 挖掘产品潜力
- ……



## 日志的级别

- TRACE
- DEBUG
- INFO
- WARN
- ERROR
- FATAL



## 日志设计

日志分类

- 性能监控
  - 接口日志
  - 前端性能监控
  - ……
- 错误报警
  - 接口报错
  - HDFS读取出错
  - 前端报错
  - ……

### egg日志

log日志：<https://eggjs.org/zh-cn/core/logger.html>

egg-logger：<https://github.com/eggjs/egg-logger>

错误处理：<https://github.com/eggjs/egg-onerror>



## 整体流程

- 数据采集
  - 主动上报，HTTP传输。
  - - Falcon
  - 被动上报，写入服务器硬盘目录，服务器自行采集。
  - - LcsAgent(Talos)
    - - 文件传输
      - Thrift传输
      - HTTP传输
      - OceanDir传输
- 数据消费
  - ELK
  - - Talos + Elasticsearch +  Kibana
    - 集成⽇志数据的检索/分析，以及聚合数据进⾏展示
  - Falcon
  - - 报警，展示，⾃定义监控，实例监控
  - Sentry
  - Turnoil
- 数据展示
  - kibana、 falcon、 sentry、 turnoil、 Grafana
    - 各监控平台都会配套数据展示功能
    - 不同的平台数据展示的维度、粒度不尽相同
    - 实际开发中，需要多个展示平台协同⼯作
- 监控报警

### 整体流程图

![img](C:/Users/94046/Desktop/learn/%E6%97%A5%E5%BF%97%E7%9B%91%E6%8E%A7/images/elk%E7%9B%91%E6%8E%A7.png)

ELK，俗称日志分析3剑客，是 Elasticsearch + logstash + kibana 的简称



## 日志工具

**日志上报**

- [koa-await-breakpoint](https://www.bookstack.cn/read/node-in-debugging/6.1koa-await-breakpoint.md)
- [Async Hooks](https://www.bookstack.cn/read/node-in-debugging/6.2async_hooks.md)
- [ELK](https://www.bookstack.cn/read/node-in-debugging/6.3ELK.md)
- [OpenTracing + Jaeger](https://www.bookstack.cn/read/node-in-debugging/6.4OpenTracingJaeger.md)
- [Sentry](https://www.bookstack.cn/read/node-in-debugging/6.5Sentry.md)

**APM**

- [NewRelic](https://www.bookstack.cn/read/node-in-debugging/5.1NewRelic.md)
- [Elastic APM](https://www.bookstack.cn/read/node-in-debugging/5.2ElasticAPM.md)

**监控**

- [Telegraf + InfluxDB + Grafana](https://www.bookstack.cn/read/node-in-debugging/7.1TelegrafInfluxDBGrafana1.md)



## 参考链接

[知乎-最佳日志实践（v2.0）](https://zhuanlan.zhihu.com/p/27363484)

[Elastic APM-node日记](https://www.bookstack.cn/read/node-in-debugging/5.2ElasticAPM.md)

