<template>
  <component 
    :is='linkComponent'
    :href='link'
    :to='projectDetail'
    class='card'>
    <div class='project-holder' :style='containerStyle'>
      <div class='overlay'></div>
      <div class='caption'>
        <h2>{{ computedTitle }}</h2>
        <div class='underline'></div>
        <slot></slot>
      </div>
    </div>
  </component>
</template>

<script>
import titleize from 'titleize';

export default {
  props: {
    project: {
      type: String,
      required: true,
    },
    thumbnailFormat: {
      type: String,
      default: 'jpg',
    },
    title: {
      type: String,
      required: false,
    },
    link: {
      type: String,
    },
  },
  computed: {
    containerStyle() {
      return {
        backgroundImage: `url(${require(`../assets/projects/${this.project}/thumbnail.${this.thumbnailFormat}`)})`,
      };
    },
    computedTitle() {
      if (this.title) {
        return this.title;
      }

      return titleize(this.project.replace('-', ' '));
    },
    projectDetail() {
      return `project/${this.project}`;
    },
    linkComponent() {
      if (this.link) {
        return 'a';
      }
      return 'router-link';
    },
  },
};
</script>

<style>
a.card {
  width: 50%;
  min-width: 300px;
  color: var(--black);
  text-decoration: none;
  flex-grow: 2;
}
.project-holder {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  opacity: 0.0;
  z-index: 1;
  transition: all .3s ease-in-out;
}

.caption {
  max-width: 70%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  opacity: 0;
  transition: all .5s ease-in-out;
}

.caption h2 {
  transition: all .5s ease-in-out;
  transform: translateY(-20px);
  margin-bottom: 8px;
}

.caption p {
  font-weight: 600;
  transition: all .5s ease-in-out;
  transform: translateY(20px);
}

.caption .underline {
  height: 1px;
  width: 100%;
  border-bottom: 1px solid var(--black);
  margin-bottom: 8px;
  transform: scaleX(0);
  opacity: 0;
  transition: all .5s ease-in-out;
  transition-delay: .1s;
}

.project-holder:hover .overlay {
  opacity: 0.8;
}

.project-holder:hover .caption {
  opacity: 1.0;
}

.project-holder:hover .underline {
  opacity: 1.0;
}

.project-holder:hover .caption * {
  transform: none;
}

</style>
