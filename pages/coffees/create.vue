<template>
  <div>
    <form>
      <div>
        <label class="label">豆の種類<Required /></label>
        <div class="select is-medium">
          <select v-model="selectedBean">
            <option v-for="bean in beans" :key="bean.id" v-bind:value="bean.id">
              {{ bean.name }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <label class="label">抽出法<Required /></label>
        <div class="select is-medium">
          <select v-model.number="selectedExtractionMethod">
            <option
              v-for="method in extractionMethods"
              :key="method.id"
              :value="method.id"
            >
              {{ method.name }}
            </option>
          </select>
        </div>
      </div>

      <div v-show="selectedExtractionMethod == 1">
        <label class="label">抽出時間<Required /></label>
        <div class="field has-addons">
          <p class="control">
            <input
              v-model.number="selectedExtractionTime"
              type="number"
              min="0"
              max="10"
              class="input is-medium"
            />
          </p>
          <p class="control">
            <a class="button is-static is-medium">分</a>
          </p>
        </div>
      </div>
      <div>
        <label class="label">粉の量<Required /></label>
        <div class="field has-addons">
          <p class="control">
            <input
              v-model.number="selectedPowderAmount"
              type="number"
              min="0"
              max="20"
              step="0.1"
              class="input is-medium"
            />
          </p>
          <p class="control">
            <a class="button is-static is-medium">g</a>
          </p>
        </div>
      </div>
      <div>
        <label class="label">お湯の量<Required /></label>
        <div class="field has-addons">
          <p class="control">
            <input
              v-model.number="selectedWaterAmount"
              type="number"
              min="0"
              max="500"
              class="input is-medium"
            />
          </p>
          <p class="control">
            <a class="button is-static is-medium">mL</a>
          </p>
        </div>
      </div>
      <div>
        <label class="label">お湯の温度</label>
        <div class="field has-addons">
          <p class="control">
            <input
              v-model.number="selectedWaterTemperature"
              type="number"
              min="0"
              max="100"
              class="input is-medium"
            />
          </p>
          <p class="control">
            <a class="button is-static is-medium">℃</a>
          </p>
        </div>
      </div>
      <div>
        <label class="label">飲む人<Required /></label>
        <p class="help">IDかユーザー名を入力してください</p>

        <div v-for="i in selectedDrinkers.length" :key="i">
          <div class="field has-addons">
            <p class="control">
              <input
                v-model.lazy="selectedDrinkers[i - 1]"
                list="userslist"
                class="input is-medium"
              />
              <datalist id="userslist">
                もしくはリストから選択
                <select v-model="selectedDrinkers[i - 1]">
                  <option
                    v-for="user in users"
                    :key="user.id"
                    :value="user.name"
                  >
                    {{ user.name }}
                  </option>
                </select>
              </datalist>
            </p>
            <p class="control">
              <a
                v-if="selectedDrinkers.length != 1"
                type="button"
                @click="deleteDrinker(i)"
                class="button is-medium"
              >
                ×
              </a>
            </p>
          </div>
        </div>
        <p class="warn">{{ drinkerErrorMsg }}</p>
        <button
          v-if="selectedDrinkers.length < users.length"
          class="button"
          type="button"
          @click="addDrinker()"
        >
          追加
        </button>
      </div>
      <div>
        <label class="label">メモ</label>
        <input class="input is-medium" type="text" v-model="memo" />
        <p class="help">
          既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）
        </p>
      </div>
      <p class="warn">{{ formErrorMsg }}</p>
      <button
        @click="sendCoffee"
        v-bind:disabled="!isValid"
        type="button"
        class="button"
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
      selectedBean: null,
      extractionMethods: {},
      selectedDrinkers: [null],
      selectedExtractionMethod: 1,
      selectedExtractionTime: 3,
      selectedPowderAmount: 8.5,
      selectedWaterAmount: 100,
      selectedWaterTemperature: null,
      selectedMesh: null,
      beans: {},
      meshs: [],
      memo: "",
      users: [],
      selectedDrinkersId: [],
      drinkerErrorMsg: "",
      formErrorMsg: "",
    };
  },

  async created() {
    const beansAxios = this.$axios.$get("/beans");
    const methodsAxios = this.$axios.$get("/extraction_methods");
    const usersAxios = this.$axios.$get("/users");
    const result = await Promise.all([beansAxios, methodsAxios, usersAxios]);

    this.beans = result[0].data;
    this.extractionMethods = result[1].data;
    this.users = result[2].data;
  },

  computed: {
    isValid() {
      if (
        // TODO: メッセージを丁寧にする
        this.selectedBean !== null &&
        this.selectedExtractionMethod !== "" &&
        this.selectedExtractionTime !== "" &&
        this.selectedPowderAmount !== "" &&
        this.selectedWaterAmount !== "" &&
        this.selectedMesh !== "" &&
        this.selectedExtractionTime >= 0 &&
        this.selectedExtractionTime <= 10 &&
        this.selectedPowderAmount >= 0 &&
        this.selectedPowderAmount <= 20 &&
        this.selectedWaterAmount >= 0 &&
        this.selectedWaterAmount <= 500 &&
        ((this.selectedWaterTemperature >= 0 &&
          this.selectedWaterTemperature <= 100) ||
          this.selectedWaterTemperature === null ||
          this.selectedWaterTemperature === "") &&
        this.selectedDrinkersId.length > 0 &&
        this.selectedDrinkers[0] !== null
      ) {
        this.formErrorMsg = "";
        return true;
      }
    },
  },
  watch: {
    selectedDrinkers(val) {
      this.selectedDrinkersId = [];
      this.drinkerErrorMsg = "";
      val.forEach((drinkerNameOrId, index) => {
        const drinkerFindById = this.users.find(
          (user) => user.id == drinkerNameOrId
        );
        if (
          drinkerFindById &&
          !this.selectedDrinkersId.includes(drinkerFindById.id)
        ) {
          this.selectedDrinkersId.push(drinkerFindById.id);
          this.selectedDrinkers[index] = drinkerFindById.name;
          return;
        }
        const drinkerFindByName = this.users.find(
          (user) => user.name == drinkerNameOrId
        );
        if (
          drinkerFindByName &&
          !this.selectedDrinkersId.includes(drinkerFindByName.id)
        ) {
          this.selectedDrinkersId.push(drinkerFindByName.id);
          return;
        }
        this.drinkerErrorMsg = "ユーザーが存在しません";
      });
    },
  },

  methods: {
    sendCoffee() {
      if (!this.isValid) {
        this.formErrorMsg = "入力に不備があります";
        return;
      }
      this.$axios
        .$post("/coffees", {
          beanId: this.selectedBean,
          drinkerIds: this.selectedDrinkersId,
          dripperId: this.$store.state.currentUser.id,
          extractionMethodId: this.selectedExtractionMethod,
          extractionTime: this.selectedExtractionTime,
          meshId: this.selectedMesh,
          memo: this.memo,
          powderAmount: this.selectedPowderAmount,
          waterAmount: this.selectedWaterAmount,
          waterTemperature: this.selectedWaterTemperature,
        })
        .then((res) => {
          if (res.result) {
            console.log(res.data);
            alert("コーヒーを登録しました。");
          } else {
            alert("ERROR1:コーヒーの登録に失敗しました" + res.message);
          }
          this.$router.push("/");
        })
        .catch((err) => {
          console.error("コーヒーの登録に失敗しました" + err.message);
          alert("ERROR2:コーヒーの登録に失敗しました" + res.message);
          this.$router.push("/");
        });
    },
    addDrinker() {
      if (this.selectedDrinkers.length < this.users.length) {
        this.selectedDrinkers.push(null);
      }
    },
    deleteDrinker(id) {
      if (this.selectedDrinkers.length > 1) {
        this.selectedDrinkers.splice(id - 1, 1);
      }
    },
  },
};
</script>

<style lang="scss">
.warn {
  color: $red;
}
</style>
