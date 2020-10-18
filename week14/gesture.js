let element = document.documentElement;

element.addEventListener("mousedown", event => {
  start(event);
  const mousemove = event => {
    move(event);
  }
  const mouseup = event => {
    end(event);
    element.removeEventListener('mousemove', mousemove);
    element.removeEventListener('mouseup', mouseup);
  }
  element.addEventListener('mousemove', mousemove);
  element.addEventListener('mouseup', mouseup);
});

element.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    start(touch);
  }
});

element.addEventListener('touchmove', event => {
  for (let touch of event.changedTouches) {
    move(touch);
  }
});

element.addEventListener('touchend', event => {
  for (let touch of event.changedTouches) {
    end(touch);
  }
});

element.addEventListener('touchcancel', event => {
  for (let touch of event.changedTouches) {
    cancel(touch);
  }
});

let startX, startY;
let handler = null;
let isPress = false, isPan = false, isTap = true;

const start = (point) => {
  startX = point.clientX, startY = point.clientY;

  isPress = false;
  isPan = false;
  isTap = true;
  
  handler = setTimeout(() => {
    isPress = true;
    isPan = false;
    isTap = false;
    handler = null;
    console.log('press');
  }, 500);
}

const move = (point) => {
  let dx = point.clientX - startX, dy = point.clientY - startY;
  if (!isPan && dx * dx + dy * dy > 100) {
    isPress = false;
    isPan = true;
    isTap = false;
  }
  if (isPan) {
    clearTimeout(handler);
    console.log('pan', dx, dy);
  }
}

const end = (point) => {
  if (isTap) {
    console.log('tap');
  } else if (isPress) {
    console.log('press end');
  } else if (isPan) {
    console.log('pan end');
  }
  clearTimeout(handler);
}

const cancel = (point) => {
  clearTimeout(handler);
  console.log('cancel', point.clientX, point.clientY);
}