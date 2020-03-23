# Sequelize

> 2020.03.19 @wsl

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



## 参考链接

官网：<https://sequelize.org/>

中文文档：<https://demopark.github.io/sequelize-docs-Zh-CN/>

sequelize api reference: <https://sequelize.org/master/index.html>

[使用Sequelize-廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)

