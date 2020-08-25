<template>
	<v-app id="background">
		<div>

			<v-toolbar :dark="dark">
				<v-toolbar-title>Ryan</v-toolbar-title>
			</v-toolbar>

			<Chart class="mx-2 my-5" label="Tracking" :dataset="dataset" :labels="labels" />


			<div class="mx-5 mt-5">

				<v-text-field label="Label:" :dark="dark" color="primary" id="month" />
				<v-text-field label="Value:" :dark="dark" color="primary" id="value" />


				<v-row justify="center"><v-btn color="pink" @click="add">add</v-btn></v-row>

				<div class="my-5" v-for="(i, index) in labels">
					<v-card :dark="dark">
						<v-card-text> {{ i }}: {{ dataset[index] }}</v-card-text>
					</v-card>
				</div>

			</div>

		</div>
	</v-app>
</template>

<script>
	import Chart from './components/Chart.vue';

	export default {
		methods: {
			add() {
				const month = document.querySelector('#month').value
				const value = parseInt(document.querySelector('#value').value)

				document.querySelector('#month').value = ""
				document.querySelector('#value').value = ""

				console.log([month, value])

				this.dataset.push(value)
				this.labels.push(month)
			}
		},
		data() {
			return {
				dark: true,
				dataset: [],
				labels: []				
			}
		},
		components: {
			Chart
		}
	}
</script>

<style>
	#background{
		background: #000;
	}
	h1{
		color: red;
	}
</style>