const p5 = require('p5');
const moofx = require('moofx');
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

function addSketch(ele, fadeTime = 0) {
  const sketchId = ele.getAttribute('data-sketch').replace('.js', '')
  
  currentSketch = ele;

  if(container) {
    const style = experiments[sketchId].bg
    if(experiments[sketchId].lightIcon) {
      container.style.color = "white"
    } else {
      container.style.color = "black"
    }
    const colorString = "rgb(" + style.r + ", " + style.g + ", " + style.b + ")"
    moofx(container).animate({ 'background-color': colorString }, {
      duration: fadeTime,
      callback: () => {
        experiments[sketchId].load();
      }
    })
    container.classList.remove('hidden');
  }

  document.querySelector('body').classList.add('no-scroll')
}

function nextSketch(ele) {
  closeSketch(currentSketch);
  const next = (data.experiments.indexOf(currentSketch.getAttribute('data-sketch')) + 1) % data.experiments.length
  addSketch(document.querySelector("[data-sketch='" + data.experiments[next] + "']"), 500);
}

function prevSketch(ele) {
  closeSketch(currentSketch);
  const prev = (data.experiments.indexOf(currentSketch.getAttribute('data-sketch')) - 1 + data.experiments.length) % data.experiments.length
  addSketch(document.querySelector("[data-sketch='" + data.experiments[prev] + "']"), 400);
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

function setupNav() {
  bindClick('.experiments', () => {
    document.querySelector('#experiments').classList.remove('hidden')
    document.querySelector('#about').classList.add('hidden')
    document.querySelector('#projects').classList.add('hidden')
  });

  bindClick('.about', () => {
    document.querySelector('#experiments').classList.add('hidden')
    document.querySelector('#about').classList.remove('hidden')
    document.querySelector('#projects').classList.add('hidden')
  });

  // bindClick('.projects', () => {
  //   document.querySelector('#experiments').classList.add('hidden')
  //   document.querySelector('#about').classList.add('hidden')
  //   document.querySelector('#projects').classList.remove('hidden')
  // });
}

function init() {
  data = JSON.parse(document.getElementById('js-data').value);

  container = document.getElementById('canvas-container');
  feather.replace()

  setupNav();

  setBackgroundImages();

  bindClick('.sketch', (e) => {
    const ele = e.target.parentNode;
    setSelected(ele, '.sketch .item');
    addSketch(ele)
  });

  bindClick('.stop', closeSketch);
  bindClick('.restart', restartSketch);
  bindClick('.next', nextSketch);
  bindClick('.prev', prevSketch);


}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
