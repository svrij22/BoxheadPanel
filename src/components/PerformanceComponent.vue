<template>
    <div class="playercontainer">
        <table>
            <thead>
                <tr>
                    <th>Date / Time</th>
                    <th v-for="(value, key) in gridColumns" v-bind:key="key">
                        {{gridFormatted[key]}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="key" v-for="(entry, key) in performanceitems">
                    <td>{{entry.dateStr}}</td>
                    <td v-for="(value, key) in gridColumns" v-bind:key="key">
                        {{entry.values[value]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "PerformanceComponent",
        data: function () {
            return {
                performanceitems: [],
                gridColumns: ["Errors", "formattedTime", "Ticks", "Total packets", "uniqips", "cpuformat", "memusage"],
                gridFormatted: [ "Errors", "Time played on", "Ticks", "Total Packets", "Unique IP's", "CPU Usage", "Memory Usage"]
            }
        },
        mounted() {
            axios.get(`http://${this.$store.state.serverAddress}/rest/log/performance`,{
                headers: this.$store.getters.getHeader
            }).then((response) =>{
                this.performanceitems = response.data;
                this.performanceitems.forEach((item) =>{
                    item.values.formattedTime = this.secondsFormat(item.values.Playtime)
                    item.values.uniqips = item.values["Unique IP's"].length;
                    item.values.cpuformat = item.values["CPU Usage"] + " %";
                    item.values.memusage = item.values["Memory Usage"].usedMemMb + " Mb"
                })
            })
        },
        methods: {
            secondsFormat(seconds){
                return (new Date).clearTime()
                    .addSeconds(seconds)
                    .toString('H:mm:ss');
            },
        }
    }
</script>

<style scoped>

    .playercontainer{
        width: 100%;
        overflow-y: auto;
    }
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid #b94242;
        border-radius: 3px;
        background-color: #fff;
        width: 100%;
        margin-top: 20px;
    }

    th {
        background-color: #b94242;
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
        text-align: left;
    }

    tr:nth-child(2n) > td{
        background-color: #e8e8e8 !important;
    }

    td{
        border: 1px solid #c7c7c7;
    }

    th,
    td {
        padding: 5px 10px;
    }

    /*//Als het een button is moet hij zich kunnen verspreiden*/
      td input[type="button"]{
          margin: 0;
          padding: 5px 10px 5px 10px;
          flex-grow: 1;
          border-radius: 5px;
      }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }
</style>