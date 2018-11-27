const THREE = require('three')
const t = THREE

export default class Particles {
  constructor(ele) {
    this.container = ele
    this.camera = new t.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight,
      .1,
      1000
    )

    this.camera.position.z = 300
    this.scene = new t.Scene()

    this.scene.add(this.camera)

    this.renderer = new t.WebGLRenderer()
    this.renderer.setClearColor(0xfdfdfd)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.halfWidth = window.innerWidth * 0.5
    this.halfHeight = window.innerHeight * 0.5

    this.container.appendChild(this.renderer.domElement)
    this.defineGeometry()

    this.mouseX = 0
    this.mouseY = 0
    this.scaleMouseX = 0
    this.scaleMouseY = 0
    this.paused = false;


    document.addEventListener( 'mousemove', (e) => {
      this.mouseX = e.clientX - this.halfWidth
      this.mouseY = e.clientY - this.halfHeight
      this.scaleMouseX = (this.mouseX + this.halfWidth) / this.width
      this.scaleMouseY = (this.mouseY + this.halfHeight) / this.height
    })

    window.addEventListener('devicemotion', (e) => {
      let x = e.rotationRate.beta 
      let y = e.rotationRate.gamma
      this.mouseX = x 
      this.mouseY = y
    }, true)

    this.panX = 0
    this.panY = 0
  }


  defineGeometry() {
    this.speed = 0
    this.numParticles = 20000
    this.initialSpread = 1000 
    this.numPoints = 5
    this.particles = []

    const initialGeometry = new t.Geometry()

    for( let i = 0; i < this.numParticles; i += 1 ) {
      const v = new t.Vector3(
        ( Math.random() * this.initialSpread ) - this.initialSpread * 0.5,
        ( Math.random() * this.initialSpread ) - this.initialSpread * 0.5,
        ( Math.random() * this.initialSpread ) - this.initialSpread * 0.5
      )
      initialGeometry.vertices.push(v)
      this.particles.push(new Particle(v, i % this.numPoints));
    }

    new t.TextureLoader().load(require('./assets/sprite.png'), (tex) => {
      const particleMaterial = new t.PointsMaterial({ 
        color: 0x303030,
        map: tex,
        alphaTest: 0.01,
        transparent: true
      })
      this.system = new t.Points(initialGeometry, particleMaterial)
      this.scene.add(this.system)
    });

    this.light = new t.PointLight(0xff00ff, 1, 100);
    this.light.position.set(50, 50, 50)
    this.scene.add(this.light)

    this.cameraXOffset = 0
    this.cameraYOffset = 0
    this.frames = 0
  }

  update() {
    this.speed += 0.001

    if (this.system) {
      for( let i = 0; i < this.system.geometry.vertices.length; i += 1 ) {
        const v = this.system.geometry.vertices[i]
        v.copy( this.particles[i].update(v, this.numPoints, this.speed) );
      }

      this.system.geometry.verticesNeedUpdate = true;
    }

    this.cameraXOffset += mapRange(this.mouseX, -this.halfWidth, this.halfWidth, -0.5, 0.5)
    this.cameraYOffset += mapRange(this.mouseY, -this.halfHeight, this.halfHeight, -0.5, 0.5)

    this.cameraXOffset = Math.min(Math.max(this.cameraXOffset, -50), 50)
    this.cameraYOffset = Math.min(Math.max(this.cameraYOffset, -50), 50)

    this.camera.position.x = this.cameraXOffset 
    this.camera.position.y = this.cameraYOffset
  }

  animate() {
    if ( !this.paused ) {
      requestAnimationFrame(() => this.animate())
    }
    this.update()
    this.renderer.render(this.scene, this.camera)
  }
  pause() {
    this.paused = true
  }
  play() {
    if ( this.paused ) {
      this.paused = false
      this.animate()
    }
  }
}

class Particle {
  constructor(l, point_index) {
    this.loc = new THREE.Vector3();
    this.loc.copy(l);

    this.index = point_index;
    this.limit = 0.5;
    this.scaler = 0.01;

    this.vel = new THREE.Vector3(_random(1),
                                 _random(1),
                                 _random(1));

    this.acc = new THREE.Vector3(0, 0, 0);
  }

  update(loc, num_circles, speed) {
    this.loc.copy(loc);

    this.theta = mapRange(this.index % num_circles, 0, 5, 0, Math.PI * 2);

    if(Math.random()  > 0.99) {
      this.vel.copy(new THREE.Vector3(0, 0, 0));
    }

    let r = 70 

    this.dest = new THREE.Vector3(
      Math.sin(speed + (this.theta * Math.sin(speed) + Math.PI)) * r,
      Math.cos(speed + (this.theta * Math.cos(speed) + Math.PI)) * r,
      (Math.sin(speed + this.theta) * Math.cos(speed + this.theta) * 100) - 200
    );

    this.acc.copy(this.dest.sub(this.loc));
    this.acc.normalize();
    this.acc.multiplyScalar(this.scaler);
    this.vel.add(this.acc);
    this.loc.add(this.vel);

    if (Math.random() > 0.999) {
      this.index = (this.index + 1 % num_circles);
    }

    return this.loc;
  }
}

function mapRange(value, oldMin, oldMax, newMin, newMax) {
  return (((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}

function _random(size) {
  return (Math.random() * size ) - ( size / 2.0 );
}

