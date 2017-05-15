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
    const stopper = new Event('stop_sketch');
    document.dispatchEvent(stopper);

    let sketchId = e.target.getAttribute('data-sketch').replace('.js', '');
    console.log(sketchId);
    experiments[sketchId]();
  });
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
