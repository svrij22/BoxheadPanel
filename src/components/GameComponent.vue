<template>
    <div class="infocomp" v-if="serverData.data">
        <div class="totaltime">{{serverAddress}}</div>
        <div class="row">
            Server has been online for: {{serverTime}} <br>
            Running version: {{serverData.data.version}}
        </div>
        <div class="infocontent">
            <div class="col">
                <div v-for="(game, index) in serverData.data.gameMaps" v-bind:key="index">
                    <div class="gamecontainer infobox" v-if="game.config">
                        <div v-if="game.config" class="wavecon alleft">Wave {{game.config.wave}}</div>
                        <div v-if="game.config" class="wavecon alright">ID {{game.config.gameid}}</div>
                        <b>Game {{index + 1}}</b>
                        <br>
                        Being played by: <div v-for="plr in game.identities" v-bind:key="plr">{{getName(game, plr)}}</div>
                        <hr>
                        <div class="smallInfo">
                            Current state: {{game.config.wavestate}}
                        </div>
                        <div class="smallInfo">
                            Zombies: {{Object.keys(game.zombies).length - 1}} / {{game.config.zombiestogo}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p>{{JSON.stringify(serverData, null, "\t")}}</p>
    </div>
</template>

<script>

    export default {
        name: "InfoComponent",
        props: ['serverData'],
        methods: {
            secondsFormat(seconds){
                let dateStr = (new Date).clearTime()
                    .addSeconds(seconds)
                    .toString('H:mm:ss');

                return dateStr;
            },
            getName(game, id){
                let name = "undefined";
                if (game.config["id_names" + id]){
                    name = game.config["id_names" + id];
                }
                return name;
            }
        },
        computed: {
            serverTime(){
              return this.secondsFormat(this.serverData.data.ticks * 2);
            },
        }
    }
</script>

<style scoped>

    .infocomp{
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        padding: 32px;
    }

    .infobox{
        border: 3px solid #dddddd;
        border-radius: 8px;
        padding: 2px;
        margin: 7px;
    }

    .gamecontainer{
        width: 400px;
        position: relative;
    }

    .wavecon{
        top: 0;
        border-radius: 4px;
        position: absolute;
        background: #4d4d4d;
        width: 125px;
        height: 30px;
        color: #e9e9e9;
    }

    .alleft{
        left: 0;
    }

    .alright{
        right: 0;
        color: #000000!important;
        background: #adbd20!important;
    }

    .totaltime{
        font-size: 23px;
    }

    .infocontent{
        display: flex;
        flex-direction: row;
    }

    .col{
        max-width: 500px;
    }

    .row{
        width: 100%;
    }

    .smallInfo{
        background: #e9e9e9;
        border-radius: 4px;
        padding: 8px;
        margin: 6px;
        flex-grow: 1;
    }
</style>