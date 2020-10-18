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

const start = (point) => {
  console.log('start', point.clientX, point.clientY);
}

const move = (point) => {
  console.log('move', point.clientX, point.clientY);
}

const end = (point) => {
  console.log('end', point.clientX, point.clientY);
}

const cancel = (point) => {
  console.log('cancel', point.clientX, point.clientY);
}