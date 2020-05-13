<template>
    <div class="container">
        <div class="buttonContainer">
            <button v-for="(buttonPath, index) in paths" v-bind:key="index" @click="buttonClick(buttonPath)">
                {{pathsNames[index]}}
            </button>
            <hr>
            <input v-model="addition">
            <button v-for="buttonPath in pathsx" v-bind:key="buttonPath" @click="buttonClick(buttonPath + addition)">
                {{buttonPath + addition}}
            </button>
        </div>
        <hr>
        <div class="output">
            {{serverData.data}}
        </div>
        <button @click="serverData.data = JSON.stringify(serverData.data, null, '\t')">JSON Stringify</button>
    </div>
</template>

<script>
    export default {
        props: ['serverData'],
        name: "DebugComponent",
        data: function () {
            return {
                paths: ["login", "serverlog", "info", "player", "json", "parsed", "sockets", "playerUpdate", "players"],
                pathsNames: ["Login Auth Key", "Java Server Log", "Node Server Info", "Node Player Info", "JSON", "JSON PARSED", "Socket Info Excl", "Update Player Info", "All Player Class Instances"],
                pathsx: ["player", "socket"],
                addition: ""
            }
        },
        methods: {
            buttonClick(path) {
                this.$emit('emitpath', path)
            }
        }
    }
</script>

<style scoped>

    .buttonContainer{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .container{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>