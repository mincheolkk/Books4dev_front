<template>
  <v-list-item>
    <v-list-item-content>
        <v-textarea
            v-model="writeComment.content"
            class="flex-grow-1"
            hide-details
            outlined
            dense
            rows="3"
            label="댓글을 달아주세요 (최대 200자)"
            maxlength="200"
        ></v-textarea>
        <div>{{ writeComment.charCount }}/200자</div>
        <div class="d-flex mt-2 align-center">
            <v-spacer></v-spacer>
            <v-btn outline color="primary darken-2" @click="addComment()"
                :disabled="writeComment.isLoading">
                <v-icon left>mdi-pencil-outline</v-icon>
                댓글 작성</v-btn>
        </div>
    </v-list-item-content>
</v-list-item>
</template>

<script>
import ApiService from '../../index';
import { mapGetters } from 'vuex'

export default {
    props: ['bookId'],

    data() {
        return {
            writeComment: {
                content: '',
                charCount: 0,
            },
        }
    },
    
    computed: {
        ...mapGetters([
            "isLoggedIn", 
      ]),
        remainingChars() {
            return 200 - this.writeComment.content.length;
        }
    },
    watch: {
        'writeComment.content'(newVal) {
            this.writeComment.charCount = newVal.length;
        }
    },

    methods: {
        async addComment() {
            if (!this.isLoggedIn) {
              await this.$store.dispatch(
                "updateSnackbarText",
                "로그인 후 이용해주세요."
              );

              await this.$store.dispatch(
                "closeSnackbarAfterTimeout",
                1000
              );
              return
            }

            this.writeComment.content = this.writeComment.content.trim();

            let data ={}
              data = { content : this.writeComment.content };

            if (data.content.length > 0) {
                await ApiService.postWithToken(`https://apiis.books4dev.me/book/${this.bookId}/comments`,data)
                    .then(()=> {
                        this.$store.dispatch("updateSnackbarText","등록되었습니다.")
                        .then(() => 
                        this.$store.dispatch("closeSnackbarAfterTimeout",1000)
                        )
                    })
                await this.$store.dispatch("fetchComment", this.bookId);
                this.writeComment.content = '';

            } 
            else if (data.content.length === 0){
                await this.$store.dispatch("updateSnackbarText","댓글 내용이 없습니다.")
                await this.$store.dispatch("closeSnackbarAfterTimeout",1000)
            }
        }

    }

}
</script>

<style>

</style>