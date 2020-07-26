const start = (c) => {
  return c === 'a' ? foundA : start;
}
const foundA = (c) => {
  return c === 'b' ? foundB : start(c);
}
const foundB = (c) => {
  return c === 'a' ? foundA2 : start(c);
}
const foundA2 = (c) => {
  return c === 'b' ? foundB2 : start(c);
}
const foundB2 = (c) => {
  return c === 'a' ? foundA3 : foundB(c);
}
const foundA3 = (c) => {
  return c === 'b' ? foundB3 : foundA2(c);
}
const foundB3 = (c) => {
  return c === 'x' ? end : foundB2(c);
}
const end = (c) => {
  return end;
}

const findPattern = (str) => {
  let state = start;
  for (let c of str) {
    state = state(c);
  }
  return state === end;
}

const texts = ['abc', 'ab', 'abcabx', 'abcabcabx', 'abababcabxasdf', 'abababx'];
for (let str of texts) {
  const result = findPattern(str) ? 'found' : 'didn\'t find';
  console.log(result);
}