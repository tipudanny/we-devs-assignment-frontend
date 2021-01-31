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
                    <tr v-for="(product,index) in products.data " :key="index">
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
                                <router-link :to=" '/product/view/'+product.id" class="button is-info is-small">
                                    View
                                </router-link>
                                <router-link :to=" '/product/edit/'+product.id" class="button is-warning is-small">
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
        <section class="mt-4">
            total: {{to}}/{{total}}
            <b-pagination
                :total="total"
                :current.sync="current"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
                :size="size"
                :rounded="isRounded"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-current-label="Current page"
                v-on:change="getAllProducts"
            >
            </b-pagination>
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
            products:{},
            total: 0,
            current: 1,
            perPage: 0,
            rangeBefore: 2,
            rangeAfter: 1,
            size: 'is-small',
            isRounded: true,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right',
            to:0,

        }
    },
    methods:{
        getAllProducts(page = 1)
        {
            axios.get('http://we-devs.api/api/v1/products?page=' + page).then((data)=>{
                //console.log(data)
                if (data.data) {
                    this.products = data.data;
                    this.total = this.products.meta.total;
                    this.current = this.products.meta.current_page;
                    this.perPage = this.products.meta.per_page;
                    this.to = this.products.meta.to;
                }
            }).catch(error => {});
        }
    }
}
</script>

