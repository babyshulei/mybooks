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

### 日志分类

- 性能监控
  - 接口日志
  - 页面性能日志
  - ……
- 错误报警
  - 接口报错
  - HDFS读取出错
  - 页面报错
  - ……

- 统计日志
  - 访问统计日志 PV/UV
  - 自定义上报
  - ……

### 日志上报带来的问题

日志上报最终是为了服务业务，监控业务的运行状态，一般而言前端运行的场景中开发者最期望监控的不外乎**页面&API请求是否正常响应**和**页面js逻辑是否正常执行**。

随着前端业务的壮大,日志监控上报的量会快速增加，监控的逻辑也会越来越复杂，而在生产环境中，**前端监控的最基本原则是日志获取和上报本身不能抛出异常或者影响页面性能**。

浏览器的兼容性，前端业务逻辑依赖，日志上报方式，日志上报效率，用户操作习惯，网络环境等因素都可能让日志上报产生问题甚至影响业务。这些因素会给日志上报带来可靠和性能两方面的问题。

1、可靠性问题

- 兼容性：不同端和浏览器中，兼容性是不同的，例如fetch方法方法是否可用，页面性能(performance)计算是否可以使用NT2标准，等等。需要考虑日志获取逻辑和上报方法是否兼容各个宿主环境，防止上报逻辑本身报错污染业务日志统计。
- 上报可靠性：日志丢失问题，如网络问题引起日志采集sdk无法加载或初始化滞后、用户频繁操作和关闭页面都可能造成数据漏报。

2、性能问题

在一个复杂站点中，这些日志数据可能会非常多，上报可能会因为浏览器并发数量的限制阻塞业务的网络请求，或者影响页面性能。



## 整体流程

1、数据采集

- 主动上报，HTTP传输。
- 被动上报，写入服务器硬盘目录，服务器自行采集。

2、数据消费

- ELK
  - Talos + Elasticsearch +  Kibana
  - 集成⽇志数据的检索/分析，以及聚合数据进⾏展示
- Falcon
  - 报警，展示，⾃定义监控，实例监控
- Sentry
- Turnoil

3、数据展示

- kibana、 falcon、 sentry、 turnoil、 Grafana
  - 各监控平台都会配套数据展示功能
  - 不同的平台数据展示的维度、粒度不尽相同
  - 实际开发中，需要多个展示平台协同⼯作

4、监控报警



## 日志工具

### ELK

ELK 是 ElasticSearch + Logstash + Kibana 这套组合工具的简称，是一个常用的日志系统。

- ElasticSearch：是一款开源的基于 Lucene 之上实现的一个分布式搜索引擎，也是一个存储引擎（例如：日志），它的特点有：分布式、零配置、自动发现、索引自动分片、索引副本机制、Restful 风格的接口、多数据源和自动搜索负载等。
- Logstash：是一款开源的日志收集工具，它可以对日志进行收集、分析、过滤，并将其存储（例如：ElasticSearch）起来供以后使用。
- Kibana：是一款开源的可视化工具，可以为 ElasticSearch 提供的日志分析友好的 Web 界面，可以汇总、分析和搜索重要的数据日志。

分析：

- 需要自己进行日志上报流程的配置，数据上报-消费-展示，如talos topic, hive, elastic index等
- 需要自己设计日志监控系统、日志格式
- 功能强大，扩展性好，但是开发量较大，不够“自动”
- 适合自定义打点的上报

### Sentry

Sentry 是一个开源的实时错误日志收集平台。引入sdk，可以自动收集、手动收集错误，并定位异常。

- 客户端只需引入sdk进行相关配置，上报错误信息给服务端即可，接入相对简单
- sentry提供数据展示、邮件报警
- 适合错误数据的采集与处理

### Grafana

[Grafana](https://github.com/grafana/grafana) 是一个使用 Go 语言开发的开源的、功能齐全的、漂亮的仪表盘和图表的编辑器，可用来做日志的分析与展示曲线图（如 api 的请求日志），支持多种 backend，如 ElasticSearch、InfluxDB、OpenTSDB 等等。

### SkyWalking

SkyWalking是分布式系统的应用程序性能监视工具，专为微服务、云原生架构和基于容器（Docker、K8S、Mesos）架构而设计。

SkyWalking是观察性分析平台和应用性能管理系统。提供分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。

- 开源，分布式APM跟踪

### Elastic APM

开源应用程序性能监测，分布式跟踪



### egg日志

log日志：<https://eggjs.org/zh-cn/core/logger.html>

egg-logger：<https://github.com/eggjs/egg-logger>

错误处理：<https://github.com/eggjs/egg-onerror>



## 参考链接

[知乎-最佳日志实践（v2.0）](https://zhuanlan.zhihu.com/p/27363484)

[Elastic APM-node日记](https://www.bookstack.cn/read/node-in-debugging/5.2ElasticAPM.md)

[如何优雅地上报前端监控日志- 前端- 掘金](https://juejin.im/entry/5bce9614f265da0aa81c3775)

[ELK](https://www.bookstack.cn/read/node-in-debugging/6.3ELK.md)

[主流数据搜索平台介绍- Tech For Fun](http://kaelzhang81.github.io/2018/07/31/主流数据搜索平台介绍/)

[Sentry介绍与使用- 掘金](https://juejin.im/post/5ea7cd416fb9a0435749baf0)

[Elastic APM](https://www.bookstack.cn/read/node-in-debugging/5.2ElasticAPM.md)

[Telegraf + InfluxDB + Grafana](https://www.bookstack.cn/read/node-in-debugging/7.1TelegrafInfluxDBGrafana1.md)

[APM系统SkyWalking介绍](https://juejin.im/post/5d2bd2dfe51d45773f2e8ff3)

[使用Elastic APM做应用性能监控](https://cloud.tencent.com/developer/article/1543781)

