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
        Authorization: accessToken
      }
    });
  },

  postWithToken(url, params) {
    const accessToken = this.getToken();
    this.validToken();
    return axios.post(`${url}`, params, {
      headers: {
        contentType: 'application/json',
        Authorization: accessToken
      }
    });
  },

  putWithToken(url, request) {
    const accessToken = this.getToken();
    return axios.put(`${url}`, request, {
      headers: {
        Authorization: accessToken
      }
    });
  },

  deleteWithToken(url) {
    const accessToken = this.getToken();
    return axios.delete(`${url}`, {
      headers: {
        Authorization: accessToken
      }
    });
  },


  validToken() {
    const stirngToken = `${localStorage.getItem("accessToken")}`;
    const Token = JSON.parse(stirngToken);
    const expireTime = Date.now();
    
    if (Token.expire - expireTime > 0) {
      if (Token.expire - expireTime < 110 * 1000) {
        this.updateToken();
      }
    } else {
      this.removeToken();
      
      if (window.location.href === "http://localhost:8081/") {
        router.go(this.$router.currentroute);
      } else {
        router.push('/');
    }  
    }
  },

  async updateToken() {
    const refresh = `${localStorage.getItem("refreshToken")}`;
    const request = {
      refreshToken : refresh
    };
    
    const newData = await this.postWithToken("http://localhost:8084/auth/update/token",request);

    if (newData.status === 500) {
      this.removeToken();
      router.push('/');
      return;
    }

    const newAccessToken = newData.data
    const obj = {
      "accessToken":newAccessToken,
      expire:Date.now() + 1000 * 60 * 60
    }

    localStorage.setItem("accessToken",JSON.stringify(obj));
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