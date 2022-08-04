import axios from 'axios';

// const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;

const ApiService = {
  get(url) {
    return axios.get(url);
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
    console.log("this is getWithToken")
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

  async validToken() {
    const stirngToken = `${localStorage.getItem("accessToken")}`;
    const Token = JSON.parse(stirngToken);
    const expireTime = Date.now();
    console.log("in validToken")
    console.log(expireTime - Token.expire);
    
    // if (expireTime - Token.expire < 200 * 1000) {
      console.log("in valid if sentence")
      const refresh = localStorage.getItem("refreshToken");
      console.log("refresh" + refresh);
      console.log(typeof(refresh));

      const request = {
        refreshToken : refresh
      };

      const newToken = this.postWithToken("http://localhost:8081/update/token",request);
      console.log(newToken);
      console.log("999999");
      console.log(newToken.data);
      
    // }
  },

  updateToken() {
    const refresh = `${localStorage.getItem("refreshToken")}`;
    console.log("22")
    console.log(typeof(refresh));
    const request = {
      refreshToken : refresh
    };
    
    this.postWithToken("http://localhost:8081/update/token", request)
  },

  getToken() {
    const stirngToken = `${localStorage.getItem("accessToken")}`;
    const Token = JSON.parse(stirngToken);
    return `Bearer ${Token.accessToken}`;
  }

};

export default ApiService;