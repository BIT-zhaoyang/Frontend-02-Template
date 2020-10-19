let element = document.documentElement;

/* process mouse actions */
let isListeningMouse = false;
element.addEventListener("mousedown", event => {
  const context = Object.create(null);
  contexts.set('mouse' + (1 << event.button), context);

  start(event, context);

  const mousemove = event => {
    let button = 1;
    while(button <= event.buttons) {
      if (button & event.buttons) {
        let key = button;
        if (button === 2) {
          key = 4;
        } else if (button === 4) {
          key = 2;
        }
        const context = contexts.get('mouse' + key);
        move(event, context);
      }
      button = button << 1;
    }
  }
  const mouseup = event => {
    const context = contexts.get('mouse' + (1 << event.button));
    end(event, context);
    if (event.buttons === 0) {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      isListeningMouse = false;
    }
  }

  if (!isListeningMouse) {
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    isListeningMouse = true;
  }
});

/* process touch actions */
const contexts = new Map();

element.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    const context = Object.create(null);
    contexts.set(touch.identifier, context);
    start(touch, context);
  }
});

element.addEventListener('touchmove', event => {
  for (let touch of event.changedTouches) {
    const context = contexts.get(touch.identifier);
    move(touch, context);
  }
});

element.addEventListener('touchend', event => {
  for (let touch of event.changedTouches) {
    const context = contexts.get(touch.identifier);
    end(touch, context);
  }
});

element.addEventListener('touchcancel', event => {
  for (let touch of event.changedTouches) {
    const context = contexts.get(touch.identifier);
    cancel(touch, context);
  }
});

/* general framework abstraction for both mouse & touch actions */
// Introduce `context` for handling different touch points & mouse keys
// Moved these global variables into the `context` variable
// let startX, startY;
// let handler = null;
// let isPress = false, isPan = false, isTap = true;

const start = (point, context) => {
  context.startX = point.clientX, context.startY = point.clientY;

  context.isPress = false;
  context.isPan = false;
  context.isTap = true;
  context.points = [{
    t: Date.now(),
    x: point.clientX,
    y: point.clientY
  }];
  
  context.handler = setTimeout(() => {
    context.isPress = true;
    context.isPan = false;
    context.isTap = false;
    context.handler = null;
    console.log('press');
  }, 500);
}

const move = (point, context) => {
  let dx = point.clientX - context.startX;
  let dy = point.clientY - context.startY;
  if (!context.isPan && dx * dx + dy * dy > 100) {
    context.isPress = false;
    context.isPan = true;
    context.isTap = false;
  }
  if (context.isPan) {
    clearTimeout(context.handler);
    console.log('pan', dx, dy);
  }

  context.points = context.points.filter(p => Date.now() - p.t < 500);
  context.points.push({
    t: Date.now(),
    x: point.clientX,
    y: point.clientY
  });
}

const end = (point, context) => {

  if (context.isTap) {
    console.log('tap');
    dispatch('tap', {});
  } else if (context.isPress) {
    console.log('press end');
    dispatch('press', {});
  } else if (context.isPan) {
    console.log('pan end');
    dispatch('panEnd', {});
  } 
  
  context.points = context.points.filter(p => Date.now() - p.t < 500);
  let d = 0, v = 0;
  if (!context.points.length) {
    v = 0;
  } else {
    d = Math.sqrt((point.clientX - context.points[0].x) ** 2 
                  + (point.clientY - context.points[0].y) ** 2);
    v = d / (Date.now() - context.points[0].t);
  }

  console.log(v);
  if (v > 1.5) {
    console.log('flick');
    context.isFlick = true;
    dispatch('flick', {});
  } else {
    context.isFlick = false;
  }
  clearTimeout(context.handler);
}

const cancel = (point, context) => {
  clearTimeout(context.handler);
  console.log('cancel', point.clientX, point.clientY);
}

function dispatch(type, properties) {
  let event = new Event(type);
  for (let name in properties) {
    event[name] = properties[name];
  }
  element.dispatchEvent(event);
}