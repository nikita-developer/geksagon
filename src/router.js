import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import store from '@/store.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                auth: true
            }
        },
        {
            path: '/Login',
            component: Login,
        },
        {
            path: '/Register',
            component: Register,
        },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
    if(!store.state.auth && to.meta.auth) {
        return next('/Login')
    }

    if(store.state.auth && !to.meta.auth) {
        return next('/')
    }

    return next()
})

export default router