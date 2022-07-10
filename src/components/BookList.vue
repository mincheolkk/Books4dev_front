<template>
    <section > 
        <P> S</P>
    <div v-for="(result) in this.books" v-bind:key="result.detailData.isbn" class="shadow">
        <img :src="result.detailData.thumbnail" alt="image" class="shadow"/>
        <p>{{result.detailData.title}}</p>
        <!-- <button v-on:click="pleaseTime(result)">button</button> -->
        <button v-on:click="pleaseChart(result)">chart</button>
        <div>{{result.readTimeMap}}</div>
        <p>추천시기</p>
        <canvas :id="result.detailData.isbn" />
        <!-- <canvas v-html="pleaseChart(result)" :id="result.detailData.isbn" /> -->

    </div>
    </section>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import {  mapGetters } from 'vuex'
// let newChart;
export default {   
 
//   async mounted(){
//     this.$nextTick(function () {
//       this.pleaseChart()
//     })
//   },

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
            // this.$emit('makeChart',result.readTimeMap, result.detailData.isbn)
            this.drawChart(result.readTimeMap, result.detailData.isbn);

        },

         async goVuex() {
          // let books;
          this.books =  await this.$store.dispatch("fetchAllBooks")
          console.log(this.books);

          console.log("2222");
          console.log(this.books);
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
      console.log("draw?");
      console.log(isbn);

        //   if (newChart !== undefined) {
        //       newChart.destroy();
        //   }
      

     var chartData =  {
                labels:['a'],
                datasets:[
                    {
                        label:"취업 전",
                        data:[timeData["before"]],
                        backgroundColor:"#4169e1"
                    },
                    {
                        label:"개발자 취업 후 ~ 2년차",
                        data:[timeData["after"]],
                        backgroundColor:"#87ceeb"
                    },
                    {
                        label:'2년차 ~ 5년차',
                        data:[timeData["twoYear"]],
                        backgroundColor:"#b0e0e6"
                    },
                    {
                        label:'5년차 ~ 10년차',
                        data:[timeData["fiveYear"]],
                        backgroundColor:"#b33e22"
                    },
                    {
                        label:'10년차 ~',
                        data:[timeData["sevenYear"]],
                        backgroundColor:"#b82e12"
                    },
                ]
            };
    console.log(chartData)

    var ctx = document.getElementById(isbn)
    console.log("ctx :" + ctx);

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: this.options
      })
      console.log("end")
    //   return newChart 
    }
    },

    computed: {
      ...mapGetters({
        cheolItems: 'getCheol'
      })
    }
}
</script>

<style>
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>