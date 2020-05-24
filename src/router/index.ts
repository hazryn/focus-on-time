import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Resources from '../views/Resources.vue';
import Search from '../views/Search.vue';
import WorkLog from '../views/WorkLog.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/work-log',
    name: 'WorkLog',
    component: WorkLog,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
