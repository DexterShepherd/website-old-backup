const p5 = require('p5');
const css = require('./app.scss');
const experiments = require('./experiments/index.js');

let container;

function main() {
  const data = JSON.parse(document.getElementById('js-data').value);
  container = document.getElementById('canvas-container');

  console.log('Page data: ', data);

  setBackgroundImages();

  bindClick('.sketch', (e) => {
    const ele = e.target.parentNode;
    setSelected(ele, '.sketch .item');
    replaceSketch(ele)
  });
}

function setSelected(ele, selector) {
  document.querySelectorAll(selector).forEach( e => e.classList.remove('selected'))
  ele.classList.toggle('selected');
}

function replaceSketch(ele) {
  const stopper = new Event('stop_sketch');
  document.dispatchEvent(stopper);

  const sketchId = ele.getAttribute('data-sketch').replace('.js', '');
  let canvas = document.getElementById('canvas-container');
  if ( canvas ) { canvas.parentNode.removeChild(canvas); }
  
  canvas = document.createElement("div");
  canvas.id = 'canvas-container';
  canvas.zIndex = 100;
  ele.children[0].appendChild(canvas);

  console.log(sketchId);
  experiments[sketchId]();
}

function setBackgroundImages() {
  document.querySelectorAll('.item').forEach( (item) => {
    let src = require('./data/' + item.getAttribute('data-bg'));
    console.log(src);
    item.style.backgroundImage = "url('" + src + "')"
  });
}

function bindClick(selector, handler) {
  document.querySelectorAll(selector).forEach((ele) => {
    ele.addEventListener('click', handler);
  });
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
