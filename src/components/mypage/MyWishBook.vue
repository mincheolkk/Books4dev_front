<template>
    <div>
        <my-page />
        <div class="zero" display=block>
            <div class="first-text">내가 관심있는 책들</div>
            <div class="first">
                <ui class="readbook-ui">
                <li 
                    v-for="(result) in getWishBook" 
                    v-bind:key="result.isbn" 
                    class="readbook-li"
                >
                    <div class="readbook-img-first">
                        <div class="readbook-img-second">
                            <img :src="result.thumbnail" @click="$router.push(`/book/${result.id}`)" alt="image" class="readbook-img"/>
                        </div>
                    </div>
                    <div>
                        <div class="readbook-title">{{result.title}}</div>
                    </div>
                </li>
                </ui>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyPage from "./MyPage.vue"


export default {
    data() {
        return {
            wishbook:"",
        }
    },
    components:{
        MyPage
    },
    computed: {
        ...mapGetters(
            ["getWishBook"]
        )
    },
    async beforeCreate() {
        await this.$store.dispatch("fetchWishBook")
    }


}
</script>

<style scoped>
.readbook-ui {
    padding: 0;
    display: block !important;
    margin-right: -5px !important;
    margin-left: -5px !important;
    margin: 14px 0 0;
    list-style: none;
    
}

.readbook-li {
    display: inline-block !important;
    vertical-align: top;
    box-sizing: border-box;
    /* width: 20%; */
    padding: 0 5px;
    margin: 0 0 24px;
    width: 140px;
}


.readbook-img-first {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 145%;
}
.readbook-img-second {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #eae9e8;
    border-radius: 5px;
    background: #f8f8f8;
    transition: 300ms;
}
.readbook-img {
    vertical-align: top;
    width: 100%;
    height: 100%;
    opacity: 1;
    object-fit: cover;
    transition: opacity 420ms ease 0s;
}
.readbook-title {
    font-size: 16px;
    font-weight: 500;
    text-overflow: ellipsis;
    letter-spacing: -0.3px;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
}
.first {
    margin: 0 20px;
    transition: 500ms;
    /* display: flex; */
}
.zero {
    box-shadow: 5px 10px 10px rgba(0.03, 1, 1, 0.03);
}
.first-text {
    font-size: 22px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.01em;
    color: #141414;
    min-width: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    margin: 20px 30px;
}
</style>