import { enableGesture } from "./gesture.js";

enableGesture(document.documentElement);
document.documentElement.addEventListener('tap', () => {
  console.log('tap event triggered');
});
document.documentElement.addEventListener('pan', () => {
  console.log('pan event triggered');
});
document.documentElement.addEventListener('panStart', () => {
  console.log('panStart event triggered');
});
document.documentElement.addEventListener('press', () => {
  console.log('press event triggered');
});
document.documentElement.addEventListener('pressEnd', () => {
  console.log('pressEnd event triggered');
});
document.documentElement.addEventListener('flick', () => {
  console.log('flick event triggered');
});
document.documentElement.addEventListener('panEnd', () => {
  console.log('panEnd event triggered');
});
document.documentElement.addEventListener('cancel', () => {
  console.log('cancel event triggered');
});