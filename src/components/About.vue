<template>
  <div class='page'>
    <Sketch stroke='#f0f0f0' />
    <router-link to='/'>
      <h1> Hello. </h1>
    </router-link>
    <p>
      I'm a software developer based in Los Angeles CA.
    </p>

    <p>
      I'm currently writing code for <a href="http://kadenze.com"><strong>Kadenze inc</strong></a> and teaching courses in the <a href="https://calarts.edu/"><strong>CalArts</strong></a> music technology program.
    </p>

    <p>
    I spend most of my time building things, making <a href="https:/w.instagram.com/dexterwritescode/"><strong>art</strong></a>, and riding my bike.
    </p>

    <p>
    I'm always interested in new projects, big and small. <a href="mailto:dexterjshepherd@gmail.com"><strong>Email</strong></a> me if you want to work together.
    </p>
    <div class='section'>
      <p>Writting</p>
      <ul>
        <li><a href="https://blog.kadenze.com/creative-technology/p5-js-crash-course-recreate-art-you-love/">p5.js Crash Course: Recreate Art You Love</a></li>
        <li><a href='https://blog.kadenze.com/creative-technology/p5-js-crash-course-pumpkin-wave/'>p5.js Crash Course ||: Pumpkin Wave</a></li>
      </ul>
    </div>
    <div class='section'>
      <p>Teaching / Speaking</p>
      <ul>
        <li>Calarts ICOM 101 - Media and Web Development</li>
        <li>Creative Coding Fest 2018 - Oscillation</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Sketch from '@/components/Sketch';

export default {
  components: {
    Sketch,
  },
};
</script>

<style scoped>
h1 {
  padding-bottom: 32px;
}
p, .section {
  font-size: 1.3em;
  text-align: left;
  max-width: 500px;
  padding-bottom: 8px;
  margin: 0 auto;
}

.section {
  padding-top: 32px;
}

a {
  position: relative;
}
a:hover:after {
  transform: none;
}

a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 1px;
  border-bottom: 1px solid var(--black);
  transform: scale(0);
  transition: all .3s ease-in-out;
}
</style>
