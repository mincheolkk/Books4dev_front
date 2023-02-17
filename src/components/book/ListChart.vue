<template>
    <div>
        <!-- <canvas :id={isbn} height="30"/> -->
        <h3 class="recommend-title">개발자들이 추천 하는 시기</h3>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


export default {
    props:['isbn','time'],

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
                "twoYear":this.timeDivide(timeData["twoYearCount"]),
                "fiveYear":this.timeDivide(timeData["fiveYearCount"]),       
                "tenYear":this.timeDivide(timeData["tenYearCount"])}     
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
                        labels:['추천 수'],
                        datasets:[
                            {
                                label:"취업 전",
                                data:[timeData["beforeCount"]],
                                backgroundColor:"#EA002C"
                            },
                            {
                                label:"취업 후 ~ 2년",
                                data:[timeData["afterCount"]],
                                backgroundColor:"#FF7E36"
                            },
                            {
                                label:'~ 5년',
                                data:[timeData["twoYearCount"]],
                                backgroundColor:"#FFE300"
                            },
                            {
                                label:'~ 10년',
                                data:[timeData["fiveYearCount"]],
                                backgroundColor:"#04CF5C"
                            },
                            {
                                label:'10년차 ~',
                                data:[timeData["tenYearCount"]],
                                backgroundColor:"#1877F2"
                            },
                        ]
                    };

            let start = null;
            var ctx = this.isbn;

            if(start != null) {
                start.destory();
                
            }
            start = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: this.options
            })

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