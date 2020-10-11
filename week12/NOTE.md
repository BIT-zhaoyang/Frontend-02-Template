# 学习笔记
## 对象与组件
| 对象 | 组件(Component) |
| :---: | :---: |
| Properties | Properties |
| Methods | Methods |
| Inherit | Inherit |
| | Attribute |
| | Config & State |
| | Event |
| | Lifecycle |
| | Children |

## 组件的三个用户
1. End User Input  ->  State -> Children
2. Component User's **Markup** Code -> Attribute -> State -> Children
3. Component User's **JS** Code -> Method, Property -> State -> Children \
   Event -> Component User's **JS** Code

In summary,\
Component User use markup code or JS code to send messages to component developer. \
Component developer use Event to send messages to component user.

## Attribute
### Attribute vs Property
- Attribute强调描述性。Attribute来自于xml。
- Property强调从属关系。Property来自于面向对象的概念。

Attribute和Property不等效的几个例子：
1. 名字不一样
```
<div class="cls1 cls2"></div>
<script>
var div = document.getElementByTagName('div');
div.className // cls1 cls2
</script>
```
2. 值的类型不一样
```
<div class="cls1 cls2" style="color:blue"></div>   <-- style的值是字符串 -->
<script>
var div = document.getElementByTagName('div');
div.style //值是k-v对象
</script>
```
3. 值不一样
```
<a href="//m.taobao.com"></div>
<script>
var a = document.getElementByTagName('a');
a.href // "http://m.taobao.com", 这个URL是resolve过的结果
a.getAttribute('href') // "//m.taobao.com"，跟HTML代码中完全一致
</script>
```
4. 含义不一样
```
<input value="cute"/>   <-- value attribute表示默认值 -->
<script>
var input = document.getElementByTagName('input'); // 若property没有设置，则结果是attribute
input.value //cute
input.getAttribute('value'); // cute
input.value = 'hello'; //若value属性已经设置，则attribute不变，property变化，element上实际的效果是property优先
input.value //hello
input.getAttribute('value'); //cute
</script>
```

那么问题来了，如果要重新设计，到底attribute和property要不要统一呢？（我觉得统一好一些。。）

## 如何设计组件状态
| Markup Set | JS Set | JS Change | User Input Change |           |
| ---------- | ------ | --------- | ----------------- | --------- |
| ❌        | ✅    | ✅       | ？               | property  |
| ✅        | ✅    | ✅       | ？               | attribute |
| ❌        | ❌    | ❌       | ✅               | state     |
| ❌        | ✅    | ❌       | ❌               | config    |

State只能从组件的内部去改变，而不应该从组件外部去改变。（？）\
Config只能传进来一次而且不能被更改。

## Lifecycle
见思维导图

## Children
### Content型Children 与 Template型Children
Content型Children就是写几个Children就渲染几个。\
Template型Children则是接收一个数据，然后根据数据再渲染出具体个数的Children。

## 建立一个组件系统（实例）
在建立组件系统之前，先回答一个问题：组件系统由什么构成？\
答：组件系统是一个可以被markup和js均能访问的环境。\
那么下面我们开始第一步
### 建立能使用markup的环境
#### 使用JSX
TODO: webpack, babel, jsx 什么关系？？？generator和async之类又是什么关系？
webpack是把几个js文件，包括import进来的，整合到一个文件里。\
babel是翻译不同的js版本的。\
jsx: 把函数调用以类似HTML形式写出来的语言扩展。

JSX specific knowledge:
1. babel-loader会把jsx转译成调用React.createElement()来创建Node Element。通过配置，可以让jsx转译成调用createElement来创建Node Element。
2. JSX只能识别小写的标签，比如`<div>`;。若写成`<Div>`;则识别不了，会被认为是传了一个class给createElement。要解决这个问题，我们需要先创建相应的class，然后想办法仿照dom的标准，能让document.createElement(class_type)工作。但是这个方法支持的不是很好。所以我们采用另一种方法。给这个class创建mountTo方法，让这个element挂载到DOM上，而不是让DOM来append这个element。

Other knowledge:
When creating a Carousel, using `<img>` leads to some problems. Because `<img>` is draggable, users can drag the image around. A better solution is to use `<div>` element, with `background-image` CSS attribute.

#### 调整CSS
JSX成功运行以后，HTML生成就已经工作了。下面就需要进行CSS的样式调整了。\
CSS调样式分了两部分。一部分是layout排版。另一部分是动画animation。排版涉及到overflow，box layout之类的知识。animation则和transition, transform相关。\
那么如何进行排版呢？两个问题要解决。第一，让所有的画都出现在一行内。第二，限制容器的宽度，设置overflow，使得每次只能显示一张图片。现在排版的问题解决了，接下来解决动画问题。动画问题主要出现在循环出现了最后一张图片以后，如何柔滑的返回第一张图片？如果直接用取余的方式，体验上不是很好。那么更好的方式呢，则是找到相邻的两张图片，然后对这两张图片进行操作。
