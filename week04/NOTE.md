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

HTTP是一个文本协议。与文本协议相对的是二进制协议。
关于设计一个基础库：先从使用开始去设计接口。
