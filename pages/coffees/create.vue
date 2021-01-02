<template>
  <div>
    <form>
      <div class="form-field">
        <label class="label">豆の種類<Required /></label>
        <div class="select is-medium">
          <select v-model="selectedBean">
            <option v-for="bean in beans" :key="bean.id" :value="bean.id">
              {{ bean.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-field">
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

      <div v-show="selectedExtractionMethod == 1" class="form-field">
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
      <div class="form-field">
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
      <div class="form-field">
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
      <div class="form-field">
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
      <div class="form-field">
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
                class="button is-medium"
                @click="deleteDrinker(i)"
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
          ＋
        </button>
      </div>
      <div class="form-field">
        <label class="label">メモ</label>
        <input v-model="memo" class="input is-medium" type="text" />
        <p class="help">
          既定のレシピ通りに出来なかった場合はその旨を記してください（例：お湯を入れすぎた、抽出時間長すぎた）
        </p>
      </div>
      <p class="warn">{{ formErrorMsg }}</p>
      <button
        :disabled="!isValid"
        type="button"
        class="button"
        @click="sendCoffee"
      >
        送信!!
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import{ExtractionMethod,User,Bean,Mesh} from "~/types/models"
export default Vue.extend({
  data(): {
    selectedBean: number | null;
    extractionMethods: ExtractionMethod;
    selectedDrinkers: Array<string>;
    selectedExtractionMethod: number;
    selectedExtractionTime: number;
    selectedPowderAmount: number;
    selectedWaterAmount: number;
    selectedWaterTemperature: number | null;
    selectedMesh: number | null;
    beans: Bean | null;
    meshs: Mesh | null;
    memo: string;
    users: Array<User>;
    selectedDrinkersId: Array<number>;
    drinkerErrorMsg: string;
    formErrorMsg: string;
  } {
    return {
      selectedBean: null,
      extractionMethods: { id: 0, name: "" },
      selectedDrinkers: [],
      selectedExtractionMethod: 1,
      selectedExtractionTime: 3,
      selectedPowderAmount: 8.5,
      selectedWaterAmount: 100,
      selectedWaterTemperature: null,
      selectedMesh: null,
      beans: null,
      meshs: null,
      memo: "",
      users: [],
      selectedDrinkersId: [],
      drinkerErrorMsg: "",
      formErrorMsg: "",
    };
  },

  computed: {
    isValid(): boolean {
      if (
        // TODO: メッセージを丁寧にする
        this.selectedBean !== null &&
        this.selectedExtractionMethod &&
        this.selectedExtractionTime >= 0 &&
        this.selectedExtractionTime <= 10 &&
        this.selectedPowderAmount >= 0 &&
        this.selectedPowderAmount <= 20 &&
        this.selectedWaterAmount >= 0 &&
        this.selectedWaterAmount <= 500 &&
        ((this.selectedWaterTemperature &&
          this.selectedWaterTemperature >= 0 &&
          this.selectedWaterTemperature <= 100) ||
          this.selectedWaterTemperature === null) &&
        this.selectedDrinkersId.length > 0
      ) {
        return true;
      } else return false;
    },
  },
  watch: {
    selectedDrinkers(val: Array<number | string>): void {
      this.selectedDrinkersId = [];
      this.drinkerErrorMsg = "";
      val.forEach((drinkerNameOrId: number | string, index: number) => {
        if (drinkerNameOrId && this.users) {
          const drinkerFindById = this.users.find(
            (user: User) => user.id == drinkerNameOrId
          );
          const drinkerFindByName = this.users.find(
            (user: User) => user.name == drinkerNameOrId
          );
          if (
            drinkerFindById &&
            !this.selectedDrinkersId.includes(drinkerFindById.id)
          ) {
            this.selectedDrinkersId.push(drinkerFindById.id);
            this.selectedDrinkers[index] = drinkerFindById.name;
            return;
          }
          if (
            drinkerFindByName &&
            !this.selectedDrinkersId.includes(drinkerFindByName.id)
          ) {
            this.selectedDrinkersId.push(drinkerFindByName.id);
            return;
          }
          if (
            (drinkerFindById &&
              this.selectedDrinkersId.includes(drinkerFindById.id)) ||
            (drinkerFindByName &&
              this.selectedDrinkersId.includes(drinkerFindByName.id))
          )
            this.drinkerErrorMsg = "ユーザーが重複しています";
          else this.drinkerErrorMsg = "ユーザーが存在しません";
        }
      });
    },
    selectedWaterTemperature(val: number | string): void {
      if (val === "") this.selectedWaterTemperature = null;
    },
    isValid(val: boolean): void {
      if (val) {
        this.formErrorMsg = "";
      }
    },
  },

  async created(): Promise<void> {
    const beansAxios = this.$axios.$get("/beans");
    const methodsAxios = this.$axios.$get("/extraction_methods");
    const usersAxios = this.$axios.$get("/users");
    const result = await Promise.all([beansAxios, methodsAxios, usersAxios]);

    this.beans = result[0].data;
    this.extractionMethods = result[1].data;
    this.users = result[2].data;
  },

  methods: {
    sendCoffee(): void {
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
        .then((res: { result: boolean; data: any; message: string }) => {
          if (res.result) {
            console.log(res.data);
            this.$toast.success("コーヒーを登録しました。");
          } else {
            this.$toast.error(
              "ERROR1:コーヒーの登録に失敗しました" + res.message
            );
          }
          this.$router.push("/");
        })
        .catch((err: { message: string }) => {
          console.error("コーヒーの登録に失敗しました" + err.message);
          this.$toast.error(
            "ERROR2:コーヒーの登録に失敗しました" + err.message
          );
          this.$router.push("/");
        });
    },
    addDrinker(): void {
      if (this.selectedDrinkers.length < this.users.length) {
        this.selectedDrinkers.push("");
      }
    },
    deleteDrinker(id: number): void {
      if (this.selectedDrinkers.length > 1) {
        this.selectedDrinkers.splice(id - 1, 1);
      }
    },
  },
});
</script>

<style lang="scss">
.warn {
  color: $red;
}

.form-field {
  margin-bottom: 1em;
}
</style>
