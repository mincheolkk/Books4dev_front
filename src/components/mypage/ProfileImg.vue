<template>
    <v-img class="logo-profile" :src="this.profileImg"></v-img>
</template>

<script>
import developer from '@/assets/developer.svg';

export default {

  data() {
        return {
            profileImg : developer
        }
    },
}
</script>

<style scoped>
.logo-profile {
  max-height: 70px !important;
  max-width: 70px !important;
  display: inline-flex; 
}
</style>