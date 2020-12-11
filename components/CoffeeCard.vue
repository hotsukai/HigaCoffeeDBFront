<template>
  <div class="card" v-if="coffee">
    <div class="card-content">
      <p class="title">
        {{ coffee.bean.name }}
      </p>
      <p class="subtitle">ID: {{ coffee.id }}</p>
      <ul>
        <li>
          登録された時間 :
          {{ coffee.createdAt }}
        </li>
        <li>蒸らし時間 : {{ coffee.extractionTime }}min</li>
        <li>粉の量 : {{ coffee.powderAmount }}g</li>
        <li>水の量 : {{ coffee.waterAmount }}ml</li>
        <li>メッシュ : {{ coffee.meshId }}</li>
        <li>
          湯温 :
          {{ coffee.waterTemperature }}
        </li>
        <li>
          抽出方法 :
          {{ coffee.extractionMethodId }}
        </li>
        <li>
          メモ:
          {{ coffee.memo }}
        </li>
      </ul>
    </div>
    <slot>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <nuxt-link :to="fullPath" class="button is-primary"
              >レビューを書く</nuxt-link
            >
          </span>
          <!-- TODO 自分宛てのときのみ表示する。 -->
        </p>
      </footer>
    </slot>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 1em;
}
</style>

<script>
export default {
  props: ["coffee"],

  computed: {
    fullPath: function() {
      return "/reviews/create/" + this.coffee.id;
    }
  }
};
</script>

<style></style>
