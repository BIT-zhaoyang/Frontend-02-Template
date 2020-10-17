import { createElement } from "./framework.js"
import { Carousel } from "./carousel.js"
import { Timeline, Animation } from "./animation.js"

let d = [
  'http://img4.a0bi.com/upload/ttq/20170922/1506081303263.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081330241.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081421147.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081450268.jpeg',
  'http://img4.a0bi.com/upload/ttq/20170922/1506081518136.jpeg'
];

let a = <Carousel src={d} />
a.mountTo(document.body);

let tl = new Timeline();
const animation = new Animation(
  {},
  'a', 0, 100, 1000);
// tl.add(animation);
tl.start();

window.tl = tl;
window.animation = animation;