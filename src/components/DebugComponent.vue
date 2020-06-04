<template>
    <div class="box-container">
        <div class="buttonContainer">
            <button class="box-button" v-for="(buttonPath, index) in paths" v-bind:key="index" @click="buttonClick(buttonPath)">
                {{pathsNames[index]}}
            </button>
            <input v-model="addition">
            <button class="box-button" v-for="buttonPath in pathsx" v-bind:key="buttonPath" @click="buttonClick(buttonPath + addition)">
                {{buttonPath + addition}}
            </button>
        </div>
        <hr>
        <div class="output">
            {{serverData.data}}
        </div>
        <button class="box-button" @click="serverData.data = JSON.stringify(serverData.data, null, '\t')">JSON Stringify</button>
    </div>
</template>

<script>
    export default {
        props: ['serverData'],
        name: "DebugComponent",
        data: function () {
            return {
                paths: ["log", "game/info", "player/json", "player", "game/messages", "game/json", "game/parsed", "game/sockets", "player/update", "game/json", "game/registered", "server/save", "server/read", "server/reset", "server/data"],
                pathsNames: ["Java Server Log", "Node Server Info", "Node Player Info", "Java Player Info","Java Message Data", "JSON", "JSON PARSED", "Socket Info Excl", "Update Player Info", "All Player Class Instances", "Registered Players", "State Writer Save", "State Writer Read", "Reset Server", "Reset Data"],
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

    .box-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
    }
</style>