<template lang="pug">
  .container
    mousePosition
    #drawing
</template>

<script>
import mousePosition from '@/components/boids/mousePosition'
import * as SVG from "svg.js"
import obj from "@/assets/json/hoge.json"

export default {
  components:{
    mousePosition
  },
  mounted(){
    let window_el = document.querySelector('.container')
    let window_h = window_el.clientWidth
    let window_w = window_el.clientHeight
    let draw = SVG('drawing').size(window_h, window_w)

    let circles = []
    let lines =[]

    const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    for(let i in obj) {
      if (obj[i].type === "parent") {
        circles.push({
          "name":obj[i].name,
          "position":draw.circle(40).fill('#FD7777').move(window_h/2, window_w/2)
        })
      }
      else{
        for(let x in circles) {
          //親の名前とjsonの名前を精査してる。
          if (circles[x].name === obj[i].who_parent) {

            let parent_cx = circles[x].position.attr().cx
            let parent_cy = circles[x].position.attr().cy
            let parent = circles.find(parent_name => parent_name.name === obj[i].who_parent);
            if (parent.angle !== undefined) {
              var random_angle = randRange(parent.angle - 50, parent.angle + 50)
            }else{
              var random_angle = Math.random() * 360
            }
            let x2 = parent_cx + 100 * Math.cos( random_angle * (Math.PI / 180) );
            let y2 = parent_cy + 100 * Math.sin( random_angle * (Math.PI / 180) );
            circles.push({
              "name":obj[i].name,
              "parent": obj[i].who_parent,
              "angle":random_angle,
              "position": draw.circle(20).fill('white').stroke({ color:'#FD7777',width: 2 }).move(x2 ,y2)
            })

            lines[`line_${i}`] = draw.line(x2+10,y2+10,parent_cx,parent_cy).stroke({ color:'#FFB5B5',width: 1 })

            break
          }
          else{
            console.log("親がいない");
          }
        }
      }

    }
    // console.table(obj);
    // console.table(circles)
  }
}
</script>

<style lang="scss" scoped>
.container{
  @include full_screen
  background-image: radial-gradient(#989898 2%, transparent 2%);
  background-color: white;
  background-position: 0 0, 50px 50px;
  background-size: 100px 100px;
}
</style>
