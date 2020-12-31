<template>
  <div class="card">
    <div class="card-content">
      <p class="title is-4">
        <nuxt-link :to="'/reviews?bean=' + review.coffee.bean.id">
          {{ review.coffee.bean.name }}
        </nuxt-link>
      </p>
      <p class="subtitle is-6">
        Review-ID : {{ review.id }}<br />
        <UsersName v-if="review.reviewer" :users="[review.reviewer]"
          >Reviewer :
        </UsersName>
      </p>
      <div class="columns">
        <div class="column">
          <ul>
            <li class="date">
              記入日 : <ConvertTime :time="review.createdAt" />
            </li>
            <li>苦さ : {{ review.bitterness }}</li>
            <li>濃さ : {{ review.strongness }}</li>
            <li>また飲みたいか : {{ repeatToJapanese }}</li>
            <li>役割 : {{ situationToJapanese }}</li>
            <li>備考・感想 : {{ review.feeling }}</li>
          </ul>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <modal-with-button :modal-key="review.id" class="card-footer-item">
        <template #open-button><i class="fas fa-coffee"></i></template>
        <template #modal-inner-content>
          <div class="columns">
            <div class="column">
              <ul>
                <li class="date">
                  記入日 : <ConvertTime :time="review.createdAt" />
                </li>
                <li>苦さ : {{ review.bitterness }}</li>
                <li>濃さ : {{ review.strongness }}</li>
                <li>また飲みたいか : {{ repeatToJapanese }}</li>
                <li>役割 : {{ situationToJapanese }}</li>
                <li>備考・感想 : {{ review.feeling }}</li>
              </ul>
            </div>
            <div class="column">
              <ul>
                <li>Coffee-ID : {{ coffee.id }}</li>
                <li class="date">
                  抽出日 : <ConvertTime :time="coffee.createdAt" />
                </li>
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
          </div>
        </template>
      </modal-with-button>
    </footer>
  </div>
</template>

<script>
import ModalWithButton from "./ModalWithButton.vue";
export default {
  components: { ModalWithButton },
  props: { review: { type: Object, required: "true", default: new Object() } },
  data() {
    return {
      viewMore: false,
      isLogin: false,
      coffee: {},
    };
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

  created() {
    this.coffee = this.review.coffee;
    this.isLogin = this.$store.state.currentUser != null;
  },

  methods: {
    toggleViewMore() {
      this.viewMore = !this.viewMore;
    },
  },
};
</script>

<style lang="scss" scoped>
// TODO: hoverしたときの
.card {
  margin-bottom: 1em;
  height: 400px;
  .card-content {
    height: 340px;
  }
  .card-footer {
    height: 60px;
  }
}
</style>
