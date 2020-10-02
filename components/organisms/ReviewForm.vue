<template>
  <div>
    <form>
      <div>
        <label class="label">苦さ</label>
        <p class="help">
          焙煎度合は一旦忘れて、「あなたがどう感じたか」を記してください。
        </p>
        <label class="radio">酸っぱい</label>
        <span v-for="num in [1, 2, 3, 4]" :key="num">
          <input
            name="bitterness"
            v-model.number="bitterness"
            type="radio"
            :value="num"
          />
        </span>
        <label class="radio">苦い</label>
      </div>
      <div>
        <label class="label">濃さ</label>
        <p class="help">
          抽出時間は一旦忘れて、「あなたがどう感じたか」を記してください。
        </p>
        <label class="radio">薄い</label>
        <span v-for="num in [1, 2, 3, 4]" :key="num">
          <input
            name="strongness"
            v-model.number="strongness"
            type="radio"
            :value="num"
          />
        </span>
        <label class="radio">濃い</label>
      </div>
      <div>
        <label class="label">役割</label>
        <p class="help">
          「どういう時におすすめか」という観点で選んでください。
        </p>
        <label class="radio">リラックス</label>
        <span v-for="num in [1, 2, 3, 4]" :key="num">
          <input
            name="situation"
            v-model.number="situation"
            type="radio"
            :value="num"
          />
        </span>
        <label class="radio">眠気覚まし</label>
      </div>
      <div>
        <label class="label">また飲みたい??</label>
        <p class="help">ご遠慮なく！</p>
        <label class="radio">飲みたくない</label>
        <span v-for="num in [1, 2, 3]" :key="num">
          <input
            name="repeat"
            v-model.number="repeat"
            type="radio"
            :value="num"
          />
        </span>
        <label class="radio">また飲みたい!!</label>
      </div>
      <div>
        <label class="label">感想</label>
        <p class="help">
          コーヒーについての感想を教えてください。また、既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）
        </p>
        <input class="input" type="text" v-model="feeling" />
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
        return db
          .runTransaction(async (transaction) => {
            let allDatasDoc = db
              .collection("datas")
              .doc("all")
              .collection("datas")
              .doc(String(this.coffeeData.beanId));
            let datasOfAll = await transaction.get(allDatasDoc);
            datasOfAll = datasOfAll.data();

            let userDatasDoc = db
              .collection("datas")
              .doc(this.user.uid)
              .collection("datas")
              .doc(String(this.coffeeData.beanId));
            let datasOfUser = await transaction.get(userDatasDoc);
            datasOfUser = datasOfUser.data();

            let usersDoc = db.collection("users").doc(this.user.uid);
            let coffeesDoc = db.collection("coffees").doc(this.coffeeData.id);

            //coffees/:coffeeId
            transaction.update(coffeesDoc, {
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

            //users/:uid
            transaction.update(usersDoc, {
              reviews: firebase.firestore.FieldValue.arrayUnion(
                this.coffeeData.id
              ),
            });

            // datas/all/datas/:beanId
            transaction.update(allDatasDoc, {
              countReviews: firebase.firestore.FieldValue.increment(1),
              sumBitterness: firebase.firestore.FieldValue.increment(
                this.bitterness
              ),
              sumRepeat: firebase.firestore.FieldValue.increment(this.repeat),
              sumSituation: firebase.firestore.FieldValue.increment(
                this.situation
              ),
              sumStrongness: firebase.firestore.FieldValue.increment(
                this.strongness
              ),
              //レビュー数
              [`strong${this.strongness}.count`]: isNaN(
                datasOfAll[`strong${this.strongness}.count`]
              )
                ? 1
                : datasOfAll[`strong${this.strongness}.count`] + 1,

              //抽出時間
              [`strong${this.strongness}.sumExtractionTime`]: isNaN(
                datasOfAll[`strong${this.strongness}.sumExtractionTime`]
              )
                ? this.coffeeData.extractionTime
                : datasOfAll[`strong${this.strongness}.sumExtractionTime`] +
                  this.coffeeData.extractionTime,

              //粉の量
              [`strong${this.strongness}.sumPowderAmount`]: isNaN(
                datasOfAll[`strong${this.strongness}.sumPowderAmount`]
              )
                ? this.coffeeData.powderAmount
                : datasOfAll[`strong${this.strongness}.sumPowderAmount`] +
                  this.coffeeData.powderAmount,
            });

            //datas/:userId/datas/:beanId
            transaction.update(userDatasDoc, {
              countReviews: firebase.firestore.FieldValue.increment(1),
              sumBitterness: firebase.firestore.FieldValue.increment(
                this.bitterness
              ),
              sumRepeat: firebase.firestore.FieldValue.increment(this.repeat),
              sumSituation: firebase.firestore.FieldValue.increment(
                this.situation
              ),
              sumStrongness: firebase.firestore.FieldValue.increment(
                this.strongness
              ),
              //レビュー数
              [`strong${this.strongness}.count`]: isNaN(
                datasOfAll[`strong${this.strongness}.count`]
              )
                ? 1
                : datasOfAll[`strong${this.strongness}.count`] + 1,

              //抽出時間
              [`strong${this.strongness}.sumExtractionTime`]: isNaN(
                datasOfAll[`strong${this.strongness}.sumExtractionTime`]
              )
                ? this.coffeeData.extractionTime
                : datasOfAll[`strong${this.strongness}.sumExtractionTime`] +
                  this.cofffeeData.extractionTime,

              //粉の量
              [`strong${this.strongness}.sumPowderAmount`]: isNaN(
                datasOfAll[`strong${this.strongness}.sumPowderAmount`]
              )
                ? this.coffeeData.powderAmount
                : datasOfAll[`strong${this.strongness}.sumPowderAmount`] +
                  this.coffeeData.powderAmount,
            });
          })
          .then(() => {
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
</script>

<style >
</style>