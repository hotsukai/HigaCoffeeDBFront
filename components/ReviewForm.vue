<template>
  <form v-if="coffee">
    <div class="form-field">
      <label class="label">苦さ<Required /></label>
      <p class="help">
        焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。
      </p>
      <vue-slider
        v-model.number="bitterness"
        :contained="true"
        :max="4"
        :min="1"
        :interval="0.1"
      />
      <nav class="level is-mobile slide-bar-label">
        <div class="level-left">
          <p class="level-item">苦くない</p>
        </div>
        <div class="level-right">
          <p class="level-item">苦い</p>
        </div>
      </nav>
    </div>
    <div class="form-field">
      <label class="label">濃さ<Required /></label>
      <p class="help">
        抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。
      </p>
      <vue-slider
        v-model.number="strongness"
        :contained="true"
        :max="4"
        :min="1"
        :interval="0.1"
      />
      <nav class="level is-mobile slide-bar-label">
        <div class="level-left">
          <p class="level-item">薄い</p>
        </div>
        <div class="level-right">
          <p class="level-item">濃い</p>
        </div>
      </nav>
    </div>
    <div class="form-field">
      <label class="label">役割<Required /></label>
      <p class="help">「どういう時におすすめか」という観点で選んでください。</p>
      <vue-slider
        v-model="situation"
        :contained="true"
        :max="4"
        :min="1"
        :interval="0.1"
      />
      <nav class="level is-mobile slide-bar-label">
        <div class="level-left">
          <p class="level-item">リラックス</p>
        </div>
        <div class="level-right">
          <p class="level-item">眠気覚まし</p>
        </div>
      </nav>
    </div>
    <div class="form-field">
      <label class="label">また飲みたい??<Required /></label>
      <p class="help">ご遠慮なく！</p>
      <vue-slider
        v-model.number="wantRepeat"
        :contained="true"
        :interval="0.1"
        :min="1"
        :max="3"
      />
      <nav class="level is-mobile slide-bar-label">
        <div class="level-left">
          <p class="level-item">飲みたくない</p>
        </div>
        <div class="level-right">
          <p class="level-item">飲みたい</p>
        </div>
      </nav>
    </div>
    <div class="form-field-last">
      <label class="label">感想</label>
      <p class="help">コーヒーについての感想を教えてください。</p>
      <input v-model="feeling" class="input" type="text" />
    </div>
    <p v-show="!isValid" class="is-danger">入力に不備があります</p>
    <button
      :disabled="!isValid"
      type="button"
      class="button"
      @click="emitReview()"
    >
      送信!!
    </button>
  </form>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Coffee, Review } from "~/types/models";
import VueSlider from "vue-slider-component";
export default Vue.extend({
  components: { VueSlider },
  props: {
    coffee: { type: Object as PropType<Coffee>, default: null },
    existingReview: { type: Object as PropType<Review>, default: null },
  },
  data(): {
    bitterness: number;
    strongness: number;
    situation: number;
    wantRepeat: number;
    feeling: string;
  } {
    return {
      bitterness: 1,
      strongness: 1,
      situation: 1,
      wantRepeat: 1,
      feeling: "",
    };
  },

  computed: {
    isValid(): boolean {
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

  created() {
    if (this.existingReview) {
      this.bitterness = this.existingReview.bitterness;
      this.strongness = this.existingReview.strongness;
      this.situation = this.existingReview.situation;
      this.wantRepeat = this.existingReview.wantRepeat;
      this.feeling = this.existingReview.feeling;
    }
  },

  methods: {
    emitReview(): void {
      if (this.coffee) {
        const _review: Review = {
          id: null,
          bitterness: this.bitterness,
          coffee: this.coffee,
          feeling: this.feeling,
          situation: this.situation,
          strongness: this.strongness,
          reviewer: this.$store.state.currentUser,
          wantRepeat: this.wantRepeat,
          createdAt: null,
          updatedAt: null,
        };
        this.$emit("reviewFromForm", _review);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.form-field {
  margin-bottom: 4em;
  .slide-bar-label {
    font-size: 14px;
  }
}
.form-field-last {
  margin-bottom: 2em;
}
</style>
