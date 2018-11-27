<template>
  <div>
    <h1>Kadenze Creative Coding Projects</h1>
    <div class='proj-desc'>
      <p>
        Creative coding works produced for 
        <a href='www.kadenze.com'>
          <strong>Kadenze inc.</strong>
        </a>
      </p>
      <p>
        Developed with <strong>Processing</strong> and <strong>Javascript</strong>.
      </p>
    </div>
    <div class='proj-img-col shadow'>
      <img src="./../assets/projects/kadenze-creative-coding/five.gif" alt="">
      <img src="./../assets/projects/kadenze-creative-coding/sphere.gif" alt="">
      <img src="./../assets/projects/kadenze-creative-coding/dark-sphere.gif" alt="">
      <p>Branded content displayed on <a href="https://creativeapplications.net">creativeapplications.net</a></p>
      <img src="./../assets/projects/kadenze-creative-coding/halloween.gif" alt="">
      <img src="./../assets/projects/kadenze-creative-coding/heart.gif" alt="">
      <p>Gifs and Coding tutorials sent to all Kadenze Memebers on Halloween and Valentines day.</p>
    </div>
  </div>
</template>

<style scoped>
.proj-img-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.proj-img-col img {
  display: block;
  max-width: 500px;
  margin: 32px 0;
}

.proj-img-col p {
  max-width: 500px;
}
</style>
