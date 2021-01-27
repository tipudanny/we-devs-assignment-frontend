<template>
    <div>
        <div class="title mb-6 has-text-centered is-success">Edit product</div>
        <div class="columns">
            <div class="column"></div>
            <div class="column  is-half">
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

export default {
    name: "EditProduct",
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
            productInfo:{
                image:null,
            },
            image:'',
            isDanger:false,
            isValid:true,
        }
    },
    methods:{
        getProductInfo()
        {
            var postData = {'id': parseInt(this.id)};
            axios.get('http://we-devs.api/api/v1/products/'+this.id, postData)
                .then(({data}) => {
                    this.productInfo = data.data;
                    this.image = 'http://we-devs.api'+data.data.image;
                    this.productInfo.image = null;
                });
        },
        onFileChange(e) {
            if(e.target.files[0]['type']!=='image/jpeg')
            {
                console.log('not image');
                this.isValid = false;
                this.isDanger = true;
            }
            else{
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

        },
        resetfrom()
        {
            this.isValid = true;
            this.isDanger = false;
        },
        updateProduct()
        {
            let formData = new FormData();
            if (this.productInfo.image !=null){
                formData.append('image', this.productInfo.image);
            }
            else formData.append('image', '');
            formData.append('title', this.productInfo.title);
            formData.append('description', this.productInfo.description);
            formData.append('price', this.productInfo.price);
            axios.post('http://we-devs.api/api/v1/products/'+this.id, formData)
                .then(({data}) => {
                    //console.log(data);
                    if (data.code = 'success'){
                        this.$buefy.notification.open({
                            message: 'Update Successfully!',
                            type: 'is-success'
                        });
                        this.getProductInfo();
                    }else{
                        this.$buefy.notification.open({
                            message: 'Something Went Wrong!',
                            type: 'is-danger'
                        });
                    }
                }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>

</style>