<template>
    <div>
    <v-card class="mt-2" outlined>
        <v-list three-lines>
            <template v-for="(comment, idx) in getCommentList">
                <v-list-item :key="comment.id">
                    <template v-if="idx !== num">
                        <v-list-item-content class="text-start">
                                <v-list-item-title class="subtitle-2">
                                    <span style="cursor : pointer;" @click="goMemberPage(comment)">
                                    @{{comment.nickname}}
                                    </span>
                                     <span class="ml-3" style="color: gray; float: right;">
                                        {{comment.createdAt.substr(0,10)}}
                                    </span>
                                </v-list-item-title>
                                <div style="white-space:pre-wrap;  word-break: break-all; overflow:auto;" class="mt-2 subtitle-1">
                                    {{ comment.content }}
                                </div>
                        </v-list-item-content>
                        <div v-if="getLoginMember !== null && getLoginMember.oauth === comment.oauth">
                            <v-btn icon small class="ml-2" @click="preUpdateComment(comment, idx)">
                                <v-icon>mdi-file-edit-outline</v-icon>
                            </v-btn>
                             <v-btn icon small class="ml-2" @click="deleteComment(comment)">
                                <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                        </div>

                    </template>
                     <template v-else>
                        <v-list-item-content class="text-start">
                            <v-list-item-title>
                                @{{ comment.nickname }}
                                <span class="ml-3" style="color: gray;">{{comment.createdAt.substr(0,10)}}</span>
                            </v-list-item-title>
                            <v-textarea rows="2" maxlength="200" v-model="editComment.content"></v-textarea>
                                <div>{{ editComment.charCount }}/200자</div>
                        </v-list-item-content>
                            <v-btn icon small @click="updateComment(comment)">
                                <v-icon>mdi-check-bold</v-icon>
                            </v-btn>
                            <v-btn icon small class="ml-2" @click="num = -1">
                                 <v-icon>mdi-close-outline</v-icon>
                            </v-btn>

                    </template>
                </v-list-item>
                <v-divider :key="idx"></v-divider>
            </template>
        </v-list>
    </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ApiService from '../../index';

export default {

    props: ['bookId'],    
    async created(){
        if (window.location.href !== "https://books4dev.me/") {
               await this.$store.dispatch("fetchComment", this.$route.params.bookId);
           }
    },
    computed: {
        ...mapGetters([
         "getCommentList", "getLoginMember",
        ]),
        remainingChars() {
            return 200 - this.editComment.length;
        }
    },

    watch: {
        'editComment.content'(newVal) {
            this.editComment.charCount = newVal.length;
        }
    },

    data() {
        return {
            num: '-1',
            editComment: {
                content: '',
                charCount: 0,
            },
        }
    },

    methods: {
        
        preUpdateComment(comment, idx) {
            this.num = idx
            this.getEditComment(comment.content)
        },

        async updateComment(comment) {
            let data;
            data = {
                content : this.editComment.content.trim()
            }

            if (data.content.length > 0){
                await ApiService.patchWithToken(`https://apiis.books4dev.me/comments/${comment.id}`,data)
                        .then(
                            ()=> {this.$store.dispatch("updateSnackbarText","수정되었습니다.")
                            .then(
                                () => this.$store.dispatch("closeSnackbarAfterTimeout",1000)
                            )
                        });
            } else if (data.content.length === 0){
                await ApiService.deleteWithToken(`https://apiis.books4dev.me/comments/${comment.id}`)
                        .then(
                            ()=> {this.$store.dispatch("updateSnackbarText","삭제되었습니다.")
                            .then(
                                () => this.$store.dispatch("closeSnackbarAfterTimeout",1000)
                            )
                        });
            }

            await this.$store.dispatch("fetchComment", this.bookId);
            this.num = -1
        },

        getEditComment(content) {
            this.editComment.content = content
        },

        async deleteComment(comment) {
            await ApiService.deleteWithToken(`https://apiis.books4dev.me/comments/${comment.id}`)
                    .then(
                            ()=> {this.$store.dispatch("updateSnackbarText","삭제되었습니다.")
                            .then(
                                () => this.$store.dispatch("closeSnackbarAfterTimeout",1000)
                            )
                        });
            
            await this.$store.dispatch("fetchComment", this.bookId);
        },

        goMemberPage(comment) {
            this.$router.push(`/member/${comment.oauth}`)
        },
    }

}
</script>

<style>

</style>