<template>
  <span>{{beanData.name}}</span>
</template>

<script>
export default {
  props: ["beanId"],
  data() {
    return {
      beanData: {},
    };
  },
  async mounted() {
    if (this.beanId == null) {
      this.beanData = { name: "豆の名前の取得でエラーが発生しました" };
      console.warn(
        "Error at BeanName : 豆の名前の取得でエラーが発生しました。"
      );
    } else {
      var tmp = this.$beanNames[this.beanId - 1];
      this.beanData = tmp;
    }
    console.debug("bId:", this.beanId);
    console.debug("bData:", this.beanData);
  },
};
</script>

<style>
</style>