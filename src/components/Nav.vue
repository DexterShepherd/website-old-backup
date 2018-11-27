<template>
  <nav>
    <router-link to='/about'>About</router-link>
    <router-link to='/projects'>Work</router-link>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  margin: 32px 0;
}
nav a {
  margin: 0 16px;
  color: var(--black);
  text-decoration: none;
}
</style>
