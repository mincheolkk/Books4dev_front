<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" @keyup.enter="getSearch" class="shadow">

    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            newTodoItem: "",
            searchList:"",
        }
    },
    methods: {

        clearInput() {
        // input 박스 초기화 방법
            this.newTodoItem = '';
        }
        ,
        getSearch() {
            if (this.newTodoItem.length > 0) {
                this.searchList = axios.get('http://localhost:8080/todo?query='+this.newTodoItem)
                    .then(res => {
                        console.log("ii")
                        console.log(res)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        }
    },
}
</script>
<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    height: 40px;
    width: 80%;
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
.closeModalBtn {
    color: #42b983;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>