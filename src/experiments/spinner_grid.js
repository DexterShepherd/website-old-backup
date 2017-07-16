// this file was autogenerated by bin/daily-sketch-parser
module.exports = {
  load: () => {
    const p5 = require('p5');

    new p5(p => {
      let speed;
      p.setup = function() {
        document.addEventListener('stop_sketch', (e) => {
          p.remove()
        });
        const canvas = p.createCanvas(700, 700);
        canvas.parent('canvas-container');
      }

      p.draw = function() {
        p.background(240, 5);
        for(let i = 0; i < 8; i++) {
          for(let j = 0; j < 8; j++)  {
            p.push();
            p.translate((i * 100) + 50, (j * 100) + 50);
            let x = p.sin(speed) * p.sin(speed * i + 1) * 40;
            let y = p.cos(speed) * p.sin(speed * j + 1) * 40;
            p.translate(x, y);
            p.point(0, 0);
            p.pop();
          }
        }
        speed = p.frameCount * 0.01;
      }
    });
  },
  bg: { r: 254, g: 254, b: 254, a: 255 }
}
