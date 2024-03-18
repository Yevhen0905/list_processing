import {createRouter, createWebHistory} from 'vue-router';
import MainPage from '../views/MainPage.vue';
// import ListPeople from '../views/ListPeople.vue';
// import ListPreview from '../views/ListPreview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    }
    // {
    //   path: '/list',
    //   name: 'list',
    //   component: ListPeople
    // },
    // {
    //   path: '/preview',
    //   name: 'preview',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: ListPreview
    // }
  ]
});

export default router;
