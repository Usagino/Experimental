<!-- マウスの位置を右下に表示するコンポーネント -->
<template lang="pug">
  .position
    p 左から{{point_x}}px
    p 上から{{point_y}}px
</template>

<script>
export default {
  data(){
    return{
      point_x:0,
      point_y:0
    }
  },
  mounted(){
    document.body.addEventListener("mousemove",e =>{
      //座標を取得する
      var mX = e.pageX;  //X座標
      var mY = e.pageY;  //Y座標
      this.point_x = mX
      this.point_y = mY
    });
  }
}
</script>

<style lang="scss" scoped>
.position{
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 240px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(0, 10, 29);
  padding: 10px 20px;
  box-sizing: content-box;
  border-radius: 4px;
  box-shadow: 4px 4px 10px rgba(#c1c1c1, 0.61);
  transition: all .4s ease .1s;
  p{
    color: white;
  }
  &:hover{
    opacity: 0.3;
  }
}
</style>
