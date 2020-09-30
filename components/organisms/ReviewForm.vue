<template>
  <div>
    <form>
      <div>
        <p>苦さについて</p>
        <p>焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
        <label>酸っぱい</label>
        <span v-for="num in [1,2,3,4]" :key="num">
          <input
            name="bitterness"
            v-model.number="bitterness"
            type="radio"
            :value="num"
          />
        </span>
        <label>苦い</label>
      </div>
      <div>
        <p>濃さについて</p>
        <p>抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。</p>
        <label>薄い</label>
        <span v-for="num in [1,2,3,4]" :key="num">
          <input
            name="strongness"
            v-model.number="strongness"
            type="radio"
            :value="num"
          />
        </span>
        <label>濃い</label>
      </div>
      <div>
        <p>役割について</p>
        <p>「どういう時におすすめか」という観点で選んでください。</p>
        <label>リラックス</label>
        <span v-for="num in [1,2,3,4]" :key="num">
          <input
            name="situation"
            v-model.number="situation"
            type="radio"
            :value="num"
          />
        </span>
        <label>眠気覚まし</label>
      </div>
      <div>
        <p>また飲みたい??</p>
        <p>ご遠慮なく！</p>
        <label>飲みたくない</label>
        <span v-for="num in [1,2,3]" :key="num">
          <input
            name="repeat"
            v-model.number="repeat"
            type="radio"
            :value="num"
          />
        </span>
        <label>また飲みたい!!</label>
      </div>
      <div>
        <p>感想</p>
        <p>
          コーヒーについての感想を教えてください。また、既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）
        </p>
        <input v-model="feeling" />
      </div>
      <!-- TODO:どの誤りかを詳しく出力 -->
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
</template>

<script>
import firebase from "@/plugins/firebase";
var db = firebase.firestore();

export default {
  props: ["coffeeData"],

  data() {
    return {
      bitterness: -1,
      strongness: -1,
      situation: -1,
      repeat: -1,
      feeling: "",
      user: firebase.auth().currentUser, //TODO: リロードすると得られない。
    };
  },

  computed: {
    isValid() {
      return (
        this.bitterness !== -1 &&
        this.strongness !== -1 &&
        this.situation !== -1 &&
        this.repeat !== -1
      );
    },
  },

  methods: {
    sendReview() {
      if (this.user !== null) {
        let batch = db.batch();

        let coffeesDoc = db.collection("coffees").doc(this.coffeeData.id);
        batch.update(coffeesDoc, {
          bitterness: this.bitterness,
          strongness: this.strongness,
          situation: this.situation,
          repeat: this.repeat,
          feeling: this.feeling,
          userId: this.user.uid,
          coffeeId: this.coffeeData.id,
          isReviewExist: true,
          reviewRegisteredTime: firebase.firestore.FieldValue.serverTimestamp(),
        });

        let usersDoc = db.collection("users").doc(this.user.uid);
        batch.update(usersDoc, {
          reviews: firebase.firestore.FieldValue.arrayUnion(this.coffeeData.id),
        });

        let datasDoc = db
          .collection
          .doc("all")
          .collection("datas")
          .doc(String(this.coffeeData.beanId));
        batch.update(datasDoc, {
          countReviews: firebase.firestore.FieldValue.increment(1),
          sumBitterness: firebase.firestore.FieldValue.increment(
            this.bitterness
          ),
          sumRepeat: firebase.firestore.FieldValue.increment(this.repeat),
          sumSituation: firebase.firestore.FieldValue.increment(this.situation),
          sumStrongness: firebase.firestore.FieldValue.increment(
            this.strongness
          ),
        });

        let userDatasDoc = db
          .collection("datas")
          .doc(this.user.uid)
          .collection("datas")
          .doc(String(this.coffeeData.beanId));
        batch.update(userDatasDoc, {
          countReviews: firebase.firestore.FieldValue.increment(1),
          sumBitterness: firebase.firestore.FieldValue.increment(
            this.bitterness
          ),
          sumRepeat: firebase.firestore.FieldValue.increment(this.repeat),
          sumSituation: firebase.firestore.FieldValue.increment(this.situation),
          sumStrongness: firebase.firestore.FieldValue.increment(
            this.strongness
          ),
        });

        batch.commit().then(() => {
          alert("レビューを投稿しました。");
          this.$router.push("/mypage");
        });
      } else {
        alert("ERROR1:ログインしてください");
        this.$router.push("/login");
      }
    },
  },
};
//TODO:すでにこのコーヒーにレビューがある場合エラーを吐く。
// TODO: 投稿後に?bitterness=2&strongness=4&situation=1&repeat=3みたいなパラメータがつく..?
//TODO: このコーヒーのレビューを書く権利があるかを取得
</script>

<style >
</style>