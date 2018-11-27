<template>
  <div id='container'></div>
</template>

<script>
import P5 from 'p5';

export default {
  props: {
    stroke: {
      type: String,
      default: '#cacaca',
    },
  },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.updateSize);
    });
    this.sketch = new P5((p) => {
      let speed;
      let radius;
      let numPoints;
      let hMax;

      p.setup = () => {
        const canvas = p.createCanvas(this.width, this.height);
        canvas.parent('container');
        speed = 0;
        radius = 200;
        numPoints = 4;
        p.stroke(0);
        p.noFill();
        hMax = 13;
        p.strokeWeight(2);
        p.stroke(this.stroke);
      };

      p.draw = () => {
        p.background('#fdfdfd');
        p.translate(this.width / 2, this.height / 2);
        for (let h = 0; h < hMax - 1; h += 1) {
          p.beginShape();
          const playhead = p.map(h, 0, hMax, -p.PI, p.PI);
          numPoints = hMax - h;
          for (let i = 0; i < numPoints; i += 1) {
            const theta = p.map(i, 0, numPoints, -p.PI, p.PI);
            const x = p.sin(speed + theta + p.cos(speed + playhead)) * p.map(h, 0, hMax, radius, 0);
            const y = (h * p.map(h, 0, hMax, 30, 25))
              + (p.cos(speed + theta + p.sin(speed + playhead))
              * ((h * 10) * p.map(h, 0, hMax, 1, 0)));
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }

        for (let h = 0; h < hMax - 1; h += 1) {
          p.beginShape();
          const playhead = p.map(h, 0, hMax, -p.PI, p.PI);
          numPoints = hMax - h;
          for (let i = 0; i < numPoints; i += 1) {
            const theta = p.map(i, 0, numPoints, -p.PI, p.PI);
            const x = p.sin(speed + theta + p.cos(speed + playhead)) * p.map(h, 0, hMax, radius, 0);
            const y = (-h * p.map(h, 0, hMax, 30, 25))
              - (p.cos(speed + theta + p.sin(speed + playhead))
              * ((h * 10) * p.map(h, 0, hMax, 1, 0)));
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }
        speed = p.frameCount * 0.004;
      };
    });
  },
  beforeDestroy() {
    this.sketch.remove();
    window.removeEventListener('resize', this.updateSize);
  },
  methods: {
    resizeCanvas() {
      this.sketch.resizeCanvas(this.width, this.height);
    },
    updateSize() {
      this.$nextTick(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.resizeCanvas();
      })
    },
  },
  computed: {
  },
};
</script>

<style>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>
