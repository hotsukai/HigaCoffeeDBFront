<template>
  <div>
    <form>
      <div>
        <label class="label">豆の種類</label>
        <div class="select">
          <select v-model="selectedBean">
            <option
              v-for="bean in beans"
              :key="bean.id"
              v-bind:value="bean.id"
              >{{ bean.name }}</option
            >
          </select>
        </div>
      </div>
      <div>
        <label class="label">抽出法</label>
        <div class="select">
          <select v-model.number="selectedExtractionMethod">
            <option
              v-for="method in extractionMethods"
              :key="method.id"
              :value="method.id"
              >{{ method.name }}</option
            >
          </select>
        </div>
      </div>
      <div v-show="selectedExtractionMethod == 1">
        <label class="label">抽出時間</label>
        <!-- TODO:フレンチプレスのみ -->
        <input
          v-model.number="selectedExtractionTime"
          type="number"
          min="0"
          max="10"
        />分
      </div>
      <div>
        <label class="label">粉の量</label>
        <input
          v-model.number="selectedPowderAmount"
          type="number"
          min="0"
          max="20"
          step="0.1"
        />g
      </div>
      <div>
        <label class="label">お湯の量</label>
        <input
          v-model.number="selectedWaterAmount"
          type="number"
          min="0"
          max="200"
        />mL
      </div>
      <div>
        <label class="label">お湯の温度</label>
        <input
          v-model.number="selectedWaterTemperature"
          type="number"
          min="0"
          max="100"
        />℃
      </div>
      <div>
        <label class="label">飲む人</label>
        <div v-for="i in selectedDrinkers.length" :key="i">
          <input
            v-model.number="selectedDrinkers[i - 1]"
            type="number"
            list="userslist"
            :min="usersMinId"
            :max="usersMaxId"
          />
          <datalist id="userslist">
            もしくはリストから選択
            <select v-model.number="selectedDrinkers[i - 1]">
              <option v-for="user in users" :key="user.id" :value="user.id">{{
                user.name
              }}</option>
            </select>
          </datalist>
          <button
            v-if="selectedDrinkers.length != 1"
            type="button"
            @click="deleteDrinker(i)"
          >
            削除
          </button>
          <p class="help">IDを入力してください</p>
        </div>
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
        <input class="input" type="text" />
        <p class="help">
          既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）
        </p>
      </div>
      <p v-show="!isValid" class="is-danger">入力に不備があります</p>
      <button
        @click="sendCoffee"
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
export default {
  data() {
    return {
      beans: {},
      selectedBean: null,
      extractionMethods: {},
      selectedExtractionMethod: 1,
      selectedExtractionTime: 3,
      selectedPowderAmount: 8.5,
      selectedWaterAmount: 100,
      selectedWaterTemperature: 96,
      users: [],
      selectedDrinkers: [""]
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
      return true;
    },
    usersMaxId() {
      return this.users.reduce((accumulator, user) => {
        console.debug("acc" + accumulator);
        return accumulator <= user.id ? user.id : accumulator;
      }, 1);
    },
    usersMinId() {
      return this.users.reduce((accumulator, user) => {
        console.debug("acc" + accumulator);
        return accumulator >= user.id ? user.id : accumulator;
      }, 1);
    }
  },

  //   watch: {
  // selectedDrinkers
  //   },

  methods: {
    sendCoffee() {},
    addDrinker() {
      if (this.selectedDrinkers.length < this.users.length) {
        this.selectedDrinkers.push("");
      }
    },
    deleteDrinker(id) {
      if (this.selectedDrinkers.length > 1) {
        this.selectedDrinkers.splice(id - 1, 1);
      }
    }
  }
};
</script>

<style></style>
