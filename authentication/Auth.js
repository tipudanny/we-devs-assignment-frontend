import axios from "axios";
export default function (Vue) {
    Vue.auth = {

        // Get token
        getToken() {
            var token = localStorage.token
            var expires_time = new Date().getTime()
            var expired_out = localStorage.expired_out

            if (!token || !expired_out ) {
                return null
            }

            if (expires_time > (expired_out-1000) ) {
                axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
                axios.post('http://we-devs.api/api/v1/refresh').then((data)=>{
                    if (data.data.access_token && data.data.access_token != ''){
                        localStorage.token = data.data.access_token;
                        localStorage.expired_out = new Date().getTime()+data.data.expires_in*1000;
                        location.reload();
                    }
                })
                return token
            }
            else if(expires_time > expired_out)
            {
                this.destroyToken()
                return null
            }
            else {
                return token
            }
        },

        // destroy token
        destroyToken() {
            localStorage.removeItem('token')
            localStorage.removeItem('expiration')
            localStorage.clear();
        },

        // is authenticated
        isAutheticated() {
            if (this.getToken()) {
                return true;
            } else {
                return false;
            }
        }
    }

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: () => {
                return Vue.auth;
            }
        }
    })
}