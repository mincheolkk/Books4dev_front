<template>
    <div class="input-zero">
        <div class="input-first">
            <label class="input-label">
             <v-img class="icon-search" :src="require(`@/assets/search-icon.png`)" @click="vuexSearch()"></v-img>
            <input type="text" v-model="searchTitle" placeholder="읽은 책, 관심있는 책을 검색해보세요" @keyup.enter="vuexSearch()" class="input-input long-size shadow">        
            <input type="text" v-model="searchTitle" placeholder="책을 검색해보세요" @keyup.enter="vuexSearch()" class="input-input short-size shadow">        

            </label>
        </div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'

export default {
    
    computed: {
        ...mapGetters(
            ["getInputText"]
        )
    },
    watch: {
        getInputText(newValue) {
            if (newValue.length > 1) {
                this.searchTitle = newValue
            }
        }
    },
    data() {
        return {
            searchTitle: "",
        }
    },
    methods: {
        clearInput() {
            this.searchTitle = '';
        },
    
        async vuexSearch() {
            if (this.searchTitle.length < 1){
                return;
            }
            await this.$store.dispatch("searchBook", this.searchTitle);
            this.$router.push('/search');
            this.$store.commit('setSearchKeyword', this.searchTitle);
        },
    },
}
</script>
<style scoped>
.input-zero {
    position: relative;
    width: 75%;
}
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    width: 100%;
}
.inputBox input {
    height: 40px;
    width: 80%;
    border-style: none;
    font-size: 0.9rem;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

.input-first {
    margin: 12px 0;
}
.input-label {
    background: #f0f0f0;
    border: 1px solid rgba(0, 0, 0, 0.5%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 11px;
    height: 35px;
    width: 170px;
}
.input-input {
    flex: 1;
    min-width: 0;
    height: 100%;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: #141414;
}
.icon-search {
    max-width: 15px;
    margin-right: 8px;
    cursor: pointer;
}
.long-size {
    display: none;
}
.short-size {
    display: flex;
}
@media (max-width: 375px) {

.input-label {
    width: 155px;
}
}
@media (min-width: 404px) and (max-width: 425px) {
.input-label {
    width: 190px;
}
}


@media screen and (min-width:768px) {
    .icon-search {
        display: flex;
    }
    .long-size {
        display: flex;
    }
    .short-size {
        display: none;
    }
    .input-zero {
        position: relative;
        width: 90%;
    }
    .input-label {
    background: #f0f0f0;
    border: 1px solid rgba(0, 0, 0, 0.5%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 11px;
    height: 35px;
    width:280px;
}
}


</style>