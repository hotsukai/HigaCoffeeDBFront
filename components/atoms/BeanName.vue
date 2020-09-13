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

  mounted() {
    if (this.beanId == null) {
      this.beanData = { name: "豆の名前の取得でエラーが発生しました" };
      console.warn(
        "Error at BeanName : 豆の名前の取得でエラーが発生しました。"
      );
    } else {
      this.beanData = this.$beanNames[this.beanId - 1];
    }
  },
};
</script>

<style>
</style>