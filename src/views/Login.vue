<template>
    <div>
        <div class="title m-6 has-text-centered is-success">Please Login</div>
        <div class="columns is-mobile">
            <div class="column"></div>
            <div class="column  is-half">
                <form @submit.prevent="login()" enctype="multipart/form-data">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Email</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input v-model="loginInfo.email" class="input is-rounded" type="email" placeholder="tipu@gmail.com">
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
                                    <input v-model="loginInfo.password" class="input is-rounded" type="password" placeholder="********">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <div class="file has-name is-fullwidth is-right">
                                <button type="submit" class="button is-success is-rounded is-medium">Login</button>
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
        name: "Login",
        mounted() {
            if ( localStorage.token !=''  && localStorage.token){
                this.token = localStorage.token
            }
        },
        data(){
            return{
                token:'',
                loginInfo:{
                    email:'tipu@gmail.com',
                    password:'12345678',
                },
                isFullPage: true,
                loadingComponent:'',
            }
        },
        methods:{
            login(){
                this.loadingOpen();
                axios.post('http://we-devs.api/api/v1/login',this.loginInfo).then((data)=>{
                    if (data.data.access_token && data.data.access_token != ''){
                        this.$buefy.notification.open({
                            message: 'Login Successfully!',
                            type: 'is-success',
                        });
                        localStorage.token = data.data.access_token;
                        localStorage.expired_out = new Date().getTime()+data.data.expires_in*1000;
                        this.$router.push('/product')
                    }
                    this.loadingClose();
                }).catch(error => {
                    this.loadingClose();
                    Notification.open({
                        message: 'Credential Error!',
                        type: 'is-danger',
                    });
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
yle>