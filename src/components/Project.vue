<template>
  <div>
    <component class='project' :is='$route.params.slug'></component>
  </div>
</template>

<script>
import Adventura from './Adventura';
import DuncanZone from './DuncanZone';
import KadenzeCreativeCoding from './KadenzeCreativeCoding';
import NoisePixel from './NoisePixel';
import Paintbrush from './Paintbrush';
import Searching from './Searching';
import ShaderClub from './ShaderClub';
import DexterWritesCode from './DexterWritesCode';
import CalartsWindowLace from './CalartsWindowLace';

export default {
  components: {
    Adventura,
    DuncanZone,
    KadenzeCreativeCoding,
    NoisePixel,
    Paintbrush,
    Searching,
    ShaderClub,
    DexterWritesCode,
    CalartsWindowLace,
  },
};
</script>

<style>
.project h1 {
  margin-bottom: 16px;
}

.proj-img-col {
  width: 100%;
  margin: 32px 0;
}

.proj-img-col img {
  width: 80%;
}

.proj-desc {
  max-width: 500px;
  text-align: left;
  padding: 0 10%;
  margin: 0 auto;
}

.proj-desc p {
  margin-bottom: 8px;
}


.proj-link {
  float: right;
  margin-bottom: 16px;
}

div.shadow img, img.shadow {
  margin-bottom: 32px;
  border-radius: 4px;
  box-shadow: 1px 5px 32px rgba(0, 0, 0, 0.3);
}

.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
}

.embed-container iframe, .embed-container object, .embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
