<template>
    <div class="box-container">
        <div class="buttonContainer">
            <button class="box-button" v-for="(buttonPath, index) in paths" v-bind:key="index" @click="buttonClick(buttonPath)">
                {{pathsNames[index]}}
            </button>
        </div>
        <hr>
        <div class="console">
            {{serverData.data}}{{cliData}}
        </div>
        <div class="clisend">
            <input class="cli-input" v-model="cliData">
            <button class="box-button clibtn" @click="buttonClickSend(cliData)">Send</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['serverData'],
        name: "DebugComponent",
        data: function () {
            return {
                paths: ["shell/start", "shell", "shell/reset"],
                pathsNames: ["Test command", "Get Shell Output", "Reset shell"],
                cliData: ""
            }
        },
        methods: {
            buttonClick(path) {
                this.$emit('emitpath', path, "")
            },
            buttonClickSend(clidata) {
                this.$emit('emitpath', "shellexec", clidata);
                this.cliData = "";
            },
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
        background-color: #122e00;
        margin: 0!important;
    }

    .console {
        font-family: 'Fira Mono', monospace;
        box-sizing: border-box;
        border-radius: 12px;
        margin: 8px;

        padding: 20px;

        background-color: #000;
        color: #63de00;

        overflow: hidden;
        overflow-y: scroll;
        white-space: pre-wrap;
        text-align: left!important;
        height: 100%;
    }

    button{
        background: #308e00;
    }

    .clisend{
        display: flex;
    }

    .cli-input{
        flex-grow: 4;
    }

    .clibtn{
        flex-grow: 0;
    }
</style>