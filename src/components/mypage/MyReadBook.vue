<template>
    <div>
        <my-page />
        <div class="first-text">내가 읽은 책들</div>
        <hr class="my-hr">

        <template>
            <h2 class="timeLine-text">( ? ~ Before Career )</h2>
        </template>
        <div class="zero" display=block>
            <div class="first">
            <ui class="readbook-ui">
                <li 
                    v-for="(result) in getReadBook.before"
                    v-bind:key="result.isbn"
                    class="readbook-li"
                >
                    <div class="readbook-img-first">
                        <div class="readbook-img-second">
                            <img :src="result.thumbnail" alt="image" class="readbook-img"/>
                        </div>
                    </div>
                    <div>
                        <div class="readbook-title">{{result.title}}</div>
                        <star-rating :avgStar="result.star" />
                    </div>
                </li>
            </ui>
            </div>
        </div>
        <template v-if="this.getReadBook.after.length > 0">
            <h2 class="timeLine-text">After Career ~ </h2>
        </template>
        <div class="zero" display=block>
            <div class="first" margin="0 20px">
            <ui class="readbook-ui">
                <li 
                    v-for="(result) in getReadBook.after"
                    v-bind:key="result.isbn"
                    class="readbook-li"
                >
                    <div class="readbook-img-first">
                        <div class="readbook-img-second">
                            <img :src="result.thumbnail" alt="image" class="readbook-img"/>
                        </div>
                    </div>
                    <div>
                        <div class="readbook-title">{{result.title}}</div>
                        <star-rating :avgStar="result.star" />
                    </div>
                </li>
            </ui>
            </div>
        </div>
       <template v-if="this.getReadBook.twoYear.length > 0">
            <h2 class="timeLine-text">2 Years ~ </h2>
        </template>
        <div class="zero" display=block>
            <div class="first" margin="0 20px">
            <ui class="readbook-ui">
                <li 
                    v-for="(result) in getReadBook.twoYear"
                    v-bind:key="result.isbn"
                    class="readbook-li"
                >
                    <div class="readbook-img-first">
                        <div class="readbook-img-second">
                            <img :src="result.thumbnail" alt="image" class="readbook-img"/>
                        </div>
                    </div>
                    <div>
                        <div class="readbook-title">{{result.title}}</div>
                        <star-rating :avgStar="result.star" />
                    </div>
                </li>
            </ui>
            </div>
        </div>
        <template v-if="this.getReadBook.fiveYear.length > 0">
            <h2 class="timeLine-text">5 Years ~ </h2>
        </template>
        <div class="zero" display=block>
            <div class="first" margin="0 20px">
            <ui class="readbook-ui">
                <li 
                    v-for="(result) in getReadBook.fiveYear"
                    v-bind:key="result.isbn"
                    class="readbook-li"
                >
                    <div class="readbook-img-first">
                        <div class="readbook-img-second">
                            <img :src="result.thumbnail" alt="image" class="readbook-img"/>
                        </div>
                    </div>
                    <div>
                        <div class="readbook-title">{{result.title}}</div>
                        <star-rating :avgStar="result.star" />
                    </div>
                </li>
            </ui>
            </div>
        </div>
        <template v-if="this.getReadBook.tenYear.length > 0">
            <h2 class="timeLine-text">10 Years  ~ </h2>
        </template>
        <div class="zero" display=block>
            <div class="first" margin="0 20px">
            <ui class="readbook-ui">
                <li 
                    v-for="(result) in getReadBook.tenYear"
                    v-bind:key="result.isbn"
                    class="readbook-li"
                >
                    <div class="readbook-img-first">
                        <div class="readbook-img-second">
                            <img :src="result.thumbnail" alt="image" class="readbook-img"/>
                        </div>
                    </div>
                    <div>
                        <div class="readbook-title">{{result.title}}</div>
                        <star-rating :avgStar="result.star" />
                    </div>
                </li>
            </ui>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StarRating from '../StarRating.vue'
import MyPage from './MyPage.vue'


export default {
    // props:["getReadBook"],

    components:{
        MyPage,
        StarRating
    },
    computed: {
        ...mapGetters(
            ["isLoggedIn", "getReadBook"]
        )
    },
    async beforeCreate() {
        await this.$store.dispatch("fetchLoginMember")
        await this.$store.dispatch("fetchReadBook")
    }
    
}
</script>

<style scoped>
.book-row {
    display: grid;
    grid-template-rows: repeat(2);
    grid-template-columns: repeat(4, 1fr);
    gap: 100px 100px;
    height:"1200px"

}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

.timeLine-text {
    text-align: left !important;
    margin-left: 50px !important;
    /* margin-bottom: 20px !important; */
}

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
.logo-star {
    width: 12px;
    fill: aqua;
    color: #f93;
    position: absolute;
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
    margin: 30px 30px;
}
.my-hr {    
    height: 1px;
    background: #e5e5e5;
    border: none;
    margin: 10px 20px; 
    margin-top: -10px; 
}

</style>