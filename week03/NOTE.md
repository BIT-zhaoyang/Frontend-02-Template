# 学习笔记
## 闭包与执行上下文
### 1. 什么是闭包？
闭包源自于function programming。
> Also we represent the value of a lambda-expression by a bundle of information called a "closure," comprising the lambda-expression and the environment relative to which it was evaluated. We must therefore arrange that such a bundle is correctly interpreted whenever it has to be applied to some argument. More precisely:
>
> a closure has
>
>an environment part which is a list whose two items are: (1) an environment (2) an identifier or list of identifiers
>
> and a control part which consists of a list whose sole item is an AE.

简单来说，
> 闭包其实只是一个绑定了执行环境的函数

闭包包含两个部分：
- 环境部分
  - 环境
  - 标识符列表
- 表达式部分

### 2. JS中的闭包什么样？
JS标准中本身并没有闭包的定义。然而JS的函数其实就是闭包的实现。JS的函数包含
- 环境部分
  - 环境：函数的词法环境（执行上下文的一部分）
  - 标识符列表：函数中用到的未声明的变量
- 表达式部分：函数体

JS函数比FP中的函数要更复杂。JavaScript 中与闭包“环境部分”相对应的术语是“词法环境”，但是 JavaScript 函数比λ函数要复杂得多，我们还要处理 this、变量声明、with 等等一系列的复杂语法。所以，在 JavaScript 的设计中，词法环境只是 JavaScript 执行上下文的一部分。**JavaScript 标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。**

不同的js版本对“执行上下文”有不同的定义。在此我选用一个我方便理解的版本，即es5版本的定义。在此版本中，上下文由三个部分构成：
- lexical environment: 词法环境，当获取变量时使用
- variable environment: 变量环境，当声明变量时使用
- this value：this值

## 语句执行
### 1. Completion类型
Completion Record 表示一个 (任意类型的)**语句** 执行完之后的结果，它有三个字段：
- [[type]]表示完成的类型，有break continue return throw和normal几种类型
- [[value]]表示语句的返回值，如果语句没有，则是empty
- [[target]]表示语句的目标，通常是一个JavaScript标签。

## JavaScript执行（三）：你知道现在有多少种函数吗？
### this关键字
this关键字是作为environment variable被放进Execution Context里随着函数的调用而传递的。

## JavaScript语法（一）：在script标签写export为什么会抛错？
### var声明
var的作用域范围是函数或者模块/脚本。相比于文章里的例子，一个更好的例子如下：
```
console.log(a);
for(let i = 0; i < 3; ++i) {
  if (i === 4) {
    var a = i;
  }
}
console.log(a);

console.log(b);
for(let i = 0; i < 3; ++i) {
  (function(){
    var b = i;
  })();
}
console.log(b);
```
这个例子里包含了变量提升(Hoisting)和var作用域范围两个展示。这个例子的第一个for循环中，即使`var a = i`并没有真的执行到，由于变量提升，也会相当于在整个文件范围内声明了一个`var a;`但是没有赋值。
