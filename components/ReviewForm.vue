<template>
  <form>
    <p>〇〇のコーヒーについて</p>
    <div>
      <!-- TODO -->
      <p>苦さについて</p>
      <p>焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
      <label>酸っぱい</label>
      <input name="bitterness" v-model="bitterness" type="radio" value="1" />
      <input name="bitterness" v-model="bitterness" type="radio" value="2" />
      <input name="bitterness" v-model="bitterness" type="radio" value="3" />
      <input name="bitterness" v-model="bitterness" type="radio" value="4" />
      <label>苦い</label>
    </div>
    <div>
      <!-- TODO -->
      <p>濃さについて</p>
      <p>抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
      <label>薄い</label>
      <input name="strongness" v-model="strongness" type="radio" value="1" />
      <input name="strongness" v-model="strongness" type="radio" value="2" />
      <input name="strongness" v-model="strongness" type="radio" value="3" />
      <input name="strongness" v-model="strongness" type="radio" value="4" />
      <label>濃い</label>
    </div>
    <div>
      <!-- TODO -->
      <p>役割について</p>
      <p>「どういう時におすすめか」という観点で選んでください。</p>
      <label>リラックス</label>
      <input name="situation" v-model="situation" type="radio" value="1" />
      <input name="situation" v-model="situation" type="radio" value="2" />
      <input name="situation" v-model="situation" type="radio" value="3" />
      <input name="situation" v-model="situation" type="radio" value="4" />
      <label>眠気覚まし</label>
    </div>
    <div>
      <p>また飲みたい??</p>
      <p>ご遠慮なく！</p>
      <label>飲みたくない</label>
      <input name="repeat" v-model="repeat" type="radio" value="1" />
      <input name="repeat" v-model="repeat" type="radio" value="2" />
      <input name="repeat" v-model="repeat" type="radio" value="3" />
      <label>また飲みたい!!</label>
    </div>
    <div>
      <p>感想</p>
      <p>コーヒーについての感想を教えてください。また、既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）</p>
      <input v-model="feeling" />
    </div>
    <button type="submit" v-bind:disabled="!isValid">送信!!</button>
    <!-- TODOどの誤りかを詳しく出力 -->
    <p v-show="!isValid" class="error-message">入力に不備があります</p>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "../plugins/firebase";
@Component
export default class ReviewForm extends Vue {
  bitterness: number = -1;
  strongness: number = -1;
  situation: number = -1;
  repeat: number = -1;
  feeling: string = "";

  get isValid(): boolean {
    return (
      this.bitterness !== -1 &&
      this.strongness !== -1 &&
      this.situation !== -1 &&
      this.repeat !== -1
    );
  }
}
</script>

<style>
</style>