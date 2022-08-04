<template>
    <div>
        <!-- <canvas :id={isbn} height="30"/> -->
        <p>개발자들이 추천 하는 시기</p>
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
                  align:'center',
                  labels:{
                      boxWidth : 30
                  }
              }
          },
          layout: {
              padding: {
                  left: 50,
                  right:50,
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
            console.log(timeData);
            this.beforeChart = {
                "before":this.timeDivide(timeData["beforeCount"]),
                "after":this.timeDivide(timeData["afterCount"]),
                "twoYear":this.timeDivide(timeData["twoYearCount"]),
                "fiveYear":this.timeDivide(timeData["fiveYearCount"]),       
                "tenYear":this.timeDivide(timeData["tenYearCount"])}     
                console.log(this.beforeChart);
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
                                backgroundColor:"#6EC6CC"
                            },
                            {
                                label:"취업 후 ~ 2년",
                                data:[timeData["afterCount"]],
                                backgroundColor:"#56B0D1"
                            },
                            {
                                label:'2년 ~ 5년',
                                data:[timeData["twoYearCount"]],
                                backgroundColor:"#6297CD"
                            },
                            {
                                label:'5년 ~ 10년',
                                data:[timeData["fiveYearCount"]],
                                backgroundColor:"#7F7AB9"
                            },
                            {
                                label:'10년 ~',
                                data:[timeData["tenYearCount"]],
                                backgroundColor:"#955B93"
                            },
                        ]
                    };

            // var ctx = document.getElementById(this.isbn)
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

        }
    },
    
    async mounted() {
        // console.log("this is created")

        this.$nextTick(function () {this.pleaseChart(this.time);


        })
    },
    

}
</script>

<style>

</style>