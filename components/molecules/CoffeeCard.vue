<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        {{coffee.bean_id}}
      </p>
      <p class="subtitle">
        {{coffee.id}}
      </p>
      <ul>
        <li>:{{coffee.extractionTime}}</li>
        <li>焙煎時間:{{coffee.extractionTime}}min</li>
        <li>粉の量:{{coffee.powderAmount}}g</li>
        <li>水の量  :{{coffee.waterAmount}}ml</li>
      </ul>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          このコーヒーの
          <nuxt-link :to="fullPath">レビューを書く</nuxt-link>
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
export default{
  props: ["coffee"],

  computed:{ fullPath:function() {
    return "/reviews/create/"+this.coffee.id
  }}
}
</script>

<style>
</style>