<template>
    <div>
        <div class="title mb-6 has-text-centered is-success">Product Details</div>
        <div class="columns">
            <div class="column"></div>
            <div class="column  is-half">
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
                                <p class="subtitle is-6">@johnsmith</p>
                            </div>
                        </div>

                        <div class="content">
                            {{productInfo.description}}
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
        }
    },
    methods:{
        getProductInfo()
        {
            var postData = {'id': parseInt(this.id)};
            axios.get('http://we-devs.api/api/v1/products/'+this.id, postData)
                .then(({data}) => {
                    this.image = 'http://we-devs.api'+data.data.image;
                    this.productInfo = data.data;
                });
        },
    }
}
</script>

<style scoped>

</style>