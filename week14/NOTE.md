# 学习笔记
## 编程经验
### 1
编程的时候还是尽量要在同一个逻辑层面上编程。比如`mousedown`, `mousemove`, `mouseup`三个事件基本是一起绑定和操作的。先有`mousedown`，再有注册`mousemove`和`mouseup`。然后在`mouseup`中移除`mousemove`和`mouseup`。逻辑是这样一个简单的逻辑。很容易整理清楚也很容易写出来。不过真正写的时候，虽然`mouseup`移除Listener的逻辑很简单，也不要先急着实现。做事还是先一件一件来。先声明有`mousemove`和`mouseup`两个listener。在`mousedown`中添加它们，然后再去实现别的东西，比如`mouseup`。

Step 1: 写清第一个逻辑框架
```
element.addEventListener("mousedown", event => {
  const mousemove = event => {
  }
  const mouseup = event => {
  }
  element.addEventListener('mousemove', mousemove);
  element.addEventListener('mouseup', mouseup);
});
```
Step 2: 补上第二个逻辑
```
element.addEventListener("mousedown", event => {
  const mousemove = event => {
    console.log(event.clientX, event.clientY);
  }
  const mouseup = event => {
    element.removeEventListener('mousemove', mousemove);
    element.removeEventListener('mouseup', mouseup);
  }
  element.addEventListener('mousemove', mousemove);
  element.addEventListener('mouseup', mouseup);
});
```
### 2
`我们所有用的这些变量，我们先保证它的逻辑关系和可访问的作用域是正确的。后面整理代码时再清理这些变量。考虑把他们放哪里比较合适。`
### 3
再次遇见了不要根据一个field的值来判断当前object所处的不同状态的做法。原来这种方式叫解耦合。参见week 13的笔记。