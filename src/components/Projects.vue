<template>
  <div class='cards-container'>
    <Card project='adventura'>
      <p>Audio reactive particle system</p>
    </Card>
    <Card project='duncan-zone' title='duncan.zone'>
      <p>
        Static landing page
      </p>
    </Card>
    <Card project='dexter-writes-code'
          title='Dexter Writes Code'
          thumbnailFormat='png'
          link='https://www.instagram.com/dexterwritescode/'
    >
      <p>
        Self indulgent instagram work
      </p>
    </Card>
    <Card
      project='kadenze-creative-coding'
      thumbnailFormat='png'
      title='Kadenze Branding'
    >
      <p>
        Creative coding works assets and branding
      </p>
    </Card>
    <Card project='calarts-window-lace' title='Calarts Window Lace'>
      <p>
        Static installation
      </p>
    </Card>
    <Card project='noise-pixel'>
      <p>
        Study of pixel displacement using 3d perlin noise
      </p>
    </Card>
    <Card project='paintbrush'>
      <p>
        Interactive installation
      </p>
    </Card>
    <Card project='searching'>
      <p>
        Immersive audio installation
      </p>
    </Card>
    <Card project='shader-club' title='shader.club'>
      <p>
        Galley of fragment shader art made by Los Angele artists
      </p>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/ProjectCard';

export default {
  components: {
    Card,
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto;
}
</style>
