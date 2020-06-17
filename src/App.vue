<template>
    <div id="app">
        <side-bar-comp/>
        <router-view :server-data="serverData" @emitpath="setPath" id="view"></router-view>
        <div id="note">
            <b>{{servernote}}</b>
        </div>
        <notification-component/>
        <side-bar-comp class="bottom-disp" is-bottom="true"/>
    </div>
</template>

<script>
    import SideBarComp from "@/components/SideBarComp";
    import axios from "axios";
    import NotificationComponent from "./components/NotificationComponent";

    export default {
        name: 'App',
        components: {
            NotificationComponent,
            SideBarComp
        },
        data: function () {
            return {
                serverData: "",
                servernote: "",
                getPath: ""
            }
        },
        methods: {
            getServerData: function(){

                //Do a request
                console.log("Request");

                //Note is empty
                this.servernote = "";
                if (!this.$store.state.loggedIn) {
                    this.servernote = "Not logged in";
                    return;
                }

                //Do get
                axios.get(`http://${this.$store.state.serverAddress}/rest/${this.getPath}`, {
                    headers: this.$store.getters.getHeader
                })
                    .then((response) => {
                        // handle success
                        this.serverData = response;
                        this.serverData.address = this.serverAddress;
                    })
                    .catch((error) => {
                        // handle error
                        console.log (error);

                        //Register error
                        let status = "Error";
                        if (error?.response?.status) status = error?.response?.status;
                        this.serverData = status;
                        this.servernote = status + " - " + error.toString() + " - Sorry :(";
                    })
                .finally(() =>{
                    //set faux data
                    this.fauxData();
                })

            },
            setDataTimer(){
                this.getServerData();
            },
            setPath(path){
                this.getPath = path;
                this.getServerData();
            },
            fauxData(){

                //Only continue is found sockets
                if (!this.serverData.data.sockets) return;

                var remoteData = {
                    "remote": {
                        "address": "81.206.12.59",
                        "family": "IPv4",
                        "port": 51040,
                        "size": 9
                    },
                    "heartbeat": 5,
                    "group": 0,
                    "name": "test",
                    "ticks": 9,
                    "gameoverTicker": 2
                };

                var mapData = {
                    "identities": [
                        0
                    ],
                    "config": {
                        "dataset": "true",
                        "type": "config",
                        "id_names0": "noob",
                        "zombiestogo": (Math.floor(Math.random() * 15)),
                        "wave": 0,
                        "wavestate": "WAVEEND",
                        "maxzombies": (Math.floor(Math.random() * 15)),
                        "waveticker": 0,
                        "gameid": (Math.floor(Math.random() * 99999))
                    },
                    "zombies": {
                        "zombie48089": "913.42^921.63^0^48089^zombie^",
                        "type": "zombies"
                    }
                };

                let dataMap = this.serverData.data.gameMaps;
                dataMap.push(mapData);
                dataMap.push(mapData);
                dataMap.push(mapData);

                let dataMap2 = this.serverData.data.sockets;
                dataMap2.push(remoteData);
                dataMap2.push(remoteData);
                dataMap2.push(remoteData);
                console.log(remoteData);
            },
        },
        mounted() {
            // eslint-disable-next-line no-unused-vars
            //const dataTimer = setInterval(this.getServerData, 2000);

            //on mounted if logged in goto info
            if (this.authorized && this.$route.path === '/'){
                this.$router.push("/info");
            }
        }
    }
</script>

<style>

    @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Poppins Regular'), local('Poppins-Regular'), url('/assets/Poppins-Regular.ttf') format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }

    #app {
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .infocomp{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        padding: 32px;
    }

    @media only screen and (max-width: 500px) {
        #app {
            display: flex;
            flex-direction: column;
            overflow-y: scroll;
        }

        .bottom-disp{
            margin-top: auto;
        }

        #view{
            margin: 0px!important;
            padding: 8px!important;
        }
    }

    @media only screen and (min-width: 500px) {
        .bottom-disp{
            margin-top: auto;
            display: none!important;
        }

        .infocomp{
            overflow-y: scroll;
        }
    }

    html {
        height: 100%;
    }

    body {
        overflow: hidden;
        margin: 0px; /*removes default style*/
        display: flex;
        box-sizing: border-box;
        height: 100%;
        font-family: "Lato", sans-serif;
    }

    #view {
        margin: 8px;
    }

    .output{
        overflow: hidden;
        overflow-y: auto;
        white-space: pre-wrap;
        text-align: left!important;
        height: 100%;
        margin: 8px;
        background: #f9e6e6;
        width: 100%;
        max-height: 2000px;
        min-height: 300px;
    }

    .box-button{
        background-color: #af211c;
        color: white;
        padding: 15px;
        margin: 8px;
        border: none;
        cursor: pointer;
        flex-grow: 4;
    }

    button:hover {
        opacity: 0.8;
    }

    input{
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    #note {
        position: absolute;
        z-index: 101;
        top: 0;
        left: 0;
        right: 0;
        background: #fd8181;
        text-align: center;
        line-height: 3;
        overflow: hidden;
        -webkit-box-shadow: 0 0 10px black;
        -moz-box-shadow:    0 0 10px black;
        box-shadow:         0 0 10px black;

        animation:
                pulse
                1.5s
                ease-out
                infinite
                alternate
                running;
    }

    @keyframes pulse {
        0% {
            background-color: #ffff30;
            top: -50px;
        }
        50% {
            background-color: #ff564f;
            transform: scale(1.1, 1.1);
        }
        100% {
            background-color: #ff564f;
            top: 0px;
        }
    }

</style>
