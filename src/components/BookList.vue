<template>
    <section > 
        
    <div v-for="(result) in this.books" v-bind:key="result.detailData.isbn" class="shadow">
        <img :src="result.detailData.thumbnail" alt="image" class="shadow"/>
        <p>{{result.detailData.title}}</p>
        <!-- <p v-on:scroll="pleaseChart(result)">chart</p> -->
        <div>{{result.readTimeMap}}</div>
        <p>추천시기2</p>
        <list-chart v-bind:key="result.detailData.isbn" :isbn="result.detailData.isbn" :time="result.readTimeMap" />
        <canvas :id="result.detailData.isbn" height="100"/>
        <!-- <canvas  v-on="pleaseChart(result)" :id="result.detailData.isbn" /> -->
    </div>


    <!-- <div v-for="(result) in this.books" v-bind:key="result.detailData.isbn" class="shadow">
        <img :src="result.detailData.thumbnail" alt="image" class="shadow"/>
        <p>{{result.detailData.title}}</p>
        <button v-on:loading="pleaseChart(result)">chart</button>
        <div>{{result.readTimeMap}}</div>
        <p>추천시기</p>
        <canvas :id="result.detailData.isbn" />
        <canvas  v-on="pleaseChart(result)" :id="result.detailData.isbn" /> -->

    </section>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import ListChart from './ListChart.vue'
Chart.register(...registerables)


export default {   
 
//   async mounted(){
//     this.$nextTick(function () {
//       this.pleaseChart()
//     })
//   },
  components:{
      ListChart
  },
  data() {
    return {
      books: [],
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
                //   top: 10,
                  left: 50,
                  right:50,
              }
          }
      },
    }
  },

  async created() {
    this.goVuex();
  },

  methods: {
        pleaseTime(result) {
            this.$emit('testTime',result.readTimeMap)
        },
        async pleaseChart(result) {
            console.log("pll",result);
            // this.$emit('makeChart',result.readTimeMap, result.detailData.isbn)
            await this.drawChart(result.readTimeMap, result.detailData.isbn);

        },

         async goVuex() {
          // let books;
          this.books =  await this.$store.dispatch("fetchAllBooks")
        },



         makeData(timeData) {
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
    drawChart(timeData, isbn) {

     var chartData =  {
                labels:['a'],
                datasets:[
                    {
                        label:"취업 전",
                        data:[timeData["before"]],
                        backgroundColor:"#4169e1"
                    },
                    {
                        label:"개발자 취업 후 ~ 2년",
                        data:[timeData["after"]],
                        backgroundColor:"#87ceeb"
                    },
                    {
                        label:'2년 ~ 5년',
                        data:[timeData["twoYear"]],
                        backgroundColor:"#b0e0e6"
                    },
                    {
                        label:'5년 ~ 10년',
                        data:[timeData["fiveYear"]],
                        backgroundColor:"#b33e22"
                    },
                    {
                        label:'10년 ~',
                        data:[timeData["sevenYear"]],
                        backgroundColor:"#b82e12"
                    },
                ]
            };
    // console.log(chartData)
    // let start = null;
    var ctx = document.getElementById(isbn)
    // console.log("ctx :" + ctx);
    // if(start != null) {
    //     start.destory();
    // }
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: this.options
      })
    //   star.destroy();
    //   console.log("end")

    }
    },
}
</script>

<style>
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>