<template>
  <apexchart type="candlestick" height="350" :options="chartOptions" :series="series">
  </apexchart>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import VueApexCharts from 'vue3-apexcharts'
import { Prop } from 'vue-property-decorator'

@Options({
  components: {
    apexchart: VueApexCharts
  }
})
export default class CandleStickChart extends Vue {
  @Prop()
  candles = []

  chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'Bitcoin Last Prices',
      align: 'center'
    },
    xaxis: {
      type: 'time'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  series = [{
    data: this.candles
  }]
}
</script>

<style>

</style>
