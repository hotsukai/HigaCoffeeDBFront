<template>
  <span>{{beanData.name}}(豆ID:{{beanId}})</span>
</template>

<script>
export default {
  props: ["beanId"],

  data() {
    return {
      beanData: {},
    };
  },

//TODO:マイページからのときとあなた宛一覧で表示できる方法がcreated+watchしか思いつかなかった、
//マイページではbeanIDが遅れてくるのではじめはnullになってしまう
  created() {
    if (this.beanId == null) {
      this.beanData = { name: "豆の名前の取得でエラーが発生しました" };
      console.warn(
        "Error at BeanName : 豆の名前の取得でエラーが発生しました。",this.beanId
      );
    } else {
      this.beanData = this.$beanNames[this.beanId - 1];
    }
  },

  watch: {
    beanId: function (val) {
      this.beanData = this.$beanNames[val - 1];
    },
  },
 
};
</script>

<style>
</style>