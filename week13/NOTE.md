# 学习笔记
## Questions
### transition vs transform?
简单来说，transition描述一个过程，transform描述一个结果。transform描述一个物体在xyz三维内的形变。transition则是观察某个特定的属性（或全部属性）是否改变，若改变则按照一个给定的过程来使这个改变过程由瞬间完成变成渐变完成。这个特定的属性可以刚好是transform，也可以是一些其他的属性，比如background-color，color之类的。参考：[这里](https://stackoverflow.com/questions/19186585/css-transforms-vs-transitions/19186662#19186662)。

### `<script type="module src="xxx"></script>` type="module"是干嘛的？
`type="module"`就是指示浏览器，要引用进来的代码是一个JS module。下面简单的介绍一下JS Module。参考：[这里](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)。
- JS Module有什么用？\
JS从最初只是用于辅助form validation的小语言，发展到如今可以做一个完整应用的语言，模块化的需求逐渐显现出来。这里我们提到的module，其实是指ES6引进来的Module。其实在ES6 Module之前，社区就做过很多模块化的尝试。比如有CommonJS，RequireJS，IIFE，等等。ES6 Module则是官方的一个模块化解决方案。
- ES6 Module有什么特性？为什么需要它？\
ES6 Module在语法上提供了`import`和`export`两个关键字。此外，对于一些进行整合处理的main package，即只是导入module再导出部分声明，可以使用`export {xxx} from "abc.js";`具体语法不再讲解。下面提一些别的东西。
  - 首先，ES6 Module默认使用`use strict`。
  - 其次，ES6 Module里所有的声明默认是‘private’的。`Everything declared inside a module is local to the module, by default.`只有被export的东西才可以被外界访问。
  - 最重要的，ES6 Module是一个静态的，预先处理的依赖管理系统。当一个模块被传递给js引擎时，会执行四步：parsing, loading (into memory), linking, execute。其中，loading这一步又是没有官方标准而是由js引擎自己决定的。这几步给我们的重要信息是，在一个模块内的语句被执行之前，该模块依赖的所有其它模块都会先被加载且执行。
  - ES6 Module的导出也是静态导出。All exported identifiers must be explicitly exported by name in the source code. You can’t programmatically loop through an array and export a bunch of names in a data-driven way.

  介绍完ES6 Module的特性，那么这些特性能给我们带来什么好处呢？答：静态模块导入导出系统可以使我们的代码在执行前就加载所有其它依赖模块。然后有工具可以对这些模块进行语义解析然后编译，然后连接成一整个完整的js文件。这样通过网络传输时，可以大大加快传输的速度。避免了出现传输完一个js文件，开始运行时，发现要加载另一个模块（这是动态加载, load on demand），然后再发送新的网络请求去拿新的文件。

## 用JS实现动画的三种方式
1.
```
setInterval(() => {}, 16);
```

2.
```
const func = () => {
    setTimeout(func, 16);
}
```

3.
```
const func = () => {
  requestAnimationFrame(func);  // rAF
}
```

## 属性动画与帧动画
属性动画：把一个对象的某一个属性从一个值变成另外一个值
帧动画：每个固定间隔显示一个图片

## 具体实现
这节我们用rAF的方式来实现动画功能。上面`2`, `3`这种调用自己的方式抽象为一个class `Timeline`。然后我们把`Timeline`单独写在一个文件里。`Timeline`里单独保存我们要进行的动画操作，保存到一个field里。但是我们想让这个field私有化，不让别人随意访问。那么怎么办呢？我们在`timeline.js`里只export `Timeline`这个class。然后声明几个别的const变量但是不export他们。这样别人就访问不到了。除此之外还有什么吗？有！前面声明的const变量要用Symbol来创建。为什么呢？因为如果我们用`String`来创建，比如说创建了一个field叫'aaa'。那么`let tl = new Timeline(); console.log(tl['aaa']);`就能访问到这个“私有”的属性了。但是用Symbol创建的属性就不会被外界访问到了。因为这个Symbol不能被访问。

## 关于如何验证结果
课上我们需要自己写一个ease曲线。写完以后这个ease曲线对不对呢？谁也不知道。那么我们要验证一下。怎么验证？当时我的想法是，我可以肯定linear曲线是正确的，那么我创建两个元素，一个赋予ease曲线，一个赋予linear曲线。如果两个表现的不一样，那么我写的应该就起作用了。现在发现这个想法真是犯了很大的逻辑错误😂。一个东西a（我的代码）不是b（linear曲线）不代表他就是c（ease曲线）。那么要到底要如何验证我的代码呢？应该和真实基准（true ground）进行比较。真实基准从哪里来？css提供的有。所以我应该创建两个元素，一个元素用我自己的js code加动画。一个元素用css加动画。若两者表现一致的，才真正表示我的代码是正确的。

## 关于管理代码，管理state，和使用field
在原始的代码中，我在自己实现时发现了一个bug。如果连续点多次pause或者连续点多次resume，那么代码会出问题。出这个问题的原因在于，原本我们是默认pause和resume一定是成对出现和运行的。但是当连点多次的时候，这个假设就被破坏了。那么如何解决这个问题呢？我的最初解法是，针对出现的这种情况，理清相应的逻辑，然后根据这个逻辑再改相应的field。这个想法看起来是没有错的。下面是我的第一次尝试：
```
  pause() {
    if (this[PAUSE_START_TIME] !== undefined) {
      this[PAUSE_TIME] += Date.now() - this[PAUSE_START_TIME];
    }
    this[PAUSE_START_TIME] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    if (this[PAUSE_START_TIME] !== undefined) {
      this[PAUSE_TIME] += Date.now() - this[PAUSE_START_TIME];
      this[TICK]();
      this[PAUSE_START_TIME] = undefined;
    }
  }
```
直到后来看了老师的代码发现了其中的一些问题。首先，我漏掉了一个点。我并没有处理`Timeline::start`函数。这个函数我们假设他只会被运行一次，实际上并不是。用户也可以调用多次。甚至说扩展一下，不止这种使用上的假设，有时候我们把一个field或者method设计成private，也并不是真的private。详情见上面的`具体实现`一节。其次，这里我的做法其实是，通过field `this[PAUSE_START_TIME]`的值来判断state。一个更好的做法是，专门声明一个state来记录状态。这样逻辑会更清晰。
