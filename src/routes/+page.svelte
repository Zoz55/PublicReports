
 
<div class="chart" bind:this={chartdiv}></div> 
<style>
.chart {  
    width: 100%;
    height: 500px;  
}
</style>
<script>
export let data;
export let form ;
import { onMount } from "svelte";
import * as am5 from "@amcharts/amcharts5?client";
import * as am5xy from "@amcharts/amcharts5/xy?client";
let chartdiv;

const setupChart = () => {
let root = am5.Root.new(chartdiv);


var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX: true,
  paddingLeft:0,
  paddingRight:1
}));


var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);


var xRenderer = am5xy.AxisRendererX.new(root, { 
  minGridDistance: 30, 
  minorGridEnabled: true
});

xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15
});

xRenderer.grid.template.setAll({
  location: 1
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,
  categoryField: "name",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

var yRenderer = am5xy.AxisRendererY.new(root, {
  strokeOpacity: 0.1
})

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  renderer: yRenderer
}));

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "km",
  sequencedInterpolation: true,
  categoryXField: "name",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));

series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
series.columns.template.adapters.add("fill", (fill, target) =>
 chart.get("colors").getIndex(series.columns.indexOf(target)));

series.columns.template.adapters.add("stroke",(stroke, target) =>
 chart.get("colors").getIndex(series.columns.indexOf(target)));

var datawithinkm = data.car.map((item) => {
  return {
    name: item.name, 
    km: +item.km
  };
});

xAxis.data.setAll(datawithinkm);
series.data.setAll(datawithinkm);

series.appear(1000);
chart.appear(1000, 100);

}
$: if (form) {
   setupChart();
}
onMount(() => {
  setupChart();
});
</script>
{#each data.car as item (item.id)}
    <div>
        <h1>{item.id}</h1>
        <h1>{item.name}</h1>
        <p>{item.km}</p>
    </div>
{/each}