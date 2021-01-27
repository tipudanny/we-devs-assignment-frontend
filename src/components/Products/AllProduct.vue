<template>
    <div>
        <h4 class="title is-4">All Products</h4>
        <section>
            <div class="table-container">
                <table class="table is-bordered is-fullwidth has-text-centered">
                <thead>
                    <tr class="">
                        <th>#Sl</th>
                        <th>Titile</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product,index) in products " :key="index">
                        <th>{{++index}}</th>
                        <td width="25%">{{product.title}}</td>
                        <td width="35%">{{product.description}}</td>
                        <td>
                            <figure class="image is-128x128">
                                <img v-bind:src="'http://we-devs.api'+product.image">
                            </figure>
                        </td>
                        <td>
                            <div class="buttons is-inline-flex">
                                <router-link :to=" '/product/'+product.id" class="button is-warning is-small">
                                    Edit
                                </router-link>
                                <button class="button is-danger is-small">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </section>
        <section class="mt-3">
            <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    <li><a class="pagination-link is-current">1</a></li>
                    <li><a class="pagination-link">2</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" >3</a></li>
                </ul>
            </nav>
        </section>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'AllProduct',
    mounted() {
        if ( localStorage.token !='' && localStorage.token){
            this.token = localStorage.token
            axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
        }
        this.getAllProducts()
    },
    data() {
        return {
            token:'',
            products:'',
        }
    },
    methods:{
        getAllProducts()
        {
            axios.get('http://we-devs.api/api/v1/products?page=1').then((data)=>{
                //console.log(data)
                if (data.data) {
                    this.products = data.data.data
                }
            }).catch(error => {});
        }
    }
}
</script>

