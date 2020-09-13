<template>
  <div>
    <section>
      <p class="title">セクション1どの豆??</p>
      <button class="button">概要(団体)</button>
      <button class="button">濃さ(団体)</button>
      <button class="button">概要(個人)</button>
      <button class="button">濃さ(個人)</button>
    </section>
    <hr />
    <section>
      <p class="title">セクション2:どうやって淹れる??</p>
      <div class="select">
        <select>
          <option v-for="bean in beans" v-bind:key="bean.id">{{bean.name}}</option>
        </select>
        <button class="button">団体</button>
        <button class="button">個人</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beans: this.$beanNames,
    };
  },
};
</script>

<style>
</style>