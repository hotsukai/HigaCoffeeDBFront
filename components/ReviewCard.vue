<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        <nuxt-link :to="'/reviews?bean=' + review.coffee.bean.id">
          {{ review.coffee.bean.name }}
        </nuxt-link>
      </p>
      <p class="subtitle">
        Review-ID : {{ review.id }}<br />
        Reviewer :
        <nuxt-link
          v-if="review.reviewer && isLogin"
          :to="'/users/' + review.reviewer.id"
          >{{ review.reviewer.name }}</nuxt-link
        >
      </p>
      <div class="columns">
        <div class="column">
          <ul>
            <li>レビュー登録 : <ConvertTime :time="review.createdAt" /></li>
            <li>苦さ : {{ review.bitterness }}</li>
            <li>濃さ : {{ review.strongness }}</li>
            <li>また飲みたいか : {{ repeatToJapanese }}</li>
            <li>役割 : {{ situationToJapanese }}</li>
            <li>備考・感想 : {{ review.feeling }}</li>
          </ul>
        </div>

        <div class="column" v-show="viewMore">
          <ul>
            <li>コーヒー登録 : <ConvertTime :time="coffee.createdAt" /></li>
            <li v-if="coffee.dripper">
              <UsersName :users="[coffee.dripper]">Dripper : </UsersName>
            </li>
            <li v-if="coffee.drinkers">
              <UsersName :users="coffee.drinkers">Drinkers : </UsersName>
            </li>
            <li v-if="coffee.memo">
              メモ:
              {{ coffee.memo }}
            </li>
            <CoffeeDetails :coffee="coffee" />
          </ul>
        </div>

        <button @click="toggleViewMore()" class="button" v-show="!viewMore">
          くわしく見る
        </button>
        <button @click="toggleViewMore()" class="button" v-show="viewMore">
          詳細を閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["review"],
  data() {
    return {
      viewMore: false,
      isLogin: false,
      coffee: {},
    };
  },

  methods: {
    toggleViewMore() {
      this.viewMore = !this.viewMore;
    },
  },

  created() {
    this.coffee = this.review.coffee;
    this.isLogin = this.$store.state.currentUser != null;
  },

  computed: {
    repeatToJapanese() {
      const repeat_japanese = ["飲みたくない!!", "普通", "また飲みたい!"];
      return repeat_japanese[parseInt(this.review.wantRepeat) - 1];
    },

    situationToJapanese() {
      const situation_japanese = [
        "リラックス",
        "ややリラックス",
        "やや眠気覚まし",
        "眠気覚まし",
      ];
      return situation_japanese[parseInt(this.review.situation) - 1];
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 1em;
}
</style>
