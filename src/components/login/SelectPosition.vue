<template>
    <div>
        <p>모달창 띄워서 처리하고 싶음</p>
    </div>
</template>
<script>
import axios from 'axios';


export default {

beforeCreate() {
    axios.get("http://localhost:8080/select")
    .then(res => console.log(res))
    .catch(e => console.log(e));

 }
}    
  
</script>