import axios from 'axios';
import { router } from './router.js'

const ApiService = {
  get(url) {
    return axios.get(`${url}`);
  },
  post(url, params) {
    return axios.post(`${url}`, params);
  },
  put(url, params) {
    return axios.put(`${url}`, params);
  },
  delete(url) {
    return axios.delete(`${url}`);
  },

  getWithToken(url) {
    const accessToken = this.getToken();
    this.validToken();

    return axios.get(`${url}`, {
      headers: {
        'Authorization': accessToken
      }
    });
  },

  postWithToken(url, params) {
    const accessToken = this.getToken();
    this.validToken();
    return axios.post(`${url}`, params, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    });
  },

  patchWithToken(url, request) {
    const accessToken = this.getToken();
    return axios.patch(`${url}`, request, {
      headers: {
        'Authorization': accessToken
      }
    });
  },

   putWithToken(url, request) {
    const accessToken = this.getToken();
    return axios.put(`${url}`, request, {
      headers: {
        'Authorization': accessToken
      }
    });
  },

  deleteWithToken(url) {
    const accessToken = this.getToken();
    return axios.delete(`${url}`, {
      headers: {
        'Authorization': accessToken
      }
    });
  },


  validToken() {
    const stirngToken = `${localStorage.getItem("accessToken")}`;
    const Token = JSON.parse(stirngToken);
    const expireTime = Date.now();
    

    if (Token.expire - expireTime < 10*1000) {
      this.removeToken();
      
        if (window.location.href === "https://books4dev.me/") {
          router.go(this.$router.currentroute);
        } else {
          router.push('/');
      }  
    }
  },

  getToken() {
    const stirngToken = `${localStorage.getItem("accessToken")}`;
    const Token = JSON.parse(stirngToken);
    return `Bearer ${Token.accessToken}`;
  },

  removeToken() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export default ApiService;