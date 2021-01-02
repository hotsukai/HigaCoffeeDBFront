<template>
  <div>
    <h1 class="title">あなたあてのコーヒー</h1>
    <div v-show="isCoffeeExist">
      <CoffeeCards
        :coffees="coffees"
        :show-review="false"
        :create-review="true"
        :show-details="false"
      />
    </div>
    <div v-show="!isCoffeeExist">あなたあてのコーヒーがありません。</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Coffee } from "~/types/models";
export default Vue.extend({
  data(): { coffees: Array<Coffee> } {
    return {
      coffees: [],
    };
  },

  computed: {
    isCoffeeExist(): boolean {
      return this.coffees.length > 0;
    },
  },

  async created(): Promise<void> {
    let user = this.$store.state.currentUser;
    this.coffees = await this.$axios
      .$get("/coffees", {
        params: {
          has_review: false,
          drinker_id: user.id,
        },
      })
      .then((res) => {
        return res.data;
      });
  },
});
</script>

<style></style>
