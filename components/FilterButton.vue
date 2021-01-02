<template>
  <modal-with-button :modal-key="'filter'" class="card-footer-item">
    <template #open-button><i class="fas fa-coffee"></i></template>
    <template #modal-inner-content>
      <form>
        <div>
          <p>コーヒー</p>
          <vue-slider v-model="value" />
        </div>
        <div><p>レビュー</p></div>
      </form>
    </template>
  </modal-with-button>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    };
  },
};
</script>

<style>
</style>