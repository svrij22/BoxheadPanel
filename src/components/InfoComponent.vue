<template>
    <div class="infocomp" v-if="serverData.data">
        <div class="totaltime">{{serverData.address}}</div>
            Server has been online for: {{serverTime}} <br>
            Running version: {{serverData.data.version}}
        <div class="infocontent">
            <div class="col">
                <div class="infobox">
                    Players connected to server: {{serverConnData}}
                    <div class="playerInfo" v-for="remote in getActiveRemotes" v-bind:key="remote">
                        <div>
                            <font-awesome-icon icon="user" />
                            Player: {{playerData(remote)}}
                        </div>
                        <div class="playerTime">
                            {{secondsFormat(remote.ticks*2)}}
                        </div>
                    </div>
                </div>
                <div class="infobox">
                    <font-awesome-icon icon="server" />
                    Unique IPs: {{serverData.data.uniqueips.length}}
                    <div class="ipbox">
                        <div class="ipInfo" v-for="ip in serverData.data.uniqueips" v-bind:key="ip">
                            <font-awesome-icon icon="desktop" />
                            IP: {{ip}}
                        </div>
                    </div>
                </div>
                <div class="infobox totaltime">
                    Total play time: {{secondsFormat(serverData.data.playtime)}}
                </div>
                <div class="infobox">
                    <font-awesome-icon icon="memory" />
                    Memory usage
                    <div class="ipbox">
                        <div class="memInfo">Total MB<br>{{serverData.data.memusage.totalMemMb}}</div>
                        <div class="memInfo">Used MB<br>{{serverData.data.memusage.usedMemMb}}</div>
                        <div class="memInfo">Free MB<br>{{serverData.data.memusage.freeMemMb}}</div>
                        <div class="memInfo">Free MB %<br>{{serverData.data.memusage.freeMemPercentage}}</div>
                    </div>
                </div>
                <div class="infobox">
                    <font-awesome-icon icon="bug" />
                    Errors: {{serverData.data.errors}}
                    <br>
                    <font-awesome-icon icon="sign-in-alt" />
                    Login tries: {{serverData.data.logintries}}
                </div>
            </div>
            <div class="col">
                <div class="infobox">
                    <div class="memInfo">
                        <font-awesome-icon icon="microchip" />Cpu Usage<br>{{serverData.data.cpuusage}} %
                    </div>
                </div>
                <div class="infobox">
                    <font-awesome-icon icon="network-wired" />
                    Network Usage
                    <div class="ipbox" v-if="serverData.data.netusage !== 'not supported'">
                        <div class="memInfo">Input MB<br>{{serverData.data.netusage.total.inputMb}}</div>
                        <div class="memInfo">Output MB<br>{{serverData.data.netusage.total.outputMb}}</div>
                    </div>
                </div>
                <div class="infobox">
                    <font-awesome-icon icon="box" />
                    Packets
                    <div class="memInfo">Total Packets<br>{{serverData.data.packets}}</div>
                    <div class="ipbox">
                        <div class="packetInfo" v-for="(packet, index) in serverData.data.packet_types" v-bind:key="index">
                            Type {{index}}
                            <br>
                            {{packet}}
                            <div class="perc"> {{calcPacketPerc(packet)}}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="output" v-if="$store.state.debugger">{{JSON.stringify(serverData, null, "\t")}}</p>
    </div>
</template>

<script>

    export default {
        name: "InfoComponent",
        props: ['serverData'],
        methods: {
            playerData(socket){
                return socket.remote.address + " on port " + socket.remote.port + " with username " + socket.name
            },
            secondsFormat(seconds){
                return (new Date).clearTime()
                    .addSeconds(seconds)
                    .toString('H:mm:ss');
            },
            calcPacketPerc(packets){
                return Math.round((packets / this.serverData.data.packets) * 100)
            }
        },
        computed: {
            serverTime(){
              return this.secondsFormat(this.serverData.data.ticks * 2);
            },
            getActiveRemotes(){
                if (this.serverData.data){
                    return (this.serverData.data.sockets).filter ((remote) => {
                        return (remote.heartbeat > 0);
                    })
                }
                return {};
            },
            serverConnData(){
                if (this.serverData.data) {
                    return (this.serverData.data.players_online) + " / " + (this.serverData.data.players_max)
                }
                return {};
            }
        },
        mounted() {
            //Set path
            this.$emit('emitpath', "game/info", "")
        }
    }
</script>

<style scoped>

    .infobox{
        border: 3px solid #dddddd;
        border-radius: 8px;
        padding: 2px;
        margin: 7px;
    }

    .playerInfo{
        background: #e9e9e9;
        border-radius: 4px;
        padding: 6px;
        margin: 2px;
    }

    .playerTime{
        padding-left: 24px;
        text-align: left;
        font-size: 15px;
    }

    .totaltime{
        font-size: 23px;
    }

    .ipbox{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .ipInfo{
        background: #e9e9e9;
        border-radius: 4px;
        padding: 6px;
        width: 160px;
        margin: 2px;

        flex-grow: 1;
    }

    .memInfo{
        background: #e9e9e9;
        border-radius: 4px;
        padding: 8px;
        margin: 6px;
        flex-grow: 1;
    }

    .packetInfo{
        background: #e9e9e9;
        border-radius: 4px;
        padding: 8px;
        margin: 6px;
        flex-grow: 1;
        min-width: 120px;
        position: relative;
    }

    .perc{
        left: 0;
        top: 0;
        border-radius: 4px;
        position: absolute;
        background: #4d4d4d;
        width: 45px;
        height: 30px;
        color: #e9e9e9;
    }

    .infocontent{
        display: flex;
        flex-direction: row;
    }

    @media only screen and (max-width: 800px) {
        .infocontent{
            flex-direction: column;
        }
    }

    .col{
        max-width: 500px;
    }
    .row{
        width: 100%;
    }
</style>