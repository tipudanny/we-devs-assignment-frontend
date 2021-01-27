<template>
    <div>
        <div class="title mb-6 has-text-centered is-success">Add new product</div>
        <div class="columns">
            <div class="column"></div>
            <div class="column  is-half">
                <form @submit.prevent="createProduct()" enctype="multipart/form-data">
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
                                              placeholder="Small textarea" required>
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
                                    <img :src="image" alt="" height="100px">

                                    <input type="file" ref="imageInput"
                                           class="form-control input is-rounded mt-3"
                                           v-bind:class="{ 'is-danger': isDanger }"
                                           v-on:change="onFileChange">

                                </p>
                                <h4 v-if="!isValid" class="title is-4 has-text-danger mt-3">Selected file is not image.</h4>

                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <div class="file has-name is-fullwidth is-right">
                                    <button type="button" v-on:click="resetfrom()" class="button is-danger is-rounded is-medium mr-3">Reset</button>
                                    <button v-if="isValid" class="button is-success is-rounded is-medium">Submit</button>
                                    <button v-else class="button is-success is-rounded is-medium" disabled>Submit</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { NotificationProgrammatic as Notification } from 'buefy'

export default {
    name: "AddProduct",
    mounted() {
        if ( localStorage.token !='' && localStorage.token){
            this.token = localStorage.token
            axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        }
    },
    data(){
        return{
            token:'',
            productInfo:{
                title:'',
                description:'',
                price:0,
                image:null,
            },
            image:'',
            isDanger:false,
            isValid:true,
        }
    },
    methods:{
        onFileChange(e) {
            //console.log(e.target.files[0]['type'])
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
        createProduct()
        {
            let formData = new FormData();
            if (this.productInfo.image !=null){
                formData.append('image', this.productInfo.image);
            }
            else formData.append('image', '');
            formData.append('title', this.productInfo.title);
            formData.append('description', this.productInfo.description);
            formData.append('price', this.productInfo.price);
            axios.post('http://we-devs.api/api/v1/products', formData)
                .then(({data}) => {
                    console.log(data);
                    if (data.code == 'success'){
                        this.$buefy.notification.open({
                            message: 'Create Product Successfully!',
                            type: 'is-success'
                        });
                        this.resetfrom();
                        this.image='';
                        this.productInfo.image='';
                    }
                }).catch(function (error) {
                if (error.response.data) {
                    var getError = error.response.data.errors;
                    console.log(getError.title[0]);
                    if (getError.title[0]){
                        Notification.open({
                            message: getError.title[0],
                            type: 'is-danger'
                        });
                    }
                }
            });
        },
        resetfrom()
        {
            this.isValid = true;
            this.isDanger = false;
            this.productInfo={
                title:'',
                description:'',
                price:0,
                image:null,
            }
        },
    }
}
</script>

<style scoped>

</style>