import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import qs from 'qs';
Vue.use(ElementUI);
// let instance = axios.create({
    // headers: {
        // 'content-type': 'application/x-www-form-urlencoded', 
        // 'Access-Control-Allow-Origin' : '*'
        // },
    // withCredentials: true
// })
Vue.prototype.$axios = axios;
Vue.prototype.$qs= qs;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');