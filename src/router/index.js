import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios"
import Layout from "@/views/Layout";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login', name: 'Login',
        component: function () {return import('../views/Login')}
    },
    { path: '/',  component: Layout,
        meta: {authAccess: true},
        children:
            [
                { path: '/', name: 'Product ',
                    component: function () { return import('@/components/Products/AllProduct') }
                },
                { path: '/product', name: 'All Product ',
                    component: function () { return import('@/components/Products/AllProduct') }
                },
                { path: '/product/view/:id', name: 'Product Details',
                    component: function () { return import('@/components/Products/ViewProduct') }
                },
                { path: '/product/edit/:id', name: 'Product Update',
                    component: function () { return import('@/components/Products/EditProduct') }
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

router.beforeEach((to, from, next) => {
    //let documentTitle = `${ process.env.VUE_APP_TITLE } - ${ to.name }`;
    let documentTitle = `WeDevs - ${ to.name }`;
    if (to.params.title){
        documentTitle += ` - ${ to.params.title }`
    }
    document.title = documentTitle;

    if (to.matched.some(record => record.meta.authfailed)) {
        if (Vue.auth.isAutheticated()) {
            next({
                name: 'Product'
            })
        } else next()
    } else if (to.matched.some(record => record.meta.authAccess)) {
        if ( !Vue.auth.isAutheticated() ) {
            next({
                name: 'Login'
            })
        } else next()
    }

    next()
    //console.log(localStorage.user_type)

})

export default router
