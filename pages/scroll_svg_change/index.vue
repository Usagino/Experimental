<template lang="pug">
  .container
    #drawing
    .wrap
      .item_1.item
        .item_1__contents.item__contents
      .item_2.item
        .item_2__contents.item__contents
      .item_3.item
        .item_3__contents.item__contents
</template>

<script>
import * as SVG from "svg.js"
import elSize from "@/assets/module/size.js"
import inView from "in-view"

export default {
  mounted(){
    let doc_h = elSize("body").h
    let doc_w = elSize("body").w
    let draw = SVG('drawing').size(doc_w, doc_h)
    let image_url = "https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
    let backimage = draw.image(image_url,window.innerWidth)
    let backimage_el = SVG.get(backimage).node.style
    backimage_el.height = "auto"

    let one = "M311.99 48.5922C170.702 -40.1629 121.282 -15.8094 14.8406 226.102C-33.2014 327.305 40.8175 548.652 341.135 492.368C641.453 436.084 453.279 137.347 311.99 48.5922Z"
    let two = "M480.814 433.03C556.147 195.908 400.605 -170.684 264.432 90.7294C202.971 200.09 -127.826 -28.1109 54.9954 263.728C130.475 384.217 422.955 615.151 480.814 433.03Z"
    let three = "M487.187 218.278C377.64 58.2678 218.936 -117.915 91.4997 109.502C33.982 204.64 -79.5926 219.898 91.4997 473.783C162.137 578.602 581.774 356.436 487.187 218.278Z"

    let rect = draw.path(one).fill('white').center(window.innerWidth/2, window.innerHeight/2)
    backimage.maskWith(rect)


    window.onscroll = () =>{
      let scroll_top = document.documentElement.scrollTop ||  document.body.scrollTop;
      backimage.y(scroll_top)
    }

    inView('.item_1__contents').on('enter', el => {
      let element = document.querySelector(".item_1")
      let top = element.getBoundingClientRect().top + window.pageYOffset;
      // console.log(top);
      rect.animate(1000,"<>").plot(one).center(window.innerWidth/2, window.innerHeight/2)
    })

    inView('.item_2__contents').on('enter', el => {
      let element = document.querySelector(".item_2")
      let top = element.getBoundingClientRect().top + window.pageYOffset;
      // console.log(top);
      rect.animate(1000,"<>").plot(two).cy(top + window.innerHeight/2).x(800);
    })

    inView('.item_3__contents').on('enter', el => {
      let element = document.querySelector(".item_3")
      let top = element.getBoundingClientRect().top + window.pageYOffset;
      // console.log(top);
      rect.animate(1000,"<>").plot(three).cy(top + window.innerHeight/2).x(100);
    })



  }
}
</script>

<style lang="scss" scoped>
.container{
  position: relative;

}
.wrap{
  .item{
    content: "";
    height: 100vh;
    width: 100vw;
  }
}
#drawing{
  position: absolute;
  top: 0;
  left: 0;
}
.backimage{
  background-image: url("https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  @include full_screen;
  background-attachment: fixed;
  content: "";
}
.item_1{
  background: #f6f6f6;
}
.item_2{
  background: #e8e8e8;
}
.item_3{
  background: #dbdbdb;
}
.item{
  display: flex;
  align-items: center;

  &__contents{
    height: 100px;
    width: 100px;
    background: #e0e0e0;
  }
}
</style>
