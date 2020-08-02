学习笔记
## Video Part
### Video 03
#### About find 'ab' in a string.
```
// solution 1
for (let i = 0; i + 1 < str.length; ++i) {
    if (str[i] === 'a' && str[i+1] === 'b') {
        return true;
    }
}

// solution 2
let findA = false;
for (let char of str) {
    if (char === 'a') findA = true;
    else if (findA && char === 'b') return true;
    else findA = false;
}
```
Difference between two solutions:
In solution 1, we are exploring from current position to future positions
(namely, explore i + 1 when we are at i). In solution 2, we only explore current
position and consider states passed from last iteration. The last solution may
be more flexible when the situation becomes more complicated. Because the last
solution can split into two smaller questions: 1. How to get next state? 2. How
to react based on previous state? It's a demonstration of a simple state
machine. While solution 1 is more problem related.

## 状态机
### 状态机包括哪些部件？状态机的作用？
状态迁移逻辑 + 计算逻辑
如何设计实现状态机？
先写好状态迁移，然后再实现计算逻辑。

## 浏览器的工作过程
URL ==(*HTTP*)==> HTML ==(*parse*)==> DOM ==(*CSS Computing*)==> DOM with CSS ==(*layout*) ==> DOM with position ==(*render*)==> Bitmap

## HTTP请求
- TCP vs HTTP
  - TCP是全双工。HTTP则是一问一答式的request => response形式
- HTTP是一个文本协议。与文本协议相对的是二进制协议。
- 关于设计一个基础库：先从使用开始去设计接口。
- HTTP请求的设计
  1. HTTP请求总结
    - 设计一个HTTP请求的类
    - content type是一个必要的字段，要有默认值
    - body是kv格式
    - 不同的content-type影响body的格式
  1. send函数总结
    - 在Request的构造器中手机必要的信息
    - 设计一个send函数，把请求真实发送到服务器
    - send函数应该是异步的，所以返回promise
  1. 发送请求
    - 设计支持已有的connection或者自己新建connection
    - 收到数据传给parser
    - 根据parser的状态resolve Promise
  1. ReponseParser总结
    - Response必须分段构造，所以我们要用一个ResponseParser来“装配”
    - ResponseParser分段处理ResponseText，我们用状态机来分析文本的结构
  1. BodyParser的总结
    - Response的Body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题（Java里的接口与多态）
    - 例子中使用TrunkedBodyParser。同样的，这个子Parser也可以用状态机来处理body的格式。


- 注：这个章节里，实现状态机的方式是通过一个变量来记录当前的状态，再根据状态去做不同的操作。

## HTML Scanner + Parser
### HTML Scanner (Text => Tokens, lexical analysis)
- HTML Scanner的设计
  1. 拆分文件
    - 设立独立的parser模块
    - 设立接口。接口接受HTML文本(string)，返回DOM树
  1. 设计状态机来解析HTML
    - 节选部分HTML标准制定的状态，来设计状态机
  1. 解析HTML标签
    - recap: HTML的标签分类: (1)开始标签[start tag]；(2)结束标签[end tag]；(3)自封闭标签[self closing start tag];
    - 暂时忽略属性
  1. 创建元素
    - 加入创建token的业务/计算逻辑
    - 在标签的结束状态提交token(标签结束状态和结束标签是两个概念)
  1. 处理属性
    - 属性值分为单引号，双引号，无引号三种写法。添加相应的状态处理
    - 处理属性的方式跟标签类似
    - 属性结束时，把属性加到标签token上


- 注：这个章节里，实现状态机的方式是通过不同的函数来表达状态。不同的状态对应的不同的操作被封装在相应的函数里。

### HTML Parser (Tokens => AST, syntax analysis)
- Tag vs Element
  - Tag is the text in HTML. Element is the represented object of the tag (Maybe element is a runtime concept?).
- HTML Parser的设计
  1. 构建DOM树（仅element部分）
    - 从标签构建DOM树的基本技巧是使用栈
    - 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
    - 自封闭结点可视为入栈后立即出栈
    - 设置元素的父元素
    - 设置父元素的子元素
  1. 构建DOM树（text node部分）
    - 文本节点与自封闭标签处理类似
    - 多个文本节点需要合并
