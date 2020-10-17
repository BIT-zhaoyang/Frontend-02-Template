const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATIONS = Symbol('animations');
const START_TIME = Symbol('start-time');
const PAUSE_START_TIME = Symbol('pause-start-time');
const PAUSE_TIME = Symbol('pause-time');
const STATE = Symbol('state');
const INITED = Symbol('inited');
const STARTED = Symbol('started');
const PAUSED = Symbol('paused');

export class Timeline {
  constructor() {
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[STATE] = INITED;
  }
  // 为啥原本函数是add(animation)现在变成了add(animation, startTime)?
  // 因为我们有可能是慢慢添加animation的，不会一次添加完。
  add(animaiton, startTime) {
    startTime = startTime === undefined ? Date.now() : startTime;
    this[ANIMATIONS].add(animaiton);
    this[START_TIME].set(animaiton, startTime);
  }
  start() {
    if (this[STATE] !== INITED) {
      return;
    }
    this[PAUSE_TIME] = 0;
    this[STATE] = STARTED;
    const startTime = Date.now();
    this[TICK] = () => {
      console.log('pause time is', this[PAUSE_TIME]);
      let time = Date.now() - startTime - this[PAUSE_TIME];
      for (let animation of this[ANIMATIONS]) {
        if (this[START_TIME].get(animation) > startTime) {
          time = time + startTime - this[START_TIME].get(animation);
        }
        if (time > animation.duration) {
          time = animation.duration;
          this[ANIMATIONS].delete(animation);
        }
        animation.receive(time);
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    }
    
    this[TICK]();
  }

  pause() {
    if (this[STATE] !== STARTED) {
      return;
    }
    this[STATE] = PAUSED;
    this[PAUSE_START_TIME] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    if (this[STATE] !== PAUSED) {
      return;
    }
    this[STATE] = STARTED; 
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START_TIME];
    this[TICK]();
  }

  reset() {
    this.pause();
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[STATE] = INITED;
    this.start();
  }
}

export class Animation {
  // 这里我们创建属性动画。既然属性动画要把某个对象的某个属性从一个值改成另一个值
  // 那么我们的constructor里要有哪些参数呢？
  constructor(obj, prop, startVal, endVal, duration, timingFunction, template) {
    // 后两个参数是和动画变化相关的
    this.object = obj;
    this.property = prop;
    this.startValue = startVal;
    this.endValue = endVal;
    this.duration = duration;
    this.timingFunction = timingFunction;
    this.template = template;
  }

  receive(time) {
    console.log('time', time);
    const range = this.endValue - this.startValue;
    const value = this.startValue + range * time / this.duration;
    this.object[this.property] = this.template(value);
  }
}