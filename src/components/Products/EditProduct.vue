<template>
    <div>
        <div class="columns">
            <div class="column"></div>
            <div class="column  is-half">
                <article class="panel">
                    <p class="panel-heading">
                        Edit product
                    </p>
                    <div class="m-3">
                        <form @submit.prevent="updateProduct()" enctype="multipart/form-data">
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Title</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input v-model="productInfo.title"
                                                   class="input is-rounded" type="text"
                                                   placeholder="Product Title" required>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Description</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <div class="control">
                                    <textarea v-model="productInfo.description"
                                              class="textarea is-small"
                                              placeholder="Product Description" required>
                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Price</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input v-model="productInfo.price"
                                                   class="input is-rounded" type="text"
                                                   placeholder="Product Price"
                                                   required >
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Image</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <img :src="image" alt="" class="is-200x200">

                                            <input type="file" ref="imageInput"
                                                   class="form-control input is-rounded mt-3"
                                                   v-bind:class="{ 'is-danger': isDanger }"
                                                   v-on:change="onFileChange">

                                        </p>
                                        <h4 v-if="!isValid" class="title is-4 has-text-danger mt-3">Selected file is not image.</h4>

                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal pb-3">
                                <div class="field-body">
                                    <div class="field">
                                        <div class="file has-name is-fullwidth is-right">
                                            <router-link to="/product">
                                                <button type="button" class="button is-info is-rounded mr-3">Back</button>
                                            </router-link>
                                            <button type="button" v-on:click="resetfrom()" class="button is-danger is-rounded mr-3">Reset</button>
                                            <button v-if="isValid" class="button is-success is-rounded ">Submit</button>
                                            <button v-else class="button is-success is-rounded" disabled>Submit</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "EditProduct",
    mounted() {
        this.apiUrl = this.apiBaseUrl;
        if ( localStorage.token !='' && localStorage.token){
            this.token = localStorage.token
            axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        }
        this.getProductInfo()
    },
    data(){
        return{
            apiUrl:'',
            id: this.$route.params.id,
            token:'',
            productInfo:{
                image:null,
            },
            image:'',
            isDanger:false,
            isValid:true,
            isFullPage: true,
            loadingComponent:'',
        }
    },
    methods:{
        getProductInfo()
        {
            this.loadingOpen();
            var postData = {'id': parseInt(this.id)};
            axios.get(this.apiUrl+'api/v1/products/'+this.id, postData)
                .then(({data}) => {
                    this.productInfo = data.data;
                    this.image = this.apiUrl+data.data.image;
                    this.productInfo.image = null;
                    this.loadingClose();
                });
        },
        onFileChange(e) {
            console.log(e.target.files[0]['type'])
            if( e.target.files[0]['type']==='image/jpeg' ||
                e.target.files[0]['type']==='image/png' ||
                e.target.files[0]['type']==='image/svg+xml' ||
                e.target.files[0]['type']==='image/webp' ||
                e.target.files[0]['type']==='image/gif' )
            {
                this.isValid = true;
                this.isDanger = false;
                this.productInfo.image = e.target.files[0];
                let image = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.image = e.target.result;
                }

            }
            else{
                console.log('not image');
                this.isValid = false;
                this.isDanger = true;
            }

        },
        resetfrom()
        {
            this.$refs.imageInput.value=null;
            this.isValid = true;
            this.isDanger = false;
            this.getProductInfo();
        },
        updateProduct()
        {
            this.loadingOpen();
            let formData = new FormData();
            if (this.productInfo.image !=null){
                formData.append('image', this.productInfo.image);
            }
            else formData.append('image', '');
            formData.append('title', this.productInfo.title);
            formData.append('description', this.productInfo.description);
            formData.append('price', this.productInfo.price);
            axios.post(this.apiUrl+'api/v1/products/'+this.id, formData)
                .then(({data}) => {
                    this.loadingClose();
                    if (data.code == 'success'){
                        this.$buefy.notification.open({
                            message: 'Update Successfully!',
                            type: 'is-success',
                        });
                        //this.getProductInfo();

                    }else{
                        this.$buefy.notification.open({
                            message: 'Something Went Wrong!',
                            type: 'is-danger'
                        });
                    }
                }).catch(error => {
                console.log(error);
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