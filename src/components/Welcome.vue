<template>
  <div class='page'>
    <Sketch />
    <h1>DEXTER J SHEPHERD</h1>
    <p>Creative Front End Developer</p>
    <slot></slot>
  </div>
</template>

<script>
import Sketch from './Sketch';

export default {
  components: {
    Sketch,
  },
};
</script>

<style scoped>
h1 {
  padding-top: 64px;
  font-size: 3em;
}

p {
  font-size: 1.5em;
}
</style>
