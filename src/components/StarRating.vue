<template>
  <div class="star-ratings">
	<div 
    class="star-ratings-fill space-x-2 text-lg"
    :style="{ width: ratingToPercent() + '%' }"
	>
		<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
	</div>
	<div class="star-ratings-base space-x-2 text-lg">
		<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
	</div>
</div>
</template>

<script>
export default {
    props:['avgStar'],
    
    methods:{
        ratingToPercent() {
            const score = this.avgStar * 20;

            return score;
        }
    }
}
</script>

<style>
.star-ratings {
  color: #ff5d5d; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #ff5d5d;
}
 
.star-ratings-fill {
  color: #ff5d5d;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: #ff5d5d;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>