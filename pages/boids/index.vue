<template lang="pug">
  .container
    mousePosition
    #drawing
</template>

<script>
import mousePosition from '@/components/boids/mousePosition'
import * as SVG from "svg.js";

export default {
  components:{
    mousePosition
  },
  mounted(){
    let window_el = document.querySelector('.container')
    let window_h = window_el.clientWidth;
    let window_w = window_el.clientHeight;

    let draw = SVG('drawing').size(window_h, window_w)
    // let parent_circle = draw.circle(40).fill('#f06').move(window_h/2, window_w/2)
    // let child_circle = draw.circle(40).fill('white').stroke('#f06').move(60,30)
    let circles = {
      "parent_circle":draw.circle(40).fill('#f06').move(window_h/2, window_w/2),
      "child_circle":draw.circle(40).fill('white').stroke('#f06').move(Math.random() * window_h,Math.random() * window_w)
    }
    let line = draw.line(circles.parent_circle.attr().cx, circles.parent_circle.attr().cy, circles.child_circle.attr().cx, circles.child_circle.attr().cy).stroke({ width: 1 })

  }
}
</script>

<style lang="scss" scoped>
.container{
  @include full_screen;
}
</style>
