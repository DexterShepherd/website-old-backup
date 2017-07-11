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
    addSketch(ele)
  });

  bindClick('.stop', closeSketch);
}

function setSelected(ele, selector) {
  document.querySelectorAll(selector).forEach( e => e.classList.remove('selected'))
  ele.classList.toggle('selected');
}

function addSketch(ele) {
  const sketchId = ele.getAttribute('data-sketch').replace('.js', '');
  let canvas = document.getElementById('canvas-container');
  canvas.classList.remove('hidden');
  experiments[sketchId]();
  document.querySelector('body').classList.add('no-scroll')
}

function closeSketch() {
  const stopper = new Event('stop_sketch');
  document.dispatchEvent(stopper);
  let canvas = document.getElementById('canvas-container');
  if ( canvas ) { 
    canvas.parentNode.removeChild(canvas);
    canvas.classList.add('hidden');
  }
  document.querySelector('body').classList.remove('no-scroll')
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
