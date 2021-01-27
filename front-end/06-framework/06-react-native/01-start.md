# 入门

## 简介

React Native 是由 Facebook 公司于 2015 年开发并发布的。它是一套开源跨平台应用程序开发框架，适用于移动及 Web 等多种应用程序项目。



## 搭建环境

参见：[搭建开发环境 - 官网](https://reactnative.cn/docs/environment-setup)

安装依赖：Node、JDK 和 Android Studio。

### 创建新项目

```shell
npx react-native init AwesomeProject
```

### 编译并运行应用

```shell
cd AwesomeProject
yarn android
# 或者
yarn react-native run-android
```



## 开发流程

### 在设备上运行

参见：https://reactnative.cn/docs/running-on-device

### 调试

可以通过摇晃设备或是选择 iOS 模拟器的"Hardware"菜单中的"Shake Gesture"选项来打开开发菜单。

#### Reload

刷新页面。

注意：只有修改 **JavaScript** 文件时，刷新功能才起作用。如果新增了文件或者修改了 **Native** 代码，就需要使用 **Xcode** 重新编译应用了。

#### Enable Live Reload

该功能主要用来实现自动刷新。当我们将实时加载启用后，如果应用中的 **JavaScript** 代码有任何修改，它都会自动帮我们更新，不需要人为去操作刷新功能。

#### Enable Hot Reloading

启用热加载，同样是实现页面的自动刷新。

热加载的思想是运行时动态注入修改后的文件内容，同时不中断 **APP** 的正常运行。这样，我们就不会丢失 **APP** 的任何状态信息，尤其是 **UI** 页面栈相关的。

> **热加载（Hot Reloading）与上面提到的实时加载（Live Reload）最关键的区别：**
>
> （1）实时加载应用更新时需要刷新当前页面，可以看到明显的全局刷新效果。
>
> （2）而热加载基本上看不出刷新的效果，类似于局部刷新。

#### Show Inspector

可以很方便的查看到当前选中元素的位置、样式、层级关系、盒子模型信息等等。方便我们快速定位问题。

同时还提供了监控应用性能的功能。

例如





## 核心组件与原生组件

### 原生组件

在 Android 开发中是使用 Kotlin 或 Java 来编写视图；在 iOS 开发中是使用 Swift 或 Objective-C 来编写视图。在 React Native 中，则使用 React 组件通过 JavaScript 来调用这些视图。在运行时，React Native 为这些组件创建相应的 Android 和 iOS 视图。由于 React Native 组件就是对原生视图的封装，因此使用 React Native 编写的应用外观、感觉和性能与其他任何原生应用一样。我们将这些平台支持的组件称为**原生组件**。

React Native 还包括一组基本的，随时可用的原生组件，您可以使用它们来构建您的应用程序。这些是 React Native 的**核心组件**。

## 设计

### 样式

RN建议使用`StyleSheet.create`来集中定义组件的样式。常见的做法是按顺序声明和使用`style`属性，以借鉴 CSS 中的“层叠”做法。

示例：

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LotsOfStyles = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default LotsOfStyles;
```

### 宽高

指定宽高：

最简单的给组件设定尺寸的方式就是在样式中指定固定的`width`和`height`。React Native 中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。

弹性（Flex）宽高：

在组件样式中使用`flex`可以使其在可利用的空间中动态地扩张或收缩。一般而言我们会使用`flex:1`来指定某个组件扩张以撑满所有剩余的空间。如果有多个并列的子组件使用了`flex:1`，则这些子组件会平分父容器中剩余的空间。如果这些并列的子组件的`flex`值不一样，则谁的值更大，谁占据剩余空间的比例就更大（即占据剩余空间的比等于并列组件间`flex`值的比）。

百分比宽高：

可以使用百分比设置宽高`width`和`height`。类似flex维度，百分比是以父级宽高为参照的。

### 图片

参见：https://reactnative.cn/docs/images

### 颜色

参见：https://reactnative.cn/docs/colors



## 交互

### 触摸事件

- Button 组件
  - onPress
- Touchable系列组件：TouchableOpacity、TouchableNativeFeedback、TouchableHighlight、TouchableWithoutFeedback
  - onPress
  - onLongPress：长按
- [滚动](https://reactnative.cn/docs/using-a-scrollview)：ScrollView 组件、FlatList组件

事件参数参见：https://reactnative.cn/docs/gesture-responder-system

### 导航

- [react-navigation](https://reactnavigation.org/)
- [react-native-navigation](https://github.com/wix/react-native-navigation)

### 动画

React Native 提供了两个互补的动画系统：用于创建精细的交互控制的动画[`Animated`](https://reactnative.cn/docs/animations#animated-api)和用于全局的布局动画[`LayoutAnimation`](https://reactnative.cn/docs/animations#layoutanimation-api)。



## 参考链接

[react-native-cli | npm](https://www.npmjs.com/package/react-native-cli)

[react-native | bilibili](https://www.bilibili.com/video/BV1nE411N7js?p=1)

[React Native - 调试技巧及调试菜单说明](https://www.hangge.com/blog/cache/detail_1480.html)

[React Native调试技巧与心得](https://github.com/crazycodeboy/RNStudyNotes/blob/master/React Native调试技巧与心得/React Native调试技巧与心得.md)

