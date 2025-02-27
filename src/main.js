import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "bulma/css/bulma.min.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV, faEdit, faTrash);

createApp(App)
  .use(store)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
