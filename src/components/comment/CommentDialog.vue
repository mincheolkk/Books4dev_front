<template>

<v-dialog 
      v-model="dialog"
      persistent
      max-width="350px"
      @keydown.esc="cancel()"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#FFFFFF"
          :style="{'font-size': '17px'}"
          depressed
          v-bind="attrs"
          v-on="on"
        >
        <v-img class="comment-logo" :src="require(`@/assets/red-comment.svg`)"></v-img>
        {{commentCount}}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span @click="$router.push(`/book/${bookId}`)" class="text-h5 comment-title">{{bookTitle}}</span>
        </v-card-title>
        <v-card-text>
          <comment-list :bookId="this.bookId"/>
        </v-card-text>
          <add-comment style="margin : -20px 8px; 0px; 8px;"  :bookId="this.bookId"/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            style="margin-top : 10px;"
            @click="dialog = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
import AddComment from './AddComment.vue';
import CommentList from './CommentList.vue'


export default {
  components: { 
    CommentList, 
    AddComment 
    },

    props:['bookId','commentCount','bookTitle'],
    
    data() {
        return {
            dialog: false,
       }
    },
    watch: {
        dialog: {
        handler: function(newValue) {
          if (newValue) {
            this.fetchComment(this.bookId);
        }
      },
  }
    },
    methods:{
        cancel() {
          this.dialog = false;
        },
        async fetchComment(bookId) {
            await this.$store.dispatch('fetchComment', bookId)
        },
    }
}
</script>

<style scoped>
.comment-logo{
  margin-left: 5px;
  margin-right: 7px;
  margin-top: -1px;
  display: block;
  max-width: 22px;
}

.comment-title{
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  cursor: pointer;
}
</style>