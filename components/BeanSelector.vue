<template>
  <div v-if="beans" class="field is-grouped">
    <select v-model="selectedOriginId" class="control">
      <option v-for="origin in beanOrigins" :key="'origin-' + origin.id" :value="origin.id">
        {{ origin.name }}
      </option>
    </select>
    <select v-model="selectedBean" class="control">
      <option v-show="!selectedOriginId" disabled>産地を選択してください</option> 
      <option v-for="bean in selectedOriginsBean" :key="'bean-' + bean.id">
        {{ bean.roast.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Bean } from "~/types/models";
export default Vue.extend({
  props: {
    beans: { type: Array as PropType<Bean[]>, default: null },
  },
  data(): { selectedBean: Bean | null; selectedOriginId: Bean["origin"]["id"] | null } {
    return {
      selectedBean: null,
      selectedOriginId: null,
    };
  },
  computed: {
    beanOrigins(): Array<Bean["origin"]> {
      return this.beans
        .map((bean: Bean) => {
          return bean.origin;
        })
        .filter(
          (origin: Bean["origin"], i: number, origins: Bean["origin"][]) => {
            const originIds: number[] = origins.map((_origin) => _origin.id);
            return originIds.indexOf(origin.id) === i;
          }
        );
    },

    selectedOriginsBean(): Array<Bean> {
      return this.beans.filter(
        (bean) => bean.origin.id == this.selectedOriginId
      );
    },
  },
});
</script>

<style>
</style>