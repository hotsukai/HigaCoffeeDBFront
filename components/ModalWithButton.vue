<template>
  <div>
    <button @click="show" class="button">くわしくみる</button>

    <modal
      :name="'modal-content' + modalKey"
      :scrollable="true"
      :clickToClose="true"
      width="80%"
    >
      <a @click="hide"><i class="fas fa-times"></i></a>

      <p><slot> モーダルの表示でエラーが発生しました。 </slot></p>
    </modal>
  </div>
</template>

<script>
export default {
  props: { modalKey: { type: Number, required: true } },
  methods: {
    show() {
      this.$modal.show("modal-content" + this.modalKey);
    },
    hide() {
      this.$modal.hide("modal-content" + this.modalKey);
    },
  },
};
</script>