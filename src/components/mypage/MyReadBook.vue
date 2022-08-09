<template>
    <div>
        <template>
            <h2 class="timeLine-text">Before Career</h2>
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
                        <div class="readbook-title">내 별점</div>
                        <!-- <svg width="12" height="10" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg" fill="#ff0558" class="star">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8.02L3.14233 9.91131C2.91094 10.0644 2.61352 9.84836 2.68767 9.58097L3.60334 6.27872L0.921531 4.14536C0.704379 3.97262 0.817982 3.62299 1.0952 3.61087L4.51878 3.46128L5.719 0.251483C5.81619 -0.00842059 6.18381 -0.00842094 6.281 0.251483L7.48122 3.46128L10.9048 3.61087C11.182 3.62299 11.2956 3.97262 11.0785 4.14536L8.39666 6.27872L9.31233 9.58097C9.38648 9.84836 9.08906 10.0644 8.85767 9.91131L6 8.02Z"></path>
                        </svg> -->
                        <v-img class="logo-star" :src="require(`@/assets/logo_star.svg`)" />

                        <!-- <div class="readbook-title">{{result.star}}</div> -->
                        <!-- <star-rating :avgStar="result.star" class="readbook-title" justify-center/> -->
                    </div>
                </li>
            </ui>
            </div>
        </div>
        <template>
            <h2 class="timeLine-text">After Career</h2>
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
                        <div class="readbook-title">{{result.star}}</div>

                    </div>
                </li>
            </ui>
            </div>
        </div>
       <template>
            <h2 class="timeLine-text">After Carrer 2 Year ~ 5 Year</h2>
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
                        <div class="readbook-title">{{result.star}}</div>

                    </div>
                </li>
            </ui>
            </div>
        </div>
        <template>
            <h2 class="timeLine-text">A.C 5년 ~ 10년</h2>
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
                        <div class="readbook-title">{{result.star}}</div>

                    </div>
                </li>
            </ui>
            </div>
        </div>
        <template>
            <h2 class="timeLine-text">A.C 10년 ~ </h2>
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
                        <div class="readbook-title">{{result.star}}</div>

                    </div>
                </li>
            </ui>
            </div>
        </div>
    </div>
</template>

<script>
// import StarRating from '../StarRating.vue'

export default {
    props:["getReadBook"],

    components:{
        // StarRating
    },
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
.book-item { 
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
    width: 150px !important;
    justify-content: center;

}
.book-img {
    /* height: 0%; */

}
.timeLine-text {
    text-align: left !important;
    margin-left: 50px !important;
    margin-bottom: 20px !important;
}
.star-item {
    /* position: fixed */
        /* margin-left: 30px !important; */
        overflow: hidden;
}
.readbook-ui {
    padding: 0;
    display: block !important;
    margin-right: -5px !important;
    margin-left: -5px !important;
    margin: 14px 0 0;
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
}
.logo-star {
    width: 12px;
    fill: aqua;
    color: #f93;
}
</style>