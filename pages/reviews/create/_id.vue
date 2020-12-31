<template>
  <div>
    <h1 class="title">レビューを書く</h1>
    <CoffeeCard :coffee="coffee" :show-details="false" style="height: auto"
      ><span></span
    ></CoffeeCard>
      <form>
        <div class="form-field">
          <label class="label">苦さ<Required /></label>
          <p class="help">
            焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。
          </p>
          <label class="radio">酸っぱい</label>
          <input
            v-model.number="bitterness"
            name="bitterness"
            type="range"
            step="0.1"
            min="1"
            max="4"
          />
          <label class="radio">苦い</label>
          <p class="range-number">{{ bitterness }}</p>
        </div>
        <div class="form-field">
          <label class="label">濃さ<Required /></label>
          <p class="help">
            抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。
          </p>
          <label class="radio">薄い</label>

          <input
            v-model.number="strongness"
            name="strongness"
            type="range"
            step="0.1"
            min="1"
            max="4"
          />
          <label class="radio">濃い</label>
          <p class="range-number">{{ strongness }}</p>

        </div>
        <div class="form-field">
          <label class="label">役割<Required /></label>
          <p class="help">
            「どういう時におすすめか」という観点で選んでください。
          </p>
          <label class="radio">リラックス</label>

          <input
            v-model.number="situation"
            name="situation"
            type="range"
            step="0.1"
            min="1"
            max="4"
          />
          <label class="radio">眠気覚まし</label>
          <p class="range-number">{{ situation }}</p>

        </div>
        <div class="form-field">
          <label class="label">また飲みたい??<Required /></label>
          <p class="help">ご遠慮なく！</p>
          <label class="radio">飲みたくない</label>

          <input
            v-model.number="wantRepeat"
            name="wantRepeat"
            type="range"
            step="0.1"
            min="1"
            max="3"
          />
          <label class="radio">また飲みたい!!</label>
          <p class="range-number">{{ wantRepeat }}</p>

        </div>
        <div class="form-field">
          <label class="label">感想</label>
          <p class="help">コーヒーについての感想を教えてください。</p>
          <input v-model="feeling" class="input" type="text" />
        </div>
        <p v-show="!isValid" class="is-danger">入力に不備があります</p>
        <button
          :disabled="!isValid"
          type="button"
          class="button"
          @click="sendReview"
        >
          送信!!
        </button>
      </form>
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
      coffee: null,
    };
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
        this.wantRepeat >= 0
      );
    },
  },

  async created() {
    let coffeeId = this.$route.params.id;
    this.coffee = await this.$axios.$get("/coffees/" + coffeeId).then((res) => {
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
          wantRepeat: this.wantRepeat,
        })
        .then((res) => {
          if (res.result) {
            this.$toast.success("レビューを作成しました");
          } else {
            this.$toast.error("レビューの作成に失敗しました" + res.message);
          }
          this.$router.push("/mypage");
        })
        .catch((err) => {
          this.$toast.error("レビューの作成に失敗しました" + res.message);
          this.$router.push("/mypage");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
HTML SCSSResult Skip Results Iframe
EDIT ON
// リセットCSS（すでに指定済なら不要）
* {
  box-sizing: border-box;
}

// 🚩：重要なポイント
input[type="range"] {
  -webkit-appearance: none; // 🚩これ無しだとスタイルがほぼ全く反映されないので注意
  appearance: none;
  cursor: pointer; // カーソルを分かりやすく
  outline: none; // スライダーのアウトラインは目障りになるので消す
  background: $green; // バーの背景色
  height: 14px; // バーの高さ
  // width: 50%; // スライダーの幅
  border-radius: 10px; // バーの端の丸み
  border: solid 3px $white; // バーまわりの線
  // -webkit-向けのつまみ
  &::-webkit-slider-thumb {
    -webkit-appearance: none; // 🚩デフォルトのつまみのスタイルを解除
    background: $green; // 背景色
    width: 24px; // 幅
    height: 24px; // 高さ
    border-radius: 50%; // 円形に
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); // 影
  }
  // -moz-向けのつまみ
  &::-moz-range-thumb {
    background: $green; // 背景色
    width: 24px; // 幅
    height: 24px; // 高さ
    border-radius: 50%; // 円形に
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); // 影
    border: none; // デフォルトの線を消す
  }
  // Firefoxで点線が周りに表示されてしまう問題の解消
  &::-moz-focus-outer {
    border: 0;
  }
  // つまみをドラッグしているときのスタイル
  &:active::-webkit-slider-thumb {
    box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.3);
  }
}

label.radio {
  width: 25%;
}

.range-number {
  margin-left: 45%;
}

.form-field{
  margin-bottom: 1em;
}
</style>
