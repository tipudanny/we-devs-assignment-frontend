import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/Layout";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login', name: 'Login',
        component: function () {return import('../views/Login')}
    },
    { path: '/', name: 'Product', component: Layout,
        children:
            [
                { path: '/', name: 'Product ',
                    component: function () { return import('@/components/Products/AllProduct') }
                },
                { path: '/product', name: 'Product ',
                    component: function () { return import('@/components/Products/AllProduct') }
                },
                { path: 'create-product', name: 'Product-Add',
                    component: function () { return import('@/components/Products/AddProduct') }
                },
            ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
