<template>
    <div>
        <template>
            <h2 class="timeLine-text">Before Career</h2>
        </template>
        <v-row dense >

        <div class="book-row">
                <!-- <v-btn @click="fetchReadBook()">readbook</v-btn> -->
                <!-- <v-timeline dense  >
                    <v-timeline-item v-for="(result) in getReadBook.after" v-bind:key="result.isbn" hide-dot >
                    <v-card display:flex>
                        <img :src="result.thumbnail" alt="image" class="shadow" />
                        <p>{{result.title}}</p>
                        <star-rating :avgStar="result.star" />
                    </v-card>
                    </v-timeline-item>
                </v-timeline> -->
                <!-- <v-timeline dense  >
                    <v-timeline-item hide-dot right>
                        <v-row dense align="center" justify="center">
                    <div class="book-row">
                        <v-card v-for="(result) in getReadBook.after" v-bind:key="result.isbn" class="book-item">
                            <img :src="result.thumbnail" alt="image" class="shadow book-img" />
                            <p>{{result.title}}</p>
                            <star-rating :avgStar="result.star" class="star-item"/>
                        </v-card>
                    </div>
                        </v-row>
                    </v-timeline-item>
                </v-timeline> -->
                <v-timeline dense  >
                    <v-timeline-item v-for="(result) in getReadBook.after" v-bind:key="result.isbn" class="book-item">
                        <v-row dense align="center" justify="center">
                            <img :src="result.thumbnail" alt="image" class="shadow book-img" />
                            <p>{{result.title}}</p>
                            <star-rating :avgStar="result.star" class="star-item"/>
                        </v-row>
                    </v-timeline-item>
                </v-timeline>
            </div>
        </v-row>
        <template>
            <h2 class="timeLine-detail">취업 후 ~ 2년</h2>
        </template>
        <v-row dense>

        <div class="book-row">
                <v-card v-for="(result) in getReadBook.after" v-bind:key="result.isbn" >
                    <img :src="result.thumbnail" alt="image"/>
                    <p>{{result.title}}</p>
                    <star-rating :avgStar="result.star" />
                </v-card>
            </div>
        </v-row>
        <template>
            <h2 class="timeLine-detail">취업 후 2년 ~ 5년</h2>
        </template>
        <v-row dense>

        <div class="book-row">
                <v-card v-for="(result) in getReadBook.twoYear" v-bind:key="result.isbn" >
                    <img :src="result.thumbnail" alt="image"/>
                    <p>{{result.title}}</p>
                    <star-rating :avgStar="result.star" />
                </v-card>
            </div>
        </v-row>
        <template>
            <h2 class="timeLine-detail">취업 후 5년 ~ 10년</h2>
        </template>
        <v-row dense>

        <div class="book-row">
                <v-card v-for="(result) in getReadBook.fiveYear" v-bind:key="result.isbn" >
                    <img :src="result.thumbnail" alt="image"/>
                    <p>{{result.title}}</p>
                    <star-rating :avgStar="result.star" />
                </v-card>
            </div>
        </v-row>
        <template>
            <h2 class="timeLine-detail">취업 후 10년 ~ </h2>
        </template>
        <v-row dense>

        <div class="book-row">
                <v-card v-for="(result) in getReadBook.tenYear" v-bind:key="result.isbn" >
                    <img :src="result.thumbnail" alt="image"/>
                    <p>{{result.title}}</p>
                    <star-rating :avgStar="result.star" />
                </v-card>
            </div>
        </v-row>
    </div>
</template>

<script>
import StarRating from '../StarRating.vue'

export default {
    props:["getReadBook"],

    components:{
        StarRating
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

</style>