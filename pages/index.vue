<template lang="pug">
  .container
    ul
      li
        nuxt-link(to="/boids") boids
      li
        nuxt-link(to="/d3force") d3 force
      li
        nuxt-link(to="/scroll_svg_change") scroll SVG change
</template>

<script>
import Logo from '~/components/Logo.vue'






export default {
  components: {
    Logo
  },
  mounted(){
    console.log("hi");
  }
}
</script>

<style>

</style>
