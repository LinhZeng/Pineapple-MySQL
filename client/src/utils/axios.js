import axios from 'axios';
import {getToken} from "./auth";
import router from '@/router/index'

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.timeout = 25000;
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.responseType = 'json'

//interceptor拦截器
axios.interceptors.request.use(function(config){
    if(getToken()) {
        var token = getToken();
        config.headers.token = token;
        if(config.data) config.data.token = token;
        else if(config.params) config.params.token = token;
    }
    return config;
},function(err){
    console.log(err);
    return Promise.reject('请求错误')
})

axios.interceptors.response.use(function(response) {
    // console.log(response)
    var res = response.data;
    if(typeof(res)==='string' && res.indexOf('code') > -1 && res.indexOf('result') > -1) {
        res = JSON.parse(res);
    }
    if(res.code === '1001') { // 用户token过期需要重新登录
        this.$message.error('登录信息已过期，请重新登录');
        localStorage.clear();
        router.push('/index')
        return Promise.reject(res)
    } else {
        return Promise.resolve(res);
    }
}, function(err) {
    return Promise.reject(res)
})

export default axios;