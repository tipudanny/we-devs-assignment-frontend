<template>
    <div class="m-3">
        <b-navbar>
            <template #brand>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img src="https://i0.wp.com/us.wordcamp.org/2015/files/2015/09/wedevs-logo1.png?fit=1000%2C322&ssl=1"
                         style="min-height: 50px;min-width:100px"
                         alt="We Devs">
                </b-navbar-item>
            </template>
            <template #start>
                <b-navbar-item href="#">
                    <router-link to="/product">All Product</router-link>
                </b-navbar-item>
                <b-navbar-item href="#">
                    <router-link to="/create-product">Add Product</router-link>
                </b-navbar-item>
            </template>

            <template #end>
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class=" is-primary" @click="logout()">
                            <strong>Logout</strong>
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Navbar",
    mounted() {
        if ( localStorage.token !='' && localStorage.token){
            this.token = localStorage.token
            axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        }
    },
    date(){
        return{
            token:'',
        }
    },
    methods:{
        logout(){
            axios.post('http://we-devs.api/api/v1/logout').then((data)=>{
                if (data.data.code == 'logout') {
                    localStorage.token = '';
                    localStorage.expired_out = '';
                    this.token = '';
                    this.$router.push('/login')
                }
            }).catch(error => {});
        },
    }
}
</script>

<style scoped>

</style>