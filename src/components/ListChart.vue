<template>
    <!-- <div v-html="pleaseChart(propsdata)"> -->
    <div>
        <!-- <canvas :id={isbn} height="0" /> -->
        <p>개발자들이 추천 하는 시기</p>
    </div>
    <!-- </div> -->
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


export default {
    props:['isbn','time'],

    data() {
        return {
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
            console.log(time);
            // console.log("pll",isbn);
            // this.$emit('makeChart',result.readTimeMap, result.detailData.isbn)
             this.drawChart(time);

        },
        makeData(timeData) {
            console.log(timeData);
            this.beforeChart = {
                "before":this.timeDivide(timeData["before"]),
                "after":this.timeDivide(timeData["after"]),
                "twoYear":this.timeDivide(timeData["twoYear"]),
                "fiveYear":this.timeDivide(timeData["fiveYear"]),       
                "sevenYear":this.timeDivide(timeData["sevenYear"])}     
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
                        labels:['a'],
                        datasets:[
                            {
                                label:"취업 전",
                                data:[timeData["before"]],
                                backgroundColor:"#6EC6CC"
                            },
                            {
                                label:"취업 후 ~ 2년",
                                data:[timeData["after"]],
                                backgroundColor:"#56B0D1"
                            },
                            {
                                label:'2년 ~ 5년',
                                data:[timeData["twoYear"]],
                                backgroundColor:"#6297CD"
                            },
                            {
                                label:'5년 ~ 10년',
                                data:[timeData["fiveYear"]],
                                backgroundColor:"#7F7AB9"
                            },
                            {
                                label:'10년 ~',
                                data:[timeData["sevenYear"]],
                                backgroundColor:"#955B93"
                            },
                        ]
                    };

            // var ctx = document.getElementById(isbn)
            let start = null;
            var ctx = this.isbn;
            console.log("ctx :" + ctx);
            if(start != null) {
                start.destory();
                
            }
            start = await new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: this.options
            })
            console.log(start);
            //   star.destroy();
              console.log("end")
        }
    },
    
    mounted() {
        // console.log("this is created")
        console.log(this.isbn);
        this.$nextTick(function () {this.pleaseChart(this.time);
        })
    },

}
</script>

<style>

</style>