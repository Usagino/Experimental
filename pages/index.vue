<template lang="pug">
  .container
    ul
      li
        nuxt-link(to="/boids") boids
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
