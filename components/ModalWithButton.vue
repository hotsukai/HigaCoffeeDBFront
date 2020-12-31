<template>
  <div>
    <button class="button view-details" @click="show">
      <slot name="open-button">
        <i class="fas fa-search-plus"></i>
      </slot>
    </button>

    <modal
      :name="'modal-content' + modalKey"
      :scrollable="true"
      :click-to-close="true"
      width="80%"
      height="auto"
    >
      <div class="modal-inner-box">
        <a @click="hide"><i class="fas fa-times"></i></a>
        <p>
          <slot name="modal-inner-content">
            モーダルの表示でエラーが発生しました。
          </slot>
        </p>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: { modalKey: { type: Number, required: true } },
  methods: {
    show() {
      this.$modal.show("modal-content" + this.modalKey);
    },
    hide() {
      this.$modal.hide("modal-content" + this.modalKey);
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-inner-box {
  margin: 1em;
}
</style>