import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// eslint-disable-next-line no-unused-vars
import Date from "./js/src/date-nl-NL";

Vue.config.productionTip = false;
Vue.use(VueRouter);

import InfoComponent from "@/components/InfoComponent";
import GameComponent from "@/components/GameComponent";
import LoginComponent from "@/components/LoginComponent";
import playerInfoComp from "@/components/playerInfoComp";
import DebugComponent from "@/components/DebugComponent";
import RegisterComponent from "@/components/RegisterComponent";

const routes = [
  { path: '/info', component: InfoComponent },
  { path: '/games', component: GameComponent },
  { path: '/login', component: LoginComponent },
  { path: '/user', component: playerInfoComp },
  { path: '/debug', component: DebugComponent },
  { path: '/register', component: RegisterComponent },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
