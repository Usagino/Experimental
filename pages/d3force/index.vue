<!-- d3のForce simulationを使用している -->
<template lang="pug">
  .container
    #drawing
</template>

<script>
import * as d3 from "d3";
export default {
  mounted(){
    let window_el = document.querySelector('.container')
    let window_h = window_el.clientWidth
    let window_w = window_el.clientHeight

    const nodes = [
      { id: 0, depth: 0 },
      { id: 1, depth: 1 },
      { id: 2, depth: 0 },
      { id: 3, depth: 2 },
      { id: 4, depth: 3 },
      { id: 5, depth: 3 },
      { id: 6, depth: 4 }
    ];

    const edges = [
      { source: 0, target: 1 },
      { source: 1, target: 3 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 3, target: 5 },
      { source: 4, target: 3 },
      { source: 4, target: 6 }
    ];

    const svgSize = { width: window_h, height: window_w };

    // 描画領域を指定
    const d3Svg = d3
      .select("#drawing")
      .append("svg")
      .attr("width", svgSize.width)
      .attr("height", svgSize.height);


    const d3Links = d3Svg
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", "#FFB5B5");

      // ノード(点)の設定。
    const d3Nodes = d3Svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "white")
      .attr("stroke","#FD7777")
      .attr("stroke-width",2)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // 描画とシミュレーションの設定。
    const simulation = d3
      .forceSimulation()
      .nodes(nodes)
      .on("tick", ticked)
      .force("link", d3.forceLink(edges).distance(50))
      .force("charge", d3.forceManyBody().strength(-200))  // 斥力。負にすることで反発力が働く
      .force("center", d3.forceCenter(svgSize.width / 2, svgSize.height / 2))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    // 配置の初期設定。データのdepthに合わせてyを決める

    simulation.nodes().forEach(d => {
      console.log(d);
      if (d.id === 0) {
        d.fy = svgSize.height / 2
        d.fx = svgSize.width / 2
      }else{
        d.fy = d.depth * 60 + svgSize.height / 2;
      }
    });

    // ドラッグイベント------------------------------------------------------
    // (f軸は固定したいため、今回はコメントアウト)
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.9).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // 状態の更新。シミュレーションで計算、こっちで更新という流れ。
    function ticked() {
      d3Nodes.attr("cx", d => d.x).attr("cy", d => d.y);
      d3Links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    }
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
