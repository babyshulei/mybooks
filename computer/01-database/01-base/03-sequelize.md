# Sequelize

在一些较为复杂的应用中，我们可能会需要一个 ORM 框架来帮助我们管理数据层的代码。而在 Node.js 社区中，[sequelize](http://docs.sequelizejs.com/) 是一个广泛使用的 ORM 框架，它支持 MySQL、PostgreSQL、SQLite 和 MSSQL 等多个数据源。

## 模型

### 模型定义

在 Sequelize 中可以用两种等效的方式定义模型：

- 调用 [`sequelize.define(modelName, attributes, options)`](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-define)
- 扩展 [Model](https://sequelize.org/master/class/lib/model.js~Model.html) 并调用 [`init(attributes, options)`](https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init)

### 数据类型

字符串（STRING）、布尔（BOOLEAN）、数字（INTEGER, BIGINT, FLOAT, DOUBLE）、日期（DATE）……



## 查询

<https://demopark.github.io/sequelize-docs-Zh-CN/models-usage.html>

<https://demopark.github.io/sequelize-docs-Zh-CN/querying.html>

### 复合查询

```js
Model.findAll({
	// 要查询属性
	attributes: ['aaa', 'bbb'],
	// 过滤查询条件
	where: {
		.....
	},
	// 分页/限制
	offset: 10, // 跳过10个实例
	limit: 10 // 获取10个实例/行
});
```

在数据库中搜索多个元素,返回数据和总计数：（结合了findAll和count）

```js
Model.findAndCountAll({
	// query和findAll相同
});
```

成功会返回两个属性的对象：

```js
{
	count, // 一个整数,总数记录匹配where语句和关联的其它过滤器
	rows // 一个数组对象,记录在limit和offset范围内匹配where语句和关联的其它过滤器
}
```

### 查找特定元素

```js
Project.findByPk(id).then(); // 通过id查找
Project.findOne({query}).then(); // 通过query查找，返回查找到的第一个条目
```



### 分组聚合

#### SQL中的分组查询

SQL查询中，通`GROUP BY`语名实现分组查询。`GROUP BY`子句要和聚合函数配合使用才能完成分组查询，在`SELECT`查询的字段中，如果没有使用聚合函数就必须出现在`ORDER BY`子句中。分组查询后，查询结果为一个或多个列分组后的结果集。

**GROUP BY语法**

```mysql
SELECT 列名, 聚合函数(列名)
FROM 表名
WHERE 列名 operator value
GROUP BY 列名 
[HAVING 条件表达式] [WITH ROLLUP]
```

在以上语句中：

- `聚合函数` - 分组查询通常要与聚合函数一起使用，聚合函数包括：
  - `COUNT()`-用于统计记录条数
  - `SUM()`-用于计算字段的值的总和
  - `AVG()`-用于计算字段的值的平均值
  - `MAX`-用于查找查询字段的最大值
  - `MIX`-用于查找查询字段的最小值
- `GROUP BY`子名-用于指定分组的字段
- `HAVING`子名-用于过滤分组结果，符合条件表达式的结果将会被显示
- `WITH ROLLUP`子名-用于指定追加一条记录，用于汇总前面的数据

#### Sequelize中的分组查询

Sequelize提供了聚合函数，可以直接对模型进行聚合查询：

- [`[aggregate(field, aggregateFunction, [options])`](http://itbilu.com/nodejs/npm/V1PExztfb.html#api-aggregate) -通过指定的聚合函数进行查询
- [`sum(field, [options])`](http://itbilu.com/nodejs/npm/V1PExztfb.html#api-sum)-求和
- [`count(field, [options])`](http://itbilu.com/nodejs/npm/V1PExztfb.html#api-count)-统计查询结果数
- [`max(field, [options])`](http://itbilu.com/nodejs/npm/V1PExztfb.html#api-max)-查询最大值
- [`min(field, [options])`](http://itbilu.com/nodejs/npm/V1PExztfb.html#api-min)-查询最小值

以上这些聚合函数中，可以通过`options.attributes`、`options.attributes`属性指定分组相关字段，并可以通过`options.having`指定过滤条件，但没有直接指定`WITH ROLLUP`子句的参数。

```js
const list = await ctx.model.UserRoute.findAll({
    attributes: [
        'date',
        'client_version',
        [sequelize.fn('sum', sequelize.col('new_user_cnt')), 'new_user_cnt'],
        [sequelize.fn('sum', sequelize.col('cohort_user_cnt_day1')), 'cohort_user_cnt_day1'],
    ],
    where: query,
    group: 'client_version',
    order: [
        [sequelize.fn('sum', sequelize.col('new_user_cnt')), 'DESC'],
    ],
    raw: true,
});
```



## 联表查询







## 参考链接

官网：<https://sequelize.org/>

中文文档：<https://demopark.github.io/sequelize-docs-Zh-CN/>

sequelize api reference: <https://sequelize.org/master/index.html>

[使用Sequelize-廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)

[IT笔录-sequelize中文API文档](https://itbilu.com/nodejs/npm/V1PExztfb.html)

[在EggJS中使用Sequelize做联表查询- 掘金](https://juejin.im/post/5cd7da8e51882568b5358a91)

