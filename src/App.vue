<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100i');

:root {
  --white: #FDFDFD;
  --black: #101010;
}

body {
  margin: 0;
  border: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: italic;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black);
}

.page {
  min-height: 100vh;
}

h1, h2, h3, p, a {
  margin: 0;
  padding: 0;
  color: var(--black);
  text-decoration: none;
}
</style>
