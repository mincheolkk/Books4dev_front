<template>
    <div>
        <h3 v-if="this.read === undefined" class="recommend-title">개발자들이 추천 하는 시기</h3>
        <h3 v-else class="recommend-title">개발자들이 읽은 시기</h3>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
export default {
    props:['isbn','time','read'],
    data() {
        return {
            start:null,
            temp:[],
            options:{
                scales: {
                    x:{
                  stacked:true,
                  display:false
                        },
                    y: {
                  stacked:true,
                  display:false,
                    }
                },
                indexAxis:'y',
                plugins:{
                    legend:{
                        display:true,
                        position:'bottom',
                        align:'left',
                        labels:{
                            boxWidth : 8,
                            fontSize: 12
                        },
                        
                    },
                },
          layout: {
              padding: {
                  left: 20,
                  right:20,
              }
          }
      },
        }
    },
    
    methods:{
        
          pleaseChart(time) {
             this.drawChart(time);
        },
        makeData(timeData) {
            this.beforeChart = {
                "before":this.timeDivide(timeData["beforeCount"]),
                "after":this.timeDivide(timeData["afterCount"]),
                "threeYear":this.timeDivide(timeData["threeYearCount"]),
                "sixeYear":this.timeDivide(timeData["sixYearCount"]),       
                "anyTime":this.timeDivide(timeData["anyTimeCount"])}     
                return this.beforeChart;
            },
        timeDivide(time) {
            if (time > 0) {
                return time
            } else if (time === undefined){
                return 0
            }
        },
        async drawChart(timeData) {
            var chartData =  {
                        labels:['시기'],
                        datasets:[
                            {
                                label:"취업 전",
                                data:[timeData["beforeCount"]],
                                backgroundColor:"#D40C00"
                            },
                            {
                                label:"0-2년차",
                                data:[timeData["afterCount"]],
                                backgroundColor:"#FF5500"
                            },
                            {
                                label:'3-5년차',
                                data:[timeData["threeYearCount"]],
                                backgroundColor:"#FFCD00"
                            },
                            {
                                label:'6년차 이상',
                                data:[timeData["sixYearCount"]],
                                backgroundColor:"#32C12C"
                            },
                            {
                                label:'언제든 좋음',
                                data:[timeData["anyTimeCount"]],
                                backgroundColor:"#1877F2"
                            },
                        ]
                    };
            if (this.read !== undefined) {
                chartData.datasets.splice(4,1);
            }
            

            var ctx = this. isbn;

            this.start = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: this.options
            });
        },



        handleMediaQueryChange(mediaQuery) {
            if (mediaQuery.matches) {
                this.options.layout.padding.left = 10
                this.options.layout.padding.right = 10
            } else {
                this.options.layout.padding.left = 20
                this.options.layout.padding.right = 20
            }
        },
    },
    
    async mounted() {
        this.$nextTick(function () {this.pleaseChart(this.time);
        })
        
        const mediaQuery = window.matchMedia('(max-width: 385px)')
        mediaQuery.addEventListener('change', this.handleMediaQueryChange)
        this.handleMediaQueryChange(mediaQuery)
    },
    beforeDestroy() {
        const mediaQuery = window.matchMedia('(max-width: 385px)')
        mediaQuery.removeEventListener('change', this.handleMediaQueryChange)
        this.start.destroy();
    },

}
</script>

<style>
.recommend-title {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.3px;
    text-align: left;
    margin: 20px;
}
</style>