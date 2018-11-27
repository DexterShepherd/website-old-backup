import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Projects from '@/components/Projects';
import Project from '@/components/Project';
import About from '@/components/About';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/project/:slug',
      name: 'Project',
      component: Project,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});
