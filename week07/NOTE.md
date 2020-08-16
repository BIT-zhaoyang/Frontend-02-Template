学习笔记
## 正常流排版
- 收集盒和文字进行
- 计算盒和文字在行中的排布 (Inline-level Formating Context)
- 计算行的排布 (Block-level Formating Context)
一个问题：为什么要有盒模型？我认为答案是：因为除了需要排版文字，还需要排版图片，表格等东西。这些文字以外的东西就需要装进盒模型里。

### 正常流的行级排版
五个概念：
- line-top
- text-top
- base-line
- text-bottom
- line-bottom
其中，text-top，text-bottom是由字体大小控制。line-top，line-bottom是由行高控制。
一个问题：如果font-size大于line-height会怎样？答：取决于包裹字体的元素的overflow属性。如果是默认的overflow属性，则字体会全部显示。有换行发生时，两行会叠加。如果overflow属性是hidden，则字体会被截取掉一部分。

### 正常流的块级排布
#### 关于float与clear
float会把原来的元素先排进行里，然后再移动到左或者右的位置。之后再对行进行调整。需要注意的是，默认的float属性是有叠加行为的。即，如果在同一行里，或者float元素较高，则受影响的多行里，有多个float属性，则float会一次的从边界向内堆叠。如果想消除这个现象，则要使用clear。使用clear后原本堆叠的元素会重新寻找新的不受前一个float影响的行来靠边。
#### margin折叠
没什么好讲的。

### BFC合并
几个概念：
- Block Container: 里面有BFC的
  - 能容纳**正常流**的盒，里面就有BFC
- Block-level Box: 外面有BFC的
- Block Box = Block Container + Block-level Box， 即里外都有BFC的

那么Block Container都包括哪些元素呢？block, inline-block, table-cell, flex item, grid cell, table-caption等等。凡是能容纳**正常流**（不只是要求bfc）的，都是Block Container。哪些不是Block Container？比如span就不是。

#### 设立BFC
什么时候会产生BFC呢？即，什么样的元素可以包含**正常流**呢？有以下几个：
- floats
- absolutely positioned elements
- block containers (inline-blocks, table-cells, table-captions)
- block boxes with 'overflow' other than 'visible'
这个地方很有意思。其实是说，一个Block Container不一定是Block-level Box，比如inline-blocks。

#### BFC合并
当一个Block Box的overflow属性为visible的时候，这个元素不会创建BFC。即，原本这个元素应该创建一个新的排版空间。该元素包含的子元素在这个空间内重新排版。但是若这个元素没有创建这个空间，该元素内的子元素就会在这个元素所处的外层BFC里排版。

## Flex排版
- 收集盒进行（没有文字）
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布