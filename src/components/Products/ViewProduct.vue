<template>
    <div>
        <div class="columns">
            <div class="column"></div>
            <div class="column  is-half">
                <article class="panel">
                    <p class="panel-heading">
                        Product Details
                    </p>
                </article>
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img :src="image" alt="Product image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{productInfo.title}}</p>
                                <p class="subtitle is-6"><strong class="has-text-danger">Price: {{productInfo.price}} tk</strong></p>
                            </div>
                        </div>

                        <div class="content">
                            {{productInfo.description}}
                            <br>
                        </div>
                    </div>
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="image" alt="Product image">
                        </figure>
                    </div>
                </div>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ViewProduct",
    mounted() {
        if ( localStorage.token !='' && localStorage.token){
            this.token = localStorage.token
            axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        }
        this.getProductInfo()
    },
    data(){
        return{
            id: this.$route.params.id,
            token:'',
            productInfo:'',
            image:'',
            isFullPage: true,
            loadingComponent:'',
        }
    },
    methods:{
        getProductInfo()
        {
            this.loadingOpen();
            var postData = {'id': parseInt(this.id)};
            axios.get('http://we-devs.api/api/v1/products/'+this.id, postData)
                .then(({data}) => {
                    this.image = 'http://we-devs.api'+data.data.image;
                    this.productInfo = data.data;
                    this.loadingClose();
                });
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

<style scoped>

</style>