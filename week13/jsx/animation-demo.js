import { Timeline, Animation } from "./animation.js"

const el = document.getElementById('el');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');

const tl = new Timeline();
const animation = new Animation(el.style, 'transform', 0, 500, 5000, null, (val) => `translateX(${val}px)`);

pauseBtn.addEventListener('click', () => tl.pause());
resumeBtn.addEventListener('click', () => tl.resume());
tl.add(animation);
tl.start();