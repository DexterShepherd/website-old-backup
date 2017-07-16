// this file was autogenerated by bin/daily-sketch-parser
module.exports = {
  load: () => {
    const p5 = require('p5');

    new p5(p => {
      let walkers, counter;
      p.setup = function() {
        document.addEventListener('stop_sketch', (e) => {
          p.remove()
        });
        const canvas = p.createCanvas(700, 700);
        canvas.parent('canvas-container');
        walkers = [];
        for(let i = 0; i < 4; i++) {
          for(let j = 0; j < 4; j++) {
            walkers.push( new Crawler(p.createVector(75 + (j * 175), 75 + (i * 175)), 15,  i + j + 3));
          }
        }
        p.background('#2E0927');
        counter = 0;
      }

      p.draw = function() {
        walkers.forEach( w => {
          w.update();
          w.display();
        })
      
        counter += 1;
        if(counter > 1000) {
          p.setup();
        }
      }


      let Crawler = function(loc, step_size, angle_size) {
        this.loc = loc.copy();
        this.or_loc = loc.copy();
        this.step_size = Math.floor(step_size);
        this.last_dir;
        this.dir = 0;
        this.steps = 0;
        this.angle_size = angle_size;
        this.dead = false;

        this.update = function() {
          if(this.loc.dist(this.or_loc) > 100) {
            this.dead = true;
          }

          if(!this.dead) {
            if (this.steps == this.step_size) {
              this.dir = Math.floor(p.random(this.angle_size));
              this.steps = 0;
            } 

            let step, angle = 0;

            for(let i = 0; i < this.angle_size; i++) {
              if( i < this.dir ) {
                angle = (p.TWO_PI/ this.angle_size) * (i + 1);
              }
            }

            step = p.createVector(p.sin(angle), p.cos(angle));
            this.loc.add(step);
            this.steps += 1;
            }
          return this.loc;
        };

        this.display = function() {
          p.fill(p.lerpColor(p.color('#04756F'), p.color('#FF2D00'), this.loc.y/p.height));
          p.stroke(p.lerpColor(p.color('#04756F'), p.color('#FF2D00'), this.loc.y/p.height));
          p.ellipse(this.loc.x, this.loc.y, 1, 1);
        }
      }
    });
  },
  bg: { r: 46, g: 9, b: 39, a: 255 },
  lightIcon: true
}
