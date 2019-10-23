<template lang="pug">
  .container
    ul
      li
        nuxt-link(to="/boids") boids
      li
        nuxt-link(to="/d3force") d3 force
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>

</style>
