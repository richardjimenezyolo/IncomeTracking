<template>
    <div class="white chart_div">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
    name: 'v-chart',
    props: ['dataset', 'labels', 'label'],
    created() {
        setTimeout(this.render, 1000)
    },
    methods: {
        render() {
            var ctx = document.querySelector('#myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [
	                    {
	                        label: this.label,
	                        lineTension: 0,
	                        borderColor: 'rgb(0, 255, 0)',
	                        backgroundColor: 'rgba(0, 0, 0, 0)',
	                        data: this.dataset
	                    }
                    ]
                }
            })
        }
    },
    watch: {
        labels() {
            this.render()
        }
    }
}
</script>

<style>
.chart_div {
    border-radius: 10px;
}
</style>