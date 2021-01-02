<template>
  <div>
    <li v-if="coffee.extractionTime">
      蒸らし時間 : {{ coffee.extractionTime }}min
    </li>
    <li v-if="coffee.powderAmount">粉の量 : {{ coffee.powderAmount }}g</li>
    <li v-if="coffee.waterAmount">水の量 : {{ coffee.waterAmount }}ml</li>
    <li v-if="coffee.meshId">メッシュ : {{ coffee.meshId }}</li>
    <li v-if="coffee.waterTemperature">
      湯温 :
      {{ coffee.waterTemperature }}
    </li>
    <li v-if="coffee.extractionMethod">
      抽出方法 :
      {{ coffee.extractionMethod.name }}
    </li>
  </div>
</template>

<script>
export default {
  props: {
    coffee: {type:Object,default:new Object()},
  },
};
</script>

<style>
</style>