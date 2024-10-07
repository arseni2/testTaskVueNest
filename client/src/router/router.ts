import {createRouter, createWebHistory} from 'vue-router'

import Auth from '../pages/Auth.vue'
import Main from "../pages/Main.vue";

const routes = [
	{ path: '/auth', component: Auth },
	{ path: '/main', component: Main },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})