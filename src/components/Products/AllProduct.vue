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
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product,index) in products.data " :key="index">
                        <th>{{++index}}</th>
                        <td width="20%">{{product.title}}</td>
                        <td width="30%">{{product.description}}</td>
                        <td width="10%">{{product.price}}</td>
                        <td>
                            <figure class="image is-80x80">
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

                                <button v-on:click="deleteProduct(product.id)" class="button is-danger is-small">Delete</button>
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
            isFullPage: true,
            loadingComponent:'',

        }
    },
    methods:{
        getAllProducts(page = 1)
        {
            this.loadingOpen()
            axios.get('http://we-devs.api/api/v1/products?page=' + page).then((data)=>{
                //console.log(data)
                if (data.data) {
                    this.products = data.data;
                    this.total = this.products.meta.total;
                    this.current = this.products.meta.current_page;
                    this.perPage = this.products.meta.per_page;
                    this.to = this.products.meta.to;
                    this.loadingClose();
                }
            }).catch(error => {});
        },
        deleteProduct(id)
        {
            this.$buefy.dialog.confirm({
                title: 'Deleting account',
                message: 'Are you sure you want to <b>delete</b> this product? This action cannot be undone.',
                confirmText: 'Delete Product',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    this.loadingOpen();
                    axios.delete('http://we-devs.api/api/v1/products/'+id).then((response)=>{
                        if ( response.data.code == 'deleted' ){
                            this.getAllProducts();
                            this.$buefy.notification.open({
                                message: 'Success :: Product Deleted !',
                                type: 'is-success'
                            });
                        }
                        else {
                            this.$buefy.notification.open({
                                message: 'ERROR :: Something Went Wrong !',
                                type: 'is-danger'
                            });
                        }

                    }).catch(error => {
                        console.log(error);
                    });
                    this.loadingClose();

                }
            })
        },
        loadingOpen()
        {
            this.loadingComponent = this.$buefy.loading.open({
                container: this.isFullPage ? null : this.$refs.element.$el
            })
        },
        loadingClose()
        {
            setTimeout(() => this.loadingComponent.close(), 1 * 100)
        },
    }
}
</script>

