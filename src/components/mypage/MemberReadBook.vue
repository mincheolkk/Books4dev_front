<template>
    <div>
        <member-page />
        <div class="first-text" v-if="this.getReadBook.before === undefined &&  this.getReadBook.after === undefined && this.getReadBook.threeYear === undefined && this.getReadBook.sixYear === undefined"> 내가 읽은 책들 </div>
        <template v-if="this.getReadBook.before !== undefined">
            <div class="first-text">Before Developer</div>
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
                            <img :src="result.thumbnail" @click="$router.push(`/book/${result.id}`)" alt="image"  class="readbook-img"/>
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
            <div class="first-text" v-if="this.getReadBook.after !== undefined || this.getReadBook.threeYear !== undefined || this.getReadBook.sixYear !== undefined">After Developer</div>
        <template v-if="this.getReadBook.after !== undefined">
            <h2 class="timeLine-text"> 0 ~ 2 Years</h2>
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
                            <img :src="result.thumbnail" @click="$router.push(`/book/${result.id}`)" alt="image" class="readbook-img"/>
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
       <template v-if="this.getReadBook.threeYear !== undefined">
            <h2 class="timeLine-text"> 3 ~ 5 Years</h2>
        </template>
        <div class="zero" display=block>
            <div class="first" margin="0 20px">
            <ui class="readbook-ui">
                <li 
                    v-for="(result) in getReadBook.threeYear"
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
                        <star-rating :avgStar="result.star" />
                    </div>
                </li>
            </ui>
            </div>
        </div>
        <template v-if="this.getReadBook.sixYear !== undefined">
            <h2 class="timeLine-text">6 Years ~ </h2>
        </template>
        <div class="zero" display=block>
            <div class="first" margin="0 20px">
            <ui class="readbook-ui">
                <li 
                    v-for="(result) in getReadBook.sixYear"
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
import MemberPage from './MemberPage.vue'



export default {
    components:{
        StarRating,
        MemberPage
    },
    computed: {
        ...mapGetters(
            ["getReadBook"]
        )
    },
    data() {
        return {
            memberNickname:"",
        }
    },
    async beforeCreate() {
        await this.$store.dispatch("fetchMemberReadBook", this.$route.params.id);
        await this.$store.dispatch("fetch")
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

.timeLine-text {
    text-align: left !important;
    margin-left: 50px !important;
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
    cursor: pointer;
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
}
.logo-star {
    width: 12px;
    fill: aqua;
    color: #f93;
    position: absolute;
}
.zero {
    box-shadow: 5px 10px 10px rgba(0.3, 1, 1, 0.01);
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