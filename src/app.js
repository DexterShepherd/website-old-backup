const p5 = require('p5');
const experiments = require('./experiments/index.js');
const feather = require('../node_modules/feather-icons/dist/feather.js');

require('./app.scss');

let container;
let data
let currentSketch;

function main() {
  init()
}

function setSelected(ele, selector) {
  document.querySelectorAll(selector).forEach( e => e.classList.remove('selected'))
  ele.classList.toggle('selected');
}

function addSketch(ele) {
  console.log('adding!')
  const sketchId = ele.getAttribute('data-sketch').replace('.js', '')
  
  currentSketch = ele;

  if(container) {
    const style = experiments[sketchId].bg
    if(experiments[sketchId].lightIcon) {
      container.style.color = "white"
    } else {
      container.style.color = "black"
    }

    container.style.backgroundColor = "rgba(" + style.r + "," + style.g + "," + style.b + ", "  + style.a + ")"
    container.classList.remove('hidden');
  }

  experiments[sketchId].load();
  document.querySelector('body').classList.add('no-scroll')
}

function closeSketch() {
  const stopper = new Event('stop_sketch');
  document.dispatchEvent(stopper);
  let canvasDiv = document.getElementById('canvas-container');
  if ( container ) { 
    const canvas = container.querySelector('canvas')
    if (canvas) {
      container.removeChild(canvas);
    }
    container.classList.add('hidden');
  }

  document.querySelectorAll('.selected').forEach( ele => ele.classList.remove('selected'))
  document.querySelector('body').classList.remove('no-scroll')
}

function restartSketch() {
  const stopper = new Event('stop_sketch');
  document.dispatchEvent(stopper);
  let canvasDiv = document.getElementById('canvas-container');
  if ( container ) { 
    const canvas = container.querySelector('canvas')
    if (canvas) {
      container.removeChild(canvas);
    }
  }

  if(currentSketch) {
    addSketch(currentSketch)
  }
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


function init() {
  data = JSON.parse(document.getElementById('js-data').value);
  container = document.getElementById('canvas-container');
  feather.replace()

  setBackgroundImages();

  bindClick('.sketch', (e) => {
    const ele = e.target.parentNode;
    setSelected(ele, '.sketch .item');
    addSketch(ele)
  });

  bindClick('.stop', closeSketch);
  bindClick('.restart', restartSketch);
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
