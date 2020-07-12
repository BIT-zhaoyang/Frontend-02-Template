学习笔记

感觉要系统的理解JS，需要从编程语言的角度去学习。比如文法、语法和运行时这些概念，是学习了编程语言设计的人才能比较了解。同时，《重学前端》里提到的，“任何语言运行时类的概念都是被弱化的“这个观点，也需要了解程序语言设计。到时候学习程序语言设计，应该又要了解计算机组成原理和操作系统了。感觉又回到了原点。。。有好多要补啊！

## 重学前端专栏
### JavaScript对象：我们真的需要模拟类吗？
“类”语言是演绎推理，“原型”是归纳总结？

## 课程讲座
### 计算机语言
图灵完备性：
1. 通过goto来实现
2. 通过lambda替换来实现

图灵完备的意思到底是什么？

命令式编程语言的结构
Atom -> Expression -> Statement -> Structure -> Program

Double Floating Number:
Exponent: base 0 1111 1111 1111
Fraction: 隐藏位1
运算过程：小数点默认的位置在隐藏位1后面。根据Exponent和Exponent Base的差，知道小数点左右移的位数。然后在二进制形式下将小数点右移，得到类似`1(0|1)*.(0|1)*`的二进制形式。然后再分别根据小数点前后的二进制部分转化为对应的十进制部分。

### String
1. Character = Glyph + Font ?
1. Code Point类似unique id
1. Encoding表示id的方式

### Object
#### General Part
三个组成部分
1. state
1. identifier
1. behavior
>在设计对象的状态和行为的时候，我们应该总是去遵循行为改变状态的原则。

归类 vs 分类
Bottom up vs Top down?

“类”语言：提取共性
“原型”语言：描述差别

#### JS Specific Part
Object is a collection of properties. Properties are collections of Key-Value pairs. A key is either a String or a Symbol.

~~内置行为的定义？~~
