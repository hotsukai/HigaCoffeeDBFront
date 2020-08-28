<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        <slot name="title">{{coffee.name}}</slot>
      </p>
      <p class="subtitle">
        <slot name="id">{{coffee.id}}</slot>
      </p>
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