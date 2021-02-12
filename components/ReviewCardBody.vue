<template>
  <div v-if="review">
    <p class="subtitle is-6">
      Review-ID : {{ review.id }}<br />
      <UsersName v-if="review.reviewer" :users="[review.reviewer]"
        >Reviewer :
      </UsersName>
    </p>
    <div>
        <ul>
          <li class="date">
            記入日 : <ConvertTime :time="review.createdAt" />
          </li>
          <li>苦さ : {{ review.bitterness }}</li>
          <li>濃さ : {{ review.strongness }}</li>
          <li>また飲みたいか : {{ review.wantRepeat }}</li>
          <li>役割 : {{ review.situation }}</li>
          <li v-if="review.feeling">備考・感想 : {{ review.feeling }}</li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Review} from "~/types/models";
export default Vue.extend({
  props: {
    review: { type: Object as PropType<Review>, default: null },
  },
});
</script>
<style>
</style>