<template>
    <div>
        <div class="title m-6 has-text-centered is-success">Registration</div>
        <div class="columns is-mobile">
            <div class="column"></div>
            <div class="column  is-half">
                <form @submit.prevent="register()" enctype="multipart/form-data">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Name</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input v-model="userInfo.name" class="input is-rounded" type="text" placeholder="your name">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Email</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input v-model="userInfo.email" class="input is-rounded" type="email" placeholder="tipu@gmail.com">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Password</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input v-model="userInfo.password" class="input is-rounded" type="password" placeholder="********">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Confirm Password</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input v-model="userInfo.password_confirmation" class="input is-rounded" type="password" placeholder="********">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <div class="file has-name is-fullwidth is-right">
                                    <button type="submit" class="button is-success is-rounded">Register</button>
                                </div>
                                <div class="navbar-end">
                                    <p>You registered ?
                                        <router-link to="login" class="has-text-danger">Login here </router-link>
                                    </p>
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
import { NotificationProgrammatic as Notification } from 'buefy';
export default {
    name: "Register",
    mounted() {
    },
    data(){
        return{
            token:'',
            userInfo:{
                name:'tipu danny',
                email:'tipu@gmail.com',
                password:'12345678',
                password_confirmation:'12345678',
            },
            isFullPage: true,
            loadingComponent:'',
        }
    },
    methods:{
        register(){
            this.loadingOpen();
            axios.post('http://we-devs.api/api/v1/register',this.userInfo).then((data)=>{
                if (data.data.user){
                    this.$buefy.notification.open({
                        message: 'Registration Successfully!',
                        type: 'is-success',
                    });
                    this.loadingClose();
                    this.$router.push('/login');
                }

            }).catch(error => {
                this.loadingClose();
                //console.log(error.response.data.errors.email[0]);
                var errorMsg='';
                if (error.response.data.errors.email){
                    errorMsg = error.response.data.errors.email[0]
                }
                if (error.response.data.errors.name){
                    errorMsg = error.response.data.errors.name[0]
                }
                if (error.response.data.errors.password){
                    if (error.response.data.errors.password[0]){
                        errorMsg = error.response.data.errors.password[0]
                    }
                    if (error.response.data.errors.password[1]){
                        errorMsg = error.response.data.errors.password[1]
                    }

                }
                Notification.open({
                    message: errorMsg,
                    type: 'is-danger',
                });

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
yle>