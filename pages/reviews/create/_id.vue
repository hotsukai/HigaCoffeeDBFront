<template>
  <div>
    <h1 class="title">レビューを書く</h1>
    <CoffeeCard :coffee="coffee"><span></span></CoffeeCard>
    <div>
      <form>
        <div>
          <label class="label">苦さ</label>
          <p class="help">
            焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。
          </p>
          <label class="radio">酸っぱい</label>
          <input
            name="bitterness"
            v-model.number="bitterness"
            type="range"
            step="1"
            min="1"
            max="4"
          />
          <label class="radio">苦い</label>
        </div>
        <div>
          <label class="label">濃さ</label>
          <p class="help">
            抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。
          </p>
          <label class="radio">薄い</label>

          <input
            name="strongness"
            v-model.number="strongness"
            type="range"
            step="1"
            min="1"
            max="4"
          />
          <label class="radio">濃い</label>
        </div>
        <div>
          <label class="label">役割</label>
          <p class="help">
            「どういう時におすすめか」という観点で選んでください。
          </p>
          <label class="radio">リラックス</label>

          <input
            name="situation"
            v-model.number="situation"
            type="range"
            step="1"
            min="1"
            max="4"
          />
          <label class="radio">眠気覚まし</label>
        </div>
        <div>
          <label class="label">また飲みたい??</label>
          <p class="help">ご遠慮なく！</p>
          <label class="radio">飲みたくない</label>

          <input
            name="wantRepeat"
            v-model.number="wantRepeat"
            type="range"
            step="1"
            min="1"
            max="4"
          />
          <label class="radio">また飲みたい!!</label>
        </div>
        <div>
          <label class="label">感想</label>
          <p class="help">
            コーヒーについての感想を教えてください。
          </p>
          <input class="input" type="text" v-model="feeling" />
        </div>
        <p v-show="!isValid" class="is-danger">入力に不備があります</p>
        <button
          @click="sendReview"
          v-bind:disabled="!isValid"
          type="button"
          class="button is-primary"
        >
          送信!!
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bitterness: 1,
      strongness: 1,
      situation: 1,
      wantRepeat: 1,
      feeling: "",
      coffee: null
    };
  },

  async created() {
    let coffeeId = this.$route.params.id;
    this.coffee = await this.$axios.$get("/coffees/" + coffeeId).then(res => {
      return res.data;
    });
  },

  methods: {
    async sendReview() {
      await this.$axios
        .$post("/reviews", {
          bitterness: this.bitterness,
          coffeeId: this.coffee.id,
          feeling: this.feeling,
          situation: this.situation,
          strongness: this.strongness,
          reviewerId: this.$store.state.currentUser.id,
          wantRepeat: this.wantRepeat
        })
        .then(res => {
          if (res.result) {
            alert("レビューを作成しました");
          } else {
            alert("レビューの作成に失敗しました" + res.message);
          }
          this.$router.push("/mypage");
        })
        .catch(err => {
          alert("レビューの作成に失敗しました" + res.message);
          this.$router.push("/mypage");
        });
    }
  },

  computed: {
    isValid() {
      return (
        this.bitterness <= 4 &&
        this.bitterness >= 0 &&
        this.strongness <= 4 &&
        this.strongness >= 0 &&
        this.situation <= 4 &&
        this.situation >= 0 &&
        this.wantRepeat <= 3 &&
        this.wantRepeat >= 0 &&
        this.feeling <= 4 &&
        this.feeling >= 0
      );
    }
  }
};
</script>

<style></style>
