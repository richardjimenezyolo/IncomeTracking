import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';

Vue.use(Vuetify)

new Vue({
	vuetify: new Vuetify,
	el: '#app',
	render: h => h(App)
})