<template>
    <v-app id="background">
        <div>

            <v-toolbar :dark="dark">
                <v-toolbar-title>Income Tracker</v-toolbar-title>
                <v-spacer />
                <v-btn icon @click="modal = true">
                    <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
            </v-toolbar>

            <Chart class="mx-2 my-5" label="Tracking" :dataset="dataset" :labels="labels" />

            <h1 class="mx-2">Add a marker:</h1>

            <div class="mx-5 mt-5">
                <v-text-field label="Label:" :dark="dark" color="primary" id="month" />
                <v-text-field label="Value:" type="number" :dark="dark" color="primary" id="value" />
                <v-row justify="center">
                    <v-btn color="pink accent-3" @click="add"><b style="color: white;">add</b></v-btn>
                </v-row>
            </div>

        </div>

        <v-bottom-sheet v-model="modal">

            <v-sheet id="modal" class="pink accent-3" v-touch="{
				down: _ => dismissModal()
			}">
                <v-btn icon color="white" class="float-right mx-5" @click="del">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>

                <h1 class="mx-3" id="observer">Markers:</h1>

                <div v-for="(i, index) in reverseLabels">
                    <v-card :dark="dark" class="mx-3 my-3 fullwidth">
                        <v-card-text>
                            <b>
                                <p class="p" style="display: inline;">{{ i }}:</p>
                                <p class="p" style="float: right;">{{ reverseDataset[index] }}</p>
                            </b>
                        </v-card-text>
                    </v-card>
                </div>
                
            </v-sheet>

        </v-bottom-sheet>

    </v-app>
</template>

<script>
import Chart from './components/Chart.vue';
import url from './.env.js';

export default {
    created() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `${url}/get`, true)
        xhr.send()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.response);

                console.log(response)

                for (var i in response.res) {
                    this.labels.push(response.res[i][0])
                    console.log(response.res[i][0])

                    this.dataset.push(response.res[i][1])
                    console.log(response.res[i][1])
                }

                for (var i in this.labels) {

                    this.reverseLabels.push(this.labels[i])
                    this.reverseDataset.push(this.dataset[i])

                }

                this.reverseLabels.reverse()
                this.reverseDataset.reverse()
            }
        }
    },
    methods: {
        del() {
            console.log("delete")

            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${url}/delete`, true)
            xhr.send()
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = xhr.response;
                    // Do Something

                    console.log(response)



                    this.labels.pop()
                    this.dataset.pop()

                    this.reverseLabels.shift()
                    this.reverseDataset.shift()
                }
            }
        },
        add() {
            const month = document.querySelector('#month').value
            const value = parseInt(document.querySelector('#value').value)

            // document.querySelector('#month').value = ""
            // document.querySelector('#value').value = ""

            console.log([month, value])



            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${url}/add?label=${month}&data=${value}`, true)
            xhr.send()
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = xhr.response;
                    console.log(response)

                    this.dataset.push(value)
                    this.labels.push(month)

                    this.reverseLabels.unshift(this.labels[this.labels.length - 1])
                    this.reverseDataset.unshift(this.dataset[this.dataset.length - 1])
                } else if (this.status == 0) {
                    alert("IMPOSIBLE TO CONNECT TO THE DATABASE")
                }
            }
        },
        dismissModal() {
            let modal = document.querySelector("#modal")

            if (modal.scrollTop == 0) {
                console.log('yolo')

                this.modal = false
            }
        }
    },
    data() {
        return {
            dark: true,
            modal: false,
            dataset: [],
            labels: [],

            reverseLabels: [],
            reverseDataset: []
        }
    },
    components: {
        Chart
    }
}
</script>

<style>
#background {
    background: #000;
    color: white;
}

#modal {
    height: 250vw;
    border-radius: 35px;
    padding-top: 50px;
    overflow-y: scroll;
    padding-bottom: 500px;
}

.p {
    color: white;
}
</style>