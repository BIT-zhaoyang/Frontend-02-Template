/**
 * 整个手势检测的过程可以分为Listen, Recognize, Dispatch。而且三个过程是
 * 顺序执行的。因此，我们可以把这三个过程分别模块化，然后组合它们。为了使用方便，
 * 我们还可以export一个已经组合好的函数。
 * Listener => Recoginizer => recognizer
 */
export class Listener {
  constructor(element, recognizer) {
    this.recognizer = recognizer;
    this.listen(element);
  }
  listen(element) {
    /* process mouse actions */
    let isListeningMouse = false;
    element.addEventListener("mousedown", event => {
      const context = Object.create(null);
      contexts.set('mouse' + (1 << event.button), context);

      this.recognizer.start(event, context);

      const mousemove = event => {
        let button = 1;
        while (button <= event.buttons) {
          if (button & event.buttons) {
            let key = button;
            if (button === 2) {
              key = 4;
            } else if (button === 4) {
              key = 2;
            }
            const context = contexts.get('mouse' + key);
            this.recognizer.move(event, context);
          }
          button = button << 1;
        }
      }
      const mouseup = event => {
        const context = contexts.get('mouse' + (1 << event.button));
        this.recognizer.end(event, context);
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
        this.recognizer.start(touch, context);
      }
    });

    element.addEventListener('touchmove', event => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        this.recognizer.move(touch, context);
      }
    });

    element.addEventListener('touchend', event => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        this.recognizer.end(touch, context);
      }
    });

    element.addEventListener('touchcancel', event => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        this.recognizer.cancel(touch, context);
      }
    });
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  start(point, context) {
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
      this.dispatcher.dispatch('press', {});
    }, 500);
  }

  move(point, context) {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    if (!context.isPan && dx * dx + dy * dy > 100) {
      context.isPress = false;
      context.isPan = true;
      context.isTap = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      this.dispatcher.dispatch('panStart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
      clearTimeout(context.handler);
    }
    if (context.isPan) {
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
    }

    context.points = context.points.filter(p => Date.now() - p.t < 500);
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    });
  }

  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch('tap', {});
    } else if (context.isPress) {
      this.dispatcher.dispatch('pressEnd', {});
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

    if (v > 1.5) {
      context.isFlick = true;
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        velocity: v
      });
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      this.dispatcher.dispatch('panEnd', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick
      });
    }
    clearTimeout(context.handler);
  }

  cancel(point, context) {
    clearTimeout(context.handler);
    this.dispatcher.dispatch('cancel', {});
  }
}

export class Dispatcher {
  constructor(element) {
    this.element = element;
  }

  dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)));
}