<template>
	<v-app id="background" v-touch="{
		up: _ => modal = true
	}">
		<div>

			<v-toolbar :dark="dark">
				<v-toolbar-title>IncomeTracking</v-toolbar-title>
			</v-toolbar>

			<Chart class="mx-2 my-5" label="Tracking" :dataset="dataset" :labels="labels" />


			<h1 class="mx-2">Add a market:</h1>
			
			<div class="mx-5 mt-5">

				<v-text-field label="Label:" :dark="dark" color="primary" id="month" />
				<v-text-field label="Value:" :dark="dark" color="primary" id="value" />


				<v-row justify="center"><v-btn color="pink accent-3" @click="add">add</v-btn></v-row>

				

			</div>

			
		</div>

		<v-bottom-sheet v-model="modal">
			<v-sheet id="modal" class="pink accent-3" v-touch="{
				down: _ => modal = false
			}">

				<h1 class="mx-3">Markets:</h1>

				<div class="" v-for="(i, index) in labels">
					<v-card :dark="dark" class="mx-3 my-3 fullwidth">
						<v-card-text> {{ i }}: {{ dataset[index] }}</v-card-text>
					</v-card>
				</div>

			</v-sheet>
		</v-bottom-sheet>
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
				modal: false,
				dataset: [0, 10, 5],
				labels: ['ene', 'feb', 'mar']
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
		color: white;
	}
	#modal{
		height: 250vw;
		border-radius: 35px;
		padding-top: 100px;
	}
</style>